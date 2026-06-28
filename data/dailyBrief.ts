// Project009-13
// Daily Operating Brief
// Orchestrator, Content Engine, Workflow Bus 기록을 한 화면에 모으는 일일 운영 브리핑

export const dailyBriefMeta = {
  project: "Project009-13",
  title: "Daily Operating Brief",
  version: "DAILY_BRIEF_v1.0",
  purpose:
    "오늘 무엇을 했고, 다음에 무엇을 해야 하는지 LifeBookMom OS가 한 화면에 보여줍니다.",
  principle:
    "새 채팅을 열어도 Daily Brief를 보면 바로 이어서 작업할 수 있어야 합니다.",
};

export const dailyBriefRules = [
  "마지막 Content Engine 실행 기록을 확인한다.",
  "마지막 Orchestrator 계획을 확인한다.",
  "완료 처리된 작업을 확인한다.",
  "오늘 다음으로 해야 할 작업을 보여준다.",
  "Brand Center와 Product Intelligence 기준을 함께 유지한다.",
];

export const defaultNextActions = [
  "Content Engine으로 글 생성",
  "Product Recommendation 확인",
  "리니 이미지 프롬프트 생성",
  "네이버/Google 발행 준비",
  "Workflow Engine에서 작업 완료 처리",
];
