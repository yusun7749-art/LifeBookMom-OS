"""MASTER LOG append manager for LifeBookMom Factory."""
from pathlib import Path
from datetime import datetime

DEFAULT_LOG = Path("docs/MASTER_LOG_CURRENT.md")


def append_log(message: str, log_path: Path = DEFAULT_LOG):
    log_path.parent.mkdir(parents=True, exist_ok=True)
    stamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    block = f"\n## {stamp}\n{message}\n"
    with log_path.open("a", encoding="utf-8") as f:
        f.write(block)

    return log_path
