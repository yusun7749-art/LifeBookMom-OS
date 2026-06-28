export const enterpriseVision = {
  title: "LifeBookMom OS Enterprise",
  subtitle: "생활백서맘 운영본부",
  mission: "기능보다 운영 일관성, 말보다 실행.",
  promise:
    "GitHub를 기준 저장소로 두고, Constitution·Decision Log·Version·Asset·Recovery를 한 화면에서 확인하는 운영체계입니다.",
};

export const osRuntime = {
  version: "OS v2.1.0",
  repository: "LifeBookMom-OS",
  branch: "project021-stabilize",
  baseline: "d11456b Project020 Baseline",
  currentProject: "Project021-03 OS Runtime",
  gitStatus: "Clean",
  recovery: "Ready",
  navigator: "Ready",
  brain: "Ready",
  cms: "Ready",
  launcher: "Ready",
  lastCommit: "Project021-02 Enterprise Home",
  rule: "GitHub = 기준 저장소, VS Code = 실행 확인 작업실",
};

export const enterpriseOps = [
  {
    icon: "📜",
    title: "OS Manifest",
    href: "/docs/os-manifest",
    desc: "현재 OS 버전, 기준 저장소, LOCK 자산, 변경 절차를 확인합니다.",
    status: "LOCKED",
  },
  {
    icon: "⚖️",
    title: "Constitution",
    href: "/docs/constitution",
    desc: "생활백서맘 브랜드, 리니, 네이버 V4, Google 분리 원칙을 고정합니다.",
    status: "LOCKED",
  },
  {
    icon: "🧾",
    title: "Decision Log",
    href: "/docs/decision-log",
    desc: "왜 그렇게 결정했는지 기록해 같은 논의를 반복하지 않게 합니다.",
    status: "ACTIVE",
  },
  {
    icon: "🧩",
    title: "Version Manager",
    href: "/docs/version-manager",
    desc: "OS v2.0, v2.1처럼 변경 이력을 버전 단위로 관리합니다.",
    status: "ACTIVE",
  },
  {
    icon: "🏦",
    title: "Asset Registry",
    href: "/docs/asset-registry",
    desc: "리니, 워터마크, 브랜드, 출력 규칙 같은 LOCK 자산을 관리합니다.",
    status: "LOCKED",
  },
  {
    icon: "🛡️",
    title: "Change Approval",
    href: "/docs/change-approval",
    desc: "LOCK 자산 변경은 대표 승인 없이는 진행하지 않습니다.",
    status: "ACTIVE",
  },
  {
    icon: "♻️",
    title: "Recovery",
    href: "/docs/recovery",
    desc: "Git Commit 기준으로 복구 지점을 관리합니다.",
    status: "ACTIVE",
  },
  {
    icon: "🗺️",
    title: "Roadmap",
    href: "/docs/roadmap",
    desc: "운영본부, Brain, Navigator, CMS의 개발 순서를 관리합니다.",
    status: "ACTIVE",
  },
];

export const enterpriseCenters = [
  {
    icon: "🧠",
    title: "Brain Core",
    href: "/brain-core",
    desc: "현재 작업 상태, Resume Protocol, 운영 원칙을 확인합니다.",
  },
  {
    icon: "🧭",
    title: "Navigator",
    href: "/navigator",
    desc: "오늘 해야 할 글, 리뉴얼, 수익 과제를 추천합니다.",
  },
  {
    icon: "📝",
    title: "Content Studio V4",
    href: "/content-studio",
    desc: "네이버 V4, Google SEO, 이미지, 발행 완료를 실행합니다.",
  },
  {
    icon: "🏢",
    title: "Enterprise Workspace",
    href: "/enterprise-workspace",
    desc: "AI Launcher, 이리나 작업창, 발행 흐름을 관리합니다.",
  },
  {
    icon: "📊",
    title: "Dashboard",
    href: "/dashboard",
    desc: "운영 지표와 프로젝트 현황을 확인합니다.",
  },
  {
    icon: "🗂️",
    title: "CMS",
    href: "/cms",
    desc: "콘텐츠 DB와 발행 상태를 관리합니다.",
  },
];

export const enterpriseProjectState = [
  { label: "LOCKED", desc: "대표 승인 없이는 변경 불가" },
  { label: "TODO", desc: "아직 착수 전" },
  { label: "BUILDING", desc: "구축 중" },
  { label: "TESTING", desc: "화면 확인 중" },
  { label: "DONE", desc: "화면 확인 후 완료" },
  { label: "ARCHIVED", desc: "삭제하지 않고 보관" },
];
