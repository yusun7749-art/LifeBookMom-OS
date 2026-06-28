"use client";

import { useEffect, useState } from "react";

type KoreaTime = {
  date: string;
  time: string;
};

function getKoreaTime(): KoreaTime {
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

export default function KoreaClock() {
  const [koreaTime, setKoreaTime] = useState<KoreaTime | null>(null);

  useEffect(() => {
    setKoreaTime(getKoreaTime());

    const timer = window.setInterval(() => {
      setKoreaTime(getKoreaTime());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="rounded-3xl bg-white p-5 text-[#231F1A]">
      <p className="text-sm font-bold text-[#7A6B5B]">대한민국 표준시 KST</p>
      <p className="mt-2 text-2xl font-black">
        {koreaTime ? koreaTime.date : "시간 준비 중"}
      </p>
      <p className="mt-1 text-3xl font-black">
        {koreaTime ? koreaTime.time : "--:--:--"}
      </p>
    </div>
  );
}
export function getKoreaDateString() {
  const now = new Date();

  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}