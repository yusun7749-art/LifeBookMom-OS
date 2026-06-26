"use client";

import { useMemo, useState } from "react";
import { lifebookmomBrandRules } from "../data/brandRules";
import { getRecommendedProducts } from "../data/productEngine";

export default function BrandSystemCenter() {
  const [topic, setTopic] = useState("초등학생 유괴 예방 교육");
  const products = useMemo(() => getRecommendedProducts(topic), [topic]);

  const prompt = `생활백서맘 V4 문체로 작성해줘.
주제: ${topic}

필수 규칙:
- 옆집 엄마가 말하듯 요~체
- 공감형 도입 + 우리집 경험
- 정보는 전문가 수준으로 충분히
- 부모 체크리스트 뒤에만 이미지 삽입 위치 1곳
- 추천템은 "👉 [링크삽입] 브랜드 제품명" 형식
- 해시태그 30개 뒤 빈 줄 2줄
- 쿠팡 고지문은 한 줄`;

  return (
    <div>
      <section className="rounded-[2rem] bg-[#231F1A] p-8 text-white">
        <p className="text-sm text-[#D9CBB7]">LifeBookMom Brain V2</p>
        <h2 className="mt-3 text-5xl font-black">🌿 생활백서맘 작성 엔진</h2>
        <p className="mt-4 text-xl text-[#F7F1E8]">
          V4 문체, 감성 리뉴얼, 스마트 추천템 엔진을 한 화면에서 관리합니다.
        </p>
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-2">
        <div className="rounded-[2rem] bg-white border border-[#E4D5BE] p-7">
          <h3 className="text-3xl font-black">🌿 문체 규칙</h3>
          <p className="mt-3 text-[#7A6B5B]">{lifebookmomBrandRules.summary}</p>
          <div className="mt-5 space-y-2">
            {lifebookmomBrandRules.naverOrder.map((rule, idx) => (
              <div key={rule} className="rounded-2xl bg-[#FFFDF8] border border-[#E4D5BE] p-3 font-bold">
                {idx + 1}. {rule}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] bg-white border border-[#E4D5BE] p-7">
          <h3 className="text-3xl font-black">🛒 스마트 추천템 엔진</h3>
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="mt-5 w-full rounded-2xl border border-[#E4D5BE] bg-[#FFFDF8] px-5 py-4 outline-none"
            placeholder="주제를 입력하세요"
          />
          <div className="mt-5 space-y-3">
            {products.map((p) => (
              <div key={`${p.brand}-${p.productName}`} className="rounded-2xl bg-[#FFFDF8] border border-[#E4D5BE] p-4">
                <p className="text-sm text-[#B35C3D]">{"⭐".repeat(p.score)}</p>
                <p className="mt-1 font-black">✔ {p.brand} {p.productName}</p>
                <p className="mt-2 text-sm text-[#7A6B5B]">추천 이유 : {p.reason}</p>
                <p className="mt-2 font-black">👉 [링크삽입] {p.brand} {p.productName}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] bg-white border border-[#E4D5BE] p-7">
        <h3 className="text-3xl font-black">🚀 단축키 1 요청문 자동 생성</h3>
        <textarea value={prompt} readOnly className="mt-5 h-80 w-full rounded-2xl border border-[#E4D5BE] bg-[#FFFDF8] p-5 outline-none" />
        <button
          onClick={() => navigator.clipboard.writeText(prompt)}
          className="mt-4 rounded-2xl bg-[#231F1A] px-6 py-4 font-black text-white"
        >
          요청문 복사
        </button>
      </section>

      <section className="mt-8 rounded-[2rem] bg-[#EFF8F2] border border-[#9CC7B0] p-7">
        <h3 className="text-3xl font-black">🌿 감성 리뉴얼 버튼</h3>
        <p className="mt-3 text-[#5F6F61]">
          기존 글은 이 기준으로 다시 작성합니다: SEO 유지, 체크리스트 유지, FAQ 유지, 추천템 형식 변경, 문체는 생활백서맘 V4.
        </p>
      </section>
    </div>
  );
}
