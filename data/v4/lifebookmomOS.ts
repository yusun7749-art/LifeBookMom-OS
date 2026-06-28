export const osMeta = {
  project: "Project024",
  title: "LifeBookMom OS",
  subtitle: "생활백서맘 운영본부 Full Integration",
  branch: "project023-os-core",
  version: "OS v2.4.0",
  status: "READY",
  commitLabel: "Project024 Full Integration",
  purpose: "콘텐츠 제작, 운영 기준, 분석, 수익, 자동화, Git 관리를 하나의 운영본부에서 연결합니다.",
};

export const osQuickActions = [
  { icon: "📝", title: "네이버 원클릭", href: "/content-studio", desc: "생활백서맘 네이버 V4 원고 생성" },
  { icon: "🧭", title: "오늘 작업", href: "/navigator-core", desc: "오늘 해야 할 작업과 우선순위" },
  { icon: "📊", title: "대시보드", href: "/dashboard", desc: "운영 상태와 다음 작업 확인" },
  { icon: "🤖", title: "자동화", href: "/automation-hub", desc: "QA, 백업, 발행 흐름 관리" },
];

export const osCenters = [
  { group: "운영 기준", items: [
    { title: "Constitution", href: "/constitution-center", status: "LOCK" },
    { title: "Decision", href: "/decision-center", status: "ACTIVE" },
    { title: "Version", href: "/version-center", status: "ACTIVE" },
    { title: "Recovery", href: "/recovery-center", status: "READY" },
  ]},
  { group: "콘텐츠 운영", items: [
    { title: "Content Studio", href: "/content-studio", status: "READY" },
    { title: "CMS Hub", href: "/cms-hub", status: "READY" },
    { title: "Workflow", href: "/workflow-center", status: "READY" },
    { title: "Media", href: "/media-center", status: "READY" },
  ]},
  { group: "성장 운영", items: [
    { title: "Navigator", href: "/navigator-core", status: "READY" },
    { title: "Analytics", href: "/analytics-hub", status: "READY" },
    { title: "Revenue", href: "/revenue-center", status: "READY" },
    { title: "Automation", href: "/automation-hub", status: "READY" },
  ]},
  { group: "관리", items: [
    { title: "Dashboard", href: "/dashboard", status: "READY" },
    { title: "Settings", href: "/settings-center", status: "READY" },
    { title: "Command", href: "/command-center", status: "READY" },
    { title: "Schedule", href: "/schedule-center", status: "READY" },
  ]},
];

export const naverChecklist = [
  "제목 1개만 출력",
  "본문은 네이버 전용",
  "부모 체크리스트 포함",
  "추천템 별점/점수 미출력",
  "FAQ 5개",
  "해시태그 30개 한 줄",
  "쿠팡 고지문 마지막 한 줄",
];

export const todayMissions = [
  { title: "Content Studio V4 출력 검증", priority: "높음", desc: "수족구 등교 기준 같은 대표글로 실제 출력 확인" },
  { title: "생활백서맘 말투 고정", priority: "높음", desc: "옆집 엄마 말투와 복붙용 구조 확인" },
  { title: "Dashboard 실제 데이터 연결", priority: "중간", desc: "Git, CMS, Analytics, Revenue 상태 연결" },
  { title: "Navigator 추천 로직 보완", priority: "중간", desc: "오늘 작업과 다음 작업을 자동 추천하도록 확장" },
];

export const dashboardWidgets = [
  { title: "OS 상태", value: "READY", desc: "Project024 Full Integration 적용" },
  { title: "Content Studio", value: "V4", desc: "네이버·Google 분리 운영" },
  { title: "Navigator", value: "READY", desc: "오늘 작업 허브" },
  { title: "CMS", value: "READY", desc: "콘텐츠 운영 허브" },
  { title: "Analytics", value: "READY", desc: "조회수·대표글·리뉴얼 후보" },
  { title: "Revenue", value: "READY", desc: "쿠팡·애드센스·애드포스트" },
  { title: "Automation", value: "READY", desc: "QA·백업·발행 흐름" },
  { title: "GitHub", value: "BRANCH", desc: "project023-os-core" },
];

export const settings = [
  "브랜드명: 생활백서맘",
  "공식 캐릭터: 리니",
  "워터마크: 월계관 + 생활백서맘 + 하트",
  "네이버 본문: 15pt 기준",
  "쿠팡 고지문: 마지막 한 줄",
  "추천상품 점수: 내부용만 사용",
  "Google 본문: 네이버와 분리",
  "삭제 금지: ARCHIVED 사용",
];

export const revenueSources = [
  "Coupang Partners",
  "Naver AdPost",
  "Google AdSense",
  "전자책",
  "템플릿",
  "브랜드 확장",
];

export const automationJobs = [
  "네이버 출력 QA",
  "해시태그 30개 검사",
  "쿠팡 고지문 검사",
  "GitHub 백업 확인",
  "발행 완료 기록",
  "일일 운영 보고",
];
