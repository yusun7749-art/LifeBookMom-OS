export * from "./contentBrain";

export const operatingMeta = {
  project: "Project026",
  title: "생활백서맘 운영본부",
  subtitle: "중복 추천을 막고 다음 글을 이어주는 콘텐츠 ERP",
  version: "운영체제 v2.6.0",
  branch: "project023-os-core",
  status: "운영 모드",
};

export const todayTasks = [
  { label: "네이버 작성", count: 2, status: "대기" },
  { label: "Google 작성", count: 2, status: "대기" },
  { label: "이미지 제작", count: 2, status: "대기" },
  { label: "발행대기", count: 2, status: "확인 필요" },
  { label: "중복 위험", count: 2, status: "주의" },
  { label: "안 쓴 주제", count: 9, status: "추천" },
];

export const todayTopicCandidates = [
  {
    title: "초등학생 속옷 교체 시기와 위생 습관",
    naver: "추천",
    google: "추천",
    image: "대기",
    publish: "미완료",
    reason: "체취 글과 이어지지만 중복이 아니라 실천 주제로 확장됩니다.",
  },
  {
    title: "초등학생 샤워습관, 스스로 씻기 시작하는 방법",
    naver: "추천",
    google: "추천",
    image: "대기",
    publish: "미완료",
    reason: "체취 이후 자연스럽게 이어지는 생활습관 주제입니다.",
  },
  {
    title: "초등학생 생리 준비, 부모가 자연스럽게 알려주는 방법",
    naver: "추천",
    google: "추천",
    image: "대기",
    publish: "미완료",
    reason: "성장 시리즈에서 아직 비어 있는 핵심 주제입니다.",
  },
  {
    title: "초등학생 친구관계 변화, 부모가 눈치채야 할 신호",
    naver: "추천",
    google: "추천",
    image: "대기",
    publish: "미완료",
    reason: "사춘기 감정 글과 연결되지만 친구관계 중심으로 확장됩니다.",
  },
];

export const progress = [
  { label: "애드센스 승인 목표", current: 17, total: 100 },
  { label: "애드포스트 승인 목표", current: 22, total: 80 },
  { label: "이번 달 발행 목표", current: 8, total: 60 },
  { label: "중복 차단 적용", current: 1, total: 1 },
];

export const erpMenu = [
  { title: "운영본부", href: "/enterprise", desc: "오늘 해야 할 일" },
  { title: "콘텐츠두뇌", href: "/content-brain", desc: "중복 검사와 다음 글 추천" },
  { title: "발행달력", href: "/planner", desc: "월간/주간 계획" },
  { title: "주제찾기", href: "/ideas", desc: "키워드 → 추천 주제" },
  { title: "네이버", href: "/naver-board", desc: "네이버 원고와 발행" },
  { title: "Google", href: "/google-board", desc: "구글 원고와 발행" },
  { title: "콘텐츠검색", href: "/cms-search", desc: "작성글·중복·추천 관리" },
  { title: "발행완료", href: "/publish-center", desc: "완료 처리와 반영" },
  { title: "운영현황", href: "/dashboard", desc: "승인·성과·상태" },
];

export const plannerDays = [
  { day: "28", status: "발행완료", type: "완료" },
  { day: "29", status: "작성예정", type: "대기" },
  { day: "30", status: "추천주제", type: "추천" },
];

export const ideaCategories = ["학교", "건강", "생활", "교육", "디지털", "방학", "계절", "안전", "친구관계", "성장"];
export const keywordIdeas = [
  "초등학생 속옷 교체 시기와 위생 습관",
  "초등학생 샤워습관",
  "초등학생 생리 준비",
  "초등학생 친구관계 변화",
  "초등학생 체육복 관리",
  "초등학생 세탁 습관",
];

export const platformStatus = [
  { platform: "네이버", title: "생활백서맘 말투 중심 원고", current: "작성 대기", required: ["제목 1개", "본문", "체크리스트", "FAQ", "추천템", "해시태그", "쿠팡고지문"] },
  { platform: "Google", title: "SEO 구조 중심 원고", current: "작성 대기", required: ["SEO 제목", "구조화 본문", "FAQ", "내부링크", "요약", "검색 의도"] },
];

export const publishFlow = ["원고 작성", "중복 검사", "이미지 승인", "네이버 발행", "Google 발행", "CMS 반영", "달력 반영", "통계 반영"];
export const cmsSearchTabs = ["작성됨", "작성예정", "중복", "추천", "네이버", "Google", "이미지"];
