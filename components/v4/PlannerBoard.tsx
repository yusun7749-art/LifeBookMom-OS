"use client";

import { originalPublishedTitles, draftQueueTitles } from "../../data/v4/cmsOriginalTitles";
import { Shell, WriteButton } from "./UsableLayout";

export default function PlannerBoard() {
  return (
    <Shell title="발행관리" desc="발행완료로 직접 체크된 원본 제목만 발행내역에 표시합니다.">
      <section className="rounded-2xl border border-[#E4D5BE] bg-white p-4">
        <h2 className="text-xl font-black">발행완료 내역</h2>
        <div className="mt-3 divide-y divide-[#EEE4D6]">
          {originalPublishedTitles.map((item) => (
            <div key={item.id} className="flex flex-wrap items-center justify-between gap-2 py-2">
              <p className="min-w-0 flex-1 text-sm font-bold">
                <span className="mr-3 text-[#2F6B4F]">{item.date}</span>
                {item.originalTitle}
              </p>
              <div className="flex shrink-0 flex-wrap gap-2">
                <WriteButton title={item.originalTitle} mode="naver" />
                <WriteButton title={item.originalTitle} mode="google" />
                <WriteButton title={item.originalTitle} mode="image" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-4 rounded-2xl border border-[#E4D5BE] bg-white p-4">
        <h2 className="text-xl font-black">미발행 후보</h2>
        <div className="mt-3 divide-y divide-[#EEE4D6]">
          {draftQueueTitles.map((item) => (
            <div key={item.id} className="flex flex-wrap items-center justify-between gap-2 py-2">
              <p className="min-w-0 flex-1 text-sm font-bold">
                <span className="mr-3 text-[#B35C3D]">{item.date}</span>
                {item.originalTitle}
              </p>
              <div className="flex shrink-0 flex-wrap gap-2">
                <WriteButton title={item.originalTitle} mode="naver" />
                <WriteButton title={item.originalTitle} mode="google" />
                <WriteButton title={item.originalTitle} mode="image" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </Shell>
  );
}
