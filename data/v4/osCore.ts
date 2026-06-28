import { osCoreRuntimeStatus } from "./osCoreRuntime";

export const osCore = {
  repository: osCoreRuntimeStatus.repository,
  branch: osCoreRuntimeStatus.branch,
  currentProject: "Project022-03 OS Core Auto Status",
  currentVersion: "OS v2.2.0",
  latestCommit: osCoreRuntimeStatus.latestCommit,
  latestMessage: osCoreRuntimeStatus.latestMessage,
  baselineCommit: "d11456b",
  baselineLabel: "Project020 Baseline",
  gitStatus: osCoreRuntimeStatus.gitStatus,
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
    project: "Project022-03",
    title: "OS Core Auto Status",
    commit: osCoreRuntimeStatus.latestCommit,
    version: "OS v2.2.0",
    status: "BUILDING",
    reason: "Git branch, commit, status를 OS Core가 자동 참조하도록 변경",
  },
  {
    project: "Project022-02",
    title: "OS Core Enterprise Integration",
    commit: "previous",
    version: "OS v2.2.0",
    status: "DONE",
    reason: "Enterprise Home에 OS Core 연결",
  },
  {
    project: "Project022-01",
    title: "OS Core Refactor",
    commit: "previous",
    version: "OS v2.2.0",
    status: "DONE",
    reason: "Enterprise, Decision, Version, Recovery가 하나의 osCore 데이터를 사용하도록 통합",
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
