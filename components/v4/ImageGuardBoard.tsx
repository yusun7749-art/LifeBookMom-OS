"use client";

import { useState } from "react";
import { buildImagePrompt, imageGuardV2 } from "../../data/v4/imageGuardV2";
import { Shell, Box } from "./UsableLayout";

export default function ImageGuardBoard() {
  const [topic, setTopic] = useState("초등학생 속옷 교체 시기와 위생 습관, 부모가 꼭 알려줘야 할 생활습관");
  const prompt = buildImagePrompt(topic);

  const copyAndOpen = async () => {
    await navigator.clipboard.writeText(prompt);
    window.open("https://chatgpt.com/", "_blank", "noopener,noreferrer");
  };

  return (
    <Shell title="이미지 규칙" desc="다른 방 리나에게 보낼 이미지 규칙을 고정합니다.">
      <section className="rounded-2xl border border-[#E4D5BE] bg-white p-4">
        <h2 className="text-xl font-black">이미지 주제</h2>
        <div className="mt-3 flex gap-2">
          <input
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            className="flex-1 rounded-xl border border-[#E4D5BE] px-4 py-3 text-sm font-bold outline-none"
          />
          <button onClick={copyAndOpen} className="rounded-xl bg-[#1F1A16] px-4 py-2 text-xs font-black text-white">
            이미지 규칙 복사 + 이리나 열기
          </button>
        </div>
      </section>

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <Box title="절대 고정 규칙">
          <div className="space-y-2">
            {imageGuardV2.fixed.map((item) => <p key={item} className="rounded-xl bg-[#EFF8F2] p-3 text-sm font-bold text-[#2F6B4F]">✓ {item}</p>)}
          </div>
        </Box>
        <Box title="이번에 실패한 유형">
          <div className="space-y-2">
            {imageGuardV2.failExamples.map((item) => <p key={item} className="rounded-xl bg-[#FFF4EF] p-3 text-sm font-bold text-[#9F3D2E]">✕ {item}</p>)}
          </div>
        </Box>
      </div>

      <div className="mt-4">
        <Box title="복사될 이미지 프롬프트">
          <textarea readOnly value={prompt} className="h-72 w-full rounded-xl border border-[#E4D5BE] bg-[#FFFDF8] p-4 text-sm font-bold leading-6 outline-none" />
        </Box>
      </div>
    </Shell>
  );
}
