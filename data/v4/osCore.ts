export const osCore = {
  repository: "LifeBookMom-OS",
  branch: "project023-os-core",
  currentProject: "Project023-03 Enterprise Final Integration",
  currentVersion: "OS v2.3.0",
  latestCommit: "LOCAL",
  latestMessage: "Project023-03 Enterprise final integration",
  baselineCommit: "d11456b",
  baselineLabel: "Project020 Baseline",
  gitStatus: "Working",
  recoveryStatus: "Ready",
  rule: "GitHub = 기준 저장소, VS Code = 실행 확인 작업실",
};

export const osGroups = [
  { key: "operation", title: "운영본부", description: "헌법, 결정, 버전, 복구를 관리합니다." },
  { key: "control", title: "항해·두뇌·명령", description: "Navigator, Brain, Command가 작업 흐름을 제어합니다." },
  { key: "content", title: "콘텐츠 제작", description: "CMS, Content Studio, Workflow를 연결합니다." },
  { key: "business", title: "분석·수익·자동화", description: "Analytics, Revenue, Automation을 연결합니다." },
  { key: "asset", title: "자산·일정·설정", description: "Media, Schedule, Settings, Monitor를 관리합니다." },
];

export const osModules = [
  { key: "enterprise", name: "Enterprise Home", status: "READY", href: "/enterprise", group: "home" },
  { key: "os-core", name: "OS Core", status: "READY", href: "/os-core", group: "operation" },
  { key: "constitution", name: "Constitution", status: "READY", href: "/constitution-center", group: "operation" },
  { key: "decision", name: "Decision", status: "READY", href: "/decision-center", group: "operation" },
  { key: "version", name: "Version", status: "READY", href: "/version-center", group: "operation" },
  { key: "recovery", name: "Recovery", status: "READY", href: "/recovery-center", group: "operation" },
  { key: "navigator-core", name: "Navigator Core", status: "READY", href: "/navigator-core", group: "control" },
  { key: "navigator-hub", name: "Navigator Hub", status: "READY", href: "/navigator-hub", group: "control" },
  { key: "brain", name: "Brain Runtime", status: "READY", href: "/brain-runtime", group: "control" },
  { key: "command", name: "Command Center", status: "READY", href: "/command-center", group: "control" },
  { key: "cms", name: "CMS Hub", status: "READY", href: "/cms-hub", group: "content" },
  { key: "content-studio", name: "Content Studio V4", status: "READY", href: "/content-studio", group: "content" },
  { key: "workflow", name: "Workflow Center", status: "READY", href: "/workflow-center", group: "content" },
  { key: "analytics", name: "Analytics Hub", status: "READY", href: "/analytics-hub", group: "business" },
  { key: "revenue", name: "Revenue Center", status: "READY", href: "/revenue-center", group: "business" },
  { key: "automation", name: "Automation Hub", status: "READY", href: "/automation-hub", group: "business" },
  { key: "media", name: "Media Center", status: "READY", href: "/media-center", group: "asset" },
  { key: "schedule", name: "Schedule Center", status: "READY", href: "/schedule-center", group: "asset" },
  { key: "settings", name: "Settings Center", status: "READY", href: "/settings-center", group: "asset" },
  { key: "monitor", name: "Project Monitor", status: "READY", href: "/project-monitor", group: "asset" },
];

export const osTimeline = [
  {
    project: "Project023-03",
    title: "Enterprise Final Integration",
    commit: "LOCAL",
    version: "OS v2.3.0",
    status: "BUILDING",
    reason: "운영본부, Dashboard, Navigator, Command를 하나의 OS Core 기준으로 통합",
  },
  {
    project: "Project023-02",
    title: "Core Connection",
    commit: "LOCAL",
    version: "OS v2.3.0",
    status: "DONE",
    reason: "CMS, Brain, Navigator 연결",
  },
  {
    project: "Project022",
    title: "Centers Foundation",
    commit: "project021-stabilize",
    version: "OS v2.2.x",
    status: "DONE",
    reason: "운영본부 Center 골격 구축",
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
