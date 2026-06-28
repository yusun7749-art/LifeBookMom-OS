"use client";

import { useMemo, useState } from "react";
import AppShell from "../../components/AppShell";
import AutoProductBox from "../../components/AutoProductBox";
import {
  autoProductCatalog,
  autoProductRules,
  buildCoupangRecommendationBlock,
  detectSeasonByMonth,
  recommendAutoProducts,
} from "../../data/autoProductRecommendation";

const topics = [
  "유괴예방",
  "장마철 준비물",
  "자기주도학습",
  "친구관계 거절",
  "초등학생 거짓말",
  "용돈교육",
];

export default function AutoProductPage() {
  const [topic, setTopic] = useState("유괴예방");
  const [season, setSeason] = useState(detectSeasonByMonth());

  const block = useMemo(() => buildCoupangRecommendationBlock(topic, season), [topic, season]);
  const products = useMemo(() => recommendAutoProducts(topic, season), [topic, season]);

  const copyBlock = () => {
    navigator.clipboard.writeText(block);
    alert("자동 추천상품 영역 복사 완료!");
  };

  return (
    <AppShell>
      <main className="space-y-8">
        <section className="rounded-[2rem] bg-[#231F1A] p-8 text-white">
          <p className="text-sm font-bold text-[#D9CBB7]">Project009-10</p>
          <h1 className="mt-3 text-5xl font-black">🤖 Auto Product Recommendation</h1>
          <p className="mt-4 text-xl font-bold text-[#F7F1E8]">
            Content Engine에 연결할 자동 상품 추천 영역을 생성합니다.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          <InfoCard title="기준 대상" value={autoProductRules.defaultGrade} />
          <InfoCard title="버전" value={autoProductRules.version} />
          <InfoCard title="상품 카탈로그" value={`${autoProductCatalog.length}개`} />
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">📌 자동 추천 원칙</h2>
          <p className="mt-4 rounded-2xl bg-[#FFFDF8] p-5 font-bold">
            {autoProductRules.principle}
          </p>
          <div className="mt-5 rounded-2xl bg-[#FFF0F0] p-5 font-bold text-[#8A2E2E]">
            추천 금지: {autoProductRules.forbidden.join(", ")}
          </div>
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">🚢 주제 입력</h2>

          <div className="mt-5 flex flex-wrap gap-3">
            {topics.map((item) => (
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

        <AutoProductBox topic={topic} season={season} />

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <div className="flex flex-wrap justify-between gap-4">
            <h2 className="text-3xl font-black">📋 생성될 쿠팡 추천 영역</h2>
            <button
              onClick={copyBlock}
              className="rounded-2xl bg-[#231F1A] px-6 py-4 font-black text-white"
            >
              복사
            </button>
          </div>

          <pre className="mt-5 whitespace-pre-wrap rounded-2xl bg-[#FFFDF8] p-5 text-sm leading-7">
            {block}
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
