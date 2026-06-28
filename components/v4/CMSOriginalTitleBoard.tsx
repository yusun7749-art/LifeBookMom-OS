"use client";

import { useState } from "react";
import { findOriginalTitles } from "../../data/v4/cmsOriginalTitles";
import { Box, Shell, WriteButton } from "./UsableLayout";
import { buildImagePrompt } from "../../data/v4/imageGuardV2";

export default function CMSOriginalTitleBoard() {
  const [query, setQuery] = useState("");
  const items = findOriginalTitles(query);

  const copyImagePrompt = async (title: string) => {
    await navigator.clipboard.writeText(buildImagePrompt(title));
    window.open("https://chatgpt.com/", "_blank", "noopener,noreferrer");
  };

  return (
    <Shell title="콘텐츠검색" desc="실제 발행했던 원본 제목 그대로 관리하고, 최신 규칙으로 재작성합니다.">
      <section className="rounded-2xl border border-[#E4D5BE] bg-white p-4">
        <h2 className="text-xl font-black">원본 제목 검색</h2>
        <div className="mt-3 flex gap-2">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="예: 체취, 사춘기, 속옷, SNS"
            className="flex-1 rounded-xl border border-[#E4D5BE] px-4 py-3 text-sm font-bold outline-none"
          />
          <button onClick={() => setQuery("")} className="rounded-xl bg-[#1F1A16] px-4 py-2 text-xs font-black text-white">
            초기화
          </button>
        </div>
        <p className="mt-2 text-xs font-bold text-[#6F6255]">검색 결과 {items.length}개</p>
      </section>

      <div className="mt-4">
        <Box title="실제 발행 원본 제목">
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.originalTitle} className="rounded-2xl bg-[#FFFDF8] p-3">
                <div className="grid gap-3 xl:grid-cols-[1fr_360px]">
                  <div>
                    <p className="font-black">{item.originalTitle}</p>
                    <p className="mt-1 text-xs font-bold text-[#7A6B5B]">
                      {item.date} · {item.category} · 네이버 {item.naver} · Google {item.google} · 이미지 {item.image}
                    </p>
                    <p className="mt-1 text-xs text-[#6F6255]">{item.memo}</p>
                    <p className="mt-1 text-xs font-bold text-[#2F6B4F]">{item.keywords.join(" · ")}</p>
                  </div>

                  <div className="flex flex-wrap items-start justify-end gap-2">
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
              </div>
            ))}
          </div>
        </Box>
      </div>
    </Shell>
  );
}
