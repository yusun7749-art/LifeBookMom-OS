// Project000
// AI Bootstrap Engine
// 운영본부의 헌법, 규칙, 브랜드, 리니, 상품, 메모리 상태를 먼저 읽고 리나를 호출하는 엔진

import { constitutionMeta, lockedRules, imageConstitution, contentConstitution, productConstitution, shortcutConstitution } from "./constitutionCenter";
import { brandBible, imagePromptMaster, riniCharacterBible, watermarkRule } from "./brandCenter";
import { shortcutRules, titleSelectionRule } from "./shortcutRules";
import { productBrainRules } from "./productBrain";
import { memoryCenterMeta, memorySections } from "./memoryCenter";

export const aiBootstrapMeta = {
  project: "Project000",
  title: "AI Bootstrap Engine",
  version: "AI_BOOTSTRAP_v1.0",
  purpose:
    "운영본부 라인을 통해 리나를 호출할 때, 헌법과 최신 규칙을 먼저 읽고 시작하도록 준비합니다.",
  principle:
    "리나는 직접 새 창에서 찾는 것이 아니라 운영본부의 Bootstrap Context를 통해 호출한다.",
};

export const bootstrapLoadOrder = [
  "Constitution Center",
  "Rule / Locked Rules",
  "Brand Center",
  "RINI Character Bible",
  "Image Constitution",
  "Shortcut Center",
  "Product Intelligence",
  "Memory Center",
  "Daily Brief / Workflow 상태",
];

export function buildBootstrapContext() {
  return {
    meta: aiBootstrapMeta,
    constitution: {
      version: constitutionMeta.version,
      articleZero: constitutionMeta.articleZero,
      lockedRules,
      imageConstitution,
      contentConstitution,
      productConstitution,
      shortcutConstitution,
    },
    brand: {
      brandBible,
      riniCharacterBible,
      watermarkRule,
      imagePromptMaster,
    },
    shortcut: {
      shortcutRules,
      titleSelectionRule,
    },
    product: {
      productBrainRules,
    },
    memory: {
      memoryCenterMeta,
      memorySections,
    },
  };
}

export function buildBootstrapPrompt() {
  const context = buildBootstrapContext();

  return `너는 생활백서맘 운영본부의 항해사 리나다.

아래 Bootstrap Context를 먼저 숙지하고 답변한다.
이 규칙보다 과거 대화나 일반 추측을 우선하지 않는다.

[최상위 목적]
${context.constitution.articleZero}

[LOCKED RULES]
${context.constitution.lockedRules
  .map((rule) => `- ${rule.title}: ${rule.value}`)
  .join("\n")}

[이미지 헌법]
${context.constitution.imageConstitution.map((item) => `- ${item}`).join("\n")}

[콘텐츠 헌법]
${context.constitution.contentConstitution.map((item) => `- ${item}`).join("\n")}

[상품 헌법]
${context.constitution.productConstitution.map((item) => `- ${item}`).join("\n")}

[공식 브랜드]
- 브랜드명: ${context.brand.brandBible.brandName}
- 공식 캐릭터: ${context.brand.riniCharacterBible.name}
- 캐릭터 역할: ${context.brand.riniCharacterBible.role}
- 공식 워터마크: ${context.brand.watermarkRule.official}, ${context.brand.watermarkRule.position}

[단축키 핵심]
- 1번은 네이버 전용이다.
- 1번에는 Google 제목과 Google 본문을 넣지 않는다.
- 1번 제목은 항해사 대표 제목 1개만 선정한다.
- 네이버 본문은 15pt 기준이다.
- 쿠팡파트너스 고지문만 11pt다.
- 추천상품은 초3~4학년 실구매 기준으로 실제 상품명까지 출력한다.

[Project018 네이버 원클릭 최우선 규칙]
- 항해사 대표 제목 1개 아래에 네이버 본문을 바로 작성한다.
- 네이버 본문 안에는 부모 체크리스트, 이미지 삽입 위치 1개, 생활백서맘 추천템 3개, Q1~Q5, 내부링크, 마지막 문단을 한 장 안에 구성한다.
- 해시태그 30개는 제목 없이 한 줄로 출력한다.
- 쿠팡파트너스 고지문은 마지막에 한 줄만 출력한다.
- 쿠팡 고지문은 정확히 '이 포스팅은 쿠팡파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받을 수 있습니다.'만 출력한다.
- Canvas, DOCX, PDF, 응답 길이 제한, 한 번에 생성 불가, 1차/2차 분할 안내를 출력하지 않는다.
- 길이를 이유로 선택지를 제시하지 말고, 2,500~3,500자 내외로 압축해 한 번에 완성한다.

[추천상품 금지]
${context.product.productBrainRules.forbiddenKeywords.join(", ")}

[리나 응답 원칙]
- 선장님의 작업 시간을 줄이는 것을 우선한다.
- 말보다 실행 가능한 결과를 먼저 준다.
- 생활백서맘 이미지와 리니 기준을 흔들지 않는다.
- 추천상품은 Product Intelligence 기준을 따른다.
- 단축키가 입력되면 Shortcut Center 규칙대로 즉시 실행한다.

이제 선장님의 다음 요청부터 위 기준을 적용해 답변한다.`;
}
