"use client";

import { buildBootstrapPrompt } from "../data/aiBootstrap";

export default function ContentEngineRinaConnect() {
  const openRina = async () => {
    await navigator.clipboard.writeText(buildBootstrapPrompt());
    window.open("https://chatgpt.com/", "_blank");
  };

  return (
    <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-black text-[#7A6B5B]">
            Constitution · Brand · RINI · Product 기준 자동 복사
          </p>
          <h2 className="mt-2 text-3xl font-black">🤖 항해사 이리나 연결</h2>
          <p className="mt-2 font-bold text-[#5C5146]">
            운영본부 헌법과 최신 규칙을 먼저 복사한 뒤 리나를 엽니다.
          </p>
        </div>

        <button
          onClick={openRina}
          className="rounded-2xl bg-[#231F1A] px-7 py-5 text-xl font-black text-white hover:bg-[#332D26]"
        >
          🤖 이리나 호출
        </button>
      </div>
    </section>
  );
}
