"use client";

import Link from "next/link";
import {
  constitutionCenterMeta,
  constitutionChecklist,
  forbiddenChanges,
  lockedAssets,
  lockedPrinciples,
} from "../../data/v4/constitutionCenter";

function Badge({ value }: { value: string }) {
  return (
    <span className="rounded-full bg-[#EFF8F2] px-4 py-2 text-xs font-black text-[#2F6B4F]">
      {value}
    </span>
  );
}

export default function ConstitutionCenter() {
  return (
    <main className="min-h-screen bg-[#F5EFE6] p-8">
      <section className="rounded-[2.25rem] bg-[#1F1A16] p-9 text-white shadow-xl">
        <p className="text-sm font-bold text-[#D9CBB7]">
          {constitutionCenterMeta.project} · {constitutionCenterMeta.version}
        </p>
        <h1 className="mt-4 text-6xl font-black">⚖️ {constitutionCenterMeta.title}</h1>
        <p className="mt-4 text-2xl font-extrabold text-[#F7F1E8]">
          {constitutionCenterMeta.subtitle}
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-white/10 p-5">
            <p className="text-sm text-[#D9CBB7]">Branch</p>
            <p className="mt-2 font-black">{constitutionCenterMeta.branch}</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-5">
            <p className="text-sm text-[#D9CBB7]">Baseline</p>
            <p className="mt-2 font-black">{constitutionCenterMeta.baseline}</p>
          </div>
          <Link
            href="/enterprise"
            className="rounded-3xl bg-[#DFF1E7] p-5 font-black text-[#1F1A16]"
          >
            ← Enterprise Home
          </Link>
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-black">🔒 LOCK 운영 원칙</h2>
          <Badge value="대표 승인 필요" />
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {lockedPrinciples.map((item) => (
            <div key={item.title} className="rounded-3xl border border-[#E4D5BE] bg-[#FFFDF8] p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xl font-black">{item.title}</p>
                <Badge value={item.status} />
              </div>
              <p className="mt-3 leading-7 text-[#6F6255]">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
        <h2 className="text-3xl font-black">🏦 LOCK 자산 등록부</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {lockedAssets.map((group) => (
            <div key={group.group} className="rounded-3xl bg-[#F7F1E8] p-6">
              <p className="text-2xl font-black">{group.group}</p>
              <div className="mt-4 space-y-3">
                {group.items.map((item) => (
                  <div key={item} className="rounded-2xl bg-white p-4 font-bold">
                    ✅ {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-2">
        <div className="rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
          <h2 className="text-3xl font-black">🚫 금지 변경</h2>
          <div className="mt-5 space-y-3">
            {forbiddenChanges.map((item) => (
              <div key={item} className="rounded-2xl bg-[#FFF4EF] p-4 font-bold text-[#9F3D2E]">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
          <h2 className="text-3xl font-black">✅ 변경 전 체크리스트</h2>
          <div className="mt-5 space-y-3">
            {constitutionChecklist.map((item) => (
              <div key={item} className="rounded-2xl bg-[#EFF8F2] p-4 font-bold text-[#2F6B4F]">
                □ {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
