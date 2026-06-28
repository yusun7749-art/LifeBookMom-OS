"use client";

import Link from "next/link";
import {
  nextVersions,
  versionCenterMeta,
  versionHistory,
  versionRules,
} from "../../data/v4/versionCenter";

function Badge({ value }: { value: string }) {
  return (
    <span className="rounded-full bg-[#EFF8F2] px-4 py-2 text-xs font-black text-[#2F6B4F]">
      {value}
    </span>
  );
}

export default function VersionCenter() {
  return (
    <main className="min-h-screen bg-[#F5EFE6] p-8">
      <section className="rounded-[2.25rem] bg-[#1F1A16] p-9 text-white shadow-xl">
        <p className="text-sm font-bold text-[#D9CBB7]">
          {versionCenterMeta.project} · {versionCenterMeta.branch}
        </p>
        <h1 className="mt-4 text-6xl font-black">🧩 {versionCenterMeta.title}</h1>
        <p className="mt-4 text-2xl font-extrabold text-[#F7F1E8]">
          {versionCenterMeta.subtitle}
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl bg-white/10 p-5">
            <p className="text-sm text-[#D9CBB7]">Current Version</p>
            <p className="mt-2 text-2xl font-black">{versionCenterMeta.currentVersion}</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-5">
            <p className="text-sm text-[#D9CBB7]">Latest Commit</p>
            <p className="mt-2 text-2xl font-black">{versionCenterMeta.latestCommit}</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-5">
            <p className="text-sm text-[#D9CBB7]">Baseline</p>
            <p className="mt-2 font-black">{versionCenterMeta.baseline}</p>
          </div>
          <Link href="/enterprise" className="rounded-3xl bg-[#DFF1E7] p-5 font-black text-[#1F1A16]">
            ← Enterprise Home
          </Link>
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black">📌 Version History</h2>
            <p className="mt-2 text-[#7A6B5B]">OS 변경 이력과 Commit 기준점을 함께 확인합니다.</p>
          </div>
          <Badge value="ACTIVE" />
        </div>

        <div className="mt-6 space-y-4">
          {versionHistory.map((item) => (
            <div key={item.version} className="rounded-3xl border border-[#E4D5BE] bg-[#FFFDF8] p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-[#B35C3D]">{item.project}</p>
                  <h3 className="mt-2 text-3xl font-black">{item.version}</h3>
                </div>
                <Badge value={item.status} />
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl bg-white p-4">
                  <p className="text-xs font-black text-[#9A8B7B]">Title</p>
                  <p className="mt-2 font-bold">{item.title}</p>
                </div>
                <div className="rounded-2xl bg-white p-4">
                  <p className="text-xs font-black text-[#9A8B7B]">Reason</p>
                  <p className="mt-2 font-bold">{item.reason}</p>
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

      <section className="mt-8 grid gap-6 xl:grid-cols-2">
        <div className="rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
          <h2 className="text-3xl font-black">✅ Version Rule</h2>
          <div className="mt-5 space-y-3">
            {versionRules.map((item) => (
              <div key={item} className="rounded-2xl bg-[#EFF8F2] p-4 font-bold text-[#2F6B4F]">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
          <h2 className="text-3xl font-black">⏭ Next Versions</h2>
          <div className="mt-5 space-y-3">
            {nextVersions.map((item) => (
              <div key={item.version} className="rounded-2xl bg-[#FFFDF8] p-4">
                <p className="text-xl font-black">{item.version}</p>
                <p className="mt-1 font-bold text-[#7A6B5B]">{item.target}</p>
                <p className="mt-2 text-sm font-black text-[#B35C3D]">{item.status}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
