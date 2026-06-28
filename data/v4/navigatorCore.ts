import { osModules } from "./osCore";

export const navigatorCoreMeta = {
  project: "Project023-03",
  title: "Navigator Core",
  subtitle: "운영본부의 모든 센터로 이동하는 중앙 항해 허브입니다.",
  branch: "project023-os-core",
};

export const navigatorRoutes = osModules.filter((module) => module.group !== "home");
export const navigatorPriorities = [
  "Content Studio V4 출력 검증",
  "Dashboard 실제 데이터 연결",
  "Navigator 오늘 작업 추천 기능",
  "Recovery / Version 자동화",
];
