"use client";

import { originalPublishedTitles, draftQueueTitles } from "../../data/v4/cmsOriginalTitles";
import { Shell } from "./UsableLayout";

export default function PlannerBoard() {
  return (
    <Shell title="발행관리" desc="발행완료로 직접 체크된 제목만 완료 내역에 표시합니다.">
      <section className="rounded-2xl border border-[#E4D5BE] bg-white p-4">
        <h2 className="text-xl font-black">발행완료</h2>
        <div className="mt-3 divide-y divide-[#EEE4D6]">
          {originalPublishedTitles.map((item) => (
            <div key={item.id} className="py-2 text-sm font-bold">
              <span className="mr-3 text-[#2F6B4F]">{item.date}</span>
              {item.originalTitle}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-4 rounded-2xl border border-[#E4D5BE] bg-white p-4">
        <h2 className="text-xl font-black">미발행 후보</h2>
        <div className="mt-3 divide-y divide-[#EEE4D6]">
          {draftQueueTitles.map((item) => (
            <div key={item.id} className="py-2 text-sm font-bold">
              <span className="mr-3 text-[#B35C3D]">미발행</span>
              {item.originalTitle}
            </div>
          ))}
        </div>
      </section>
    </Shell>
  );
}
