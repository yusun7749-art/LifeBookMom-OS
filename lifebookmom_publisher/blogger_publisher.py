"""LifeBookMom Blogger publisher.

The publisher creates drafts by default and publishes only with ``--publish``.
OAuth credentials and tokens stay on the local machine and are never committed.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

BLOGGER_SCOPE = "https://www.googleapis.com/auth/blogger"
DEFAULT_TOKEN_FILE = "secrets/token.json"
DEFAULT_RESULT_LOG = "lifebookmom_publisher/logs/blogger_publish_results.jsonl"


@dataclass(frozen=True)
class PublishRequest:
    title: str
    html: str
    labels: list[str]

    @classmethod
    def from_json(cls, path: Path) -> "PublishRequest":
        if not path.is_file():
            raise ValueError(f"request file not found: {path}")

        payload = json.loads(path.read_text(encoding="utf-8"))
        if not isinstance(payload, dict):
            raise ValueError("request JSON must be an object")

        title = str(payload.get("title", "")).strip()
        html = str(payload.get("html", "")).strip()
        raw_labels = payload.get("labels", [])
        if not isinstance(raw_labels, list):
            raise ValueError("labels must be a JSON array")

        labels = list(dict.fromkeys(str(item).strip() for item in raw_labels if str(item).strip()))
        if not title:
            raise ValueError("title is required")
        if not html:
            raise ValueError("html is required")
        return cls(title=title, html=html, labels=labels)


def _load_google_dependencies() -> tuple[Any, Any, Any, Any]:
    try:
        from google.auth.transport.requests import Request
        from google.oauth2.credentials import Credentials
        from google_auth_oauthlib.flow import InstalledAppFlow
        from googleapiclient.discovery import build
    except ImportError as exc:
        raise RuntimeError(
            "Google client packages are missing. Install requirements-blogger.txt first."
        ) from exc
    return Credentials, InstalledAppFlow, Request, build


def build_service() -> Any:
    """Build an authenticated Blogger API service using local OAuth files."""
    Credentials, InstalledAppFlow, Request, build = _load_google_dependencies()

    client_secret_file = Path(
        os.getenv("LIFEBOOKMOM_GOOGLE_CLIENT_SECRET_FILE", "secrets/client_secret.json")
    )
    token_file = Path(os.getenv("LIFEBOOKMOM_GOOGLE_TOKEN_FILE", DEFAULT_TOKEN_FILE))

    if not client_secret_file.is_file():
        raise RuntimeError(f"Google OAuth client file not found: {client_secret_file}")

    credentials = None
    if token_file.is_file():
        credentials = Credentials.from_authorized_user_file(str(token_file), [BLOGGER_SCOPE])

    if credentials and credentials.expired and credentials.refresh_token:
        credentials.refresh(Request())
    elif not credentials or not credentials.valid:
        flow = InstalledAppFlow.from_client_secrets_file(str(client_secret_file), [BLOGGER_SCOPE])
        credentials = flow.run_local_server(port=0)

    token_file.parent.mkdir(parents=True, exist_ok=True)
    token_file.write_text(credentials.to_json(), encoding="utf-8")
    return build("blogger", "v3", credentials=credentials, cache_discovery=False)


def list_blogs(service: Any) -> list[dict[str, str]]:
    response = service.blogs().listByUser(userId="self").execute()
    return [
        {
            "id": str(item.get("id", "")),
            "name": str(item.get("name", "")),
            "url": str(item.get("url", "")),
        }
        for item in response.get("items", [])
    ]


def resolve_blog_id(service: Any, configured_blog_id: str) -> str:
    if configured_blog_id:
        service.blogs().get(blogId=configured_blog_id).execute()
        return configured_blog_id

    blogs = list_blogs(service)
    if not blogs:
        raise RuntimeError("No Blogger blog is available for the authenticated Google account")
    if len(blogs) > 1:
        names = ", ".join(f"{item['name']} ({item['id']})" for item in blogs)
        raise RuntimeError(
            "Multiple Blogger blogs were found. Set LIFEBOOKMOM_BLOGGER_BLOG_ID. " + names
        )
    return blogs[0]["id"]


def create_draft(service: Any, blog_id: str, request: PublishRequest) -> dict[str, Any]:
    body = {"title": request.title, "content": request.html, "labels": request.labels}
    return service.posts().insert(blogId=blog_id, body=body, isDraft=True).execute()


def publish_draft(service: Any, blog_id: str, post_id: str) -> dict[str, Any]:
    return service.posts().publish(blogId=blog_id, postId=post_id).execute()


def write_result_log(result: dict[str, Any], log_path: Path) -> None:
    log_path.parent.mkdir(parents=True, exist_ok=True)
    record = {"recorded_at": datetime.now(timezone.utc).isoformat(), **result}
    with log_path.open("a", encoding="utf-8") as file:
        file.write(json.dumps(record, ensure_ascii=False) + "\n")


def main() -> int:
    parser = argparse.ArgumentParser(description="LifeBookMom Blogger publisher")
    parser.add_argument("request", nargs="?", type=Path, help="Publisher request JSON")
    parser.add_argument("--publish", action="store_true", help="Publish after draft creation")
    parser.add_argument("--dry-run", action="store_true", help="Validate input without API access")
    parser.add_argument("--list-blogs", action="store_true", help="List blogs available to this Google account")
    parser.add_argument(
        "--result-log",
        type=Path,
        default=Path(os.getenv("LIFEBOOKMOM_PUBLISH_RESULT_LOG", DEFAULT_RESULT_LOG)),
        help="JSONL file that records API results",
    )
    args = parser.parse_args()

    try:
        if args.list_blogs:
            blogs = list_blogs(build_service())
            print(json.dumps({"status": "BLOGS_FOUND", "blogs": blogs}, ensure_ascii=False))
            return 0

        if args.request is None:
            raise ValueError("request JSON path is required")

        request = PublishRequest.from_json(args.request)
        if args.dry_run:
            print(
                json.dumps(
                    {
                        "status": "DRY_RUN_PASS",
                        "title": request.title,
                        "labels": request.labels,
                        "html_length": len(request.html),
                    },
                    ensure_ascii=False,
                )
            )
            return 0

        service = build_service()
        configured_blog_id = os.getenv("LIFEBOOKMOM_BLOGGER_BLOG_ID", "").strip()
        blog_id = resolve_blog_id(service, configured_blog_id)
        draft = create_draft(service, blog_id, request)
        result: dict[str, Any] = {
            "status": "DRAFT_CREATED",
            "blog_id": blog_id,
            "post_id": draft.get("id"),
            "url": draft.get("url"),
            "title": draft.get("title"),
        }

        if args.publish:
            published = publish_draft(service, blog_id, str(draft["id"]))
            result.update({"status": "PUBLISHED", "url": published.get("url")})

        write_result_log(result, args.result_log)
        print(json.dumps(result, ensure_ascii=False))
        return 0
    except Exception as exc:
        error = {"status": "FAIL", "error": str(exc)}
        print(json.dumps(error, ensure_ascii=False), file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
