import AppShell from "../../components/AppShell";
import Header from "../../components/Header";
import ProjectTable from "../../components/ProjectTable";
import { projects } from "../../data/projects";

export default function ShortsPage() {
  const list = projects.filter((p) => p.shorts === "예정");
  return (
    <AppShell>
      <Header title="🎬 쇼츠센터" text="Google·네이버 글을 쇼츠, 유튜브, Pinterest로 확장합니다." />
      <ProjectTable projects={list} />
    </AppShell>
  );
}
