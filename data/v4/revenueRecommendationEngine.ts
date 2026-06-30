
"use client";

import { readCmsItems } from "./cmsStore";
import { recommended } from "./usableERP";

export type RevenueTopic = {
  title: string;
  intentKey: string;
  category: string;
  reason: string;
  relation: string;
  seoGrade: "S" | "A" | "B";
  trafficScore: number;
  approvalScore: number;
  coupangScore: number;
  seasonScore: number;
  totalScore: number;
  productHints: string[];
};

function normalize(value: string) {
  return value.replace(/\s+/g, "").replace(/[^\w가-힣]/g, "").toLowerCase();
}

function intentOf(title: string) {
  const t = normalize(title);

  if (t.includes("수족구") && (t.includes("등교") || t.includes("학교"))) return "수족구-등교";
  if (t.includes("수족구") && (t.includes("격리") || t.includes("기간"))) return "수족구-격리";
  if (t.includes("수족구") && (t.includes("소독") || t.includes("전염"))) return "수족구-소독전염";
  if (t.includes("로블록스") && t.includes("채팅")) return "로블록스-채팅차단";
  if (t.includes("로블록스") && (t.includes("결제") || t.includes("차단"))) return "로블록스-결제차단";
  if (t.includes("로블록스") && (t.includes("자녀보호") || t.includes("설정"))) return "로블록스-자녀보호";
  if ((t.includes("폭력") || t.includes("때렸") || t.includes("때린")) && t.includes("친구")) return "학교폭력-친구때림";
  if (t.includes("학교폭력") && t.includes("신호")) return "학교폭력-초기신호";
  if (t.includes("시력") || t.includes("눈")) return "건강-시력";
  if (t.includes("발냄새") || (t.includes("발") && t.includes("냄새"))) return "위생-발냄새";
  if (t.includes("속옷")) return "위생-속옷";
  if (t.includes("샤워")) return "위생-샤워";
  if (t.includes("물병")) return "위생-물병";
  if (t.includes("디지털") || t.includes("태블릿") || t.includes("ai학습")) return "교육-디지털학습";
  if (t.includes("보험")) return "수익-보험";
  if (t.includes("지원금") || t.includes("정부지원")) return "수익-정부지원";

  return normalize(title).slice(0, 18);
}

export const revenueTopicBank: RevenueTopic[] = [
  {
    title: "수족구 형제자매 전염 막는 집안 소독과 생활수칙",
    intentKey: "수족구-소독전염",
    category: "유입형",
    reason: "실제 유입 1위 수족구의 후속글이며 소독용품 추천이 자연스럽습니다.",
    relation: "수족구 → 형제전염 → 소독",
    seoGrade: "S",
    trafficScore: 98,
    approvalScore: 92,
    coupangScore: 88,
    seasonScore: 95,
    totalScore: 0,
    productHints: ["손소독제", "살균티슈", "체온계", "어린이 마스크"],
  },
  {
    title: "수족구 격리기간은 며칠일까요? 부모가 확인할 등교 기준",
    intentKey: "수족구-격리",
    category: "유입형",
    reason: "부모가 바로 검색하는 질문형 제목입니다.",
    relation: "수족구 → 격리기간 → 등교",
    seoGrade: "S",
    trafficScore: 96,
    approvalScore: 94,
    coupangScore: 65,
    seasonScore: 95,
    totalScore: 0,
    productHints: ["체온계", "구강케어", "어린이 물병"],
  },
  {
    title: "로블록스 채팅 차단 설정, 초등학생 부모가 꼭 확인할 것",
    intentKey: "로블록스-채팅차단",
    category: "유입형",
    reason: "실제 유입 상위 로블록스에서 검색 의도가 다른 후속글입니다.",
    relation: "로블록스 → 채팅차단 → 자녀보호",
    seoGrade: "S",
    trafficScore: 91,
    approvalScore: 82,
    coupangScore: 72,
    seasonScore: 70,
    totalScore: 0,
    productHints: ["키즈폰", "자녀보호앱", "블루라이트차단"],
  },
  {
    title: "로블록스 결제 차단 방법, 초등학생 계정 보호 설정",
    intentKey: "로블록스-결제차단",
    category: "유입형",
    reason: "채팅 차단과 겹치지 않는 결제 안전 검색 의도입니다.",
    relation: "로블록스 → 결제차단 → 계정보호",
    seoGrade: "S",
    trafficScore: 88,
    approvalScore: 82,
    coupangScore: 75,
    seasonScore: 70,
    totalScore: 0,
    productHints: ["자녀보호앱", "키즈폰", "보안용품"],
  },
  {
    title: "초등학생이 친구를 때렸을 때 부모가 가장 먼저 해야 할 일",
    intentKey: "학교폭력-친구때림",
    category: "승인형",
    reason: "학교폭력과 친구갈등 주제의 신뢰도를 높이는 깊이 있는 글입니다.",
    relation: "친구관계 → 때림 → 부모대처",
    seoGrade: "S",
    trafficScore: 86,
    approvalScore: 97,
    coupangScore: 35,
    seasonScore: 60,
    totalScore: 0,
    productHints: ["감정카드", "부모교육책", "상담노트"],
  },
  {
    title: "학교폭력 초기 신호, 초등학생 부모가 놓치기 쉬운 행동",
    intentKey: "학교폭력-초기신호",
    category: "승인형",
    reason: "검색형 체크리스트형으로 승인에 도움이 됩니다.",
    relation: "학교폭력 → 초기신호 → 체크리스트",
    seoGrade: "S",
    trafficScore: 84,
    approvalScore: 96,
    coupangScore: 30,
    seasonScore: 60,
    totalScore: 0,
    productHints: ["부모교육책", "상담노트"],
  },
  {
    title: "초등학생 시력 저하 막는 책상 조명과 독서 습관",
    intentKey: "건강-시력",
    category: "수익형",
    reason: "건강 정보와 스탠드 독서대 추천 연결이 자연스럽습니다.",
    relation: "시력 → 책상조명 → 독서환경",
    seoGrade: "A",
    trafficScore: 78,
    approvalScore: 90,
    coupangScore: 92,
    seasonScore: 70,
    totalScore: 0,
    productHints: ["LED스탠드", "독서대", "블루라이트차단안경"],
  },
  {
    title: "초등학생 물병 위생관리, 매일 씻어야 하는 이유",
    intentKey: "위생-물병",
    category: "승인형",
    reason: "생활형 정보와 쿠팡 전환이 함께 가능한 글입니다.",
    relation: "위생 → 물병 → 학교생활",
    seoGrade: "A",
    trafficScore: 76,
    approvalScore: 89,
    coupangScore: 86,
    seasonScore: 88,
    totalScore: 0,
    productHints: ["어린이 물병", "물병 세척솔", "살균건조대"],
  },
  {
    title: "초등학생 발 냄새가 심할 때 양말과 운동화부터 확인하세요",
    intentKey: "위생-발냄새",
    category: "수익형",
    reason: "실제 고민형 제목이며 양말 신발건조기 연결이 쉽습니다.",
    relation: "발냄새 → 양말 → 운동화",
    seoGrade: "A",
    trafficScore: 74,
    approvalScore: 85,
    coupangScore: 94,
    seasonScore: 86,
    totalScore: 0,
    productHints: ["기능성 양말", "신발건조기", "발세정제"],
  },
  {
    title: "초등학생 속옷은 매일 갈아입어야 할까요? 위생습관 기준",
    intentKey: "위생-속옷",
    category: "승인형",
    reason: "체취 샤워 속옷 클러스터를 이어주는 글입니다.",
    relation: "속옷 → 위생습관 → 성장기",
    seoGrade: "A",
    trafficScore: 70,
    approvalScore: 88,
    coupangScore: 83,
    seasonScore: 80,
    totalScore: 0,
    productHints: ["순면 속옷", "세탁망", "섬유세제"],
  },
  {
    title: "초등학생 디지털 학습, 종이학습지와 태블릿 중 무엇이 좋을까요?",
    intentKey: "교육-디지털학습",
    category: "수익형",
    reason: "교육 서비스와 학습기기 연결이 가능한 비교형 주제입니다.",
    relation: "디지털학습 → 학습지 → 태블릿",
    seoGrade: "S",
    trafficScore: 82,
    approvalScore: 83,
    coupangScore: 90,
    seasonScore: 75,
    totalScore: 0,
    productHints: ["태블릿 거치대", "터치펜", "학습지"],
  },
  {
    title: "어린이보험, 초등학생 부모가 처음 확인할 보장 기준",
    intentKey: "수익-보험",
    category: "수익형",
    reason: "부모 타깃과 맞는 고단가 수익형 확장 주제입니다.",
    relation: "부모절약 → 어린이보험 → 보장기준",
    seoGrade: "A",
    trafficScore: 72,
    approvalScore: 75,
    coupangScore: 20,
    seasonScore: 70,
    totalScore: 0,
    productHints: ["보험비교", "가계부", "서류파일"],
  },
];

function scoreTopic(topic: RevenueTopic) {
  return Math.round(topic.trafficScore * 0.35 + topic.approvalScore * 0.3 + topic.coupangScore * 0.25 + topic.seasonScore * 0.1);
}

export function getRevenueRecommendations(limit = 10) {
  const cmsItems = readCmsItems();
  const blockedTitles = new Set(
    cmsItems
      .filter((item) => item.status === "published" || item.status === "duplicate")
      .map((item) => normalize(item.title))
  );

  const usedIntents = new Set<string>();
  const raw = [
    ...revenueTopicBank,
    ...recommended.map((item) => ({
      title: item.title,
      intentKey: intentOf(item.title),
      category: "승인형",
      reason: item.reason,
      relation: item.relation,
      seoGrade: (item.seoGrade ?? "A") as "S" | "A" | "B",
      trafficScore: item.seoGrade === "S" ? 80 : 70,
      approvalScore: 78,
      coupangScore: 65,
      seasonScore: 65,
      totalScore: 0,
      productHints: [],
    })),
  ];

  return raw
    .map((item) => ({ ...item, intentKey: item.intentKey || intentOf(item.title), totalScore: scoreTopic(item) }))
    .sort((a, b) => b.totalScore - a.totalScore)
    .filter((item) => !blockedTitles.has(normalize(item.title)))
    .filter((item) => {
      if (usedIntents.has(item.intentKey)) return false;
      usedIntents.add(item.intentKey);
      return true;
    })
    .slice(0, limit);
}
