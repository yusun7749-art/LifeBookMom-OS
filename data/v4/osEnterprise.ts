export const enterpriseVision = {
  title: "LifeBookMom OS Enterprise",
  subtitle: "생활백서맘 회사를 운영하는 AI 운영체제",
  mission: "한 아이의 성장 기록이 수많은 부모의 길이 된다.",
  promise: "글을 관리하는 프로그램이 아니라, 부모의 고민·콘텐츠·수익·데이터를 연결하는 회사 운영체계입니다.",
};

export const enterpriseDepartments = [
  {
    id: "brain",
    icon: "🧠",
    name: "Brain Center",
    role: "AI 학습 두뇌",
    description: "조회수, 제목, 계절, 수익, 부모 반응을 학습합니다.",
    status: "V4 핵심",
  },
  {
    id: "navigator",
    icon: "🧭",
    name: "Navigator",
    role: "항해사 전략실",
    description: "오늘 해야 할 글, 리뉴얼, 수익 과제를 먼저 제안합니다.",
    status: "진행중",
  },
  {
    id: "journey",
    icon: "🌱",
    name: "Life Journey",
    role: "아이 성장 로드맵",
    description: "초3 기준에서 초4, 초5, 초6, 중학생까지 고민 흐름을 연결합니다.",
    status: "진행중",
  },
  {
    id: "graph",
    icon: "🗺",
    name: "Parenting Graph",
    role: "부모 고민 지도",
    description: "친구·건강·학습·안전·감정 고민을 연결해 다음 글을 추천합니다.",
    status: "진행중",
  },
  {
    id: "content",
    icon: "✍️",
    name: "Content Studio",
    role: "콘텐츠 제작실",
    description: "네이버·구글 글쓰기, FAQ, 추천템, 해시태그를 생성합니다.",
    status: "기존 확장",
  },
  {
    id: "publish",
    icon: "🚀",
    name: "Publish Center",
    role: "발행 관리",
    description: "발행 완료, 이미지 위치, 쿠팡 고지문, 색인 요청을 체크합니다.",
    status: "개선 예정",
  },
  {
    id: "revenue",
    icon: "💰",
    name: "Revenue Center",
    role: "수익 센터",
    description: "쿠팡, 애드포스트, 애드센스, 전자책, 템플릿 수익을 관리합니다.",
    status: "개선 예정",
  },
  {
    id: "asset",
    icon: "🏦",
    name: "Asset Vault",
    role: "콘텐츠 자산 금고",
    description: "대표글, 리뉴얼글, 계절글, 수익글을 자산 등급으로 관리합니다.",
    status: "신규",
  },
];

export const todayMissions = [
  {
    type: "대표글 리뉴얼",
    title: "수족구 등교 기준 총정리",
    reason: "건강·등교 클러스터의 대표글 후보입니다.",
    impact: "조회수 안정화",
    priority: 5,
  },
  {
    type: "신규 글 작성",
    title: "열은 내렸는데 학교 보내도 될까요?",
    reason: "부모의 실제 검색 의도와 감정 문장이 강합니다.",
    impact: "검색 유입",
    priority: 5,
  },
  {
    type: "클러스터 보강",
    title: "친구에게 휘둘리는 아이",
    reason: "친구 부탁을 거절 못하는 아이 글과 연결됩니다.",
    impact: "체류시간 증가",
    priority: 4,
  },
  {
    type: "수익형 보조글",
    title: "체험학습 미아방지 준비물",
    reason: "안전교육과 추천템 연결이 자연스럽습니다.",
    impact: "쿠팡 전환",
    priority: 4,
  },
];

export const companyMetrics = [
  { label: "오늘 진행률", value: "0%", hint: "5개 미션 기준" },
  { label: "콘텐츠 자산", value: "V3+", hint: "대표글/클러스터 구축중" },
  { label: "Brain 학습", value: "시작", hint: "V4에서 데이터 연결 예정" },
  { label: "OS 단계", value: "V4", hint: "회사 운영체제 리디자인" },
];

export const v4Roadmap = [
  "메인 대시보드를 항해사 전략실 중심으로 변경",
  "회사 부서형 사이드바 구조 적용",
  "부모 고민 기반 다음 글 추천 카드 추가",
  "콘텐츠 자산 금고 구조 설계",
  "Brain 학습 데이터 구조 준비",
  "수익센터와 발행센터를 회사 운영 흐름으로 재정렬",
];
