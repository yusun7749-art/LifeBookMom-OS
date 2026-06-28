"use client";

import { useMemo, useState } from "react";
import { recommended } from "../../data/v4/usableERP";
import { buildIrinaPrompt, getModeLabel, getModeRules, irinaWritingRules } from "../../data/v4/irinaWritingRules";
import { Box, SeoBadge, Shell, WriteButton } from "./UsableLayout";

function useQueryParam(name: string) {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get(name) ?? "";
}

export default function ContentStudioHome() {
  const topicFromUrl = useQueryParam("topic");
  const modeFromUrl = useQueryParam("mode") || "naver";

  const [topic, setTopic] = useState(topicFromUrl || recommended[0]?.title || "");
  const [mode, setMode] = useState(modeFromUrl);

  const currentRules = useMemo(() => getModeRules(mode), [mode]);
  const prompt = useMemo(() => buildIrinaPrompt(topic, mode), [topic, mode]);

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(prompt);
    alert("이리나 글쓰기 기준이 복사되었습니다. ChatGPT 이리나 방에 붙여넣으면 됩니다.");
  };

  return (
    <Shell title="글쓰기" desc="네이버 작성 / Google 작성을 누르면 이리나 규칙에 맞춘 작업 화면으로 넘어옵니다.">
      <section className="rounded-2xl border border-[#E4D5BE] bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-black">{getModeLabel(mode)}</h2>
            <p className="mt-1 text-xs font-bold text-[#6F6255]">
              선택된 주제와 작성 모드에 맞춰 변경 불가 규칙을 자동 적용합니다.
            </p>
          </div>
          <button
            type="button"
            onClick={copyPrompt}
            className="rounded-xl bg-[#1F1A16] px-4 py-3 text-xs font-black text-white"
          >
            이리나에게 보낼 문구 복사
          </button>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-xl bg-[#FFFDF8] p-3">
            <p className="text-xs font-black text-[#7A6B5B]">현재 주제</p>
            <input
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              className="mt-2 w-full rounded-xl border border-[#E4D5BE] px-3 py-3 text-sm font-bold outline-none"
            />

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setMode("naver")}
                className={`rounded-xl px-3 py-2 text-xs font-black ${mode === "naver" ? "bg-[#1F1A16] text-white" : "bg-white text-[#1F1A16]"}`}
              >
                네이버 작성
              </button>
              <button
                type="button"
                onClick={() => setMode("google")}
                className={`rounded-xl px-3 py-2 text-xs font-black ${mode === "google" ? "bg-[#1F1A16] text-white" : "bg-white text-[#1F1A16]"}`}
              >
                Google 작성
              </button>
              <button
                type="button"
                onClick={() => setMode("image")}
                className={`rounded-xl px-3 py-2 text-xs font-black ${mode === "image" ? "bg-[#1F1A16] text-white" : "bg-white text-[#1F1A16]"}`}
              >
                이미지 제작
              </button>
            </div>
          </div>

          <div className="rounded-xl bg-[#EFF8F2] p-3">
            <p className="text-xs font-black text-[#2F6B4F]">절대 변경 금지 규칙</p>
            <div className="mt-2 space-y-1">
              {irinaWritingRules.fixed.map((rule) => (
                <p key={rule} className="text-xs font-bold text-[#2F6B4F]">✓ {rule}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <Box title="이번 모드 출력 순서">
          <div className="grid gap-2">
            {"output" in currentRules ? currentRules.output.map((item) => (
              <div key={item} className="rounded-xl bg-[#FFFDF8] p-3 text-sm font-bold">{item}</div>
            )) : (
              <div className="rounded-xl bg-[#FFFDF8] p-3 text-sm font-bold">이미지 프롬프트</div>
            )}
          </div>
        </Box>

        <Box title="이번 모드 규칙">
          <div className="grid gap-2">
            {currentRules.rules.map((item) => (
              <div key={item} className="rounded-xl bg-[#FFFDF8] p-3 text-sm font-bold">{item}</div>
            ))}
          </div>
        </Box>
      </div>

      <div className="mt-4">
        <Box title="이리나에게 보낼 문구">
          <textarea
            value={prompt}
            readOnly
            className="h-72 w-full rounded-xl border border-[#E4D5BE] bg-[#FFFDF8] p-4 text-sm font-bold leading-6 outline-none"
          />
        </Box>
      </div>

      <div className="mt-4">
        <Box title="다른 추천 주제">
          <div className="space-y-2">
            {recommended.map((r) => (
              <div key={r.title} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[#EFF8F2] p-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-black">{r.title}</p>
                    <SeoBadge grade={r.seoGrade} />
                  </div>
                  <p className="mt-1 text-xs text-[#2F6B4F]">{r.reason}</p>
                </div>
                <div className="flex gap-2">
                  <WriteButton title={r.title} mode="naver" />
                  <WriteButton title={r.title} mode="google" />
                </div>
              </div>
            ))}
          </div>
        </Box>
      </div>
    </Shell>
  );
}
