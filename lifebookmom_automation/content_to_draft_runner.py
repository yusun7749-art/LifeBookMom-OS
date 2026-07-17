"""One command: topic -> CMS request -> editable article draft."""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ENGINE_DIR = ROOT / "lifebookmom_engine"
if str(ENGINE_DIR) not in sys.path:
    sys.path.insert(0, str(ENGINE_DIR))

from article_draft_engine import build_draft, save_draft
from content_request_engine import build_request, save_request


def run(topic: str, category: str, channel: str = "blogger") -> dict[str, str]:
    request = build_request(topic, category=category, channel=channel)
    request_path = save_request(request)
    draft = build_draft(json.loads(request_path.read_text(encoding="utf-8")))
    draft_path = save_draft(draft)
    return {
        "status": "TOPIC_TO_DRAFT_PASS",
        "request_id": request.request_id,
        "request_path": str(request_path),
        "draft_path": str(draft_path),
        "next_stage": "QA",
    }


def main() -> int:
    parser = argparse.ArgumentParser(description="생활백서맘 주제 → 요청 → 글 초안")
    parser.add_argument("topic")
    parser.add_argument("--category", default="미분류")
    parser.add_argument("--channel", default="blogger", choices=["blogger", "naver", "both"])
    args = parser.parse_args()
    try:
        print(json.dumps(run(args.topic, args.category, args.channel), ensure_ascii=False))
        return 0
    except Exception as exc:
        print(json.dumps({"status": "TOPIC_TO_DRAFT_FAIL", "error": str(exc)}, ensure_ascii=False))
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
