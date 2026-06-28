export const decisionCenterMeta = {
  project: "Project021-05A",
  title: "Decision Center",
  subtitle: "왜 바꿨는지, 누가 승인했는지, 어떤 Commit에 연결되는지 확인합니다.",
  branch: "project021-stabilize",
  latestCommit: "00a3ce9",
  latestMessage: "Project021-05 Decision center",
  baseline: "d11456b Project020 Baseline",
};

export const decisionSummary = [
  { label: "최근 Commit", value: "00a3ce9" },
  { label: "현재 Branch", value: "project021-stabilize" },
  { label: "승인 상태", value: "대표 승인" },
  { label: "Recovery Point", value: "fb5f4c6" },
];

export const decisionHistory = [
  {
    id: "DL-021-05",
    project: "Project021-05",
    title: "Decision Center 생성",
    reason: "운영 결정 이력을 화면에서 확인하기 위함",
    impact: "운영본부",
    approvedBy: "대표 승인",
    commit: "00a3ce9",
    status: "DONE",
  },
  {
    id: "DL-021-04",
    project: "Project021-04",
    title: "Constitution Center 생성",
    reason: "LOCK 자산과 금지 변경을 화면으로 고정하기 위함",
    impact: "Constitution / Asset Registry",
    approvedBy: "대표 승인",
    commit: "fb5f4c6",
    status: "DONE",
  },
  {
    id: "DL-021-03",
    project: "Project021-03",
    title: "OS Runtime 생성",
    reason: "문서 목록이 아닌 현재 OS 상태를 보여주기 위함",
    impact: "Enterprise Home",
    approvedBy: "대표 승인",
    commit: "588eaf4",
    status: "DONE",
  },
  {
    id: "DL-021-02",
    project: "Project021-02",
    title: "Enterprise Home 개편",
    reason: "Enterprise를 운영본부 첫 화면으로 사용하기 위함",
    impact: "Enterprise / CMS / Navigator",
    approvedBy: "대표 승인",
    commit: "3bfa2d0",
    status: "DONE",
  },
  {
    id: "DL-020",
    project: "Project020",
    title: "Baseline 확정",
    reason: "GitHub를 기준 저장소로 고정하기 위함",
    impact: "전체 운영 체계",
    approvedBy: "대표 승인",
    commit: "d11456b",
    status: "DONE",
  },
];

export const affectedModules = [
  "Enterprise Home",
  "Constitution Center",
  "Decision Center",
  "Version Manager",
  "Recovery",
  "Content Studio V4",
];

export const approvalRules = [
  "LOCK 자산은 대표 승인 없이는 변경하지 않는다.",
  "DecisionLog 없이 운영 규칙을 변경하지 않는다.",
  "VersionManager 없이 완료 처리하지 않는다.",
  "Git Commit 없이 DONE 처리하지 않는다.",
  "화면 확인 없이 완료라고 기록하지 않는다.",
];

export const rollbackPoints = [
  { commit: "fb5f4c6", label: "Project021-04 Constitution Center" },
  { commit: "588eaf4", label: "Project021-03 OS Runtime" },
  { commit: "d11456b", label: "Project020 Baseline" },
  { commit: "45b3874", label: "Project019 Baseline" },
];
