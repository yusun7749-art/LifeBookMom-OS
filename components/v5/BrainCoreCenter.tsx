"use client";

import { getBrainCoreReport } from "../../brain/insightEngine";

function Stars({ score }: { score: number }) {
  const count = score >= 95 ? 5 : score >= 90 ? 4 : 3;
  return <span>{"⭐".repeat(count)}</span>;
}

export default function BrainCoreCenter() {
  const report = getBrainCoreReport();

  return (
    <main className="min-h-screen bg-[#F5EFE6] p-8">
      <section className="rounded-[2.25rem] bg-[#1F1A16] p-9 text-white">
        <p className="text-sm font-bold text-[#D9CBB7]">LifeBookMom OS V5.1</p>
        <h1 className="mt-4 text-6xl font-black">🧠 Brain Core</h1>
        <p className="mt-5 max-w-4xl text-xl leading-9 text-[#F7F1E8]">{report.summary}</p>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-3">
        <div className="rounded-[2rem] border border-[#E4D5BE] bg-white p-6">
          <p className="font-bold text-[#7A6B5B]">기억된 콘텐츠</p>
          <p className="mt-3 text-5xl font-black">{report.memories.length}</p>
          <p className="mt-2 text-sm text-[#9A8B7B]">대표 자산 후보 기준</p>
        </div>
        <div className="rounded-[2rem] border border-[#E4D5BE] bg-white p-6">
          <p className="font-bold text-[#7A6B5B]">판단 엔진</p>
          <p className="mt-3 text-5xl font-black">ON</p>
          <p className="mt-2 text-sm text-[#9A8B7B]">다음 행동 자동 판단</p>
        </div>
        <div className="rounded-[2rem] border border-[#E4D5BE] bg-white p-6">
          <p className="font-bold text-[#7A6B5B]">학습 신호</p>
          <p className="mt-3 text-5xl font-black">{report.learningSignals.length}</p>
          <p className="mt-2 text-sm text-[#9A8B7B]">체크리스트·질문형·추천템</p>
        </div>
      </section>

      <section className="mt-8 grid gap-7 xl:grid-cols-[1fr_0.85fr]">
        <div className="rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
          <h2 className="text-3xl font-black">🧠 Brain Memory</h2>
          <div className="mt-5 space-y-4">
            {report.decisions.map(({ memory, decision }) => (
              <div key={memory.id} className="rounded-3xl border border-[#E4D5BE] bg-[#FFFDF8] p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full bg-[#DFF1E7] px-4 py-2 text-sm font-black">{memory.cluster}</span>
                  <span className="rounded-full bg-white px-4 py-2 text-sm font-black">자산 등급 {memory.assetGrade}</span>
                </div>
                <h3 className="mt-4 text-2xl font-black">{memory.title}</h3>
                <p className="mt-2 text-[#6F6255]">{memory.learnedReason}</p>
                <div className="mt-4 rounded-2xl bg-white p-4">
                  <p className="font-black text-[#B35C3D]">판단: {decision.decision}</p>
                  <p className="mt-2 text-sm text-[#6F6255]">{decision.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-7">
          <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
            <h2 className="text-3xl font-black">🎯 다음 추천 콘텐츠</h2>
            <div className="mt-5 space-y-3">
              {report.recommendations.map((item) => (
                <div key={item.title} className="rounded-2xl bg-[#EFF8F2] p-4">
                  <div className="flex justify-between gap-3">
                    <span className="font-black text-[#2E6B4E]">{item.category}</span>
                    <Stars score={item.score} />
                  </div>
                  <p className="mt-2 text-lg font-black">{item.title}</p>
                  <p className="mt-2 text-sm text-[#5F6F61]">{item.reason}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
            <h2 className="text-3xl font-black">📡 학습 신호</h2>
            <div className="mt-5 space-y-3">
              {report.learningSignals.map((signal) => (
                <div key={signal.signal} className="rounded-2xl border border-[#E4D5BE] bg-[#FFFDF8] p-4">
                  <p className="font-black">{signal.signal}</p>
                  <p className="mt-1 text-sm text-[#6F6255]">{signal.meaning}</p>
                  <p className="mt-2 text-sm font-bold text-[#B35C3D]">OS 행동: {signal.osAction}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
