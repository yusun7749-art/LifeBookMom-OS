export const styleGuard = {
  project: "Project024.1",
  requiredTone: [
    "엄마가 먼저 공감한다",
    "설명하지 않고 이야기한다",
    "정보는 이야기 안에 녹인다",
    "모바일에서 숨 쉬는 여백을 둔다",
    "생활백서맘이 되어 쓴다",
  ],
  forbiddenPhrases: [
    "중요합니다",
    "도움이 됩니다",
    "자연스러운 과정입니다",
    "권장됩니다",
    "개인차가 있습니다",
    "전문가들은",
    "일반적으로",
    "다음과 같습니다",
  ],
};

export function checkStyleGuard(text: string) {
  const failures = styleGuard.forbiddenPhrases.filter((phrase) => text.includes(phrase));
  return {
    ok: failures.length === 0,
    failures: failures.map((phrase) => `AI 설명체 감지: ${phrase}`),
  };
}
