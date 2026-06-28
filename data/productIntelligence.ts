// Project009-9
// Product Intelligence Engine
// 초3~4학년 기준 생활백서맘 상품 추천 고도화 엔진

export type ProductScore = {
  gradeFit: number;
  topicFit: number;
  seasonFit: number;
  schoolFit: number;
  parentNeed: number;
};

export type ProductIntelligenceItem = {
  id: string;
  category: string;
  name: string;
  grade: "초3~4";
  topics: string[];
  seasons: string[];
  schoolContexts: string[];
  score: ProductScore;
  reason: string;
  excludeKeywords: string[];
};

export const productIntelligenceMeta = {
  project: "Project009-9",
  title: "Product Intelligence Engine",
  version: "PRODUCT_INTELLIGENCE_v1.0",
  purpose:
    "글 주제, 학년, 계절, 학교생활 맥락을 함께 판단해 생활백서맘 기준에 맞는 추천상품을 자동 선별합니다.",
  defaultGrade: "초등학교 3~4학년",
  rule:
    "핑크퐁, 뽀로로, 타요, 아기상어 등 미취학·유아 전용 제품은 추천 후보에서 제외합니다.",
};

export const productIntelligenceItems: ProductIntelligenceItem[] = [
  {
    id: "PI-SAFE-001",
    category: "안전",
    name: "어린이 GPS 위치 알림 기기",
    grade: "초3~4",
    topics: ["유괴예방", "등하교", "혼자귀가", "학원길", "안전"],
    seasons: ["상시", "새학기"],
    schoolContexts: ["등하교", "학원 이동", "혼자 귀가"],
    score: { gradeFit: 100, topicFit: 100, seasonFit: 90, schoolFit: 100, parentNeed: 100 },
    reason:
      "초3~4학년은 혼자 이동이 늘어나는 시기라 부모가 실제로 필요성을 크게 느끼는 안전용품입니다.",
    excludeKeywords: ["유아전용", "미취학"],
  },
  {
    id: "PI-SAFE-002",
    category: "안전",
    name: "어린이 안심 호루라기",
    grade: "초3~4",
    topics: ["유괴예방", "낯선사람", "등하교", "안전"],
    seasons: ["상시"],
    schoolContexts: ["등하교", "외부활동"],
    score: { gradeFit: 96, topicFit: 98, seasonFit: 90, schoolFit: 95, parentNeed: 93 },
    reason:
      "아이 스스로 위급 상황에서 도움을 요청하는 연습과 연결하기 좋아 안전교육 글에 적합합니다.",
    excludeKeywords: ["유아 장난감"],
  },
  {
    id: "PI-SAFE-003",
    category: "안전",
    name: "초등학생 연락처 네임택",
    grade: "초3~4",
    topics: ["유괴예방", "분실", "등하교", "준비물"],
    seasons: ["상시", "새학기"],
    schoolContexts: ["책가방", "실내화가방", "현장체험학습"],
    score: { gradeFit: 95, topicFit: 90, seasonFit: 92, schoolFit: 98, parentNeed: 92 },
    reason:
      "책가방과 준비물에 부착하기 쉬워 학교생활 안전과 분실 예방에 모두 활용할 수 있습니다.",
    excludeKeywords: ["유아 캐릭터"],
  },
  {
    id: "PI-RAIN-001",
    category: "장마",
    name: "초등학생 튼튼한 자동우산",
    grade: "초3~4",
    topics: ["장마", "비오는날", "등하교", "준비물"],
    seasons: ["여름", "장마"],
    schoolContexts: ["등하교", "학교 준비물"],
    score: { gradeFit: 98, topicFit: 100, seasonFit: 100, schoolFit: 100, parentNeed: 97 },
    reason:
      "장마철 등하교에 바로 필요한 기본 준비물이며 초3~4학년 아이가 직접 사용하기 좋습니다.",
    excludeKeywords: ["유아용 우산"],
  },
  {
    id: "PI-RAIN-002",
    category: "장마",
    name: "방수 책가방 커버",
    grade: "초3~4",
    topics: ["장마", "비오는날", "책가방", "준비물"],
    seasons: ["여름", "장마"],
    schoolContexts: ["등하교", "교과서 보호"],
    score: { gradeFit: 97, topicFit: 98, seasonFit: 100, schoolFit: 98, parentNeed: 96 },
    reason:
      "비 오는 날 교과서와 준비물을 보호해 부모가 장마철에 실제로 필요성을 느끼는 제품입니다.",
    excludeKeywords: [],
  },
  {
    id: "PI-LEARN-001",
    category: "학습",
    name: "초등 스터디플래너",
    grade: "초3~4",
    topics: ["자기주도학습", "공부습관", "방학계획", "루틴"],
    seasons: ["상시", "새학기", "방학"],
    schoolContexts: ["숙제", "학습 루틴", "방학 계획"],
    score: { gradeFit: 100, topicFit: 100, seasonFit: 95, schoolFit: 96, parentNeed: 98 },
    reason:
      "초3~4학년은 스스로 계획하는 습관을 시작하기 좋은 시기라 학습 루틴 콘텐츠와 잘 맞습니다.",
    excludeKeywords: ["유아 학습장"],
  },
  {
    id: "PI-LEARN-002",
    category: "학습",
    name: "학습 타이머",
    grade: "초3~4",
    topics: ["자기주도학습", "집중력", "공부습관", "루틴"],
    seasons: ["상시", "방학"],
    schoolContexts: ["숙제", "집중 시간", "공부 루틴"],
    score: { gradeFit: 98, topicFit: 97, seasonFit: 95, schoolFit: 95, parentNeed: 95 },
    reason:
      "짧은 집중 시간을 눈으로 확인할 수 있어 집에서 공부 습관을 만들 때 도움이 됩니다.",
    excludeKeywords: [],
  },
  {
    id: "PI-EMO-001",
    category: "정서",
    name: "초등 감정일기장",
    grade: "초3~4",
    topics: ["친구관계", "거절", "감정표현", "자존감", "마음습관"],
    seasons: ["상시"],
    schoolContexts: ["친구관계", "학교생활", "가정 대화"],
    score: { gradeFit: 98, topicFit: 100, seasonFit: 90, schoolFit: 95, parentNeed: 96 },
    reason:
      "초3~4학년은 친구관계와 감정 표현이 중요해지는 시기라 부모 대화와 연결하기 좋습니다.",
    excludeKeywords: ["유아 그림일기"],
  },
  {
    id: "PI-EMO-002",
    category: "정서",
    name: "부모-아이 대화카드",
    grade: "초3~4",
    topics: ["친구관계", "거짓말", "감정조절", "자존감", "대화"],
    seasons: ["상시"],
    schoolContexts: ["가정 대화", "친구 문제", "정서 교육"],
    score: { gradeFit: 95, topicFit: 96, seasonFit: 90, schoolFit: 90, parentNeed: 95 },
    reason:
      "아이 마음을 자연스럽게 묻고 대화하기 좋아 정서·친구관계 글에 적합합니다.",
    excludeKeywords: ["유아용 카드"],
  },
  {
    id: "PI-ECON-001",
    category: "경제교육",
    name: "어린이 용돈기입장",
    grade: "초3~4",
    topics: ["용돈교육", "경제교육", "돈관리", "저축"],
    seasons: ["상시", "새학기"],
    schoolContexts: ["용돈", "저축", "소비습관"],
    score: { gradeFit: 100, topicFit: 100, seasonFit: 90, schoolFit: 92, parentNeed: 96 },
    reason:
      "초3~4학년은 용돈을 기록하고 계획하는 습관을 시작하기 좋은 시기입니다.",
    excludeKeywords: [],
  },
  {
    id: "PI-PLAY-001",
    category: "놀이",
    name: "초등 보드게임",
    grade: "초3~4",
    topics: ["집콕놀이", "주말놀이", "가족놀이", "친구초대"],
    seasons: ["상시", "방학", "장마", "겨울"],
    schoolContexts: ["가정놀이", "친구초대", "가족시간"],
    score: { gradeFit: 96, topicFit: 95, seasonFit: 96, schoolFit: 85, parentNeed: 92 },
    reason:
      "초3~4학년 아이들이 가족·친구와 함께 즐기기 좋아 집콕놀이 콘텐츠와 연결됩니다.",
    excludeKeywords: ["유아 보드게임"],
  },
];

export function totalScore(score: ProductScore) {
  return Math.round(
    score.gradeFit * 0.3 +
      score.topicFit * 0.25 +
      score.parentNeed * 0.2 +
      score.seasonFit * 0.15 +
      score.schoolFit * 0.1
  );
}

export function recommendProducts(topic: string, season: string) {
  const normalized = topic.replace(/\s/g, "");

  return productIntelligenceItems
    .map((item) => {
      const topicMatched = item.topics.some((tag) =>
        normalized.includes(tag.replace(/\s/g, ""))
      );

      const seasonMatched =
        item.seasons.includes("상시") || item.seasons.includes(season);

      const score = totalScore(item.score);

      return {
        ...item,
        finalScore: topicMatched && seasonMatched ? score : Math.max(score - 35, 0),
        topicMatched,
        seasonMatched,
      };
    })
    .filter((item) => item.finalScore >= 80)
    .sort((a, b) => b.finalScore - a.finalScore)
    .slice(0, 6);
}
