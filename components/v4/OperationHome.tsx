"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { recommended, blocked, stats } from "../../data/v4/usableERP";
import { Shell } from "./UsableLayout";

type RowState = "active" | "duplicate" | "published";

export default function OperationHome() {
  const [query, setQuery] = useState("");
  const [states, setStates] = useState<Record<string, RowState>>({});

  const rows = useMemo(() => {
    const q = query.trim();
    if (!q) return recommended;
    return recommended.filter((item) => item.title.includes(q) || item.group.includes(q) || item.relation.includes(q));
  }, [query]);

  const activeRows = rows.filter((row) => states[row.title] !== "duplicate" && states[row.title] !== "published");
  const publishedCount = Object.values(states).filter((v) => v === "published").length;
  const duplicateCount = Object.values(states).filter((v) => v === "duplicate").length;

  return (
    <Shell title="생활백서맘 운영본부" desc="오늘의 추천 주제에서 바로 작성하고, 중복은 제외합니다.">
      <section className="grid gap-3 md:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.title} href={s.link} className="rounded-2xl bg-white p-4">
            <p className="font-black">{s.title}</p>
            <p className="mt-1 text-2xl font-black text-[#2F6B4F]">{s.value}</p>
          </Link>
        ))}
      </section>

      <section className="mt-4 rounded-2xl border border-[#E4D5BE] bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-black">오늘의 추천 주제</h2>
          <div className="text-xs font-black text-[#6F6255]">발행 {publishedCount} · 중복제외 {duplicateCount}</div>
        </div>

        <div className="mt-3 flex gap-2">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="추천 주제 검색" className="flex-1 rounded-xl border border-[#E4D5BE] px-4 py-3 text-sm font-bold outline-none" />
          <button onClick={() => setQuery("")} className="rounded-xl bg-[#1F1A16] px-4 py-2 text-xs font-black text-white">초기화</button>
        </div>

        <div className="mt-3 divide-y divide-[#EEE4D6]">
          {activeRows.map((item) => (
            <div key={item.title} className="flex flex-wrap items-center justify-between gap-2 py-2">
              <div className="min-w-0 flex-1">
                <p className="font-black">{item.title}</p>
                <p className="mt-1 text-xs text-[#6F6255]">SEO {item.seoGrade} · {item.relation}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link href={`/content-studio?topic=${encodeURIComponent(item.title)}&mode=naver`} className="rounded-xl bg-[#1F1A16] px-3 py-2 text-xs font-black text-white">네이버 작성</Link>
                <Link href={`/content-studio?topic=${encodeURIComponent(item.title)}&mode=google`} className="rounded-xl bg-[#1F1A16] px-3 py-2 text-xs font-black text-white">Google 작성</Link>
                <Link href={`/content-studio?topic=${encodeURIComponent(item.title)}&mode=image`} className="rounded-xl bg-[#FFE8F1] px-3 py-2 text-xs font-black text-[#1F1A16]">이미지</Link>
                <button onClick={() => setStates((p) => ({ ...p, [item.title]: "published" }))} className="rounded-xl bg-[#FFE8E8] px-3 py-2 text-xs font-black text-[#D22222]">✅ 발행완료</button>
                <button onClick={() => setStates((p) => ({ ...p, [item.title]: "duplicate" }))} className="rounded-xl bg-[#EFEFEF] px-3 py-2 text-xs font-black text-[#777]">⚠️ 중복</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-4 rounded-2xl border border-[#E4D5BE] bg-white p-4">
        <h2 className="text-xl font-black">중복 차단 목록</h2>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {blocked.slice(0, 12).map((item) => (
            <div key={item.title} className="rounded-xl bg-[#FFF4EF] p-3 text-xs font-bold text-[#9F3D2E]">{item.title} · {item.reason}</div>
          ))}
        </div>
      </section>
    </Shell>
  );
}
