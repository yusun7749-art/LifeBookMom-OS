from __future__ import annotations

import json
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ENGINE_DIR = ROOT / "lifebookmom_engine"
AUTOMATION_DIR = ROOT / "lifebookmom_automation"
for path in (ENGINE_DIR, AUTOMATION_DIR):
    if str(path) not in sys.path:
        sys.path.insert(0, str(path))

from article_draft_engine import build_draft, load_request, save_draft
from content_request_engine import build_request


class ArticleDraftEngineTests(unittest.TestCase):
    def test_request_becomes_editable_draft(self):
        request = build_request("엄마, 나만 친구 집에 못 가?", category="생활·관계")
        draft = build_draft(request.__dict__)
        self.assertEqual(draft["status"], "DRAFT_GENERATED")
        self.assertEqual(draft["next_stage"], "QA")
        self.assertIn("FAQ", draft["html"])
        self.assertIn("체크리스트", draft["html"])
        self.assertNotIn("리니", draft["html"])
        self.assertIn("생활·관계", draft["labels"])

    def test_invalid_state_is_blocked(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            path = Path(temp_dir) / "bad.json"
            path.write_text(json.dumps({"status": "PUBLISHED", "topic": "테스트 주제"}), encoding="utf-8")
            with self.assertRaisesRegex(ValueError, "CONTENT_REQUESTED"):
                load_request(path)

    def test_draft_is_saved_as_utf8_json(self):
        request = build_request("아이의 마음을 놓치고 있진 않은지")
        draft = build_draft(request.__dict__)
        with tempfile.TemporaryDirectory() as temp_dir:
            path = save_draft(draft, Path(temp_dir))
            saved = json.loads(path.read_text(encoding="utf-8"))
            self.assertEqual(saved["content_id"], request.request_id)


if __name__ == "__main__":
    unittest.main()
