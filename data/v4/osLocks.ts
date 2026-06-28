export const osLocks = {
  project: "Project024.1",
  title: "OS Core Refactor",
  status: "LOCKED",
  locks: [
    {
      id: "LOCK-001",
      name: "Output Gate",
      rule: "출력 전 헌법, 브랜드, 문체, 제목, SEO, 가독성, 모바일 여백, AI문체, 추천상품 검사를 통과해야 한다.",
    },
    {
      id: "LOCK-002",
      name: "Style Guard",
      rule: "생활백서맘 문체가 아니면 출력하지 않는다. 설명체, 강의체, 정보 나열형을 금지한다.",
    },
    {
      id: "LOCK-003",
      name: "Product Intelligence V2",
      rule: "브랜드명 중심 추천이 아니라 해결책 카테고리 중심으로 추천한다. 최근 20개 글 중복 상품은 제외한다.",
    },
    {
      id: "LOCK-004",
      name: "Image Guard",
      rule: "공식 생활백서맘 월계관 워터마크만 사용한다. 우측 하단, 생활백서맘, 분홍 하트, 비율 고정.",
    },
    {
      id: "LOCK-005",
      name: "Brand Assets",
      rule: "생활백서맘, 리니, Character Bible, 워터마크, 수채화, 크림 배경, 세로형 10컷, 초3 여자아이 기준은 LOCK.",
    },
    {
      id: "LOCK-006",
      name: "Output QA",
      rule: "제목, 본문, FAQ, 추천상품, 해시태그, 쿠팡고지문, 문체, 여백, AI문체, 중복상품 검사 후 PASS만 출력한다.",
    },
  ],
};
