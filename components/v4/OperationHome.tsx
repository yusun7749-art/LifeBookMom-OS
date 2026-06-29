"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { recommended, stats } from "../../data/v4/usableERP";
import { markTopicHidden, setSelectedTopic } from "../../data/v4/operationStore";
import { useOperationStoreState } from "./useOperationStore";
import { Shell } from "./UsableLayout";

export default function OperationHome() {
  const [query, setQuery] = useState("");
  const store = useOperationStoreState();

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return recommended
      .filter((item) => !store.hiddenTopicTitles.includes(item.title))
      .filter((item) => !q || [item.title, item.group, item.relation, item.reason].join(" ").toLowerCase().includes(q));
  }, [query, store.hiddenTopicTitles]);

  const publishedCount = store.publishedTitles.length;
  const duplicateCount = store.duplicateTitles.length;

  const hide = (title: string, state: "published" | "duplicate") => {
    markTopicHidden(title, state);
  };

  return (
    <Shell title="데이터센터" desc="실제 발행 데이터와 Revenue 추천주제를 관리합니다. 발행완료/중복 상태는 저장됩니다.">
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
          <h2 className="text-xl font-black">Revenue 추천 주제</h2>
          <div className="text-xs font-black text-[#6F6255]">발행 {publishedCount} · 중복제외 {duplicateCount} · 표시 {rows.length}</div>
        </div>

        <div className="mt-3 flex gap-2">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="수족구, 로블록스, 학교폭력, 시력, 위생 검색" className="flex-1 rounded-xl border border-[#E4D5BE] px-4 py-3 text-sm font-bold outline-none" />
          <button onClick={() => setQuery("")} className="rounded-xl bg-[#1F1A16] px-4 py-2 text-xs font-black text-white">초기화</button>
        </div>

        <div className="mt-3 divide-y divide-[#EEE4D6]">
          {rows.map((item) => (
            <div key={item.title} className="flex flex-wrap items-center justify-between gap-2 py-2">
              <div className="min-w-0 flex-1">
                <p className="font-black">{item.title}</p>
                <p className="mt-1 text-xs text-[#6F6255]">SEO {item.seoGrade} · {item.relation}</p>
                <p className="mt-1 text-xs text-[#2F6B4F]">{item.reason}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link onClick={() => setSelectedTopic(item.title)} href={`/content-studio?topic=${encodeURIComponent(item.title)}&mode=naver`} className="rounded-xl bg-[#1F1A16] px-3 py-2 text-xs font-black text-white">네이버</Link>
                <Link onClick={() => setSelectedTopic(item.title)} href={`/content-studio?topic=${encodeURIComponent(item.title)}&mode=google`} className="rounded-xl bg-[#1F1A16] px-3 py-2 text-xs font-black text-white">Google</Link>
                <Link onClick={() => setSelectedTopic(item.title)} href={`/content-studio?topic=${encodeURIComponent(item.title)}&mode=image`} className="rounded-xl bg-[#FFE8F1] px-3 py-2 text-xs font-black text-[#1F1A16]">이미지</Link>
                <button onClick={() => hide(item.title, "published")} className="rounded-xl bg-[#FFE8E8] px-3 py-2 text-xs font-black text-[#D22222]">✅ 발행완료</button>
                <button onClick={() => hide(item.title, "duplicate")} className="rounded-xl bg-[#EFEFEF] px-3 py-2 text-xs font-black text-[#777]">⚠️ 중복</button>
              </div>
            </div>
          ))}
          {rows.length === 0 ? <p className="py-5 text-sm font-bold text-[#6F6255]">표시할 추천 주제가 없습니다. 검색어를 바꾸거나 발행완료/중복 처리된 항목을 확인하세요.</p> : null}
        </div>
      </section>
    </Shell>
  );
}
