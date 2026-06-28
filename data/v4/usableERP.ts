export const erpMeta = {
  project: "Project027.1",
  title: "생활백서맘 운영본부",
  subtitle: "중복은 막고, 연관 주제는 SEO 등급 기준으로 추천합니다.",
  version: "운영체제 v2.7.1",
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
];

export const stats = [
  { title: "발행완료 글", value: published.length, link: "/cms-search" },
  { title: "SEO S/A 추천", value: recommended.filter((r) => r.seoGrade === "S" || r.seoGrade === "A").length, link: "/ideas" },
  { title: "중복 차단", value: blocked.length, link: "/content-brain" },
  { title: "Google 미완료", value: 0, link: "/google-board" },
];

export const contentMap = [
  { group: "성장", done: ["체취", "사춘기", "여드름"], todo: ["속옷 교체", "샤워습관", "생리 준비", "키성장", "체육복 관리", "친구관계 변화"] },
  { group: "디지털", done: ["SNS 안전"], todo: ["단체채팅방 예절", "스마트폰 가족규칙", "게임 시간", "유튜브 시청 규칙"] },
  { group: "안전", done: ["물놀이"], todo: ["횡단보도", "유괴 예방", "장마철 준비물", "참진드기", "등하교 안전"] },
];

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
