from __future__ import annotations

import json
import tempfile
import unittest
from pathlib import Path

from lifebookmom_automation.blogger_draft_verifier import (
    compare_draft,
    find_latest_unverified,
    run,
)


class _Execute:
    def __init__(self, payload):
        self.payload = payload

    def execute(self):
        return self.payload


class _Posts:
    def __init__(self, payload):
        self.payload = payload
        self.get_kwargs = None

    def get(self, **kwargs):
        self.get_kwargs = kwargs
        return _Execute(self.payload)


class _Service:
    def __init__(self, payload):
        self._posts = _Posts(payload)

    def posts(self):
        return self._posts


class BloggerDraftVerifierTests(unittest.TestCase):
    def cms(self):
        return {
            "content_id": "LBM-VERIFY-1",
            "status": "BLOGGER_PREVIEW_DRAFT_CREATED",
            "next_stage": "EDITOR_REVIEW",
            "title": "엄마, 나만 친구 집에 못 가?",
            "html": "<h2>본문</h2><p>내용</p>",
            "labels": ["생활백서맘", "생활·관계"],
            "blogger_blog_id": "BLOG-1",
            "blogger_post_id": "POST-1",
            "blogger_url": "https://example.blogspot.com/",
        }

    def remote(self):
        return {
            "id": "POST-1",
            "title": "엄마, 나만 친구 집에 못 가?",
            "content": "<h2>본문</h2><p>내용</p>",
            "labels": ["생활·관계", "생활백서맘"],
            "status": "DRAFT",
            "url": "https://example.blogspot.com/",
        }

    def test_matching_remote_draft_passes_and_updates_cms(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            draft_path = root / "draft.json"
            report_dir = root / "reports"
            log_path = root / "verify.jsonl"
            draft_path.write_text(json.dumps(self.cms(), ensure_ascii=False), encoding="utf-8")
            service = _Service(self.remote())

            result = run(
                draft_path,
                service_factory=lambda: service,
                report_dir=report_dir,
                log_path=log_path,
            )
            updated = json.loads(draft_path.read_text(encoding="utf-8"))

        self.assertTrue(result["passed"])
        self.assertEqual(result["status"], "BLOGGER_DRAFT_VERIFICATION_PASS")
        self.assertEqual(updated["status"], "BLOGGER_DRAFT_VERIFIED")
        self.assertEqual(updated["next_stage"], "EDITOR_REVIEW")
        self.assertEqual(service._posts.get_kwargs["view"], "ADMIN")

    def test_changed_title_and_public_status_fail(self):
        remote = self.remote()
        remote["title"] = "변경된 제목"
        remote["status"] = "LIVE"
        issues = compare_draft(self.cms(), remote)
        codes = {item["code"] for item in issues}
        self.assertIn("TITLE_MISMATCH", codes)
        self.assertIn("NOT_PRIVATE_DRAFT", codes)

    def test_latest_selector_skips_already_verified_records(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            eligible = root / "eligible.json"
            verified = root / "verified.json"
            eligible.write_text(json.dumps(self.cms()), encoding="utf-8")
            payload = self.cms()
            payload["status"] = "BLOGGER_DRAFT_VERIFIED"
            verified.write_text(json.dumps(payload), encoding="utf-8")
            self.assertEqual(find_latest_unverified(root), eligible)

    def test_windows_launcher_uses_module_execution(self):
        root = Path(__file__).resolve().parents[1]
        launcher = (root / "LIFEBOOKMOM-VERIFY-BLOGGER-DRAFT.bat").read_text(encoding="utf-8")
        self.assertIn("python -m lifebookmom_automation.blogger_draft_verifier", launcher)


if __name__ == "__main__":
    unittest.main()
