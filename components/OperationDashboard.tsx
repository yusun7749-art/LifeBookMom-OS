"use client";

import { useMemo, useState } from "react";
import { projects } from "../data/projects";
import { links } from "../data/links";
import KoreaClock from "./KoreaClock";

const missions = [
  { id: 1, label: "수족구 대표글 리뉴얼", xp: 120, type: "리뉴얼" },
  { id: 2, label: "자기주도학습 체크리스트 추가", xp: 100, type: "콘텐츠" },
  { id: 3, label: "로블록스 쇼츠 대본 준비", xp: 80, type: "쇼츠" },
  { id: 4, label: "집콕놀이 쿠팡 후보 확인", xp: 60, type: "쿠팡" },
  { id: 5, label: "유괴예방 FAQ 보강", xp: 90, type: "FAQ" },
];

export default function OperationDashboard() {
  const [done, setDone] = useState<number[]>([]);

  const stats = useMemo(() => {
    const naverRenewal = projects.filter((p) => p.naver === "리뉴얼").length;
    const googleDone = projects.filter((p) => p.google === "완료").length;
    const shortsReady = projects.filter((p) => p.shorts === "예정").length;
    const coupangReady = projects.filter((p) => p.coupang === "예정").length;
    const sss = projects.filter((p) => p.grade === "SSS").length;
    const top = [...projects].sort((a, b) => b.views - a.views).slice(0, 5);
    return { naverRenewal, googleDone, shortsReady, coupangReady, sss, top };
  }, []);

  const totalXp = missions.filter((m) => done.includes(m.id)).reduce((sum, m) => sum + m.xp, 0);
  const progress = Math.round((done.length / missions.length) * 100);
  const level = totalXp >= 300 ? 2 : 1;

  return (
    <div>
      <section className="rounded-[2rem] bg-[#231F1A] p-8 text-white">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="text-sm text-[#D9CBB7]">LifeBookMom Brain OS · KST</p>
            <h2 className="mt-3 text-5xl font-black">안녕하세요, 선장님.</h2>
            <p className="mt-4 text-2xl font-bold text-[#F7F1E8]">
              모든 일정과 오늘 할 일은 대한민국 표준시 기준입니다.
            </p>
          </div>
          <a href="https://chatgpt.com/" target="_blank" className="rounded-2xl bg-[#DFF1E7] px-6 py-4 font-black text-[#231F1A]">
            🤖 항해사 호출
          </a>
        </div>

        <div className="mt-8 grid gap-5 xl:grid-cols-5 md:grid-cols-2">
          <DarkStat title="오늘 진행률" value={`${progress}%`} />
          <DarkStat title="완료 미션" value={`${done.length}/${missions.length}`} />
          <DarkStat title="LEVEL" value={`LV.${level}`} />
          <DarkStat title="오늘 XP" value={`+${totalXp}`} />
          <KoreaClock />
        </div>

        <div className="mt-8 h-5 rounded-full bg-[#4A4036]">
          <div className="h-5 rounded-full bg-[#9CC7B0]" style={{ width: `${progress}%` }} />
        </div>
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-[2rem] bg-white border border-[#E4D5BE] p-8">
          <h3 className="text-3xl font-black">⚓ 오늘 해야 할 일</h3>
          <p className="mt-2 text-[#7A6B5B]">오늘 날짜는 대한민국 표준시 기준으로 판단합니다.</p>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {missions.map((m) => {
              const checked = done.includes(m.id);
              return (
                <button
                  key={m.id}
                  onClick={() => setDone((prev) => checked ? prev.filter((x) => x !== m.id) : [...prev, m.id])}
                  className={`rounded-2xl border p-5 text-left transition ${
                    checked ? "border-[#9CC7B0] bg-[#EFF8F2]" : "border-[#E4D5BE] bg-[#FFFDF8]"
                  }`}
                >
                  <p className="text-sm text-[#7A6B5B]">{m.type} · +{m.xp}XP</p>
                  <p className="mt-2 text-xl font-black">{checked ? "✅" : "□"} {m.label}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-[2rem] bg-white border border-[#E4D5BE] p-8">
          <h3 className="text-3xl font-black">🧭 항해사 보고</h3>
          <div className="mt-5 space-y-4">
            <Report label="네이버 리뉴얼" value={`${stats.naverRenewal}개`} />
            <Report label="Google 완료" value={`${stats.googleDone}개`} />
            <Report label="쇼츠 후보" value={`${stats.shortsReady}개`} />
            <Report label="쿠팡 후보" value={`${stats.coupangReady}개`} />
            <Report label="SSS 자산" value={`${stats.sss}개`} />
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] bg-white border border-[#E4D5BE] p-8">
        <h3 className="text-3xl font-black">🚀 빠른 출항 버튼</h3>
        <div className="mt-5 grid gap-3 md:grid-cols-5">
          {links.map((link) => (
            <a key={link.label} href={link.url} target="_blank" className="rounded-2xl bg-[#EFF8F2] p-4 font-bold hover:bg-[#DFF1E7]">
              {link.label}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

function DarkStat({ title, value }: { title: string; value: string }) {
  return <div className="rounded-3xl bg-[#332D26] p-5"><p className="text-sm text-[#D9CBB7]">{title}</p><p className="mt-2 text-4xl font-black">{value}</p></div>;
}

function Report({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between rounded-2xl bg-[#F7F1E8] p-4"><span className="font-bold">{label}</span><span className="font-black">{value}</span></div>;
}
