"use client";

import Link from "next/link";
import { osCore, osGroups, osModules, osRules, osTimeline } from "../../data/v4/osCore";

function Badge({ value }: { value: string }) {
  return (
    <span className="rounded-full bg-[#EFF8F2] px-4 py-2 text-xs font-black text-[#2F6B4F]">
      {value}
    </span>
  );
}

export default function OSCorePanel() {
  return (
    <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black">🧬 OS Core</h2>
          <p className="mt-2 text-[#7A6B5B]">
            모든 Center가 하나의 OS Core 기준으로 연결됩니다.
          </p>
        </div>
        <Badge value={osCore.gitStatus} />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-[#FFFDF8] p-4">
          <p className="text-xs font-black text-[#9A8B7B]">Version</p>
          <p className="mt-2 font-black">{osCore.currentVersion}</p>
        </div>
        <div className="rounded-2xl bg-[#FFFDF8] p-4">
          <p className="text-xs font-black text-[#9A8B7B]">Branch</p>
          <p className="mt-2 font-black">{osCore.branch}</p>
        </div>
        <div className="rounded-2xl bg-[#FFFDF8] p-4">
          <p className="text-xs font-black text-[#9A8B7B]">Project</p>
          <p className="mt-2 font-black">{osCore.currentProject}</p>
        </div>
        <div className="rounded-2xl bg-[#FFFDF8] p-4">
          <p className="text-xs font-black text-[#9A8B7B]">Baseline</p>
          <p className="mt-2 font-black">{osCore.baselineCommit}</p>
        </div>
        <div className="rounded-2xl bg-[#FFFDF8] p-4">
          <p className="text-xs font-black text-[#9A8B7B]">Recovery</p>
          <p className="mt-2 font-black">{osCore.recoveryStatus}</p>
        </div>
      </div>

      <div className="mt-7 space-y-6">
        {osGroups.map((group) => (
          <div key={group.key} className="rounded-3xl bg-[#F7F1E8] p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-2xl font-black">{group.title}</p>
                <p className="mt-1 text-sm font-bold text-[#7A6B5B]">{group.description}</p>
              </div>
              <Badge value={group.key.toUpperCase()} />
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {osModules
                .filter((module) => module.group === group.key)
                .map((module) => (
                  <Link
                    key={module.key}
                    href={module.href}
                    className="rounded-2xl bg-white p-4 transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <p className="font-black">{module.name}</p>
                    <p className="mt-2 text-sm font-bold text-[#2F6B4F]">{module.status}</p>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {osTimeline.map((item) => (
          <div key={item.project} className="rounded-2xl bg-[#FFFDF8] p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-black">{item.project} · {item.title}</p>
              <Badge value={item.status} />
            </div>
            <p className="mt-2 text-sm font-bold text-[#7A6B5B]">
              {item.version} · {item.commit} · {item.reason}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-5">
        {osRules.map((rule) => (
          <div key={rule} className="rounded-2xl bg-[#EFF8F2] p-3 text-sm font-bold text-[#2F6B4F]">
            {rule}
          </div>
        ))}
      </div>
    </section>
  );
}
