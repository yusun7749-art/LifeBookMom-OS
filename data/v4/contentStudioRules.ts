export const contentStudioRules = {
  project: "Project024.1",
  title: "Content Studio Rules",
  branch: "project023-os-core",
  naverOutputOrder: [
    "제목",
    "공감 도입",
    "본문",
    "부모 체크리스트",
    "이미지 삽입 위치",
    "생활백서맘 추천 아이템",
    "마무리",
    "자주 묻는 질문(FAQ)",
    "해시태그 30개 한 줄",
    "쿠팡파트너스 고지문 한 줄"
  ],
  forbidden: [
    "SEO 제목 추천",
    "항해사 대표 제목",
    "1.",
    "2.",
    "3.",
    "4.",
    "5.",
    "6.",
    "7.",
    "8.",
    "9.",
    "10.",
    "# ",
    "## ",
    "### ",
    "★★★★★",
    "98점",
    "97점",
    "96점",
    "Canvas",
    "DOCX",
    "PDF",
    "응답 길이 제한",
    "토큰 제한",
    "한 번에 생성하기에는",
    "계속 생성할까요",
    "이어서 생성할까요",
    "중요합니다",
    "도움이 됩니다",
    "자연스러운 과정입니다",
    "권장됩니다",
    "개인차가 있습니다"
  ],
  productRule:
    "브랜드명보다 해결책 카테고리를 우선한다. 최근 20개 글에서 사용한 상품 카테고리는 중복 추천하지 않는다.",
  coupangDisclosure:
    "이 포스팅은 쿠팡파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받을 수 있습니다.",
};

export function buildNaverOutputGuard() {
  return `
[Project024.1 · Content Studio Output Guard]
네이버 원클릭은 아래 순서로만 출력한다.
${contentStudioRules.naverOutputOrder.map((item) => `- ${item}`).join("\n")}

[금지 출력]
${contentStudioRules.forbidden.map((item) => `- ${item}`).join("\n")}

[문체]
- 설명하지 않고 이야기한다.
- 엄마가 먼저 공감한다.
- 정보는 이야기 안에 녹인다.
- 생활백서맘이 아니면 출력하지 않는다.

[추천 아이템]
- Product Intelligence V2를 사용한다.
- 브랜드명보다 해결책 카테고리를 우선한다.
- 최근 20개 글에서 반복된 상품은 제외한다.
- 네이버 원고에는 별점과 점수를 출력하지 않는다.
- 실제 상품명 고정 대신 "어린이 안전우산", "감정카드", "아쿠아슈즈"처럼 해결책형 카테고리로 출력할 수 있다.

[쿠팡 고지문]
마지막 줄에 아래 문장만 한 줄로 출력한다.
${contentStudioRules.coupangDisclosure}
`;
}
