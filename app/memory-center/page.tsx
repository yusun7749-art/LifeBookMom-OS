"use client";

import { useEffect, useState } from "react";
import AppShell from "../../components/AppShell";
import {
  memoryCenterMeta,
  memoryCenterRules,
  memorySections,
  smartRecallExamples,
} from "../../data/memoryCenter";

type LastRun = {
  at: string;
  topic: string;
  modules: string[];
  status: string;
};

type OrchestratorPlan = {
  savedAt?: string;
  topic: string;
  category: string;
  season: string;
  qualityScore: number;
  nextAction: string;
};

export default function MemoryCenterPage() {
  const [lastRun, setLastRun] = useState<LastRun | null>(null);
  const [plan, setPlan] = useState<OrchestratorPlan | null>(null);
  const [query, setQuery] = useState("장마");

  useEffect(() => {
    const run = localStorage.getItem("lifebookmom_last_content_run");
    if (run) {
      try {
        setLastRun(JSON.parse(run));
      } catch {
        setLastRun(null);
      }
    }

    const savedPlan = localStorage.getItem("lifebookmom_orchestrator_last_plan");
    if (savedPlan) {
      try {
        setPlan(JSON.parse(savedPlan));
      } catch {
        setPlan(null);
      }
    }
  }, []);

  const recall = smartRecallExamples.find((item) => query.includes(item.keyword));

  return (
    <AppShell>
      <main className="space-y-8">
        <section className="rounded-[2rem] bg-[#231F1A] p-8 text-white">
          <p className="text-sm font-bold text-[#D9CBB7]">{memoryCenterMeta.project}</p>
          <h1 className="mt-3 text-5xl font-black">🧠 Memory Center</h1>
          <p className="mt-4 text-xl font-bold text-[#F7F1E8]">
            생활백서맘의 브랜드, 콘텐츠, 상품, 이미지, 프롬프트, 의사결정을 기억합니다.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-4">
          <InfoCard title="Version" value={memoryCenterMeta.version} />
          <InfoCard title="Memory Section" value={`${memorySections.length}개`} />
          <InfoCard title="마지막 실행" value={lastRun?.topic ?? "없음"} />
          <InfoCard title="저장된 계획" value={plan?.topic ?? "없음"} />
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">📌 Memory 원칙</h2>
          <p className="mt-4 rounded-2xl bg-[#FFFDF8] p-5 text-lg font-bold">
            {memoryCenterMeta.principle}
          </p>
          <div className="mt-5 grid gap-3">
            {memoryCenterRules.map((rule) => (
              <div key={rule} className="rounded-2xl bg-[#F7F1E8] p-4 font-bold">
                • {rule}
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {memorySections.map((section) => (
            <article
              key={section.id}
              className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-black text-[#7A6B5B]">
                    {section.id}
                  </p>
                  <h2 className="mt-2 text-3xl font-black">
                    {section.icon} {section.title}
                  </h2>
                </div>
                <span
                  className={`rounded-full px-4 py-2 text-sm font-black ${
                    section.status === "연결됨"
                      ? "bg-[#EFF8F2] text-[#2F6B4F]"
                      : "bg-[#FFF7E8] text-[#8A5A13]"
                  }`}
                >
                  {section.status}
                </span>
              </div>
              <p className="mt-4 font-bold text-[#5C5146]">{section.description}</p>
              <ul className="mt-5 space-y-2 text-sm font-bold text-[#7A6B5B]">
                {section.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">🔎 Smart Recall</h2>
          <p className="mt-3 font-bold text-[#7A6B5B]">
            키워드를 입력하면 관련 글, 이미지, 상품, 리니 설정, 프롬프트를 함께 떠올리는 구조입니다.
          </p>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="mt-5 w-full rounded-2xl border border-[#E4D5BE] bg-[#FFFDF8] p-5 text-xl font-bold"
          />

          <div className="mt-5 rounded-2xl bg-[#EFF8F2] p-5 font-bold text-[#2F6B4F]">
            {recall ? recall.result : "아직 등록된 Smart Recall 예시가 없습니다. 앞으로 사용 기록이 쌓이면 자동 확장됩니다."}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          <a href="/brand-center" className="rounded-2xl bg-[#231F1A] p-5 text-center font-black text-white">
            🎨 Brand Center
          </a>
          <a href="/daily-brief" className="rounded-2xl bg-[#F7F1E8] p-5 text-center font-black">
            🌅 Daily Brief
          </a>
          <a href="/orchestrator" className="rounded-2xl bg-[#F7F1E8] p-5 text-center font-black">
            🎛 Orchestrator
          </a>
          <a href="/workflow-bus" className="rounded-2xl bg-[#F7F1E8] p-5 text-center font-black">
            🧩 Workflow Bus
          </a>
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
