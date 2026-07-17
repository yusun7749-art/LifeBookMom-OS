"""Create, verify, update and delete a temporary Blogger draft.

This is the first safe write verification after OAuth. The temporary draft is always
removed in a finally block when a post id was created.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from blogger_publisher import PublishRequest, build_service, resolve_blog_id

DEFAULT_LOG = Path("lifebookmom_publisher/logs/blogger_draft_smoke_test.jsonl")


def append_log(path: Path, payload: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    record = {"recorded_at": datetime.now(timezone.utc).isoformat(), **payload}
    with path.open("a", encoding="utf-8") as file:
        file.write(json.dumps(record, ensure_ascii=False) + "\n")


def run_draft_lifecycle(service: Any, blog_id: str, request: PublishRequest) -> dict[str, Any]:
    post_id: str | None = None
    deleted = False
    try:
        created = service.posts().insert(
            blogId=blog_id,
            body={"title": request.title, "content": request.html, "labels": request.labels},
            isDraft=True,
        ).execute()
        post_id = str(created["id"])

        fetched = service.posts().get(blogId=blog_id, postId=post_id, view="ADMIN").execute()
        if str(fetched.get("title", "")) != request.title:
            raise RuntimeError("created draft title verification failed")

        updated_title = f"{request.title} [자동화 검증완료]"
        updated = service.posts().patch(
            blogId=blog_id,
            postId=post_id,
            body={"title": updated_title},
        ).execute()
        if str(updated.get("title", "")) != updated_title:
            raise RuntimeError("draft update verification failed")

        return {
            "status": "DRAFT_LIFECYCLE_PASS",
            "blog_id": blog_id,
            "post_id": post_id,
            "created": True,
            "read_verified": True,
            "updated": True,
        }
    finally:
        if post_id:
            service.posts().delete(blogId=blog_id, postId=post_id).execute()
            deleted = True
            # The returned result is enriched in main through a second status record.
        if post_id and not deleted:
            raise RuntimeError(f"temporary draft cleanup failed: {post_id}")


def main() -> int:
    parser = argparse.ArgumentParser(description="LifeBookMom Blogger draft lifecycle smoke test")
    parser.add_argument("request", type=Path, help="Publisher request JSON")
    parser.add_argument("--log", type=Path, default=DEFAULT_LOG)
    args = parser.parse_args()

    try:
        request = PublishRequest.from_json(args.request.resolve())
        service = build_service()
        blog_id = resolve_blog_id(service, os.getenv("LIFEBOOKMOM_BLOGGER_BLOG_ID", "").strip())
        result = run_draft_lifecycle(service, blog_id, request)
        result["deleted"] = True
        append_log(args.log, result)
        print(json.dumps(result, ensure_ascii=False))
        return 0
    except Exception as exc:
        result = {"status": "DRAFT_LIFECYCLE_FAIL", "error": str(exc)}
        append_log(args.log, result)
        print(json.dumps(result, ensure_ascii=False), file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
