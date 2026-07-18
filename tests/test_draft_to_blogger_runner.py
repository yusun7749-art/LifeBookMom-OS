from __future__ import annotations

import json
import tempfile
import unittest
from pathlib import Path

from lifebookmom_automation.draft_to_blogger_runner import (
    find_latest_draft,
    run,
    validate_draft,
)


ROOT = Path(__file__).resolve().parents[1]


class _Execute:
    def __init__(self, payload):
        self.payload = payload

    def execute(self):
        return self.payload


class _Blogs:
    def listByUser(self, **kwargs):
        return _Execute({"items": [{"id": "BLOG-1", "name": "생활백서맘", "url": "https://example.blogspot.com"}]})


class _Posts:
    def insert(self, **kwargs):
        body = kwargs["body"]
        return _Execute({"id": "POST-1", "title": body["title"], "url": "https://example.blogspot.com/draft"})


class _Service:
    def blogs(self):
        return _Blogs()

    def posts(self):
        return _Posts()


class DraftToBloggerRunnerTests(unittest.TestCase):
    def draft(self, status="DRAFT_GENERATED"):
        return {
            "content_id": "LBM-1",
            "status": status,
            "next_stage": "QA",
            "title": "엄마, 나만 친구 집에 못 가?",
            "html": "<h2>본문</h2><p>내용</p>",
            "labels": ["생활백서맘", "생활·관계"],
        }

    def test_validate_rejects_duplicate_blogger_post(self):
        payload = self.draft()
        payload["blogger_post_id"] = "POST-OLD"
        with self.assertRaisesRegex(ValueError, "중복"):
            validate_draft(payload)

    def test_run_creates_draft_and_updates_cms(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            draft_path = root / "draft.json"
            log_path = root / "log.jsonl"
            draft_path.write_text(json.dumps(self.draft(), ensure_ascii=False), encoding="utf-8")

            result = run(
                draft_path,
                service_factory=lambda: _Service(),
                log_path=log_path,
            )

            self.assertEqual(result["status"], "BLOGGER_PREVIEW_DRAFT_CREATED")
            self.assertEqual(result["post_id"], "POST-1")
            updated = json.loads(draft_path.read_text(encoding="utf-8"))
            self.assertEqual(updated["status"], "BLOGGER_PREVIEW_DRAFT_CREATED")
            self.assertEqual(updated["next_stage"], "EDITOR_REVIEW")
            self.assertEqual(updated["blogger_post_id"], "POST-1")
            self.assertTrue(log_path.is_file())

    def test_find_latest_skips_ineligible_and_duplicate_drafts(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            eligible = root / "eligible.json"
            ineligible = root / "ineligible.json"
            duplicate = root / "duplicate.json"
            eligible.write_text(json.dumps(self.draft()), encoding="utf-8")
            ineligible.write_text(json.dumps(self.draft("PUBLISH_FAILED")), encoding="utf-8")
            duplicate_payload = self.draft()
            duplicate_payload["blogger_post_id"] = "POST-X"
            duplicate.write_text(json.dumps(duplicate_payload), encoding="utf-8")

            self.assertEqual(find_latest_draft(root), eligible)

    def test_windows_launcher_uses_module_execution(self):
        launcher = (ROOT / "LIFEBOOKMOM-DRAFT-TO-BLOGGER.bat").read_text(encoding="utf-8")
        self.assertIn("python -m lifebookmom_automation.draft_to_blogger_runner", launcher)
        self.assertNotIn("python lifebookmom_automation\\draft_to_blogger_runner.py", launcher)


if __name__ == "__main__":
    unittest.main()
