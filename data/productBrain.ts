// Project009-8
// Living Product Intelligence
// 생활백서맘 초3~4학년 기준 추천상품 엔진

export type ProductCategory =
  | "안전"
  | "학습"
  | "학교생활"
  | "계절"
  | "정서"
  | "놀이"
  | "건강"
  | "경제교육";

export type ProductCandidate = {
  id: string;
  category: ProductCategory;
  productName: string;
  targetGrade: "초3~4";
  topicTags: string[];
  seasonTags: string[];
  score: number;
  reason: string;
  forbiddenFor: string[];
};

export const productBrainRules = {
  project: "Project009-8",
  title: "Living Product Intelligence",
  version: "LPI_v1.0",
  defaultTarget: "초등학교 3~4학년",
  principle:
    "추천상품은 광고가 아니라 부모에게 실제 도움이 되는 생활백서맘 콘텐츠 자산이다.",
  format: "👉 [쿠팡파트너스 링크 입력]\n상품명\n추천 이유",
  requiredChecks: [
    "초등학교 3~4학년에게 실제 적합한가",
    "글 주제와 직접 관련이 있는가",
    "계절과 학교생활 맥락에 맞는가",
    "부모가 실제로 필요성을 느낄 수 있는가",
    "추천 이유를 명확히 설명할 수 있는가",
  ],
  forbiddenKeywords: [
    "핑크퐁",
    "아기상어",
    "뽀로로",
    "타요",
    "코코멜론",
    "유아완구",
    "유아교구",
    "미취학 전용",
    "영유아 전용",
  ],
};

export const productCandidates: ProductCandidate[] = [
  {
    id: "SAFE-001",
    category: "안전",
    productName: "어린이 GPS 위치 알림 기기",
    targetGrade: "초3~4",
    topicTags: ["유괴예방", "등하교", "안전", "혼자귀가"],
    seasonTags: ["상시"],
    score: 98,
    reason:
      "초3~4학년은 혼자 등하교와 학원 이동이 늘어나는 시기라 위치 확인 수요가 높은 안전용품입니다.",
    forbiddenFor: ["유아전용"],
  },
  {
    id: "SAFE-002",
    category: "안전",
    productName: "어린이 안심 호루라기",
    targetGrade: "초3~4",
    topicTags: ["유괴예방", "등하교", "낯선사람", "안전"],
    seasonTags: ["상시"],
    score: 94,
    reason:
      "위급 상황에서 아이가 즉시 도움을 요청할 수 있어 안전교육 콘텐츠와 자연스럽게 연결됩니다.",
    forbiddenFor: ["장난감형 유아제품"],
  },
  {
    id: "SAFE-003",
    category: "안전",
    productName: "초등학생 연락처 네임택",
    targetGrade: "초3~4",
    topicTags: ["유괴예방", "분실", "학교생활", "등하교"],
    seasonTags: ["상시", "새학기"],
    score: 91,
    reason:
      "책가방이나 실내화가방에 부착하기 좋아 초등학생 학교생활 안전용으로 적합합니다.",
    forbiddenFor: ["유아 캐릭터 전용"],
  },
  {
    id: "RAIN-001",
    category: "계절",
    productName: "초등학생 자동우산",
    targetGrade: "초3~4",
    topicTags: ["장마", "비오는날", "등하교", "준비물"],
    seasonTags: ["여름", "장마"],
    score: 97,
    reason:
      "장마철 등하교에 꼭 필요한 준비물이며 초3~4학년 아이가 직접 사용하기 쉬운 제품군입니다.",
    forbiddenFor: ["유아용 소형우산"],
  },
  {
    id: "RAIN-002",
    category: "계절",
    productName: "방수 책가방 커버",
    targetGrade: "초3~4",
    topicTags: ["장마", "준비물", "학교생활", "책가방"],
    seasonTags: ["여름", "장마"],
    score: 95,
    reason:
      "비 오는 날 교과서와 준비물을 보호해 부모들이 장마철에 실제로 많이 찾는 실용 제품입니다.",
    forbiddenFor: [],
  },
  {
    id: "RAIN-003",
    category: "계절",
    productName: "초등학생 미끄럼방지 장화",
    targetGrade: "초3~4",
    topicTags: ["장마", "등하교", "안전", "준비물"],
    seasonTags: ["여름", "장마"],
    score: 93,
    reason:
      "빗길 등하교 안전과 직접 연결되며 장마철 준비물 콘텐츠에 적합합니다.",
    forbiddenFor: ["유아 캐릭터 장화"],
  },
  {
    id: "LEARN-001",
    category: "학습",
    productName: "초등 스터디플래너",
    targetGrade: "초3~4",
    topicTags: ["자기주도학습", "공부습관", "루틴", "계획표"],
    seasonTags: ["상시", "새학기", "방학"],
    score: 98,
    reason:
      "초3~4학년은 스스로 계획하는 습관을 시작하기 좋은 시기라 자기주도학습 콘텐츠와 가장 잘 맞습니다.",
    forbiddenFor: ["유아학습장"],
  },
  {
    id: "LEARN-002",
    category: "학습",
    productName: "학습 타이머",
    targetGrade: "초3~4",
    topicTags: ["자기주도학습", "집중력", "공부습관", "루틴"],
    seasonTags: ["상시", "방학"],
    score: 96,
    reason:
      "짧은 집중 시간을 눈으로 확인할 수 있어 공부 루틴 만들기에 실질적으로 도움이 됩니다.",
    forbiddenFor: [],
  },
  {
    id: "LEARN-003",
    category: "학습",
    productName: "초등 독서대",
    targetGrade: "초3~4",
    topicTags: ["독서", "자기주도학습", "자세", "공부환경"],
    seasonTags: ["상시"],
    score: 92,
    reason:
      "책 읽기와 문제집 풀이 자세를 돕는 제품으로 학습 환경 개선 글에 자연스럽게 연결됩니다.",
    forbiddenFor: [],
  },
  {
    id: "EMO-001",
    category: "정서",
    productName: "초등 감정일기장",
    targetGrade: "초3~4",
    topicTags: ["감정표현", "친구관계", "자존감", "마음습관"],
    seasonTags: ["상시"],
    score: 95,
    reason:
      "초3~4학년은 친구관계와 감정 표현이 중요해지는 시기라 정서교육 콘텐츠와 잘 맞습니다.",
    forbiddenFor: ["유아 그림일기"],
  },
  {
    id: "ECON-001",
    category: "경제교육",
    productName: "어린이 용돈기입장",
    targetGrade: "초3~4",
    topicTags: ["용돈교육", "경제교육", "습관", "돈관리"],
    seasonTags: ["상시", "새학기"],
    score: 96,
    reason:
      "초3~4학년부터 용돈을 기록하고 계획하는 습관을 들이기 좋아 경제교육 콘텐츠에 적합합니다.",
    forbiddenFor: [],
  },
];

export function getRecommendedProducts(topic: string, season = "상시") {
  const normalizedTopic = topic.replace(/\s/g, "");

  return productCandidates
    .filter((product) => {
      const topicMatch = product.topicTags.some((tag) =>
        normalizedTopic.includes(tag.replace(/\s/g, ""))
      );

      const seasonMatch =
        product.seasonTags.includes("상시") || product.seasonTags.includes(season);

      return topicMatch && seasonMatch && product.score >= 90;
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}
