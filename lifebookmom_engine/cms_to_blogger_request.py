"""Convert generated CMS drafts into Blogger publisher request payloads.

This module only transforms data. It does not publish and does not bypass QA.
"""
from __future__ import annotations

from typing import Any


def build_blogger_request(draft: dict[str, Any]) -> dict[str, Any]:
    if not draft.get("qa_required", True):
        raise ValueError("QA gate is required")
    if draft.get("next_stage") not in {"QA_GATE", "BLOGGER_DRAFT"}:
        raise ValueError("draft is not ready for publisher conversion")

    title = str(draft.get("title", "")).strip()
    html = str(draft.get("html", "")).strip()
    if not title:
        raise ValueError("title is required")
    if not html:
        raise ValueError("html is required")

    return {
        "title": title,
        "html": html,
        "labels": draft.get("labels", ["생활백서맘"]),
        "source_content_id": draft.get("content_id", ""),
        "status": "READY_FOR_BLOGGER_REQUEST",
    }
