"""Create a durable LifeBookMom content-production request from one topic.

This engine intentionally does not fabricate a publishable article. It converts the
captain's topic into a normalized CMS request that later content, QA and publisher
stages can process. The output is UTF-8 JSON and never contains credentials.
"""

from __future__ import annotations

import argparse
import json
import re
import unicodedata
from dataclasses import asdict, dataclass
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_OUTPUT_DIR = ROOT / "lifebookmom_cms" / "requests"


def _now_utc() -> datetime:
    return datetime.now(timezone.utc)


def normalize_topic(value: str) -> str:
    topic = " ".join(unicodedata.normalize("NFKC", value).split())
    if len(topic) < 3:
        raise ValueError("주제는 3자 이상이어야 합니다.")
    if len(topic) > 200:
        raise ValueError("주제는 200자를 초과할 수 없습니다.")
    return topic


def safe_slug(value: str) -> str:
    normalized = unicodedata.normalize("NFKC", value).lower()
    slug = re.sub(r"[^0-9a-z가-힣]+", "-", normalized).strip("-")
    return slug[:70] or "content"


@dataclass(frozen=True)
class ContentRequest:
    request_id: str
    created_at: str
    project: str
    channel: str
    status: str
    topic: str
    category: str
    audience: str
    voice: str
    required_sections: list[str]
    rules: dict[str, object]
    next_stage: str


def build_request(topic: str, *, category: str = "미분류", channel: str = "blogger") -> ContentRequest:
    clean_topic = normalize_topic(topic)
    clean_category = " ".join(category.split()) or "미분류"
    now = _now_utc()
    request_id = f"LBM-{now.strftime('%Y%m%dT%H%M%SZ')}-{safe_slug(clean_topic)[:24]}"
    return ContentRequest(
        request_id=request_id,
        created_at=now.isoformat(),
        project="생활백서맘",
        channel=channel,
        status="CONTENT_REQUESTED",
        topic=clean_topic,
        category=clean_category,
        audience="2026년 한국에서 초등학생을 키우는 부모",
        voice="현실적인 상황과 아이의 마음에서 출발하는 생활백서맘 문체",
        required_sections=[
            "상황형 도입",
            "아이 마음 이해",
            "부모가 점검할 시선",
            "현실적인 해결 방법",
            "실천 체크리스트",
            "FAQ",
            "관련 글",
        ],
        rules={
            "minimum_visible_text_length": 5000,
            "qa_required": True,
            "publish_before_qa": False,
            "generic_product_repetition_forbidden": True,
            "character_name_in_body_forbidden": True,
            "manual_json_edit_required": False,
        },
        next_stage="CONTENT_GENERATION",
    )


def save_request(request: ContentRequest, output_dir: Path = DEFAULT_OUTPUT_DIR) -> Path:
    output_dir.mkdir(parents=True, exist_ok=True)
    path = output_dir / f"{request.request_id}.json"
    path.write_text(json.dumps(asdict(request), ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return path


def main() -> int:
    parser = argparse.ArgumentParser(description="생활백서맘 주제 입력 요청 생성기")
    parser.add_argument("topic", help="글 주제 또는 아이가 실제로 한 말")
    parser.add_argument("--category", default="미분류")
    parser.add_argument("--channel", default="blogger", choices=["blogger", "naver", "both"])
    parser.add_argument("--output-dir", type=Path, default=DEFAULT_OUTPUT_DIR)
    args = parser.parse_args()

    try:
        request = build_request(args.topic, category=args.category, channel=args.channel)
        path = save_request(request, args.output_dir)
        print(json.dumps({"status": "CONTENT_REQUEST_CREATED", "request_id": request.request_id, "path": str(path)}, ensure_ascii=False))
        return 0
    except Exception as exc:
        print(json.dumps({"status": "CONTENT_REQUEST_FAIL", "error": str(exc)}, ensure_ascii=False))
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
