"use client";

import Link from "next/link";
import {
  affectedModules,
  approvalRules,
  decisionCenterMeta,
  decisionHistory,
  decisionSummary,
  rollbackPoints,
} from "../../data/v4/decisionCenter";

function Badge({ value }: { value: string }) {
  return (
    <span className="rounded-full bg-[#EFF8F2] px-4 py-2 text-xs font-black text-[#2F6B4F]">
      {value}
    </span>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-[#E4D5BE] bg-white p-5">
      <p className="text-sm font-black text-[#8A7B6A]">{label}</p>
      <p className="mt-3 text-2xl font-black text-[#231F1A]">{value}</p>
    </div>
  );
}

export default function DecisionCenter() {
  return (
    <main className="min-h-screen bg-[#F5EFE6] p-8">
      <section className="rounded-[2.25rem] bg-[#1F1A16] p-9 text-white shadow-xl">
        <p className="text-sm font-bold text-[#D9CBB7]">
          {decisionCenterMeta.project} · {decisionCenterMeta.branch}
        </p>
        <h1 className="mt-4 text-6xl font-black">🧾 {decisionCenterMeta.title}</h1>
        <p className="mt-4 text-2xl font-extrabold text-[#F7F1E8]">
          {decisionCenterMeta.subtitle}
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-white/10 p-5">
            <p className="text-sm text-[#D9CBB7]">Latest Commit</p>
            <p className="mt-2 font-black">{decisionCenterMeta.latestCommit}</p>
            <p className="mt-1 text-sm text-[#D9CBB7]">{decisionCenterMeta.latestMessage}</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-5">
            <p className="text-sm text-[#D9CBB7]">Baseline</p>
            <p className="mt-2 font-black">{decisionCenterMeta.baseline}</p>
          </div>
          <Link
            href="/enterprise"
            className="rounded-3xl bg-[#DFF1E7] p-5 font-black text-[#1F1A16]"
          >
            ← Enterprise Home
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-4">
        {decisionSummary.map((item) => (
          <SummaryCard key={item.label} label={item.label} value={item.value} />
        ))}
      </section>

      <section className="mt-8 rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black">📌 Decision History</h2>
            <p className="mt-2 text-[#7A6B5B]">
              같은 결정을 반복하지 않도록 이유, 승인, 영향, Commit을 함께 기록합니다.
            </p>
          </div>
          <Badge value="ACTIVE" />
        </div>

        <div className="mt-6 space-y-4">
          {decisionHistory.map((item) => (
            <div key={item.id} className="rounded-3xl border border-[#E4D5BE] bg-[#FFFDF8] p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-[#B35C3D]">{item.id} · {item.project}</p>
                  <h3 className="mt-2 text-2xl font-black">{item.title}</h3>
                </div>
                <Badge value={item.status} />
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-4">
                <div className="rounded-2xl bg-white p-4">
                  <p className="text-xs font-black text-[#9A8B7B]">Reason</p>
                  <p className="mt-2 font-bold">{item.reason}</p>
                </div>
                <div className="rounded-2xl bg-white p-4">
                  <p className="text-xs font-black text-[#9A8B7B]">Impact</p>
                  <p className="mt-2 font-bold">{item.impact}</p>
                </div>
                <div className="rounded-2xl bg-white p-4">
                  <p className="text-xs font-black text-[#9A8B7B]">Approved</p>
                  <p className="mt-2 font-bold">{item.approvedBy}</p>
                </div>
                <div className="rounded-2xl bg-white p-4">
                  <p className="text-xs font-black text-[#9A8B7B]">Commit</p>
                  <p className="mt-2 font-black">{item.commit}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-3">
        <div className="rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
          <h2 className="text-3xl font-black">🧩 영향 모듈</h2>
          <div className="mt-5 space-y-3">
            {affectedModules.map((item) => (
              <div key={item} className="rounded-2xl bg-[#F7F1E8] p-4 font-bold">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
          <h2 className="text-3xl font-black">✅ 승인 규칙</h2>
          <div className="mt-5 space-y-3">
            {approvalRules.map((item) => (
              <div key={item} className="rounded-2xl bg-[#EFF8F2] p-4 font-bold text-[#2F6B4F]">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
          <h2 className="text-3xl font-black">♻️ Rollback Points</h2>
          <div className="mt-5 space-y-3">
            {rollbackPoints.map((item) => (
              <div key={item.commit} className="rounded-2xl bg-[#FFFDF8] p-4">
                <p className="font-black">{item.commit}</p>
                <p className="mt-1 text-sm text-[#7A6B5B]">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
