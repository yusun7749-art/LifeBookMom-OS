import AppShell from "../../../components/AppShell";
import ProjectAssetDetail from "../../../components/ProjectAssetDetail";
import { projects } from "../../../data/projects";

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((p) => p.id === Number(id)) || projects[0];

  return (
    <AppShell>
      <ProjectAssetDetail project={project} />
    </AppShell>
  );
}
