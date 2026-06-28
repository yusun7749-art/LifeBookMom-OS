import { originalPublishedTitles, draftQueueTitles } from "./cmsOriginalTitles";

export const erpMeta = {
  project: "Project035",
  title: "생활백서맘 운영본부",
  subtitle: "실제 발행 원본 제목을 기준으로 작성·수정·재생성을 관리합니다.",
  version: "운영체제 v3.5.0",
};

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

export const published = originalPublishedTitles.map((item) => ({
  id: item.id,
  date: item.date,
  title: item.originalTitle,
  group: item.category,
  naver: item.naver,
  google: item.google,
  image: item.image,
  keywords: item.keywords,
  point: item.category,
}));

export const recommended = draftQueueTitles.map((item) => ({
  title: item.originalTitle,
  group: item.category,
  reason: "실제 발행 전 후보입니다. 발행완료 체크 전까지 추천 큐에 유지됩니다.",
  relation: item.keywords.join(" → "),
  seoGrade: "S",
  duplicateRisk: "낮음",
  status: "작성 추천",
}));

export const blocked = originalPublishedTitles.map((item) => ({
  title: item.originalTitle,
  reason: "이미 발행완료",
}));

export const stats = [
  { title: "원본 제목", value: published.length, link: "/cms-search" },
  { title: "미발행 후보", value: recommended.length, link: "/ideas" },
  { title: "중복 차단", value: blocked.length, link: "/content-brain" },
  { title: "일괄 작성", value: "0/20", link: "/batch-board" },
];

export const contentMap = [
  { group: "성장", done: ["체취", "사춘기", "여드름", "속옷 교체"], todo: ["샤워습관", "생리 준비", "키성장", "체육복 관리", "친구관계 변화"] },
  { group: "디지털", done: ["SNS 안전"], todo: ["단체채팅방 예절", "스마트폰 가족규칙", "게임 시간"] },
  { group: "안전", done: ["물놀이"], todo: ["횡단보도", "유괴 예방", "장마철 준비물"] },
];

export const calendarItems = originalPublishedTitles.map((item) => ({
  date: item.date,
  title: item.originalTitle,
  naver: item.naver,
  google: item.google,
  image: item.image,
}));

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
