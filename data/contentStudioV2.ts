// Project018
// Content Studio v2 Prompt Builder
// 네이버는 Project018 Naver Content Engine V3 Sync 사용, Google은 Google 전용 엔진 유지

import { buildBootstrapPrompt } from "./aiBootstrap";
import { constitutionMeta } from "./constitutionCenter";
import {
  buildNaverContentEngineV3Prompt,
} from "./naverContentEngineV3";
import { googleConstitutionActive } from "./googleConstitutionActive";

export const contentStudioMeta = {
  project: "Project010",
  title: "Content Studio v2",
  version: "CONTENT_STUDIO_v2.7_PROJECT018_SYNC",
  purpose:
    "프로젝트 선택 후 네이버, Google, 이미지, 발행 완료까지 콘텐츠 제작센터 안에서 바로 실행합니다.",
  constitutionVersion: constitutionMeta.version,
};

export const studioStatus = [
  "Constitution",
  "Project018 Sync",
  "Naver Engine V3",
  "Google Active Rule",
  "Brand",
  "RINI",
  "Product Intelligence",
  "Coupang One Line",
  "Workflow",
];

export function buildNaverOneClickPrompt(project: any) {
  return buildNaverContentEngineV3Prompt(project, buildBootstrapPrompt());
}

export function buildGoogleOneClickPrompt(project: any) {
  return `${buildBootstrapPrompt()}

---

[Google Active Constitution]
${googleConstitutionActive.rules.map((v) => `- ${v}`).join("\n")}

[작업]
생활백서맘 단축키 2번 실행: Google용 글 작성

[프로젝트]
주제: ${project.topic}
카테고리: ${project.category}
Google 기존 제목: ${project.googleTitle}
현재 문제점: ${project.issue}
다음 작업: ${project.next}
쿠팡 파트너스 ID: AF1467107

[중요]
이 요청은 Google 전용입니다. 네이버 복붙형 출력 규칙을 적용하지 않습니다.

[출력 순서]
1. Google SEO 제목
2. 메타 설명
3. Google SEO 본문
4. H2/H3 구조
5. FAQ
6. Product Intelligence 기반 실제 제품명 추천
7. 내부 링크 추천
8. 해시태그 30개
9. 쿠팡파트너스 고지문
10. SEO 평가 리포트`;
}

export function buildImageOneClickPrompt(project: any) {
  return `${buildBootstrapPrompt()}

---

생활백서맘 단축키 3번을 실행해줘.

[작업]
이미지 생성 프롬프트 작성

[프로젝트]
주제: ${project.topic}
카테고리: ${project.category}
현재 문제점: ${project.issue}
다음 작업: ${project.next}

[이미지 헌법]
- 공식 캐릭터는 리니
- 초등학교 3학년 한국 여자아이
- 밝고 생기 있는 피부톤
- 큰 눈, 또렷한 눈동자, 좌우 대칭
- 짝눈, 사시, 흐린 눈, 졸린 눈 금지
- 밝은 크림톤 배경
- 따뜻한 파스텔 수채화 감성
- 세로형 10컷 교육 인포그래픽
- 주제에 맞는 헤어스타일과 의상만 변경 가능
- 얼굴, 눈, 피부톤, 비율은 변경 금지
- 공식 월계관 "생활백서맘" 도장
- 도장 배경 투명
- 이미지 내부 우측 하단 고정
- 쿠팡 상품 이미지 생성 금지
- 쿠팡 바로가기 버튼 이미지 생성 금지
- 상품 광고 이미지 금지

[출력]
바로 이미지 생성에 사용할 수 있는 프롬프트만 작성해줘.`;
}

export function markContentDone(project: any) {
  if (typeof window === "undefined") return;

  const completed = {
    at: new Date().toLocaleString("ko-KR"),
    topic: project.topic,
    category: project.category,
    status: "발행 완료",
    modules: ["네이버", "Google", "이미지", "추천상품", "해시태그"],
  };

  localStorage.setItem("lifebookmom_completed_content_run", JSON.stringify(completed));
  localStorage.setItem("lifebookmom_last_content_run", JSON.stringify(completed));
}
