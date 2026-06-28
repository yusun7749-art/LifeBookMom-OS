// Project009-11
// Enterprise Content Intelligence AI
// 주제 입력 시 카테고리, 학년 적합도, 계절, 상품, 이미지 방향, SEO 흐름을 자동 판단합니다.

export type ContentCategory =
  | "안전"
  | "건강"
  | "교육"
  | "정서"
  | "학교생활"
  | "계절"
  | "경제교육"
  | "놀이";

export type ContentIntelligenceResult = {
  topic: string;
  category: ContentCategory;
  gradeFit: number;
  season: string;
  naverSeoTitle: string;
  googleSeoTitle: string;
  imageDirection: string;
  productDirection: string;
  faqDirection: string;
  hashtagDirection: string;
  priorityScore: number;
};

export const contentIntelligenceMeta = {
  project: "Project009-11",
  title: "Enterprise Content Intelligence AI",
  version: "CONTENT_INTELLIGENCE_v1.0",
  purpose:
    "주제 하나를 입력하면 생활백서맘 기준에 맞춰 SEO, FAQ, 추천상품, 이미지 방향까지 자동 판단합니다.",
  defaultGrade: "초등학교 3~4학년",
  connectedEngines: [
    "Brand Center",
    "RINI Character Bible",
    "Content Engine",
    "Product Intelligence",
    "Workflow Bus",
    "Auto Product Recommendation",
  ],
};

export const contentRules = {
  required:
    "초등학교 3~4학년 부모가 실제로 궁금해하고, 생활백서맘 브랜드 기준에 맞는 주제만 우선 제작합니다.",
  forbidden:
    "유아 전용 주제, 미취학 전용 상품, 과장된 공포 마케팅, 근거 없는 건강 정보는 제외합니다.",
  output:
    "네이버 제목, 구글 제목, FAQ 방향, 추천상품 방향, 이미지 프롬프트 방향, 해시태그 방향을 함께 생성합니다.",
};

export function detectCategory(topic: string): ContentCategory {
  const t = topic.replace(/\s/g, "");

  if (["유괴", "안전", "낯선사람", "물놀이", "등하교", "학교폭력"].some((x) => t.includes(x))) {
    return "안전";
  }

  if (["시력", "수족구", "감기", "장염", "비만", "수면", "식습관", "건강"].some((x) => t.includes(x))) {
    return "건강";
  }

  if (["자기주도", "공부", "독서", "숙제", "학습", "문제집"].some((x) => t.includes(x))) {
    return "교육";
  }

  if (["친구", "거절", "거짓말", "감정", "자존감", "불안"].some((x) => t.includes(x))) {
    return "정서";
  }

  if (["장마", "여름", "겨울", "방학", "새학기"].some((x) => t.includes(x))) {
    return "계절";
  }

  if (["용돈", "저축", "경제", "돈"].some((x) => t.includes(x))) {
    return "경제교육";
  }

  if (["집콕", "놀이", "보드게임", "만들기"].some((x) => t.includes(x))) {
    return "놀이";
  }

  return "학교생활";
}

export function detectSeason(topic: string, month = new Date().getMonth() + 1) {
  const t = topic.replace(/\s/g, "");
  if (t.includes("장마") || t.includes("우산")) return "장마";
  if (t.includes("여름") || t.includes("물놀이")) return "여름";
  if (t.includes("새학기")) return "새학기";
  if (t.includes("방학")) return "방학";
  if (t.includes("겨울")) return "겨울";

  if ([6, 7].includes(month)) return "장마";
  if ([7, 8].includes(month)) return "여름";
  if ([3, 9].includes(month)) return "새학기";
  if ([1, 2, 7, 8].includes(month)) return "방학";
  if ([11, 12, 1, 2].includes(month)) return "겨울";
  return "상시";
}

export function gradeFitScore(topic: string) {
  const t = topic.replace(/\s/g, "");

  const strong = ["초등", "3학년", "4학년", "등하교", "친구", "자기주도", "용돈", "학교생활"];
  const weak = ["유아", "미취학", "영유아", "아기", "어린이집", "유치원"];

  if (weak.some((x) => t.includes(x))) return 35;
  if (strong.some((x) => t.includes(x))) return 98;
  return 88;
}

export function analyzeContentTopic(topic: string): ContentIntelligenceResult {
  const category = detectCategory(topic);
  const season = detectSeason(topic);
  const gradeFit = gradeFitScore(topic);

  const naverSeoTitle = `초등학생 ${topic}, 부모가 꼭 알아야 할 실천법`;
  const googleSeoTitle = `${topic}이 고민이라면? 초등 3~4학년 부모를 위한 현실 가이드`;

  const imageDirection =
    `리니 Character Bible 적용. ${category} 주제에 맞는 표정과 의상, 밝은 크림톤 수채화, 10컷 교육 인포그래픽.`;

  const productDirection =
    `${category}·${season}·초3~4학년 기준으로 Product Intelligence에서 90점 이상 상품만 추천.`;

  const faqDirection =
    `${topic}에 대해 부모가 실제로 묻는 질문 5개와 현실적인 답변 생성.`;

  const hashtagDirection =
    `네이버/구글용 해시태그 30개, 초등학생·부모·${category}·${season} 키워드 포함.`;

  const priorityScore = Math.round(
    gradeFit * 0.35 +
      (category === "안전" ? 97 : 90) * 0.25 +
      (season !== "상시" ? 96 : 88) * 0.15 +
      92 * 0.25
  );

  return {
    topic,
    category,
    gradeFit,
    season,
    naverSeoTitle,
    googleSeoTitle,
    imageDirection,
    productDirection,
    faqDirection,
    hashtagDirection,
    priorityScore,
  };
}

export function buildContentEnginePrompt(topic: string) {
  const result = analyzeContentTopic(topic);

  return `생활백서맘 콘텐츠 제작을 시작해줘.

[프로젝트]
주제: ${result.topic}
카테고리: ${result.category}
대상: 초등학교 3~4학년 부모
계절/상황: ${result.season}

[SEO 제목]
네이버 제목: ${result.naverSeoTitle}
Google 제목: ${result.googleSeoTitle}

[작성 범위]
- 네이버 SEO 본문
- Google SEO 본문
- FAQ
- 생활백서맘 추천상품
- 쿠팡파트너스 추천 이유
- 이미지 10컷 프롬프트
- 해시태그 30개
- 쿠팡파트너스 고지문

[브랜드 기준]
- 리니 Character Bible 적용
- Brand Center 기준 적용
- 밝은 크림톤 수채화
- 초3~4학년 기준
- 유아 전용 상품 추천 금지
- 핑크퐁, 뽀로로, 타요, 아기상어 추천 금지

[추천상품 방향]
${result.productDirection}

[이미지 방향]
${result.imageDirection}

[FAQ 방향]
${result.faqDirection}

[해시태그 방향]
${result.hashtagDirection}

[작성 원칙]
- 부모가 바로 이해할 수 있게
- 과장 금지
- 실제 생활에 도움 되는 내용
- 복사해서 바로 사용 가능하게 작성`;
}
