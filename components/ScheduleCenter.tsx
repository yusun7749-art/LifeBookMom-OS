"use client";

import { useMemo, useState } from "react";
import { scheduleItems, type ScheduleItem } from "../data/schedule";
import KoreaClock, { getKoreaDateString } from "./KoreaClock";

const days = Array.from({ length: 30 }, (_, i) => i + 1);

type DisplayStatus = "게시됨" | "예약됨" | "발행 확인 필요";

function getDisplayStatus(item: ScheduleItem, todayKst: string): DisplayStatus {
  if (item.status === "예약됨" && item.date < todayKst) return "발행 확인 필요";
  return item.status;
}

function groupByDate(items: ScheduleItem[]) {
  return items.reduce<Record<string, ScheduleItem[]>>((acc, item) => {
    acc[item.date] ||= [];
    acc[item.date].push(item);
    return acc;
  }, {});
}

export default function ScheduleCenter() {
  const [tab, setTab] = useState<"전체" | "Google" | "Naver" | "확인필요">("전체");
  const [selectedDate, setSelectedDate] = useState(getKoreaDateString());
  const [confirmedIds, setConfirmedIds] = useState<number[]>([]);

  const todayKst = getKoreaDateString();
  const byDate = useMemo(() => groupByDate(scheduleItems), []);
  const selectedItems = byDate[selectedDate] || [];

  const filtered = useMemo(() => {
    let list = scheduleItems;
    if (tab === "Google") list = list.filter((x) => x.platform === "Google");
    if (tab === "Naver") list = list.filter((x) => x.platform === "Naver");
    if (tab === "확인필요") list = list.filter((x) => getDisplayStatus(x, todayKst) === "발행 확인 필요" && !confirmedIds.includes(x.id));
    return [...list].sort((a, b) => b.date.localeCompare(a.date));
  }, [tab, todayKst, confirmedIds]);

  const groupedFiltered = useMemo(() => groupByDate(filtered), [filtered]);
  const dates = Object.keys(groupedFiltered).sort((a, b) => b.localeCompare(a));

  const googleCount = scheduleItems.filter((x) => x.platform === "Google").length;
  const naverCount = scheduleItems.filter((x) => x.platform === "Naver").length;
  const needConfirmCount = scheduleItems.filter((x) => getDisplayStatus(x, todayKst) === "발행 확인 필요" && !confirmedIds.includes(x.id)).length;

  return (
    <div>
      <div className="mb-8 grid gap-5 xl:grid-cols-[1fr_320px]">
        <div>
          <h2 className="text-5xl font-black">📅 일정센터</h2>
          <p className="mt-4 text-xl text-[#6F6255]">
            대한민국 표준시 기준입니다. 지난 예약글은 자동으로 발행 확인 필요로 표시됩니다.
          </p>
        </div>
        <KoreaClock />
      </div>

      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-[2rem] bg-white border border-[#E4D5BE] p-7">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm text-[#7A6B5B]">월간 운영 캘린더 · KST</p>
              <h3 className="mt-2 text-4xl font-black">2026년 6월</h3>
            </div>
            <div className="flex flex-wrap gap-2 text-sm font-bold">
              <span className="rounded-full bg-[#DFF1E7] px-3 py-2">🟢 N</span>
              <span className="rounded-full bg-[#EAF1FF] px-3 py-2">🔵 G</span>
              <span className="rounded-full bg-[#FFE1DC] px-3 py-2">확인 필요</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-7 gap-2">
            {["월", "화", "수", "목", "금", "토", "일"].map((d) => <div key={d} className="p-2 text-center font-black text-[#7A6B5B]">{d}</div>)}
            {days.map((day) => {
              const date = `2026-06-${String(day).padStart(2, "0")}`;
              const items = byDate[date] || [];
              const hasNaver = items.some((x) => x.platform === "Naver");
              const hasGoogle = items.some((x) => x.platform === "Google");
              const needConfirm = items.some((x) => getDisplayStatus(x, todayKst) === "발행 확인 필요" && !confirmedIds.includes(x.id));
              const isToday = date === todayKst;
              return (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`min-h-24 rounded-2xl border p-3 text-left ${
                    selectedDate === date ? "border-[#231F1A] bg-[#FFF3D6]" : isToday ? "border-[#9CC7B0] bg-[#EFF8F2]" : "border-[#E4D5BE] bg-[#FFFDF8]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-black">{day}</p>
                    {isToday && <span className="rounded-full bg-[#231F1A] px-2 py-1 text-xs font-black text-white">오늘</span>}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1 text-xs font-bold">
                    {hasNaver && <span className="rounded-full bg-[#DFF1E7] px-2 py-1">N</span>}
                    {hasGoogle && <span className="rounded-full bg-[#EAF1FF] px-2 py-1">G</span>}
                    {needConfirm && <span className="rounded-full bg-[#FFE1DC] px-2 py-1">확인</span>}
                  </div>
                  {items.length > 0 && <p className="mt-2 text-xs text-[#7A6B5B]">{items.length}개</p>}
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-[2rem] bg-[#231F1A] p-7 text-white">
          <p className="text-sm text-[#D9CBB7]">선택한 날짜</p>
          <h3 className="mt-2 text-3xl font-black">{selectedDate}</h3>
          <div className="mt-5 space-y-3">
            {selectedItems.length === 0 && <p className="text-[#D9CBB7]">등록된 글이 없습니다.</p>}
            {selectedItems.map((item) => {
              const status = confirmedIds.includes(item.id) ? "게시됨" : getDisplayStatus(item, todayKst);
              return (
                <div key={item.id} className="rounded-2xl bg-[#332D26] p-4">
                  <p className="text-sm text-[#D9CBB7]">{item.platform === "Naver" ? "🟢 네이버" : "🔵 Google"} · {status}</p>
                  <p className="mt-1 font-black">{item.title}</p>
                  {status === "발행 확인 필요" && (
                    <button onClick={() => setConfirmedIds((prev) => [...prev, item.id])} className="mt-3 rounded-xl bg-[#DFF1E7] px-4 py-2 font-black text-[#231F1A]">
                      발행 확인 완료
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-3">
        <Stat title="Google 전체" value={`${googleCount}`} />
        <Stat title="네이버 전체" value={`${naverCount}`} />
        <Stat title="발행 확인 필요" value={`${needConfirmCount}`} danger={needConfirmCount > 0} />
      </section>

      <section className="mt-8 rounded-[2rem] bg-white border border-[#E4D5BE] p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-3xl font-black">플랫폼별 발행 목록</h3>
          <div className="flex flex-wrap gap-2">
            {(["전체", "Google", "Naver", "확인필요"] as const).map((x) => (
              <button key={x} onClick={() => setTab(x)} className={`rounded-full px-5 py-3 font-black ${tab === x ? "bg-[#231F1A] text-white" : "bg-[#F7F1E8]"}`}>
                {x === "Naver" ? "네이버블로그" : x}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 space-y-6">
          {dates.map((date) => (
            <div key={date} className="rounded-3xl border border-[#E4D5BE] bg-[#FFFDF8] p-5">
              <h4 className="text-2xl font-black">{date}</h4>
              <div className="mt-4 space-y-3">
                {groupedFiltered[date].map((item) => {
                  const status = confirmedIds.includes(item.id) ? "게시됨" : getDisplayStatus(item, todayKst);
                  return (
                    <div key={item.id} className="rounded-2xl bg-white border border-[#E4D5BE] p-4">
                      <p className="text-sm text-[#7A6B5B]">{item.platform === "Naver" ? "🟢 네이버블로그" : "🔵 Google"} · {status} · 프로젝트: {item.project}</p>
                      <p className="mt-1 text-lg font-black">{item.title}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ title, value, danger }: { title: string; value: string; danger?: boolean }) {
  return <div className={`rounded-3xl border p-6 ${danger ? "bg-[#FFE1DC] border-[#EAA095]" : "bg-white border-[#E4D5BE]"}`}><p className="text-sm text-[#7A6B5B]">{title}</p><p className="mt-2 text-4xl font-black">{value}</p></div>;
}
