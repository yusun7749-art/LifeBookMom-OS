export const versionCenterMeta = {
  project: "Project021-06",
  title: "Version Center",
  subtitle: "OS 버전, Commit, 변경 이유, 복구 기준점을 한 화면에서 관리합니다.",
  branch: "project021-stabilize",
  currentVersion: "OS v2.1.0",
  latestCommit: "00a3ce9",
  baseline: "d11456b Project020 Baseline",
};

export const versionHistory = [
  {
    version: "OS v2.1.0",
    project: "Project021",
    commit: "00a3ce9",
    title: "Decision Center 구축",
    reason: "운영 결정 이력을 화면에서 확인하기 위함",
    status: "BUILDING",
  },
  {
    version: "OS v2.0.0",
    project: "Project020",
    commit: "d11456b",
    title: "운영본부 기준점 생성",
    reason: "GitHub를 기준 저장소로 확정하기 위함",
    status: "DONE",
  },
  {
    version: "OS v1.0.0",
    project: "Project019",
    commit: "45b3874",
    title: "초기 기준본",
    reason: "LifeBookMom OS 기본 구조를 GitHub에 등록하기 위함",
    status: "ARCHIVED",
  },
];

export const versionRules = [
  "모든 변경은 VersionManager에 기록한다.",
  "DecisionLog 없이 Version을 올리지 않는다.",
  "Commit 없이 Version을 완료 처리하지 않는다.",
  "화면 확인 후 DONE 처리한다.",
  "이전 버전은 삭제하지 않고 ARCHIVED로 보관한다.",
];

export const nextVersions = [
  { version: "OS v2.1.1", target: "Recovery Center", status: "TODO" },
  { version: "OS v2.1.2", target: "Brain Runtime", status: "TODO" },
  { version: "OS v2.2.0", target: "OS Runtime 자동 연결", status: "TODO" },
];
