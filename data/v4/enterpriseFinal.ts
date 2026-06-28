import { osModules } from "./osCore";

export const finalIntegration = {
  project: "Project023-03",
  title: "Enterprise Final Integration",
  subtitle: "흩어진 센터를 하나의 운영본부로 묶는 최종 통합 화면입니다.",
  next: "Project024부터 실제 기능 보완 단계로 이동합니다.",
};

export const quickActions = [
  { title: "네이버 원클릭 작성", href: "/content-studio", icon: "📝", desc: "생활백서맘 네이버 V4 작성 흐름" },
  { title: "오늘 항해 보기", href: "/navigator-core", icon: "🧭", desc: "오늘 작업, 우선순위, 연결 상태" },
  { title: "운영 상태 확인", href: "/dashboard", icon: "📊", desc: "Git, CMS, 수익, 자동화 요약" },
  { title: "명령 센터", href: "/command-center", icon: "🎛️", desc: "작업 실행 허브" },
];

export const finalGroups = [
  {
    title: "운영 기준",
    modules: osModules.filter((m) => m.group === "operation"),
  },
  {
    title: "작업 실행",
    modules: osModules.filter((m) => m.group === "control" || m.group === "content"),
  },
  {
    title: "성과·자산",
    modules: osModules.filter((m) => m.group === "business" || m.group === "asset"),
  },
];

export const project024ReadyList = [
  "Content Studio 실제 생활백서맘 출력 검증",
  "Navigator가 오늘 작업을 실제 추천하도록 개선",
  "Dashboard에 실제 CMS·수익·분석 데이터를 연결",
  "Automation에 품질 검사와 발행 완료 흐름 연결",
  "GitHub 기준 Recovery / Version 자동화",
];
