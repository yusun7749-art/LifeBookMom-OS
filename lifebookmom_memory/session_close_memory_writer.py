"""
LifeBookMom Factory Session Close Memory Writer

Purpose:
- Connect session summary output to persistent memory.
- Store continuation context only.
- Never store full conversations or generated content.
"""

from pathlib import Path
import json
from datetime import datetime, timezone

MEMORY_PATH = Path("lifebookmom_memory/session_summary.json")


def write_memory_close(current_state, decisions=None, issues=None, next_actions=None):
    payload = {
        "updated_at": datetime.now(timezone.utc).isoformat(),
        "current_state": current_state,
        "decisions": decisions or [],
        "issues": issues or [],
        "next_actions": next_actions or [],
    }

    MEMORY_PATH.parent.mkdir(parents=True, exist_ok=True)
    MEMORY_PATH.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    return payload


if __name__ == "__main__":
    write_memory_close(
        "MASTER MEMORY session close connection",
        next_actions=["restore session", "continue memory automation"],
    )
