from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
ENGINE = ROOT / "lifebookmom_engine"
if str(ENGINE) not in sys.path:
    sys.path.insert(0, str(ENGINE))

from cms_to_blogger_request import build_blogger_request


def test_cms_draft_converts_to_blogger_request():
    draft = {
        "title": "테스트 제목",
        "html": "<p>본문</p>",
        "labels": ["생활백서맘", "테스트"],
        "qa_required": True,
    }

    result = build_blogger_request(draft)

    assert result["title"] == "테스트 제목"
    assert result["html"] == "<p>본문</p>"
    assert result["labels"] == ["생활백서맘", "테스트"]


def test_cms_draft_requires_qa():
    draft = {
        "title": "테스트 제목",
        "html": "<p>본문</p>",
        "labels": [],
        "qa_required": False,
    }

    try:
        build_blogger_request(draft)
    except ValueError:
        return

    raise AssertionError("QA required draft must be blocked")
