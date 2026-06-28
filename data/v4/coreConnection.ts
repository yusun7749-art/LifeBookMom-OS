export const coreConnection = {
  project: "Project023-02",
  title: "Core Connection",
  branch: "project023-os-core",
  status: "BUILDING",
  groups: [
    {
      title: "CMS · Brain · Navigator",
      status: "CONNECTED",
      items: [
        { name: "CMS Hub", href: "/cms-hub", role: "콘텐츠 DB와 제작 흐름" },
        { name: "Content Studio V4", href: "/content-studio", role: "네이버·Google 원클릭 작성" },
        { name: "Brain Runtime", href: "/brain-runtime", role: "운영 기억과 판단 기준" },
        { name: "Navigator Core", href: "/navigator-core", role: "오늘의 작업 방향 제시" },
        { name: "Workflow Center", href: "/workflow-center", role: "작성→이미지→발행 흐름" }
      ]
    },
    {
      title: "Operation Core",
      status: "LOCKED",
      items: [
        { name: "Constitution", href: "/constitution-center", role: "LOCK 규칙" },
        { name: "Decision", href: "/decision-center", role: "결정 이유" },
        { name: "Version", href: "/version-center", role: "버전 이력" },
        { name: "Recovery", href: "/recovery-center", role: "복구 지점" }
      ]
    }
  ],
  rules: [
    "센터를 더 늘리지 않고 기존 센터를 연결한다.",
    "CMS·Brain·Navigator는 Content Studio V4를 중심으로 연결한다.",
    "GitHub Commit 없는 완료 처리는 금지한다.",
    "Project023은 3단계로 빠르게 종료한다."
  ]
};
