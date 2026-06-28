// Project009-12
// Enterprise Orchestrator
// LifeBookMom OS의 중앙 지휘실

import { analyzeContentTopic, buildContentEnginePrompt } from "./contentIntelligence";
import { buildCoupangRecommendationBlock, recommendAutoProducts } from "./autoProductRecommendation";

export type OrchestratorPlan = {
  topic: string;
  category: string;
  season: string;
  gradeFit: number;
  priorityScore: number;
  naverSeoTitle: string;
  googleSeoTitle: string;
  productCount: number;
  qualityScore: number;
  brandCheck: string;
  nextAction: string;
  publishingReady: {
    naver: boolean;
    google: boolean;
    faq: boolean;
    product: boolean;
    image: boolean;
    hashtag: boolean;
  };
  prompt: string;
  productBlock: string;
};

export const orchestratorMeta = {
  project: "Project009-12",
  title: "Enterprise Orchestrator",
  version: "ORCHESTRATOR_v1.0",
  role: "Content Intelligence, Product Intelligence, Brand Center, Workflow Bus를 연결하는 AI Director",
  principle:
    "선장님은 주제만 입력하고, OS는 콘텐츠 제작에 필요한 판단과 준비물을 자동으로 정리한다.",
};

export const orchestratorRules = [
  "초등학교 3~4학년 기준을 기본값으로 한다.",
  "Brand Center의 리니 Character Bible과 Image Style Guide를 우선 적용한다.",
  "추천상품은 Product Intelligence 기준을 통과한 것만 사용한다.",
  "핑크퐁, 뽀로로, 타요, 아기상어 등 유아 전용 상품은 추천하지 않는다.",
  "완료 여부가 확인되지 않은 작업은 완료로 기록하지 않는다.",
  "출력물은 네이버, Google, 이미지, FAQ, 쿠팡 추천, 해시태그까지 이어질 수 있어야 한다.",
];

export function calculateQualityScore(gradeFit: number, priorityScore: number, productCount: number) {
  const productScore = productCount > 0 ? 96 : 70;
  const brandScore = 100;
  return Math.round(gradeFit * 0.25 + priorityScore * 0.35 + productScore * 0.2 + brandScore * 0.2);
}

export function buildOrchestratorPlan(topic: string): OrchestratorPlan {
  const analyzed = analyzeContentTopic(topic);
  const products = recommendAutoProducts(topic, analyzed.season);
  const prompt = buildContentEnginePrompt(topic);
  const productBlock = buildCoupangRecommendationBlock(topic, analyzed.season);
  const qualityScore = calculateQualityScore(analyzed.gradeFit, analyzed.priorityScore, products.length);

  return {
    topic,
    category: analyzed.category,
    season: analyzed.season,
    gradeFit: analyzed.gradeFit,
    priorityScore: analyzed.priorityScore,
    naverSeoTitle: analyzed.naverSeoTitle,
    googleSeoTitle: analyzed.googleSeoTitle,
    productCount: products.length,
    qualityScore,
    brandCheck: "Brand Center / 리니 / 워터마크 / 초3~4 기준 적용 필요",
    nextAction:
      qualityScore >= 90
        ? "Content Engine 실행 후 네이버·Google 본문 생성"
        : "주제 또는 추천상품 기준 재검토",
    publishingReady: {
      naver: true,
      google: true,
      faq: true,
      product: products.length > 0,
      image: true,
      hashtag: true,
    },
    prompt,
    productBlock,
  };
}

export function saveOrchestratorPlan(plan: OrchestratorPlan) {
  if (typeof window === "undefined") return;
  localStorage.setItem("lifebookmom_orchestrator_last_plan", JSON.stringify({
    ...plan,
    savedAt: new Date().toLocaleString("ko-KR"),
  }));
}
