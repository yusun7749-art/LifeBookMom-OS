export type MissionStatus = "긴급" | "중요" | "일반" | "대기";
export type MissionArea = "콘텐츠" | "SEO" | "수익" | "브랜드" | "Journey" | "자산";

export type NavigatorMission = {
  id: string;
  title: string;
  area: MissionArea;
  status: MissionStatus;
  reason: string;
  expectedImpact: string;
  xp: number;
};

export const navigatorIntelligenceMissions: NavigatorMission[] = [
  {
    id: "mission-renew-handfootmouth",
    title: "수족구 등교 기준 대표글 리뉴얼",
    area: "자산",
    status: "긴급",
    reason: "대표글 후보이며 부모 검색 의도가 명확합니다.",
    expectedImpact: "조회수 안정화 + 건강 클러스터 강화",
    xp: 180,
  },
  {
    id: "mission-school-fever",
    title: "열은 내렸는데 학교 보내도 될까요? 신규 글 작성",
    area: "콘텐츠",
    status: "긴급",
    reason: "검색어보다 부모 마음을 먼저 건드리는 제목입니다.",
    expectedImpact: "검색 유입 + 공감 체류시간 증가",
    xp: 160,
  },
  {
    id: "mission-friend-boundary",
    title: "친구에게 휘둘리는 아이 내부링크 보강",
    area: "SEO",
    status: "중요",
    reason: "친구 부탁을 거절 못하는 아이 글과 연결됩니다.",
    expectedImpact: "체류시간 증가 + Parenting Graph 확장",
    xp: 120,
  },
  {
    id: "mission-safety-product",
    title: "체험학습 미아방지 준비물 수익형 글 기획",
    area: "수익",
    status: "중요",
    reason: "안전교육과 추천템 연결이 자연스럽습니다.",
    expectedImpact: "쿠팡 전환 가능성 상승",
    xp: 110,
  },
  {
    id: "mission-tone-check",
    title: "생활백서맘 요~조체 기준 점검",
    area: "브랜드",
    status: "일반",
    reason: "부드럽지만 강한 메시지라는 브랜드 기준 유지가 필요합니다.",
    expectedImpact: "브랜드 신뢰도 유지",
    xp: 70,
  },
];

export function getMissionsByStatus(status: MissionStatus) {
  return navigatorIntelligenceMissions.filter((mission) => mission.status === status);
}

export function getTotalMissionXp() {
  return navigatorIntelligenceMissions.reduce((sum, mission) => sum + mission.xp, 0);
}
