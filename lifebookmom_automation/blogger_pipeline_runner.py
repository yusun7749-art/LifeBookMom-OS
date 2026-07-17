"""LifeBookMom QA -> Blogger publisher pipeline runner.

Default mode is safe dry-run. Use --create-draft, --publish or --schedule for
Blogger API writes after the QA gate passes.
"""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
QA_SCRIPT = ROOT / "lifebookmom_qa" / "content_qa_gate.py"
PUBLISHER_SCRIPT = ROOT / "lifebookmom_publisher" / "blogger_publisher.py"
DEFAULT_PIPELINE_LOG = ROOT / "lifebookmom_logs" / "blogger_pipeline.jsonl"


def run_json_command(command: list[str]) -> tuple[int, dict[str, Any]]:
    completed = subprocess.run(command, cwd=ROOT, capture_output=True, text=True, encoding="utf-8")
    raw = (completed.stdout or completed.stderr).strip()
    try:
        payload = json.loads(raw.splitlines()[-1]) if raw else {}
    except json.JSONDecodeError:
        payload = {"status": "INVALID_COMMAND_OUTPUT", "raw": raw}
    return completed.returncode, payload


def append_log(path: Path, result: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    record = {"recorded_at": datetime.now(timezone.utc).isoformat(), **result}
    with path.open("a", encoding="utf-8") as file:
        file.write(json.dumps(record, ensure_ascii=False) + "\n")


def main() -> int:
    parser = argparse.ArgumentParser(description="LifeBookMom Blogger pipeline")
    parser.add_argument("request", type=Path, help="Publisher request JSON")
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument("--create-draft", action="store_true", help="Create a Blogger draft after QA")
    mode.add_argument("--publish", action="store_true", help="Create and immediately publish after QA")
    mode.add_argument("--schedule", metavar="RFC3339", help="Create and schedule after QA")
    parser.add_argument("--min-text-length", type=int, default=5000)
    parser.add_argument("--pipeline-log", type=Path, default=DEFAULT_PIPELINE_LOG)
    args = parser.parse_args()

    request_path = args.request.resolve()
    qa_command = [
        sys.executable,
        str(QA_SCRIPT),
        str(request_path),
        "--min-text-length",
        str(args.min_text_length),
    ]
    qa_code, qa_result = run_json_command(qa_command)

    selected_mode = (
        "schedule"
        if args.schedule
        else "publish"
        if args.publish
        else "create_draft"
        if args.create_draft
        else "dry_run"
    )
    pipeline_result: dict[str, Any] = {
        "request": str(request_path),
        "qa": qa_result,
        "mode": selected_mode,
        "scheduled_at": args.schedule,
    }

    if qa_code != 0:
        pipeline_result.update({"status": "BLOCKED_BY_QA"})
        append_log(args.pipeline_log, pipeline_result)
        print(json.dumps(pipeline_result, ensure_ascii=False), file=sys.stderr)
        return 2

    publisher_command = [sys.executable, str(PUBLISHER_SCRIPT), str(request_path)]
    if args.schedule:
        publisher_command.extend(["--schedule", args.schedule])
    elif args.publish:
        publisher_command.append("--publish")
    elif not args.create_draft:
        publisher_command.append("--dry-run")

    publisher_code, publisher_result = run_json_command(publisher_command)
    pipeline_result["publisher"] = publisher_result
    pipeline_result["status"] = "PIPELINE_PASS" if publisher_code == 0 else "PUBLISHER_FAIL"
    append_log(args.pipeline_log, pipeline_result)

    stream = sys.stdout if publisher_code == 0 else sys.stderr
    print(json.dumps(pipeline_result, ensure_ascii=False), file=stream)
    return 0 if publisher_code == 0 else 1


if __name__ == "__main__":
    raise SystemExit(main())
