export const productIntelligenceV2 = {
  project: "Project024.1",
  mode: "solution-category-first",
  rule: "브랜드가 아니라 부모가 실제로 필요한 해결책 카테고리를 추천한다.",
  recentDuplicateLimit: 20,
  topicMap: [
    { topic: "사춘기", categories: ["감정카드", "부모대화카드", "스트레스볼", "상담노트", "사춘기 부모교육 책"] },
    { topic: "횡단보도", categories: ["LED 반사 키링", "어린이 안전우산", "가방 반사 스티커", "어린이 위치추적기"] },
    { topic: "참진드기", categories: ["진드기 기피제", "긴 양말", "야외 모자", "긴팔 냉감 티셔츠"] },
    { topic: "여드름", categories: ["순한 클렌저", "여드름 패치", "세안밴드", "저자극 수건"] },
    { topic: "물놀이", categories: ["어린이 구명조끼", "방수팩", "아쿠아슈즈", "방수 이름스티커"] },
    { topic: "준비물", categories: ["방수 이름스티커", "어린이 물병", "보조가방", "알림장 파일"] },
  ],
};

export function recommendProductCategories(topic: string, recentUsed: string[] = []) {
  const found = productIntelligenceV2.topicMap.find((item) => topic.includes(item.topic));
  const categories = found?.categories ?? ["문제 해결용품", "부모 도움 도구", "아이 생활습관 도구"];
  return categories.filter((category) => !recentUsed.includes(category)).slice(0, 3);
}
