"use client";

import Link from "next/link";
import { enterpriseVision } from "../../data/v4/osEnterprise";
import OSCorePanel from "./OSCorePanel";

export default function EnterpriseDashboard() {
  return (
    <div className="min-h-screen bg-[#F5EFE6] p-8">
      <section className="overflow-hidden rounded-[2.25rem] bg-[#1F1A16] text-white shadow-xl">
        <div className="grid gap-8 p-9 xl:grid-cols-[1.25fr_0.75fr]">
          <div>
            <p className="text-sm font-bold text-[#D9CBB7]">Project023 · Enterprise Integration</p>
            <h1 className="mt-4 text-6xl font-black leading-tight">{enterpriseVision.title}</h1>
            <p className="mt-4 text-2xl font-extrabold text-[#F7F1E8]">{enterpriseVision.subtitle}</p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#D9CBB7]">
              흩어진 Center들을 하나의 OS Core로 연결해 운영본부 Home에서 바로 이동하고 확인합니다.
            </p>
          </div>

          <div className="rounded-[2rem] bg-[#DFF1E7] p-6 text-[#1F1A16]">
            <p className="text-sm font-black">운영본부 기준</p>
            <h2 className="mt-3 text-3xl font-black">GitHub 기준 OS Core 통합</h2>
            <p className="mt-4 leading-7">
              ZIP 반복 단계는 종료하고, Project023부터는 기능 단위로 묶어 GitHub Branch에서 관리합니다.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/navigator-core" className="rounded-2xl bg-[#1F1A16] px-5 py-4 font-black text-white">
                🧭 Navigator
              </Link>
              <Link href="/dashboard" className="rounded-2xl bg-white px-5 py-4 font-black text-[#1F1A16]">
                📊 Dashboard
              </Link>
              <Link href="/content-studio" className="rounded-2xl bg-white px-5 py-4 font-black text-[#1F1A16]">
                📝 Content Studio
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-8">
        <OSCorePanel />
      </div>
    </div>
  );
}
