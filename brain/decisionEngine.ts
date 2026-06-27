import { type MemoryRecord } from "./memoryEngine";

export type DecisionResult = {
  decision: string;
  reason: string;
  priority: 1 | 2 | 3 | 4 | 5;
};

export function decideNextAction(record: MemoryRecord): DecisionResult {
  if (record.assetGrade === "A") {
    return {
      decision: "대표글 리뉴얼",
      reason: "이미 핵심 자산 후보이므로 최신 정보·FAQ·내부링크를 보강해야 합니다.",
      priority: 5,
    };
  }

  if (record.assetGrade === "B") {
    return {
      decision: "클러스터 연결",
      reason: "대표글로 키우기 전 관련 글과 내부링크를 먼저 연결해야 합니다.",
      priority: 4,
    };
  }

  return {
    decision: "보류 또는 재작성",
    reason: "현재는 자산성이 약하므로 검색 의도와 수익 연결성을 다시 점검해야 합니다.",
    priority: 3,
  };
}
