"""
MASTER LOG AUTO WRITER integration layer.

Connects execution results to the logging pipeline.
This module keeps logging append-only and does not overwrite history.
"""

from datetime import datetime, timezone


def build_log_event(task, status, result=None, next_step=None):
    return {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "task": task,
        "status": status,
        "result": result or "",
        "next_step": next_step or "",
    }


def record_execution(log_writer, event):
    """Send completed execution event to MASTER LOG writer."""
    return log_writer.append(event)
