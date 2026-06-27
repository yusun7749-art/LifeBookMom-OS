export type LifeStage = "초3" | "초4" | "초5" | "초6" | "중학생";

export type JourneyNode = {
  stage: LifeStage;
  coreConcerns: string[];
  recommendedClusters: string[];
  nextStageHints: string[];
};

export const lifeJourneyMap: JourneyNode[] = [
  {
    stage: "초3",
    coreConcerns: ["친구관계", "학교생활", "자기주도학습", "스마트폰", "용돈교육", "안전교육", "감정표현"],
    recommendedClusters: ["친구·사회성", "학교 적응", "생활 안전", "학습 루틴", "디지털 습관", "경제교육"],
    nextStageHints: ["초4 학습격차", "사춘기 시작", "친구 무리 변화", "스마트폰 규칙 재정비"],
  },
  {
    stage: "초4",
    coreConcerns: ["학습격차", "자존감", "친구관계", "사춘기 신호", "학원 선택", "디지털 사용"],
    recommendedClusters: ["학습 관리", "자존감", "관계교육", "사춘기 준비", "가정 루틴"],
    nextStageHints: ["초5 사춘기", "성교육", "진로 흥미", "자기관리"],
  },
  {
    stage: "초5",
    coreConcerns: ["사춘기", "몸 변화", "친구 무리", "공부 스트레스", "스마트폰·SNS", "자기관리"],
    recommendedClusters: ["사춘기", "감정 조절", "SNS 안전", "학습 스트레스", "부모 대화법"],
    nextStageHints: ["초6 중학교 준비", "진로", "시간관리", "관계 갈등"],
  },
  {
    stage: "초6",
    coreConcerns: ["중학교 준비", "학습 습관", "친구관계", "자기관리", "진로 흥미", "스마트폰 관리"],
    recommendedClusters: ["중학교 준비", "자기관리", "학습전략", "관계회복", "진로탐색"],
    nextStageHints: ["중1 적응", "시험 준비", "교우관계", "생활기록"],
  },
];

export function getJourneyStage(stage: LifeStage = "초3") {
  return lifeJourneyMap.find((item) => item.stage === stage) ?? lifeJourneyMap[0];
}
