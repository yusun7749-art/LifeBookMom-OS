"""LifeBookMom brand DNA transformation and validation.

This module converts a structurally valid generic draft into a LifeBookMom draft
before content QA or Blogger delivery. It is deterministic so the same topic is
reviewable and testable without an external model call.
"""
from __future__ import annotations

import html
import re
from dataclasses import dataclass
from typing import Any


BRAND_VERSION = "LIFEBOOKMOM_DNA_V1"


@dataclass(frozen=True)
class BrandDNAReport:
    passed: bool
    score: int
    checks: dict[str, bool]
    issues: list[str]

    def to_dict(self) -> dict[str, Any]:
        return {
            "brand_version": BRAND_VERSION,
            "passed": self.passed,
            "score": self.score,
            "checks": self.checks,
            "issues": self.issues,
        }


def _plain(value: str) -> str:
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", value)).strip()


def _topic_text(topic: str) -> str:
    return re.sub(r"[\"'“”‘’]", "", str(topic)).strip()


def build_story_opening(topic: str) -> str:
    safe_topic = html.escape(_topic_text(topic))
    return "".join(
        [
            '<section data-lbm="story-opening">',
            '<p>퇴근하고 현관문을 열었는데, 아이가 가방도 내려놓지 않은 채 제 표정부터 살폈습니다.</p>',
            f'<p><strong>“엄마, {safe_topic}”</strong></p>',
            '<p>평소 같으면 먼저 손부터 씻으라고 했을 텐데, 그날은 아이의 목소리가 자꾸 마음에 걸렸습니다. 허락을 받아내려는 말보다 친구들 사이에서 혼자 남을까 봐 걱정하는 마음이 먼저 들렸기 때문입니다.</p>',
            '<p>저는 바로 답을 정하지 않고 아이 옆에 앉았습니다. “오늘 무슨 일이 있었는지 엄마가 먼저 들어볼게.” 그 한마디를 하고 나니, 제가 해결해야 할 것은 요청 하나가 아니라 아이가 하루 동안 품고 온 마음이라는 걸 알게 됐습니다.</p>',
            '</section>',
        ]
    )


def build_parent_reflection(topic: str) -> str:
    safe_topic = html.escape(_topic_text(topic))
    return "".join(
        [
            '<section data-lbm="parent-reflection">',
            '<h2>아이의 마음보다 제 걱정을 먼저 보고 있었습니다</h2>',
            f'<p>처음에는 “{safe_topic}”라는 말에 안 되는 이유부터 떠올렸습니다. 퇴근 시간, 안전 문제, 상대 보호자에게 연락해야 하는 번거로움까지 머릿속이 빠르게 복잡해졌습니다.</p>',
            '<p>그런데 아이가 원한 것은 무조건적인 허락이 아니었습니다. 친구들과 같은 경험을 하고 싶고, 엄마가 자기 이야기를 가볍게 넘기지 않았으면 하는 마음이었습니다. 그제야 저는 아이를 지키려는 기준과 제 불안을 편하게 만들기 위한 제한이 섞여 있지는 않은지 돌아보게 됐습니다.</p>',
            '<p>아이의 마음을 인정한다고 해서 모든 요구를 들어줘야 하는 것은 아닙니다. 다만 결론보다 먼저 “그랬구나”라고 말해 주는 순간, 대화는 허락과 거절의 싸움이 아니라 함께 방법을 찾는 시간이 됐습니다.</p>',
            '</section>',
        ]
    )


def build_emotional_closing() -> str:
    return "".join(
        [
            '<section data-lbm="emotional-closing">',
            '<h2>생활백서맘의 오늘</h2>',
            '<p>부모는 아이의 모든 길을 대신 걸어줄 수는 없지만, 아이가 자기 마음을 잃지 않고 걸어갈 수 있도록 옆에서 기준을 함께 세워줄 수는 있습니다.</p>',
            '<p>오늘 아이가 꺼낸 한마디를 문제로만 보지 않고, 그 말 뒤에 있는 마음까지 한 번 더 바라봐 주세요. 매일의 작은 순간이 우리를 행복하게 만들어 줍니다.</p>',
            '</section>',
        ]
    )


def apply_brand_dna(draft: dict[str, Any], topic: str) -> dict[str, Any]:
    """Return a copy with LifeBookMom story, reflection and emotional closing."""
    result = dict(draft)
    original = str(result.get("html", "")).strip()
    if not original:
        raise ValueError("브랜드 DNA를 적용할 본문 HTML이 없습니다.")

    opening = build_story_opening(topic)
    reflection = build_parent_reflection(topic)
    closing = build_emotional_closing()
    first_h2 = original.find("<h2>")
    body = original[first_h2:] if first_h2 >= 0 else original
    body = re.sub(
        r"<h2>생활백서맘의 정리</h2>.*?(?=<h2>FAQ 자주 묻는 질문</h2>)",
        "",
        body,
        flags=re.DOTALL,
    )
    faq_at = body.find("<h2>FAQ 자주 묻는 질문</h2>")
    if faq_at >= 0:
        body = body[:faq_at] + closing + body[faq_at:]
    else:
        body += closing

    result["html"] = opening + reflection + body
    result["brand_dna"] = {
        "version": BRAND_VERSION,
        "story_opening": True,
        "child_dialogue": True,
        "parent_reflection": True,
        "emotional_closing": True,
        "generic_lead_replaced": True,
    }
    result["brand_status"] = "BRAND_DNA_APPLIED"
    return result


def validate_brand_dna(draft: dict[str, Any]) -> BrandDNAReport:
    source = str(draft.get("html", ""))
    text = _plain(source)
    checks = {
        "story_opening": 'data-lbm="story-opening"' in source,
        "child_dialogue": bool(re.search(r"[“\"]엄마[,，]?\s*[^”\"]+[”\"]", text)),
        "parent_reflection": 'data-lbm="parent-reflection"' in source,
        "first_person_parent_voice": any(token in text for token in ("저는", "제 걱정", "돌아보게")),
        "emotion_language": any(token in text for token in ("마음", "속상", "걱정", "그랬구나")),
        "practical_information_preserved": source.count("<h2>") >= 6,
        "checklist_preserved": "체크리스트" in text and "<ul>" in source,
        "faq_preserved": "FAQ 자주 묻는 질문" in text,
        "emotional_closing": 'data-lbm="emotional-closing"' in source,
        "brand_signature": "매일의 작은 순간이 우리를 행복하게 만들어 줍니다" in text,
        "forbidden_character_name_absent": "리니" not in text,
    }
    issues = [name for name, passed in checks.items() if not passed]
    score = round(sum(checks.values()) / len(checks) * 100)
    return BrandDNAReport(passed=not issues, score=score, checks=checks, issues=issues)
