"""
LifeBookMom Memory Session Summary Engine

Purpose:
Create a compact project memory summary.
Does not store full conversations or generated contents.
Stores only context needed for continuation.
"""

from datetime import datetime, timezone
import json
from pathlib import Path


MEMORY_FILE = Path("lifebookmom_factory/MASTER_MEMORY.md")


def create_session_summary(current_state, next_actions):
    return {
        "updated_at": datetime.now(timezone.utc).isoformat(),
        "current_state": current_state,
        "next_actions": next_actions,
    }


def save_session_summary(data, path="lifebookmom_memory/session_summary.json"):
    target = Path(path)
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")


if __name__ == "__main__":
    save_session_summary(
        create_session_summary(
            "MASTER MEMORY automation in progress",
            ["session restore", "memory connection"]
        )
    )
