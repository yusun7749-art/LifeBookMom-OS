"use client";

import { useEffect, useState } from "react";
import AppShell from "../../components/AppShell";
import { dailyBriefMeta, dailyBriefRules, defaultNextActions } from "../../data/dailyBrief";

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
  gradeFit: number;
  priorityScore: number;
  qualityScore: number;
  naverSeoTitle: string;
  googleSeoTitle: string;
  productCount: number;
  nextAction: string;
};

type CompletedRun = LastRun & {
  completedAt: string;
  result: string;
};

export default function DailyBriefPage() {
  const [lastRun, setLastRun] = useState<LastRun | null>(null);
  const [plan, setPlan] = useState<OrchestratorPlan | null>(null);
  const [completedRun, setCompletedRun] = useState<CompletedRun | null>(null);

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

    const completed = localStorage.getItem("lifebookmom_completed_content_run");
    if (completed) {
      try {
        setCompletedRun(JSON.parse(completed));
      } catch {
        setCompletedRun(null);
      }
    }
  }, []);

  const today = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <AppShell>
      <main className="space-y-8">
        <section className="rounded-[2rem] bg-[#231F1A] p-8 text-white">
          <p className="text-sm font-bold text-[#D9CBB7]">{dailyBriefMeta.project}</p>
          <h1 className="mt-3 text-5xl font-black">🌅 Daily Operating Brief</h1>
          <p className="mt-4 text-xl font-bold text-[#F7F1E8]">
            {today} · 오늘의 운영 상황과 다음 작업을 한 화면에 정리합니다.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-4">
          <InfoCard title="오늘 기준" value={today} />
          <InfoCard title="마지막 실행" value={lastRun?.topic ?? "없음"} />
          <InfoCard title="저장된 계획" value={plan?.topic ?? "없음"} />
          <InfoCard title="완료 처리" value={completedRun?.topic ?? "없음"} />
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
            <h2 className="text-3xl font-black">🚀 마지막 Content Engine 실행</h2>
            {lastRun ? (
              <div className="mt-5 space-y-3">
                <InfoLine label="실행 시간" value={lastRun.at} />
                <InfoLine label="프로젝트" value={lastRun.topic} />
                <InfoLine label="상태" value={lastRun.status} />
                <InfoLine label="모듈" value={lastRun.modules.join(", ")} />
              </div>
            ) : (
              <Empty text="아직 Content Engine 실행 기록이 없습니다." />
            )}
          </section>

          <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
            <h2 className="text-3xl font-black">🎛 마지막 Orchestrator 계획</h2>
            {plan ? (
              <div className="mt-5 space-y-3">
                <InfoLine label="저장 시간" value={plan.savedAt ?? "저장 시간 없음"} />
                <InfoLine label="주제" value={plan.topic} />
                <InfoLine label="카테고리" value={plan.category} />
                <InfoLine label="계절" value={plan.season} />
                <InfoLine label="품질점수" value={`${plan.qualityScore}점`} />
                <InfoLine label="다음 작업" value={plan.nextAction} />
              </div>
            ) : (
              <Empty text="아직 Orchestrator 계획이 저장되지 않았습니다." />
            )}
          </section>
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">🏁 완료 처리된 작업</h2>
          {completedRun ? (
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <InfoLine label="완료 시간" value={completedRun.completedAt} />
              <InfoLine label="프로젝트" value={completedRun.topic} />
              <InfoLine label="결과" value={completedRun.result} />
              <InfoLine label="모듈" value={completedRun.modules.join(", ")} />
            </div>
          ) : (
            <Empty text="아직 완료 처리된 작업이 없습니다. Workflow Engine에서 완료 처리할 수 있습니다." />
          )}
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
            <h2 className="text-3xl font-black">📌 Daily Brief Rules</h2>
            <div className="mt-5 grid gap-3">
              {dailyBriefRules.map((rule) => (
                <div key={rule} className="rounded-2xl bg-[#F7F1E8] p-4 font-bold">
                  • {rule}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
            <h2 className="text-3xl font-black">🧭 다음 추천 작업</h2>
            <div className="mt-5 grid gap-3">
              {(plan ? [plan.nextAction, ...defaultNextActions] : defaultNextActions).slice(0, 5).map((item) => (
                <div key={item} className="rounded-2xl bg-[#EFF8F2] p-4 font-black text-[#2F6B4F]">
                  ✅ {item}
                </div>
              ))}
            </div>
          </section>
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          <a href="/orchestrator" className="rounded-2xl bg-[#231F1A] p-5 text-center font-black text-white">
            🎛 Orchestrator
          </a>
          <a href="/content-intelligence" className="rounded-2xl bg-[#F7F1E8] p-5 text-center font-black">
            🧠 Content AI
          </a>
          <a href="/auto-product" className="rounded-2xl bg-[#F7F1E8] p-5 text-center font-black">
            🛒 Auto Product
          </a>
          <a href="/workflow-engine" className="rounded-2xl bg-[#F7F1E8] p-5 text-center font-black">
            ⚙️ Workflow
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

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-[#FFFDF8] p-4">
      <p className="text-sm font-black text-[#7A6B5B]">{label}</p>
      <p className="mt-2 break-words font-bold">{value}</p>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return <p className="mt-5 rounded-2xl bg-[#FFFDF8] p-5 font-bold text-[#7A6B5B]">{text}</p>;
}
