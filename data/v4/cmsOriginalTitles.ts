export const originalPublishedTitles = [
  {
    date: "2026-06-29",
    originalTitle: "초등학생 속옷 교체 시기와 위생 습관, 부모가 꼭 알려줘야 할 생활습관",
    category: "성장/위생",
    naver: "발행완료",
    google: "발행완료",
    image: "재검토 필요",
    memo: "이미지 규칙 미준수 사례 확인",
    keywords: ["속옷교체", "위생습관", "성장", "생활습관"],
  },
  {
    date: "2026-06-28",
    originalTitle: "초등학생 체취 변화, 부모가 꼭 알아야 할 원인과 관리법",
    category: "성장",
    naver: "발행완료",
    google: "발행완료",
    image: "완료",
    memo: "체취 주제 완료. 유사 주제 추천 금지",
    keywords: ["체취", "땀냄새", "성장기", "위생", "샤워습관"],
  },
  {
    date: "2026-06-28",
    originalTitle: "초3 사춘기 신호, 부모가 가장 먼저 알아야 할 변화",
    category: "성장",
    naver: "발행완료",
    google: "발행완료",
    image: "완료",
    memo: "사춘기 주제 완료. 말만 바꾼 유사 주제 추천 금지",
    keywords: ["사춘기", "감정변화", "친구관계", "부모대화"],
  },
  {
    date: "2026-06-27",
    originalTitle: "초3 여드름 원인과 관리법",
    category: "성장/건강",
    naver: "발행완료",
    google: "발행완료",
    image: "완료",
    memo: "여드름 주제 완료",
    keywords: ["여드름", "피부", "세안", "위생"],
  },
  {
    date: "2026-06-27",
    originalTitle: "초등학생 SNS 안전하게 사용하는 방법",
    category: "디지털",
    naver: "발행완료",
    google: "작성중",
    image: "완료",
    memo: "Google 보완 필요",
    keywords: ["SNS", "계정보호", "DM", "친구추가", "공개범위"],
  },
  {
    date: "2026-06-26",
    originalTitle: "여름철 물놀이 안전수칙, 아이를 절대 혼자 두지 마세요",
    category: "안전",
    naver: "발행완료",
    google: "미작성",
    image: "완료",
    memo: "Google 작성 필요",
    keywords: ["물놀이", "구명조끼", "방수팩", "안전수칙"],
  },
];

export function findOriginalTitles(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return originalPublishedTitles;
  return originalPublishedTitles.filter((item) =>
    [item.originalTitle, item.category, item.memo, ...item.keywords]
      .join(" ")
      .toLowerCase()
      .includes(q)
  );
}
