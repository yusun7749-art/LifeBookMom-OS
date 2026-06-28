export const navigatorCoreMeta = {
  project: "Project022-05",
  title: "Navigator Core",
  subtitle: "운영본부의 모든 센터로 이동하는 중앙 항해 허브입니다.",
  branch: "project021-stabilize",
  latestCommit: "2908238",
  baseline: "d11456b Project020 Baseline",
};

export const navigatorRoutes = [
  {
    icon: "🏢",
    title: "Enterprise Home",
    href: "/enterprise",
    role: "운영본부 첫 화면",
    status: "READY",
  },
  {
    icon: "🧬",
    title: "OS Core",
    href: "/os-core",
    role: "공통 기준 데이터",
    status: "READY",
  },
  {
    icon: "⚖️",
    title: "Constitution Center",
    href: "/constitution-center",
    role: "LOCK 자산과 운영 원칙",
    status: "READY",
  },
  {
    icon: "🧾",
    title: "Decision Center",
    href: "/decision-center",
    role: "결정 이력과 승인 기록",
    status: "READY",
  },
  {
    icon: "🧩",
    title: "Version Center",
    href: "/version-center",
    role: "버전과 Commit 이력",
    status: "READY",
  },
  {
    icon: "♻️",
    title: "Recovery Center",
    href: "/recovery-center",
    role: "Git 기준 복구 지점",
    status: "READY",
  },
  {
    icon: "🧠",
    title: "Brain Core",
    href: "/brain-core",
    role: "AI 두뇌와 작업 기억",
    status: "READY",
  },
  {
    icon: "📝",
    title: "Content Studio V4",
    href: "/content-studio",
    role: "네이버·Google 콘텐츠 제작",
    status: "READY",
  },
  {
    icon: "📊",
    title: "Dashboard",
    href: "/dashboard",
    role: "운영 지표 확인",
    status: "READY",
  },
];

export const navigatorPriorities = [
  "GitHub 기준 상태 확인",
  "OS Core 기준 데이터 확인",
  "Decision / Version / Recovery 연결 확인",
  "Content Studio V4 출력 확인",
  "Brain Runtime 연결 준비",
];

export const navigatorRules = [
  "Navigator는 새 기능보다 이동 허브 역할을 우선한다.",
  "모든 센터는 OS Core 기준 데이터를 공유한다.",
  "죽은 링크는 READY로 표시하지 않는다.",
  "Git Commit 후에만 DONE으로 기록한다.",
];
