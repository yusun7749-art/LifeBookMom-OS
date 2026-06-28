"use client";

import { useEffect, useState } from "react";
import AppShell from "../../components/AppShell";
import { workflowRules, workflowState, workflowSteps } from "../../data/workflowEngine";

type LastRun = {
  at: string;
  topic: string;
  modules: string[];
  status: string;
};

type CompletedRun = LastRun & {
  completedAt: string;
  result: string;
};

export default function WorkflowEnginePage() {
  const [lastRun, setLastRun] = useState<LastRun | null>(null);
  const [completedRun, setCompletedRun] = useState<CompletedRun | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("lifebookmom_last_content_run");
    if (saved) {
      try {
        setLastRun(JSON.parse(saved));
      } catch {
        setLastRun(null);
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

  const completeLastRun = () => {
    if (!lastRun) return;

    const completed: CompletedRun = {
      ...lastRun,
      completedAt: new Date().toLocaleString("ko-KR"),
      result: "작업 완료 처리됨",
    };

    localStorage.setItem("lifebookmom_completed_content_run", JSON.stringify(completed));
    setCompletedRun(completed);
  };

  return (
    <AppShell>
      <main className="space-y-8">
        <section className="rounded-[2rem] bg-[#231F1A] p-8 text-white">
          <p className="text-sm font-bold text-[#D9CBB7]">
            LifeBookMom Enterprise
          </p>
          <h1 className="mt-3 text-5xl font-black">⚙️ Workflow Engine</h1>
          <p className="mt-4 text-xl font-bold text-[#F7F1E8]">
            Content Engine 실행 후 OS가 다음 단계로 이어지도록 관리합니다.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-4">
          <InfoCard title="Project" value={workflowState.project} />
          <InfoCard title="Version" value={workflowState.version} />
          <InfoCard title="Status" value={workflowState.currentStatus} />
          <InfoCard title="Progress" value={`${workflowState.progress}%`} />
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">🚢 현재 목표</h2>
          <p className="mt-4 rounded-2xl bg-[#FFFDF8] p-5 text-lg font-bold text-[#231F1A]">
            {workflowState.purpose}
          </p>

          <div className="mt-6 h-5 rounded-full bg-[#F1E6D6]">
            <div
              className="h-5 rounded-full bg-[#9CC7B0]"
              style={{ width: `${workflowState.progress}%` }}
            />
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
            <h2 className="text-3xl font-black">🚀 마지막 실행</h2>
            {lastRun ? (
              <div className="mt-5 space-y-3">
                <InfoLine label="실행 시간" value={lastRun.at} />
                <InfoLine label="프로젝트" value={lastRun.topic} />
                <InfoLine label="상태" value={lastRun.status} />
                <InfoLine label="모듈" value={lastRun.modules.join(", ")} />
              </div>
            ) : (
              <p className="mt-5 rounded-2xl bg-[#FFFDF8] p-5 font-bold text-[#7A6B5B]">
                아직 Content Engine 실행 기록이 없습니다.
              </p>
            )}

            <button
              onClick={completeLastRun}
              disabled={!lastRun}
              className="mt-6 w-full rounded-2xl bg-[#231F1A] p-5 text-2xl font-black text-white disabled:opacity-40"
            >
              ✅ 마지막 작업 완료 처리
            </button>
          </section>

          <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
            <h2 className="text-3xl font-black">🏁 완료 기록</h2>
            {completedRun ? (
              <div className="mt-5 space-y-3">
                <InfoLine label="완료 시간" value={completedRun.completedAt} />
                <InfoLine label="프로젝트" value={completedRun.topic} />
                <InfoLine label="결과" value={completedRun.result} />
                <InfoLine label="모듈" value={completedRun.modules.join(", ")} />
              </div>
            ) : (
              <p className="mt-5 rounded-2xl bg-[#FFFDF8] p-5 font-bold text-[#7A6B5B]">
                아직 완료 처리된 작업이 없습니다.
              </p>
            )}
          </section>
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">📍 Workflow Steps</h2>
          <div className="mt-6 grid gap-4">
            {workflowSteps.map((step) => (
              <div key={step.id} className="rounded-2xl bg-[#FFFDF8] p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-black text-[#7A6B5B]">{step.id}</p>
                    <h3 className="mt-1 text-xl font-black">{step.title}</h3>
                  </div>
                  <span
                    className={`rounded-full px-4 py-2 text-sm font-black ${
                      step.status === "완료"
                        ? "bg-[#EFF8F2] text-[#2F6B4F]"
                        : step.status === "진행중"
                        ? "bg-[#FFF7E8] text-[#8A5A13]"
                        : "bg-[#F7F1E8] text-[#5C5146]"
                    }`}
                  >
                    {step.status}
                  </span>
                </div>
                <p className="mt-3 text-[#5C5146]">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">📌 Workflow Rules</h2>
          <div className="mt-5 grid gap-3">
            {workflowRules.map((rule) => (
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
      <span className="font-black text-[#7A6B5B]">{label}: </span>
      <span className="font-bold">{value}</span>
    </div>
  );
}
