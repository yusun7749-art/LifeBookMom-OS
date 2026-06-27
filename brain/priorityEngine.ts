import { navigatorIntelligenceMissions, type NavigatorMission } from "./missionEngine";

const statusWeight = {
  긴급: 4,
  중요: 3,
  일반: 2,
  대기: 1,
};

const areaWeight = {
  자산: 5,
  콘텐츠: 5,
  SEO: 4,
  수익: 4,
  Journey: 3,
  브랜드: 3,
};

export function calculatePriorityScore(mission: NavigatorMission) {
  return statusWeight[mission.status] * 20 + areaWeight[mission.area] * 10 + mission.xp / 10;
}

export function getPrioritizedMissions() {
  return [...navigatorIntelligenceMissions].sort((a, b) => calculatePriorityScore(b) - calculatePriorityScore(a));
}
