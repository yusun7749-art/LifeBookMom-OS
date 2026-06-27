export type Mission = {
  title: string;
  reason: string;
  department: "Content" | "SEO" | "Revenue" | "Asset" | "Journey";
  priority: 1 | 2 | 3 | 4 | 5;
};

export const navigatorMissions: Mission[] = [
  {
    title: "수족구 등교 기준 대표글 리뉴얼",
    reason: "건강·등교 클러스터 대표글 후보입니다.",
    department: "Asset",
    priority: 5,
  },
  {
    title: "열은 내렸는데 학교 보내도 될까요? 신규 글",
    reason: "검색어보다 부모 마음을 먼저 건드리는 제목입니다.",
    department: "Content",
    priority: 5,
  },
  {
    title: "친구에게 휘둘리는 아이 내부링크 보강",
    reason: "친구 부탁을 거절 못하는 아이 글과 연결됩니다.",
    department: "SEO",
    priority: 4,
  },
];

export function getTodayNavigatorMissions() {
  return navigatorMissions;
}
