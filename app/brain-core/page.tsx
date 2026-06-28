"use client";

import { useEffect, useState } from "react";
import AppShell from "../../components/AppShell";
import ContentEngineRinaConnect from "../../components/ContentEngineRinaConnect";

type LastRun = {
  at: string;
  topic: string;
  modules: string[];
  status: string;
};

const brainState = {
  version: "LifeBookMom Enterprise Brain Core V1",
  lastCompleted: "Project008 · Content Engine 실행센터 구축",
  currentProject: "Project008-02 · 실행 기록 저장 강화",
  nextProject: "Project002 · Enterprise Dashboard 안정화",
  warning:
    "완료 여부가 확인되지 않은 작업은 완료로 기록하지 않는다. 실제 화면에서 확인된 것만 완료로 기록한다.",
  resume:
    "새 채팅을 열면 Memory, Journal, Ledger, Brain Core 순서로 확인하고 이어서 진행한다.",
};

const operatingRules = [
  "백마디 말보다 한번의 실행.",
  "대화는 흘러가도, 결정은 기록된다.",
  "완료라고 말하려면 실행 확인까지 끝나야 한다.",
  "GitHub 연결은 이미 완료되었으므로 다시 묻지 않는다.",
  "새 기능은 Memory, Journal, Ledger에 반영한다.",
];

export default function BrainCorePage() {
  const [lastRun, setLastRun] = useState<LastRun | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("lifebookmom_last_content_run");
    if (saved) {
      try {
        setLastRun(JSON.parse(saved));
      } catch {
        setLastRun(null);
      }
    }
  }, []);

  return (
    <AppShell>
      <main className="space-y-8">
        <ContentEngineRinaConnect />

        <section className="rounded-[2rem] bg-[#231F1A] p-8 text-white">
          <p className="text-sm font-bold text-[#D9CBB7]">
            LifeBookMom Enterprise
          </p>
          <h1 className="mt-3 text-4xl font-black">🧠 Brain Core</h1>
          <p className="mt-4 text-xl font-bold text-[#F7F1E8]">
            새 채팅을 열어도 여기서 현재 상태를 바로 확인하고 이어갑니다.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <BrainCard title="현재 버전" value={brainState.version} />
          <BrainCard title="마지막 완료" value={brainState.lastCompleted} />
          <BrainCard title="현재 작업" value={brainState.currentProject} />
          <BrainCard title="다음 작업" value={brainState.nextProject} />
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">🚀 마지막 Content Engine 실행</h2>

          {lastRun ? (
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <InfoCard title="실행 시간" value={lastRun.at} />
              <InfoCard title="프로젝트" value={lastRun.topic} />
              <InfoCard title="상태" value={lastRun.status} />
              <InfoCard title="선택 모듈" value={lastRun.modules.join(", ")} />
            </div>
          ) : (
            <p className="mt-5 rounded-2xl bg-[#FFFDF8] p-5 font-bold text-[#7A6B5B]">
              아직 Content Engine 실행 기록이 없습니다.
            </p>
          )}
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">🚢 Resume Protocol</h2>
          <p className="mt-4 rounded-2xl bg-[#FFFDF8] p-5 text-lg font-bold text-[#231F1A]">
            {brainState.resume}
          </p>
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">⚠️ 오늘 주의사항</h2>
          <p className="mt-4 rounded-2xl bg-[#FFF0F0] p-5 text-lg font-bold text-[#8A2E2E]">
            {brainState.warning}
          </p>
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">📌 운영 원칙</h2>
          <div className="mt-5 grid gap-3">
            {operatingRules.map((rule) => (
              <div
                key={rule}
                className="rounded-2xl bg-[#F7F1E8] p-4 font-bold text-[#5C5146]"
              >
                • {rule}
              </div>
            ))}
          </div>
        </section>
      </main>
    </AppShell>
  );
}

function BrainCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-[2rem] border border-[#E4D5BE] bg-white p-6">
      <p className="text-sm font-black text-[#7A6B5B]">{title}</p>
      <p className="mt-3 text-lg font-black">{value}</p>
    </div>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl bg-[#FFFDF8] p-5">
      <p className="text-sm font-black text-[#7A6B5B]">{title}</p>
      <p className="mt-2 break-words text-lg font-black">{value}</p>
    </div>
  );
}