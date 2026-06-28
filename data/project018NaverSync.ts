// Project020 Patch03
// Project018 compatibility bridge.
// 기존 Project018 참조는 모두 Naver Engine V4로 연결합니다.

import {
  NAVER_V4_VERSION,
  NAVER_V4_COUPANG_DISCLOSURE,
  NAVER_V4_FORBIDDEN_OUTPUT,
  NAVER_V4_STRUCTURE,
  buildNaverV4Prompt,
  buildNaverV4RulesText,
} from "./naverEngineV4";

export {
  NAVER_V4_VERSION,
  NAVER_V4_COUPANG_DISCLOSURE,
  NAVER_V4_FORBIDDEN_OUTPUT,
  NAVER_V4_STRUCTURE,
  buildNaverV4Prompt,
  buildNaverV4RulesText,
};

export function buildProject018NaverRulesText() {
  return buildNaverV4RulesText();
}

export const project018NaverSyncVersion = NAVER_V4_VERSION;
export const project018NaverRulesText = buildProject018NaverRulesText();
