export type Recommendation = {
  title: string;
  reason: string;
  score: number;
  category: "검색형" | "공감형" | "수익형" | "대표글";
};

export const recommendations: Recommendation[] = [
  {
    title: "열은 내렸는데 학교 보내도 될까요? 초등학생 등교 판단 기준",
    reason: "검색어와 부모 마음을 동시에 잡는 제목입니다.",
    score: 98,
    category: "대표글",
  },
  {
    title: "자존감이 낮은 아이 특징, 부모가 먼저 알아차리는 신호",
    reason: "친구 부탁 거절 문제의 다음 고민으로 자연스럽게 이어집니다.",
    score: 94,
    category: "공감형",
  },
  {
    title: "체험학습 갈 때 꼭 챙길 미아방지 준비물",
    reason: "안전교육 콘텐츠와 쿠팡 추천템 연결이 자연스럽습니다.",
    score: 91,
    category: "수익형",
  },
];

export function getRecommendations() {
  return recommendations;
}
