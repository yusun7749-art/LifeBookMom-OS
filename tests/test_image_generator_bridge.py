import json
from pathlib import Path

from lifebookmom_automation.image_generator_bridge import missing_assets, run_generator


def _plan(tmp_path: Path) -> tuple[Path, dict]:
    assets = []
    for name in ("thumbnail.png", "body-01.png", "infographic-10cut.png"):
        assets.append({"path": str(tmp_path / name)})
    payload = {"request_id": "REQ-1", "assets": assets}
    path = tmp_path / "plan.json"
    path.write_text(json.dumps(payload), encoding="utf-8")
    return path, payload


def test_bridge_blocks_without_configured_generator(tmp_path: Path) -> None:
    plan_path, plan = _plan(tmp_path)
    result = run_generator(plan_path, command="")
    assert result["status"] == "IMAGE_GENERATOR_REQUIRED"
    assert missing_assets(plan) == [str(tmp_path / "thumbnail.png"), str(tmp_path / "body-01.png"), str(tmp_path / "infographic-10cut.png")]


def test_bridge_skips_when_all_assets_exist(tmp_path: Path) -> None:
    plan_path, plan = _plan(tmp_path)
    for item in plan["assets"]:
        Path(item["path"]).write_bytes(b"image")
    result = run_generator(plan_path, command="unused-command")
    assert result["status"] == "IMAGE_GENERATION_SKIPPED"
    assert result["created"] == 0
