import AppShell from "../../components/AppShell";
import Header from "../../components/Header";
import ProjectSearchGrid from "../../components/ProjectSearchGrid";
import { projects } from "../../data/projects";

export default function ProjectsPage() {
  return (
    <AppShell>
      <Header
        title="📂 프로젝트 센터"
        text="카드형 프로젝트 관리 화면입니다. 검색하고, 필터하고, 바로 상세 관리로 들어갑니다."
      />
      <ProjectSearchGrid projects={projects} />
    </AppShell>
  );
}
