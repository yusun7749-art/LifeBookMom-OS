"""LifeBookMom Blogger publisher.

Creates drafts by default. Immediate or scheduled publishing requires an explicit
command-line option. OAuth credentials and tokens remain on the local machine.
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


def parse_schedule(value: str) -> str:
    """Validate a future RFC3339 timestamp and return normalized UTC text."""
    raw = value.strip()
    if not raw:
        raise ValueError("schedule datetime is required")
    try:
        parsed = datetime.fromisoformat(raw.replace("Z", "+00:00"))
    except ValueError as exc:
        raise ValueError("schedule must be RFC3339, for example 2026-07-20T09:00:00+09:00") from exc
    if parsed.tzinfo is None:
        raise ValueError("schedule must include a timezone offset")
    if parsed.astimezone(timezone.utc) <= datetime.now(timezone.utc):
        raise ValueError("schedule must be in the future")
    return parsed.astimezone(timezone.utc).isoformat().replace("+00:00", "Z")


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


def publish_draft(
    service: Any, blog_id: str, post_id: str, publish_date: str | None = None
) -> dict[str, Any]:
    kwargs: dict[str, Any] = {"blogId": blog_id, "postId": post_id}
    if publish_date:
        kwargs["publishDate"] = publish_date
    return service.posts().publish(**kwargs).execute()


def write_result_log(result: dict[str, Any], log_path: Path) -> None:
    log_path.parent.mkdir(parents=True, exist_ok=True)
    record = {"recorded_at": datetime.now(timezone.utc).isoformat(), **result}
    with log_path.open("a", encoding="utf-8") as file:
        file.write(json.dumps(record, ensure_ascii=False) + "\n")


def main() -> int:
    parser = argparse.ArgumentParser(description="LifeBookMom Blogger publisher")
    parser.add_argument("request", nargs="?", type=Path, help="Publisher request JSON")
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument("--publish", action="store_true", help="Publish after draft creation")
    mode.add_argument("--schedule", metavar="RFC3339", help="Schedule after draft creation")
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
        scheduled_at = parse_schedule(args.schedule) if args.schedule else None
        if args.dry_run:
            print(
                json.dumps(
                    {
                        "status": "DRY_RUN_PASS",
                        "title": request.title,
                        "labels": request.labels,
                        "html_length": len(request.html),
                        "scheduled_at": scheduled_at,
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

        if args.publish or scheduled_at:
            published = publish_draft(service, blog_id, str(draft["id"]), scheduled_at)
            result.update(
                {
                    "status": "SCHEDULED" if scheduled_at else "PUBLISHED",
                    "url": published.get("url"),
                    "scheduled_at": scheduled_at,
                }
            )

        write_result_log(result, args.result_log)
        print(json.dumps(result, ensure_ascii=False))
        return 0
    except Exception as exc:
        error = {"status": "FAIL", "error": str(exc)}
        print(json.dumps(error, ensure_ascii=False), file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
