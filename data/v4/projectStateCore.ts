export const projectStateCore = {
  repository: "LifeBookMom-OS",
  branch: "project021-stabilize",
  baselineCommit: "d11456b",
  baselineLabel: "Project020 Baseline",
  currentVersion: "OS v2.1.0",
  currentProject: "Project021-07 Project State Core",
  latestCommit: "415b600",
  latestMessage: "Project021-06 Version center",
  gitStatus: "Clean",
  recoveryStatus: "Ready",
};

export const projectTimeline = [
  {
    project: "Project021-07",
    title: "Project State Core",
    commit: "NEXT",
    version: "OS v2.1.1",
    status: "BUILDING",
    reason: "Decision, Version, Recovery, Enterprise가 같은 기준 데이터를 사용하도록 통합",
  },
  {
    project: "Project021-06",
    title: "Version Center",
    commit: "415b600",
    version: "OS v2.1.0",
    status: "DONE",
    reason: "OS 버전과 변경 이력을 화면에서 확인",
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
    project: "Project021-04",
    title: "Constitution Center",
    commit: "fb5f4c6",
    version: "OS v2.1.0",
    status: "DONE",
    reason: "LOCK 자산과 운영 원칙 고정",
  },
  {
    project: "Project021-03",
    title: "OS Runtime",
    commit: "588eaf4",
    version: "OS v2.1.0",
    status: "DONE",
    reason: "현재 OS 실행 상태 표시",
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

export const projectStateRules = [
  "GitHub가 기준 저장소이다.",
  "VS Code는 실행 확인 작업실이다.",
  "Commit 없는 DONE은 금지한다.",
  "화면 확인 없는 DONE은 금지한다.",
  "삭제하지 않고 ARCHIVED로 보관한다.",
];
