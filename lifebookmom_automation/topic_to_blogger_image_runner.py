"""Topic -> Brand QA -> Content QA -> image generation/publish/QA -> Blogger verification."""
from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
for folder in (ROOT / "lifebookmom_engine", ROOT / "lifebookmom_automation"):
    if str(folder) not in sys.path:
        sys.path.insert(0, str(folder))

from blogger_draft_verifier import run as verify_blogger_draft
from github_image_uploader import publish_plan_assets
from image_generator_bridge import run_generator
from image_pipeline_engine import build_image_plan, inject_images_into_html, save_image_plan, validate_image_plan
from topic_to_blogger_draft_runner import prepare, send_to_blogger

IMAGE_PLAN_DIR = ROOT / "lifebookmom_cms" / "image_plans"
IMAGE_QA_DIR = ROOT / "lifebookmom_cms" / "image_qa_reports"
IMAGE_ASSET_DIR = ROOT / "lifebookmom_assets" / "generated"


def _write_json(path: Path, payload: dict[str, Any]) -> Path:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return path


def _all_local_assets_exist(plan: dict[str, Any]) -> bool:
    assets = [item for item in plan.get("assets", []) if isinstance(item, dict)]
    return bool(assets) and all(
        Path(str(asset.get("path", ""))).is_file()
        and Path(str(asset.get("path", ""))).stat().st_size > 0
        for asset in assets
    )


def _public_urls_complete(plan: dict[str, Any]) -> bool:
    assets = [item for item in plan.get("assets", []) if isinstance(item, dict)]
    return bool(assets) and all(str(asset.get("public_url", "")).strip().startswith("https://") for asset in assets)


def run(topic: str, category: str, *, dry_run: bool = False, min_text_length: int = 5000) -> dict[str, Any]:
    prepared = prepare(topic, category, min_text_length=min_text_length)
    if prepared["status"] != "READY_FOR_BLOGGER_DRAFT":
        return prepared

    request_id = prepared["request_id"]
    plan_path = IMAGE_PLAN_DIR / f"{request_id}.json"
    if plan_path.is_file():
        plan = json.loads(plan_path.read_text(encoding="utf-8"))
    else:
        plan = build_image_plan(request_id, topic, IMAGE_ASSET_DIR)
        save_image_plan(plan, plan_path)

    generation = run_generator(plan_path)
    if generation["status"] == "IMAGE_GENERATOR_REQUIRED":
        return {
            "status": "IMAGE_GENERATOR_REQUIRED",
            "request_id": request_id,
            "draft_path": prepared["draft_path"],
            "image_plan_path": str(plan_path),
            "missing_assets": generation["missing_assets"],
            "next_stage": "CONFIGURE_IMAGE_GENERATOR",
        }
    plan = json.loads(plan_path.read_text(encoding="utf-8"))

    auto_publish = os.getenv("LIFEBOOKMOM_AUTO_PUBLISH_IMAGES", "1").strip().lower() not in {"0", "false", "no"}
    if auto_publish and _all_local_assets_exist(plan) and not _public_urls_complete(plan):
        plan = publish_plan_assets(plan)
        save_image_plan(plan, plan_path)

    image_qa = validate_image_plan(plan, require_public_urls=True)
    image_qa_payload = image_qa.to_dict()
    image_qa_path = _write_json(IMAGE_QA_DIR / f"{request_id}.json", image_qa_payload)

    draft = prepared["draft"]
    draft["image_plan_path"] = str(plan_path)
    draft["image_qa_report_path"] = str(image_qa_path)
    draft["image_qa"] = image_qa_payload
    draft["image_generation"] = generation

    if not image_qa.passed:
        draft["status"] = "IMAGE_QA_FAILED"
        draft["next_stage"] = "CREATE_AND_UPLOAD_REQUIRED_IMAGES"
        _write_json(Path(prepared["draft_path"]), draft)
        return {
            "status": "IMAGE_ASSETS_REQUIRED",
            "request_id": request_id,
            "draft_path": prepared["draft_path"],
            "image_plan_path": str(plan_path),
            "image_qa_path": str(image_qa_path),
            "image_qa": image_qa_payload,
            "required_assets": plan["assets"],
            "next_stage": "CREATE_AND_UPLOAD_REQUIRED_IMAGES",
        }

    draft["html"] = inject_images_into_html(str(draft.get("html", "")), plan)
    draft["status"] = "IMAGE_QA_PASSED"
    draft["next_stage"] = "BLOGGER_DRAFT"
    draft["representative_image_url"] = next(
        str(item["public_url"])
        for item in plan["assets"]
        if item.get("type") == "thumbnail" and item.get("representative") is True
    )
    draft["published_image_urls"] = {str(item.get("type")): str(item.get("public_url")) for item in plan["assets"]}
    _write_json(Path(prepared["draft_path"]), draft)

    if dry_run:
        return {
            "status": "TOPIC_TO_BLOGGER_WITH_IMAGES_DRY_RUN_PASS",
            "request_id": request_id,
            "draft_path": prepared["draft_path"],
            "image_plan_path": str(plan_path),
            "image_qa_path": str(image_qa_path),
            "image_qa": image_qa_payload,
            "representative_image_url": draft["representative_image_url"],
            "next_stage": "BLOGGER_DRAFT",
        }

    blogger = send_to_blogger(Path(prepared["draft_path"]))
    draft.update({
        "status": "BLOGGER_DRAFT_CREATED",
        "next_stage": "BLOGGER_IMAGE_VERIFICATION",
        "blogger_blog_id": blogger["blog_id"],
        "blogger_post_id": blogger["post_id"],
        "blogger_url": blogger["url"],
    })
    _write_json(Path(prepared["draft_path"]), draft)

    auto_verify = os.getenv("LIFEBOOKMOM_AUTO_VERIFY_BLOGGER", "1").strip().lower() not in {"0", "false", "no"}
    verification = verify_blogger_draft(Path(prepared["draft_path"])) if auto_verify else None
    return {
        **blogger,
        "request_id": request_id,
        "draft_path": prepared["draft_path"],
        "image_plan_path": str(plan_path),
        "image_qa_path": str(image_qa_path),
        "image_qa": image_qa_payload,
        "representative_image_url": draft["representative_image_url"],
        "blogger_verification": verification,
        "next_stage": verification["next_stage"] if verification else "BLOGGER_IMAGE_VERIFICATION",
    }


def main() -> int:
    parser = argparse.ArgumentParser(description="생활백서맘 주제 → 글/이미지 생성 → 공개 업로드 → Blogger 초안/검증")
    parser.add_argument("topic")
    parser.add_argument("--category", default="미분류")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--min-text-length", type=int, default=5000)
    args = parser.parse_args()
    try:
        result = run(args.topic, args.category, dry_run=args.dry_run, min_text_length=args.min_text_length)
        print(json.dumps(result, ensure_ascii=False))
        blocked = {"BLOCKED_BY_QA", "BLOCKED_BY_BRAND_QA", "IMAGE_ASSETS_REQUIRED", "IMAGE_GENERATOR_REQUIRED"}
        if result["status"] in blocked:
            return 2
        verification = result.get("blogger_verification")
        return 0 if not verification or verification.get("passed") else 2
    except Exception as exc:
        print(json.dumps({"status": "TOPIC_TO_BLOGGER_IMAGE_RUN_FAIL", "error": str(exc)}, ensure_ascii=False), file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
