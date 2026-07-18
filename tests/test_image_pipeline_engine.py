from pathlib import Path

from lifebookmom_engine.image_pipeline_engine import build_image_plan, validate_image_plan


def test_image_plan_requires_three_real_assets(tmp_path: Path) -> None:
    plan = build_image_plan("REQ-1", "아이의 마음을 놓치고 있진 않은지", tmp_path)
    result = validate_image_plan(plan)
    assert result.passed is False
    assert {issue.code for issue in result.issues} == {"IMAGE_FILE_MISSING"}


def test_image_plan_passes_with_files_alt_and_representative_thumbnail(tmp_path: Path) -> None:
    plan = build_image_plan("REQ-2", "등굣길 안전", tmp_path)
    for asset in plan["assets"]:
        path = Path(asset["path"])
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(b"real-image-placeholder-for-gate-test")

    result = validate_image_plan(plan)
    assert result.passed is True
    assert result.asset_count == 3
    assert result.required_count == 3


def test_image_plan_blocks_missing_alt_and_representative_flag(tmp_path: Path) -> None:
    plan = build_image_plan("REQ-3", "SNS 안전", tmp_path)
    for asset in plan["assets"]:
        path = Path(asset["path"])
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(b"image")
    plan["assets"][0]["alt"] = ""
    plan["assets"][0]["representative"] = False

    result = validate_image_plan(plan)
    codes = {issue.code for issue in result.issues}
    assert result.passed is False
    assert "IMAGE_ALT_MISSING" in codes
    assert "REPRESENTATIVE_IMAGE_MISSING" in codes
