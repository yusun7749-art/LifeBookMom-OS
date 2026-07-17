from __future__ import annotations

import sys
import unittest
from datetime import datetime, timedelta, timezone
from pathlib import Path

PUBLISHER_DIR = Path(__file__).resolve().parents[1] / "lifebookmom_publisher"
if str(PUBLISHER_DIR) not in sys.path:
    sys.path.insert(0, str(PUBLISHER_DIR))

from blogger_publisher import parse_schedule, publish_draft


class _Execute:
    def __init__(self, result):
        self.result = result

    def execute(self):
        return self.result


class _Posts:
    def publish(self, **kwargs):
        self.kwargs = kwargs
        return _Execute({"id": kwargs["postId"], "url": "https://example.com/post"})


class _Service:
    def __init__(self):
        self._posts = _Posts()

    def posts(self):
        return self._posts


class BloggerScheduleTests(unittest.TestCase):
    def test_future_schedule_is_normalized_to_utc(self):
        future = datetime.now(timezone.utc) + timedelta(days=2)
        value = future.astimezone(timezone(timedelta(hours=9))).isoformat()
        self.assertTrue(parse_schedule(value).endswith("Z"))

    def test_timezone_is_required(self):
        with self.assertRaisesRegex(ValueError, "timezone"):
            parse_schedule("2099-01-01T09:00:00")

    def test_past_schedule_is_blocked(self):
        with self.assertRaisesRegex(ValueError, "future"):
            parse_schedule("2020-01-01T09:00:00+09:00")

    def test_publish_date_is_forwarded_to_blogger(self):
        service = _Service()
        publish_draft(service, "blog", "post", "2099-01-01T00:00:00Z")
        self.assertEqual(service._posts.kwargs["publishDate"], "2099-01-01T00:00:00Z")


if __name__ == "__main__":
    unittest.main()
