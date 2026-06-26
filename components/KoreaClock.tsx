"use client";

import { useEffect, useState } from "react";

function formatKoreaNow() {
  const now = new Date();
  const date = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  }).format(now);

  const time = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now);

  return { date, time };
}

export function getKoreaDateString() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const year = parts.find((p) => p.type === "year")?.value;
  const month = parts.find((p) => p.type === "month")?.value;
  const day = parts.find((p) => p.type === "day")?.value;

  return `${year}-${month}-${day}`;
}

export default function KoreaClock() {
  const [now, setNow] = useState(formatKoreaNow());

  useEffect(() => {
    const timer = setInterval(() => setNow(formatKoreaNow()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="rounded-3xl bg-white border border-[#E4D5BE] p-5 text-[#231F1A]">
      <p className="text-sm font-bold text-[#7A6B5B]">대한민국 표준시 KST</p>
      <p className="mt-2 text-xl font-black">{now.date}</p>
      <p className="mt-1 text-3xl font-black">{now.time}</p>
    </div>
  );
}
