export const erpMeta = {
  project: "Project029",
  title: "생활백서맘 운영본부",
  subtitle: "실제 발행 원본 제목과 이미지 규칙을 고정 관리합니다.",
  version: "운영체제 v2.9.0",
};

export const menu = [
  { title: "운영본부", href: "/enterprise" },
  { title: "일괄작성", href: "/batch-board" },
  { title: "콘텐츠검색", href: "/cms-search" },
  { title: "이미지규칙", href: "/image-guard" },
  { title: "콘텐츠두뇌", href: "/content-brain" },
  { title: "발행달력", href: "/planner" },
  { title: "주제찾기", href: "/ideas" },
  { title: "네이버", href: "/naver-board" },
  { title: "Google", href: "/google-board" },
  { title: "운영현황", href: "/dashboard" },
];

export const published = [
  { id: "p001", date: "2026-06-29", title: "초등학생 속옷 교체 시기와 위생 습관, 부모가 꼭 알려줘야 할 생활습관", group: "성장/위생", naver: "발행완료", google: "발행완료", image: "재검토 필요", keywords: ["속옷교체", "위생습관", "성장", "생활습관"], point: "속옷 교체 시기와 위생 습관" },
  { id: "p002", date: "2026-06-28", title: "초등학생 체취 변화, 부모가 꼭 알아야 할 원인과 관리법", group: "성장", naver: "발행완료", google: "발행완료", image: "완료", keywords: ["체취", "땀냄새", "성장기", "위생"], point: "성장기 체취와 위생 습관" },
];

export const recommended = [
  { title: "초등학생 체육복 관리와 세탁 습관", group: "성장", reason: "속옷·체취 글과 연관되지만 체육복 관리 중심이라 중복이 아닙니다.", relation: "체취 → 속옷 → 체육복 → 세탁", seoGrade: "S", duplicateRisk: "낮음", status: "작성 추천" },
];

export const blocked = [
  { title: "초등학생 속옷 교체 시기와 위생 습관", reason: "이미 발행완료" },
  { title: "초등학생 체취 변화", reason: "이미 발행완료" },
  { title: "초3 사춘기 신호", reason: "이미 발행완료" },
];

export const stats = [
  { title: "원본 제목", value: published.length, link: "/cms-search" },
  { title: "이미지 재검토", value: 1, link: "/image-guard" },
  { title: "중복 차단", value: blocked.length, link: "/content-brain" },
  { title: "일괄 작성", value: "0/20", link: "/batch-board" },
];

export const contentMap = [
  { group: "성장", done: ["체취", "사춘기", "여드름", "속옷 교체"], todo: ["샤워습관", "생리 준비", "키성장", "체육복 관리", "친구관계 변화"] },
];

export const calendarItems = [];
export const progress = [];
export const todayTasks = [];
export const todayTopicCandidates = recommended;
export const plannerDays = [];
export const ideaCategories = ["성장", "생활", "건강", "안전", "디지털"];
export const keywordIdeas = recommended.map((item) => item.title);
export const platformStatus = [];
export const publishFlow = ["네이버 작성", "Google 작성", "이미지", "예약/발행완료"];
export const cmsSearchTabs = ["작성됨", "중복", "추천", "네이버", "Google"];

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
