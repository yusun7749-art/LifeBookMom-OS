from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DECISION_LOG = ROOT / "MASTER_DECISION_LOG.md"
ROADMAP_LOG = ROOT / "MASTER_ROADMAP.md"


def timestamp() -> str:
    return datetime.now(timezone.utc).isoformat()


def append_log(path: Path, title: str, lines: list[str]) -> None:
    with path.open("a", encoding="utf-8") as file:
        file.write("\n\n")
        file.write(f"## {title}\n")
        file.write(f"- 기록 시간: {timestamp()}\n")
        for line in lines:
            file.write(f"- {line}\n")


def write_master_log(task: str, status: str, result: str, next_step: str = "") -> None:
    lines = [f"작업: {task}", f"상태: {status}", f"결과: {result}"]
    if next_step:
        lines.append(f"다음 작업: {next_step}")

    append_log(DECISION_LOG, "MASTER LOG ENTRY", lines)
    append_log(ROADMAP_LOG, "STATUS UPDATE", lines)


if __name__ == "__main__":
    write_master_log(
        "MASTER LOG Writer Test",
        "TEST",
        "Writer execution check",
        "Connect automation event source",
    )
    print("MASTER_LOG_WRITER_READY")
