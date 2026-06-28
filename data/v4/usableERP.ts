export const erpMeta = {
  project: "Project028",
  title: "생활백서맘 운영본부",
  subtitle: "저녁 7시부터 새벽 사이에 하루치 글을 한 번에 작성합니다.",
  version: "운영체제 v2.8.0",
};

export const menu = [
  { title: "운영본부", href: "/enterprise" },
  { title: "일괄작성", href: "/batch-board" },
  { title: "콘텐츠두뇌", href: "/content-brain" },
  { title: "발행달력", href: "/planner" },
  { title: "주제찾기", href: "/ideas" },
  { title: "네이버", href: "/naver-board" },
  { title: "Google", href: "/google-board" },
  { title: "콘텐츠검색", href: "/cms-search" },
  { title: "운영현황", href: "/dashboard" },
];

export const published = [
  { id: "p001", date: "2026-06-28", title: "초등학생 체취 변화, 부모가 꼭 알아야 할 원인과 관리법", group: "성장", naver: "발행완료", google: "발행완료", image: "완료", keywords: ["체취", "땀냄새", "성장기", "위생", "샤워습관"], point: "성장기 체취와 위생 습관" },
  { id: "p002", date: "2026-06-28", title: "초3 사춘기 신호, 부모가 가장 먼저 알아야 할 변화", group: "성장", naver: "발행완료", google: "발행완료", image: "완료", keywords: ["사춘기", "감정변화", "방문닫기", "친구관계"], point: "감정 변화와 부모 대화" },
  { id: "p003", date: "2026-06-27", title: "초3 여드름 원인과 관리법", group: "성장", naver: "발행완료", google: "발행완료", image: "완료", keywords: ["여드름", "피부", "세안", "위생"], point: "초기 여드름과 순한 관리" },
];

export const recommended = [
  { title: "초등학생 속옷 교체 시기와 위생 습관", group: "성장", reason: "체취 글과 연관되지만 핵심은 속옷 교체·세탁 루틴이라 중복이 아닙니다.", relation: "체취 → 속옷 → 세탁 → 위생 루틴", seoGrade: "S", duplicateRisk: "낮음", status: "작성 추천" },
  { title: "초등학생 샤워습관, 스스로 씻기 시작하는 방법", group: "성장", reason: "체취 글의 다음 단계이지만 샤워 독립 습관 중심이라 내용이 겹치지 않습니다.", relation: "체취 → 샤워습관 → 자기관리", seoGrade: "S", duplicateRisk: "낮음", status: "작성 추천" },
];

export const blocked = [
  { title: "초등학생 체취 변화", reason: "이미 발행완료" },
  { title: "초3 사춘기 신호", reason: "이미 발행완료" },
  { title: "초3 여드름", reason: "이미 발행완료" },
];

export const stats = [
  { title: "네이버 목표", value: "0/10", link: "/batch-board" },
  { title: "Google 목표", value: "0/10", link: "/batch-board" },
  { title: "이미지 목표", value: "0/10", link: "/batch-board" },
  { title: "발행 목표", value: "0/20", link: "/batch-board" },
];

export const contentMap = [
  { group: "성장", done: ["체취", "사춘기", "여드름"], todo: ["속옷 교체", "샤워습관", "생리 준비", "키성장", "체육복 관리", "친구관계 변화"] },
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
