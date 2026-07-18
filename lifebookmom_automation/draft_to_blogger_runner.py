"""Create a safe Blogger draft from a generated LifeBookMom CMS draft.

This runner is intentionally draft-only. It never publishes a post publicly. When no
path is supplied it selects the newest eligible CMS draft so the Windows launcher can
be used with one double-click.
"""
from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Callable

from lifebookmom_publisher.blogger_publisher import (
    PublishRequest,
    build_service,
    create_draft,
    resolve_blog_id,
)

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_DRAFT_DIR = ROOT / "lifebookmom_cms" / "drafts"
DEFAULT_LOG = ROOT / "lifebookmom_logs" / "blogger_preview_draft.jsonl"
ELIGIBLE_STATUSES = {"DRAFT_GENERATED", "QA_PASS", "ASSET_QA_PASS", "PUBLISH_REQUEST_READY"}


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


def load_json(path: Path) -> dict[str, Any]:
    if not path.is_file():
        raise FileNotFoundError(f"CMS 초안 파일을 찾을 수 없습니다: {path}")
    payload = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(payload, dict):
        raise ValueError("CMS 초안은 JSON 객체여야 합니다.")
    return payload


def validate_draft(draft: dict[str, Any]) -> None:
    status = str(draft.get("status", "")).strip()
    if status not in ELIGIBLE_STATUSES:
        raise ValueError(
            "Blogger 미리보기 초안으로 보낼 수 없는 CMS 상태입니다: "
            f"{status or '(없음)'}"
        )
    if draft.get("blogger_post_id"):
        raise ValueError("이미 Blogger post_id가 저장된 초안입니다. 중복 생성을 중단합니다.")
    if not str(draft.get("title", "")).strip():
        raise ValueError("CMS 초안에 title이 없습니다.")
    if not str(draft.get("html", "")).strip():
        raise ValueError("CMS 초안에 html이 없습니다.")
    labels = draft.get("labels", [])
    if not isinstance(labels, list):
        raise ValueError("CMS 초안의 labels는 배열이어야 합니다.")


def find_latest_draft(draft_dir: Path = DEFAULT_DRAFT_DIR) -> Path:
    if not draft_dir.is_dir():
        raise FileNotFoundError(f"CMS 초안 폴더를 찾을 수 없습니다: {draft_dir}")
    candidates: list[tuple[float, Path]] = []
    for path in draft_dir.glob("*.json"):
        try:
            draft = load_json(path)
            validate_draft(draft)
        except (OSError, ValueError, json.JSONDecodeError):
            continue
        candidates.append((path.stat().st_mtime, path))
    if not candidates:
        raise FileNotFoundError("Blogger로 보낼 수 있는 CMS 초안이 없습니다.")
    return max(candidates, key=lambda item: item[0])[1]


def _append_log(path: Path, payload: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("a", encoding="utf-8") as file:
        file.write(json.dumps({"recorded_at": _now(), **payload}, ensure_ascii=False) + "\n")


def run(
    draft_path: Path,
    *,
    service_factory: Callable[[], Any] = build_service,
    configured_blog_id: str = "",
    log_path: Path = DEFAULT_LOG,
) -> dict[str, Any]:
    draft_path = draft_path.resolve()
    draft = load_json(draft_path)
    validate_draft(draft)

    request = PublishRequest(
        title=str(draft["title"]).strip(),
        html=str(draft["html"]).strip(),
        labels=list(dict.fromkeys(str(item).strip() for item in draft.get("labels", []) if str(item).strip())),
    )
    service = service_factory()
    blog_id = resolve_blog_id(service, configured_blog_id.strip())
    created = create_draft(service, blog_id, request)
    post_id = str(created.get("id", "")).strip()
    if not post_id:
        raise RuntimeError("Blogger가 post_id를 반환하지 않았습니다.")

    result = {
        "status": "BLOGGER_PREVIEW_DRAFT_CREATED",
        "content_id": draft.get("content_id"),
        "blog_id": blog_id,
        "post_id": post_id,
        "url": created.get("url"),
        "title": created.get("title") or request.title,
        "draft_path": str(draft_path),
        "next_stage": "EDITOR_REVIEW",
    }
    updated = dict(draft)
    updated.update(
        {
            "status": result["status"],
            "next_stage": result["next_stage"],
            "blogger_blog_id": blog_id,
            "blogger_post_id": post_id,
            "blogger_url": result["url"],
            "blogger_draft_created_at": _now(),
            "blogger_publish_mode": "draft",
        }
    )
    draft_path.write_text(json.dumps(updated, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    _append_log(log_path, result)
    return result


def main() -> int:
    parser = argparse.ArgumentParser(description="CMS 최신 초안 → 생활백서맘 Blogger 비공개 초안 생성")
    parser.add_argument("draft", nargs="?", type=Path, help="CMS draft JSON 경로")
    parser.add_argument("--latest", action="store_true", help="가장 최근의 발행 가능한 CMS 초안 선택")
    parser.add_argument("--draft-dir", type=Path, default=DEFAULT_DRAFT_DIR)
    parser.add_argument("--blog-id", default="", help="설정하지 않으면 인증 계정의 유일한 블로그 사용")
    parser.add_argument("--log", type=Path, default=DEFAULT_LOG)
    args = parser.parse_args()

    try:
        if args.draft and args.latest:
            raise ValueError("draft 경로와 --latest는 동시에 사용할 수 없습니다.")
        draft_path = find_latest_draft(args.draft_dir.resolve()) if args.latest or not args.draft else args.draft
        result = run(
            draft_path,
            configured_blog_id=args.blog_id,
            log_path=args.log.resolve(),
        )
        print(json.dumps(result, ensure_ascii=False))
        return 0
    except Exception as exc:
        print(json.dumps({"status": "BLOGGER_PREVIEW_DRAFT_FAILED", "error": str(exc)}, ensure_ascii=False))
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
