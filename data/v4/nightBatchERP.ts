export const nightBatchMeta = {
  project: "Project028",
  title: "야간 일괄 작성 모드",
  subtitle: "저녁 7시부터 새벽 사이에 하루치 글을 한 번에 열어두고 체크합니다.",
  version: "운영체제 v2.8.0",
};

export const dailyTargets = {
  naver: 10,
  google: 10,
  image: 10,
  publish: 20,
  workWindow: "저녁 7시 ~ 새벽",
  mode: "예약 발행용 일괄 작성",
};

export const batchQueue = [
  {
    slot: "01",
    title: "초등학생 속옷 교체 시기와 위생 습관",
    seoGrade: "S",
    relation: "체취 → 속옷 → 세탁 → 위생 루틴",
    duplicateRisk: "낮음",
    naver: "대기",
    google: "대기",
    image: "대기",
    publish: "미완료",
  },
  {
    slot: "02",
    title: "초등학생 샤워습관, 스스로 씻기 시작하는 방법",
    seoGrade: "S",
    relation: "체취 → 샤워습관 → 자기관리",
    duplicateRisk: "낮음",
    naver: "대기",
    google: "대기",
    image: "대기",
    publish: "미완료",
  },
  {
    slot: "03",
    title: "초등학생 생리 준비, 부모가 자연스럽게 알려주는 방법",
    seoGrade: "A",
    relation: "사춘기 → 몸 변화 → 생리 준비",
    duplicateRisk: "낮음",
    naver: "대기",
    google: "대기",
    image: "대기",
    publish: "미완료",
  },
  {
    slot: "04",
    title: "초등학생 친구관계 변화, 부모가 눈치채야 할 신호",
    seoGrade: "A",
    relation: "사춘기 → 친구관계 → 감정조절",
    duplicateRisk: "중간",
    naver: "대기",
    google: "대기",
    image: "대기",
    publish: "미완료",
  },
  {
    slot: "05",
    title: "초등학생 체육복 관리와 세탁 습관",
    seoGrade: "S",
    relation: "체취 → 체육복 → 세탁",
    duplicateRisk: "낮음",
    naver: "대기",
    google: "대기",
    image: "대기",
    publish: "미완료",
  },
  {
    slot: "06",
    title: "초등학생 장마철 신발 젖었을 때 관리법",
    seoGrade: "A",
    relation: "장마철 준비물 → 신발 관리",
    duplicateRisk: "낮음",
    naver: "대기",
    google: "대기",
    image: "대기",
    publish: "미완료",
  },
  {
    slot: "07",
    title: "초등학생 여름철 식중독 예방 생활수칙",
    seoGrade: "S",
    relation: "여름 건강 → 식중독 예방",
    duplicateRisk: "낮음",
    naver: "대기",
    google: "대기",
    image: "대기",
    publish: "미완료",
  },
  {
    slot: "08",
    title: "초등학생 방학 생활계획표 쉽게 지키는 방법",
    seoGrade: "A",
    relation: "방학 → 생활습관 → 자기관리",
    duplicateRisk: "낮음",
    naver: "대기",
    google: "대기",
    image: "대기",
    publish: "미완료",
  },
  {
    slot: "09",
    title: "초등학생 단체채팅방 예절, 부모가 알려줘야 할 말투",
    seoGrade: "A",
    relation: "SNS 안전 → 단체채팅방 예절",
    duplicateRisk: "낮음",
    naver: "대기",
    google: "대기",
    image: "대기",
    publish: "미완료",
  },
  {
    slot: "10",
    title: "초등학생 등교 전 아침 루틴 만드는 방법",
    seoGrade: "S",
    relation: "생활습관 → 등교 준비",
    duplicateRisk: "낮음",
    naver: "대기",
    google: "대기",
    image: "대기",
    publish: "미완료",
  },
];

export const batchSummary = [
  { label: "네이버 작성", current: 0, target: dailyTargets.naver },
  { label: "Google 작성", current: 0, target: dailyTargets.google },
  { label: "이미지 제작", current: 0, target: dailyTargets.image },
  { label: "예약/발행 준비", current: 0, target: dailyTargets.publish },
];

export function writeLink(title: string, mode: "naver" | "google" | "image") {
  return `/content-studio?topic=${encodeURIComponent(title)}&mode=${mode}`;
}


export const replacementQueue = [
  { title: "초등학생 운동 후 땀 관리와 옷 갈아입기 습관", seoGrade: "S", relation: "체취 → 운동 후 관리 → 생활습관", duplicateRisk: "낮음" },
  { title: "초등학생 여벌옷 준비, 학교생활에서 꼭 필요한 이유", seoGrade: "A", relation: "속옷 → 여벌옷 → 학교생활", duplicateRisk: "낮음" },
  { title: "초등학생 발 냄새 관리, 양말과 운동화 습관부터 시작해요", seoGrade: "S", relation: "체취 → 발 냄새 → 양말/운동화", duplicateRisk: "낮음" },
  { title: "초등학생 손 씻기 습관, 감염병 예방의 첫걸음", seoGrade: "S", relation: "위생 → 손 씻기 → 감염 예방", duplicateRisk: "낮음" },
  { title: "초등학생 물병 위생관리, 매일 씻어야 하는 이유", seoGrade: "A", relation: "학교생활 → 물병 → 위생", duplicateRisk: "낮음" },
];

export const taskLabels = {
  naver: "네이버 작성완료",
  google: "Google 작성완료",
  image: "이미지 완료",
  publish: "예약/발행완료",
};
