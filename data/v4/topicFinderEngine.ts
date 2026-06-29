export type FoundTopic = {
  title: string;
  grade: "S" | "A" | "B";
  stars: "★★★★★" | "★★★★☆" | "★★★☆☆";
  reason: string;
  intent: string;
  duplicateRisk: "낮음" | "중간" | "높음";
};

const topicBank: Record<string, FoundTopic[]> = {
  "디지털학습": [
    { title: "초등학생 디지털 학습, 종이학습지와 태블릿 중 무엇이 좋을까요?", grade: "S", stars: "★★★★★", reason: "부모 검색 의도가 강하고 클릭률이 높은 비교형 주제입니다.", intent: "학습지 vs 태블릿 선택", duplicateRisk: "낮음" },
    { title: "초3 디지털 교과서 준비, 집에서 먼저 잡아야 할 학습 습관", grade: "S", stars: "★★★★★", reason: "2026 교육 흐름과 연결되는 계절성·정보성 주제입니다.", intent: "디지털 교육 준비", duplicateRisk: "낮음" },
    { title: "초등학생 태블릿 학습 시간, 하루 몇 분이 적당할까요?", grade: "A", stars: "★★★★☆", reason: "실제 부모가 자주 검색하는 시간관리형 주제입니다.", intent: "사용시간 기준", duplicateRisk: "낮음" },
    { title: "초등학생 온라인 학습 집중력 떨어질 때 부모가 바꿔야 할 환경", grade: "A", stars: "★★★★☆", reason: "공감형 도입과 체크리스트 확장이 좋습니다.", intent: "집중력 개선", duplicateRisk: "낮음" },
    { title: "AI 학습 앱 초등학생에게 괜찮을까요? 부모가 확인할 기준", grade: "A", stars: "★★★★☆", reason: "AI 학습 관심도와 광고 친화성이 높습니다.", intent: "AI 학습앱 선택", duplicateRisk: "중간" },
  ],
  "위생": [
    { title: "초등학생 운동 후 땀 관리와 옷 갈아입기 습관", grade: "S", stars: "★★★★★", reason: "체취·속옷 글과 이어지지만 중복이 낮은 실천 주제입니다.", intent: "운동 후 위생", duplicateRisk: "낮음" },
    { title: "초등학생 발 냄새 관리, 양말과 운동화 습관부터 시작해요", grade: "S", stars: "★★★★★", reason: "부모 검색량이 높고 생활형 해결책이 명확합니다.", intent: "발 냄새 해결", duplicateRisk: "낮음" },
  ],
};

const fallback: FoundTopic[] = [
  { title: "초등학생 학습 루틴, 집에서 무너지지 않게 만드는 방법", grade: "A", stars: "★★★★☆", reason: "범용 검색 의도가 높은 학습 습관 주제입니다.", intent: "학습 루틴", duplicateRisk: "낮음" },
  { title: "초등학생 부모가 꼭 정해야 할 스마트폰 가족 규칙", grade: "S", stars: "★★★★★", reason: "디지털·생활습관 카테고리 모두 확장 가능합니다.", intent: "스마트폰 규칙", duplicateRisk: "낮음" },
  { title: "초등학생 친구관계 변화, 부모가 눈치채야 할 신호", grade: "A", stars: "★★★★☆", reason: "공감형 주제로 클릭률이 안정적입니다.", intent: "친구관계 고민", duplicateRisk: "중간" },
];

export function findSeoTopics(keyword: string) {
  const clean = keyword.replace(/\s+/g, "").trim();
  if (!clean) return [];

  const direct = Object.entries(topicBank).find(([key]) => clean.includes(key) || key.includes(clean));
  if (direct) return direct[1];

  return fallback.map((item) => ({
    ...item,
    title: item.title.replace("초등학생", `초등학생 ${keyword}`),
    reason: `"${keyword}" 키워드에서 확장한 추천 주제입니다.`,
  }));
}
