export const workflowState = {
  project: "Project009",
  title: "Enterprise Workflow Engine",
  version: "WORKFLOW_ENGINE_v1.0",
  purpose:
    "Content Engine 실행 후 Memory, Journal, Ledger, Brain Core, Navigator AI, Dashboard가 이어서 움직이도록 만드는 운영 흐름입니다.",
  currentStatus: "진행중",
  progress: 35,
  lastCompleted: [
    "Brand Center 적용",
    "Content Engine 실행센터 구축",
    "Brain Core 마지막 실행 기록 표시",
  ],
  currentFocus: "작업 완료 버튼과 실행 기록 흐름 구축",
  nextActions: [
    "Content Engine에 작업 완료 상태 저장",
    "Workflow Engine에서 마지막 실행과 완료 상태 확인",
    "Ledger / Memory / Journal 연동 구조 확정",
    "Navigator AI 다음 추천 연결",
  ],
};

export const workflowSteps = [
  {
    id: "STEP-001",
    title: "Content Engine 실행",
    status: "완료",
    description: "프로젝트 선택, 모듈 선택, 요청문 생성, 복사, ChatGPT 실행까지 연결했습니다.",
  },
  {
    id: "STEP-002",
    title: "Brain Core 기록",
    status: "완료",
    description: "마지막 Content Engine 실행 정보를 Brain Core에서 확인할 수 있습니다.",
  },
  {
    id: "STEP-003",
    title: "작업 완료 처리",
    status: "진행중",
    description: "작업 완료 버튼을 통해 마지막 실행을 완료 상태로 저장하는 단계입니다.",
  },
  {
    id: "STEP-004",
    title: "Memory / Journal / Ledger 반영",
    status: "대기",
    description: "완료된 작업을 Memory, Journal, Ledger에 자동 반영하는 구조를 연결합니다.",
  },
  {
    id: "STEP-005",
    title: "Navigator AI 갱신",
    status: "대기",
    description: "완료된 작업을 기준으로 다음 추천 콘텐츠를 자동 제안합니다.",
  },
  {
    id: "STEP-006",
    title: "CEO Dashboard 갱신",
    status: "대기",
    description: "회사 건강도, 오늘 진행률, XP가 자동으로 바뀌도록 연결합니다.",
  },
];

export const workflowRules = [
  "완료 여부가 확인되지 않은 작업은 완료로 기록하지 않는다.",
  "Content Engine 실행은 작업 시작, Workflow 완료는 작업 종료로 구분한다.",
  "모든 완료 기록은 추후 Memory, Journal, Ledger에 함께 남긴다.",
  "선장님이 새 채팅을 열어도 Brain Core와 Workflow Engine으로 이어서 확인할 수 있어야 한다.",
];
