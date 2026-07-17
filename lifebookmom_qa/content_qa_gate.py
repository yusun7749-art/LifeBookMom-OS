"""Fail-closed content QA gate for LifeBookMom publishing requests."""

from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import dataclass, asdict
from html import unescape
from pathlib import Path
from typing import Any


TAG_RE = re.compile(r"<[^>]+>")
SCRIPT_RE = re.compile(r"<(script|iframe)\b", re.IGNORECASE)
HEADING_RE = re.compile(r"<h[1-3]\b", re.IGNORECASE)
FAQ_RE = re.compile(r"faq|자주\s*묻는\s*질문|궁금한\s*점", re.IGNORECASE)


@dataclass(frozen=True)
class QAIssue:
    code: str
    message: str
    severity: str = "error"


@dataclass(frozen=True)
class QAResult:
    passed: bool
    title: str
    text_length: int
    heading_count: int
    label_count: int
    issues: list[QAIssue]

    def to_dict(self) -> dict[str, Any]:
        payload = asdict(self)
        payload["status"] = "QA_PASS" if self.passed else "QA_FAIL"
        return payload


def visible_text(html: str) -> str:
    return " ".join(unescape(TAG_RE.sub(" ", html)).split())


def validate_payload(payload: Any, *, min_text_length: int = 800) -> QAResult:
    issues: list[QAIssue] = []
    if not isinstance(payload, dict):
        return QAResult(False, "", 0, 0, 0, [QAIssue("INVALID_JSON", "요청 JSON은 객체여야 합니다.")])

    title = str(payload.get("title", "")).strip()
    html = str(payload.get("html", "")).strip()
    labels = payload.get("labels", [])

    if not title:
        issues.append(QAIssue("TITLE_REQUIRED", "제목이 없습니다."))
    elif len(title) < 8:
        issues.append(QAIssue("TITLE_TOO_SHORT", "제목이 너무 짧습니다."))
    elif len(title) > 100:
        issues.append(QAIssue("TITLE_TOO_LONG", "제목이 100자를 초과합니다."))

    if not html:
        issues.append(QAIssue("HTML_REQUIRED", "본문 HTML이 없습니다."))

    text = visible_text(html)
    if html and len(text) < min_text_length:
        issues.append(QAIssue("CONTENT_TOO_SHORT", f"본문 글자 수가 {min_text_length}자보다 짧습니다: {len(text)}자"))

    heading_count = len(HEADING_RE.findall(html))
    if html and heading_count < 3:
        issues.append(QAIssue("HEADINGS_MISSING", "H1~H3 소제목이 3개 미만입니다."))

    if html and not FAQ_RE.search(text):
        issues.append(QAIssue("FAQ_MISSING", "FAQ 또는 자주 묻는 질문 영역을 찾지 못했습니다.", "warning"))

    if SCRIPT_RE.search(html):
        issues.append(QAIssue("UNSAFE_EMBED", "script 또는 iframe 태그가 포함되어 있습니다."))

    if not isinstance(labels, list):
        issues.append(QAIssue("LABELS_INVALID", "labels는 배열이어야 합니다."))
        label_count = 0
    else:
        cleaned = [str(item).strip() for item in labels if str(item).strip()]
        label_count = len(cleaned)
        if label_count == 0:
            issues.append(QAIssue("LABELS_MISSING", "라벨이 없습니다.", "warning"))
        if len(cleaned) != len(set(cleaned)):
            issues.append(QAIssue("LABELS_DUPLICATED", "중복 라벨이 있습니다.", "warning"))

    passed = not any(issue.severity == "error" for issue in issues)
    return QAResult(passed, title, len(text), heading_count, label_count, issues)


def validate_file(path: Path, *, min_text_length: int = 800) -> QAResult:
    if not path.is_file():
        return QAResult(False, "", 0, 0, 0, [QAIssue("FILE_NOT_FOUND", f"파일을 찾을 수 없습니다: {path}")])
    try:
        payload = json.loads(path.read_text(encoding="utf-8"))
    except Exception as exc:
        return QAResult(False, "", 0, 0, 0, [QAIssue("JSON_READ_FAIL", str(exc))])
    return validate_payload(payload, min_text_length=min_text_length)


def main() -> int:
    parser = argparse.ArgumentParser(description="LifeBookMom content QA gate")
    parser.add_argument("request", type=Path)
    parser.add_argument("--min-text-length", type=int, default=800)
    args = parser.parse_args()

    result = validate_file(args.request, min_text_length=args.min_text_length)
    stream = sys.stdout if result.passed else sys.stderr
    print(json.dumps(result.to_dict(), ensure_ascii=False), file=stream)
    return 0 if result.passed else 2


if __name__ == "__main__":
    raise SystemExit(main())
