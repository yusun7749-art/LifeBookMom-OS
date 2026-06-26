"use client";

import { useMemo, useState } from "react";
import { projects } from "../data/projects";

const todayMissions = [
  { id: 1, label: "수족구 대표글 리뉴얼", projectId: 1, xp: 120 },
  { id: 2, label: "자기주도학습 체크리스트 추가", projectId: 2, xp: 100 },
  { id: 3, label: "로블록스 쇼츠 대본 준비", projectId: 3, xp: 80 },
  { id: 4, label: "쿠팡 연결 후보 확인", projectId: 4, xp: 60 },
];

export default function MissionBoard() {
  const [done, setDone] = useState<number[]>([]);

  const totalXp = useMemo(() => {
    return todayMissions.filter((m) => done.includes(m.id)).reduce((sum, m) => sum + m.xp, 0);
  }, [done]);

  const progress = Math.round((done.length / todayMissions.length) * 100);

  const toggle = (id: number) => {
    setDone((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <section className="mt-8 rounded-3xl bg-white border border-[#E4D5BE] p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h3 className="text-3xl font-black">⚓ 오늘의 항해 미션</h3>
          <p className="mt-2 text-[#7A6B5B]">체크하면 진행률과 XP가 올라갑니다.</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-[#7A6B5B]">오늘 XP</p>
          <p className="text-4xl font-black">+{totalXp}</p>
        </div>
      </div>

      <div className="mt-6 h-4 rounded-full bg-[#E4D5BE]">
        <div className="h-4 rounded-full bg-[#9CC7B0]" style={{ width: `${progress}%` }} />
      </div>
      <p className="mt-2 font-bold">{done.length} / {todayMissions.length} 완료 · {progress}%</p>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {todayMissions.map((mission) => {
          const project = projects.find((p) => p.id === mission.projectId);
          const checked = done.includes(mission.id);

          return (
            <button
              key={mission.id}
              onClick={() => toggle(mission.id)}
              className={`rounded-2xl border p-5 text-left ${
                checked ? "border-[#9CC7B0] bg-[#EFF8F2]" : "border-[#E4D5BE] bg-[#FFFDF8]"
              }`}
            >
              <p className="text-sm text-[#7A6B5B]">{project?.topic} · +{mission.xp}XP</p>
              <p className="mt-2 text-xl font-black">
                {checked ? "✅" : "□"} {mission.label}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
