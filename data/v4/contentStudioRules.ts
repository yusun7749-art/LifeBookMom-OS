export const contentStudioRules = {
  project: "Project024-01",
  title: "Content Studio Output Fix",
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
    "이어서 생성할까요"
  ],
  coupangDisclosure:
    "이 포스팅은 쿠팡파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받을 수 있습니다.",
};

export function buildNaverOutputGuard() {
  return `
[Project024-01 · Content Studio Output Guard]
네이버 원클릭은 아래 순서로만 출력한다.
${contentStudioRules.naverOutputOrder.map((item) => `- ${item}`).join("\n")}

[금지 출력]
${contentStudioRules.forbidden.map((item) => `- ${item}`).join("\n")}

[추천 아이템]
- 별점과 점수는 내부 평가에서만 사용한다.
- 네이버 원고에는 ★★★★★, 98점, 97점, 96점 같은 점수를 출력하지 않는다.
- 실제 판매 상품명, 추천 이유, 👉 [쿠팡파트너스 링크]만 출력한다.

[쿠팡 고지문]
마지막 줄에 아래 문장만 한 줄로 출력한다.
${contentStudioRules.coupangDisclosure}
`;
}
