"use client";

import { useMemo, useState } from "react";
import AppShell from "../../components/AppShell";
import {
  productIntelligenceItems,
  productIntelligenceMeta,
  recommendProducts,
} from "../../data/productIntelligence";

const topicPresets = [
  "유괴예방",
  "장마철 준비물",
  "자기주도학습",
  "친구관계 거절",
  "초등학생 거짓말",
  "용돈교육",
  "집콕놀이",
];

export default function ProductIntelligencePage() {
  const [topic, setTopic] = useState("유괴예방");
  const [season, setSeason] = useState("상시");

  const recommendations = useMemo(
    () => recommendProducts(topic, season),
    [topic, season]
  );

  return (
    <AppShell>
      <main className="space-y-8">
        <section className="rounded-[2rem] bg-[#231F1A] p-8 text-white">
          <p className="text-sm font-bold text-[#D9CBB7]">Project009-9</p>
          <h1 className="mt-3 text-5xl font-black">🧠 Product Intelligence</h1>
          <p className="mt-4 text-xl font-bold text-[#F7F1E8]">
            글 주제·계절·초3~4학년 기준을 함께 판단해 추천상품을 자동 선별합니다.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          <InfoCard title="기준 대상" value={productIntelligenceMeta.defaultGrade} />
          <InfoCard title="버전" value={productIntelligenceMeta.version} />
          <InfoCard title="상품 DB" value={`${productIntelligenceItems.length}개`} />
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">📌 엔진 원칙</h2>
          <p className="mt-4 rounded-2xl bg-[#FFFDF8] p-5 text-lg font-bold">
            {productIntelligenceMeta.purpose}
          </p>
          <p className="mt-4 rounded-2xl bg-[#FFF0F0] p-5 font-bold text-[#8A2E2E]">
            {productIntelligenceMeta.rule}
          </p>
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">🚢 추천 테스트</h2>

          <div className="mt-5 flex flex-wrap gap-3">
            {topicPresets.map((preset) => (
              <button
                key={preset}
                onClick={() => setTopic(preset)}
                className={`rounded-full px-5 py-3 font-black ${
                  topic === preset ? "bg-[#231F1A] text-white" : "bg-[#F7F1E8]"
                }`}
              >
                {preset}
              </button>
            ))}
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="rounded-2xl bg-[#FFFDF8] p-4 font-bold">
              글 주제
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="mt-2 w-full rounded-xl border border-[#E4D5BE] p-3"
              />
            </label>

            <label className="rounded-2xl bg-[#FFFDF8] p-4 font-bold">
              계절
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="mt-2 w-full rounded-xl border border-[#E4D5BE] p-3"
              >
                <option>상시</option>
                <option>새학기</option>
                <option>여름</option>
                <option>장마</option>
                <option>방학</option>
                <option>겨울</option>
              </select>
            </label>
          </div>
        </section>

        <section className="grid gap-5">
          {recommendations.map((item, index) => (
            <article
              key={item.id}
              className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-black text-[#7A6B5B]">
                    #{index + 1} · {item.id} · {item.category}
                  </p>
                  <h2 className="mt-2 text-3xl font-black">{item.name}</h2>
                  <p className="mt-3 font-bold text-[#5C5146]">{item.reason}</p>
                </div>

                <div className="rounded-2xl bg-[#EFF8F2] px-6 py-4 text-center">
                  <p className="text-sm font-black text-[#2F6B4F]">추천점수</p>
                  <p className="mt-1 text-4xl font-black text-[#2F6B4F]">
                    {item.finalScore}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-5">
                <Score label="학년" value={item.score.gradeFit} />
                <Score label="주제" value={item.score.topicFit} />
                <Score label="계절" value={item.score.seasonFit} />
                <Score label="학교" value={item.score.schoolFit} />
                <Score label="부모필요" value={item.score.parentNeed} />
              </div>

              <pre className="mt-5 whitespace-pre-wrap rounded-2xl bg-[#FFFDF8] p-5 text-sm leading-7">
{`👉 [쿠팡파트너스 링크 입력]

${item.name}

추천 이유:
${item.reason}`}
              </pre>
            </article>
          ))}

          {!recommendations.length && (
            <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
              <p className="text-xl font-black">추천 기준을 통과한 상품이 없습니다.</p>
            </section>
          )}
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

function Score({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-[#F7F1E8] p-4 text-center">
      <p className="text-sm font-black text-[#7A6B5B]">{label}</p>
      <p className="mt-1 text-2xl font-black">{value}</p>
    </div>
  );
}
