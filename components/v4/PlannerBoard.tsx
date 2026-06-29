"use client";

import { useMemo, useState } from "react";
import { originalPublishedTitles } from "../../data/v4/cmsOriginalTitles";
import { Shell } from "./UsableLayout";

export default function PlannerBoard() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const naver = useMemo(() => originalPublishedTitles.filter((item) => item.platform === "Naver" && (!q || [item.originalTitle, item.date, item.project].join(" ").toLowerCase().includes(q))), [q]);
  const google = useMemo(() => originalPublishedTitles.filter((item) => item.platform === "Google" && (!q || [item.originalTitle, item.date, item.project].join(" ").toLowerCase().includes(q))), [q]);

  const List = ({ items, color }: { items: typeof originalPublishedTitles; color: "naver" | "google" }) => (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className={`rounded-xl p-3 ${color === "naver" ? "bg-[#EFF8F2]" : "bg-[#EEF4FF]"}`}>
          <p className={`text-xs font-black ${color === "naver" ? "text-[#2F6B4F]" : "text-[#315C9D]"}`}>{item.date}</p>
          <p className="mt-1 text-sm font-black leading-5">{item.originalTitle}</p>
          <p className="mt-1 text-xs font-bold text-[#6F6255]">{item.status} · {item.project}</p>
        </div>
      ))}
    </div>
  );

  return (
    <Shell title="발행관리" desc="네이버와 Google 발행내역을 반반으로 나눠 한눈에 비교합니다.">
      <section className="grid gap-3 md:grid-cols-4">
        <div className="rounded-2xl bg-white p-4"><p className="font-black">네이버</p><p className="mt-1 text-2xl font-black text-[#2F6B4F]">{naver.length}</p></div>
        <div className="rounded-2xl bg-white p-4"><p className="font-black">Google</p><p className="mt-1 text-2xl font-black text-[#315C9D]">{google.length}</p></div>
        <div className="rounded-2xl bg-white p-4"><p className="font-black">전체</p><p className="mt-1 text-2xl font-black">{naver.length + google.length}</p></div>
        <div className="rounded-2xl bg-white p-4"><p className="font-black">차이</p><p className="mt-1 text-2xl font-black text-[#B35C3D]">{Math.abs(naver.length - google.length)}</p></div>
      </section>

      <section className="mt-4 rounded-2xl border border-[#E4D5BE] bg-white p-4">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="원본 제목 검색" className="w-full rounded-xl border border-[#E4D5BE] px-4 py-3 text-sm font-bold outline-none" />
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-2">
        <div className="rounded-2xl border border-[#E4D5BE] bg-white p-4">
          <h2 className="text-xl font-black">네이버 발행</h2>
          <div className="mt-3"><List items={naver} color="naver" /></div>
        </div>

        <div className="rounded-2xl border border-[#E4D5BE] bg-white p-4">
          <h2 className="text-xl font-black">Google 발행</h2>
          <div className="mt-3"><List items={google} color="google" /></div>
        </div>
      </section>
    </Shell>
  );
}
