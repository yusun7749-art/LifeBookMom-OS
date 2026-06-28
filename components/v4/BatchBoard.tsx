"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { batchQueue, dailyTargets, nightBatchMeta, replacementQueue, taskLabels, writeLink } from "../../data/v4/nightBatchERP";
import { Shell } from "./UsableLayout";

type TaskKey = "naver" | "google" | "image" | "publish";
type Row = { slot: string; title: string; seoGrade: string; relation: string; duplicateRisk: string; replaced?: boolean };
type DoneMap = Record<string, Partial<Record<TaskKey, boolean>>>;

const taskKeys: TaskKey[] = ["naver", "google", "image", "publish"];

function replacement(used: string[], slot: string, idx: number): Row {
  const r = replacementQueue.find((x) => !used.includes(x.title)) ?? replacementQueue[idx % replacementQueue.length];
  return { slot, title: r.title, seoGrade: r.seoGrade, relation: r.relation, duplicateRisk: r.duplicateRisk, replaced: true };
}

export default function BatchBoard() {
  const [rows, setRows] = useState<Row[]>(batchQueue);
  const [done, setDone] = useState<DoneMap>({});

  const summary = useMemo(() => {
    const count = (key: TaskKey) => rows.filter((r) => done[r.slot]?.[key]).length;
    return [
      { label: "네이버 작성", current: count("naver"), target: dailyTargets.naver },
      { label: "Google 작성", current: count("google"), target: dailyTargets.google },
      { label: "이미지 제작", current: count("image"), target: dailyTargets.image },
      { label: "발행완료", current: rows.filter((r) => taskKeys.every((k) => done[r.slot]?.[k])).length, target: rows.length },
    ];
  }, [done, rows]);

  const mark = (slot: string, key: TaskKey) => {
    setDone((p) => ({ ...p, [slot]: { ...(p[slot] ?? {}), [key]: true } }));
  };

  const removeAndRefill = (slot: string) => {
    setRows((prev) => {
      const used = prev.map((x) => x.title);
      return prev.map((x, idx) => (x.slot === slot ? replacement(used, x.slot, idx) : x));
    });
    setDone((p) => ({ ...p, [slot]: {} }));
  };

  return (
    <Shell title="야간 일괄 작성" desc="✅ 발행완료 / ⚠️ 중복 버튼을 누르면 목록에서 빠지고 새 주제로 보충됩니다.">
      <section className="grid gap-3 md:grid-cols-4">
        {summary.map((item) => (
          <div key={item.label} className="rounded-2xl bg-white p-4">
            <p className="font-black">{item.label}</p>
            <p className="mt-1 text-2xl font-black text-[#2F6B4F]">
              {item.current} / {item.target}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-4 rounded-2xl border border-[#E4D5BE] bg-white p-4">
        <h2 className="text-xl font-black">{nightBatchMeta.title}</h2>

        <div className="mt-4 space-y-2">
          {rows.map((item) => {
            const rowDone = done[item.slot] ?? {};

            return (
              <div key={`${item.slot}-${item.title}`} className="grid gap-3 rounded-2xl bg-[#FFFDF8] p-3 xl:grid-cols-[50px_1fr_420px]">
                <div className="text-2xl font-black text-[#2F6B4F]">{item.slot}</div>

                <div>
                  <p className="font-black">{item.title}</p>
                  <p className="mt-1 text-xs text-[#6F6255]">
                    SEO {item.seoGrade} · {item.relation}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {taskKeys
                      .filter((k) => !rowDone[k])
                      .map((k) => (
                        <label key={k} className="flex items-center gap-2 rounded-lg bg-white px-2 py-1 text-[11px] font-bold">
                          <input type="checkbox" className="h-3 w-3" onChange={() => mark(item.slot, k)} />
                          {taskLabels[k]}
                        </label>
                      ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-start justify-end gap-2">
                  <Link href={writeLink(item.title, "naver")} className="rounded-xl bg-[#1F1A16] px-3 py-2 text-xs font-black text-white">
                    네이버
                  </Link>
                  <Link href={writeLink(item.title, "google")} className="rounded-xl bg-white px-3 py-2 text-xs font-black text-[#1F1A16]">
                    Google
                  </Link>
                  <Link href={writeLink(item.title, "image")} className="rounded-xl bg-[#FFE8F1] px-3 py-2 text-xs font-black text-[#1F1A16]">
                    이미지
                  </Link>
                  <button onClick={() => removeAndRefill(item.slot)} className="rounded-xl bg-[#FFE8E8] px-3 py-2 text-xs font-black text-[#D22222]">
                    ✅ 발행완료
                  </button>
                  <button onClick={() => removeAndRefill(item.slot)} className="rounded-xl bg-[#FFF4EF] px-3 py-2 text-xs font-black text-[#9F3D2E]">
                    ⚠️ 중복
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Shell>
  );
}
