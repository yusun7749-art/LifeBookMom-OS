export const operatingMeta = {
  project: "Project025",
  title: "생활백서맘 운영본부",
  subtitle: "오늘 무엇을 해야 하는지 바로 보이는 운영 화면",
  version: "운영체제 v2.5.0",
  branch: "project023-os-core",
  status: "운영 모드",
};

export const todayTasks = [
  { label: "네이버 작성", count: 2, status: "대기" },
  { label: "Google 작성", count: 2, status: "대기" },
  { label: "이미지 제작", count: 2, status: "대기" },
  { label: "발행대기", count: 2, status: "확인 필요" },
  { label: "미완료 작업", count: 3, status: "주의" },
  { label: "추천 주제", count: 12, status: "사용 가능" },
];

export const todayTopicCandidates = [
  {
    title: "초등학생 체취 변화, 부모가 꼭 알아야 할 원인과 관리법",
    naver: "미작성",
    google: "미작성",
    image: "미승인",
    publish: "미완료",
    reason: "성장기·위생·부모 고민이 연결되는 주제",
  },
  {
    title: "초3 사춘기 신호, 부모가 가장 먼저 알아야 할 변화",
    naver: "작성 후보",
    google: "미작성",
    image: "미승인",
    publish: "미완료",
    reason: "감정 변화·친구 관계·부모 공감이 강한 대표글 후보",
  },
  {
    title: "초등학생 여름철 땀 냄새 관리법",
    naver: "추천",
    google: "추천",
    image: "대기",
    publish: "미완료",
    reason: "계절성 검색과 생활용품 추천 연결 가능",
  },
  {
    title: "초등학생 속옷 교체 시기와 위생 습관",
    naver: "추천",
    google: "추천",
    image: "대기",
    publish: "미완료",
    reason: "엄마들이 실제로 검색하는 생활 밀착 주제",
  },
  {
    title: "초등학생 성장기 몸 변화, 부모가 자연스럽게 알려주는 방법",
    naver: "추천",
    google: "추천",
    image: "대기",
    publish: "미완료",
    reason: "사춘기·성장교육·부모 대화로 확장 가능",
  },
];

export const progress = [
  { label: "애드센스 승인 목표", current: 17, total: 100 },
  { label: "애드포스트 승인 목표", current: 22, total: 80 },
  { label: "이번 달 발행 목표", current: 8, total: 60 },
  { label: "이미지 승인 목표", current: 5, total: 40 },
];

export const plannerDays = [
  { day: "28", status: "발행완료", type: "완료" },
  { day: "29", status: "작성예정", type: "대기" },
  { day: "30", status: "추천주제", type: "추천" },
  { day: "1", status: "네이버+Google 세트", type: "예정" },
  { day: "2", status: "이미지 제작", type: "예정" },
  { day: "3", status: "발행대기", type: "대기" },
  { day: "4", status: "리뉴얼 후보", type: "추천" },
];

export const ideaCategories = [
  "학교",
  "건강",
  "생활",
  "교육",
  "디지털",
  "방학",
  "계절",
  "안전",
  "친구관계",
  "성장",
];

export const keywordIdeas = [
  "초등학생 체취 변화",
  "초등학생 땀 냄새",
  "초등학생 속옷 교체",
  "초등학생 성장기 몸 변화",
  "초3 사춘기 신호",
  "초등학생 친구관계 변화",
  "초등학생 스마트폰 가족규칙",
  "초등학생 여름방학 생활습관",
  "초등학생 등교 전 준비물",
  "초등학생 감정조절 방법",
  "초등학생 물놀이 안전",
  "초등학생 장마철 준비물",
];

export const platformStatus = [
  {
    platform: "네이버",
    title: "생활백서맘 말투 중심 원고",
    current: "작성 대기",
    required: ["제목 1개", "본문", "체크리스트", "FAQ", "추천템", "해시태그", "쿠팡고지문"],
  },
  {
    platform: "Google",
    title: "SEO 구조 중심 원고",
    current: "작성 대기",
    required: ["SEO 제목", "구조화 본문", "FAQ", "내부링크", "요약", "검색 의도"],
  },
  {
    platform: "이미지",
    title: "리니 10컷 인포그래픽",
    current: "미승인",
    required: ["초3 여자아이", "수채화", "세로형 10컷", "공식 워터마크"],
  },
];

export const publishFlow = [
  "원고 작성",
  "이미지 승인",
  "네이버 발행",
  "Google 발행",
  "CMS 반영",
  "달력 반영",
  "오늘 완료 반영",
  "통계 반영",
];

export const cmsSearchTabs = [
  "작성됨",
  "작성예정",
  "중복",
  "추천",
  "네이버",
  "Google",
  "이미지",
];

export const erpMenu = [
  { title: "운영본부", href: "/enterprise", desc: "오늘 해야 할 일" },
  { title: "발행달력", href: "/planner", desc: "월간/주간 계획" },
  { title: "주제찾기", href: "/ideas", desc: "키워드 → 추천 주제" },
  { title: "네이버", href: "/naver-board", desc: "네이버 원고와 발행" },
  { title: "Google", href: "/google-board", desc: "구글 원고와 발행" },
  { title: "콘텐츠검색", href: "/cms-search", desc: "작성글·중복·추천 관리" },
  { title: "발행완료", href: "/publish-center", desc: "완료 처리와 반영" },
  { title: "운영현황", href: "/dashboard", desc: "승인·성과·상태" },
];
