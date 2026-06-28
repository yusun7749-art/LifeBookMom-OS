export const erpMeta = {
  project: "Project027.2",
  title: "생활백서맘 운영본부",
  subtitle: "중복은 막고, 연관 주제는 SEO 등급 기준으로 추천합니다.",
  version: "운영체제 v2.7.2",
};

export const menu = [
  { title: "운영본부", href: "/enterprise" },
  { title: "콘텐츠두뇌", href: "/content-brain" },
  { title: "발행달력", href: "/planner" },
  { title: "주제찾기", href: "/ideas" },
  { title: "네이버", href: "/naver-board" },
  { title: "Google", href: "/google-board" },
  { title: "콘텐츠검색", href: "/cms-search" },
  { title: "운영현황", href: "/dashboard" },
];

export const published = [
  {
    id: "p001",
    date: "2026-06-28",
    title: "초등학생 체취 변화, 부모가 꼭 알아야 할 원인과 관리법",
    group: "성장",
    naver: "발행완료",
    google: "발행완료",
    image: "완료",
    keywords: ["체취", "땀냄새", "성장기", "위생", "샤워습관"],
    point: "성장기 체취와 위생 습관",
  },
  {
    id: "p002",
    date: "2026-06-28",
    title: "초3 사춘기 신호, 부모가 가장 먼저 알아야 할 변화",
    group: "성장",
    naver: "발행완료",
    google: "발행완료",
    image: "완료",
    keywords: ["사춘기", "감정변화", "방문닫기", "친구관계"],
    point: "감정 변화와 부모 대화",
  },
  {
    id: "p003",
    date: "2026-06-27",
    title: "초3 여드름 원인과 관리법",
    group: "성장",
    naver: "발행완료",
    google: "발행완료",
    image: "완료",
    keywords: ["여드름", "피부", "세안", "위생"],
    point: "초기 여드름과 순한 관리",
  },
  {
    id: "p004",
    date: "2026-06-27",
    title: "초등학생 SNS 안전하게 사용하는 방법",
    group: "디지털",
    naver: "발행완료",
    google: "작성중",
    image: "완료",
    keywords: ["SNS", "계정보호", "DM", "친구추가"],
    point: "SNS 계정 보호와 부모 설정",
  },
  {
    id: "p005",
    date: "2026-06-26",
    title: "여름철 물놀이 안전수칙, 아이를 절대 혼자 두지 마세요",
    group: "안전",
    naver: "발행완료",
    google: "미작성",
    image: "완료",
    keywords: ["물놀이", "구명조끼", "방수팩", "안전"],
    point: "여름 물놀이 안전수칙",
  },
];

export const recommended = [
  {
    title: "초등학생 속옷 교체 시기와 위생 습관",
    group: "성장",
    reason: "체취 글과 연관되지만 핵심은 속옷 교체·세탁 루틴이라 중복이 아닙니다.",
    relation: "체취 → 속옷 → 세탁 → 위생 루틴",
    seoGrade: "S",
    duplicateRisk: "낮음",
    status: "작성 추천",
  },
  {
    title: "초등학생 샤워습관, 스스로 씻기 시작하는 방법",
    group: "성장",
    reason: "체취 글의 다음 단계이지만 샤워 독립 습관 중심이라 내용이 겹치지 않습니다.",
    relation: "체취 → 샤워습관 → 자기관리",
    seoGrade: "S",
    duplicateRisk: "낮음",
    status: "작성 추천",
  },
  {
    title: "초등학생 생리 준비, 부모가 자연스럽게 알려주는 방법",
    group: "성장",
    reason: "사춘기 글과 연관되지만 몸 변화 교육이라는 별도 검색 의도를 가집니다.",
    relation: "사춘기 → 몸 변화 → 생리 준비",
    seoGrade: "A",
    duplicateRisk: "낮음",
    status: "작성 추천",
  },
  {
    title: "초등학생 친구관계 변화, 부모가 눈치채야 할 신호",
    group: "성장",
    reason: "사춘기 감정 글과 연관되지만 친구관계 중심으로 확장됩니다.",
    relation: "사춘기 → 친구관계 → 감정조절",
    seoGrade: "A",
    duplicateRisk: "중간",
    status: "검토 후 작성",
  },
];

export const blocked = [
  { title: "초등학생 체취 변화", reason: "이미 발행완료" },
  { title: "초3 사춘기 신호", reason: "이미 발행완료" },
  { title: "초3 여드름", reason: "이미 발행완료" },
  { title: "초등학생 SNS 안전", reason: "이미 발행완료" },
  { title: "여름철 물놀이 안전수칙", reason: "이미 발행완료" },
];

export const calendarItems = [
  { date: "2026-06-24", title: "자기주도학습", naver: "발행완료", google: "발행완료", image: "완료" },
  { date: "2026-06-25", title: "장마철 준비물", naver: "발행완료", google: "발행완료", image: "완료" },
  { date: "2026-06-26", title: "물놀이 안전수칙", naver: "발행완료", google: "미작성", image: "완료" },
  { date: "2026-06-27", title: "SNS 안전", naver: "발행완료", google: "작성중", image: "완료" },
  { date: "2026-06-28", title: "체취 변화 / 사춘기", naver: "발행완료", google: "발행완료", image: "완료" },
  { date: "2026-06-29", title: "속옷 교체 시기", naver: "작성예정", google: "작성예정", image: "대기" },
  { date: "2026-06-30", title: "샤워습관", naver: "추천", google: "추천", image: "대기" },
];

export const contentMap = [
  { group: "성장", done: ["체취", "사춘기", "여드름"], todo: ["속옷 교체", "샤워습관", "생리 준비", "키성장", "체육복 관리", "친구관계 변화"] },
  { group: "디지털", done: ["SNS 안전"], todo: ["단체채팅방 예절", "스마트폰 가족규칙", "게임 시간", "유튜브 시청 규칙"] },
  { group: "안전", done: ["물놀이"], todo: ["횡단보도", "유괴 예방", "장마철 준비물", "참진드기", "등하교 안전"] },
];

export const stats = [
  { title: "발행완료 글", value: published.length, link: "/cms-search" },
  { title: "SEO S/A 추천", value: recommended.filter((r) => r.seoGrade === "S" || r.seoGrade === "A").length, link: "/ideas" },
  { title: "중복 차단", value: blocked.length, link: "/content-brain" },
  { title: "Google 미완료", value: published.filter((p) => p.google !== "발행완료").length, link: "/google-board" },
];

export const progress = [
  { label: "애드센스 승인 목표", current: 17, total: 100 },
  { label: "애드포스트 승인 목표", current: 22, total: 80 },
  { label: "이번 달 발행 목표", current: 8, total: 60 },
  { label: "중복 차단 적용", current: blocked.length, total: blocked.length },
];

export const todayTasks = [
  { label: "네이버 작성", count: 2, status: "대기" },
  { label: "Google 작성", count: 2, status: "대기" },
  { label: "이미지 제작", count: 2, status: "대기" },
  { label: "발행대기", count: 2, status: "확인 필요" },
  { label: "중복 위험", count: blocked.length, status: "주의" },
  { label: "SEO 추천", count: recommended.length, status: "추천" },
];

export const todayTopicCandidates = recommended.map((item) => ({
  title: item.title,
  naver: "추천",
  google: "추천",
  image: "대기",
  publish: "미완료",
  reason: `${item.reason} · SEO ${item.seoGrade}등급`,
}));

export const plannerDays = calendarItems.map((item) => ({
  day: item.date.slice(-2),
  status: item.title,
  type: item.naver === "발행완료" ? "완료" : "예정",
}));

export const ideaCategories = ["학교", "건강", "생활", "교육", "디지털", "방학", "계절", "안전", "친구관계", "성장"];

export const keywordIdeas = recommended.map((item) => item.title);

export const platformStatus = [
  { platform: "네이버", title: "생활백서맘 말투 중심 원고", current: "작성 대기", required: ["제목 1개", "본문", "체크리스트", "FAQ", "추천템", "해시태그", "쿠팡고지문"] },
  { platform: "Google", title: "SEO 구조 중심 원고", current: "작성 대기", required: ["SEO 제목", "구조화 본문", "FAQ", "내부링크", "요약", "검색 의도"] },
];

export const publishFlow = ["원고 작성", "중복 검사", "이미지 승인", "네이버 발행", "Google 발행", "CMS 반영", "달력 반영", "통계 반영"];

export const cmsSearchTabs = ["작성됨", "작성예정", "중복", "추천", "네이버", "Google", "이미지"];

export function writeUrl(title: string, mode = "naver") {
  return `/content-studio?topic=${encodeURIComponent(title)}&mode=${mode}`;
}

export function searchUrl(query: string) {
  return `/cms-search?q=${encodeURIComponent(query)}`;
}

export function duplicateCheck(query: string) {
  const q = query.replace(/\s+/g, "").toLowerCase();
  return published
    .map((p) => {
      const titleHit = p.title.replace(/\s+/g, "").toLowerCase().includes(q) ? 70 : 0;
      const keywordHit = p.keywords.reduce((s, k) => q.includes(k.toLowerCase()) ? s + 12 : s, 0);
      return { ...p, score: Math.min(100, titleHit + keywordHit) };
    })
    .filter((p) => p.score >= 24)
    .sort((a, b) => b.score - a.score);
}
