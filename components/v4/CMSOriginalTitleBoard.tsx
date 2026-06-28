"use client";

import { useState } from "react";
import { findOriginalTitles } from "../../data/v4/cmsOriginalTitles";
import { buildImagePrompt } from "../../data/v4/imageGuardV2";
import { Shell, WriteButton } from "./UsableLayout";

export default function CMSOriginalTitleBoard() {
  const [query, setQuery] = useState("");
  const items = findOriginalTitles(query);

  const copyImagePrompt = async (title: string) => {
    await navigator.clipboard.writeText(buildImagePrompt(title));
    window.open("https://chatgpt.com/", "_blank", "noopener,noreferrer");
  };

  return (
    <Shell title="콘텐츠검색" desc="원본 제목 검색 후 바로 네이버 수정 / Google 수정 / 이미지 재생성을 실행합니다.">
      <section className="rounded-2xl border border-[#E4D5BE] bg-white p-4">
        <h2 className="text-xl font-black">원본 제목 검색</h2>
        <div className="mt-3 flex gap-2">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="예: 체취, 속옷, SNS, 물놀이"
            className="flex-1 rounded-xl border border-[#E4D5BE] px-4 py-3 text-sm font-bold outline-none"
          />
          <button onClick={() => setQuery("")} className="rounded-xl bg-[#1F1A16] px-4 py-2 text-xs font-black text-white">
            초기화
          </button>
        </div>
        <p className="mt-2 text-xs font-bold text-[#6F6255]">검색 결과 {items.length}개</p>
      </section>

      <section className="mt-4 rounded-2xl border border-[#E4D5BE] bg-white p-4">
        <h2 className="text-xl font-black">실제 발행 원본 제목</h2>
        <div className="mt-3 divide-y divide-[#EEE4D6]">
          {items.map((item) => (
            <div key={item.id} className="flex flex-wrap items-center justify-between gap-2 py-2">
              <p className="min-w-0 flex-1 text-sm font-bold">
                <span className="mr-3 text-[#2F6B4F]">{item.date}</span>
                {item.originalTitle}
              </p>
              <div className="flex shrink-0 flex-wrap gap-2">
                <WriteButton title={item.originalTitle} mode="naver" />
                <WriteButton title={item.originalTitle} mode="google" />
                <button
                  type="button"
                  onClick={() => copyImagePrompt(item.originalTitle)}
                  className="rounded-xl bg-[#FFE8F1] px-3 py-2 text-xs font-black text-[#1F1A16]"
                >
                  이미지 재생성
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Shell>
  );
}
