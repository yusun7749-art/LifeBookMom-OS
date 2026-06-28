// Project009-15
// Enterprise Command Center
// LifeBookMom OS 전체 엔진을 한 화면에서 실행하는 중앙 관제실

export const commandCenterMeta = {
  project: "Project009-15",
  title: "Enterprise Command Center",
  version: "COMMAND_CENTER_v1.0",
  purpose:
    "운영본부, 콘텐츠, 브랜드, 상품, 워크플로, 메모리 엔진을 한 화면에서 확인하고 실행합니다.",
  principle:
    "선장님은 여러 페이지를 헤매지 않고 Command Center에서 오늘의 작업을 시작합니다.",
};

export const commandGroups = [
  {
    title: "오늘 운영",
    icon: "🌅",
    links: [
      { label: "Daily Brief", href: "/daily-brief", desc: "오늘 상황과 다음 작업 확인" },
      { label: "Orchestrator", href: "/orchestrator", desc: "주제 하나로 전체 제작 계획 생성" },
      { label: "Workflow Engine", href: "/workflow-engine", desc: "작업 완료 처리" },
      { label: "Workflow Bus", href: "/workflow-bus", desc: "OS 연결 흐름 확인" },
    ],
  },
  {
    title: "콘텐츠 제작",
    icon: "🚀",
    links: [
      { label: "Content Engine", href: "/content-engine", desc: "프로젝트 기반 콘텐츠 요청문 생성" },
      { label: "Content Intelligence", href: "/content-intelligence", desc: "주제 분석과 SEO 방향 생성" },
      { label: "Navigator AI", href: "/navigator-ai", desc: "오늘의 추천 콘텐츠 확인" },
      { label: "Ledger", href: "/ledger", desc: "프로젝트 진행률 확인" },
    ],
  },
  {
    title: "브랜드 / 이미지",
    icon: "🎨",
    links: [
      { label: "Brand Center", href: "/brand-center", desc: "리니, 워터마크, 이미지 규칙" },
      { label: "Memory Center", href: "/memory-center", desc: "브랜드와 자산 기억" },
      { label: "Brain Core", href: "/brain-core", desc: "현재 상태와 재개 기준" },
      { label: "Journal", href: "/journal", desc: "결정과 이유 기록" },
    ],
  },
  {
    title: "상품 / 수익",
    icon: "🛒",
    links: [
      { label: "Product Brain", href: "/product-brain", desc: "초3~4 추천상품 기본 엔진" },
      { label: "Product Intelligence", href: "/product-intelligence", desc: "추천 점수와 적합도 분석" },
      { label: "Auto Product", href: "/auto-product", desc: "쿠팡 추천영역 자동 생성" },
      { label: "Memory", href: "/memory", desc: "기존 Memory 확인" },
    ],
  },
];

export const commandCenterRules = [
  "작업 시작은 Daily Brief 또는 Orchestrator에서 한다.",
  "글 생성은 Content Engine 또는 Content Intelligence에서 한다.",
  "상품 추천은 Product Intelligence와 Auto Product 기준을 사용한다.",
  "이미지 작업은 Brand Center의 리니 기준을 먼저 확인한다.",
  "작업 종료는 Workflow Engine에서 완료 처리한다.",
  "새 채팅 재개 시 Daily Brief → Memory Center → Command Center 순서로 확인한다.",
];
