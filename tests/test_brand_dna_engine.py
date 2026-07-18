from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ENGINE = ROOT / "lifebookmom_engine"
if str(ENGINE) not in sys.path:
    sys.path.insert(0, str(ENGINE))

from brand_dna_engine import apply_brand_dna, validate_brand_dna


def _generic_draft() -> dict[str, object]:
    sections = "".join(
        f"<h2>정보 {index}</h2><p>아이의 마음과 부모의 기준을 현실적으로 살펴봅니다.</p>"
        for index in range(1, 7)
    )
    return {
        "html": (
            "<p><strong>일반 도입</strong></p><p>설명형 도입입니다.</p>"
            + sections
            + "<h2>우리 집에서 바로 해볼 체크리스트</h2><ul><li>확인하기</li></ul>"
            + "<h2>생활백서맘의 정리</h2><p>기존 일반 정리입니다.</p>"
            + "<h2>FAQ 자주 묻는 질문</h2><h3>질문</h3><p>답변</p>"
        )
    }


def test_apply_brand_dna_replaces_generic_lead_and_preserves_information() -> None:
    branded = apply_brand_dna(_generic_draft(), "나만 친구 집에 못 가?")

    assert branded["brand_status"] == "BRAND_DNA_APPLIED"
    assert str(branded["html"]).startswith('<section data-lbm="story-opening">')
    assert "“엄마, 나만 친구 집에 못 가?”" in str(branded["html"])
    assert "일반 도입" not in str(branded["html"])
    assert "정보 6" in str(branded["html"])
    assert "FAQ 자주 묻는 질문" in str(branded["html"])
    assert "기존 일반 정리" not in str(branded["html"])


def test_brand_dna_report_passes_only_complete_branded_draft() -> None:
    report = validate_brand_dna(apply_brand_dna(_generic_draft(), "나만 친구 집에 못 가?"))

    assert report.passed is True
    assert report.score == 100
    assert report.issues == []


def test_generic_draft_is_blocked_by_brand_qa() -> None:
    report = validate_brand_dna(_generic_draft())

    assert report.passed is False
    assert report.score < 100
    assert "story_opening" in report.issues
    assert "parent_reflection" in report.issues
    assert "emotional_closing" in report.issues
