// Project013
// Enterprise Workspace
// Desktop Launcher를 별도로 두지 않고 LifeBookMom OS 내부에서 작업창, 실행기록, 발행흐름을 관리합니다.

export const enterpriseWorkspaceMeta = {
  project: "Project013",
  title: "Enterprise Workspace",
  version: "ENTERPRISE_WORKSPACE_v1.0",
  purpose:
    "운영본부 안에서 이리나 작업창 상태, AI Launcher 실행 기록, 발행 완료 기록을 한 번에 확인합니다.",
  principle:
    "별도 프로그램을 늘리지 않고 LifeBookMom OS 하나 안에서 모든 작업 흐름을 관리합니다.",
};

export const workspaceFlow = [
  "프로젝트 선택",
  "AI Launcher 실행",
  "Bootstrap 자동 적용",
  "요청문 자동 복사",
  "이리나 작업창 재사용",
  "콘텐츠 작성",
  "발행 완료 기록",
];

export function getWorkspaceDashboard() {
  if (typeof window === "undefined") {
    return {
      rinaStatus: "확인 불가",
      rinaLast: "",
      launcherLast: null,
      publishLast: null,
      launcherHistory: [],
      publishHistory: [],
    };
  }

  const launcherLastRaw = localStorage.getItem("lifebookmom_ai_launcher_last");
  const publishLastRaw = localStorage.getItem("lifebookmom_completed_content_run");
  const launcherHistoryRaw = localStorage.getItem("lifebookmom_ai_launcher_history");
  const publishHistoryRaw = localStorage.getItem("lifebookmom_publish_history");

  const parse = (raw: string | null, fallback: any) => {
    if (!raw) return fallback;
    try {
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  };

  return {
    rinaStatus:
      localStorage.getItem("lifebookmom_rina_workspace_status") === "connected"
        ? "연결됨"
        : "작업창 없음",
    rinaLast: localStorage.getItem("lifebookmom_rina_workspace_last") ?? "",
    launcherLast: parse(launcherLastRaw, null),
    publishLast: parse(publishLastRaw, null),
    launcherHistory: parse(launcherHistoryRaw, []),
    publishHistory: parse(publishHistoryRaw, []),
  };
}

export function resetWorkspaceStatus() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("lifebookmom_rina_workspace_status");
  localStorage.removeItem("lifebookmom_rina_workspace_last");
}

export function openContentStudio() {
  if (typeof window === "undefined") return;
  window.location.href = "/content-studio";
}
