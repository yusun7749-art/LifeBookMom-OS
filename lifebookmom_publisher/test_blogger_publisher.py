from __future__ import annotations

import json
import tempfile
import unittest
from datetime import datetime, timedelta, timezone
from pathlib import Path

from blogger_publisher import (
    PublishRequest,
    parse_schedule,
    publish_draft,
    resolve_blog_id,
    write_result_log,
)


class _Execute:
    def __init__(self, result):
        self.result = result

    def execute(self):
        return self.result


class _Blogs:
    def __init__(self, items):
        self.items = items

    def listByUser(self, userId):
        self.user_id = userId
        return _Execute({"items": self.items})

    def get(self, blogId):
        self.blog_id = blogId
        return _Execute({"id": blogId})


class _Posts:
    def publish(self, **kwargs):
        self.publish_kwargs = kwargs
        return _Execute({"id": kwargs["postId"], "url": "https://example.com/post"})


class _Service:
    def __init__(self, items):
        self._blogs = _Blogs(items)
        self._posts = _Posts()

    def blogs(self):
        return self._blogs

    def posts(self):
        return self._posts


class PublishRequestTests(unittest.TestCase):
    def test_request_validation_and_label_deduplication(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "request.json"
            path.write_text(
                json.dumps(
                    {
                        "title": " 테스트 글 ",
                        "html": "<p>본문</p>",
                        "labels": ["육아", "육아", " 초등 "],
                    },
                    ensure_ascii=False,
                ),
                encoding="utf-8",
            )
            request = PublishRequest.from_json(path)

        self.assertEqual(request.title, "테스트 글")
        self.assertEqual(request.labels, ["육아", "초등"])

    def test_request_rejects_non_array_labels(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "request.json"
            path.write_text(
                json.dumps({"title": "제목", "html": "본문", "labels": "육아"}, ensure_ascii=False),
                encoding="utf-8",
            )
            with self.assertRaisesRegex(ValueError, "labels must be"):
                PublishRequest.from_json(path)


class ScheduleTests(unittest.TestCase):
    def test_schedule_is_normalized_to_utc(self):
        future = datetime.now(timezone.utc) + timedelta(days=2)
        value = future.astimezone(timezone(timedelta(hours=9))).isoformat()
        normalized = parse_schedule(value)
        self.assertTrue(normalized.endswith("Z"))

    def test_schedule_requires_timezone(self):
        with self.assertRaisesRegex(ValueError, "timezone"):
            parse_schedule("2099-01-01T09:00:00")

    def test_past_schedule_is_rejected(self):
        with self.assertRaisesRegex(ValueError, "future"):
            parse_schedule("2020-01-01T09:00:00+09:00")

    def test_publish_date_is_sent_to_blogger(self):
        service = _Service([])
        result = publish_draft(service, "blog", "post", "2099-01-01T00:00:00Z")
        self.assertEqual(result["url"], "https://example.com/post")
        self.assertEqual(service._posts.publish_kwargs["publishDate"], "2099-01-01T00:00:00Z")


class BlogResolutionTests(unittest.TestCase):
    def test_configured_blog_id_is_verified(self):
        service = _Service([])
        self.assertEqual(resolve_blog_id(service, "123"), "123")
        self.assertEqual(service._blogs.blog_id, "123")

    def test_single_blog_is_selected_automatically(self):
        service = _Service([{"id": "456", "name": "생활백서맘", "url": "https://example.com"}])
        self.assertEqual(resolve_blog_id(service, ""), "456")

    def test_multiple_blogs_require_explicit_selection(self):
        service = _Service([{"id": "1", "name": "A"}, {"id": "2", "name": "B"}])
        with self.assertRaisesRegex(RuntimeError, "Multiple Blogger blogs"):
            resolve_blog_id(service, "")


class ResultLogTests(unittest.TestCase):
    def test_result_is_appended_as_jsonl(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "logs" / "result.jsonl"
            write_result_log({"status": "DRAFT_CREATED", "post_id": "1"}, path)
            record = json.loads(path.read_text(encoding="utf-8").strip())

        self.assertEqual(record["status"], "DRAFT_CREATED")
        self.assertEqual(record["post_id"], "1")
        self.assertIn("recorded_at", record)


if __name__ == "__main__":
    unittest.main()
