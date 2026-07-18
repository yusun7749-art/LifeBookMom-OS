"""Build a fail-closed Blogger publisher request from a PUBLISH_READY CMS draft."""
from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_OUTPUT_DIR = ROOT / "lifebookmom_publisher" / "ready"


def load_json(path: Path) -> dict[str, Any]:
    if not path.is_file():
        raise FileNotFoundError(f"파일을 찾을 수 없습니다: {path}")
    payload = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(payload, dict):
        raise ValueError("JSON 객체만 처리할 수 있습니다.")
    return payload


def _nonempty(value: Any, field: str) -> str:
    text = str(value or "").strip()
    if not text:
        raise ValueError(f"필수 항목이 없습니다: {field}")
    return text


def build_publish_request(
    draft: dict[str, Any],
    asset_qa: dict[str, Any],
    *,
    publish_mode: str = "draft",
    publish_at: str | None = None,
) -> tuple[dict[str, Any], dict[str, Any]]:
    if draft.get("status") != "PUBLISH_READY" or draft.get("next_stage") != "PUBLISH_READY":
        raise ValueError("PUBLISH_READY 상태의 CMS 초안만 처리할 수 있습니다.")
    if asset_qa.get("status") != "ASSET_QA_PASS" or asset_qa.get("passed") is not True:
        raise ValueError("ASSET_QA_PASS 보고서가 필요합니다.")

    content_id = _nonempty(draft.get("content_id"), "content_id")
    if asset_qa.get("content_id") != content_id:
        raise ValueError("초안과 Asset QA 보고서의 content_id가 다릅니다.")
    if asset_qa.get("issues"):
        raise ValueError("Asset QA 보고서에 해결되지 않은 문제가 있습니다.")

    mode = publish_mode.strip().lower()
    if mode not in {"draft", "schedule", "publish"}:
        raise ValueError("publish_mode는 draft, schedule, publish 중 하나여야 합니다.")
    if mode == "schedule" and not str(publish_at or "").strip():
        raise ValueError("예약 발행에는 publish_at이 필요합니다.")
    if mode != "schedule" and publish_at:
        raise ValueError("publish_at은 schedule 모드에서만 사용할 수 있습니다.")

    assets = draft.get("assets")
    if not isinstance(assets, list) or {item.get("type") for item in assets if isinstance(item, dict)} != {"thumbnail", "infographic"}:
        raise ValueError("검증된 thumbnail과 infographic 자산이 모두 필요합니다.")

    now = datetime.now(timezone.utc).isoformat()
    request = {
        "content_id": content_id,
        "channel": "blogger",
        "title": _nonempty(draft.get("title"), "title"),
        "html": _nonempty(draft.get("html"), "html"),
        "plain_text": str(draft.get("plain_text", "")),
        "labels": draft.get("labels", []),
        "assets": assets,
        "publish_mode": mode,
        "publish_at": publish_at,
        "qa_report_id": draft.get("qa_report_id"),
        "asset_qa_status": "ASSET_QA_PASS",
        "prepared_at": now,
        "source_draft_status": "PUBLISH_READY",
    }

    updated = dict(draft)
    updated.update(
        {
            "status": "PUBLISH_REQUEST_READY",
            "next_stage": "BLOGGER_PUBLISHER",
            "publish_mode": mode,
            "publish_at": publish_at,
            "publish_request_prepared_at": now,
        }
    )
    return request, updated


def save_request(payload: dict[str, Any], output_dir: Path = DEFAULT_OUTPUT_DIR) -> Path:
    output_dir.mkdir(parents=True, exist_ok=True)
    path = output_dir / f"{payload['content_id']}.json"
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return path


def main() -> int:
    parser = argparse.ArgumentParser(description="생활백서맘 PUBLISH_READY → Blogger Publisher 요청")
    parser.add_argument("draft", type=Path)
    parser.add_argument("asset_qa", type=Path)
    parser.add_argument("--mode", default="draft", choices=["draft", "schedule", "publish"])
    parser.add_argument("--publish-at")
    parser.add_argument("--output-dir", type=Path, default=DEFAULT_OUTPUT_DIR)
    args = parser.parse_args()

    try:
        draft_path = args.draft.resolve()
        request, updated = build_publish_request(
            load_json(draft_path),
            load_json(args.asset_qa.resolve()),
            publish_mode=args.mode,
            publish_at=args.publish_at,
        )
        request_path = save_request(request, args.output_dir)
        draft_path.write_text(json.dumps(updated, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(json.dumps({
            "status": "PUBLISH_REQUEST_READY",
            "content_id": request["content_id"],
            "request_path": str(request_path),
            "draft_path": str(draft_path),
            "publish_mode": request["publish_mode"],
            "next_stage": "BLOGGER_PUBLISHER",
        }, ensure_ascii=False))
        return 0
    except Exception as exc:
        print(json.dumps({"status": "PUBLISH_READY_FAIL", "error": str(exc)}, ensure_ascii=False))
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
