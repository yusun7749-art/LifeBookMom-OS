// Project009-1
// Enterprise Workflow Bus
// LifeBookMom OS 공통 작업 흐름 데이터

export type WorkflowStatus = "대기" | "진행중" | "완료" | "보류";

export type WorkflowBusItem = {
  id: string;
  title: string;
  module: string;
  status: WorkflowStatus;
  description: string;
  writesTo: string[];
};

export const workflowBusMeta = {
  project: "Project009-1",
  title: "Enterprise Workflow Bus",
  version: "WORKFLOW_BUS_v1.0",
  purpose:
    "Content Engine에서 시작된 작업이 Brain Memory, Journal, Ledger, Dashboard, Navigator AI로 이어지도록 공통 흐름을 정의합니다.",
  principle:
    "완료 여부가 확인되지 않은 작업은 완료로 기록하지 않는다. 실행과 완료는 분리한다.",
};

export const workflowBusItems: WorkflowBusItem[] = [
  {
    id: "BUS-001",
    title: "작업 시작",
    module: "Content Engine",
    status: "완료",
    description: "프로젝트 선택, 모듈 선택, 요청문 생성, 복사, ChatGPT 실행.",
    writesTo: ["localStorage: lifebookmom_last_content_run", "Brain Core"],
  },
  {
    id: "BUS-002",
    title: "작업 완료 확인",
    module: "Workflow Engine",
    status: "진행중",
    description: "선장님이 실제 결과를 확인한 뒤 마지막 작업 완료 처리.",
    writesTo: ["localStorage: lifebookmom_completed_content_run"],
  },
  {
    id: "BUS-003",
    title: "Memory 저장",
    module: "Brain Memory",
    status: "대기",
    description: "완료된 작업의 핵심 상태와 다음 작업을 저장.",
    writesTo: ["Memory"],
  },
  {
    id: "BUS-004",
    title: "Journal 기록",
    module: "Enterprise Journal",
    status: "대기",
    description: "무엇을 했는지뿐 아니라 왜 그렇게 결정했는지 기록.",
    writesTo: ["Journal"],
  },
  {
    id: "BUS-005",
    title: "Ledger 반영",
    module: "Project Ledger",
    status: "대기",
    description: "완료/진행중/다음 작업 상태를 프로젝트 장부에 반영.",
    writesTo: ["Ledger"],
  },
  {
    id: "BUS-006",
    title: "Dashboard 갱신",
    module: "CEO Dashboard",
    status: "대기",
    description: "회사 건강도, XP, 오늘 완료 수, 진행률을 갱신.",
    writesTo: ["Dashboard"],
  },
  {
    id: "BUS-007",
    title: "Navigator AI 추천",
    module: "Navigator AI",
    status: "대기",
    description: "완료된 작업을 기준으로 다음 우선순위를 추천.",
    writesTo: ["Navigator AI"],
  },
];

export const workflowBusRules = [
  "Content Engine 실행은 시작 기록이다.",
  "Workflow Engine 완료 버튼은 종료 기록이다.",
  "완료 버튼을 누르기 전까지 Ledger에는 완료로 기록하지 않는다.",
  "새 채팅을 열어도 Brain Core, Workflow Engine, Ledger 순서로 이어갈 수 있어야 한다.",
  "Brand Center 기준은 이미지 작업 시 항상 우선 적용한다.",
];

export const workflowBusStorageKeys = {
  lastRun: "lifebookmom_last_content_run",
  completedRun: "lifebookmom_completed_content_run",
  workflowBus: "lifebookmom_workflow_bus_v1",
  workflowHistory: "lifebookmom_workflow_history_v1",
};
