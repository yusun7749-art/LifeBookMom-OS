// Project020 Patch01
// Constitution Center
// 생활백서맘 OS 최상위 헌법 센터

export const constitutionMeta = {
  project: "Project000",
  title: "Constitution Center",
  version: "CONSTITUTION_v2.0_PROJECT020",
  purpose:
    "생활백서맘 OS의 모든 기능이 가장 먼저 따라야 하는 최상위 기준입니다.",
  articleZero:
    "생활백서맘 OS의 목적은 프로그램을 만드는 것이 아니라, 선장님의 작업 시간을 줄이고 콘텐츠 생산성과 브랜드 자산을 지속적으로 키우는 것이다.",
};

export const constitutionHierarchy = [
  "OS_MANIFEST",
  "Constitution Center",
  "Decision Log",
  "Version Manager",
  "Asset Registry",
  "Change Approval",
  "Recovery",
  "Rule Center",
  "Brand Center",
  "Character Bible",
  "Product Intelligence",
  "Shortcut Center",
  "Memory Center",
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
    title: "네이버 V4 출력 구조",
    value: "물놀이 글 형식 기준: 제목 → 공감 도입 → 본문 → 체크리스트 → 이미지 → 추천 아이템 → 마무리 → FAQ → 해시태그 → 쿠팡",
    level: "LOCKED",
    reason: "복붙 작업과 브랜드 문체 안정화",
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
    title: "추천상품 출력 규칙",
    value: "실제 상품명 + 추천 이유 + 쿠팡 링크만 출력, 별점/점수/순위 표시 금지",
    level: "LOCKED",
    reason: "네이버 원고의 자연스러움과 복붙 편의성 유지",
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
  "단축키 1에는 Google 제목과 Google 본문을 넣지 않는다.",
  "네이버 원클릭은 V4 구조만 사용한다.",
  "V4 구조는 선장님이 제공한 여름철 물놀이 안전수칙 글 형식을 기준으로 한다.",
  "네이버 본문은 15pt 기준이다.",
  "쿠팡파트너스 고지문만 11pt로 안내한다.",
  "번호 1~10을 출력하지 않는다.",
  "Markdown #, ##, ###을 출력하지 않는다.",
  "SEO 제목 추천, 항해사 대표 제목 같은 안내 문구를 출력하지 않는다.",
  "FAQ는 자주 묻는 질문(FAQ) 제목과 Q1~Q5를 기본으로 한다.",
  "해시태그는 30개를 제목 없이 한 줄로 출력한다.",
  "이미지 삽입 위치는 부모 체크리스트 바로 아래 1개만 출력한다.",
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
  "Product Intelligence 점수는 내부 평가에만 사용한다.",
  "네이버 원고에는 별점, 점수, 98점, 97점, 96점, 평가점수를 출력하지 않는다.",
  "추천상품은 실제 상품명 → 추천 이유 → 👉 [쿠팡파트너스 링크] 순서로 출력한다.",
];

export const shortcutConstitution = {
  shortcut1: [
    "제목 1개",
    "공감 도입",
    "네이버 본문 15pt 기준",
    "부모 체크리스트",
    "부모 체크리스트 바로 아래 이미지 삽입 위치 1개",
    "💛 생활백서맘 추천 아이템 3개 / 실제 상품명 / 추천 이유 / 👉 [쿠팡파트너스 링크]",
    "마무리",
    "자주 묻는 질문(FAQ) Q1~Q5",
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
    title: "Constitution v2.0 / Project020 운영본부 Freeze",
    changes: [
      "GitHub를 기준 저장소로 확정",
      "네이버 V4를 활성 출력 구조로 확정",
      "이전 네이버 V1~V3 규칙은 ARCHIVED 대상으로 지정",
      "추천상품 점수/별점은 내부에서만 사용하고 네이버 출력에서는 제거",
      "번호, Markdown, SEO 제목 추천 문구 출력 금지",
      "쿠팡 고지문 한 줄 고정",
    ],
  },
];
