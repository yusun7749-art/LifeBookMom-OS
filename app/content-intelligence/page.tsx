"use client";

import { useMemo, useState } from "react";
import AppShell from "../../components/AppShell";
import {
  analyzeContentTopic,
  buildContentEnginePrompt,
  contentIntelligenceMeta,
  contentRules,
} from "../../data/contentIntelligence";

const presets = [
  "초등학생 시력관리",
  "유괴예방",
  "장마철 준비물",
  "자기주도학습",
  "친구 부탁 거절",
  "초등학생 거짓말",
  "용돈교육",
  "집콕놀이",
];

export default function ContentIntelligencePage() {
  const [topic, setTopic] = useState("초등학생 시력관리");

  const result = useMemo(() => analyzeContentTopic(topic), [topic]);
  const prompt = useMemo(() => buildContentEnginePrompt(topic), [topic]);

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    alert("Content Intelligence 요청문 복사 완료!");
  };

  return (
    <AppShell>
      <main className="space-y-8">
        <section className="rounded-[2rem] bg-[#231F1A] p-8 text-white">
          <p className="text-sm font-bold text-[#D9CBB7]">Project009-11</p>
          <h1 className="mt-3 text-5xl font-black">🧠 Content Intelligence AI</h1>
          <p className="mt-4 text-xl font-bold text-[#F7F1E8]">
            주제 하나로 SEO, 추천상품, 이미지 방향, FAQ까지 자동 판단합니다.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          <InfoCard title="기준 대상" value={contentIntelligenceMeta.defaultGrade} />
          <InfoCard title="버전" value={contentIntelligenceMeta.version} />
          <InfoCard title="우선순위" value={`${result.priorityScore}점`} />
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">📌 운영 원칙</h2>
          <p className="mt-4 rounded-2xl bg-[#FFFDF8] p-5 font-bold">{contentRules.required}</p>
          <p className="mt-4 rounded-2xl bg-[#FFF0F0] p-5 font-bold text-[#8A2E2E]">
            {contentRules.forbidden}
          </p>
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">🚢 주제 입력</h2>

          <div className="mt-5 flex flex-wrap gap-3">
            {presets.map((item) => (
              <button
                key={item}
                onClick={() => setTopic(item)}
                className={`rounded-full px-5 py-3 font-black ${
                  topic === item ? "bg-[#231F1A] text-white" : "bg-[#F7F1E8]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="mt-5 w-full rounded-2xl border border-[#E4D5BE] bg-[#FFFDF8] p-5 text-xl font-bold"
          />
        </section>

        <section className="grid gap-5 md:grid-cols-4">
          <InfoCard title="카테고리" value={result.category} />
          <InfoCard title="학년 적합도" value={`${result.gradeFit}점`} />
          <InfoCard title="계절/상황" value={result.season} />
          <InfoCard title="제작 우선순위" value={`${result.priorityScore}점`} />
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">📝 자동 분석 결과</h2>
          <div className="mt-6 grid gap-4">
            <InfoLine label="네이버 제목" value={result.naverSeoTitle} />
            <InfoLine label="Google 제목" value={result.googleSeoTitle} />
            <InfoLine label="추천상품 방향" value={result.productDirection} />
            <InfoLine label="이미지 방향" value={result.imageDirection} />
            <InfoLine label="FAQ 방향" value={result.faqDirection} />
            <InfoLine label="해시태그 방향" value={result.hashtagDirection} />
          </div>
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-3xl font-black">🚀 Content Engine 요청문</h2>
            <button
              onClick={copyPrompt}
              className="rounded-2xl bg-[#231F1A] px-6 py-4 font-black text-white"
            >
              📋 요청문 복사
            </button>
          </div>
          <pre className="mt-5 whitespace-pre-wrap rounded-2xl bg-[#FFFDF8] p-5 text-sm leading-7">
            {prompt}
          </pre>
        </section>
      </main>
    </AppShell>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-[2rem] border border-[#E4D5BE] bg-white p-6">
      <p className="text-sm font-black text-[#7A6B5B]">{title}</p>
      <p className="mt-2 text-2xl font-black">{value}</p>
    </div>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-[#FFFDF8] p-5">
      <p className="text-sm font-black text-[#7A6B5B]">{label}</p>
      <p className="mt-2 font-bold">{value}</p>
    </div>
  );
}
