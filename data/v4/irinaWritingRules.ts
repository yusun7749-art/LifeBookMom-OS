export const irinaWritingRules = {
  project: "Project028.1",
  title: "이리나 자동 글쓰기 연결",
  locked: true,
  naver: {
    title: "네이버 작성",
    output: [
      "제목 1개",
      "공감 도입",
      "본문",
      "부모 체크리스트",
      "이미지 삽입 위치",
      "생활백서맘 추천 아이템",
      "마무리",
      "자주 묻는 질문 5개",
      "해시태그 30개 한 줄",
      "쿠팡파트너스 고지문 한 줄",
    ],
    rules: [
      "바로 복붙 가능한 네이버 원고만 작성한다.",
      "네이버용 글에는 Google 제목/본문을 포함하지 않는다.",
      "생활백서맘 엄마 말투로 쓴다.",
      "AI 설명체, 공공기관 말투, 강의체를 금지한다.",
      "별점·점수는 출력하지 않는다.",
      "쿠팡 고지문은 마지막 한 줄에만 넣는다.",
    ],
  },
  google: {
    title: "Google 작성",
    output: [
      "Google SEO 제목",
      "검색 의도 요약",
      "구조화 본문",
      "소제목",
      "체크리스트",
      "FAQ",
      "내부 링크 추천",
      "요약 문단",
    ],
    rules: [
      "바로 복붙 가능한 Google용 글만 작성한다.",
      "Google 글은 네이버 글과 제목과 본문을 다르게 쓴다.",
      "검색 의도와 구조를 우선한다.",
      "네이버 감성 도입을 그대로 반복하지 않는다.",
      "SEO 정보성과 명확성을 우선한다.",
    ],
  },
  image: {
    title: "이미지 제작",
    output: ["세로형 10컷 이미지 프롬프트"],
    rules: [
      "리니는 초등학교 3학년 여자아이 느낌",
      "밝은 크림톤 수채화",
      "세로형 10컷",
      "공식 생활백서맘 월계관 워터마크",
      "우측 하단 내부 배치",
    ],
  },
  fixed: [
    "브랜드명: 생활백서맘",
    "공식 캐릭터: 리니",
    "네이버와 Google은 항상 분리",
    "중복 주제 추천 금지",
    "연관 주제는 가능하되 말만 바꾼 중복은 금지",
    "SEO S/A 등급 우선 추천",
    "제목/본문/FAQ/추천상품/해시태그/쿠팡고지문 규칙 준수",
  ],
};

export function getModeLabel(mode: string) {
  if (mode === "google") return "Google 작성";
  if (mode === "image") return "이미지 제작";
  return "네이버 작성";
}

export function getModeRules(mode: string) {
  if (mode === "google") return irinaWritingRules.google;
  if (mode === "image") return irinaWritingRules.image;
  return irinaWritingRules.naver;
}

export function buildIrinaPrompt(topic: string, mode: string) {
  const current = getModeRules(mode);
  const output = "output" in current ? current.output : ["이미지 프롬프트"];

  return `너는 생활백서맘 운영본부의 항해사 이리나다.

아래 내용을 절대 설명하지 말고, 바로 결과물만 작성한다.

[작업]
주제: ${topic}
작성 모드: ${getModeLabel(mode)}

[절대 변경 금지 규칙]
${irinaWritingRules.fixed.map((rule) => `- ${rule}`).join("\n")}

[출력 순서]
${output.map((item) => `- ${item}`).join("\n")}

[이번 모드 규칙]
${current.rules.map((rule) => `- ${rule}`).join("\n")}

[중요]
- "알겠습니다", "작성하겠습니다", "아래와 같이" 같은 안내 문구를 쓰지 않는다.
- 시스템 설명, 선택지, 개발 설명을 출력하지 않는다.
- 지금 바로 ${getModeLabel(mode)} 결과물을 완성한다.`;
}
