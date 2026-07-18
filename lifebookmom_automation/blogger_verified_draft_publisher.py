"""Publish only a previously verified LifeBookMom Blogger draft and verify it is live."""
from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Callable

from lifebookmom_publisher.blogger_publisher import build_service, publish_draft

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_DRAFT_DIR = ROOT / "lifebookmom_cms" / "drafts"
DEFAULT_REPORT_DIR = ROOT / "lifebookmom_cms" / "publish_verification"
DEFAULT_LOG = ROOT / "lifebookmom_logs" / "blogger_publish_verification.jsonl"
ELIGIBLE_STATUS = "BLOGGER_DRAFT_VERIFIED"
CONFIRMATION = "PUBLISH"


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


def load_json(path: Path) -> dict[str, Any]:
    if not path.is_file():
        raise FileNotFoundError(f"CMS 초안 파일을 찾을 수 없습니다: {path}")
    payload = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(payload, dict):
        raise ValueError("CMS 초안은 JSON 객체여야 합니다.")
    return payload


def validate_verified_draft(draft: dict[str, Any]) -> None:
    if draft.get("status") != ELIGIBLE_STATUS:
        raise ValueError(f"{ELIGIBLE_STATUS} 상태만 공개 발행할 수 있습니다.")
    if draft.get("blogger_verification_status") != "BLOGGER_DRAFT_VERIFICATION_PASS":
        raise ValueError("Blogger 비공개 초안 검증 PASS 기록이 필요합니다.")
    for field in ("content_id", "title", "blogger_blog_id", "blogger_post_id"):
        if not str(draft.get(field, "")).strip():
            raise ValueError(f"CMS 초안에 필수 항목이 없습니다: {field}")
    if draft.get("blogger_published_at") or draft.get("status") == "BLOGGER_PUBLISHED_VERIFIED":
        raise ValueError("이미 공개 발행된 기록입니다. 중복 발행을 중단합니다.")


def find_latest_verified(draft_dir: Path = DEFAULT_DRAFT_DIR) -> Path:
    if not draft_dir.is_dir():
        raise FileNotFoundError(f"CMS 초안 폴더를 찾을 수 없습니다: {draft_dir}")
    candidates: list[tuple[float, Path]] = []
    for path in draft_dir.glob("*.json"):
        try:
            validate_verified_draft(load_json(path))
        except (OSError, ValueError, json.JSONDecodeError):
            continue
        candidates.append((path.stat().st_mtime, path))
    if not candidates:
        raise FileNotFoundError("공개 발행할 검증 완료 Blogger 초안이 없습니다.")
    return max(candidates, key=lambda item: item[0])[1]


def compare_live(cms: dict[str, Any], remote: dict[str, Any]) -> list[dict[str, str]]:
    issues: list[dict[str, str]] = []
    if str(remote.get("id", "")).strip() != str(cms["blogger_post_id"]):
        issues.append({"code": "POST_ID_MISMATCH", "message": "발행 후 post ID가 CMS와 다릅니다."})
    if str(remote.get("title", "")).strip() != str(cms["title"]).strip():
        issues.append({"code": "TITLE_MISMATCH", "message": "발행 후 제목이 CMS와 다릅니다."})
    status = str(remote.get("status", "")).upper()
    if status not in {"LIVE", "PUBLISHED"}:
        issues.append({"code": "NOT_LIVE", "message": f"Blogger 상태가 공개 상태가 아닙니다: {status or '(없음)'}"})
    if not str(remote.get("url", "")).strip():
        issues.append({"code": "PUBLIC_URL_MISSING", "message": "공개 게시글 URL이 없습니다."})
    return issues


def _append_log(path: Path, payload: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("a", encoding="utf-8") as file:
        file.write(json.dumps({"recorded_at": _now(), **payload}, ensure_ascii=False) + "\n")


def run(
    draft_path: Path,
    *,
    confirmation: str,
    service_factory: Callable[[], Any] = build_service,
    report_dir: Path = DEFAULT_REPORT_DIR,
    log_path: Path = DEFAULT_LOG,
) -> dict[str, Any]:
    if confirmation.strip().upper() != CONFIRMATION:
        raise ValueError("공개 발행 확인값 PUBLISH가 필요합니다.")

    draft_path = draft_path.resolve()
    cms = load_json(draft_path)
    validate_verified_draft(cms)
    service = service_factory()
    blog_id = str(cms["blogger_blog_id"])
    post_id = str(cms["blogger_post_id"])

    published = publish_draft(service, blog_id, post_id)
    remote = service.posts().get(blogId=blog_id, postId=post_id, view="ADMIN").execute()
    if published.get("url") and not remote.get("url"):
        remote["url"] = published.get("url")
    issues = compare_live(cms, remote)
    passed = not issues
    checked_at = _now()
    report = {
        "content_id": cms["content_id"],
        "checked_at": checked_at,
        "status": "BLOGGER_PUBLISH_VERIFICATION_PASS" if passed else "BLOGGER_PUBLISH_VERIFICATION_FAIL",
        "passed": passed,
        "blogger_blog_id": blog_id,
        "blogger_post_id": post_id,
        "blogger_url": remote.get("url") or published.get("url"),
        "remote_status": remote.get("status"),
        "issues": issues,
    }
    report_dir.mkdir(parents=True, exist_ok=True)
    report_path = report_dir / f"{cms['content_id']}.json"
    report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    updated = dict(cms)
    updated.update({
        "status": "BLOGGER_PUBLISHED_VERIFIED" if passed else "BLOGGER_PUBLISH_VERIFICATION_FAILED",
        "next_stage": "POST_PUBLISH_VERIFICATION" if passed else "PUBLISH_REVIEW_REQUIRED",
        "blogger_publish_verification_status": report["status"],
        "blogger_publish_verification_checked_at": checked_at,
        "blogger_publish_verification_report": str(report_path),
        "blogger_publish_verification_issues": issues,
        "blogger_url": report["blogger_url"],
        "blogger_published_at": checked_at if passed else None,
    })
    draft_path.write_text(json.dumps(updated, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    result = {
        "status": report["status"],
        "content_id": cms["content_id"],
        "passed": passed,
        "post_id": post_id,
        "url": report["blogger_url"],
        "issue_count": len(issues),
        "report_path": str(report_path),
        "draft_path": str(draft_path),
        "next_stage": updated["next_stage"],
    }
    _append_log(log_path, result)
    return result


def main() -> int:
    parser = argparse.ArgumentParser(description="검증 완료 생활백서맘 Blogger 초안 공개 발행 및 재검증")
    parser.add_argument("draft", nargs="?", type=Path)
    parser.add_argument("--latest", action="store_true")
    parser.add_argument("--confirm", required=True)
    parser.add_argument("--draft-dir", type=Path, default=DEFAULT_DRAFT_DIR)
    parser.add_argument("--report-dir", type=Path, default=DEFAULT_REPORT_DIR)
    parser.add_argument("--log", type=Path, default=DEFAULT_LOG)
    args = parser.parse_args()
    try:
        if args.draft and args.latest:
            raise ValueError("draft 경로와 --latest는 동시에 사용할 수 없습니다.")
        draft_path = find_latest_verified(args.draft_dir.resolve()) if args.latest or not args.draft else args.draft
        result = run(
            draft_path,
            confirmation=args.confirm,
            report_dir=args.report_dir.resolve(),
            log_path=args.log.resolve(),
        )
        print(json.dumps(result, ensure_ascii=False))
        return 0 if result["passed"] else 2
    except Exception as exc:
        print(json.dumps({"status": "BLOGGER_PUBLISH_ERROR", "error": str(exc)}, ensure_ascii=False))
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
