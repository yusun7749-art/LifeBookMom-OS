"use client";

import { useMemo, useState } from "react";
import { defaultPublishLogs, type PublishLogItem } from "../data/publishLog";
import { getKoreaDateString } from "./KoreaClock";

const storageKey = "lifebookmom_publish_logs_v1";

function loadLogs(): PublishLogItem[] {
  if (typeof window === "undefined") return defaultPublishLogs;
  const saved = window.localStorage.getItem(storageKey);
  if (!saved) return defaultPublishLogs;
  try {
    return JSON.parse(saved);
  } catch {
    return defaultPublishLogs;
  }
}

function saveLogs(logs: PublishLogItem[]) {
  window.localStorage.setItem(storageKey, JSON.stringify(logs));
}

export default function PublishCompleteCenter() {
  const [logs, setLogs] = useState<PublishLogItem[]>(loadLogs);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("리뉴얼");

  const today = getKoreaDateString();
  const todayLogs = useMemo(() => logs.filter((log) => log.date === today), [logs, today]);

  const addPublishLog = () => {
    if (!title.trim()) {
      alert("발행 완료한 제목을 입력해 주세요.");
      return;
    }

    const next: PublishLogItem = {
      id: Date.now(),
      title: title.trim(),
      date: today,
      platform: "Naver",
      status: "발행 완료",
      category,
    };

    const updated = [next, ...logs];
    setLogs(updated);
    saveLogs(updated);
    setTitle("");
    alert("✅ 발행 완료 기록이 운영 로그에 저장되었습니다.");
  };

  const removeLog = (id: number) => {
    const updated = logs.filter((log) => log.id !== id);
    setLogs(updated);
    saveLogs(updated);
  };

  return (
    <div>
      <section className="rounded-[2rem] bg-[#231F1A] p-8 text-white">
        <p className="text-sm text-[#D9CBB7]">단축키 4 자동 기록 시스템</p>
        <h2 className="mt-3 text-5xl font-black">✅ 발행 완료 센터</h2>
        <p className="mt-4 text-xl text-[#F7F1E8]">
          발행한 제목을 입력하면 오늘 작업 로그와 발행 통계에 자동 저장됩니다.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <DarkStat title="오늘 발행" value={`${todayLogs.length}건`} />
          <DarkStat title="전체 발행" value={`${logs.length}건`} />
          <DarkStat title="기준 날짜" value={today} />
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] bg-white border border-[#E4D5BE] p-7">
        <h3 className="text-3xl font-black">발행 완료 기록하기</h3>
        <div className="mt-5 grid gap-3 xl:grid-cols-[1fr_180px_160px]">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="발행 완료한 제목을 입력하세요"
            className="rounded-2xl border border-[#E4D5BE] bg-[#FFFDF8] px-5 py-4 outline-none"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-2xl border border-[#E4D5BE] bg-[#FFFDF8] px-5 py-4 outline-none"
          >
            <option>리뉴얼</option>
            <option>건강</option>
            <option>교육</option>
            <option>생활</option>
            <option>디지털</option>
            <option>안전</option>
            <option>경제</option>
          </select>
          <button onClick={addPublishLog} className="rounded-2xl bg-[#231F1A] px-5 py-4 font-black text-white">
            4 발행완료
          </button>
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] bg-white border border-[#E4D5BE] p-7">
        <h3 className="text-3xl font-black">오늘 발행 완료</h3>
        <div className="mt-5 space-y-3">
          {todayLogs.length === 0 && <p className="text-[#7A6B5B]">오늘 기록된 발행 글이 없습니다.</p>}
          {todayLogs.map((log) => (
            <LogCard key={log.id} log={log} onRemove={() => removeLog(log.id)} />
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] bg-white border border-[#E4D5BE] p-7">
        <h3 className="text-3xl font-black">전체 발행 로그</h3>
        <div className="mt-5 space-y-3">
          {logs.map((log) => (
            <LogCard key={log.id} log={log} onRemove={() => removeLog(log.id)} />
          ))}
        </div>
      </section>
    </div>
  );
}

function DarkStat({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-3xl bg-[#332D26] p-5">
      <p className="text-sm text-[#D9CBB7]">{title}</p>
      <p className="mt-2 text-3xl font-black">{value}</p>
    </div>
  );
}

function LogCard({ log, onRemove }: { log: PublishLogItem; onRemove: () => void }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#E4D5BE] bg-[#FFFDF8] p-4">
      <div>
        <p className="text-sm text-[#7A6B5B]">{log.date} · 🟢 네이버 · {log.category}</p>
        <p className="mt-1 font-black">{log.title}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-[#DFF1E7] px-3 py-2 text-sm font-black">{log.status}</span>
        <button onClick={onRemove} className="rounded-full bg-[#FFE1DC] px-3 py-2 text-sm font-black">
          삭제
        </button>
      </div>
    </div>
  );
}
