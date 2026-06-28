// Project020 Patch03
// Naver Content Engine V3 compatibility bridge.
// 실제 네이버 원클릭 기준은 Naver Engine V4입니다.

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

export const naverContentEngineV3Version = NAVER_V4_VERSION;

export function buildNaverContentEngineV3Prompt(project: any, bootstrapPrompt = "") {
  return buildNaverV4Prompt(project, bootstrapPrompt);
}

export function buildNaverContentEngineV3RulesText() {
  return buildNaverV4RulesText();
}

export const naverContentEngineV3RulesText = buildNaverContentEngineV3RulesText();
