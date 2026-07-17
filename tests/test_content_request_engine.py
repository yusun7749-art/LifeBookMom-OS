from __future__ import annotations

import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch
from datetime import datetime, timezone

from lifebookmom_engine.content_request_engine import build_request, normalize_topic, save_request


class ContentRequestEngineTests(unittest.TestCase):
    def test_topic_is_normalized_and_rules_are_locked(self):
        fixed = datetime(2026, 7, 18, 3, 0, tzinfo=timezone.utc)
        with patch("lifebookmom_engine.content_request_engine._now_utc", return_value=fixed):
            request = build_request("  엄마,   나만 친구 집에 못 가?  ", category="생활·관계")

        self.assertEqual(request.topic, "엄마, 나만 친구 집에 못 가?")
        self.assertEqual(request.status, "CONTENT_REQUESTED")
        self.assertEqual(request.next_stage, "CONTENT_GENERATION")
        self.assertTrue(request.rules["qa_required"])
        self.assertFalse(request.rules["publish_before_qa"])
        self.assertEqual(request.rules["minimum_visible_text_length"], 5000)

    def test_short_topic_is_rejected(self):
        with self.assertRaises(ValueError):
            normalize_topic("앗")

    def test_request_is_saved_as_utf8_json(self):
        request = build_request("아이의 마음을 놓치고 있지는 않은지")
        with tempfile.TemporaryDirectory() as tmp:
            path = save_request(request, Path(tmp))
            payload = json.loads(path.read_text(encoding="utf-8"))

        self.assertEqual(payload["project"], "생활백서맘")
        self.assertEqual(payload["topic"], "아이의 마음을 놓치고 있지는 않은지")
        self.assertEqual(payload["next_stage"], "CONTENT_GENERATION")


if __name__ == "__main__":
    unittest.main()
