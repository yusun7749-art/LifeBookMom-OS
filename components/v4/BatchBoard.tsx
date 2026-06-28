"use client";

import Link from "next/link";
import { batchQueue, batchSummary, dailyTargets, nightBatchMeta, writeLink } from "../../data/v4/nightBatchERP";
import { Shell } from "./UsableLayout";

function CheckBox({ label }: { label: string }) {
  return (
    <label className="flex items-center gap-2 rounded-lg bg-white px-2 py-1 text-[11px] font-bold">
      <input type="checkbox" className="h-3 w-3" />
      {label}
    </label>
  );
}

export default function BatchBoard() {
  return (
    <Shell title="야간 일괄 작성" desc="시간대별 발행이 아니라, 밤에 하루치 글을 전부 열어두고 체크합니다.">
      <section className="grid gap-3 md:grid-cols-4">
        {batchSummary.map((item) => (
          <div key={item.label} className="rounded-2xl bg-white p-4">
            <p className="font-black">{item.label}</p>
            <p className="mt-1 text-2xl font-black text-[#2F6B4F]">{item.current} / {item.target}</p>
          </div>
        ))}
      </section>

      <section className="mt-4 rounded-2xl border border-[#E4D5BE] bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-black">{nightBatchMeta.title}</h2>
            <p className="mt-1 text-xs font-bold text-[#6F6255]">
              작업시간: {dailyTargets.workWindow} · 방식: {dailyTargets.mode}
            </p>
          </div>
          <button onClick={() => window.location.reload()} className="rounded-xl bg-[#1F1A16] px-4 py-2 text-xs font-black text-white">
            새로고침
          </button>
        </div>

        <div className="mt-4 space-y-2">
          {batchQueue.map((item) => (
            <div key={item.slot} className="rounded-2xl bg-[#FFFDF8] p-3">
              <div className="grid gap-3 xl:grid-cols-[40px_1fr_310px]">
                <div className="text-2xl font-black text-[#2F6B4F]">{item.slot}</div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-black">{item.title}</p>
                    <span className="rounded-full bg-[#DFF1E7] px-2 py-1 text-[11px] font-black text-[#2F6B4F]">
                      SEO {item.seoGrade}
                    </span>
                    <span className="rounded-full bg-white px-2 py-1 text-[11px] font-black text-[#B35C3D]">
                      중복위험 {item.duplicateRisk}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[#6F6255]">{item.relation}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <CheckBox label="네이버 작성완료" />
                    <CheckBox label="Google 작성완료" />
                    <CheckBox label="이미지 완료" />
                    <CheckBox label="예약/발행완료" />
                  </div>
                </div>

                <div className="flex flex-wrap items-start justify-end gap-2">
                  <Link href={writeLink(item.title, "naver")} className="rounded-xl bg-[#1F1A16] px-3 py-2 text-xs font-black text-white">
                    네이버 작성
                  </Link>
                  <Link href={writeLink(item.title, "google")} className="rounded-xl bg-white px-3 py-2 text-xs font-black text-[#1F1A16]">
                    Google 작성
                  </Link>
                  <Link href={writeLink(item.title, "image")} className="rounded-xl bg-[#FFE8F1] px-3 py-2 text-xs font-black text-[#1F1A16]">
                    이미지
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Shell>
  );
}
