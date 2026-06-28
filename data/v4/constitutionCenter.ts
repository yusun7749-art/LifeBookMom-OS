export const constitutionCenterMeta = {
  version: "CONSTITUTION_CENTER_v2.1.0",
  project: "Project021-04",
  title: "Constitution Center",
  subtitle: "LOCK 자산과 운영 원칙을 한 화면에서 확인합니다.",
  branch: "project021-stabilize",
  baseline: "d11456b Project020 Baseline",
};

export const lockedPrinciples = [
  {
    title: "GitHub 기준 저장소",
    status: "LOCKED",
    detail: "GitHub main과 project 브랜치를 기준으로만 개발합니다.",
  },
  {
    title: "VS Code는 실행 확인 작업실",
    status: "LOCKED",
    detail: "VS Code는 실행·화면 확인용이며 기준 저장소가 아닙니다.",
  },
  {
    title: "완료는 화면 확인 후",
    status: "LOCKED",
    detail: "DONE은 실제 화면 확인 후에만 기록합니다.",
  },
  {
    title: "삭제 대신 ARCHIVED",
    status: "LOCKED",
    detail: "이전 규칙과 문서는 삭제하지 않고 ARCHIVED로 보관합니다.",
  },
];

export const lockedAssets = [
  {
    group: "Brand",
    items: [
      "생활백서맘 브랜드",
      "리니 Character Bible",
      "Brand Bible",
      "Image Bible",
      "공식 월계관 워터마크",
    ],
  },
  {
    group: "Content",
    items: [
      "네이버 V4 출력 구조",
      "Google 출력 구조 분리",
      "쿠팡 고지문 한 줄",
      "추천상품 점수 비출력",
    ],
  },
  {
    group: "Operation",
    items: [
      "OS_MANIFEST",
      "Decision Log",
      "Version Manager",
      "Asset Registry",
      "Recovery",
    ],
  },
];

export const forbiddenChanges = [
  "LOCK 자산을 대표 승인 없이 변경",
  "네이버와 Google 규칙 혼합",
  "번호·Markdown·별점·점수 출력 복귀",
  "GitHub 기준 없이 임시 ZIP 생성",
  "완료 확인 없이 DONE 기록",
];

export const constitutionChecklist = [
  "변경하려는 항목이 LOCK 자산인지 확인",
  "DecisionLog 기록 필요 여부 확인",
  "VersionManager 갱신 필요 여부 확인",
  "Recovery Point 필요 여부 확인",
  "화면 확인 후 DONE 처리",
];
