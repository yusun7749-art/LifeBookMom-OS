// Project011
// One Click Workspace
// ChatGPT 탭을 계속 새로 만들지 않고, 이리나 작업창 1개만 재사용하는 실행 엔진

export const workspaceMeta = {
  project: "Project011",
  title: "One Click Workspace",
  version: "ONE_CLICK_WORKSPACE_v1.0",
  purpose:
    "콘텐츠 제작 버튼을 누를 때마다 새 탭을 계속 만들지 않고, 이리나 작업창 하나를 재사용합니다.",
};

export const workspaceRules = [
  "네이버/Google/이미지 버튼은 Bootstrap Context를 자동 포함한다.",
  "항해사 시작 버튼은 별도 필수 단계가 아니다.",
  "버튼 클릭 시 요청문을 자동 복사한다.",
  "ChatGPT는 lifebookmom_rina_workspace 이름의 작업창 1개만 재사용한다.",
  "작업창이 이미 있으면 새 탭을 만들지 않고 기존 작업창을 focus 한다.",
];

export async function launchRinaWorkspace(prompt: string) {
  if (typeof window === "undefined") return;

  await navigator.clipboard.writeText(prompt);

  const targetName = "lifebookmom_rina_workspace";
  window.open("https://chatgpt.com/", targetName);
}

export function markWorkspaceConnected() {
  if (typeof window === "undefined") return;
  localStorage.setItem("lifebookmom_rina_workspace_status", "connected");
  localStorage.setItem("lifebookmom_rina_workspace_last", new Date().toLocaleString("ko-KR"));
}

export function getWorkspaceStatus() {
  if (typeof window === "undefined") {
    return { connected: false, last: "" };
  }

  return {
    connected: localStorage.getItem("lifebookmom_rina_workspace_status") === "connected",
    last: localStorage.getItem("lifebookmom_rina_workspace_last") ?? "",
  };
}
