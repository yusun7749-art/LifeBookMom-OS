export const erpMeta = {
  project: "Project027",
  title: "생활백서맘 운영본부",
  subtitle: "누르면 바로 일할 수 있는 운영 화면",
  version: "운영체제 v2.7.0",
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
    reason: "체취 글과 이어지지만 실천 내용이 달라 중복이 아닙니다.",
    risk: "낮음",
    status: "작성 추천",
  },
  {
    title: "초등학생 샤워습관, 스스로 씻기 시작하는 방법",
    group: "성장",
    reason: "체취 이후 자연스럽게 이어지는 생활습관 주제입니다.",
    risk: "낮음",
    status: "작성 추천",
  },
  {
    title: "초등학생 생리 준비, 부모가 자연스럽게 알려주는 방법",
    group: "성장",
    reason: "성장 시리즈에서 아직 비어 있는 핵심 주제입니다.",
    risk: "낮음",
    status: "작성 추천",
  },
  {
    title: "초등학생 친구관계 변화, 부모가 눈치채야 할 신호",
    group: "성장",
    reason: "사춘기 글과 연결되지만 친구관계 중심으로 확장됩니다.",
    risk: "중간",
    status: "작성 추천",
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
  { title: "작성 추천", value: recommended.length, link: "/ideas" },
  { title: "중복 차단", value: blocked.length, link: "/content-brain" },
  { title: "Google 미완료", value: published.filter((p) => p.google !== "발행완료").length, link: "/google-board" },
];

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
