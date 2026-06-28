import { buildNaverOutputGuard, contentStudioRules } from "./v4/contentStudioRules";

export const NAVER_V4_VERSION = "NAVER_V4_PROJECT024_01";

export const NAVER_V4_COUPANG_DISCLOSURE = contentStudioRules.coupangDisclosure;

export function buildNaverV4Prompt(project: any, bootstrapPrompt = "") {
  const topic = project?.topic ?? "";
  const category = project?.category ?? "";
  const title = project?.naverTitle ?? project?.title ?? topic;
  const issue = project?.issue ?? "";
  const next = project?.next ?? "";

  return `${bootstrapPrompt}

${buildNaverOutputGuard()}

[프로젝트]
주제: ${topic}
카테고리: ${category}
기존 제목: ${title}
현재 문제점: ${issue}
다음 작업: ${next}

[말투]
- 옆집 엄마가 이야기하듯 작성한다.
- 같은 초등학생 학부모가 경험을 나누듯 작성한다.
- 공감 → 정보 → 실천 → 공감 흐름을 유지한다.
- AI 설명체, 공공기관 안내문, 전문가 강의체를 금지한다.
- 문장 끝은 ~해요, ~더라고요, ~좋겠어요, ~도움이 돼요 중심으로 자연스럽게 쓴다.

[최종 출력]
바로 복붙 가능한 네이버 원고만 출력한다.
설명, 선택지, 시스템 제한 안내를 출력하지 않는다.`;
}

export function buildNaverV4RulesText() {
  return buildNaverOutputGuard();
}
