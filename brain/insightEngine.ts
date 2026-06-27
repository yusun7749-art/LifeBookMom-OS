import { getBrainMemories } from "./memoryEngine";
import { decideNextAction } from "./decisionEngine";
import { getRecommendations } from "./recommendationEngine";
import { getLearningSignals } from "./learningEngine";

export function getBrainCoreReport() {
  const memories = getBrainMemories();
  const decisions = memories.map((memory) => ({
    memory,
    decision: decideNextAction(memory),
  }));

  return {
    title: "Brain Core Report",
    summary: "LifeBookMom OS가 콘텐츠를 단순 저장하지 않고, 자산성·부모 고민·다음 행동을 판단하기 시작했습니다.",
    memories,
    decisions,
    recommendations: getRecommendations(),
    learningSignals: getLearningSignals(),
  };
}
