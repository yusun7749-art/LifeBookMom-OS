"""LifeBookMom Blogger Publisher foundation.

Creates Blogger drafts only by default. Publishing requires an explicit flag.
Credentials are loaded from environment variables and are never stored here.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Any


BLOGGER_SCOPE = "https://www.googleapis.com/auth/blogger"


@dataclass(frozen=True)
class PublishRequest:
    title: str
    html: str
    labels: list[str]

    @classmethod
    def from_json(cls, path: Path) -> "PublishRequest":
        payload = json.loads(path.read_text(encoding="utf-8"))
        title = str(payload.get("title", "")).strip()
        html = str(payload.get("html", "")).strip()
        labels = [str(item).strip() for item in payload.get("labels", []) if str(item).strip()]
        if not title:
            raise ValueError("title is required")
        if not html:
            raise ValueError("html is required")
        return cls(title=title, html=html, labels=labels)


def build_service() -> Any:
    """Build an authenticated Blogger API service from local OAuth credentials."""
    try:
        from google.oauth2.credentials import Credentials
        from google_auth_oauthlib.flow import InstalledAppFlow
        from google.auth.transport.requests import Request
        from googleapiclient.discovery import build
    except ImportError as exc:
        raise RuntimeError(
            "Missing Google client packages. Install google-api-python-client, "
            "google-auth-oauthlib and google-auth-httplib2."
        ) from exc

    client_secret_file = os.getenv("LIFEBOOKMOM_GOOGLE_CLIENT_SECRET_FILE", "").strip()
    token_file = Path(os.getenv("LIFEBOOKMOM_GOOGLE_TOKEN_FILE", ".lifebookmom_blogger_token.json"))

    if not client_secret_file:
        raise RuntimeError("LIFEBOOKMOM_GOOGLE_CLIENT_SECRET_FILE is not configured")

    credentials = None
    if token_file.exists():
        credentials = Credentials.from_authorized_user_file(str(token_file), [BLOGGER_SCOPE])

    if credentials and credentials.expired and credentials.refresh_token:
        credentials.refresh(Request())
    elif not credentials or not credentials.valid:
        flow = InstalledAppFlow.from_client_secrets_file(client_secret_file, [BLOGGER_SCOPE])
        credentials = flow.run_local_server(port=0)

    token_file.write_text(credentials.to_json(), encoding="utf-8")
    return build("blogger", "v3", credentials=credentials, cache_discovery=False)


def create_draft(service: Any, blog_id: str, request: PublishRequest) -> dict[str, Any]:
    body = {
        "title": request.title,
        "content": request.html,
        "labels": request.labels,
    }
    return service.posts().insert(blogId=blog_id, body=body, isDraft=True).execute()


def publish_draft(service: Any, blog_id: str, post_id: str) -> dict[str, Any]:
    return service.posts().publish(blogId=blog_id, postId=post_id).execute()


def main() -> int:
    parser = argparse.ArgumentParser(description="LifeBookMom Blogger draft publisher")
    parser.add_argument("request", type=Path, help="Publisher request JSON")
    parser.add_argument("--publish", action="store_true", help="Publish after draft creation")
    parser.add_argument("--dry-run", action="store_true", help="Validate input without API access")
    args = parser.parse_args()

    try:
        request = PublishRequest.from_json(args.request)
        blog_id = os.getenv("LIFEBOOKMOM_BLOGGER_BLOG_ID", "").strip()

        if args.dry_run:
            print(json.dumps({"status": "DRY_RUN_PASS", "title": request.title, "labels": request.labels}, ensure_ascii=False))
            return 0

        if not blog_id:
            raise RuntimeError("LIFEBOOKMOM_BLOGGER_BLOG_ID is not configured")

        service = build_service()
        draft = create_draft(service, blog_id, request)
        result: dict[str, Any] = {
            "status": "DRAFT_CREATED",
            "post_id": draft.get("id"),
            "url": draft.get("url"),
            "title": draft.get("title"),
        }

        if args.publish:
            published = publish_draft(service, blog_id, str(draft["id"]))
            result.update({"status": "PUBLISHED", "url": published.get("url")})

        print(json.dumps(result, ensure_ascii=False))
        return 0
    except Exception as exc:  # fail closed for publisher operations
        print(json.dumps({"status": "FAIL", "error": str(exc)}, ensure_ascii=False), file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
