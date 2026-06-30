"use client";

import { useEffect, useMemo, useState } from "react";
import { recommended } from "../../data/v4/usableERP";
import { buildIrinaPrompt, getModeLabel, getModeRules, irinaWritingRules } from "../../data/v4/irinaWritingRules";
import { buildImagePrompt } from "../../data/v4/imageGuardV2";
import { readOperationStore, setSelectedTopic } from "../../data/v4/operationStore";
import { Box, SeoBadge, Shell, WriteButton } from "./UsableLayout";

const PAGE_SIZE = 10;

function shuffleWithSeed<T>(items: T[], seed: number) {
  const arr = [...items];
  let s = seed || Date.now();

  const random = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };

  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

function useQueryParam(name: string) {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get(name) ?? "";
}

export default function ContentStudioHome() {
  const topicFromUrl = useQueryParam("topic");
  const modeFromUrl = useQueryParam("mode") || "naver";
  const storedTopic = typeof window !== "undefined" ? readOperationStore().selectedTopic : "";

  const [topic, setTopic] = useState(topicFromUrl || storedTopic || recommended[0]?.title || "");
  const [mode, setMode] = useState(modeFromUrl);
  const [search, setSearch] = useState("");
  const [seed, setSeed] = useState(0);

  useEffect(() => setSeed(Date.now()), []);

  useEffect(() => {
    if (topicFromUrl) {
      setTopic(topicFromUrl);
      setSelectedTopic(topicFromUrl);
    }
  }, [topicFromUrl]);

  const currentRules = useMemo(() => getModeRules(mode), [mode]);
  const prompt = useMemo(() => mode === "image" ? buildImagePrompt(topic) : buildIrinaPrompt(topic, mode), [topic, mode]);
  const fixedRules = irinaWritingRules.fixed ?? [];

  const filteredRecommendations = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return shuffleWithSeed(recommended, seed).slice(0, PAGE_SIZE);
    return recommended.filter((r) => [r.title, r.reason, r.relation].join(" ").toLowerCase().includes(q)).slice(0, PAGE_SIZE);
  }, [search, seed]);

  const changeTopic = (value: string) => {
    setTopic(value);
    setSelectedTopic(value);
  };

  const refresh = () => setSeed(Date.now() + Math.floor(Math.random() * 999999));

  const copyAndOpen = async () => {
    setSelectedTopic(topic);
    await navigator.clipboard.writeText(prompt);
    window.open("https://chatgpt.com/", "_blank", "noopener,noreferrer");
  };

  return (
    <Shell title="글쓰기" desc="추천 주제는 10개만 표시하고, 새로고침이나 새 추천받기로 다른 후보를 보여줍니다.">
      <section className="rounded-2xl border border-[#E4D5BE] bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-black">{getModeLabel(mode)}</h2>
            <p className="mt-1 text-xs font-bold text-[#6F6255]">현재 주제는 저장되어 다른 화면에서도 이어집니다.</p>
          </div>
          <button type="button" onClick={copyAndOpen} className="rounded-xl bg-[#1F1A16] px-4 py-3 text-xs font-black text-white">복사하고 이리나 열기</button>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-xl bg-[#FFFDF8] p-3">
            <p className="text-xs font-black text-[#7A6B5B]">현재 주제</p>
            <input value={topic} onChange={(event) => changeTopic(event.target.value)} className="mt-2 w-full rounded-xl border border-[#E4D5BE] px-3 py-3 text-sm font-bold outline-none" />
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" onClick={() => setMode("naver")} className={`rounded-xl px-3 py-2 text-xs font-black ${mode === "naver" ? "bg-[#1F1A16] text-white" : "bg-white text-[#1F1A16]"}`}>네이버 작성</button>
              <button type="button" onClick={() => setMode("google")} className={`rounded-xl px-3 py-2 text-xs font-black ${mode === "google" ? "bg-[#1F1A16] text-white" : "bg-white text-[#1F1A16]"}`}>Google 작성</button>
              <button type="button" onClick={() => setMode("image")} className={`rounded-xl px-3 py-2 text-xs font-black ${mode === "image" ? "bg-[#1F1A16] text-white" : "bg-white text-[#1F1A16]"}`}>이미지 제작</button>
            </div>
          </div>
          <div className="rounded-xl bg-[#EFF8F2] p-3">
            <p className="text-xs font-black text-[#2F6B4F]">절대 변경 금지 규칙</p>
            <div className="mt-2 max-h-64 space-y-1 overflow-y-auto">
              {fixedRules.map((rule) => <p key={rule} className="text-xs font-bold text-[#2F6B4F]">✓ {rule}</p>)}
            </div>
          </div>
        </div>
      </section>

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <Box title="이번 모드 출력 순서">
          <div className="grid gap-2">
            {"output" in currentRules ? currentRules.output.map((item) => <div key={item} className="rounded-xl bg-[#FFFDF8] p-3 text-sm font-bold">{item}</div>) : <div className="rounded-xl bg-[#FFFDF8] p-3 text-sm font-bold">이미지 프롬프트</div>}
          </div>
        </Box>
        <Box title="이번 모드 규칙">
          <div className="grid gap-2">
            {currentRules.rules.map((item) => <div key={item} className="rounded-xl bg-[#FFFDF8] p-3 text-sm font-bold">{item}</div>)}
          </div>
        </Box>
      </div>

      <div className="mt-4">
        <Box title="이리나에게 자동으로 복사될 문구">
          <textarea value={prompt} readOnly className="h-72 w-full rounded-xl border border-[#E4D5BE] bg-[#FFFDF8] p-4 text-sm font-bold leading-6 outline-none" />
        </Box>
      </div>

      <div className="mt-4">
        <Box title="추천 주제 10개">
          <div className="mb-3 flex flex-wrap gap-2">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="수족구, 로블록스, 학교폭력, 위생 검색" className="min-w-[300px] flex-1 rounded-xl border border-[#E4D5BE] px-4 py-3 text-sm font-bold outline-none" />
            <button onClick={refresh} className="rounded-xl bg-[#DFF1E7] px-4 py-2 text-xs font-black text-[#1F1A16]">새 추천받기</button>
          </div>
          <div className="space-y-2">
            {filteredRecommendations.map((r, index) => (
              <div key={`${seed}-${r.title}`} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[#EFF8F2] p-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-lg font-black text-[#2F6B4F]">{String(index + 1).padStart(2, "0")}</span>
                    <p className="font-black">{r.title}</p>
                    <SeoBadge grade={r.seoGrade} />
                  </div>
                  <p className="mt-1 text-xs text-[#2F6B4F]">{r.reason}</p>
                </div>
                <div className="flex gap-2">
                  <WriteButton title={r.title} mode="naver" />
                  <WriteButton title={r.title} mode="google" />
                  <WriteButton title={r.title} mode="image" />
                </div>
              </div>
            ))}
          </div>
        </Box>
      </div>
    </Shell>
  );
}
