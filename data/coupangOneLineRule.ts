// Project020
// Coupang One Line Rule
// 쿠팡 고지문은 이 파일의 문장만 사용합니다.

export const COUPANG_DISCLOSURE = "이 포스팅은 쿠팡파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받을 수 있습니다.";

export const coupangOneLineRule = {
  version: "PROJECT020_COUPANG_ONE_LINE",
  active: [
    "쿠팡 고지문은 마지막 줄에만 출력한다.",
    "고지문은 반드시 한 줄로 출력한다.",
    "줄바꿈을 넣지 않는다.",
    "추가 설명 문장을 넣지 않는다.",
    "쿠팡 URL을 출력하지 않는다.",
    "파트너스 ID를 출력하지 않는다.",
    "본문 전체는 15pt 기준이고, 쿠팡 고지문만 11pt 기준이다.",
  ],
};
