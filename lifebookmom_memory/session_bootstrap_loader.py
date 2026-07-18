"""
LifeBookMom Factory Session Bootstrap Loader

다음 세션 시작 시 MASTER MEMORY를 읽어 현재 위치를 복원하기 위한 모듈.
전체 대화 저장 목적이 아니라 프로젝트 맥락 복원 목적.
"""

from pathlib import Path


BASE = Path(__file__).resolve().parent.parent
MEMORY_FILE = BASE / "lifebookmom_factory" / "MASTER_MEMORY.md"


def load_bootstrap_memory() -> str:
    if not MEMORY_FILE.exists():
        return "MASTER MEMORY 없음"
    return MEMORY_FILE.read_text(encoding="utf-8")


if __name__ == "__main__":
    print(load_bootstrap_memory())
