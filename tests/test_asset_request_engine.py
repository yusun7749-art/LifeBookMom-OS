from __future__ import annotations

import json
import tempfile
import unittest
from pathlib import Path

from lifebookmom_engine.asset_request_engine import build_asset_request, load_draft, save_asset_request


class AssetRequestEngineTests(unittest.TestCase):
    def test_brand_and_asset_locks_are_created(self):
        payload = build_asset_request({"content_id": "LBM-001", "status": "DRAFT_GENERATED", "title": "엄마, 나만 친구 집에 못 가?"})
        self.assertEqual(payload["status"], "ASSET_REQUESTED")
        self.assertEqual(payload["next_stage"], "IMAGE_GENERATION")
        self.assertEqual(len(payload["assets"]), 2)
        self.assertEqual(payload["assets"][1]["panel_count"], 10)
        self.assertEqual(payload["brand_lock"]["brand"], "생활백서맘")
        self.assertEqual(payload["qa_rules"]["watermark_position"], "bottom-right-inside")

    def test_invalid_draft_state_is_blocked(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "draft.json"
            path.write_text(json.dumps({"content_id": "1", "status": "PUBLISHED"}), encoding="utf-8")
            with self.assertRaisesRegex(ValueError, "DRAFT_GENERATED"):
                load_draft(path)

    def test_request_is_saved_as_utf8_json(self):
        payload = build_asset_request({"content_id": "LBM-002", "status": "QA_PASS", "title": "아이 마음"})
        with tempfile.TemporaryDirectory() as directory:
            path = save_asset_request(payload, Path(directory))
            saved = json.loads(path.read_text(encoding="utf-8"))
        self.assertEqual(saved["assets"][0]["type"], "thumbnail")
        self.assertEqual(saved["assets"][1]["type"], "infographic")


if __name__ == "__main__":
    unittest.main()
