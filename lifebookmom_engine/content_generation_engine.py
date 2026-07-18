"""Generate structured draft content from a LifeBookMom CMS request.

This first generation layer creates a QA-ready draft structure. It does not publish
and does not bypass QA.
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any


REQUIRED_SECTIONS = [
    "상황형 도입",
    "아이 마음 이해",
    "부모가 점검할 시선",
    "현실적인 해결 방법",
    "실천 체크리스트",
    "FAQ",
    "관련 글",
]


def build_content_draft(request: dict[str, Any]) -> dict[str, Any]:
    topic = str(request.get("topic", "")).strip()
    if not topic:
        raise ValueError("topic is required")

    return {
        "content_id": request.get("request_id", ""),
        "source_request_id": request.get("request_id", ""),
        "title": topic,
        "channel": request.get("channel", "blogger"),
        "status": "CONTENT_GENERATED",
        "sections": REQUIRED_SECTIONS,
        "html": "",
        "qa_required": True,
        "next_stage": "QA_GATE",
    }


def load_request(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def save_draft(draft: dict[str, Any], path: Path) -> Path:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return path
