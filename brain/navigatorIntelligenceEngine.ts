import { getCompanyHealthAverage, companyHealthMetrics } from "./companyHealthEngine";
import { getPrioritizedMissions } from "./priorityEngine";
import { getTotalMissionXp } from "./missionEngine";

export function getNavigatorIntelligenceReport() {
  const prioritized = getPrioritizedMissions();

  return {
    title: "Navigator Intelligence Report",
    greeting: "좋은 아침입니다, 선장님. 오늘은 대표글 리뉴얼과 부모 마음을 건드리는 신규 글을 먼저 진행하는 것이 좋습니다.",
    companyHealth: getCompanyHealthAverage(),
    metrics: companyHealthMetrics,
    missions: prioritized,
    totalXp: getTotalMissionXp(),
    focusMessage: "오늘의 핵심은 많이 쓰는 것이 아니라, 대표 자산을 키우고 다음 부모 고민으로 연결하는 것입니다.",
  };
}
