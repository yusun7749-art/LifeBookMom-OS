"""Create deterministic LifeBookMom image-production requests from article drafts."""
from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_OUTPUT_DIR = ROOT / "lifebookmom_assets" / "requests"


def load_draft(path: Path) -> dict[str, Any]:
    if not path.is_file():
        raise FileNotFoundError(f"초안 파일을 찾을 수 없습니다: {path}")
    payload = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(payload, dict) or payload.get("status") not in {"DRAFT_GENERATED", "QA_PASS"}:
        raise ValueError("DRAFT_GENERATED 또는 QA_PASS 상태의 초안만 처리할 수 있습니다.")
    if not str(payload.get("content_id", "")).strip():
        raise ValueError("content_id가 없습니다.")
    return payload


def build_asset_request(draft: dict[str, Any]) -> dict[str, Any]:
    title = str(draft.get("title", "")).strip()
    content_id = str(draft["content_id"])
    return {
        "asset_request_id": f"ASSET-{content_id}",
        "content_id": content_id,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "status": "ASSET_REQUESTED",
        "next_stage": "IMAGE_GENERATION",
        "brand_lock": {
            "brand": "생활백서맘",
            "character": "초등학교 3학년 장발 한국인 여자아이",
            "character_name_in_visible_text_forbidden": True,
            "style": "밝은 크림톤 배경의 부드러운 파스텔 수채화",
            "watermark": "투명 월계관·하트 생활백서맘 워터마크를 이미지 내부 우측 하단",
        },
        "assets": [
            {
                "type": "thumbnail",
                "required": True,
                "aspect_ratio": "16:9",
                "title": title,
                "prompt": f"{title} 주제를 한눈에 이해할 수 있는 생활백서맘 대표 썸네일. 밝고 따뜻한 실제 생활 장면, 과밀하지 않은 구성, 큰 제목 영역 확보.",
                "output_name": f"{content_id}-thumbnail.png",
            },
            {
                "type": "infographic",
                "required": True,
                "aspect_ratio": "9:16",
                "panel_count": 10,
                "title": title,
                "prompt": f"{title} 내용을 1번부터 10번까지 세로형 카드로 설명하는 생활백서맘 교육 인포그래픽. 각 패널은 짧은 핵심 문구와 상황 그림으로 구성.",
                "output_name": f"{content_id}-infographic.png",
            },
        ],
        "qa_rules": {
            "thumbnail_required": True,
            "infographic_required": True,
            "infographic_panel_count": 10,
            "watermark_required": True,
            "watermark_position": "bottom-right-inside",
            "adult_or_teen_character_forbidden": True,
            "male_main_character_forbidden": True,
        },
    }


def save_asset_request(payload: dict[str, Any], output_dir: Path = DEFAULT_OUTPUT_DIR) -> Path:
    output_dir.mkdir(parents=True, exist_ok=True)
    path = output_dir / f"{payload['content_id']}.json"
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return path


def main() -> int:
    parser = argparse.ArgumentParser(description="생활백서맘 글 초안 → 이미지 제작 요청")
    parser.add_argument("draft", type=Path)
    parser.add_argument("--output-dir", type=Path, default=DEFAULT_OUTPUT_DIR)
    args = parser.parse_args()
    try:
        payload = build_asset_request(load_draft(args.draft.resolve()))
        path = save_asset_request(payload, args.output_dir)
        print(json.dumps({"status": "ASSET_REQUEST_CREATED", "content_id": payload["content_id"], "path": str(path), "next_stage": payload["next_stage"]}, ensure_ascii=False))
        return 0
    except Exception as exc:
        print(json.dumps({"status": "ASSET_REQUEST_FAIL", "error": str(exc)}, ensure_ascii=False))
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
