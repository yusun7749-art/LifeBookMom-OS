import { contentStudioRules } from "./contentStudioRules";

export const contentStudioQA = {
  project: "Project024-02",
  title: "Content Studio QA",
  branch: "project023-os-core",
  checks: [
    "제목 1개만 출력",
    "번호 1~10 미출력",
    "Markdown #, ## 미출력",
    "추천상품 별점/점수 미출력",
    "FAQ 5개 출력",
    "해시태그 30개 한 줄 출력",
    "쿠팡 고지문 마지막 한 줄 출력",
    "Canvas/DOCX/PDF/응답 길이 안내 미출력"
  ],
};

export function validateNaverOutput(text: string) {
  const failures: string[] = [];

  for (const forbidden of contentStudioRules.forbidden) {
    if (forbidden.trim() && text.includes(forbidden)) {
      failures.push(`금지 문구 포함: ${forbidden}`);
    }
  }

  if (!text.includes(contentStudioRules.coupangDisclosure)) {
    failures.push("쿠팡 고지문 누락");
  }

  const hashtagCount = (text.match(/#[^\s#]+/g) ?? []).length;
  if (hashtagCount < 30) {
    failures.push(`해시태그 부족: ${hashtagCount}개`);
  }

  return {
    ok: failures.length === 0,
    failures,
  };
}
