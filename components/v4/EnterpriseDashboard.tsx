"use client";

import Link from "next/link";
import {
  enterpriseCenters,
  enterpriseOps,
  enterpriseProjectState,
  enterpriseVision,
  osRuntime,
} from "../../data/v4/osEnterprise";

function StatusBadge({ value }: { value: string }) {
  return (
    <span className="rounded-full bg-[#EFF8F2] px-4 py-2 text-sm font-black text-[#2F6B4F]">
      {value}
    </span>
  );
}

function RuntimeItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-[#FFFDF8] p-4">
      <p className="text-xs font-black uppercase tracking-wide text-[#9A8B7B]">{label}</p>
      <p className="mt-2 text-lg font-black text-[#231F1A]">{value}</p>
    </div>
  );
}

export default function EnterpriseDashboard() {
  return (
    <div className="min-h-screen bg-[#F5EFE6] p-8">
      <section className="overflow-hidden rounded-[2.25rem] bg-[#1F1A16] text-white shadow-xl">
        <div className="grid gap-8 p-9 xl:grid-cols-[1.25fr_0.75fr]">
          <div>
            <p className="text-sm font-bold text-[#D9CBB7]">Project021 · OS Runtime</p>
            <h1 className="mt-4 text-6xl font-black leading-tight">{enterpriseVision.title}</h1>
            <p className="mt-4 text-2xl font-extrabold text-[#F7F1E8]">{enterpriseVision.subtitle}</p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#D9CBB7]">{enterpriseVision.promise}</p>
            <div className="mt-8 rounded-3xl bg-white/10 p-6">
              <p className="text-sm text-[#D9CBB7]">운영 철학</p>
              <p className="mt-2 text-3xl font-black">“{enterpriseVision.mission}”</p>
            </div>
          </div>

          <div className="rounded-[2rem] bg-[#DFF1E7] p-6 text-[#1F1A16]">
            <p className="text-sm font-black">현재 기준점</p>
            <h2 className="mt-3 text-3xl font-black">{osRuntime.currentProject}</h2>
            <div className="mt-5 space-y-3 text-sm font-bold">
              <p>Branch: {osRuntime.branch}</p>
              <p>Baseline: {osRuntime.baseline}</p>
              <p>{osRuntime.rule}</p>
            </div>
            <Link
              href="/content-studio"
              className="mt-6 inline-block rounded-2xl bg-[#1F1A16] px-6 py-4 font-black text-white"
            >
              📝 Content Studio V4 열기
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black">🟢 OS Runtime</h2>
            <p className="mt-2 text-[#7A6B5B]">
              문서 목록이 아니라 현재 운영체제의 실행 상태를 한눈에 확인합니다.
            </p>
          </div>
          <StatusBadge value={osRuntime.gitStatus} />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <RuntimeItem label="OS Version" value={osRuntime.version} />
          <RuntimeItem label="Repository" value={osRuntime.repository} />
          <RuntimeItem label="Branch" value={osRuntime.branch} />
          <RuntimeItem label="Baseline" value={osRuntime.baseline} />
          <RuntimeItem label="Recovery" value={osRuntime.recovery} />
          <RuntimeItem label="Navigator" value={osRuntime.navigator} />
          <RuntimeItem label="Brain" value={osRuntime.brain} />
          <RuntimeItem label="CMS" value={osRuntime.cms} />
          <RuntimeItem label="Launcher" value={osRuntime.launcher} />
          <RuntimeItem label="Last Commit" value={osRuntime.lastCommit} />
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black">🏛 운영본부 문서</h2>
            <p className="mt-2 text-[#7A6B5B]">
              OS_MANIFEST를 시작점으로 Constitution, Decision Log, Version, Recovery를 연결합니다.
            </p>
          </div>
          <StatusBadge value="Layer 1" />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {enterpriseOps.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-3xl border border-[#E4D5BE] bg-[#FFFDF8] p-5 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-4xl">{item.icon}</div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <p className="text-xl font-black">{item.title}</p>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#B35C3D]">
                  {item.status}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-[#6F6255]">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black">🚢 실행 센터</h2>
            <p className="mt-2 text-[#7A6B5B]">
              운영본부에서 Brain, Navigator, CMS, Dashboard로 바로 이동합니다.
            </p>
          </div>
          <StatusBadge value="OS Home" />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {enterpriseCenters.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-3xl border border-[#E4D5BE] bg-[#F7F1E8] p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-5xl">{item.icon}</div>
              <p className="mt-4 text-2xl font-black">{item.title}</p>
              <p className="mt-3 leading-7 text-[#6F6255]">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
        <h2 className="text-3xl font-black">📌 Project State</h2>
        <p className="mt-2 text-[#7A6B5B]">삭제하지 않고 ARCHIVED로 보관합니다. DONE은 화면 확인 후에만 기록합니다.</p>
        <div className="mt-6 grid gap-3 md:grid-cols-3 xl:grid-cols-6">
          {enterpriseProjectState.map((item) => (
            <div key={item.label} className="rounded-2xl bg-[#FFFDF8] p-4">
              <p className="font-black text-[#231F1A]">{item.label}</p>
              <p className="mt-2 text-sm leading-6 text-[#7A6B5B]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
