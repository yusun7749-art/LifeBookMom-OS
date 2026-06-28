import { checkStyleGuard } from "./styleGuard";
import { contentStudioRules } from "./contentStudioRules";

export const outputGate = {
  project: "Project024.1",
  gates: [
    "Constitution",
    "Brand",
    "Style",
    "Title",
    "SEO",
    "Readability",
    "Mobile Spacing",
    "AI Tone",
    "Product",
    "Coupang Disclosure",
  ],
};

export function validateNaverOutputGate(text: string) {
  const failures: string[] = [];

  for (const forbidden of contentStudioRules.forbidden) {
    if (forbidden.trim() && text.includes(forbidden)) {
      failures.push(`금지 문구 포함: ${forbidden}`);
    }
  }

  const style = checkStyleGuard(text);
  failures.push(...style.failures);

  if (!text.includes(contentStudioRules.coupangDisclosure)) {
    failures.push("쿠팡 고지문 누락");
  }

  const hashtags = text.match(/#[^\s#]+/g) ?? [];
  if (hashtags.length < 30) {
    failures.push(`해시태그 부족: ${hashtags.length}개`);
  }

  return {
    pass: failures.length === 0,
    failures,
  };
}

export function buildOutputGatePrompt() {
  return `
[Output Gate LOCK]
출력 전 다음 검사를 반드시 통과해야 한다.
- 헌법 검사
- 브랜드 검사
- 문체 검사
- 제목 검사
- SEO 검사
- 가독성 검사
- 모바일 여백 검사
- AI 문체 검사
- 추천상품 검사
- 쿠팡 고지문 검사

하나라도 FAIL이면 출력하지 않는다.
`;
}
