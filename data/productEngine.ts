export type ProductCandidate = {
  category: string;
  topicKeywords: string[];
  brand: string;
  productName: string;
  score: 3 | 4 | 5;
  reason: string;
};

export const productCandidates: ProductCandidate[] = [
  { category: "안전", topicKeywords: ["유괴", "미아", "등하교", "안전"], brand: "아텍스", productName: "어린이 미아방지 팔찌", score: 5, reason: "체험학습이나 놀이공원처럼 사람이 많은 곳에서 보호자 연락처를 남기기 좋아요." },
  { category: "안전", topicKeywords: ["유괴", "미아", "등하교", "안전"], brand: "카카오프렌즈", productName: "어린이 카드 목걸이", score: 5, reason: "비상 연락처를 넣어 다니기 편해 등하교나 현장학습 때 활용하기 좋아요." },
  { category: "안전", topicKeywords: ["유괴", "안전교육", "학교안전"], brand: "비룡소", productName: "어린이 안전교육 그림책", score: 4, reason: "초등학생도 부담 없이 읽기 좋고 부모와 안전 상황을 이야기하기 좋아요." },
  { category: "안전", topicKeywords: ["학교", "준비물", "분실", "유괴"], brand: "모닝글로리", productName: "어린이 이름 스티커", score: 4, reason: "학용품과 소지품을 쉽게 구분하고 분실을 줄이는 데 도움이 돼요." },
  { category: "감정", topicKeywords: ["복통", "불안", "스트레스", "감정", "학교가기싫어요"], brand: "핑크풋", productName: "어린이 감정일기", score: 5, reason: "하루의 기분을 적으며 감정을 표현하는 연습을 할 수 있어요." },
  { category: "감정", topicKeywords: ["복통", "불안", "심리", "친구", "거절"], brand: "비룡소", productName: "어린이 심리 그림책", score: 4, reason: "불안과 감정을 아이 눈높이에 맞춰 이해하는 데 도움이 돼요." },
  { category: "감정", topicKeywords: ["복통", "배아픔"], brand: "아텍스", productName: "어린이 온열 찜질팩", score: 4, reason: "가벼운 복부 불편감을 따뜻하게 완화하는 데 도움이 될 수 있어요." },
  { category: "생활", topicKeywords: ["물병", "수분", "학교생활"], brand: "락앤락", productName: "키즈 물병", score: 5, reason: "학교에서 사용하기 편하고 수분 섭취 습관을 만들기 좋아요." },
  { category: "디지털", topicKeywords: ["스마트폰", "쇼츠", "로블록스", "게임"], brand: "드레텍", productName: "디지털 타이머", score: 5, reason: "사용 시간을 눈으로 확인하며 약속을 지키는 데 도움이 돼요." },
  { category: "디지털", topicKeywords: ["스마트폰", "쇼츠", "게임"], brand: "블루엘리펀트", productName: "어린이 블루라이트 차단 안경", score: 4, reason: "화면을 오래 볼 때 눈 피로를 줄이는 데 도움이 될 수 있어요." },
  { category: "경제", topicKeywords: ["용돈", "통장", "저축", "경제"], brand: "핑크풋", productName: "어린이 용돈기입장", score: 5, reason: "수입과 지출을 직접 기록하며 돈의 흐름을 익히기 좋아요." },
  { category: "경제", topicKeywords: ["용돈", "통장", "저축"], brand: "아이코닉", productName: "저축 저금통", score: 4, reason: "통장과 함께 저축 습관을 재미있게 시작할 수 있어요." },
  { category: "교육", topicKeywords: ["독서", "공부", "학습"], brand: "비룡소", productName: "초등 추천 도서", score: 5, reason: "초등학생 눈높이에 맞는 책을 고르기 좋아 독서 습관 형성에 도움이 돼요." },
  { category: "교육", topicKeywords: ["독서", "공부", "학습"], brand: "시공주니어", productName: "초등학생 독서 기록장", score: 4, reason: "읽은 책을 기록하며 성취감을 느끼는 데 도움이 돼요." },
];

export function getRecommendedProducts(topic: string, limit = 4) {
  const cleanTopic = topic.toLowerCase();
  const scored = productCandidates
    .map((item) => {
      const hit = item.topicKeywords.some((k) => cleanTopic.includes(k.toLowerCase()));
      return { ...item, weight: (hit ? 10 : 0) + item.score };
    })
    .sort((a, b) => b.weight - a.weight)
    .slice(0, limit);

  return scored.map((item) => ({
    ...item,
    displayLine: `👉 [링크삽입] ${item.brand} ${item.productName}`,
  }));
}
