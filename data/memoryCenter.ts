// Project009-14
// Enterprise Memory Center
// 생활백서맘 OS의 브랜드, 콘텐츠, 상품, 이미지, 프롬프트, 의사결정 기억 센터

export const memoryCenterMeta = {
  project: "Project009-14",
  title: "Enterprise Memory Center",
  version: "MEMORY_CENTER_v1.0",
  purpose:
    "생활백서맘의 모든 자산과 결정을 한 곳에서 확인하고, 새 채팅에서도 이어서 작업할 수 있게 합니다.",
  principle:
    "대화는 흘러가도, 결정과 자산은 Memory Center에 남는다.",
};

export const memorySections = [
  {
    id: "MEM-BRAND",
    title: "Brand Memory",
    icon: "🎨",
    status: "연결됨",
    description:
      "Brand Center, 리니 Character Bible, 워터마크, 이미지 스타일 기준을 기억합니다.",
    items: [
      "생활백서맘 Brand DNA v1.0",
      "RINI_MASTER_v1.0",
      "공식 워터마크 규칙",
      "Master Reference 10장",
    ],
  },
  {
    id: "MEM-CHARACTER",
    title: "Character Memory",
    icon: "👧",
    status: "진행중",
    description:
      "리니의 헤어, 의상, 표정, 포즈, 사용 이력을 자산으로 관리합니다.",
    items: [
      "긴 생머리",
      "한쪽 땋은머리",
      "양쪽 땋은머리",
      "잠옷 / 우비 / 멜빵바지 / 학교복",
    ],
  },
  {
    id: "MEM-PRODUCT",
    title: "Product Memory",
    icon: "🛒",
    status: "연결됨",
    description:
      "초3~4학년 기준 추천상품과 추천 이유, 사용 주제, 금지 상품 규칙을 기억합니다.",
    items: [
      "Living Product AI",
      "Product Intelligence",
      "Auto Product Recommendation",
      "유아용 상품 추천 금지 규칙",
    ],
  },
  {
    id: "MEM-CONTENT",
    title: "Content Memory",
    icon: "📝",
    status: "진행중",
    description:
      "작성한 글, 주제, 카테고리, 네이버/Google 제목, 발행 상태를 기억합니다.",
    items: [
      "수족구 등교 기준",
      "자기주도학습",
      "장마철 준비물",
      "유괴 예방",
    ],
  },
  {
    id: "MEM-PROMPT",
    title: "Prompt Memory",
    icon: "🧠",
    status: "연결됨",
    description:
      "생활백서맘 이미지 프롬프트, 콘텐츠 생성 프롬프트, 브랜드 규칙 프롬프트를 저장합니다.",
    items: [
      "Image Prompt Master",
      "Content Engine Prompt",
      "Brand Center Prompt",
      "Product Recommendation Prompt",
    ],
  },
  {
    id: "MEM-WORKFLOW",
    title: "Workflow Memory",
    icon: "⚙️",
    status: "연결됨",
    description:
      "Content Engine 실행, Orchestrator 계획, Workflow Bus 체크포인트를 기억합니다.",
    items: [
      "last_content_run",
      "orchestrator_last_plan",
      "workflow_bus_v1",
      "completed_content_run",
    ],
  },
  {
    id: "MEM-DECISION",
    title: "AI Decision Memory",
    icon: "📌",
    status: "진행중",
    description:
      "왜 이 결정을 했는지, 어떤 기준으로 추천했는지 기록합니다.",
    items: [
      "이미지는 콘텐츠가 아니라 브랜드 자산",
      "리니는 공식 IP",
      "초3~4학년 기준 상품 추천",
      "예시도 운영 기준을 따라야 함",
    ],
  },
];

export const memoryCenterRules = [
  "확인되지 않은 작업은 완료로 기록하지 않는다.",
  "이미지, 글, 상품, 프롬프트는 모두 장기 자산으로 관리한다.",
  "Brand Center 기준은 이미지 작업의 최상위 규칙이다.",
  "초3~4학년 기준을 벗어난 상품 예시는 추천하지 않는다.",
  "새 채팅을 열면 Daily Brief → Memory Center → Orchestrator 순서로 확인한다.",
];

export const smartRecallExamples = [
  {
    keyword: "장마",
    result:
      "장마철 준비물 글, 자동우산/방수커버 추천상품, 우비 입은 리니, 장마 인포그래픽 프롬프트를 함께 불러옵니다.",
  },
  {
    keyword: "유괴예방",
    result:
      "안전수칙 글, GPS/호루라기/네임택 추천상품, 걱정하는 리니 표정, 안전교육 인포그래픽 기준을 불러옵니다.",
  },
  {
    keyword: "자기주도학습",
    result:
      "학습 루틴 글, 스터디플래너/타이머/독서대 추천상품, 집중하는 리니, 학습 체크리스트를 불러옵니다.",
  },
];
