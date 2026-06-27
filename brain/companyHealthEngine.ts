export type CompanyHealthMetric = {
  label: string;
  score: number;
  reason: string;
};

export const companyHealthMetrics: CompanyHealthMetric[] = [
  {
    label: "콘텐츠",
    score: 62,
    reason: "작성 엔진과 대표글 후보는 있으나 자산 등급 연결이 더 필요합니다.",
  },
  {
    label: "SEO",
    score: 58,
    reason: "내부링크와 색인 체크센터가 아직 완전 자동화되지 않았습니다.",
  },
  {
    label: "수익",
    score: 42,
    reason: "쿠팡 파트너스 기반은 있으나 애드포스트·애드센스 데이터 연결이 필요합니다.",
  },
  {
    label: "브랜드",
    score: 84,
    reason: "생활백서맘 말투와 이미지 규칙이 비교적 명확합니다.",
  },
  {
    label: "Journey",
    score: 51,
    reason: "초3 기준은 잡혔고 초4 이후 확장 구조를 구축 중입니다.",
  },
  {
    label: "자산",
    score: 46,
    reason: "글을 장기 자산으로 등급화하는 시스템이 시작 단계입니다.",
  },
];

export function getCompanyHealthAverage() {
  const total = companyHealthMetrics.reduce((sum, metric) => sum + metric.score, 0);
  return Math.round(total / companyHealthMetrics.length);
}
