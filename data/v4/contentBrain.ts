export type PublishStatus = "발행완료" | "작성중" | "미작성" | "보류";

export const publishedContents = [
  {
    title: "초등학생 체취 변화, 부모가 꼭 알아야 할 원인과 관리법",
    category: "성장",
    keywords: ["체취", "땀냄새", "성장기", "위생", "샤워습관"],
    date: "2026-06-28",
    naver: "발행완료",
    google: "발행완료",
    image: "완료",
    summary: "성장기 체취 변화와 집에서 도와줄 수 있는 위생 습관",
  },
  {
    title: "초3 사춘기 신호, 부모가 가장 먼저 알아야 할 변화",
    category: "성장",
    keywords: ["사춘기", "감정변화", "방문닫기", "친구관계", "부모대화"],
    date: "2026-06-28",
    naver: "발행완료",
    google: "발행완료",
    image: "완료",
    summary: "초3 무렵 보이는 감정 변화와 부모 대화법",
  },
  {
    title: "초3 여드름 원인과 관리법",
    category: "성장",
    keywords: ["여드름", "피부", "세안", "사춘기", "위생"],
    date: "2026-06-27",
    naver: "발행완료",
    google: "발행완료",
    image: "완료",
    summary: "초등학생 여드름 초기 신호와 순한 관리법",
  },
  {
    title: "초등학생 SNS 안전하게 사용하는 방법",
    category: "디지털",
    keywords: ["SNS", "계정보호", "DM", "친구추가", "공개범위"],
    date: "2026-06-27",
    naver: "발행완료",
    google: "작성중",
    image: "완료",
    summary: "초등학생 SNS 계정 보호와 부모 설정 가이드",
  },
  {
    title: "여름철 물놀이 안전수칙, 아이를 절대 혼자 두지 마세요",
    category: "안전",
    keywords: ["물놀이", "구명조끼", "방수팩", "아쿠아슈즈", "안전수칙"],
    date: "2026-06-26",
    naver: "발행완료",
    google: "미작성",
    image: "완료",
    summary: "여름 물놀이 전 부모가 확인해야 할 안전수칙",
  },
];

export const contentMap = [
  {
    group: "성장",
    done: ["체취", "사춘기", "여드름"],
    todo: ["속옷 교체", "샤워습관", "생리 준비", "키성장", "체육복 관리", "친구관계 변화"],
  },
  {
    group: "디지털",
    done: ["SNS 안전"],
    todo: ["단체채팅방 예절", "스마트폰 가족규칙", "게임 시간", "유튜브 시청 규칙"],
  },
  {
    group: "안전",
    done: ["물놀이"],
    todo: ["횡단보도", "유괴 예방", "장마철 준비물", "참진드기", "등하교 안전"],
  },
];

export const blockedRecommendations = [
  "초등학생 체취 변화",
  "초3 사춘기 신호",
  "초3 여드름",
  "초등학생 SNS 안전",
  "여름철 물놀이 안전수칙",
];

export const nextRecommendations = [
  {
    title: "초등학생 속옷 교체 시기와 위생 습관",
    reason: "체취 글과 이어지지만 내용이 겹치지 않고 실천 주제가 다릅니다.",
    relation: "체취 → 속옷 → 세탁 → 위생 루틴",
    duplicateRisk: "낮음",
  },
  {
    title: "초등학생 샤워습관, 스스로 씻기 시작하는 방법",
    reason: "체취 주제의 다음 단계이며 생활습관 중심이라 중복이 적습니다.",
    relation: "체취 → 샤워습관 → 자기관리",
    duplicateRisk: "낮음",
  },
  {
    title: "초등학생 친구관계 변화, 부모가 눈치채야 할 신호",
    reason: "사춘기 감정 글과 연결되지만 친구관계 중심으로 확장됩니다.",
    relation: "사춘기 → 친구관계 → 감정조절",
    duplicateRisk: "중간",
  },
  {
    title: "초등학생 생리 준비, 부모가 자연스럽게 알려주는 방법",
    reason: "성장 시리즈의 미작성 핵심 주제입니다.",
    relation: "사춘기 → 몸 변화 → 생리 준비",
    duplicateRisk: "낮음",
  },
];

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[.,!?'"“”‘’()\[\]{}]/g, "");
}

export function checkDuplicateTopic(input: string) {
  const normalized = normalize(input);
  const results = publishedContents.map((item) => {
    const titleScore = normalize(item.title).includes(normalized) || normalized.includes(normalize(item.title).slice(0, 8)) ? 60 : 0;
    const keywordScore = item.keywords.reduce((score, keyword) => {
      return normalized.includes(normalize(keyword)) ? score + 12 : score;
    }, 0);
    const score = Math.min(100, titleScore + keywordScore);
    return { ...item, similarity: score };
  }).filter((item) => item.similarity >= 24)
    .sort((a, b) => b.similarity - a.similarity);

  return {
    input,
    duplicate: results.some((item) => item.similarity >= 72),
    results,
  };
}
