"use client";

import Link from "next/link";
import { companyMetrics, enterpriseDepartments, enterpriseVision, todayMissions, v4Roadmap } from "../../data/v4/osEnterprise";

function PriorityStars({ count }: { count: number }) {
  return <span className="text-sm">{"⭐".repeat(count)}</span>;
}

export default function EnterpriseDashboard() {
  return (
    <div className="min-h-screen bg-[#F5EFE6] p-8">
      <section className="overflow-hidden rounded-[2.25rem] bg-[#1F1A16] text-white shadow-xl">
        <div className="grid gap-8 p-9 xl:grid-cols-[1.35fr_0.65fr]">
          <div>
            <p className="text-sm font-bold text-[#D9CBB7]">LifeBookMom OS V4 · Enterprise</p>
            <h1 className="mt-4 text-6xl font-black leading-tight">{enterpriseVision.title}</h1>
            <p className="mt-4 text-2xl font-extrabold text-[#F7F1E8]">{enterpriseVision.subtitle}</p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#D9CBB7]">{enterpriseVision.promise}</p>
            <div className="mt-8 rounded-3xl bg-white/10 p-6">
              <p className="text-sm text-[#D9CBB7]">생활백서맘 철학</p>
              <p className="mt-2 text-3xl font-black">“{enterpriseVision.mission}”</p>
            </div>
          </div>

          <div className="rounded-[2rem] bg-[#DFF1E7] p-6 text-[#1F1A16]">
            <p className="text-sm font-black">오늘의 항해사 보고</p>
            <h2 className="mt-3 text-4xl font-black">오늘은 OS를 회사 운영체제로 바꾸는 날입니다.</h2>
            <p className="mt-4 leading-7">기능 추가가 아니라 구조 변경입니다. Brain, Navigator, Journey, Graph, Revenue가 하나의 흐름으로 연결됩니다.</p>
            <Link href="/navigator" className="mt-6 inline-block rounded-2xl bg-[#1F1A16] px-6 py-4 font-black text-white">
              🧭 항해사 전략실 열기
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-4">
        {companyMetrics.map((metric) => (
          <div key={metric.label} className="rounded-[1.75rem] border border-[#E4D5BE] bg-white p-6">
            <p className="font-bold text-[#7A6B5B]">{metric.label}</p>
            <p className="mt-3 text-4xl font-black">{metric.value}</p>
            <p className="mt-2 text-sm text-[#9A8B7B]">{metric.hint}</p>
          </div>
        ))}
      </section>

      <section className="mt-8 grid gap-7 xl:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black">🧭 오늘 해야 할 일</h2>
            <span className="rounded-full bg-[#DFF1E7] px-4 py-2 text-sm font-black">Navigator 추천</span>
          </div>
          <div className="mt-5 space-y-4">
            {todayMissions.map((mission) => (
              <div key={mission.title} className="rounded-3xl border border-[#E4D5BE] bg-[#FFFDF8] p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full bg-white px-4 py-2 text-sm font-black text-[#B35C3D]">{mission.type}</span>
                  <PriorityStars count={mission.priority} />
                </div>
                <h3 className="mt-4 text-2xl font-black">{mission.title}</h3>
                <p className="mt-2 text-[#6F6255]">{mission.reason}</p>
                <p className="mt-3 font-black text-[#2E6B4E]">예상 효과: {mission.impact}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
          <h2 className="text-3xl font-black">🚀 V4 개발 로드맵</h2>
          <div className="mt-5 space-y-3">
            {v4Roadmap.map((item, index) => (
              <div key={item} className="rounded-2xl bg-[#F7F1E8] p-4 font-bold">
                {index + 1}. {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
        <h2 className="text-3xl font-black">🏢 LifeBookMom OS 회사 부서</h2>
        <p className="mt-2 text-[#7A6B5B]">V4부터 운영본부는 페이지 모음이 아니라 회사 조직처럼 움직입니다.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {enterpriseDepartments.map((dept) => (
            <div key={dept.id} className="rounded-3xl border border-[#E4D5BE] bg-[#FFFDF8] p-5">
              <div className="text-4xl">{dept.icon}</div>
              <p className="mt-4 text-xl font-black">{dept.name}</p>
              <p className="mt-1 font-bold text-[#B35C3D]">{dept.role}</p>
              <p className="mt-3 text-sm leading-6 text-[#6F6255]">{dept.description}</p>
              <p className="mt-4 rounded-full bg-white px-4 py-2 text-center text-sm font-black">{dept.status}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
