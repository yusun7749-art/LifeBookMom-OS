"use client";

import { useMemo, useState } from "react";
import { findSeoTopics } from "../../data/v4/topicFinderEngine";
import { buildIrinaPrompt } from "../../data/v4/irinaWritingRules";
import { buildImagePrompt } from "../../data/v4/imageGuardV2";
import { registerManualTitle, setSelectedTopic } from "../../data/v4/operationStore";
import { useOperationStoreState } from "./useOperationStore";
import { Shell } from "./UsableLayout";

export default function IdeasBoard() {
  const [keyword, setKeyword] = useState("");
  const store = useOperationStoreState();
  const results = useMemo(() => findSeoTopics(keyword), [keyword]);

  const runTopic = async (title: string, mode: "naver" | "google" | "image") => {
    registerManualTitle(title, "주제찾기");
    setSelectedTopic(title);

    const text = mode === "image" ? buildImagePrompt(title) : buildIrinaPrompt(title, mode);
    await navigator.clipboard.writeText(text);
    window.open("https://chatgpt.com/", "_blank", "noopener,noreferrer");
  };

  return (
    <Shell title="주제찾기" desc="키워드를 입력하면 SEO 등급별 후보를 찾고, 선택한 주제를 바로 작성 주제로 등록합니다.">
      <section className="rounded-2xl border border-[#E4D5BE] bg-white p-4">
        <h2 className="text-xl font-black">키워드로 주제 찾기</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="예: 디지털학습, 위생, 친구관계, 방학"
            className="min-w-[320px] flex-1 rounded-xl border border-[#E4D5BE] px-4 py-3 text-sm font-bold outline-none"
          />
          <button type="button" onClick={() => setKeyword("디지털학습")} className="rounded-xl bg-[#1F1A16] px-4 py-2 text-xs font-black text-white">
            예시: 디지털학습
          </button>
        </div>
      </section>

      <section className="mt-4 rounded-2xl border border-[#E4D5BE] bg-white p-4">
        <h2 className="text-xl font-black">SEO 등급별 추천 주제</h2>
        <div className="mt-3 space-y-2">
          {results.length === 0 ? (
            <p className="rounded-xl bg-[#FFFDF8] p-4 text-sm font-bold text-[#6F6255]">
              키워드를 입력하면 S/A 등급 중심으로 주제를 찾아드립니다.
            </p>
          ) : (
            results.map((item) => (
              <div key={item.title} className="rounded-2xl bg-[#FFFDF8] p-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-black">
                      <span className="mr-2 rounded-full bg-[#DFF1E7] px-2 py-1 text-xs text-[#2F6B4F]">
                        SEO {item.grade} {item.stars}
                      </span>
                      {item.title}
                    </p>
                    <p className="mt-2 text-xs font-bold text-[#6F6255]">{item.reason}</p>
                    <p className="mt-1 text-xs text-[#8A7865]">검색의도: {item.intent} · 중복위험: {item.duplicateRisk}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => runTopic(item.title, "naver")} className="rounded-xl bg-[#1F1A16] px-3 py-2 text-xs font-black text-white">네이버 작성</button>
                    <button onClick={() => runTopic(item.title, "google")} className="rounded-xl bg-[#1F1A16] px-3 py-2 text-xs font-black text-white">Google 작성</button>
                    <button onClick={() => runTopic(item.title, "image")} className="rounded-xl bg-[#FFE8F1] px-3 py-2 text-xs font-black text-[#1F1A16]">이미지 제작</button>
                    <button onClick={() => registerManualTitle(item.title, "주제찾기")} className="rounded-xl bg-white px-3 py-2 text-xs font-black text-[#1F1A16]">주제로 등록</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="mt-4 rounded-2xl border border-[#E4D5BE] bg-white p-4">
        <h2 className="text-xl font-black">내가 등록한 주제</h2>
        <div className="mt-3 divide-y divide-[#EEE4D6]">
          {store.manualTitles.length === 0 ? (
            <p className="py-2 text-sm font-bold text-[#6F6255]">아직 등록한 주제가 없습니다.</p>
          ) : (
            store.manualTitles.map((item) => (
              <div key={item.id} className="py-2 text-sm font-bold">
                <span className="mr-3 text-[#B35C3D]">{item.date}</span>
                {item.originalTitle}
                <span className="ml-2 text-xs text-[#777]">({item.source})</span>
              </div>
            ))
          )}
        </div>
      </section>
    </Shell>
  );
}
