"""Execution hook for MASTER LOG AUTO WRITER."""

from factory.execution_tracker import ExecutionTracker
from factory.log_integration import build_log_event, record_execution


class ExecutionHook:
    def __init__(self, log_writer):
        self.tracker = ExecutionTracker()
        self.log_writer = log_writer

    def start(self, task):
        event = self.tracker.start(task)
        log_event = build_log_event(
            task=task,
            status="START",
            result="execution started",
        )
        record_execution(self.log_writer, log_event)
        return event

    def finish(self, task, result):
        event = self.tracker.finish(task, result)
        log_event = build_log_event(
            task=task,
            status="RESULT",
            result=result,
        )
        record_execution(self.log_writer, log_event)
        return event
