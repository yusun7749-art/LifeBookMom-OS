"use client";

import { useMemo, useState } from "react";
import { findOriginalTitles } from "../../data/v4/cmsOriginalTitles";
import { buildIrinaPrompt } from "../../data/v4/irinaWritingRules";
import { buildImagePrompt } from "../../data/v4/imageGuardV2";
import { setSelectedTopic } from "../../data/v4/operationStore";
import { Shell } from "./UsableLayout";

type PlatformFilter = "Naver" | "Google" | "ALL";

export default function OriginalTitleBulkBoard({
  title = "원본 제목 관리",
  desc = "검색창 아래 전체 발행내역에서 날짜 앞 체크 후 상단 버튼으로 실행합니다.",
  platform = "ALL",
}: {
  title?: string;
  desc?: string;
  platform?: PlatformFilter;
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const items = useMemo(() => findOriginalTitles(query, platform), [query, platform]);

  const toggle = (itemTitle: string) => {
    setSelected((prev) => prev.includes(itemTitle) ? prev.filter((x) => x !== itemTitle) : [...prev, itemTitle]);
  };

  const runSelected = async (mode: "naver" | "google" | "image") => {
    if (selected.length === 0) {
      alert("날짜 앞 체크박스를 먼저 선택하세요.");
      return;
    }

    setSelectedTopic(selected[0]);

    const text = selected
      .map((itemTitle) => (mode === "image" ? buildImagePrompt(itemTitle) : buildIrinaPrompt(itemTitle, mode)))
      .join("\n\n--- 다음 제목 ---\n\n");

    await navigator.clipboard.writeText(text);
    window.open("https://chatgpt.com/", "_blank", "noopener,noreferrer");
  };

  return (
    <Shell title={title} desc={desc}>
      <section className="rounded-2xl border border-[#E4D5BE] bg-white p-4">
        <div className="flex gap-2">
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="원본 제목 검색" className="flex-1 rounded-xl border border-[#E4D5BE] px-4 py-3 text-sm font-bold outline-none" />
          <button type="button" onClick={() => { setQuery(""); setSelected([]); }} className="rounded-xl bg-[#1F1A16] px-4 py-2 text-xs font-black text-white">초기화</button>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-black">전체 발행내역</h2>
            <p className="mt-1 text-xs font-bold text-[#6F6255]">검색 {items.length}개 · 선택 {selected.length}개</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => runSelected("naver")} className="rounded-xl bg-[#1F1A16] px-3 py-2 text-xs font-black text-white">네이버 작성</button>
            <button type="button" onClick={() => runSelected("google")} className="rounded-xl bg-[#1F1A16] px-3 py-2 text-xs font-black text-white">Google 작성</button>
            <button type="button" onClick={() => runSelected("image")} className="rounded-xl bg-[#FFE8F1] px-3 py-2 text-xs font-black text-[#1F1A16]">이미지 제작</button>
          </div>
        </div>

        <div className="mt-3 divide-y divide-[#EEE4D6]">
          {items.map((item) => (
            <label key={item.id} className="flex cursor-pointer items-center gap-3 py-2 text-sm font-bold">
              <input type="checkbox" checked={selected.includes(item.originalTitle)} onChange={() => toggle(item.originalTitle)} className="h-4 w-4 shrink-0" />
              <span className="w-24 shrink-0 text-[#2F6B4F]">{item.date}</span>
              <span className="min-w-0 flex-1">{item.originalTitle}</span>
            </label>
          ))}
        </div>
      </section>
    </Shell>
  );
}
