from lifebookmom_engine.content_generation_engine import build_content_draft


def test_build_content_draft_creates_qa_ready_structure():
    request = {
        "request_id": "TEST-001",
        "topic": "아이와 대화하는 방법",
        "channel": "blogger",
    }

    draft = build_content_draft(request)

    assert draft["content_id"] == "TEST-001"
    assert draft["status"] == "CONTENT_GENERATED"
    assert draft["qa_required"] is True
    assert draft["next_stage"] == "QA_GATE"
    assert "FAQ" in draft["sections"]


def test_build_content_draft_requires_topic():
    try:
        build_content_draft({"request_id": "TEST-002"})
    except ValueError as exc:
        assert str(exc) == "topic is required"
    else:
        raise AssertionError("ValueError was not raised")
