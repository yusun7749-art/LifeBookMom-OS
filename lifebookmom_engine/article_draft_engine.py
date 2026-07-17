"""Create an editable LifeBookMom Blogger draft from a CMS content request."""
from __future__ import annotations

import argparse
import html
import json
import re
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_OUTPUT_DIR = ROOT / "lifebookmom_cms" / "drafts"


def load_request(path: Path) -> dict[str, Any]:
    if not path.is_file():
        raise FileNotFoundError(f"요청 파일을 찾을 수 없습니다: {path}")
    payload = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(payload, dict) or payload.get("status") != "CONTENT_REQUESTED":
        raise ValueError("CONTENT_REQUESTED 상태의 요청만 처리할 수 있습니다.")
    if len(str(payload.get("topic", "")).strip()) < 3:
        raise ValueError("요청에 유효한 topic이 없습니다.")
    return payload


def clean_topic(topic: str) -> str:
    return re.sub(r"[\"'“”‘’]", "", topic).strip()


def build_title(topic: str) -> str:
    value = clean_topic(topic)
    return value if len(value) <= 58 else value[:57].rstrip() + "…"


def build_html(request: dict[str, Any]) -> str:
    topic = html.escape(clean_topic(str(request["topic"])))
    sections = [
        ("그 말 뒤에 있던 아이의 마음", [
            f"아이에게 ‘{topic}’라는 말은 단순한 요구가 아닐 수 있습니다. 친구들과 같은 경험을 하고 싶다는 마음, 혼자만 뒤처지는 것 같다는 불안, 부모에게 내 마음을 알아달라는 신호가 함께 들어 있을 수 있습니다.",
            "부모는 허락하거나 거절할 이유부터 찾기 쉽습니다. 하지만 대답을 정하기 전에 아이가 어떤 장면에서 그런 생각을 했는지, 가장 속상했던 부분이 무엇인지 차분히 들어보는 과정이 필요합니다.",
            "감정을 인정해 주는 것과 모든 요구를 들어주는 것은 같은 일이 아닙니다. 마음은 충분히 받아주되 결정은 가족의 기준과 현실에 맞게 내릴 수 있습니다.",
        ]),
        ("부모가 먼저 점검해야 할 시선", [
            "우리 집의 기준이 아이의 성장에 필요한 안전장치인지, 부모의 불안만 줄이기 위한 제한인지 구분해 볼 필요가 있습니다. 아이의 나이, 약속을 지키는 정도, 이동 거리, 함께 있는 어른의 유무에 따라 판단은 달라질 수 있습니다.",
            "‘안 돼’라는 한마디로 끝내면 아이는 이유보다 거절당했다는 감정만 기억하기 쉽습니다. 가능한 조건과 아직 어려운 조건을 나누어 설명하는 편이 좋습니다.",
            "가족마다 생활시간과 돌봄 환경, 아이의 성향이 다릅니다. 남들과 똑같이 하는 것보다 우리 아이가 이해할 수 있는 기준을 만들고 일관되게 지키는 것이 중요합니다.",
        ]),
        ("현실적으로 대화를 시작하는 방법", [
            f"첫 문장은 설명보다 공감으로 시작합니다. ‘{topic}라고 느꼈구나. 어떤 일이 있었는지 먼저 듣고 싶어’처럼 말하면 아이가 방어적으로 변하는 것을 줄일 수 있습니다.",
            "그다음에는 언제, 어디서, 누구와, 얼마나 오래, 어른은 함께 있는지처럼 결정에 필요한 사실을 아이와 함께 정리합니다.",
            "바로 결론을 내리기 어렵다면 답할 시간을 약속하고 반드시 지킵니다. 기다리게만 하고 잊어버리는 경험이 반복되면 아이는 다음부터 부모에게 먼저 상의하지 않을 수 있습니다.",
        ]),
        ("허락과 거절 사이에 조건을 만드는 법", [
            "부모의 선택은 허락과 금지 두 가지만 있는 것이 아닙니다. 짧은 시간부터 시도하거나 부모가 데려다주고 데려오거나 연락 시간을 정하는 방식으로 단계적인 경험을 만들 수 있습니다.",
            "약속은 연락하기, 정해진 장소를 벗어나지 않기, 문제가 생기면 숨기지 않고 말하기처럼 핵심 세 가지 정도가 실제로 지키기 좋습니다.",
            "거절해야 한다면 오늘은 어렵지만 주말에 다시 계획하기, 보호자가 확인되는 날 시도하기, 짧은 만남부터 시작하기처럼 대안을 함께 제시합니다.",
        ]),
        ("한 번의 결정으로 끝내지 않기", [
            "결정한 뒤에는 약속이 잘 지켜졌는지, 예상과 달랐던 점은 무엇인지, 다음에는 무엇을 바꾸면 좋을지 함께 돌아봅니다.",
            "약속을 어겼을 때도 곧바로 모든 기회를 없애기보다 왜 지키기 어려웠는지 확인해야 필요한 연습을 찾을 수 있습니다.",
            "작은 경험을 안전하게 반복하면 아이는 자유와 책임이 함께 간다는 사실을 배우고 부모도 막연한 불안을 줄일 수 있습니다.",
        ]),
    ]
    parts = [f"<p><strong>‘{topic}’</strong></p>", "<p>아이의 한마디를 들으면 부모의 머릿속에는 걱정과 판단이 동시에 올라옵니다. 바로 답하기보다 아이의 마음과 우리 집의 기준을 함께 살펴볼 기회로 삼아봅니다.</p>"]
    for heading, paragraphs in sections:
        parts.append(f"<h2>{heading}</h2>")
        parts.extend(f"<p>{paragraph}</p>" for paragraph in paragraphs)
    parts.extend([
        "<h2>우리 집에서 바로 해볼 체크리스트</h2><ul><li>아이의 말을 끊지 않고 먼저 들었나요?</li><li>부모의 불안과 실제 위험을 구분했나요?</li><li>가능한 조건과 어려운 조건을 설명했나요?</li><li>지킬 약속을 세 가지 이내로 정했나요?</li><li>결정 후 돌아볼 시간을 정했나요?</li></ul>",
        f"<h2>생활백서맘의 정리</h2><p>‘{topic}’라는 말에 완벽한 정답은 없습니다. 아이의 마음을 먼저 듣고 우리 집의 현실적인 기준을 설명하며 작은 경험부터 책임 있게 넓혀갈 수 있습니다.</p><p>매일의 작은 순간이 우리를 행복하게 만들어 줍니다. 오늘의 대화가 서로의 마음을 알아가는 시간이 되기를 바랍니다.</p>",
        "<h2>FAQ 자주 묻는 질문</h2><h3>요구를 들어주지 못하면 미안해해야 하나요?</h3><p>감정을 인정하고 이유와 대안을 설명했다면 책임 있는 양육입니다.</p><h3>친구들은 다 된다고 화를 냅니다.</h3><p>가족마다 환경과 기준이 다르다는 점을 설명하되 우리 집 기준도 함께 점검하세요.</p><h3>약속을 어기면 다음부터 금지해야 하나요?</h3><p>먼저 어려웠던 이유를 확인하고 필요한 연습 뒤 더 작은 범위에서 다시 시도할 수 있습니다.</p>",
        "<h2>관련 글</h2><p>아이의 자율성과 안전 사이에서 기준을 세우는 글, 친구 관계에서 부모가 개입해야 하는 순간, 아이와 약속을 만드는 방법을 함께 살펴보세요.</p>",
    ])
    return "".join(parts)


def build_draft(request: dict[str, Any]) -> dict[str, Any]:
    category = str(request.get("category", "미분류")).strip() or "미분류"
    return {
        "content_id": request["request_id"],
        "source_request_id": request["request_id"],
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "channel": "blogger",
        "status": "DRAFT_GENERATED",
        "title": build_title(str(request["topic"])),
        "html": build_html(request),
        "labels": ["생활백서맘", category],
        "assets": [],
        "publish_mode": "draft",
        "publish_at": None,
        "qa_report_id": None,
        "next_stage": "QA",
    }


def save_draft(draft: dict[str, Any], output_dir: Path = DEFAULT_OUTPUT_DIR) -> Path:
    output_dir.mkdir(parents=True, exist_ok=True)
    path = output_dir / f"{draft['content_id']}.json"
    path.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return path


def main() -> int:
    parser = argparse.ArgumentParser(description="생활백서맘 콘텐츠 요청 → 글 초안 생성")
    parser.add_argument("request", type=Path)
    parser.add_argument("--output-dir", type=Path, default=DEFAULT_OUTPUT_DIR)
    args = parser.parse_args()
    try:
        draft = build_draft(load_request(args.request.resolve()))
        path = save_draft(draft, args.output_dir)
        print(json.dumps({"status": "DRAFT_GENERATED", "content_id": draft["content_id"], "path": str(path)}, ensure_ascii=False))
        return 0
    except Exception as exc:
        print(json.dumps({"status": "DRAFT_GENERATION_FAIL", "error": str(exc)}, ensure_ascii=False))
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
