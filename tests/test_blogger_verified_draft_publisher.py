from __future__ import annotations

import json
import tempfile
import unittest
from pathlib import Path

from lifebookmom_automation.blogger_verified_draft_publisher import (
    compare_live,
    find_latest_verified,
    run,
)


class _Execute:
    def __init__(self, payload):
        self.payload = payload

    def execute(self):
        return self.payload


class _Posts:
    def __init__(self, remote):
        self.remote = remote
        self.publish_kwargs = None
        self.get_kwargs = None

    def publish(self, **kwargs):
        self.publish_kwargs = kwargs
        return _Execute({"id": kwargs["postId"], "url": "https://example.blogspot.com/live"})

    def get(self, **kwargs):
        self.get_kwargs = kwargs
        return _Execute(self.remote)


class _Service:
    def __init__(self, remote):
        self._posts = _Posts(remote)

    def posts(self):
        return self._posts


class BloggerVerifiedDraftPublisherTests(unittest.TestCase):
    def cms(self):
        return {
            "content_id": "LBM-PUBLISH-1",
            "status": "BLOGGER_DRAFT_VERIFIED",
            "next_stage": "EDITOR_REVIEW",
            "title": "엄마, 나만 친구 집에 못 가?",
            "blogger_blog_id": "BLOG-1",
            "blogger_post_id": "POST-1",
            "blogger_url": "https://example.blogspot.com/",
            "blogger_verification_status": "BLOGGER_DRAFT_VERIFICATION_PASS",
        }

    def remote(self):
        return {
            "id": "POST-1",
            "title": "엄마, 나만 친구 집에 못 가?",
            "status": "LIVE",
            "url": "https://example.blogspot.com/live",
        }

    def test_publish_requires_explicit_confirmation(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "draft.json"
            path.write_text(json.dumps(self.cms()), encoding="utf-8")
            with self.assertRaisesRegex(ValueError, "PUBLISH"):
                run(path, confirmation="yes", service_factory=lambda: _Service(self.remote()))

    def test_verified_draft_is_published_and_rechecked(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            draft_path = root / "draft.json"
            report_dir = root / "reports"
            log_path = root / "publish.jsonl"
            draft_path.write_text(json.dumps(self.cms(), ensure_ascii=False), encoding="utf-8")
            service = _Service(self.remote())

            result = run(
                draft_path,
                confirmation="PUBLISH",
                service_factory=lambda: service,
                report_dir=report_dir,
                log_path=log_path,
            )
            updated = json.loads(draft_path.read_text(encoding="utf-8"))

        self.assertTrue(result["passed"])
        self.assertEqual(result["status"], "BLOGGER_PUBLISH_VERIFICATION_PASS")
        self.assertEqual(updated["status"], "BLOGGER_PUBLISHED_VERIFIED")
        self.assertEqual(updated["next_stage"], "POST_PUBLISH_VERIFICATION")
        self.assertEqual(updated["blogger_url"], "https://example.blogspot.com/live")
        self.assertEqual(service._posts.publish_kwargs["postId"], "POST-1")
        self.assertEqual(service._posts.get_kwargs["view"], "ADMIN")

    def test_non_live_remote_fails_verification(self):
        remote = self.remote()
        remote["status"] = "DRAFT"
        codes = {item["code"] for item in compare_live(self.cms(), remote)}
        self.assertIn("NOT_LIVE", codes)

    def test_latest_selector_skips_unverified_and_published_records(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            eligible = root / "eligible.json"
            unverified = root / "unverified.json"
            published = root / "published.json"
            eligible.write_text(json.dumps(self.cms()), encoding="utf-8")
            bad = self.cms(); bad["status"] = "BLOGGER_PREVIEW_DRAFT_CREATED"
            unverified.write_text(json.dumps(bad), encoding="utf-8")
            done = self.cms(); done["blogger_published_at"] = "2026-07-18T00:00:00Z"
            published.write_text(json.dumps(done), encoding="utf-8")
            self.assertEqual(find_latest_verified(root), eligible)


if __name__ == "__main__":
    unittest.main()
