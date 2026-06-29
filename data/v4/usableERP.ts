import { originalPublishedTitles, draftQueueTitles } from "./cmsOriginalTitles";

export const erpMeta = {
  project: "Project037",
  title: "생활백서맘 Revenue OS",
  subtitle: "애드센스 승인 · 애드포스트 승인 · 유입 · 수익을 먼저 보는 운영본부",
  version: "수익운영체제 v3.7",
};

export const menu = [
  { title: "운영본부", href: "/enterprise" },
  { title: "오늘작성", href: "/batch-board" },
  { title: "주제찾기", href: "/ideas" },
  { title: "글쓰기", href: "/content-studio" },
  { title: "발행관리", href: "/planner" },
  { title: "데이터센터", href: "/dashboard" },
  { title: "승인센터", href: "/approval-center" },
  { title: "설정", href: "/os-lock" },
];

export const revenueCategories = [
  { title: "유입형", desc: "수족구·로블록스·장마처럼 실제 검색으로 방문자를 데려오는 글", score: "★★★★★" },
  { title: "승인형", desc: "FAQ·표·체크리스트·내부링크로 사이트 신뢰를 올리는 글", score: "★★★★★" },
  { title: "수익형", desc: "교육·보험·정부지원·쿠팡 제품으로 자연스럽게 연결되는 글", score: "★★★★☆" },
];

export const approvalChecklist = [
  { label: "About 소개 페이지", status: "점검필요", priority: "상" },
  { label: "Contact 문의 페이지", status: "점검필요", priority: "상" },
  { label: "개인정보처리방침", status: "점검필요", priority: "상" },
  { label: "내부링크 2~5개", status: "강화필요", priority: "상" },
  { label: "FAQ·표·체크리스트", status: "강화필요", priority: "상" },
  { label: "검색형 제목", status: "즉시적용", priority: "상" },
  { label: "네이버/Google 원고 차별화", status: "유지", priority: "중" },
  { label: "이미지 최적화", status: "점검필요", priority: "중" },
];

export const trafficWinners = [
  { title: "수족구 걸리면 학교 보내도 될까요?", percent: "7%", next: "수족구 격리기간 · 음식 · 형제전염 · 소독법" },
  { title: "로블록스 자녀보호설정", percent: "상승", next: "친구추가 · 채팅차단 · 결제차단 · 계정보호" },
  { title: "초등학생 거짓말", percent: "관심", next: "혼내기 전 확인할 원인 · 대화법" },
];

export const stats = [
  { title: "전체 발행", value: originalPublishedTitles.length, link: "/cms-search" },
  { title: "네이버", value: originalPublishedTitles.filter((x) => x.platform === "Naver").length, link: "/naver-board" },
  { title: "Google", value: originalPublishedTitles.filter((x) => x.platform === "Google").length, link: "/google-board" },
  { title: "미발행", value: draftQueueTitles.length, link: "/batch-board" },
];

export const published = originalPublishedTitles.map((item) => ({
  id: item.id,
  date: item.date,
  title: item.originalTitle,
  group: item.platform,
  naver: item.platform === "Naver" ? item.status : "분리관리",
  google: item.platform === "Google" ? item.status : "분리관리",
  image: "관리",
  keywords: item.keywords,
  point: item.project,
}));

export const recommended = draftQueueTitles.map((item) => ({
  title: item.originalTitle,
  group: item.platform,
  reason: "미발행 후보입니다.",
  relation: item.project,
  seoGrade: "S",
  duplicateRisk: "낮음",
  status: "작성 추천",
}));

export const blocked = originalPublishedTitles.map((item) => ({ title: item.originalTitle, reason: "이미 발행완료" }));

export const contentMap = [];
export const calendarItems = originalPublishedTitles.map((item) => ({ date: item.date, title: item.originalTitle, naver: item.platform === "Naver" ? item.status : "-", google: item.platform === "Google" ? item.status : "-", image: "관리" }));
export const progress = [];
export const todayTasks = [];
export const todayTopicCandidates = recommended;
export const plannerDays = [];
export const ideaCategories = ["유입형", "승인형", "수익형", "건강", "교육", "생활"];
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
