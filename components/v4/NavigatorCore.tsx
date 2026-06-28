"use client";

import Link from "next/link";
import {
  navigatorCoreMeta,
  navigatorPriorities,
  navigatorRoutes,
  navigatorRules,
} from "../../data/v4/navigatorCore";

function Badge({ value }: { value: string }) {
  return (
    <span className="rounded-full bg-[#EFF8F2] px-4 py-2 text-xs font-black text-[#2F6B4F]">
      {value}
    </span>
  );
}

export default function NavigatorCore() {
  return (
    <main className="min-h-screen bg-[#F5EFE6] p-8">
      <section className="rounded-[2.25rem] bg-[#1F1A16] p-9 text-white shadow-xl">
        <p className="text-sm font-bold text-[#D9CBB7]">
          {navigatorCoreMeta.project} · {navigatorCoreMeta.branch}
        </p>
        <h1 className="mt-4 text-6xl font-black">🧭 {navigatorCoreMeta.title}</h1>
        <p className="mt-4 text-2xl font-extrabold text-[#F7F1E8]">
          {navigatorCoreMeta.subtitle}
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-white/10 p-5">
            <p className="text-sm text-[#D9CBB7]">Latest Commit</p>
            <p className="mt-2 font-black">{navigatorCoreMeta.latestCommit}</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-5">
            <p className="text-sm text-[#D9CBB7]">Baseline</p>
            <p className="mt-2 font-black">{navigatorCoreMeta.baseline}</p>
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
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black">🚢 OS Navigation Map</h2>
            <p className="mt-2 text-[#7A6B5B]">
              운영본부의 모든 센터로 이동하는 중앙 허브입니다.
            </p>
          </div>
          <Badge value="READY" />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {navigatorRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="rounded-3xl border border-[#E4D5BE] bg-[#FFFDF8] p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="text-5xl">{route.icon}</div>
                <Badge value={route.status} />
              </div>
              <p className="mt-4 text-2xl font-black">{route.title}</p>
              <p className="mt-3 leading-7 text-[#6F6255]">{route.role}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-2">
        <div className="rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
          <h2 className="text-3xl font-black">🎯 오늘 항해 우선순위</h2>
          <div className="mt-5 space-y-3">
            {navigatorPriorities.map((item) => (
              <div key={item} className="rounded-2xl bg-[#F7F1E8] p-4 font-bold">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
          <h2 className="text-3xl font-black">✅ Navigator Rules</h2>
          <div className="mt-5 space-y-3">
            {navigatorRules.map((item) => (
              <div key={item} className="rounded-2xl bg-[#EFF8F2] p-4 font-bold text-[#2F6B4F]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
