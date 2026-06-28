export const osCore = {
  repository: "LifeBookMom-OS",
  branch: "project021-stabilize",
  currentProject: "Project022-01 OS Core Refactor",
  currentVersion: "OS v2.2.0",
  latestCommit: "NEXT",
  latestMessage: "Project022-01 OS core refactor",
  baselineCommit: "d11456b",
  baselineLabel: "Project020 Baseline",
  gitStatus: "Clean",
  recoveryStatus: "Ready",
  rule: "GitHub = 기준 저장소, VS Code = 실행 확인 작업실",
};

export const osModules = [
  { key: "enterprise", name: "Enterprise", status: "Ready", href: "/enterprise" },
  { key: "runtime", name: "OS Runtime", status: "Ready", href: "/enterprise" },
  { key: "constitution", name: "Constitution", status: "Ready", href: "/constitution-center" },
  { key: "decision", name: "Decision", status: "Ready", href: "/decision-center" },
  { key: "version", name: "Version", status: "Ready", href: "/version-center" },
  { key: "recovery", name: "Recovery", status: "Building", href: "/recovery-center" },
  { key: "brain", name: "Brain", status: "Ready", href: "/brain-core" },
  { key: "navigator", name: "Navigator", status: "Ready", href: "/navigator" },
  { key: "cms", name: "CMS", status: "Ready", href: "/content-studio" },
];

export const osTimeline = [
  {
    project: "Project022-01",
    title: "OS Core Refactor",
    commit: "NEXT",
    version: "OS v2.2.0",
    status: "BUILDING",
    reason: "Enterprise, Decision, Version, Recovery가 하나의 osCore 데이터를 사용하도록 통합",
  },
  {
    project: "Project021-07",
    title: "Project State Core",
    commit: "NEXT",
    version: "OS v2.1.1",
    status: "BUILDING",
    reason: "공통 상태 데이터 도입",
  },
  {
    project: "Project021-06",
    title: "Version Center",
    commit: "415b600",
    version: "OS v2.1.0",
    status: "DONE",
    reason: "OS 버전과 변경 이력 화면화",
  },
  {
    project: "Project021-05A",
    title: "Decision Center Upgrade",
    commit: "00a3ce9",
    version: "OS v2.1.0",
    status: "DONE",
    reason: "결정 이유, 승인, 영향도, Commit 연결",
  },
  {
    project: "Project020",
    title: "Baseline",
    commit: "d11456b",
    version: "OS v2.0.0",
    status: "DONE",
    reason: "GitHub 기준 저장소 확정",
  },
];

export const osRules = [
  "GitHub가 유일한 기준 저장소이다.",
  "VS Code는 실행 확인 작업실이다.",
  "Commit 없는 DONE은 금지한다.",
  "화면 확인 없는 DONE은 금지한다.",
  "삭제하지 않고 ARCHIVED로 보관한다.",
];
