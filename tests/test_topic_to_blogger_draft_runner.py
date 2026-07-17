from __future__ import annotations

import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
for folder in (ROOT / "lifebookmom_engine", ROOT / "lifebookmom_qa", ROOT / "lifebookmom_automation"):
    if str(folder) not in sys.path:
        sys.path.insert(0, str(folder))

from article_draft_engine import build_draft
from content_qa_gate import visible_text
from content_request_engine import build_request
import topic_to_blogger_draft_runner as runner


class TopicToBloggerDraftRunnerTests(unittest.TestCase):
    def test_generated_article_meets_approval_length(self):
        request = build_request("엄마, 나만 친구 집에 못 가?", category="생활·관계")
        draft = build_draft(request.__dict__)
        self.assertGreaterEqual(len(visible_text(draft["html"])), 5000)
        self.assertNotIn("리니", draft["html"])
        self.assertIn("FAQ", draft["html"])

    def test_dry_run_passes_qa_without_blogger_api(self):
        with tempfile.TemporaryDirectory() as temp:
            base = Path(temp)
            with patch.object(runner, "QA_DIR", base / "qa"), patch.object(runner, "PIPELINE_LOG", base / "pipeline.jsonl"), patch.object(runner, "save_request") as save_request_mock, patch.object(runner, "save_draft") as save_draft_mock:
                request_path = base / "request.json"
                draft_path = base / "draft.json"
                save_request_mock.return_value = request_path
                save_draft_mock.return_value = draft_path
                result = runner.run("엄마, 나만 친구 집에 못 가?", "생활·관계", dry_run=True)

        self.assertEqual(result["status"], "TOPIC_TO_BLOGGER_DRAFT_DRY_RUN_PASS")
        self.assertGreaterEqual(result["text_length"], 5000)
        self.assertEqual(result["next_stage"], "BLOGGER_DRAFT")

    def test_qa_failure_blocks_blogger(self):
        with patch.object(runner, "prepare", return_value={"status": "BLOCKED_BY_QA", "qa": {"status": "QA_FAIL"}}), patch.object(runner, "send_to_blogger") as sender:
            result = runner.run("테스트 주제", "미분류")
        self.assertEqual(result["status"], "BLOCKED_BY_QA")
        sender.assert_not_called()


if __name__ == "__main__":
    unittest.main()
