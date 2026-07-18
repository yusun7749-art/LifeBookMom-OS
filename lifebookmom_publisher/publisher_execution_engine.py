"""Execute a validated LifeBookMom Blogger publisher request and update CMS state.

The engine accepts only requests created by ``publish_ready_engine``. API failures are
recorded in a durable retry queue; it does not blindly repeat an uncertain Blogger
write because that could create duplicate posts.
"""
from __future__ import annotations

import argparse
import json
import os
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Callable

from lifebookmom_publisher.blogger_publisher import (
    PublishRequest,
    build_service,
    create_draft,
    parse_schedule,
    publish_draft,
    resolve_blog_id,
)

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_LOG = ROOT / "lifebookmom_logs" / "publisher_execution.jsonl"
DEFAULT_RETRY_DIR = ROOT / "lifebookmom_publisher" / "retry_queue"


def load_json(path: Path) -> dict[str, Any]:
    if not path.is_file():
        raise FileNotFoundError(f"파일을 찾을 수 없습니다: {path}")
    payload = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(payload, dict):
        raise ValueError("JSON 객체만 처리할 수 있습니다.")
    return payload


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


def _append_log(path: Path, payload: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("a", encoding="utf-8") as file:
        file.write(json.dumps({"recorded_at": _now(), **payload}, ensure_ascii=False) + "\n")


def validate_contract(request: dict[str, Any], draft: dict[str, Any]) -> str:
    if draft.get("status") != "PUBLISH_REQUEST_READY" or draft.get("next_stage") != "BLOGGER_PUBLISHER":
        raise ValueError("PUBLISH_REQUEST_READY 상태의 CMS 초안만 발행할 수 있습니다.")
    if request.get("source_draft_status") != "PUBLISH_READY":
        raise ValueError("Publish Ready Engine에서 생성된 요청이 아닙니다.")
    if request.get("asset_qa_status") != "ASSET_QA_PASS":
        raise ValueError("ASSET_QA_PASS 요청만 발행할 수 있습니다.")
    content_id = str(request.get("content_id", "")).strip()
    if not content_id or draft.get("content_id") != content_id:
        raise ValueError("Publisher 요청과 CMS 초안의 content_id가 다릅니다.")
    mode = str(request.get("publish_mode", "")).strip().lower()
    if mode not in {"draft", "schedule", "publish"}:
        raise ValueError("publish_mode는 draft, schedule, publish 중 하나여야 합니다.")
    if mode == "schedule":
        parse_schedule(str(request.get("publish_at", "")))
    elif request.get("publish_at"):
        raise ValueError("publish_at은 schedule 모드에서만 사용할 수 있습니다.")
    return mode


def execute_with_service(service: Any, blog_id: str, request: dict[str, Any]) -> dict[str, Any]:
    publish_request = PublishRequest(
        title=str(request["title"]),
        html=str(request["html"]),
        labels=list(request.get("labels", [])),
    )
    mode = str(request["publish_mode"])
    created = create_draft(service, blog_id, publish_request)
    post_id = str(created.get("id", ""))
    if not post_id:
        raise RuntimeError("Blogger가 post_id를 반환하지 않았습니다.")

    result: dict[str, Any] = {
        "blog_id": blog_id,
        "post_id": post_id,
        "title": created.get("title", publish_request.title),
        "url": created.get("url"),
    }
    if mode == "draft":
        result["status"] = "BLOGGER_DRAFT_CREATED"
        return result

    scheduled_at = parse_schedule(str(request["publish_at"])) if mode == "schedule" else None
    published = publish_draft(service, blog_id, post_id, scheduled_at)
    result.update(
        {
            "status": "BLOGGER_SCHEDULED" if mode == "schedule" else "BLOGGER_PUBLISHED",
            "url": published.get("url") or result.get("url"),
            "scheduled_at": scheduled_at,
        }
    )
    return result


def apply_success(draft: dict[str, Any], result: dict[str, Any]) -> dict[str, Any]:
    updated = dict(draft)
    status_map = {
        "BLOGGER_DRAFT_CREATED": ("BLOGGER_DRAFT_CREATED", "EDITOR_REVIEW"),
        "BLOGGER_SCHEDULED": ("BLOGGER_SCHEDULED", "POST_PUBLISH_VERIFICATION"),
        "BLOGGER_PUBLISHED": ("BLOGGER_PUBLISHED", "POST_PUBLISH_VERIFICATION"),
    }
    if result.get("status") not in status_map:
        raise ValueError("알 수 없는 Blogger 실행 결과입니다.")
    status, next_stage = status_map[str(result["status"])]
    updated.update(
        {
            "status": status,
            "next_stage": next_stage,
            "blogger_blog_id": result.get("blog_id"),
            "blogger_post_id": result.get("post_id"),
            "blogger_url": result.get("url"),
            "blogger_scheduled_at": result.get("scheduled_at"),
            "publisher_completed_at": _now(),
            "publisher_error": None,
        }
    )
    return updated


def queue_failure(
    retry_dir: Path,
    request: dict[str, Any],
    draft_path: Path,
    error: Exception,
) -> Path:
    retry_dir.mkdir(parents=True, exist_ok=True)
    content_id = str(request.get("content_id", "unknown"))
    payload = {
        "content_id": content_id,
        "queued_at": _now(),
        "status": "PUBLISH_RETRY_QUEUED",
        "reason": str(error),
        "request": request,
        "draft_path": str(draft_path),
        "attempt_count": 1,
        "automatic_retry_blocked": True,
        "block_reason": "Blogger 쓰기 성공 여부가 불확실한 상태에서 자동 재시도하면 중복 글이 생길 수 있습니다.",
    }
    path = retry_dir / f"{content_id}.json"
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return path


def run(
    request_path: Path,
    draft_path: Path,
    *,
    service_factory: Callable[[], Any] = build_service,
    retry_dir: Path = DEFAULT_RETRY_DIR,
    log_path: Path = DEFAULT_LOG,
) -> dict[str, Any]:
    request = load_json(request_path)
    draft = load_json(draft_path)
    mode = validate_contract(request, draft)

    try:
        service = service_factory()
        blog_id = resolve_blog_id(service, os.getenv("LIFEBOOKMOM_BLOGGER_BLOG_ID", "").strip())
        result = execute_with_service(service, blog_id, request)
        updated = apply_success(draft, result)
        draft_path.write_text(json.dumps(updated, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        output = {
            **result,
            "content_id": request["content_id"],
            "publish_mode": mode,
            "draft_path": str(draft_path),
            "next_stage": updated["next_stage"],
        }
        _append_log(log_path, output)
        return output
    except Exception as exc:
        retry_path = queue_failure(retry_dir, request, draft_path, exc)
        failed = dict(draft)
        failed.update(
            {
                "status": "PUBLISH_FAILED",
                "next_stage": "PUBLISH_REVIEW_REQUIRED",
                "publisher_error": str(exc),
                "publisher_failed_at": _now(),
                "retry_queue_path": str(retry_path),
            }
        )
        draft_path.write_text(json.dumps(failed, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        output = {
            "status": "BLOGGER_PUBLISH_FAILED",
            "content_id": request.get("content_id"),
            "error": str(exc),
            "retry_queue_path": str(retry_path),
            "next_stage": "PUBLISH_REVIEW_REQUIRED",
        }
        _append_log(log_path, output)
        raise RuntimeError(json.dumps(output, ensure_ascii=False)) from exc


def main() -> int:
    parser = argparse.ArgumentParser(description="생활백서맘 검증 Publisher 요청 → Blogger 실행")
    parser.add_argument("request", type=Path)
    parser.add_argument("draft", type=Path)
    parser.add_argument("--retry-dir", type=Path, default=DEFAULT_RETRY_DIR)
    parser.add_argument("--log", type=Path, default=DEFAULT_LOG)
    args = parser.parse_args()
    try:
        result = run(
            args.request.resolve(),
            args.draft.resolve(),
            retry_dir=args.retry_dir,
            log_path=args.log,
        )
        print(json.dumps(result, ensure_ascii=False))
        return 0
    except Exception as exc:
        try:
            payload = json.loads(str(exc))
        except json.JSONDecodeError:
            payload = {"status": "BLOGGER_PUBLISH_FAILED", "error": str(exc)}
        print(json.dumps(payload, ensure_ascii=False))
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
