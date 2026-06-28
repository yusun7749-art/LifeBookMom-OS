import { osCore, osModules } from "./osCore";

export const dashboard = {
  project: "Project023-03",
  title: "Enterprise Dashboard",
  branch: osCore.branch,
  widgets: [
    { title: "OS Version", value: osCore.currentVersion, detail: osCore.currentProject },
    { title: "Git Status", value: osCore.gitStatus, detail: "Commit 후 DONE 처리" },
    { title: "Recovery", value: osCore.recoveryStatus, detail: osCore.baselineLabel },
    { title: "운영 센터", value: String(osModules.length), detail: "OS Core에 연결된 센터 수" },
    { title: "Content Studio", value: "READY", detail: "네이버 V4 / Google SEO" },
    { title: "Project024", value: "READY", detail: "실제 기능 보완 단계" },
  ],
};
