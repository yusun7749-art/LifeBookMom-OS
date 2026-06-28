export const lifebookmomSeoEngine = {
  project: "Project033.2",
  title: "SEO 5등급 추천 엔진",
  lock: true,
  grades: [
    { grade: "S", stars: "★★★★★", rule: "검색량 높음, 클릭률 높음, 경쟁도 적정, 부모 검색 의도 명확, 기존글 유사도 낮음" },
    { grade: "A", stars: "★★★★☆", rule: "검색량과 클릭률이 안정적이며 생활백서맘 주제 흐름에 적합" },
    { grade: "B", stars: "★★★☆☆", rule: "추천 금지" },
    { grade: "C", stars: "★★☆☆☆", rule: "추천 금지" },
    { grade: "D", stars: "★☆☆☆☆", rule: "추천 금지" },
  ],
};

export function buildSeoEngineText() {
  return `[SEO 추천 엔진 LOCK]

주제와 제목은 SEO 5등급 기준으로 판단한다.

검사 항목:
- 검색량
- 클릭률 예상
- 경쟁도
- 계절성
- 부모 검색 의도
- 기존 작성글 유사도

생성 조건:
- S등급 또는 A등급만 사용한다.
- B등급 이하는 추천하지 않는다.
- 클릭률이 낮을 제목은 폐기한다.
- 말만 바꾼 중복 제목은 폐기한다.
- 감성 주제는 제목 아래 소제목으로만 출력한다.
- '감성주제'라는 라벨은 출력하지 않는다.`;
}
