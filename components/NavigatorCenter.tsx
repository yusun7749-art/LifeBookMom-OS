"use client";

import { useMemo, useState } from "react";
import { getJourneyStage, type LifeStage } from "../data/lifeJourneyBrain";
import { findParentingGraph } from "../data/parentingGraph";
import { osMasterPlan } from "../data/osMasterPlan";

const stages: LifeStage[] = ["초3", "초4", "초5", "초6", "중학생"];

export default function NavigatorCenter() {
  const [stage, setStage] = useState<LifeStage>("초3");
  const [topic, setTopic] = useState("친구 부탁을 거절 못하는 아이");

  const journey = useMemo(() => getJourneyStage(stage), [stage]);
  const graph = useMemo(() => findParentingGraph(topic), [topic]);

  return (
    <div>
      <section className="rounded-[2rem] bg-[#231F1A] p-8 text-white">
        <p className="text-sm text-[#D9CBB7]">LifeBookMom OS V3</p>
        <h2 className="mt-3 text-5xl font-black">🧭 항해사 전략실</h2>
        <p className="mt-4 text-xl text-[#F7F1E8]">{osMasterPlan.vision}</p>
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-3">
        <div className="rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
          <h3 className="text-3xl font-black">🌱 Life Journey Brain</h3>
          <select
            value={stage}
            onChange={(e) => setStage(e.target.value as LifeStage)}
            className="mt-5 w-full rounded-2xl border border-[#E4D5BE] bg-[#FFFDF8] px-5 py-4 font-bold outline-none"
          >
            {stages.map((s) => <option key={s}>{s}</option>)}
          </select>

          <p className="mt-5 font-black">현재 핵심 고민</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {journey.coreConcerns.map((item) => (
              <span key={item} className="rounded-full bg-[#DFF1E7] px-4 py-2 text-sm font-bold">{item}</span>
            ))}
          </div>

          <p className="mt-5 font-black">다음 성장 신호</p>
          <div className="mt-3 space-y-2">
            {journey.nextStageHints.map((item) => (
              <div key={item} className="rounded-2xl bg-[#FFFDF8] border border-[#E4D5BE] p-3">{item}</div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#E4D5BE] bg-white p-7 xl:col-span-2">
          <h3 className="text-3xl font-black">🗺 Parenting Graph</h3>
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="mt-5 w-full rounded-2xl border border-[#E4D5BE] bg-[#FFFDF8] px-5 py-4 outline-none"
            placeholder="현재 글 주제 입력"
          />

          <div className="mt-5 rounded-2xl bg-[#FFFDF8] border border-[#E4D5BE] p-5">
            <p className="text-sm text-[#B35C3D]">현재 클러스터</p>
            <p className="mt-1 text-2xl font-black">{graph.cluster}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {graph.related.map((item) => (
                <span key={item} className="rounded-full bg-white border border-[#E4D5BE] px-4 py-2 text-sm font-bold">{item}</span>
              ))}
            </div>
          </div>

          <h4 className="mt-7 text-2xl font-black">다음 추천 글</h4>
          <div className="mt-4 space-y-3">
            {graph.nextRecommended.map((item) => (
              <div key={item.title} className="rounded-2xl bg-[#EFF8F2] border border-[#9CC7B0] p-5">
                <p className="text-sm">{"⭐".repeat(item.priority)}</p>
                <p className="mt-1 text-xl font-black">{item.title}</p>
                <p className="mt-2 text-[#5F6F61]">{item.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
        <h3 className="text-3xl font-black">🏢 LifeBookMom OS 부서 구조</h3>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {osMasterPlan.departments.map((dept) => (
            <div key={dept.name} className="rounded-2xl bg-[#FFFDF8] border border-[#E4D5BE] p-4">
              <p className="font-black">{dept.name}</p>
              <p className="mt-2 text-sm text-[#7A6B5B]">{dept.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] bg-[#231F1A] p-7 text-white">
        <h3 className="text-3xl font-black">🚀 V3 즉시 구축 목록</h3>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {osMasterPlan.immediateBuild.map((item) => (
            <div key={item} className="rounded-2xl bg-white/10 p-4 font-bold">✅ {item}</div>
          ))}
        </div>
      </section>
    </div>
  );
}
