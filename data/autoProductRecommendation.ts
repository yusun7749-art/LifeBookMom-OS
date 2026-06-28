// Project009-10
// Auto Product Recommendation Engine
// Content Engine과 연결하기 위한 생활백서맘 자동 상품 추천 엔진

export type AutoProduct = {
  id: string;
  name: string;
  category: string;
  grade: "초3~4";
  topics: string[];
  seasons: string[];
  rating: "S+" | "S" | "A" | "B";
  score: number;
  reason: string;
  linkPlaceholder: string;
};

export const autoProductRules = {
  project: "Project009-10",
  title: "Auto Product Recommendation Engine",
  version: "AUTO_PRODUCT_v1.0",
  defaultGrade: "초등학교 3~4학년",
  principle:
    "글 주제를 분석해 생활백서맘 기준에 맞는 추천상품과 추천 이유를 자동 생성합니다.",
  forbidden: [
    "핑크퐁",
    "뽀로로",
    "타요",
    "아기상어",
    "코코멜론",
    "유아 전용",
    "미취학 전용",
    "영아·유아 장난감",
  ],
  outputFormat: [
    "생활백서맘 추천템",
    "상품명",
    "추천 이유",
    "👉 [쿠팡파트너스 링크 입력]",
  ],
};

export const autoProductCatalog: AutoProduct[] = [
  {
    id: "AUTO-SAFE-001",
    name: "어린이 GPS 위치 알림 기기",
    category: "안전",
    grade: "초3~4",
    topics: ["유괴예방", "등하교", "혼자귀가", "학원길", "안전"],
    seasons: ["상시", "새학기"],
    rating: "S+",
    score: 99,
    reason:
      "초3~4학년은 혼자 등하교하거나 학원 이동을 시작하는 경우가 많아 부모가 실제로 필요성을 크게 느끼는 안전용품입니다.",
    linkPlaceholder: "👉 [쿠팡파트너스 링크 입력]",
  },
  {
    id: "AUTO-SAFE-002",
    name: "어린이 안심 호루라기",
    category: "안전",
    grade: "초3~4",
    topics: ["유괴예방", "낯선사람", "등하교", "안전"],
    seasons: ["상시"],
    rating: "S",
    score: 96,
    reason:
      "위급 상황에서 아이가 즉시 도움을 요청하는 연습과 연결하기 좋아 안전교육 콘텐츠에 적합합니다.",
    linkPlaceholder: "👉 [쿠팡파트너스 링크 입력]",
  },
  {
    id: "AUTO-SAFE-003",
    name: "초등학생 연락처 네임택",
    category: "안전",
    grade: "초3~4",
    topics: ["유괴예방", "분실", "등하교", "준비물"],
    seasons: ["상시", "새학기"],
    rating: "A",
    score: 92,
    reason:
      "책가방이나 실내화가방에 부착하기 좋아 학교생활 안전과 분실 예방에 함께 활용할 수 있습니다.",
    linkPlaceholder: "👉 [쿠팡파트너스 링크 입력]",
  },
  {
    id: "AUTO-RAIN-001",
    name: "초등학생 튼튼한 자동우산",
    category: "계절",
    grade: "초3~4",
    topics: ["장마", "비오는날", "등하교", "준비물"],
    seasons: ["여름", "장마"],
    rating: "S+",
    score: 98,
    reason:
      "장마철 등하교에 바로 필요한 기본 준비물이며 초3~4학년 아이가 직접 사용하기 좋은 제품군입니다.",
    linkPlaceholder: "👉 [쿠팡파트너스 링크 입력]",
  },
  {
    id: "AUTO-RAIN-002",
    name: "방수 책가방 커버",
    category: "계절",
    grade: "초3~4",
    topics: ["장마", "비오는날", "책가방", "준비물"],
    seasons: ["여름", "장마"],
    rating: "S",
    score: 96,
    reason:
      "비 오는 날 교과서와 준비물을 보호해 부모들이 장마철에 실제로 많이 찾는 실용 제품입니다.",
    linkPlaceholder: "👉 [쿠팡파트너스 링크 입력]",
  },
  {
    id: "AUTO-LEARN-001",
    name: "초등 스터디플래너",
    category: "학습",
    grade: "초3~4",
    topics: ["자기주도학습", "공부습관", "루틴", "계획표", "방학계획"],
    seasons: ["상시", "새학기", "방학"],
    rating: "S+",
    score: 99,
    reason:
      "초3~4학년은 스스로 계획하는 습관을 시작하기 좋은 시기라 자기주도학습 콘텐츠와 가장 잘 맞습니다.",
    linkPlaceholder: "👉 [쿠팡파트너스 링크 입력]",
  },
  {
    id: "AUTO-LEARN-002",
    name: "학습 타이머",
    category: "학습",
    grade: "초3~4",
    topics: ["자기주도학습", "집중력", "공부습관", "루틴"],
    seasons: ["상시", "방학"],
    rating: "S",
    score: 96,
    reason:
      "짧은 집중 시간을 눈으로 확인할 수 있어 집에서 공부 루틴을 만들 때 실질적으로 도움이 됩니다.",
    linkPlaceholder: "👉 [쿠팡파트너스 링크 입력]",
  },
  {
    id: "AUTO-EMO-001",
    name: "초등 감정일기장",
    category: "정서",
    grade: "초3~4",
    topics: ["친구관계", "거절", "감정표현", "자존감", "마음습관", "거짓말"],
    seasons: ["상시"],
    rating: "S",
    score: 96,
    reason:
      "초3~4학년은 친구관계와 감정 표현이 중요해지는 시기라 부모와의 대화, 정서교육 글에 자연스럽게 연결됩니다.",
    linkPlaceholder: "👉 [쿠팡파트너스 링크 입력]",
  },
  {
    id: "AUTO-EMO-002",
    name: "부모-아이 대화카드",
    category: "정서",
    grade: "초3~4",
    topics: ["친구관계", "거짓말", "감정조절", "자존감", "대화"],
    seasons: ["상시"],
    rating: "A",
    score: 91,
    reason:
      "아이 마음을 자연스럽게 묻고 대화하기 좋아 친구관계, 거짓말, 감정조절 콘텐츠에 적합합니다.",
    linkPlaceholder: "👉 [쿠팡파트너스 링크 입력]",
  },
  {
    id: "AUTO-ECON-001",
    name: "어린이 용돈기입장",
    category: "경제교육",
    grade: "초3~4",
    topics: ["용돈교육", "경제교육", "돈관리", "저축"],
    seasons: ["상시", "새학기"],
    rating: "S",
    score: 97,
    reason:
      "초3~4학년부터 용돈을 기록하고 계획하는 습관을 시작하기 좋아 경제교육 콘텐츠와 잘 맞습니다.",
    linkPlaceholder: "👉 [쿠팡파트너스 링크 입력]",
  },
];

export function detectSeasonByMonth(month = new Date().getMonth() + 1) {
  if ([6, 7].includes(month)) return "장마";
  if ([7, 8].includes(month)) return "여름";
  if ([3, 9].includes(month)) return "새학기";
  if ([1, 2, 7, 8].includes(month)) return "방학";
  if ([11, 12, 1, 2].includes(month)) return "겨울";
  return "상시";
}

export function recommendAutoProducts(topic: string, season = detectSeasonByMonth()) {
  const normalized = topic.replace(/\s/g, "");

  return autoProductCatalog
    .map((product) => {
      const topicFit = product.topics.some((tag) =>
        normalized.includes(tag.replace(/\s/g, ""))
      );
      const seasonFit = product.seasons.includes("상시") || product.seasons.includes(season);

      let finalScore = product.score;
      if (!topicFit) finalScore -= 35;
      if (!seasonFit) finalScore -= 8;

      return { ...product, finalScore, topicFit, seasonFit };
    })
    .filter((product) => product.finalScore >= 80)
    .sort((a, b) => b.finalScore - a.finalScore)
    .slice(0, 4);
}

export function buildCoupangRecommendationBlock(topic: string, season?: string) {
  const products = recommendAutoProducts(topic, season);

  if (!products.length) {
    return "생활백서맘 기준을 통과한 추천상품이 없습니다.";
  }

  return `생활백서맘 추천템\n\n${products
    .map(
      (product, index) => `${index + 1}. ${product.name}\n${product.reason}\n${product.linkPlaceholder}`
    )
    .join("\n\n")}`;
}
