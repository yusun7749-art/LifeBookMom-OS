from pathlib import Path

import pytest

from lifebookmom_engine.image_pipeline_engine import (
    build_image_plan,
    inject_images_into_html,
    validate_image_plan,
)


def _materialize(plan: dict) -> None:
    for index, asset in enumerate(plan["assets"], start=1):
        path = Path(asset["path"])
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(b"real-image-placeholder-for-gate-test")
        asset["public_url"] = f"https://cdn.example.com/lifebookmom/image-{index}.png"


def test_image_plan_requires_three_real_assets_and_public_urls(tmp_path: Path) -> None:
    plan = build_image_plan("REQ-1", "아이의 마음을 놓치고 있진 않은지", tmp_path)
    result = validate_image_plan(plan)
    assert result.passed is False
    codes = {issue.code for issue in result.issues}
    assert codes == {"IMAGE_FILE_MISSING", "IMAGE_PUBLIC_URL_MISSING"}


def test_image_plan_passes_with_files_urls_alt_and_representative_thumbnail(tmp_path: Path) -> None:
    plan = build_image_plan("REQ-2", "등굣길 안전", tmp_path)
    _materialize(plan)

    result = validate_image_plan(plan)
    assert result.passed is True
    assert result.asset_count == 3
    assert result.required_count == 3


def test_image_plan_blocks_missing_alt_representative_and_http_url(tmp_path: Path) -> None:
    plan = build_image_plan("REQ-3", "SNS 안전", tmp_path)
    _materialize(plan)
    plan["assets"][0]["alt"] = ""
    plan["assets"][0]["representative"] = False
    plan["assets"][1]["public_url"] = "http://unsafe.example.com/body.png"

    result = validate_image_plan(plan)
    codes = {issue.code for issue in result.issues}
    assert result.passed is False
    assert "IMAGE_ALT_MISSING" in codes
    assert "REPRESENTATIVE_IMAGE_MISSING" in codes
    assert "IMAGE_PUBLIC_URL_MISSING" in codes


def test_inject_images_uses_markers_and_preserves_alt_text(tmp_path: Path) -> None:
    plan = build_image_plan("REQ-4", "친구를 집에 데려와도 될까요", tmp_path)
    _materialize(plan)
    html = (
        "<!-- LIFEBOOKMOM_IMAGE:thumbnail --><h2>첫 장면</h2><p>내용</p>"
        "<!-- LIFEBOOKMOM_IMAGE:body --><h2>FAQ</h2>"
        "<!-- LIFEBOOKMOM_IMAGE:infographic -->"
    )

    output = inject_images_into_html(html, plan)
    assert output.count("<img ") == 3
    assert "data-representative=\"true\"" in output
    for asset in plan["assets"]:
        assert asset["public_url"] in output
        assert asset["alt"] in output


def test_inject_images_falls_back_to_deterministic_positions(tmp_path: Path) -> None:
    plan = build_image_plan("REQ-5", "장마철 준비물", tmp_path)
    _materialize(plan)
    html = "<h2>도입</h2><p>내용</p><h2>준비</h2><p>내용</p><h2>자주 묻는 질문</h2>"

    output = inject_images_into_html(html, plan)
    assert output.startswith("<figure class=\"lifebookmom-image lifebookmom-image-thumbnail\"")
    assert output.count("<img ") == 3
    assert output.index("lifebookmom-image-infographic") < output.index("자주 묻는 질문")


def test_inject_images_refuses_unverified_plan(tmp_path: Path) -> None:
    plan = build_image_plan("REQ-6", "방과 후 간식", tmp_path)
    with pytest.raises(ValueError, match="image plan is not publishable"):
        inject_images_into_html("<h2>본문</h2>", plan)
