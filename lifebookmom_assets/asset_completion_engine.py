"""Validate generated images and attach them to a LifeBookMom CMS draft."""
from __future__ import annotations
import argparse, json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]


def load_json(path: Path) -> dict[str, Any]:
    if not path.is_file():
        raise FileNotFoundError(f"파일을 찾을 수 없습니다: {path}")
    data = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(data, dict):
        raise ValueError("JSON 객체만 처리할 수 있습니다.")
    return data


def inspect_image(path: Path, asset_type: str) -> dict[str, Any]:
    path = path.resolve()
    if not path.is_file():
        raise FileNotFoundError(f"이미지 파일을 찾을 수 없습니다: {path}")
    if path.suffix.lower() not in {".png", ".jpg", ".jpeg", ".webp"}:
        raise ValueError(f"지원하지 않는 이미지 형식입니다: {path.suffix}")
    if path.stat().st_size < 1024:
        raise ValueError(f"이미지 파일이 너무 작습니다: {path}")
    return {"type": asset_type, "path": str(path), "file_name": path.name, "size_bytes": path.stat().st_size, "status": "ASSET_READY"}


def complete(request: dict[str, Any], draft: dict[str, Any], thumbnail: Path, infographic: Path) -> tuple[dict[str, Any], dict[str, Any]]:
    if request.get("status") != "ASSET_REQUESTED":
        raise ValueError("ASSET_REQUESTED 상태만 처리할 수 있습니다.")
    if request.get("content_id") != draft.get("content_id"):
        raise ValueError("Asset Request와 초안의 content_id가 다릅니다.")
    assets = [inspect_image(thumbnail, "thumbnail"), inspect_image(infographic, "infographic")]
    manifest = {
        "asset_request_id": request["asset_request_id"],
        "content_id": request["content_id"],
        "completed_at": datetime.now(timezone.utc).isoformat(),
        "status": "ASSETS_READY",
        "assets": assets,
        "qa_rules": request.get("qa_rules", {}),
        "next_stage": "ASSET_QA",
    }
    updated = dict(draft)
    updated["assets"] = assets
    updated["asset_request_id"] = request["asset_request_id"]
    updated["asset_status"] = "ASSETS_READY"
    updated["next_stage"] = "ASSET_QA"
    return manifest, updated


def main() -> int:
    p = argparse.ArgumentParser(description="생활백서맘 이미지 완료 등록")
    p.add_argument("request", type=Path); p.add_argument("draft", type=Path)
    p.add_argument("thumbnail", type=Path); p.add_argument("infographic", type=Path)
    args = p.parse_args()
    try:
        draft_path = args.draft.resolve()
        manifest, updated = complete(load_json(args.request.resolve()), load_json(draft_path), args.thumbnail, args.infographic)
        out = ROOT / "lifebookmom_assets" / "completed"; out.mkdir(parents=True, exist_ok=True)
        manifest_path = out / f"{manifest['content_id']}.json"
        manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        draft_path.write_text(json.dumps(updated, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(json.dumps({"status":"ASSETS_READY","manifest_path":str(manifest_path),"draft_path":str(draft_path),"next_stage":"ASSET_QA"}, ensure_ascii=False))
        return 0
    except Exception as exc:
        print(json.dumps({"status":"ASSET_COMPLETION_FAIL","error":str(exc)}, ensure_ascii=False))
        return 2

if __name__ == "__main__":
    raise SystemExit(main())
