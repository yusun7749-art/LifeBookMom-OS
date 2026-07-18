"""Verify the private Blogger draft, including required LifeBookMom images."""
from __future__ import annotations

import argparse
import json
import re
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Callable

from lifebookmom_publisher.blogger_publisher import build_service

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_DRAFT_DIR = ROOT / "lifebookmom_cms" / "drafts"
DEFAULT_REPORT_DIR = ROOT / "lifebookmom_cms" / "blogger_verification"
DEFAULT_LOG = ROOT / "lifebookmom_logs" / "blogger_draft_verification.jsonl"
ELIGIBLE_STATUSES = {"BLOGGER_PREVIEW_DRAFT_CREATED", "BLOGGER_DRAFT_CREATED"}
REQUIRED_IMAGE_TYPES = ("thumbnail", "body", "infographic")


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


def load_json(path: Path) -> dict[str, Any]:
    if not path.is_file():
        raise FileNotFoundError(f"CMS 초안 파일을 찾을 수 없습니다: {path}")
    payload = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(payload, dict):
        raise ValueError("CMS 초안은 JSON 객체여야 합니다.")
    return payload


def validate_cms_record(draft: dict[str, Any]) -> None:
    if draft.get("status") not in ELIGIBLE_STATUSES:
        raise ValueError("Blogger 초안 생성 상태만 검증할 수 있습니다.")
    for field in ("title", "html", "blogger_blog_id", "blogger_post_id"):
        if not str(draft.get(field, "")).strip():
            raise ValueError(f"CMS 초안에 필수 항목이 없습니다: {field}")


def find_latest_unverified(draft_dir: Path = DEFAULT_DRAFT_DIR) -> Path:
    if not draft_dir.is_dir():
        raise FileNotFoundError(f"CMS 초안 폴더를 찾을 수 없습니다: {draft_dir}")
    candidates: list[tuple[float, Path]] = []
    for path in draft_dir.glob("*.json"):
        try:
            validate_cms_record(load_json(path))
        except (OSError, ValueError, json.JSONDecodeError):
            continue
        candidates.append((path.stat().st_mtime, path))
    if not candidates:
        raise FileNotFoundError("검증할 Blogger 비공개 초안이 없습니다.")
    return max(candidates, key=lambda item: item[0])[1]


def _normalize_html(value: Any) -> str:
    text = str(value or "").replace("\r", "").strip()
    return re.sub(r">\s+<", "><", text)


def _normalize_labels(value: Any) -> list[str]:
    if not isinstance(value, list):
        return []
    return sorted({str(item).strip() for item in value if str(item).strip()})


def compare_draft(cms: dict[str, Any], remote: dict[str, Any]) -> list[dict[str, str]]:
    issues: list[dict[str, str]] = []
    remote_content = str(remote.get("content", ""))
    if str(remote.get("id", "")).strip() != str(cms["blogger_post_id"]):
        issues.append({"code": "POST_ID_MISMATCH", "message": "Blogger post ID가 CMS와 다릅니다."})
    if str(remote.get("title", "")).strip() != str(cms["title"]).strip():
        issues.append({"code": "TITLE_MISMATCH", "message": "Blogger 제목이 CMS 제목과 다릅니다."})
    if _normalize_html(remote_content) != _normalize_html(cms["html"]):
        issues.append({"code": "CONTENT_MISMATCH", "message": "Blogger 본문이 CMS 본문과 다릅니다."})
    if _normalize_labels(remote.get("labels")) != _normalize_labels(cms.get("labels", [])):
        issues.append({"code": "LABELS_MISMATCH", "message": "Blogger 라벨이 CMS 라벨과 다릅니다."})
    status = str(remote.get("status", "")).upper()
    if status and status != "DRAFT":
        issues.append({"code": "NOT_PRIVATE_DRAFT", "message": f"Blogger 상태가 DRAFT가 아닙니다: {status}"})

    urls = cms.get("published_image_urls", {})
    if not isinstance(urls, dict):
        urls = {}
    for image_type in REQUIRED_IMAGE_TYPES:
        url = str(urls.get(image_type, "")).strip()
        if not url:
            issues.append({"code": "IMAGE_URL_MISSING", "message": f"CMS 이미지 URL 누락: {image_type}"})
        elif url not in remote_content:
            issues.append({"code": "BLOGGER_IMAGE_MISSING", "message": f"Blogger 본문 이미지 누락: {image_type}"})
    representative = str(cms.get("representative_image_url", "")).strip()
    if representative and representative not in remote_content:
        issues.append({"code": "REPRESENTATIVE_IMAGE_MISSING", "message": "대표 이미지가 Blogger 본문에 없습니다."})
    alt_count = len(re.findall(r"<img\b[^>]*\balt=[\"'][^\"']+[\"']", remote_content, re.IGNORECASE))
    if alt_count < len(REQUIRED_IMAGE_TYPES):
        issues.append({"code": "IMAGE_ALT_MISSING", "message": f"ALT가 있는 이미지가 3개 미만입니다: {alt_count}"})
    return issues


def _append_log(path: Path, payload: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("a", encoding="utf-8") as file:
        file.write(json.dumps({"recorded_at": _now(), **payload}, ensure_ascii=False) + "\n")


def run(draft_path: Path, *, service_factory: Callable[[], Any] = build_service, report_dir: Path = DEFAULT_REPORT_DIR, log_path: Path = DEFAULT_LOG) -> dict[str, Any]:
    draft_path = draft_path.resolve()
    cms = load_json(draft_path)
    validate_cms_record(cms)
    remote = service_factory().posts().get(blogId=str(cms["blogger_blog_id"]), postId=str(cms["blogger_post_id"]), view="ADMIN").execute()
    issues = compare_draft(cms, remote)
    passed = not issues
    checked_at = _now()
    content_id = str(cms.get("content_id") or cms.get("request_id") or cms["blogger_post_id"])
    report = {
        "content_id": content_id,
        "checked_at": checked_at,
        "status": "BLOGGER_IMAGE_VERIFICATION_PASS" if passed else "BLOGGER_IMAGE_VERIFICATION_FAIL",
        "passed": passed,
        "blogger_blog_id": cms["blogger_blog_id"],
        "blogger_post_id": cms["blogger_post_id"],
        "blogger_url": remote.get("url") or cms.get("blogger_url"),
        "remote_status": remote.get("status"),
        "issues": issues,
    }
    report_dir.mkdir(parents=True, exist_ok=True)
    report_path = report_dir / f"{content_id}.json"
    report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    updated = dict(cms)
    updated.update({
        "status": "BLOGGER_IMAGE_VERIFIED" if passed else "BLOGGER_IMAGE_VERIFICATION_FAILED",
        "next_stage": "EDITOR_REVIEW" if passed else "BLOGGER_IMAGE_REWORK",
        "blogger_verification_status": report["status"],
        "blogger_verification_checked_at": checked_at,
        "blogger_verification_report": str(report_path),
        "blogger_verification_issues": issues,
        "blogger_url": report["blogger_url"],
    })
    draft_path.write_text(json.dumps(updated, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    result = {
        "status": report["status"], "content_id": content_id, "passed": passed,
        "post_id": cms["blogger_post_id"], "url": report["blogger_url"],
        "issue_count": len(issues), "report_path": str(report_path),
        "draft_path": str(draft_path), "next_stage": updated["next_stage"],
    }
    _append_log(log_path, result)
    return result


def main() -> int:
    parser = argparse.ArgumentParser(description="생활백서맘 Blogger 비공개 초안 이미지 실제 검증")
    parser.add_argument("draft", nargs="?", type=Path)
    parser.add_argument("--latest", action="store_true")
    parser.add_argument("--draft-dir", type=Path, default=DEFAULT_DRAFT_DIR)
    parser.add_argument("--report-dir", type=Path, default=DEFAULT_REPORT_DIR)
    parser.add_argument("--log", type=Path, default=DEFAULT_LOG)
    args = parser.parse_args()
    try:
        if args.draft and args.latest:
            raise ValueError("draft 경로와 --latest는 동시에 사용할 수 없습니다.")
        draft_path = find_latest_unverified(args.draft_dir.resolve()) if args.latest or not args.draft else args.draft
        result = run(draft_path, report_dir=args.report_dir.resolve(), log_path=args.log.resolve())
        print(json.dumps(result, ensure_ascii=False))
        return 0 if result["passed"] else 2
    except Exception as exc:
        print(json.dumps({"status": "BLOGGER_IMAGE_VERIFICATION_ERROR", "error": str(exc)}, ensure_ascii=False))
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
