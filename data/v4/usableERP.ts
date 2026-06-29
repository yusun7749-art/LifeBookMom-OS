import { originalPublishedTitles, draftQueueTitles } from "./cmsOriginalTitles";

export const erpMeta = { project: "Project036.5", title: "생활백서맘 운영본부", subtitle: "전역 상태 저장으로 발행/중복/선택 주제가 모든 화면에 유지됩니다.", version: "운영체제 v3.6.5" };

export const menu = [
  { title: "운영본부", href: "/enterprise" },
  { title: "OS LOCK", href: "/os-lock" },
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

export const published = originalPublishedTitles.map((item) => ({ id: item.id, date: item.date, title: item.originalTitle, group: item.platform, naver: item.platform === "Naver" ? item.status : "분리관리", google: item.platform === "Google" ? item.status : "분리관리", image: "관리", keywords: item.keywords, point: item.project }));

export const recommended = draftQueueTitles.map((item) => ({ title: item.originalTitle, group: item.platform, reason: "미발행 후보입니다.", relation: item.project, seoGrade: "S", duplicateRisk: "낮음", status: "작성 추천" }));

export const blocked = originalPublishedTitles.map((item) => ({ title: item.originalTitle, reason: "이미 발행완료" }));

export const stats = [
  { title: "전체 발행", value: originalPublishedTitles.length, link: "/cms-search" },
  { title: "네이버", value: originalPublishedTitles.filter((x) => x.platform === "Naver").length, link: "/naver-board" },
  { title: "Google", value: originalPublishedTitles.filter((x) => x.platform === "Google").length, link: "/google-board" },
  { title: "미발행", value: draftQueueTitles.length, link: "/batch-board" },
];

export const contentMap = [];
export const calendarItems = originalPublishedTitles.map((item) => ({ date: item.date, title: item.originalTitle, naver: item.platform === "Naver" ? item.status : "-", google: item.platform === "Google" ? item.status : "-", image: "관리" }));
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
  return published.map((p) => {
    const titleHit = p.title.replace(/\s+/g, "").toLowerCase().includes(q) ? 70 : 0;
    const keywordHit = p.keywords.reduce((s, k) => q.includes(k.toLowerCase()) ? s + 12 : s, 0);
    return { ...p, score: Math.min(100, titleHit + keywordHit) };
  }).filter((p) => p.score >= 24).sort((a, b) => b.score - a.score);
}
