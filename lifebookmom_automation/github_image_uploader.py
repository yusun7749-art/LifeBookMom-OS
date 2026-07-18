"""Upload LifeBookMom image assets to GitHub and attach stable public URLs."""
from __future__ import annotations

import base64
import json
import os
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Any

DEFAULT_REPOSITORY = "yusun7749-art/LifeBookMom-OS"
DEFAULT_BRANCH = "main"
DEFAULT_REMOTE_DIR = "lifebookmom_assets/published"


def _request(url: str, token: str, *, method: str = "GET", payload: dict[str, Any] | None = None) -> dict[str, Any]:
    data = None if payload is None else json.dumps(payload).encode("utf-8")
    request = urllib.request.Request(
        url,
        data=data,
        method=method,
        headers={
            "Accept": "application/vnd.github+json",
            "Authorization": f"Bearer {token}",
            "X-GitHub-Api-Version": "2022-11-28",
            "User-Agent": "LifeBookMom-Factory",
        },
    )
    try:
        with urllib.request.urlopen(request, timeout=60) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"GitHub image upload failed: HTTP {exc.code} {body}") from exc


def _content_url(repository: str, remote_path: str) -> str:
    encoded = "/".join(urllib.parse.quote(part, safe="") for part in remote_path.split("/"))
    return f"https://api.github.com/repos/{repository}/contents/{encoded}"


def _existing_sha(repository: str, remote_path: str, branch: str, token: str) -> str | None:
    url = _content_url(repository, remote_path) + "?ref=" + urllib.parse.quote(branch, safe="")
    try:
        result = _request(url, token)
    except RuntimeError as exc:
        if "HTTP 404" in str(exc):
            return None
        raise
    return str(result.get("sha", "")).strip() or None


def upload_file(
    local_path: Path,
    remote_path: str,
    *,
    repository: str,
    branch: str,
    token: str,
) -> str:
    if not local_path.is_file() or local_path.stat().st_size == 0:
        raise FileNotFoundError(f"업로드할 이미지 파일이 없습니다: {local_path}")
    payload: dict[str, Any] = {
        "message": f"Publish LifeBookMom image {local_path.name}",
        "content": base64.b64encode(local_path.read_bytes()).decode("ascii"),
        "branch": branch,
    }
    sha = _existing_sha(repository, remote_path, branch, token)
    if sha:
        payload["sha"] = sha
    _request(_content_url(repository, remote_path), token, method="PUT", payload=payload)
    encoded_path = "/".join(urllib.parse.quote(part, safe="") for part in remote_path.split("/"))
    return f"https://raw.githubusercontent.com/{repository}/{branch}/{encoded_path}"


def publish_plan_assets(plan: dict[str, Any]) -> dict[str, Any]:
    token = os.getenv("LIFEBOOKMOM_GITHUB_TOKEN", "").strip() or os.getenv("GITHUB_TOKEN", "").strip()
    if not token:
        raise RuntimeError("LIFEBOOKMOM_GITHUB_TOKEN 또는 GITHUB_TOKEN이 필요합니다.")
    repository = os.getenv("LIFEBOOKMOM_IMAGE_REPOSITORY", DEFAULT_REPOSITORY).strip()
    branch = os.getenv("LIFEBOOKMOM_IMAGE_BRANCH", DEFAULT_BRANCH).strip()
    remote_dir = os.getenv("LIFEBOOKMOM_IMAGE_REMOTE_DIR", DEFAULT_REMOTE_DIR).strip().strip("/")
    request_id = str(plan.get("request_id", "")).strip()
    if not request_id:
        raise ValueError("이미지 계획에 request_id가 없습니다.")

    updated = json.loads(json.dumps(plan, ensure_ascii=False))
    for asset in updated.get("assets", []):
        local_path = Path(str(asset.get("path", "")))
        remote_path = f"{remote_dir}/{request_id}/{local_path.name}"
        asset["public_url"] = upload_file(
            local_path,
            remote_path,
            repository=repository,
            branch=branch,
            token=token,
        )
        asset["remote_path"] = remote_path
        asset["repository"] = repository
        asset["branch"] = branch
    updated["status"] = "IMAGE_ASSETS_PUBLISHED"
    return updated
