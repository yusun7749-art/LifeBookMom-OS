export type MemoryRecord = {
  id: string;
  title: string;
  cluster: string;
  stage: string;
  assetGrade: "A" | "B" | "C" | "D";
  learnedReason: string;
  nextAction: string;
};

export const memoryRecords: MemoryRecord[] = [
  {
    id: "health-handfootmouth-school",
    title: "수족구 등교 기준 총정리",
    cluster: "건강·등교",
    stage: "초3",
    assetGrade: "A",
    learnedReason: "부모가 실제로 가장 궁금해하는 판단 기준형 글입니다.",
    nextAction: "대표글로 리뉴얼하고 FAQ와 등교 체크리스트를 강화합니다.",
  },
  {
    id: "friend-refusal-child",
    title: "친구 부탁을 거절 못하는 아이",
    cluster: "친구·사회성",
    stage: "초3",
    assetGrade: "A",
    learnedReason: "부모 공감형 도입부와 관계 고민 확장성이 강합니다.",
    nextAction: "자존감·자기표현·친구관계 클러스터로 확장합니다.",
  },
  {
    id: "safety-abduction-prevention",
    title: "초등학생 유괴 예방 교육",
    cluster: "생활 안전",
    stage: "초3",
    assetGrade: "B",
    learnedReason: "검색형 안전 콘텐츠이면서 추천템 연결이 자연스럽습니다.",
    nextAction: "등하교 안전·미아방지 준비물 글과 연결합니다.",
  },
];

export function getBrainMemories() {
  return memoryRecords;
}
