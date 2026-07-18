from __future__ import annotations

import unittest

from lifebookmom_publisher.publish_ready_engine import build_publish_request


class PublishReadyEngineTests(unittest.TestCase):
    def ready_draft(self):
        return {
            "content_id": "LBM-READY-1",
            "status": "PUBLISH_READY",
            "next_stage": "PUBLISH_READY",
            "title": "엄마, 나만 친구 집에 못 가?",
            "html": "<h2>본문</h2><p>충분한 내용</p>",
            "labels": ["생활백서맘", "생활·관계"],
            "qa_report_id": "QA-1",
            "assets": [
                {"type": "thumbnail", "path": "thumb.png"},
                {"type": "infographic", "path": "info.png"},
            ],
        }

    def passed_asset_qa(self):
        return {
            "content_id": "LBM-READY-1",
            "status": "ASSET_QA_PASS",
            "passed": True,
            "issues": [],
        }

    def test_ready_draft_becomes_publisher_request(self):
        request, updated = build_publish_request(self.ready_draft(), self.passed_asset_qa())
        self.assertEqual(request["publish_mode"], "draft")
        self.assertEqual(request["asset_qa_status"], "ASSET_QA_PASS")
        self.assertEqual(updated["status"], "PUBLISH_REQUEST_READY")
        self.assertEqual(updated["next_stage"], "BLOGGER_PUBLISHER")

    def test_failed_asset_qa_is_blocked(self):
        report = self.passed_asset_qa()
        report.update({"status": "ASSET_QA_FAIL", "passed": False})
        with self.assertRaisesRegex(ValueError, "ASSET_QA_PASS"):
            build_publish_request(self.ready_draft(), report)

    def test_content_id_mismatch_is_blocked(self):
        report = self.passed_asset_qa()
        report["content_id"] = "OTHER"
        with self.assertRaisesRegex(ValueError, "content_id"):
            build_publish_request(self.ready_draft(), report)

    def test_schedule_requires_publish_at(self):
        with self.assertRaisesRegex(ValueError, "publish_at"):
            build_publish_request(self.ready_draft(), self.passed_asset_qa(), publish_mode="schedule")

    def test_both_assets_are_required(self):
        draft = self.ready_draft()
        draft["assets"] = [{"type": "thumbnail", "path": "thumb.png"}]
        with self.assertRaisesRegex(ValueError, "thumbnail"):
            build_publish_request(draft, self.passed_asset_qa())


if __name__ == "__main__":
    unittest.main()
