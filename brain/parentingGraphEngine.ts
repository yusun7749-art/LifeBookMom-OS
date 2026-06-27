export type GraphEdge = {
  from: string;
  to: string;
  reason: string;
  strength: 1 | 2 | 3 | 4 | 5;
};

export type ParentConcernNode = {
  id: string;
  title: string;
  stage: string;
  category: "학교" | "친구" | "건강" | "안전" | "학습" | "감정" | "생활" | "수익";
  parentMind: string;
  searchIntent: string;
  contentAngle: string;
};

export const concernNodes: ParentConcernNode[] = [
  {
    id: "school-stomachache",
    title: "학교 가기 전 배가 아프다는 아이",
    stage: "초3",
    category: "학교",
    parentMind: "꾀병인지 진짜 아픈 건지 몰라 불안합니다.",
    searchIntent: "등교 전 복통 원인과 부모 대처법",
    contentAngle: "불안을 먼저 인정하고, 몸·마음 신호를 나누어 설명합니다.",
  },
  {
    id: "friend-refusal",
    title: "친구 부탁을 거절 못하는 아이",
    stage: "초3",
    category: "친구",
    parentMind: "착한 아이인 줄 알았는데 혹시 이용당하는 건 아닌지 걱정됩니다.",
    searchIntent: "초등학생 거절 못하는 성격 대처법",
    contentAngle: "아이를 나무라지 않고 자기표현 연습으로 연결합니다.",
  },
  {
    id: "self-esteem",
    title: "자존감이 낮은 아이 특징",
    stage: "초3",
    category: "감정",
    parentMind: "우리 아이가 자신감이 없는 것 같아 마음이 쓰입니다.",
    searchIntent: "초등학생 자존감 낮은 아이 특징",
    contentAngle: "부모가 알아차릴 수 있는 말·행동 신호를 정리합니다.",
  },
  {
    id: "emotion-expression",
    title: "싫다고 말하는 연습",
    stage: "초3",
    category: "감정",
    parentMind: "아이가 자기 마음을 표현하지 못하고 참기만 합니다.",
    searchIntent: "초등학생 자기표현 훈련",
    contentAngle: "가정에서 연습할 수 있는 문장 예시와 대화법을 제공합니다.",
  },
  {
    id: "handfootmouth-school",
    title: "수족구 등교 기준",
    stage: "초3",
    category: "건강",
    parentMind: "열은 내렸는데 학교에 보내도 되는지 가장 궁금합니다.",
    searchIntent: "수족구 등교 가능 기준",
    contentAngle: "등교 판단 기준·병원 확인·학교 연락 체크리스트를 제공합니다.",
  },
  {
    id: "abduction-safety",
    title: "초등학생 유괴 예방 교육",
    stage: "초3",
    category: "안전",
    parentMind: "아이 혼자 등하교할 때 혹시 위험한 상황이 생길까 걱정됩니다.",
    searchIntent: "초등학생 유괴 예방 안전수칙",
    contentAngle: "무섭게 겁주지 않고 실천 행동을 알려줍니다.",
  },
];

export const concernEdges: GraphEdge[] = [
  { from: "friend-refusal", to: "self-esteem", reason: "거절을 못하는 행동은 자존감 고민으로 이어질 수 있습니다.", strength: 5 },
  { from: "self-esteem", to: "emotion-expression", reason: "자존감 회복은 자기표현 연습과 연결됩니다.", strength: 5 },
  { from: "school-stomachache", to: "self-esteem", reason: "등교 전 신체 증상은 학교 스트레스나 관계 고민과 연결될 수 있습니다.", strength: 4 },
  { from: "abduction-safety", to: "emotion-expression", reason: "위험한 상황에서 싫다고 말하는 연습이 필요합니다.", strength: 4 },
  { from: "handfootmouth-school", to: "school-stomachache", reason: "건강 문제와 등교 판단은 학교생활 불안과 연결됩니다.", strength: 3 },
];

export function getNodeById(id: string) {
  return concernNodes.find((node) => node.id === id) ?? concernNodes[0];
}

export function getConnectedConcerns(id: string) {
  const edges = concernEdges.filter((edge) => edge.from === id || edge.to === id);
  return edges.map((edge) => {
    const otherId = edge.from === id ? edge.to : edge.from;
    return {
      edge,
      node: getNodeById(otherId),
    };
  });
}

export function getGraphSummary() {
  return {
    nodeCount: concernNodes.length,
    edgeCount: concernEdges.length,
    strongestPath: ["친구 부탁을 거절 못하는 아이", "자존감이 낮은 아이 특징", "싫다고 말하는 연습"],
    philosophy: "부모의 고민은 하나로 끝나지 않습니다. 하나의 걱정은 다음 걱정으로 이어지고, LifeBookMom OS는 그 흐름을 지도로 연결합니다.",
  };
}
