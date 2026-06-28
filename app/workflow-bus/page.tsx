"use client";

import { useEffect, useState } from "react";
import AppShell from "../../components/AppShell";
import {
  workflowBusItems,
  workflowBusMeta,
  workflowBusRules,
  workflowBusStorageKeys,
} from "../../data/workflowBus";

type LastRun = {
  at: string;
  topic: string;
  modules: string[];
  status: string;
};

type WorkflowHistory = {
  at: string;
  action: string;
  topic?: string;
};

export default function WorkflowBusPage() {
  const [lastRun, setLastRun] = useState<LastRun | null>(null);
  const [history, setHistory] = useState<WorkflowHistory[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(workflowBusStorageKeys.lastRun);
    if (saved) {
      try {
        setLastRun(JSON.parse(saved));
      } catch {
        setLastRun(null);
      }
    }

    const savedHistory = localStorage.getItem(workflowBusStorageKeys.workflowHistory);
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch {
        setHistory([]);
      }
    }
  }, []);

  const createWorkflowCheckpoint = () => {
    const item: WorkflowHistory = {
      at: new Date().toLocaleString("ko-KR"),
      action: "Workflow Bus 체크포인트 생성",
      topic: lastRun?.topic,
    };

    const next = [item, ...history].slice(0, 20);
    localStorage.setItem(workflowBusStorageKeys.workflowHistory, JSON.stringify(next));
    localStorage.setItem(
      workflowBusStorageKeys.workflowBus,
      JSON.stringify({
        at: item.at,
        currentTopic: lastRun?.topic ?? "없음",
        currentStage: "Workflow Bus 연결 확인",
        nextAction: "Memory / Journal / Ledger 자동 반영 연결",
      })
    );
    setHistory(next);
  };

  return (
    <AppShell>
      <main className="space-y-8">
        <section className="rounded-[2rem] bg-[#231F1A] p-8 text-white">
          <p className="text-sm font-bold text-[#D9CBB7]">Project009-1</p>
          <h1 className="mt-3 text-5xl font-black">🧩 Enterprise Workflow Bus</h1>
          <p className="mt-4 text-xl font-bold text-[#F7F1E8]">
            OS의 모든 모듈이 같은 작업 흐름을 공유하도록 연결합니다.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          <InfoCard title="Version" value={workflowBusMeta.version} />
          <InfoCard title="Project" value={workflowBusMeta.project} />
          <InfoCard title="Storage" value={workflowBusStorageKeys.workflowBus} />
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">🚢 목적</h2>
          <p className="mt-4 rounded-2xl bg-[#FFFDF8] p-5 text-lg font-bold">
            {workflowBusMeta.purpose}
          </p>
          <p className="mt-4 rounded-2xl bg-[#FFF0F0] p-5 font-bold text-[#8A2E2E]">
            {workflowBusMeta.principle}
          </p>
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">🚀 현재 연결된 마지막 실행</h2>
          {lastRun ? (
            <div className="mt-5 grid gap-4 md:grid-cols-2">
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
            onClick={createWorkflowCheckpoint}
            className="mt-6 w-full rounded-2xl bg-[#231F1A] p-5 text-2xl font-black text-white"
          >
            🧩 Workflow Bus 체크포인트 저장
          </button>
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">📍 Bus Flow</h2>
          <div className="mt-6 grid gap-4">
            {workflowBusItems.map((item) => (
              <div key={item.id} className="rounded-2xl bg-[#FFFDF8] p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-black text-[#7A6B5B]">
                      {item.id} · {item.module}
                    </p>
                    <h3 className="mt-1 text-xl font-black">{item.title}</h3>
                  </div>
                  <StatusBadge status={item.status} />
                </div>
                <p className="mt-3 font-bold text-[#5C5146]">{item.description}</p>
                <p className="mt-3 text-sm font-bold text-[#7A6B5B]">
                  저장 위치: {item.writesTo.join(" → ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
            <h2 className="text-3xl font-black">📌 Rules</h2>
            <div className="mt-5 grid gap-3">
              {workflowBusRules.map((rule) => (
                <div key={rule} className="rounded-2xl bg-[#F7F1E8] p-4 font-bold">
                  • {rule}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
            <h2 className="text-3xl font-black">🗂 Checkpoint History</h2>
            {history.length ? (
              <div className="mt-5 grid gap-3">
                {history.map((item, index) => (
                  <div key={`${item.at}-${index}`} className="rounded-2xl bg-[#FFFDF8] p-4">
                    <p className="font-black">{item.action}</p>
                    <p className="mt-1 text-sm font-bold text-[#7A6B5B]">
                      {item.at} · {item.topic ?? "프로젝트 없음"}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-5 rounded-2xl bg-[#FFFDF8] p-5 font-bold text-[#7A6B5B]">
                아직 체크포인트가 없습니다.
              </p>
            )}
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

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-[#FFFDF8] p-4">
      <span className="font-black text-[#7A6B5B]">{label}: </span>
      <span className="font-bold">{value}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const cls =
    status === "완료"
      ? "bg-[#EFF8F2] text-[#2F6B4F]"
      : status === "진행중"
      ? "bg-[#FFF7E8] text-[#8A5A13]"
      : "bg-[#F7F1E8] text-[#5C5146]";

  return <span className={`rounded-full px-4 py-2 text-sm font-black ${cls}`}>{status}</span>;
}
