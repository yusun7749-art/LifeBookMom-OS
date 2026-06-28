"use client";

import { useEffect, useState } from "react";
import AppShell from "../../components/AppShell";
import { commandCenterMeta, commandCenterRules, commandGroups } from "../../data/commandCenter";

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
  qualityScore: number;
  nextAction: string;
};

export default function CommandCenterPage() {
  const [lastRun, setLastRun] = useState<LastRun | null>(null);
  const [plan, setPlan] = useState<OrchestratorPlan | null>(null);

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

  return (
    <AppShell>
      <main className="space-y-8">
        <section className="rounded-[2rem] bg-[#231F1A] p-8 text-white">
          <p className="text-sm font-bold text-[#D9CBB7]">{commandCenterMeta.project}</p>
          <h1 className="mt-3 text-5xl font-black">🏢 Enterprise Command Center</h1>
          <p className="mt-4 text-xl font-bold text-[#F7F1E8]">
            생활백서맘 OS의 모든 엔진을 한 화면에서 실행합니다.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-4">
          <InfoCard title="오늘 시작" value="Daily Brief" href="/daily-brief" />
          <InfoCard title="AI Director" value="Orchestrator" href="/orchestrator" />
          <InfoCard title="마지막 실행" value={lastRun?.topic ?? "없음"} href="/memory-center" />
          <InfoCard title="저장된 계획" value={plan?.topic ?? "없음"} href="/orchestrator" />
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">🚢 오늘의 추천 흐름</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-5">
            <Flow href="/daily-brief" label="1. Daily Brief" />
            <Flow href="/orchestrator" label="2. Orchestrator" />
            <Flow href="/content-engine" label="3. Content Engine" />
            <Flow href="/auto-product" label="4. Auto Product" />
            <Flow href="/workflow-engine" label="5. 완료 처리" />
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          {commandGroups.map((group) => (
            <article
              key={group.title}
              className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8"
            >
              <h2 className="text-3xl font-black">
                {group.icon} {group.title}
              </h2>
              <div className="mt-5 grid gap-3">
                {group.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="rounded-2xl bg-[#FFFDF8] p-5 hover:bg-[#EFF8F2]"
                  >
                    <p className="text-xl font-black">{link.label}</p>
                    <p className="mt-1 text-sm font-bold text-[#7A6B5B]">{link.desc}</p>
                  </a>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">📌 Command Rules</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {commandCenterRules.map((rule) => (
              <div key={rule} className="rounded-2xl bg-[#F7F1E8] p-4 font-bold">
                • {rule}
              </div>
            ))}
          </div>
        </section>
      </main>
    </AppShell>
  );
}

function InfoCard({ title, value, href }: { title: string; value: string; href: string }) {
  return (
    <a href={href} className="rounded-[2rem] border border-[#E4D5BE] bg-white p-6 hover:bg-[#EFF8F2]">
      <p className="text-sm font-black text-[#7A6B5B]">{title}</p>
      <p className="mt-2 break-words text-2xl font-black">{value}</p>
    </a>
  );
}

function Flow({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className="rounded-2xl bg-[#231F1A] p-5 text-center font-black text-white hover:bg-[#332D26]">
      {label}
    </a>
  );
}
