"use client";

import { useMemo, useState } from "react";
import AppShell from "../../components/AppShell";
import {
  buildOrchestratorPlan,
  orchestratorMeta,
  orchestratorRules,
  saveOrchestratorPlan,
} from "../../data/orchestrator";

const presets = [
  "초등학생 시력 저하 막는 생활습관",
  "유괴예방",
  "장마철 준비물",
  "자기주도학습",
  "친구 부탁 거절",
  "초등학생 거짓말",
  "용돈교육",
];

export default function OrchestratorPage() {
  const [topic, setTopic] = useState("초등학생 시력 저하 막는 생활습관");
  const [saved, setSaved] = useState(false);

  const plan = useMemo(() => buildOrchestratorPlan(topic), [topic]);

  const copyPrompt = () => {
    navigator.clipboard.writeText(plan.prompt);
    alert("AI Director 요청문 복사 완료!");
  };

  const copyProductBlock = () => {
    navigator.clipboard.writeText(plan.productBlock);
    alert("쿠팡 추천 영역 복사 완료!");
  };

  const savePlan = () => {
    saveOrchestratorPlan(plan);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AppShell>
      <main className="space-y-8">
        <section className="rounded-[2rem] bg-[#231F1A] p-8 text-white">
          <p className="text-sm font-bold text-[#D9CBB7]">{orchestratorMeta.project}</p>
          <h1 className="mt-3 text-5xl font-black">🎛 Enterprise Orchestrator</h1>
          <p className="mt-4 text-xl font-bold text-[#F7F1E8]">
            주제 하나로 Content Intelligence, Product AI, Brand Center, Workflow Bus를 지휘합니다.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-4">
          <InfoCard title="카테고리" value={plan.category} />
          <InfoCard title="계절" value={plan.season} />
          <InfoCard title="품질점수" value={`${plan.qualityScore}점`} />
          <InfoCard title="추천상품" value={`${plan.productCount}개`} />
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">📌 AI Director 원칙</h2>
          <p className="mt-4 rounded-2xl bg-[#FFFDF8] p-5 font-bold">
            {orchestratorMeta.principle}
          </p>
          <div className="mt-5 grid gap-3">
            {orchestratorRules.map((rule) => (
              <div key={rule} className="rounded-2xl bg-[#F7F1E8] p-4 font-bold">
                • {rule}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">🚢 오늘 주제 입력</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {presets.map((item) => (
              <button
                key={item}
                onClick={() => setTopic(item)}
                className={`rounded-full px-5 py-3 font-black ${
                  topic === item ? "bg-[#231F1A] text-white" : "bg-[#F7F1E8]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="mt-5 w-full rounded-2xl border border-[#E4D5BE] bg-[#FFFDF8] p-5 text-xl font-bold"
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
            <h2 className="text-3xl font-black">📝 SEO & 제작 판단</h2>
            <div className="mt-5 space-y-4">
              <InfoLine label="네이버 제목" value={plan.naverSeoTitle} />
              <InfoLine label="Google 제목" value={plan.googleSeoTitle} />
              <InfoLine label="학년 적합도" value={`${plan.gradeFit}점`} />
              <InfoLine label="우선순위" value={`${plan.priorityScore}점`} />
              <InfoLine label="다음 작업" value={plan.nextAction} />
            </div>
          </section>

          <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
            <h2 className="text-3xl font-black">✅ 발행 준비 상태</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <Ready label="네이버" ok={plan.publishingReady.naver} />
              <Ready label="Google" ok={plan.publishingReady.google} />
              <Ready label="FAQ" ok={plan.publishingReady.faq} />
              <Ready label="추천상품" ok={plan.publishingReady.product} />
              <Ready label="이미지" ok={plan.publishingReady.image} />
              <Ready label="해시태그" ok={plan.publishingReady.hashtag} />
            </div>
          </section>
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          <button
            onClick={copyPrompt}
            className="rounded-2xl bg-[#231F1A] p-5 font-black text-white"
          >
            📋 전체 요청문 복사
          </button>
          <button
            onClick={copyProductBlock}
            className="rounded-2xl bg-[#9CC7B0] p-5 font-black text-[#231F1A]"
          >
            🛒 추천상품 복사
          </button>
          <button
            onClick={savePlan}
            className="rounded-2xl bg-[#F7F1E8] p-5 font-black"
          >
            💾 계획 저장
          </button>
          <a
            href="/workflow-bus"
            className="rounded-2xl bg-[#F7F1E8] p-5 text-center font-black"
          >
            🧩 Workflow Bus
          </a>
        </section>

        {saved && (
          <div className="rounded-2xl bg-[#EFF8F2] p-5 font-black text-[#2F6B4F]">
            ✅ Orchestrator 계획 저장 완료
          </div>
        )}

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">🚀 Content Engine 요청문</h2>
          <pre className="mt-5 max-h-[500px] overflow-y-auto whitespace-pre-wrap rounded-2xl bg-[#FFFDF8] p-5 text-sm leading-7">
            {plan.prompt}
          </pre>
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
      <p className="mt-2 font-bold">{value}</p>
    </div>
  );
}

function Ready({ label, ok }: { label: string; ok: boolean }) {
  return (
    <div className={`rounded-2xl p-4 font-black ${ok ? "bg-[#EFF8F2] text-[#2F6B4F]" : "bg-[#FFF0F0] text-[#8A2E2E]"}`}>
      {ok ? "✅" : "⚠️"} {label}
    </div>
  );
}
