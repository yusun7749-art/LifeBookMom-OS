"""Run a configured image generator against a LifeBookMom image plan.

The Factory remains provider-neutral. A local generator command receives the image
plan path through LIFEBOOKMOM_IMAGE_PLAN and must create every planned asset.
"""
from __future__ import annotations

import json
import os
import shlex
import subprocess
from pathlib import Path
from typing import Any


def load_plan(path: Path) -> dict[str, Any]:
    payload = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(payload, dict):
        raise ValueError("이미지 계획은 JSON 객체여야 합니다.")
    return payload


def missing_assets(plan: dict[str, Any]) -> list[str]:
    missing: list[str] = []
    for asset in plan.get("assets", []):
        if not isinstance(asset, dict):
            continue
        path = Path(str(asset.get("path", "")))
        if not path.is_file() or path.stat().st_size == 0:
            missing.append(str(path))
    return missing


def run_generator(plan_path: Path, *, command: str | None = None) -> dict[str, Any]:
    plan_path = plan_path.resolve()
    plan = load_plan(plan_path)
    before = missing_assets(plan)
    if not before:
        return {"status": "IMAGE_GENERATION_SKIPPED", "created": 0, "plan_path": str(plan_path)}

    raw_command = (command or os.getenv("LIFEBOOKMOM_IMAGE_GENERATOR_COMMAND", "")).strip()
    if not raw_command:
        return {
            "status": "IMAGE_GENERATOR_REQUIRED",
            "plan_path": str(plan_path),
            "missing_assets": before,
            "next_stage": "CONFIGURE_IMAGE_GENERATOR",
        }

    env = os.environ.copy()
    env["LIFEBOOKMOM_IMAGE_PLAN"] = str(plan_path)
    completed = subprocess.run(
        shlex.split(raw_command, posix=os.name != "nt"),
        cwd=str(plan_path.parents[2]),
        env=env,
        text=True,
        capture_output=True,
        timeout=1800,
        check=False,
    )
    if completed.returncode != 0:
        raise RuntimeError(
            "이미지 생성기 실행 실패: "
            + (completed.stderr.strip() or completed.stdout.strip() or f"exit={completed.returncode}")
        )

    plan = load_plan(plan_path)
    after = missing_assets(plan)
    if after:
        raise RuntimeError("이미지 생성기가 필수 파일을 모두 만들지 않았습니다: " + ", ".join(after))
    return {
        "status": "IMAGE_GENERATION_PASS",
        "created": len(before),
        "plan_path": str(plan_path),
        "stdout": completed.stdout.strip(),
    }
