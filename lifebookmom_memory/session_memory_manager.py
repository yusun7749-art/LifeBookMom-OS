"""
LifeBookMom Factory Session Memory Manager

Purpose:
- Store project memory, not full conversations.
- Keep decisions, issues, current state and next actions.

This module only defines the memory format and update helpers.
"""

from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path


MEMORY_DIR = Path("lifebookmom_memory")
STATE_FILE = MEMORY_DIR / "current_state.json"


def save_state(data: dict) -> None:
    MEMORY_DIR.mkdir(parents=True, exist_ok=True)
    payload = {
        "updated_at": datetime.now(timezone.utc).isoformat(),
        "state": data,
    }
    STATE_FILE.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )


def load_state() -> dict:
    if not STATE_FILE.exists():
        return {}
    return json.loads(STATE_FILE.read_text(encoding="utf-8"))
