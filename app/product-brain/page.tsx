"use client";

import { useMemo, useState } from "react";
import AppShell from "../../components/AppShell";
import {
  getRecommendedProducts,
  productBrainRules,
  productCandidates,
} from "../../data/productBrain";

const sampleTopics = [
  "유괴예방",
  "장마",
  "자기주도학습",
  "친구관계",
  "용돈교육",
];

export default function ProductBrainPage() {
  const [topic, setTopic] = useState("유괴예방");
  const [season, setSeason] = useState("상시");

  const recommendations = useMemo(
    () => getRecommendedProducts(topic, season),
    [topic, season]
  );

  return (
    <AppShell>
      <main className="space-y-8">
        <section className="rounded-[2rem] bg-[#231F1A] p-8 text-white">
          <p className="text-sm font-bold text-[#D9CBB7]">Project009-8</p>
          <h1 className="mt-3 text-5xl font-black">🛒 Living Product AI</h1>
          <p className="mt-4 text-xl font-bold text-[#F7F1E8]">
            초등학교 3~4학년 기준으로 콘텐츠와 맞는 추천상품만 선별합니다.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          <InfoCard title="기준 대상" value={productBrainRules.defaultTarget} />
          <InfoCard title="버전" value={productBrainRules.version} />
          <InfoCard title="등록 후보" value={`${productCandidates.length}개`} />
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">📌 추천 규칙</h2>
          <p className="mt-4 rounded-2xl bg-[#FFFDF8] p-5 text-lg font-bold">
            {productBrainRules.principle}
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <ListBox title="필수 검증" items={productBrainRules.requiredChecks} />
            <ListBox title="추천 금지" items={productBrainRules.forbiddenKeywords} />
          </div>
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">🚢 주제별 추천 테스트</h2>

          <div className="mt-5 flex flex-wrap gap-3">
            {sampleTopics.map((item) => (
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
              주제
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

        <section className="grid gap-6">
          {recommendations.length ? (
            recommendations.map((product) => (
              <article
                key={product.id}
                className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-black text-[#7A6B5B]">
                      {product.id} · {product.category} · {product.targetGrade}
                    </p>
                    <h2 className="mt-2 text-3xl font-black">
                      {product.productName}
                    </h2>
                    <p className="mt-3 text-[#5C5146]">{product.reason}</p>
                  </div>

                  <div className="rounded-2xl bg-[#EFF8F2] px-5 py-4 text-center">
                    <p className="text-sm font-black text-[#2F6B4F]">적합도</p>
                    <p className="mt-1 text-3xl font-black text-[#2F6B4F]">
                      {product.score}
                    </p>
                  </div>
                </div>

                <pre className="mt-5 whitespace-pre-wrap rounded-2xl bg-[#FFFDF8] p-5 text-sm leading-7">
{`👉 [쿠팡파트너스 링크 입력]

${product.productName}

추천 이유:
${product.reason}`}
                </pre>
              </article>
            ))
          ) : (
            <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
              <p className="text-xl font-black">
                기준을 통과한 추천상품이 없습니다.
              </p>
              <p className="mt-3 text-[#5C5146]">
                초3~4학년 기준, 주제 적합성, 계절 맥락을 모두 통과한 상품만 추천합니다.
              </p>
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

function ListBox({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl bg-[#FFFDF8] p-5">
      <h3 className="text-xl font-black">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm font-bold text-[#5C5146]">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}
