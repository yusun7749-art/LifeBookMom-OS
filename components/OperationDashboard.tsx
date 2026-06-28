"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { projects } from "../data/projects";
import { links } from "../data/links";
import KoreaClock from "./KoreaClock";
import CompanyHealth from "./dashboard/CompanyHealth";

const missions = [
  { id: 1, label: "수족구 대표글 리뉴얼", xp: 120, type: "리뉴얼" },
  { id: 2, label: "자기주도학습 체크리스트 추가", xp: 100, type: "콘텐츠" },
  { id: 3, label: "로블록스 쇼츠 대본 준비", xp: 80, type: "쇼츠" },
  { id: 4, label: "집콕놀이 쿠팡 후보 확인", xp: 60, type: "쿠팡" },
  { id: 5, label: "유괴예방 FAQ 보강", xp: 90, type: "FAQ" },
];

const captainLogs = [
  {
    date: "2026-06-27",
    title: "LifeBookMom Enterprise 정식 출항",
    body: "큰 회사보다 탄탄한 회사를 만들기로 결정하고 CEO Headquarters 개발을 시작했습니다.",
  },
  {
    date: "2026-06-27",
    title: "Project 001 준공",
    body: "CEO Headquarters V1을 구축하고 운영본부를 실제 회사 본부 형태로 업그레이드했습니다.",
  },
  {
    date: "2026-06-27",
    title: "Project 002 착수",
    body: "Company Health, 오류 안정화, 업데이트팩 방식 운영을 시작했습니다.",
  },
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

    return {
      totalProjects: projects.length,
      naverRenewal,
      googleDone,
      shortsReady,
      coupangReady,
      sss,
      top,
    };
  }, []);

  const totalXp = missions
    .filter((m) => done.includes(m.id))
    .reduce((sum, m) => sum + m.xp, 0);

  const progress = Math.round((done.length / missions.length) * 100);
  const level = totalXp >= 300 ? 2 : 1;

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-[#231F1A] p-8 text-white">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="text-sm text-[#D9CBB7]">LifeBookMom Enterprise · CEO Headquarters · KST</p>
            <h2 className="mt-3 text-5xl font-black">안녕하세요, 선장님.</h2>
            <p className="mt-4 text-2xl font-bold text-[#F7F1E8]">오늘도 큰 회사보다 탄탄한 회사를 만듭니다.</p>
          </div>

          <a href="https://chatgpt.com/" target="_blank" className="rounded-2xl bg-[#DFF1E7] px-6 py-4 font-black text-[#231F1A]">
            🤖 항해사 이리나 호출
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

      <CompanyHealth
        totalProjects={stats.totalProjects}
        naverRenewal={stats.naverRenewal}
        googleDone={stats.googleDone}
        shortsReady={stats.shortsReady}
        coupangReady={stats.coupangReady}
        sss={stats.sss}
      />

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
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

        <div className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h3 className="text-3xl font-black">🧭 항해사 보고</h3>

          <div className="mt-5 space-y-4">
            <Report label="전체 콘텐츠" value={`${stats.totalProjects}개`} />
            <Report label="네이버 리뉴얼" value={`${stats.naverRenewal}개`} />
            <Report label="Google 완료" value={`${stats.googleDone}개`} />
            <Report label="쇼츠 후보" value={`${stats.shortsReady}개`} />
            <Report label="쿠팡 후보" value={`${stats.coupangReady}개`} />
            <Report label="SSS 자산" value={`${stats.sss}개`} />
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <HeadquartersCard title="📚 콘텐츠 자산" description="생활백서맘의 모든 글을 자산으로 관리합니다." href="/projects" />
        <HeadquartersCard title="🤖 Navigator AI" description="오늘 작성할 글과 운영 방향을 추천합니다." href="/navigator-ai" />
        <HeadquartersCard title="🧠 Brain" description="성과가 좋은 글과 개선할 글을 분석합니다." href="/brain-core" />
        <HeadquartersCard title="💰 Revenue" description="애드센스, 쿠팡, 네이버 수익 흐름을 관리합니다." href="/revenue" />
        <HeadquartersCard title="🏢 Enterprise" description="회사 운영 원칙과 장기 시스템을 관리합니다." href="/enterprise" />
        <HeadquartersCard title="📒 Captain Log" description="중요한 결정과 개발 기록을 저장합니다." href="/dashboard#captain-log" />
      </section>

      <section id="captain-log" className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
        <h3 className="text-3xl font-black">📒 Captain Log</h3>
        <p className="mt-2 text-[#7A6B5B]">LifeBookMom Enterprise의 중요한 결정과 출항 기록입니다.</p>

        <div className="mt-6 grid gap-4">
          {captainLogs.map((log) => (
            <div key={log.title} className="rounded-2xl border border-[#E4D5BE] bg-[#FFFDF8] p-5">
              <p className="text-sm font-bold text-[#7A6B5B]">{log.date}</p>
              <p className="mt-2 text-xl font-black">{log.title}</p>
              <p className="mt-2 text-[#5C5146]">{log.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
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

function HeadquartersCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <Link href={href} className="rounded-[2rem] border border-[#E4D5BE] bg-white p-7 transition hover:-translate-y-1 hover:bg-[#FFFDF8]">
      <p className="text-2xl font-black">{title}</p>
      <p className="mt-3 text-[#7A6B5B]">{description}</p>
      <p className="mt-5 font-black text-[#5C7F68]">열기 →</p>
    </Link>
  );
}

function DarkStat({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-3xl bg-[#332D26] p-5">
      <p className="text-sm text-[#D9CBB7]">{title}</p>
      <p className="mt-2 text-4xl font-black">{value}</p>
    </div>
  );
}

function Report({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-[#F7F1E8] p-4">
      <span className="font-bold">{label}</span>
      <span className="font-black">{value}</span>
    </div>
  );
}
