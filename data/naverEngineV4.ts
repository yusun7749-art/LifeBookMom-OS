// Project020 Patch03
// Naver Engine V4 Migration
// 네이버 원클릭 최종 기준 엔진입니다.

export const NAVER_V4_VERSION = "NAVER_ENGINE_V4_PROJECT020_PATCH03";

export const NAVER_V4_COUPANG_DISCLOSURE =
  "이 포스팅은 쿠팡파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받을 수 있습니다.";

export const NAVER_V4_FORBIDDEN_OUTPUT = [
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
  "캔버스",
  "DOCX",
  "PDF",
  "응답 길이 제한",
  "토큰 제한",
  "한 번에 생성",
  "1차",
  "2차",
  "계속 생성할까요",
  "이어서 생성할까요",
];

export const NAVER_V4_STRUCTURE = [
  "제목",
  "공감 도입",
  "본문",
  "부모 체크리스트",
  "이미지 삽입 위치",
  "💛 생활백서맘 추천 아이템",
  "마무리",
  "자주 묻는 질문(FAQ)",
  "해시태그 한 줄",
  "쿠팡파트너스 고지문 한 줄",
];

export function buildNaverV4RulesText() {
  return `[Project020 · Naver Engine V4]
네이버 원클릭은 V4만 사용한다.
V2, V3, Project018 출력 규칙을 사용하지 않는다.
Google 제목, Google 본문, Google SEO 구조를 포함하지 않는다.

출력 순서:
${NAVER_V4_STRUCTURE.map((item) => `- ${item}`).join("\\n")}

금지:
${NAVER_V4_FORBIDDEN_OUTPUT.map((item) => `- ${item}`).join("\\n")}

추천 아이템:
- Product Intelligence 점수는 내부에서만 사용한다.
- 네이버 원고에는 별점과 점수를 출력하지 않는다.
- 실제 판매 상품명, 추천 이유, 👉 [쿠팡파트너스 링크]만 출력한다.

쿠팡 고지문:
${NAVER_V4_COUPANG_DISCLOSURE}`;
}

export function buildNaverV4Prompt(project: any, bootstrapPrompt = "") {
  const topic = project?.topic ?? "";
  const category = project?.category ?? "";
  const naverTitle = project?.naverTitle ?? project?.title ?? topic;
  const issue = project?.issue ?? "";
  const next = project?.next ?? "";

  return `${bootstrapPrompt}

[Naver Engine V4 · Project020 Patch03]
이 요청은 네이버 전용입니다.
Google 제목, Google 본문, Google SEO 구조를 절대 포함하지 마세요.

[프로젝트]
주제: ${topic}
카테고리: ${category}
기존 제목: ${naverTitle}
현재 문제점: ${issue}
다음 작업: ${next}

[최종 출력]
선장님이 드래그해서 그대로 복사해 네이버 블로그에 붙여넣을 수 있는 완성 원고만 출력하세요.
설명, 단계 번호, Markdown, 시스템 제한 안내를 출력하지 마세요.

[출력 구조]
아래 흐름만 지키세요. 단, 번호와 설명 문구는 출력하지 마세요.

제목

공감 도입

본문

부모 체크리스트

📷 이미지 삽입 위치
생활백서맘 세로형 10컷 인포그래픽

💛 생활백서맘 추천 아이템

✔ 실제 판매 상품명

추천 이유
옆집 엄마가 설명하듯 자연스럽게 작성하세요.

👉 [쿠팡파트너스 링크]

✔ 실제 판매 상품명

추천 이유

👉 [쿠팡파트너스 링크]

✔ 실제 판매 상품명

추천 이유

👉 [쿠팡파트너스 링크]

마무리

자주 묻는 질문(FAQ)

Q1.

답변

Q2.

답변

Q3.

답변

Q4.

답변

Q5.

답변

#해시태그 30개 한 줄

${NAVER_V4_COUPANG_DISCLOSURE}

[말투]
- 옆집 엄마가 이야기하듯 작성하세요.
- 같은 초등학생 학부모가 경험을 나누듯 작성하세요.
- 공감 → 정보 → 실천 → 공감 흐름을 유지하세요.
- AI 설명체, 공공기관 안내문, 전문가 강의체를 금지합니다.
- 선장님이 제시한 물놀이 안전수칙 글처럼 자연스럽고 읽기 편한 흐름을 사용하세요.

[추천 아이템]
- Product Intelligence 점수는 내부에서만 사용하세요.
- 네이버 원고에는 ★★★★★, 98점, 97점, 96점 같은 점수를 절대 출력하지 마세요.
- 추천 아이템은 본문 안에 그대로 출력하세요.
- 우측 카드나 별도 영역으로 빼지 마세요.
- 실제 판매 상품명만 출력하세요.
- 초등학교 3~4학년 부모 실구매 기준으로 추천하세요.

[금지]
${NAVER_V4_FORBIDDEN_OUTPUT.map((item) => `- ${item}`).join("\\n")}

[쿠팡 고지문]
마지막 줄에 아래 문장만 한 줄로 출력하세요.
${NAVER_V4_COUPANG_DISCLOSURE}

바로 원고만 출력하세요.`;
}
