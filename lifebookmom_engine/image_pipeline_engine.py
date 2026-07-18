"""LifeBookMom image planning and fail-closed asset QA.

Creates deterministic specifications for the three required brand images and
blocks Blogger delivery until actual local assets and metadata are present.
"""
from __future__ import annotations

import json
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Any

REQUIRED_TYPES = ("thumbnail", "body", "infographic")
ALLOWED_SUFFIXES = {".png", ".jpg", ".jpeg", ".webp"}


@dataclass(frozen=True)
class ImageIssue:
    code: str
    message: str
    severity: str = "error"


@dataclass(frozen=True)
class ImageQAResult:
    passed: bool
    asset_count: int
    required_count: int
    issues: list[ImageIssue]

    def to_dict(self) -> dict[str, Any]:
        payload = asdict(self)
        payload["status"] = "IMAGE_QA_PASS" if self.passed else "IMAGE_QA_FAIL"
        return payload


def build_image_plan(request_id: str, topic: str, output_dir: Path) -> dict[str, Any]:
    base = output_dir / request_id
    return {
        "request_id": request_id,
        "topic": topic,
        "brand": "생활백서맘",
        "status": "IMAGE_ASSETS_REQUIRED",
        "rules": {
            "character": "초등학교 3학년 긴 머리 한국인 여자아이",
            "style": "밝은 크림톤 배경, 부드러운 파스텔 수채화, 둥근 카드형",
            "watermark": "투명 배경 월계관-하트 생활백서맘 워터마크를 이미지 내부 우측 하단",
            "prohibited": ["본문에 리니 이름 표기", "성인 또는 청소년 외형", "워터마크 누락"],
        },
        "assets": [
            {
                "type": "thumbnail",
                "path": str(base / "thumbnail.png"),
                "alt": f"{topic} 생활백서맘 대표 이미지",
                "representative": True,
                "prompt": f"{topic}을 한눈에 보여주는 생활백서맘 공식 썸네일",
            },
            {
                "type": "body",
                "path": str(base / "body-01.png"),
                "alt": f"{topic} 상황을 보여주는 본문 이미지",
                "representative": False,
                "prompt": f"{topic}의 실제 생활 장면을 감정적으로 보여주는 본문 삽화",
            },
            {
                "type": "infographic",
                "path": str(base / "infographic-10cut.png"),
                "alt": f"{topic} 핵심 내용을 정리한 세로형 10컷 인포그래픽",
                "representative": False,
                "prompt": f"{topic} 핵심 정보를 1번부터 10번까지 정리한 세로형 10컷 인포그래픽",
            },
        ],
    }


def save_image_plan(plan: dict[str, Any], path: Path) -> Path:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(plan, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return path


def validate_image_plan(plan: Any) -> ImageQAResult:
    issues: list[ImageIssue] = []
    if not isinstance(plan, dict):
        return ImageQAResult(False, 0, len(REQUIRED_TYPES), [ImageIssue("IMAGE_PLAN_INVALID", "이미지 계획은 객체여야 합니다.")])

    assets = plan.get("assets", [])
    if not isinstance(assets, list):
        return ImageQAResult(False, 0, len(REQUIRED_TYPES), [ImageIssue("IMAGE_ASSETS_INVALID", "assets는 배열이어야 합니다.")])

    by_type = {str(item.get("type", "")): item for item in assets if isinstance(item, dict)}
    for image_type in REQUIRED_TYPES:
        item = by_type.get(image_type)
        if not item:
            issues.append(ImageIssue("IMAGE_TYPE_MISSING", f"필수 이미지가 없습니다: {image_type}"))
            continue
        path_text = str(item.get("path", "")).strip()
        alt = str(item.get("alt", "")).strip()
        if not path_text:
            issues.append(ImageIssue("IMAGE_PATH_MISSING", f"이미지 경로가 없습니다: {image_type}"))
        else:
            path = Path(path_text)
            if path.suffix.lower() not in ALLOWED_SUFFIXES:
                issues.append(ImageIssue("IMAGE_FORMAT_INVALID", f"허용되지 않은 이미지 형식입니다: {path}"))
            elif not path.is_file() or path.stat().st_size == 0:
                issues.append(ImageIssue("IMAGE_FILE_MISSING", f"실제 이미지 파일을 찾을 수 없습니다: {path}"))
        if not alt:
            issues.append(ImageIssue("IMAGE_ALT_MISSING", f"ALT 문구가 없습니다: {image_type}"))

    thumbnail = by_type.get("thumbnail", {})
    if thumbnail and thumbnail.get("representative") is not True:
        issues.append(ImageIssue("REPRESENTATIVE_IMAGE_MISSING", "썸네일이 대표 이미지로 지정되지 않았습니다."))

    passed = not any(issue.severity == "error" for issue in issues)
    return ImageQAResult(passed, len(assets), len(REQUIRED_TYPES), issues)
