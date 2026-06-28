"use client";

import Link from "next/link";
import { calendarStatusColor, monthCalendar, weekdays, writeLink } from "../../data/v4/calendarERP";
import { Shell } from "./UsableLayout";

function RefreshButton() {
  return (
    <button
      type="button"
      onClick={() => window.location.reload()}
      className="rounded-xl bg-[#1F1A16] px-4 py-2 text-xs font-black text-white"
    >
      새로고침
    </button>
  );
}

export default function PlannerBoard() {
  return (
    <Shell title="발행달력" desc="지난 발행, 오늘 상태, 앞으로 예정까지 한 달 달력으로 확인합니다.">
      <section className="rounded-2xl border border-[#E4D5BE] bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-black">{monthCalendar.title}</h2>
            <p className="mt-1 text-xs font-bold text-[#6F6255]">
              발행완료·미작성·작성예정을 한 칸에서 확인합니다.
            </p>
          </div>
          <RefreshButton />
        </div>

        <div className="mt-4 grid grid-cols-7 gap-2">
          {weekdays.map((day) => (
            <div key={day} className="rounded-xl bg-[#1F1A16] p-2 text-center text-xs font-black text-white">
              {day}
            </div>
          ))}

          {monthCalendar.days.map((item) => (
            <div
              key={item.day}
              className={`min-h-[135px] rounded-xl border p-2 ${calendarStatusColor(item.type)}`}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-black">{item.day}</p>
                {item.type !== "empty" ? (
                  <span className="rounded-full bg-white px-2 py-1 text-[10px] font-black text-[#2F6B4F]">
                    {item.type === "done" ? "완료" : item.type === "partial" ? "미완료" : "예정"}
                  </span>
                ) : null}
              </div>

              {item.title ? (
                <div className="mt-2">
                  <p className="line-clamp-2 text-xs font-black">{item.title}</p>
                  <div className="mt-2 space-y-1 text-[11px] font-bold text-[#6F6255]">
                    <p>네이버: {item.naver}</p>
                    <p>Google: {item.google}</p>
                    <p>이미지: {item.image}</p>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    <Link href={writeLink(item.title, "naver")} className="rounded-lg bg-[#1F1A16] px-2 py-1 text-[10px] font-black text-white">
                      네이버
                    </Link>
                    <Link href={writeLink(item.title, "google")} className="rounded-lg bg-white px-2 py-1 text-[10px] font-black text-[#1F1A16]">
                      Google
                    </Link>
                  </div>
                </div>
              ) : (
                <p className="mt-8 text-center text-[11px] text-[#C5B9AA]">기록 없음</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </Shell>
  );
}
