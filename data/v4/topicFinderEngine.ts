export type FoundTopic = {
  title: string;
  grade: "S" | "A" | "B";
  stars: "★★★★★" | "★★★★☆" | "★★★☆☆";
  reason: string;
  intent: string;
  duplicateRisk: "낮음" | "중간" | "높음";
};

const banks: { keys: string[]; topics: FoundTopic[] }[] = [
  {
    keys: ["폭력", "때림", "친구때린", "친구 때린", "학교폭력", "괴롭힘"],
    topics: [
      { title: "초등학생이 친구를 때렸을 때 부모가 가장 먼저 해야 할 일", grade: "S", stars: "★★★★★", reason: "부모가 실제로 검색하는 긴급 고민형 제목입니다.", intent: "학교생활 문제 대처", duplicateRisk: "낮음" },
      { title: "학교에서 친구를 때린 아이, 혼내기 전에 확인해야 할 원인", grade: "S", stars: "★★★★★", reason: "공감형 도입과 해결형 정보가 모두 가능합니다.", intent: "행동 원인 파악", duplicateRisk: "낮음" },
      { title: "초등학생 친구 갈등과 학교폭력의 차이, 부모가 알아야 할 기준", grade: "S", stars: "★★★★★", reason: "학교폭력 검색 유입과 신뢰형 콘텐츠에 모두 맞습니다.", intent: "학교폭력 기준", duplicateRisk: "낮음" },
      { title: "친구를 때리는 아이, 훈육보다 먼저 필요한 부모 대화법", grade: "A", stars: "★★★★☆", reason: "생활백서맘 말투와 잘 맞는 상담형 주제입니다.", intent: "부모 대화법", duplicateRisk: "낮음" },
      { title: "학교폭력 연락을 받았을 때 부모가 차분히 확인할 체크리스트", grade: "A", stars: "★★★★☆", reason: "체크리스트·FAQ·표 확장이 좋습니다.", intent: "부모 체크리스트", duplicateRisk: "낮음" },
    ],
  },
  {
    keys: ["디지털", "디지털학습", "태블릿", "AI학습", "온라인학습"],
    topics: [
      { title: "초등학생 디지털 학습, 종이학습지와 태블릿 중 무엇이 좋을까요?", grade: "S", stars: "★★★★★", reason: "비교형 검색 의도가 강하고 수익 연결이 좋습니다.", intent: "학습 방식 비교", duplicateRisk: "낮음" },
      { title: "초3 디지털 교과서 준비, 집에서 먼저 잡아야 할 학습 습관", grade: "S", stars: "★★★★★", reason: "교육 흐름과 연결되는 승인형 주제입니다.", intent: "디지털 교육 준비", duplicateRisk: "낮음" },
      { title: "초등학생 태블릿 학습 시간, 하루 몇 분이 적당할까요?", grade: "A", stars: "★★★★☆", reason: "실제 부모 질문형 제목입니다.", intent: "사용시간 기준", duplicateRisk: "낮음" },
    ],
  },
  {
    keys: ["수족구", "등교", "격리"],
    topics: [
      { title: "수족구 걸리면 학교 보내도 될까요? 초등학생 등교 기준", grade: "S", stars: "★★★★★", reason: "현재 실제 유입이 확인된 핵심 주제입니다.", intent: "등교 기준", duplicateRisk: "중간" },
      { title: "수족구 격리기간은 며칠일까요? 부모가 확인할 기준", grade: "S", stars: "★★★★★", reason: "수족구 클러스터 확장에 좋습니다.", intent: "격리기간", duplicateRisk: "낮음" },
      { title: "수족구 형제자매 전염 막는 집안 소독과 생활수칙", grade: "A", stars: "★★★★☆", reason: "쿠팡 제품 연결과 내부링크가 자연스럽습니다.", intent: "가정 내 전염 예방", duplicateRisk: "낮음" },
    ],
  },
];

const fallback: FoundTopic[] = [
  { title: "초등학생 부모가 실제로 많이 묻는 생활 고민 정리", grade: "B", stars: "★★★☆☆", reason: "키워드 의미가 명확하지 않아 범용 주제로 분류했습니다.", intent: "범용", duplicateRisk: "중간" },
];

export function findSeoTopics(keyword: string) {
  const clean = keyword.replace(/\s+/g, "").toLowerCase().trim();
  if (!clean) return [];

  const hit = banks.find((bank) => bank.keys.some((key) => clean.includes(key.replace(/\s+/g, "").toLowerCase()) || key.replace(/\s+/g, "").toLowerCase().includes(clean)));
  if (hit) return hit.topics;

  return fallback.map((item) => ({
    ...item,
    title: `"${keyword}" 관련 초등 학부모 고민, 부모가 먼저 확인할 기준`,
    reason: "임의로 단어를 붙이지 않고 부모 질문형으로 안전하게 변환했습니다.",
  }));
}
