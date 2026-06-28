"use client";

import { useMemo } from "react";
import {
  buildCoupangRecommendationBlock,
  recommendAutoProducts,
} from "../data/autoProductRecommendation";

export default function AutoProductBox({
  topic,
  season,
}: {
  topic: string;
  season?: string;
}) {
  const products = useMemo(() => recommendAutoProducts(topic, season), [topic, season]);
  const block = useMemo(() => buildCoupangRecommendationBlock(topic, season), [topic, season]);

  const copyBlock = () => {
    navigator.clipboard.writeText(block);
    alert("생활백서맘 추천템 복사 완료!");
  };

  return (
    <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black">🛒 자동 추천상품</h2>
          <p className="mt-2 font-bold text-[#7A6B5B]">
            초3~4학년 기준으로 주제에 맞는 상품만 추천합니다.
          </p>
        </div>
        <button
          onClick={copyBlock}
          className="rounded-2xl bg-[#231F1A] px-6 py-4 font-black text-white"
        >
          📋 추천템 복사
        </button>
      </div>

      <div className="mt-6 grid gap-4">
        {products.map((product) => (
          <article key={product.id} className="rounded-2xl bg-[#FFFDF8] p-5">
            <div className="flex flex-wrap justify-between gap-3">
              <h3 className="text-xl font-black">{product.name}</h3>
              <span className="rounded-full bg-[#EFF8F2] px-4 py-2 text-sm font-black text-[#2F6B4F]">
                {product.rating} · {product.finalScore}점
              </span>
            </div>
            <p className="mt-3 text-sm font-bold text-[#5C5146]">{product.reason}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
