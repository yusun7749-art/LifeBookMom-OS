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
    keys: ["폭력", "때림", "친구때린", "친구 때린", "학교폭력", "괴롭힘", "친구패"],
    topics: [
      { title: "초등학생이 친구를 때렸을 때 부모가 가장 먼저 해야 할 일", grade: "S", stars: "★★★★★", reason: "부모가 실제로 검색하는 긴급 고민형 제목입니다.", intent: "학교생활 문제 대처", duplicateRisk: "낮음" },
      { title: "학교에서 친구를 때린 아이, 혼내기 전에 확인해야 할 원인", grade: "S", stars: "★★★★★", reason: "공감형 도입과 해결형 정보가 모두 가능합니다.", intent: "행동 원인 파악", duplicateRisk: "낮음" },
      { title: "초등학생 친구 갈등과 학교폭력의 차이, 부모가 알아야 할 기준", grade: "S", stars: "★★★★★", reason: "학교폭력 검색 유입과 신뢰형 콘텐츠에 모두 맞습니다.", intent: "학교폭력 기준", duplicateRisk: "낮음" },
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
  {
    keys: ["발냄새", "냄새", "체취", "샤워", "속옷", "위생"],
    topics: [
      { title: "아이 발에서 냄새가 심해요, 양말과 운동화부터 확인하세요", grade: "S", stars: "★★★★★", reason: "부모 질문형 유입 제목입니다.", intent: "위생 문제 해결", duplicateRisk: "낮음" },
      { title: "초등학생 속옷은 매일 갈아입어야 할까요? 위생습관 기준", grade: "A", stars: "★★★★☆", reason: "승인형 생활정보로 좋습니다.", intent: "위생 습관", duplicateRisk: "낮음" },
      { title: "초등학생은 매일 샤워해야 하나요? 부모가 정해줄 생활 기준", grade: "A", stars: "★★★★☆", reason: "검색형 질문 제목입니다.", intent: "샤워 습관", duplicateRisk: "낮음" },
    ],
  },
];

function safeFallback(keyword: string): FoundTopic[] {
  return [
    { title: `${keyword}, 초등학생 부모가 먼저 확인해야 할 기준`, grade: "A", stars: "★★★★☆", reason: "검색어를 억지로 붙이지 않고 부모 질문형으로 변환했습니다.", intent: "부모 고민 해결", duplicateRisk: "낮음" },
    { title: `${keyword} 때문에 걱정될 때, 초등학생 부모가 할 수 있는 대처법`, grade: "A", stars: "★★★★☆", reason: "공감형 도입과 체크리스트 확장이 가능합니다.", intent: "대처법", duplicateRisk: "낮음" },
    { title: `${keyword} 관련 초등학생 생활습관 체크리스트`, grade: "B", stars: "★★★☆☆", reason: "범용 주제이지만 승인형 글로 확장 가능합니다.", intent: "체크리스트", duplicateRisk: "중간" },
  ];
}

export function findSeoTopics(keyword: string) {
  const clean = keyword.replace(/\s+/g, "").toLowerCase().trim();
  if (!clean) return [];

  const hit = banks.find((bank) => bank.keys.some((key) => clean.includes(key.replace(/\s+/g, "").toLowerCase()) || key.replace(/\s+/g, "").toLowerCase().includes(clean)));
  if (hit) return hit.topics;

  return safeFallback(keyword.trim());
}
