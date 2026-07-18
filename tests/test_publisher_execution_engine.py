from __future__ import annotations

import json
import tempfile
import unittest
from pathlib import Path

from lifebookmom_publisher.publisher_execution_engine import (
    apply_success,
    execute_with_service,
    run,
    validate_contract,
)


class _Execute:
    def __init__(self, payload):
        self.payload = payload

    def execute(self):
        return self.payload


class _Posts:
    def __init__(self):
        self.publish_kwargs = None

    def insert(self, **kwargs):
        return _Execute({"id": "POST-1", "title": kwargs["body"]["title"], "url": "https://example.com/draft"})

    def publish(self, **kwargs):
        self.publish_kwargs = kwargs
        return _Execute({"id": kwargs["postId"], "url": "https://example.com/published"})


class _Service:
    def __init__(self):
        self._posts = _Posts()

    def posts(self):
        return self._posts


class PublisherExecutionTests(unittest.TestCase):
    def request(self, mode="draft", publish_at=None):
        return {
            "content_id": "LBM-PUB-1",
            "source_draft_status": "PUBLISH_READY",
            "asset_qa_status": "ASSET_QA_PASS",
            "title": "아이의 마음을 놓치고 있지는 않은지",
            "html": "<h2>본문</h2><p>내용</p>",
            "labels": ["생활백서맘"],
            "publish_mode": mode,
            "publish_at": publish_at,
        }

    def draft(self):
        return {
            "content_id": "LBM-PUB-1",
            "status": "PUBLISH_REQUEST_READY",
            "next_stage": "BLOGGER_PUBLISHER",
        }

    def test_contract_requires_publish_ready_state(self):
        draft = self.draft()
        draft["status"] = "DRAFT_GENERATED"
        with self.assertRaisesRegex(ValueError, "PUBLISH_REQUEST_READY"):
            validate_contract(self.request(), draft)

    def test_draft_mode_creates_blogger_draft(self):
        result = execute_with_service(_Service(), "BLOG-1", self.request())
        self.assertEqual(result["status"], "BLOGGER_DRAFT_CREATED")
        self.assertEqual(result["post_id"], "POST-1")

    def test_publish_mode_creates_then_publishes(self):
        service = _Service()
        result = execute_with_service(service, "BLOG-1", self.request("publish"))
        self.assertEqual(result["status"], "BLOGGER_PUBLISHED")
        self.assertEqual(result["url"], "https://example.com/published")
        self.assertNotIn("publishDate", service._posts.publish_kwargs)

    def test_schedule_mode_forwards_normalized_publish_date(self):
        service = _Service()
        result = execute_with_service(
            service,
            "BLOG-1",
            self.request("schedule", "2099-01-01T09:00:00+09:00"),
        )
        self.assertEqual(result["status"], "BLOGGER_SCHEDULED")
        self.assertEqual(service._posts.publish_kwargs["publishDate"], "2099-01-01T00:00:00Z")

    def test_success_updates_cms_identifiers(self):
        updated = apply_success(
            self.draft(),
            {
                "status": "BLOGGER_PUBLISHED",
                "blog_id": "BLOG-1",
                "post_id": "POST-1",
                "url": "https://example.com/post",
            },
        )
        self.assertEqual(updated["status"], "BLOGGER_PUBLISHED")
        self.assertEqual(updated["next_stage"], "POST_PUBLISH_VERIFICATION")
        self.assertEqual(updated["blogger_post_id"], "POST-1")

    def test_api_failure_creates_retry_queue_and_updates_cms(self):
        with tempfile.TemporaryDirectory() as tmp:
            base = Path(tmp)
            request_path = base / "request.json"
            draft_path = base / "draft.json"
            retry_dir = base / "retry"
            log_path = base / "publisher.jsonl"
            request_path.write_text(json.dumps(self.request()), encoding="utf-8")
            draft_path.write_text(json.dumps(self.draft()), encoding="utf-8")

            def broken_service():
                raise RuntimeError("OAuth unavailable")

            with self.assertRaises(RuntimeError):
                run(
                    request_path,
                    draft_path,
                    service_factory=broken_service,
                    retry_dir=retry_dir,
                    log_path=log_path,
                )

            saved = json.loads(draft_path.read_text(encoding="utf-8"))
            queued = json.loads((retry_dir / "LBM-PUB-1.json").read_text(encoding="utf-8"))

        self.assertEqual(saved["status"], "PUBLISH_FAILED")
        self.assertEqual(saved["next_stage"], "PUBLISH_REVIEW_REQUIRED")
        self.assertTrue(queued["automatic_retry_blocked"])
        self.assertEqual(queued["attempt_count"], 1)


if __name__ == "__main__":
    unittest.main()
