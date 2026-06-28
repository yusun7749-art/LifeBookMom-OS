import AppShell from "../../components/AppShell";
import EnterpriseWorkspacePanel from "../../components/EnterpriseWorkspacePanel";

export default function EnterpriseWorkspacePage() {
  return (
    <AppShell>
      <main className="space-y-8">
        <EnterpriseWorkspacePanel />
      </main>
    </AppShell>
  );
}
