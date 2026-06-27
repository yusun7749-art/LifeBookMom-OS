"use client";

import { getNavigatorIntelligenceReport } from "../../brain/navigatorIntelligenceEngine";

function ScoreBar({ score }: { score: number }) {
  return (
    <div className="mt-3 h-3 overflow-hidden rounded-full bg-[#EEE4D5]">
      <div className="h-full rounded-full bg-[#2E6B4E]" style={{ width: `${score}%` }} />
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const tone = status === "긴급" ? "bg-[#FFE3D8] text-[#B35C3D]" : status === "중요" ? "bg-[#FFF2C7] text-[#7A5A00]" : "bg-[#DFF1E7] text-[#2E6B4E]";
  return <span className={`rounded-full px-4 py-2 text-sm font-black ${tone}`}>{status}</span>;
}

export default function NavigatorIntelligenceCenter() {
  const report = getNavigatorIntelligenceReport();

  return (
    <main className="min-h-screen bg-[#F5EFE6] p-8">
      <section className="rounded-[2.25rem] bg-[#1F1A16] p-9 text-white">
        <p className="text-sm font-bold text-[#D9CBB7]">LifeBookMom OS V5.2</p>
        <h1 className="mt-4 text-6xl font-black">🧭 Navigator Intelligence</h1>
        <p className="mt-5 max-w-4xl text-xl leading-9 text-[#F7F1E8]">{report.greeting}</p>
        <div className="mt-7 rounded-3xl bg-white/10 p-6">
          <p className="text-sm text-[#D9CBB7]">오늘의 항해사 판단</p>
          <p className="mt-2 text-3xl font-black">{report.focusMessage}</p>
        </div>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-3">
        <div className="rounded-[2rem] border border-[#E4D5BE] bg-white p-6">
          <p className="font-bold text-[#7A6B5B]">회사 건강도</p>
          <p className="mt-3 text-5xl font-black">{report.companyHealth}%</p>
          <p className="mt-2 text-sm text-[#9A8B7B]">콘텐츠·SEO·수익·브랜드 평균</p>
        </div>
        <div className="rounded-[2rem] border border-[#E4D5BE] bg-white p-6">
          <p className="font-bold text-[#7A6B5B]">오늘 예상 XP</p>
          <p className="mt-3 text-5xl font-black">+{report.totalXp}</p>
          <p className="mt-2 text-sm text-[#9A8B7B]">5개 미션 완료 기준</p>
        </div>
        <div className="rounded-[2rem] border border-[#E4D5BE] bg-white p-6">
          <p className="font-bold text-[#7A6B5B]">우선순위 엔진</p>
          <p className="mt-3 text-5xl font-black">ON</p>
          <p className="mt-2 text-sm text-[#9A8B7B]">긴급·중요·수익·자산 자동 정렬</p>
        </div>
      </section>

      <section className="mt-8 grid gap-7 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
          <h2 className="text-3xl font-black">🏢 회사 상태</h2>
          <div className="mt-5 space-y-5">
            {report.metrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl bg-[#FFFDF8] p-4">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-black">{metric.label}</p>
                  <p className="font-black">{metric.score}%</p>
                </div>
                <ScoreBar score={metric.score} />
                <p className="mt-3 text-sm text-[#6F6255]">{metric.reason}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
          <h2 className="text-3xl font-black">🎯 오늘 미션 우선순위</h2>
          <div className="mt-5 space-y-4">
            {report.missions.map((mission, index) => (
              <div key={mission.id} className="rounded-3xl border border-[#E4D5BE] bg-[#FFFDF8] p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-white px-4 py-2 text-sm font-black">#{index + 1}</span>
                    <StatusBadge status={mission.status} />
                    <span className="rounded-full bg-[#DFF1E7] px-4 py-2 text-sm font-black">{mission.area}</span>
                  </div>
                  <span className="font-black text-[#B35C3D]">+{mission.xp} XP</span>
                </div>
                <h3 className="mt-4 text-2xl font-black">{mission.title}</h3>
                <p className="mt-2 text-[#6F6255]">{mission.reason}</p>
                <p className="mt-3 font-black text-[#2E6B4E]">예상 효과: {mission.expectedImpact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
