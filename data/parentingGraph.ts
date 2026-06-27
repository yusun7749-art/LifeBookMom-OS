export type ParentingGraphNode = {
  topic: string;
  cluster: string;
  related: string[];
  nextRecommended: { title: string; priority: 3 | 4 | 5; reason: string }[];
};

export const parentingGraph: ParentingGraphNode[] = [
  {
    topic: "친구 부탁을 거절 못하는 아이",
    cluster: "친구·사회성",
    related: ["친구 괴롭힘", "자존감", "감정표현", "학교생활", "부모 대화법"],
    nextRecommended: [
      { title: "자존감이 낮은 아이 특징, 부모가 먼저 알아차리는 신호", priority: 5, reason: "거절을 어려워하는 아이의 근본 원인과 연결됩니다." },
      { title: "친구에게 휘둘리는 아이, 부모가 알려줘야 할 관계 거리두기", priority: 4, reason: "친구관계 고민의 다음 단계 콘텐츠로 자연스럽습니다." },
      { title: "싫다고 말하는 연습, 초등학생 자기표현 키우는 방법", priority: 4, reason: "실천형 체크리스트와 추천템 연결이 좋습니다." },
    ],
  },
  {
    topic: "수족구 등교 기준",
    cluster: "건강·등교",
    related: ["감염병 예방", "학교 등교 기준", "손씻기", "가정 간호", "병원 진료"],
    nextRecommended: [
      { title: "열은 내렸는데 학교 보내도 될까요? 초등학생 등교 판단 기준", priority: 5, reason: "부모의 실제 검색 의도를 강하게 건드립니다." },
      { title: "요즘 아이들 사이에서 유행하는 질병, 집에서 예방하는 방법", priority: 4, reason: "건강 클러스터 대표글과 연결됩니다." },
      { title: "초등학생 손 씻기 습관, 감염병 예방의 시작이에요", priority: 3, reason: "생활습관형 장기 콘텐츠로 적합합니다." },
    ],
  },
  {
    topic: "초등학생 유괴 예방 교육",
    cluster: "생활 안전",
    related: ["등하교 안전", "미아방지", "위험상황 대처", "학교생활", "부모 체크리스트"],
    nextRecommended: [
      { title: "초등학생 등하교 안전수칙, 혼자 다니기 전 꼭 알려주세요", priority: 5, reason: "유괴 예방 글과 내부링크 연결성이 높습니다." },
      { title: "낯선 사람이 말을 걸 때 아이가 해야 할 행동 5가지", priority: 4, reason: "검색형·실천형 콘텐츠로 전환이 좋습니다." },
      { title: "체험학습 갈 때 꼭 챙길 미아방지 준비물", priority: 4, reason: "추천템과 자연스럽게 연결됩니다." },
    ],
  },
];

export function findParentingGraph(topic: string) {
  const normalized = topic.trim();
  return parentingGraph.find((node) => normalized.includes(node.topic) || node.topic.includes(normalized)) ?? parentingGraph[0];
}
