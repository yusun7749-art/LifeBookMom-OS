import unittest

from lifebookmom_qa.content_qa_gate import validate_payload


class ContentQAGateTests(unittest.TestCase):
    def test_valid_content_passes(self):
        html = (
            "<h2>도입</h2><p>" + "가" * 300 + "</p>"
            "<h2>실천 방법</h2><p>" + "나" * 300 + "</p>"
            "<h2>FAQ 자주 묻는 질문</h2><p>" + "다" * 300 + "</p>"
        )
        result = validate_payload({"title": "아이와 함께 실천하는 생활 습관", "html": html, "labels": ["교육"]})
        self.assertTrue(result.passed)

    def test_short_content_is_blocked(self):
        result = validate_payload({"title": "충분히 긴 제목입니다", "html": "<h2>본문</h2><p>짧음</p>", "labels": []})
        self.assertFalse(result.passed)
        self.assertIn("CONTENT_TOO_SHORT", [issue.code for issue in result.issues])

    def test_script_is_blocked(self):
        html = "<h2>하나</h2><h2>둘</h2><h2>FAQ</h2><p>" + "가" * 900 + "</p><script>alert(1)</script>"
        result = validate_payload({"title": "안전하지 않은 본문 테스트", "html": html, "labels": ["테스트"]})
        self.assertFalse(result.passed)
        self.assertIn("UNSAFE_EMBED", [issue.code for issue in result.issues])


if __name__ == "__main__":
    unittest.main()
