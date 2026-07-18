"""Execution tracker for LifeBookMom Factory."""

from datetime import datetime


class ExecutionTracker:
    def start(self, task):
        return {"status": "START", "task": task, "time": datetime.now().isoformat()}

    def finish(self, task, result):
        return {
            "status": "RESULT",
            "task": task,
            "result": result,
            "time": datetime.now().isoformat(),
        }
