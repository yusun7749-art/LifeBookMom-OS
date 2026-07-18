"""Fail-closed QA for completed LifeBookMom image assets.

Binary checks (file, format, dimensions, aspect ratio) are automatic. Semantic visual
checks such as ten distinct panels and the official watermark require an explicit
review JSON; they are never guessed from filenames.
"""
from __future__ import annotations

import argparse
import json
import struct
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_REPORT_DIR = ROOT / "lifebookmom_assets" / "qa_reports"


def load_json(path: Path) -> dict[str, Any]:
    if not path.is_file():
        raise FileNotFoundError(f"파일을 찾을 수 없습니다: {path}")
    payload = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(payload, dict):
        raise ValueError("JSON 객체만 처리할 수 있습니다.")
    return payload


def image_size(path: Path) -> tuple[int, int]:
    data = path.read_bytes()
    if data.startswith(b"\x89PNG\r\n\x1a\n") and len(data) >= 24:
        return struct.unpack(">II", data[16:24])
    if data.startswith(b"\xff\xd8"):
        index = 2
        while index + 9 < len(data):
            if data[index] != 0xFF:
                index += 1
                continue
            marker = data[index + 1]
            index += 2
            if marker in {0xD8, 0xD9}:
                continue
            if index + 2 > len(data):
                break
            length = int.from_bytes(data[index:index + 2], "big")
            if marker in {0xC0, 0xC1, 0xC2, 0xC3, 0xC5, 0xC6, 0xC7, 0xC9, 0xCA, 0xCB, 0xCD, 0xCE, 0xCF}:
                if index + 7 > len(data):
                    break
                height = int.from_bytes(data[index + 3:index + 5], "big")
                width = int.from_bytes(data[index + 5:index + 7], "big")
                return width, height
            index += max(length, 2)
    raise ValueError(f"PNG 또는 JPEG 크기를 읽을 수 없습니다: {path}")


def ratio_matches(width: int, height: int, expected: float, tolerance: float = 0.04) -> bool:
    if width <= 0 or height <= 0:
        return False
    return abs((width / height) - expected) <= tolerance


def validate(manifest: dict[str, Any], draft: dict[str, Any], review: dict[str, Any]) -> tuple[dict[str, Any], dict[str, Any]]:
    issues: list[dict[str, str]] = []
    if manifest.get("status") != "ASSETS_READY":
        issues.append({"code": "MANIFEST_STATE_INVALID", "message": "ASSETS_READY 상태가 아닙니다."})
    if draft.get("content_id") != manifest.get("content_id"):
        issues.append({"code": "CONTENT_ID_MISMATCH", "message": "manifest와 draft의 content_id가 다릅니다."})

    assets = {str(item.get("type")): item for item in manifest.get("assets", []) if isinstance(item, dict)}
    specs = {
        "thumbnail": {"ratio": 16 / 9, "min_width": 1200, "min_height": 675},
        "infographic": {"ratio": 9 / 16, "min_width": 900, "min_height": 1600},
    }
    measured: list[dict[str, Any]] = []
    for asset_type, spec in specs.items():
        asset = assets.get(asset_type)
        if not asset:
            issues.append({"code": f"{asset_type.upper()}_MISSING", "message": f"{asset_type} 파일이 없습니다."})
            continue
        path = Path(str(asset.get("path", "")))
        if not path.is_file():
            issues.append({"code": f"{asset_type.upper()}_FILE_NOT_FOUND", "message": str(path)})
            continue
        try:
            width, height = image_size(path)
            measured.append({"type": asset_type, "path": str(path), "width": width, "height": height})
            if width < spec["min_width"] or height < spec["min_height"]:
                issues.append({"code": f"{asset_type.upper()}_TOO_SMALL", "message": f"{width}x{height}"})
            if not ratio_matches(width, height, spec["ratio"]):
                issues.append({"code": f"{asset_type.upper()}_RATIO_INVALID", "message": f"{width}:{height}"})
        except Exception as exc:
            issues.append({"code": f"{asset_type.upper()}_READ_FAIL", "message": str(exc)})

    required_reviews = {
        "infographic_has_10_panels": "인포그래픽 10패널 확인이 필요합니다.",
        "watermark_present_bottom_right_inside": "공식 워터마크의 우측 하단 내부 배치를 확인해야 합니다.",
        "character_matches_brand_lock": "초등학교 3학년 한국인 여자아이 캐릭터 일치 확인이 필요합니다.",
        "no_adult_teen_or_male_main_character": "금지 캐릭터가 없는지 확인해야 합니다.",
        "text_is_legible_and_not_clipped": "문구 가독성과 잘림 여부 확인이 필요합니다.",
    }
    for key, message in required_reviews.items():
        if review.get(key) is not True:
            issues.append({"code": f"REVIEW_{key.upper()}_REQUIRED", "message": message})

    passed = not issues
    now = datetime.now(timezone.utc).isoformat()
    report = {
        "content_id": manifest.get("content_id"),
        "checked_at": now,
        "status": "ASSET_QA_PASS" if passed else "ASSET_QA_FAIL",
        "passed": passed,
        "measured_assets": measured,
        "review": review,
        "issues": issues,
        "next_stage": "PUBLISH_READY" if passed else "ASSET_REWORK",
    }
    updated = dict(draft)
    updated["asset_qa_status"] = report["status"]
    updated["asset_qa_checked_at"] = now
    updated["asset_qa_issues"] = issues
    updated["status"] = "PUBLISH_READY" if passed else "ASSET_QA_FAILED"
    updated["next_stage"] = "PUBLISH_READY" if passed else "ASSET_REWORK"
    return report, updated


def main() -> int:
    parser = argparse.ArgumentParser(description="생활백서맘 이미지 Asset QA")
    parser.add_argument("manifest", type=Path)
    parser.add_argument("draft", type=Path)
    parser.add_argument("review", type=Path, help="사람이 확인한 시각 QA JSON")
    parser.add_argument("--report-dir", type=Path, default=DEFAULT_REPORT_DIR)
    args = parser.parse_args()
    try:
        draft_path = args.draft.resolve()
        report, updated = validate(load_json(args.manifest.resolve()), load_json(draft_path), load_json(args.review.resolve()))
        args.report_dir.mkdir(parents=True, exist_ok=True)
        report_path = args.report_dir / f"{report['content_id']}.json"
        report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        draft_path.write_text(json.dumps(updated, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(json.dumps({"status": report["status"], "report_path": str(report_path), "draft_path": str(draft_path), "next_stage": report["next_stage"], "issue_count": len(report["issues"])}, ensure_ascii=False))
        return 0 if report["passed"] else 2
    except Exception as exc:
        print(json.dumps({"status": "ASSET_QA_ERROR", "error": str(exc)}, ensure_ascii=False))
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
