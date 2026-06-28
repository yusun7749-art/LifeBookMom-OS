export const osMeta = {
  project: "Project024.2",
  title: "생활백서맘 운영본부",
  subtitle: "운영자가 바로 이해할 수 있는 한글 중심 운영체제",
  branch: "project023-os-core",
  version: "운영체제 v2.4.2",
  status: "사용 가능",
  commitLabel: "Project024.2 Korean UI",
  purpose: "글쓰기, 운영 기준, 통계, 수익관리, 자동화, 저장소 관리를 한 화면에서 쉽게 확인합니다.",
};

export const koreanUILock = {
  id: "LOCK-007",
  title: "쉬운 용어 원칙",
  rule: "운영본부는 개발자가 아니라 운영자가 사용하는 프로그램이다. 화면은 한글을 기본으로 하고, 초등학생 학부모도 10초 안에 이해할 수 있어야 한다.",
};

export const statusText = {
  READY: "사용 가능",
  BUILDING: "개발 중",
  DONE: "완료",
  FAIL: "오류",
  WARNING: "주의",
  LOCKED: "잠금",
  ACTIVE: "사용 중",
};

export const osQuickActions = [
  { icon: "📝", title: "글쓰기", href: "/content-studio", desc: "생활백서맘 네이버·구글 글 작성" },
  { icon: "🧭", title: "오늘 할 일", href: "/navigator-core", desc: "오늘 작업과 우선순위 확인" },
  { icon: "📊", title: "운영현황", href: "/dashboard", desc: "운영 상태와 다음 작업 확인" },
  { icon: "🤖", title: "자동화", href: "/automation-hub", desc: "검사, 백업, 발행 흐름 관리" },
];

export const osCenters = [
  { group: "운영 기준", items: [
    { title: "운영헌법", href: "/constitution-center", status: "잠금" },
    { title: "결정기록", href: "/decision-center", status: "사용 중" },
    { title: "버전관리", href: "/version-center", status: "사용 중" },
    { title: "복구", href: "/recovery-center", status: "사용 가능" },
  ]},
  { group: "콘텐츠 운영", items: [
    { title: "글쓰기", href: "/content-studio", status: "사용 가능" },
    { title: "콘텐츠창고", href: "/cms-hub", status: "사용 가능" },
    { title: "작업순서", href: "/workflow-center", status: "사용 가능" },
    { title: "이미지창고", href: "/media-center", status: "사용 가능" },
  ]},
  { group: "성장 운영", items: [
    { title: "오늘 할 일", href: "/navigator-core", status: "사용 가능" },
    { title: "통계", href: "/analytics-hub", status: "사용 가능" },
    { title: "수익관리", href: "/revenue-center", status: "사용 가능" },
    { title: "자동화", href: "/automation-hub", status: "사용 가능" },
  ]},
  { group: "관리", items: [
    { title: "운영현황", href: "/dashboard", status: "사용 가능" },
    { title: "환경설정", href: "/settings-center", status: "사용 가능" },
    { title: "명령센터", href: "/command-center", status: "사용 가능" },
    { title: "일정관리", href: "/schedule-center", status: "사용 가능" },
  ]},
];

export const naverChecklist = [
  "제목 1개만 출력",
  "본문은 네이버 전용",
  "부모 체크리스트 포함",
  "추천템 별점·점수 미출력",
  "자주 묻는 질문 5개",
  "해시태그 30개 한 줄",
  "쿠팡 고지문 마지막 한 줄",
];

export const todayMissions = [
  { title: "글쓰기 출력 확인", priority: "높음", desc: "생활백서맘 말투와 복붙용 구조 확인" },
  { title: "추천상품 중복 방지", priority: "높음", desc: "브랜드명보다 해결책 중심 추천 확인" },
  { title: "이미지 워터마크 고정", priority: "높음", desc: "공식 생활백서맘 월계관 서명 확인" },
  { title: "운영현황 실제 데이터 연결", priority: "중간", desc: "저장소, 글쓰기, 통계, 수익 상태 연결" },
];

export const dashboardWidgets = [
  { title: "운영체제 상태", value: "사용 가능", desc: "Project024.2 한글 운영본부 적용" },
  { title: "글쓰기", value: "V4", desc: "네이버·구글 분리 운영" },
  { title: "오늘 할 일", value: "사용 가능", desc: "오늘 작업 허브" },
  { title: "콘텐츠창고", value: "사용 가능", desc: "콘텐츠 운영 허브" },
  { title: "통계", value: "사용 가능", desc: "조회수·대표글·리뉴얼 후보" },
  { title: "수익관리", value: "사용 가능", desc: "쿠팡·애드센스·애드포스트" },
  { title: "자동화", value: "사용 가능", desc: "검사·백업·발행 흐름" },
  { title: "저장소", value: "작업줄기", desc: "project023-os-core" },
];

export const settings = [
  "브랜드명: 생활백서맘",
  "공식 캐릭터: 리니",
  "워터마크: 월계관 + 생활백서맘 + 하트",
  "네이버 본문: 15pt 기준",
  "쿠팡 고지문: 마지막 한 줄",
  "추천상품 점수: 내부용만 사용",
  "구글 본문: 네이버와 분리",
  "삭제 금지: 보관함 사용",
];

export const revenueSources = [
  "쿠팡 파트너스",
  "네이버 애드포스트",
  "구글 애드센스",
  "전자책",
  "템플릿",
  "브랜드 확장",
];

export const automationJobs = [
  "네이버 출력 검사",
  "해시태그 30개 검사",
  "쿠팡 고지문 검사",
  "저장소 백업 확인",
  "발행 완료 기록",
  "일일 운영 보고",
];
