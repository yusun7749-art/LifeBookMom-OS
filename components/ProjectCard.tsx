import type { Project } from "../data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={`/projects/${project.id}`}
      className="block rounded-3xl border border-[#E4D5BE] bg-[#FFFDF8] p-5 hover:bg-[#FFF6DF]"
    >
      <p className="text-sm text-[#7A6B5B]">{project.category} · {project.grade}</p>
      <h3 className="mt-2 text-2xl font-black">{project.topic}</h3>
      <p className="mt-3 text-[#B35C3D]">{project.next}</p>
    </a>
  );
}
