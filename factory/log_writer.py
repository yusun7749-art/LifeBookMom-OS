"""MASTER LOG AUTO WRITER ENGINE

Append-only project execution logger.

Flow:
execution result -> log writer -> MASTER LOG append

This module intentionally never rewrites existing logs.
"""

from datetime import datetime
from pathlib import Path


class MasterLogWriter:
    def __init__(self, log_path="MASTER_LOG_CURRENT.md"):
        self.log_path = Path(log_path)

    def append(self, sprint, action, result, next_step=""):
        block = f"""
\n---\n
## {datetime.now().isoformat(timespec='seconds')}

- Sprint: {sprint}
- Action: {action}
- Result: {result}
- Next: {next_step}

"""
        self.log_path.parent.mkdir(parents=True, exist_ok=True)
        with self.log_path.open("a", encoding="utf-8") as f:
            f.write(block)


if __name__ == "__main__":
    MasterLogWriter().append(
        "Sprint020-03.5",
        "MASTER LOG AUTO WRITER ENGINE bootstrap",
        "writer module created",
        "connect execution tracker and git release"
    )
