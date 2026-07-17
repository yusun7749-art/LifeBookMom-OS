from __future__ import annotations

import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PUBLISHER_DIR = ROOT / "lifebookmom_publisher"
if str(PUBLISHER_DIR) not in sys.path:
    sys.path.insert(0, str(PUBLISHER_DIR))

from blogger_draft_smoke_test import run_draft_lifecycle
from blogger_publisher import PublishRequest


class _Execute:
    def __init__(self, result=None, action=None):
        self.result = result or {}
        self.action = action

    def execute(self):
        if self.action:
            self.action()
        return self.result


class _Posts:
    def __init__(self):
        self.deleted = False
        self.updated_title = ""

    def insert(self, **kwargs):
        return _Execute({"id": "101", "title": kwargs["body"]["title"]})

    def get(self, **kwargs):
        return _Execute({"id": "101", "title": "원본 제목"})

    def patch(self, **kwargs):
        self.updated_title = kwargs["body"]["title"]
        return _Execute({"id": "101", "title": self.updated_title})

    def delete(self, **kwargs):
        return _Execute(action=lambda: setattr(self, "deleted", True))


class _Service:
    def __init__(self):
        self._posts = _Posts()

    def posts(self):
        return self._posts


class DraftLifecycleTests(unittest.TestCase):
    def test_create_read_update_delete(self):
        service = _Service()
        request = PublishRequest("원본 제목", "<h2>본문</h2><p>내용</p>", ["테스트"])

        result = run_draft_lifecycle(service, "4027327034067144989", request)

        self.assertEqual(result["status"], "DRAFT_LIFECYCLE_PASS")
        self.assertTrue(service._posts.deleted)
        self.assertEqual(service._posts.updated_title, "원본 제목 [자동화 검증완료]")


if __name__ == "__main__":
    unittest.main()
