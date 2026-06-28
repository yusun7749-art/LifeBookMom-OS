// Project000
// Constitution Center
// 생활백서맘 OS 최상위 헌법 센터

export const constitutionMeta = {
  project: "Project000",
  title: "Constitution Center",
  version: "CONSTITUTION_v1.0",
  purpose:
    "생활백서맘 OS의 모든 기능이 가장 먼저 따라야 하는 최상위 기준입니다.",
  articleZero:
    "생활백서맘 OS의 목적은 프로그램을 만드는 것이 아니라, 선장님의 작업 시간을 줄이고 콘텐츠 생산성과 브랜드 자산을 지속적으로 키우는 것이다.",
};

export const constitutionHierarchy = [
  "Constitution Center",
  "Rule Center",
  "Brand Center",
  "Character Bible",
  "Product Intelligence",
  "Shortcut Center",
  "Memory Center",
  "Daily Brief",
  "Workflow Engine",
];

export const lockedRules = [
  {
    id: "LOCK-001",
    title: "브랜드명",
    value: "생활백서맘",
    level: "LOCKED",
    reason: "브랜드 정체성 최상위 기준",
  },
  {
    id: "LOCK-002",
    title: "공식 캐릭터",
    value: "리니",
    level: "LOCKED",
    reason: "생활백서맘 대표 캐릭터 IP",
  },
  {
    id: "LOCK-003",
    title: "이미지 기준",
    value: "리니 Character Bible + 밝은 크림톤 수채화 + 세로형 10컷",
    level: "LOCKED",
    reason: "향후 그림책, 만화, 카드북으로 확장될 브랜드 자산",
  },
  {
    id: "LOCK-004",
    title: "워터마크",
    value: "공식 월계관 + 생활백서맘 + 하트 / 투명 배경 / 우측 하단 내부",
    level: "LOCKED",
    reason: "브랜드 보호 및 불펌 방지",
  },
  {
    id: "LOCK-005",
    title: "단축키 1 제목 규칙",
    value: "SEO 제목 3개 폐기, 항해사 대표 제목 1개만 선정",
    level: "LOCKED",
    reason: "선장님이 다시 고르는 시간을 없애기 위함",
  },
  {
    id: "LOCK-006",
    title: "단축키 1 Google 제외",
    value: "네이버용 글 작성에는 Google 제목/본문을 포함하지 않는다",
    level: "LOCKED",
    reason: "네이버와 Google 작업 분리",
  },
  {
    id: "LOCK-007",
    title: "본문 글자 크기",
    value: "네이버 본문은 15pt 기준, 쿠팡파트너스 고지문만 11pt",
    level: "LOCKED",
    reason: "이전 결정사항 반영",
  },
  {
    id: "LOCK-008",
    title: "추천상품",
    value: "초3~4학년 부모 실구매 기준, 실제 상품명까지 추천",
    level: "LOCKED",
    reason: "카테고리명이 아니라 바로 링크를 넣을 수 있는 상품명 필요",
  },
];

export const imageConstitution = [
  "모든 이미지는 생활백서맘 BIS를 따른다.",
  "공식 캐릭터는 리니 1명이다.",
  "리니의 얼굴, 눈, 피부톤, 비율은 임의 변경하지 않는다.",
  "밝고 생기 있는 피부톤과 따뜻한 크림톤 배경을 유지한다.",
  "짝눈, 사시, 흐린 눈, 졸린 눈을 금지한다.",
  "헤어스타일과 의상은 주제에 맞게만 변경한다.",
  "공식 월계관 생활백서맘 워터마크만 사용한다.",
  "세로형 10컷 카드형 인포그래픽을 기본으로 한다.",
  "모든 이미지는 향후 그림책, 교육만화, 캐릭터북, 굿즈로 확장될 브랜드 자산이다.",
];

export const contentConstitution = [
  "단축키 1은 네이버 전용이다.",
  "단축키 1은 항해사 대표 제목 1개만 출력한다.",
  "단축키 1에는 Google 제목과 Google 본문을 넣지 않는다.",
  "네이버 본문은 15pt 기준이다.",
  "쿠팡파트너스 고지문만 11pt로 안내한다.",
  "FAQ는 5개를 기본으로 한다.",
  "해시태그는 30개를 기본으로 한다.",
  "내부 링크 추천과 이미지 삽입 위치를 포함한다.",
  "이미지 삽입 위치는 부모 체크리스트 바로 아래 1개만 출력한다.",
  "해시태그는 제목 없이 한 줄로 출력한다.",
  "쿠팡 고지문은 마지막 한 줄만 출력한다.",
  "Canvas, DOCX, PDF, 응답 길이 제한 안내를 출력하지 않는다.",
];

export const productConstitution = [
  "추천상품은 초등학교 3~4학년 기준이다.",
  "미취학·유아 전용 상품은 추천하지 않는다.",
  "핑크퐁, 뽀로로, 타요, 아기상어, 코코멜론 계열은 기본 추천에서 제외한다.",
  "상품은 카테고리명이 아니라 실제 상품명까지 출력한다.",
  "부모 실구매 가능성, 평점, 리뷰, 브랜드 신뢰도, 주제 적합성을 함께 본다.",
  "Product Intelligence 기준을 통과한 상품만 추천한다.",
];

export const shortcutConstitution = {
  shortcut1: [
    "🏆 항해사 대표 제목 1개",
    "선정 이유",
    "네이버 본문 15pt 기준",
    "부모 체크리스트",
    "이미지 삽입 위치 1개",
    "Product Intelligence 기반 실제 상품명 추천 3개",
    "각 상품 추천 이유",
    "👉 쿠팡파트너스 링크 위치",
    "Q1~Q5",
    "내부 링크 추천",
    "마지막 문단",
    "해시태그 30개 한 줄",
    "쿠팡파트너스 고지문 한 줄만 11pt",
  ],
  shortcut2: [
    "Google SEO 제목",
    "Google SEO 본문",
    "H2/H3 구조",
    "메타 설명",
    "FAQ",
    "내부 링크 추천",
    "Product Intelligence 추천상품",
    "해시태그",
    "쿠팡 고지문",
  ],
  shortcut3: [
    "리니 Character Bible 적용",
    "생활백서맘 BIS 적용",
    "공식 워터마크 적용",
    "세로형 10컷",
    "쿠팡 상품 이미지는 넣지 않음",
  ],
  shortcut4: [
    "발행 완료 기록",
    "운영 로그 업데이트",
    "오늘 발행 수 증가",
    "대표글 여부 평가",
    "SEO 점수",
    "진행률 업데이트",
  ],
};

export const amendmentHistory = [
  {
    date: "2026-06-28",
    title: "Constitution v1.0 제정",
    changes: [
      "이미지 헌법을 최상위 규칙에 포함",
      "단축키 1에서 Google 제목 제거",
      "네이버 본문 11pt 규칙 폐기",
      "쿠팡 고지문만 11pt로 확정",
      "추천상품은 실제 상품명까지 출력하도록 확정",
      "초3~4학년 실구매 기준 Product Intelligence 적용",
    ],
  },
];
