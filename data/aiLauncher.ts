// Project012
// AI Launcher
// Content Studio에서 버튼 클릭 시 Bootstrap → Prompt 생성 → 복사 → 이리나 작업창 재사용 → 상태 기록

export const aiLauncherMeta = {
  project: "Project012",
  title: "AI Launcher",
  version: "AI_LAUNCHER_v1.0",
  purpose:
    "콘텐츠 제작센터에서 네이버, Google, 이미지 작업을 버튼 한 번으로 실행하고 작업창은 1개만 재사용합니다.",
};

export type LauncherStep =
  | "대기"
  | "Bootstrap 확인"
  | "요청문 생성"
  | "클립보드 복사"
  | "이리나 작업창 연결"
  | "Ready";

export type LauncherLog = {
  at: string;
  label: string;
  projectTopic: string;
  status: string;
};

const WORKSPACE_NAME = "lifebookmom_rina_workspace";

export async function runAILauncher({
  label,
  prompt,
  projectTopic,
  onStep,
}: {
  label: string;
  prompt: string;
  projectTopic: string;
  onStep?: (step: LauncherStep) => void;
}) {
  if (typeof window === "undefined") return;

  const steps: LauncherStep[] = [
    "Bootstrap 확인",
    "요청문 생성",
    "클립보드 복사",
    "이리나 작업창 연결",
    "Ready",
  ];

  for (const step of steps) {
    onStep?.(step);
    await new Promise((resolve) => setTimeout(resolve, 180));

    if (step === "클립보드 복사") {
      await navigator.clipboard.writeText(prompt);
    }

    if (step === "이리나 작업창 연결") {
      window.open("https://chatgpt.com/", WORKSPACE_NAME);
    }
  }

  const log: LauncherLog = {
    at: new Date().toLocaleString("ko-KR"),
    label,
    projectTopic,
    status: "실행 완료",
  };

  localStorage.setItem("lifebookmom_ai_launcher_last", JSON.stringify(log));
  localStorage.setItem("lifebookmom_rina_workspace_status", "connected");
  localStorage.setItem("lifebookmom_rina_workspace_last", log.at);

  const historyRaw = localStorage.getItem("lifebookmom_ai_launcher_history");
  const history: LauncherLog[] = historyRaw ? JSON.parse(historyRaw) : [];
  localStorage.setItem(
    "lifebookmom_ai_launcher_history",
    JSON.stringify([log, ...history].slice(0, 30))
  );
}

export function getAILauncherLast(): LauncherLog | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("lifebookmom_ai_launcher_last");
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function getAILauncherHistory(): LauncherLog[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem("lifebookmom_ai_launcher_history");
  if (!raw) return [];

  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function recordPublishingDone(project: any) {
  if (typeof window === "undefined") return;

  const done = {
    at: new Date().toLocaleString("ko-KR"),
    topic: project.topic,
    category: project.category,
    grade: project.grade,
    status: "발행 완료",
    modules: ["CMS", "Memory", "Workflow", "Ledger", "Journal", "Dashboard"],
  };

  localStorage.setItem("lifebookmom_completed_content_run", JSON.stringify(done));
  localStorage.setItem("lifebookmom_last_content_run", JSON.stringify(done));
  localStorage.setItem("lifebookmom_workflow_done_event", JSON.stringify(done));

  const historyRaw = localStorage.getItem("lifebookmom_publish_history");
  const history = historyRaw ? JSON.parse(historyRaw) : [];
  localStorage.setItem(
    "lifebookmom_publish_history",
    JSON.stringify([done, ...history].slice(0, 50))
  );
}
