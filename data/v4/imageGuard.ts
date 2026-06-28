export const imageGuard = {
  project: "Project024.1",
  watermark: {
    text: "생활백서맘",
    shape: "월계관",
    heart: "분홍 하트",
    position: "우측 하단 내부",
    background: "투명 배경처럼 자연스럽게 삽입",
    fixed: true,
  },
  character: {
    name: "리니",
    ageStyle: "초등학교 3학년 여자아이",
    style: "밝은 크림톤 수채화",
    layout: "세로형 10컷",
    fixed: true,
  },
  forbidden: [
    "새로운 서명 생성",
    "생활백서맘 외 다른 글자",
    "워터마크 위치 변경",
    "비율 변경",
    "다른 하트 사용",
    "다른 월계관 사용",
    "성인/청소년처럼 보이는 캐릭터",
  ],
};

export function buildImageGuardPrompt() {
  return `
[Image Guard LOCK]
- 공식 워터마크는 생활백서맘 월계관 + 분홍 하트만 사용한다.
- 워터마크는 이미지 내부 우측 하단에만 배치한다.
- 새 서명, 새 로고, 다른 폰트, 다른 하트, 다른 월계관을 만들지 않는다.
- 리니는 초등학교 3학년 여자아이 느낌을 유지한다.
- 밝은 크림톤 수채화, 세로형 10컷을 유지한다.
- 하나라도 어기면 이미지 생성 FAIL이다.
`;
}
