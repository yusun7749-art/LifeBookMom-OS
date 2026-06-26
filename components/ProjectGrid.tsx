import type { Project } from "../data/projects";

function statusColor(status: string) {
  if (status === "완료") return "bg-[#DFF1E7]";
  if (status === "리뉴얼") return "bg-[#FFF3D6]";
  if (status === "예정") return "bg-[#EAF1FF]";
  return "bg-[#F7F1E8]";
}

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-5 xl:grid-cols-3 md:grid-cols-2">
      {projects.map((p) => (
        <a
          key={p.id}
          href={`/projects/${p.id}`}
          className="rounded-3xl border border-[#E4D5BE] bg-white p-6 shadow-sm hover:bg-[#FFFDF8]"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-[#7A6B5B]">{p.category} · 조회수 {p.views}</p>
              <h3 className="mt-2 text-2xl font-black">{p.topic}</h3>
            </div>
            <span className="rounded-full bg-[#231F1A] px-3 py-1 text-sm font-black text-white">
              {p.grade}
            </span>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2 text-sm font-bold">
            <span className={`rounded-xl px-3 py-2 ${statusColor(p.naver)}`}>🟢 네이버 {p.naver}</span>
            <span className={`rounded-xl px-3 py-2 ${statusColor(p.google)}`}>🔵 Google {p.google}</span>
            <span className={`rounded-xl px-3 py-2 ${statusColor(p.shorts)}`}>🎬 쇼츠 {p.shorts}</span>
            <span className={`rounded-xl px-3 py-2 ${statusColor(p.coupang)}`}>🛒 쿠팡 {p.coupang}</span>
          </div>

          <div className="mt-5 rounded-2xl bg-[#F7F1E8] p-4">
            <p className="text-sm font-bold text-[#7A6B5B]">다음 작업</p>
            <p className="mt-1 font-black">{p.next}</p>
          </div>

          <p className="mt-5 font-black text-[#B35C3D]">프로젝트 열기 →</p>
        </a>
      ))}
    </div>
  );
}
