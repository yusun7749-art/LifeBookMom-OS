import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";

function run(command, fallback = "") {
  try {
    return execSync(command, { encoding: "utf8" }).trim();
  } catch {
    return fallback;
  }
}

const branch = run("git rev-parse --abbrev-ref HEAD", "unknown");
const latestCommit = run("git rev-parse --short HEAD", "unknown");
const latestMessage = run("git log -1 --pretty=%s", "unknown");
const statusRaw = run("git status --porcelain", "");
const gitStatus = statusRaw ? "Dirty" : "Clean";

const content = `export const osCoreRuntimeStatus = {
  repository: "LifeBookMom-OS",
  branch: ${JSON.stringify(branch)},
  latestCommit: ${JSON.stringify(latestCommit)},
  latestMessage: ${JSON.stringify(latestMessage)},
  gitStatus: ${JSON.stringify(gitStatus)},
  updatedAt: ${JSON.stringify(new Date().toISOString())},
};
`;

writeFileSync("data/v4/osCoreRuntime.ts", content, "utf8");
console.log("OS Core runtime updated:", { branch, latestCommit, latestMessage, gitStatus });
