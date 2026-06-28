"use client";

import { useMemo, useState } from "react";
import AppShell from "../../components/AppShell";
import AILauncherPanel from "../../components/AILauncherPanel";
import { projects } from "../../data/projects";
import {
  buildGoogleOneClickPrompt,
  buildImageOneClickPrompt,
  buildNaverOneClickPrompt,
  contentStudioMeta,
  studioStatus,
} from "../../data/contentStudioV2";
import { aiLauncherMeta } from "../../data/aiLauncher";

export default function ContentStudioPage() {
  const [projectIndex, setProjectIndex] = useState(0);
  const [search, setSearch] = useState("");

  const filteredProjects = useMemo(() => {
    const keyword = search.trim();
    if (!keyword) return projects;
    return projects.filter((p) =>
      `${p.topic} ${p.category} ${p.grade}`.toLowerCase().includes(keyword.toLowerCase())
    );
  }, [search]);

  const project = filteredProjects[projectIndex] ?? filteredProjects[0] ?? projects[0];

  const naverPrompt = useMemo(() => buildNaverOneClickPrompt(project), [project]);
  const googlePrompt = useMemo(() => buildGoogleOneClickPrompt(project), [project]);
  const imagePrompt = useMemo(() => buildImageOneClickPrompt(project), [project]);

  return (
    <AppShell>
      <main className="space-y-8">
        <section className="rounded-[2rem] bg-[#231F1A] p-8 text-white">
          <p className="text-sm font-bold text-[#D9CBB7]">
            {contentStudioMeta.project} · Project020
          </p>
          <h1 className="mt-3 text-5xl font-black">📝 Content Studio V4</h1>
          <p className="mt-4 text-xl font-bold text-[#F7F1E8]">
            네이버는 Project020 통합 엔진, Google은 별도 SEO 엔진으로 분리 실행합니다.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-4">
          <InfoCard title="헌법" value={contentStudioMeta.constitutionVersion} />
          <InfoCard title="Launcher" value={aiLauncherMeta.version} />
          <InfoCard title="현재 프로젝트" value={project.topic} />
          <InfoCard title="카테고리" value={`${project.category} · ${project.grade}`} />
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">🟢 Bootstrap 상태</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-4">
            {studioStatus.map((item) => (
              <div key={item} className="rounded-2xl bg-[#EFF8F2] p-4 font-black text-[#2F6B4F]">
                ✅ {item}
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
            <h2 className="text-3xl font-black">프로젝트 선택</h2>

            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setProjectIndex(0);
              }}
              placeholder="예: 수족구, SNS, 쿠팡"
              className="mt-5 w-full rounded-2xl border border-[#E4D5BE] bg-[#FFFDF8] p-4 font-bold"
            />

            <div className="mt-5 max-h-[520px] space-y-3 overflow-y-auto pr-2">
              {filteredProjects.map((p, index) => (
                <button
                  key={`${p.topic}-${index}`}
                  onClick={() => setProjectIndex(index)}
                  className={`w-full rounded-2xl p-4 text-left ${
                    index === projectIndex ? "bg-[#EFF8F2]" : "bg-[#FFFDF8]"
                  }`}
                >
                  <p className="text-sm font-bold text-[#7A6B5B]">
                    {p.category} · {p.grade}
                  </p>
                  <p className="mt-1 text-lg font-black">{p.topic}</p>
                </button>
              ))}
            </div>
          </section>

          <section className="xl:col-span-2 space-y-6">
            <section className="rounded-[2rem] bg-[#231F1A] p-8 text-white">
              <p className="text-sm text-[#D9CBB7]">
                {project.category} · {project.grade}
              </p>
              <h2 className="mt-2 text-4xl font-black">{project.topic}</h2>
              <p className="mt-3 text-[#F7F1E8]">{project.next}</p>
            </section>

            <AILauncherPanel
              project={project}
              naverPrompt={naverPrompt}
              googlePrompt={googlePrompt}
              imagePrompt={imagePrompt}
            />

            <section className="grid gap-5 md:grid-cols-2">
              <TitleCard title="🏆 네이버 대표 제목" value={project.naverTitle} />
              <TitleCard title="🌍 Google 제목" value={project.googleTitle} />
            </section>
          </section>
        </section>
      </main>
    </AppShell>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-[2rem] border border-[#E4D5BE] bg-white p-6">
      <p className="text-sm font-black text-[#7A6B5B]">{title}</p>
      <p className="mt-2 break-words text-2xl font-black">{value}</p>
    </div>
  );
}

function TitleCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-[2rem] border border-[#E4D5BE] bg-white p-6">
      <p className="text-sm font-black text-[#7A6B5B]">{title}</p>
      <p className="mt-3 text-lg font-black">{value}</p>
    </div>
  );
}
