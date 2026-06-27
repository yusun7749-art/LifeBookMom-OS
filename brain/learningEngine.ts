export type LearningSignal = {
  signal: string;
  meaning: string;
  osAction: string;
};

export const learningSignals: LearningSignal[] = [
  {
    signal: "체크리스트 포함 글",
    meaning: "부모가 저장하고 다시 확인할 가능성이 높습니다.",
    osAction: "모든 대표글에 체크리스트 블록을 기본 삽입합니다.",
  },
  {
    signal: "질문형 제목",
    meaning: "부모의 실제 검색 문장과 감정에 가깝습니다.",
    osAction: "제목 추천 시 질문형 제목을 최소 1개 포함합니다.",
  },
  {
    signal: "추천템 4개",
    meaning: "너무 많지 않으면서 선택지가 충분합니다.",
    osAction: "생활백서맘 추천템 기본 개수를 4개로 유지합니다.",
  },
];

export function getLearningSignals() {
  return learningSignals;
}
