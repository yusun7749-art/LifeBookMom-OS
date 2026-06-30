
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { duplicateCmsTitle, publishCmsTitle } from "../../data/v4/cmsStore";
import { getRevenueRecommendations } from "../../data/v4/revenueRecommendationEngine";
import { setSelectedTopic } from "../../data/v4/operationStore";
import { useCmsStore } from "./useCmsStore";
import { Shell } from "./UsableLayout";

export default function OperationHome() {
  const [query, setQuery] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const cmsItems = useCmsStore();

  useEffect(() => {
    setRefreshKey(Date.now());
  }, []);

  const stats = useMemo(() => ({
    total: cmsItems.filter((item) => item.status === "published").length,
    naver: cmsItems.filter((item) => item.status === "published" && item.platform === "Naver").length,
    google: cmsItems.filter((item) => item.status === "published" && item.platform === "Google").length,
    duplicate: cmsItems.filter((item) => item.status === "duplicate").length,
  }), [cmsItems]);

  const allRows = useMemo(() => getRevenueRecommendations(30), [cmsItems, refreshKey]);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allRows.slice(0, 10);
    return allRows
      .filter((item) => [item.title, item.category, item.relation, item.reason, item.intentKey].join(" ").toLowerCase().includes(q))
      .slice(0, 10);
  }, [allRows, query]);

  const refresh = () => setRefreshKey(Date.now() + Math.floor(Math.random() * 999999));
  const publish = (title: string) => publishCmsTitle(title, "data-center", "ALL");
  const duplicate = (title: string) => duplicateCmsTitle(title, "data-center");

  return (
    <Shell title="데이터센터" desc="CMS 기준으로 중복 의도를 제거하고 승인 유입 수익 점수가 높은 10개만 추천합니다.">
      <section className="grid gap-3 md:grid-cols-4">
        <Link href="/planner" className="rounded-2xl bg-white p-4"><p className="font-black">전체 발행</p><p className="mt-1 text-2xl font-black text-[#2F6B4F]">{stats.total}</p></Link>
        <Link href="/naver-board" className="rounded-2xl bg-white p-4"><p className="font-black">네이버</p><p className="mt-1 text-2xl font-black text-[#2F6B4F]">{stats.naver}</p></Link>
        <Link href="/google-board" className="rounded-2xl bg-white p-4"><p className="font-black">Google</p><p className="mt-1 text-2xl font-black text-[#315C9D]">{stats.google}</p></Link>
        <div className="rounded-2xl bg-white p-4"><p className="font-black">중복 제외</p><p className="mt-1 text-2xl font-black text-[#B35C3D]">{stats.duplicate}</p></div>
      </section>

      <section className="mt-4 rounded-2xl border border-[#E4D5BE] bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-black">오늘의 Revenue 추천주제 TOP10</h2>
            <p className="mt-1 text-xs font-bold text-[#6F6255]">제목 중복 검색의도 중복 제거, CMS 발행 중복 자동 제외</p>
          </div>
          <button onClick={refresh} className="rounded-xl bg-[#DFF1E7] px-4 py-2 text-xs font-black text-[#1F1A16]">새 추천받기</button>
        </div>

        <div className="mt-3 flex gap-2">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="수족구, 로블록스, 학교폭력, 시력, 위생 검색" className="flex-1 rounded-xl border border-[#E4D5BE] px-4 py-3 text-sm font-bold outline-none" />
          <button onClick={() => setQuery("")} className="rounded-xl bg-[#1F1A16] px-4 py-2 text-xs font-black text-white">초기화</button>
        </div>

        <div className="mt-3 divide-y divide-[#EEE4D6]">
          {rows.map((item, index) => (
            <div key={`${item.intentKey}-${item.title}`} className="flex flex-wrap items-center justify-between gap-2 py-3">
              <div className="flex min-w-0 flex-1 gap-3">
                <div className="w-7 shrink-0 text-xl font-black text-[#2F6B4F]">{String(index + 1).padStart(2, "0")}</div>
                <div className="min-w-0 flex-1">
                  <p className="font-black">{item.title}</p>
                  <p className="mt-1 text-xs text-[#6F6255]">
                    SEO {item.seoGrade} · 총점 {item.totalScore} · 유입 {item.trafficScore} · 승인 {item.approvalScore} · 쿠팡 {item.coupangScore}
                  </p>
                  <p className="mt-1 text-xs text-[#2F6B4F]">{item.reason}</p>
                  {item.productHints.length ? <p className="mt-1 text-xs text-[#8A7865]">추천상품: {item.productHints.join(", ")}</p> : null}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Link onClick={() => setSelectedTopic(item.title)} href={`/content-studio?topic=${encodeURIComponent(item.title)}&mode=naver`} className="rounded-xl bg-[#1F1A16] px-3 py-2 text-xs font-black text-white">네이버</Link>
                <Link onClick={() => setSelectedTopic(item.title)} href={`/content-studio?topic=${encodeURIComponent(item.title)}&mode=google`} className="rounded-xl bg-[#1F1A16] px-3 py-2 text-xs font-black text-white">Google</Link>
                <Link onClick={() => setSelectedTopic(item.title)} href={`/content-studio?topic=${encodeURIComponent(item.title)}&mode=image`} className="rounded-xl bg-[#FFE8F1] px-3 py-2 text-xs font-black text-[#1F1A16]">이미지</Link>
                <button onClick={() => publish(item.title)} className="rounded-xl bg-[#FFE8E8] px-3 py-2 text-xs font-black text-[#D22222]">✅ 발행완료</button>
                <button onClick={() => duplicate(item.title)} className="rounded-xl bg-[#EFEFEF] px-3 py-2 text-xs font-black text-[#777]">⚠️ 중복</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Shell>
  );
}
