"""One command: topic -> request -> Brand DNA -> QA -> Blogger draft."""
from __future__ import annotations

import argparse
import json
import os
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
for folder in (ROOT / "lifebookmom_engine", ROOT / "lifebookmom_qa", ROOT / "lifebookmom_publisher"):
    if str(folder) not in sys.path:
        sys.path.insert(0, str(folder))

from article_draft_engine import build_draft, save_draft
from blogger_publisher import PublishRequest, build_service, create_draft, resolve_blog_id
from brand_dna_engine import apply_brand_dna, validate_brand_dna
from content_qa_gate import validate_payload
from content_request_engine import build_request, save_request

QA_DIR = ROOT / "lifebookmom_cms" / "qa_reports"
BRAND_QA_DIR = ROOT / "lifebookmom_cms" / "brand_qa_reports"
PIPELINE_LOG = ROOT / "lifebookmom_logs" / "topic_to_blogger_draft.jsonl"


def _write_json(path: Path, payload: dict[str, Any]) -> Path:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return path


def _append_log(payload: dict[str, Any]) -> None:
    PIPELINE_LOG.parent.mkdir(parents=True, exist_ok=True)
    record = {"recorded_at": datetime.now(timezone.utc).isoformat(), **payload}
    with PIPELINE_LOG.open("a", encoding="utf-8") as file:
        file.write(json.dumps(record, ensure_ascii=False) + "\n")


def prepare(topic: str, category: str, channel: str = "blogger", min_text_length: int = 5000) -> dict[str, Any]:
    request = build_request(topic, category=category, channel=channel)
    request_path = save_request(request)

    generic_draft = build_draft(request.__dict__)
    draft = apply_brand_dna(generic_draft, topic)
    brand_qa = validate_brand_dna(draft)
    brand_qa_payload = brand_qa.to_dict()
    brand_qa_path = _write_json(BRAND_QA_DIR / f"{request.request_id}.json", brand_qa_payload)

    draft["brand_qa_report_path"] = str(brand_qa_path)
    draft["brand_qa_score"] = brand_qa.score
    draft["brand_status"] = "BRAND_QA_PASSED" if brand_qa.passed else "BRAND_QA_FAILED"

    if not brand_qa.passed:
        draft["status"] = "BRAND_QA_FAILED"
        draft["next_stage"] = "BRAND_REWORK"
        draft_path = save_draft(draft)
        result = {
            "status": "BLOCKED_BY_BRAND_QA",
            "request_id": request.request_id,
            "request_path": str(request_path),
            "draft_path": str(draft_path),
            "brand_qa_path": str(brand_qa_path),
            "brand_qa": brand_qa_payload,
            "draft": draft,
        }
        _append_log({key: value for key, value in result.items() if key != "draft"})
        return result

    draft_path = save_draft(draft)
    qa = validate_payload(draft, min_text_length=min_text_length)
    qa_payload = qa.to_dict()
    qa_path = _write_json(QA_DIR / f"{request.request_id}.json", qa_payload)

    draft["qa_report_id"] = request.request_id
    draft["qa_report_path"] = str(qa_path)
    draft["status"] = "QA_PASSED" if qa.passed else "QA_FAILED"
    draft["next_stage"] = "BLOGGER_DRAFT" if qa.passed else "QA_REWORK"
    save_draft(draft)

    result = {
        "status": "READY_FOR_BLOGGER_DRAFT" if qa.passed else "BLOCKED_BY_QA",
        "request_id": request.request_id,
        "request_path": str(request_path),
        "draft_path": str(draft_path),
        "brand_qa_path": str(brand_qa_path),
        "brand_qa": brand_qa_payload,
        "qa_path": str(qa_path),
        "qa": qa_payload,
        "draft": draft,
    }
    _append_log({key: value for key, value in result.items() if key != "draft"})
    return result


def send_to_blogger(draft_path: Path) -> dict[str, Any]:
    request = PublishRequest.from_json(draft_path)
    service = build_service()
    blog_id = resolve_blog_id(service, os.getenv("LIFEBOOKMOM_BLOGGER_BLOG_ID", "").strip())
    created = create_draft(service, blog_id, request)
    return {
        "status": "BLOGGER_DRAFT_CREATED",
        "blog_id": blog_id,
        "post_id": str(created.get("id", "")),
        "url": created.get("url"),
        "title": created.get("title", request.title),
    }


def run(topic: str, category: str, *, dry_run: bool = False, min_text_length: int = 5000) -> dict[str, Any]:
    prepared = prepare(topic, category, min_text_length=min_text_length)
    if prepared["status"] != "READY_FOR_BLOGGER_DRAFT":
        return prepared
    if dry_run:
        result = {
            "status": "TOPIC_TO_BLOGGER_DRAFT_DRY_RUN_PASS",
            "request_id": prepared["request_id"],
            "draft_path": prepared["draft_path"],
            "brand_qa_path": prepared["brand_qa_path"],
            "brand_qa_score": prepared["brand_qa"]["score"],
            "qa_path": prepared["qa_path"],
            "text_length": prepared["qa"]["text_length"],
            "next_stage": "BLOGGER_DRAFT",
        }
        _append_log(result)
        return result

    blogger = send_to_blogger(Path(prepared["draft_path"]))
    saved = prepared["draft"]
    saved.update(
        {
            "status": "BLOGGER_DRAFT_CREATED",
            "next_stage": "EDITOR_REVIEW",
            "blogger_blog_id": blogger["blog_id"],
            "blogger_post_id": blogger["post_id"],
            "blogger_url": blogger["url"],
        }
    )
    save_draft(saved)
    result = {
        **blogger,
        "request_id": prepared["request_id"],
        "draft_path": prepared["draft_path"],
        "brand_qa_path": prepared["brand_qa_path"],
        "brand_qa_score": prepared["brand_qa"]["score"],
        "qa_path": prepared["qa_path"],
        "text_length": prepared["qa"]["text_length"],
        "next_stage": "EDITOR_REVIEW",
    }
    _append_log(result)
    return result


def main() -> int:
    parser = argparse.ArgumentParser(description="생활백서맘 주제 → Brand QA → Content QA → Blogger 초안")
    parser.add_argument("topic")
    parser.add_argument("--category", default="미분류")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--min-text-length", type=int, default=5000)
    args = parser.parse_args()
    try:
        result = run(args.topic, args.category, dry_run=args.dry_run, min_text_length=args.min_text_length)
        print(json.dumps(result, ensure_ascii=False))
        return 0 if result["status"] not in {"BLOCKED_BY_QA", "BLOCKED_BY_BRAND_QA"} else 2
    except Exception as exc:
        print(json.dumps({"status": "TOPIC_TO_BLOGGER_DRAFT_FAIL", "error": str(exc)}, ensure_ascii=False), file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
