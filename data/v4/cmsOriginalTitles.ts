export const originalPublishedTitles = [
  { id: "pub-20260629-001", date: "2026-06-29", originalTitle: "초등학생 속옷 교체 시기와 위생 습관, 부모가 꼭 알려줘야 할 생활습관", category: "성장/위생", naver: "발행완료", google: "발행완료", image: "재검토 필요", keywords: ["속옷교체", "위생습관", "성장", "생활습관"] },
  { id: "pub-20260628-001", date: "2026-06-28", originalTitle: "초등학생 체취 변화, 부모가 꼭 알아야 할 원인과 관리법", category: "성장", naver: "발행완료", google: "발행완료", image: "완료", keywords: ["체취", "땀냄새", "성장기", "위생"] },
  { id: "pub-20260628-002", date: "2026-06-28", originalTitle: "초3 사춘기 신호, 부모가 가장 먼저 알아야 할 변화", category: "성장", naver: "발행완료", google: "발행완료", image: "완료", keywords: ["사춘기", "감정변화", "친구관계"] },
  { id: "pub-20260627-001", date: "2026-06-27", originalTitle: "초3 여드름 원인과 관리법", category: "성장/건강", naver: "발행완료", google: "발행완료", image: "완료", keywords: ["여드름", "피부", "세안"] },
  { id: "pub-20260627-002", date: "2026-06-27", originalTitle: "초등학생 SNS 안전하게 사용하는 방법", category: "디지털", naver: "발행완료", google: "작성중", image: "완료", keywords: ["SNS", "계정보호", "DM"] },
  { id: "pub-20260626-001", date: "2026-06-26", originalTitle: "여름철 물놀이 안전수칙, 아이를 절대 혼자 두지 마세요", category: "안전", naver: "발행완료", google: "미작성", image: "완료", keywords: ["물놀이", "안전수칙"] },
];

export const draftQueueTitles = [
  { id: "draft-001", date: "미발행", originalTitle: "초등학생 체육복 관리와 세탁 습관", category: "성장/위생", naver: "미발행", google: "미발행", image: "대기", keywords: ["체육복", "세탁", "위생"] },
  { id: "draft-002", date: "미발행", originalTitle: "초등학생 여름철 두피 냄새 관리와 머리 감기 습관", category: "성장/위생", naver: "미발행", google: "미발행", image: "대기", keywords: ["두피냄새", "머리감기"] },
  { id: "draft-003", date: "미발행", originalTitle: "초등학생 발 냄새 관리, 양말과 운동화 습관부터 시작해요", category: "성장/위생", naver: "미발행", google: "미발행", image: "대기", keywords: ["발냄새", "양말", "운동화"] },
];

export function allOriginalItems() {
  return [...originalPublishedTitles, ...draftQueueTitles];
}

export function findOriginalTitles(query: string) {
  const q = query.trim().toLowerCase();
  const all = allOriginalItems();
  if (!q) return all;
  return all.filter((item) =>
    [item.originalTitle, item.category, item.date, item.naver, item.google, item.image, ...item.keywords]
      .join(" ")
      .toLowerCase()
      .includes(q)
  );
}
