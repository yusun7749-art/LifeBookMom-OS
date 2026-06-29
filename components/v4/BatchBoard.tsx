"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { batchQueue, dailyTargets, nightBatchMeta, replacementQueue, taskLabels, writeLink } from "../../data/v4/nightBatchERP";
import { markTask, setRowState, setSelectedTopic } from "../../data/v4/operationStore";
import { useOperationStoreState } from "./useOperationStore";
import { Shell } from "./UsableLayout";

type TaskKey = "naver" | "google" | "image" | "publish";
type RowState = "active" | "published" | "duplicate";
type Row = { slot: string; title: string; seoGrade: string; relation: string; duplicateRisk: string; replaced?: boolean };

const taskKeys: TaskKey[] = ["naver", "google", "image", "publish"];

function makeReplacement(used: string[], nextIndex: number): Row {
  const r = replacementQueue.find((x) => !used.includes(x.title)) ?? replacementQueue[nextIndex % replacementQueue.length];
  return {
    slot: String(nextIndex + 1).padStart(2, "0"),
    title: r.title,
    seoGrade: r.seoGrade,
    relation: r.relation,
    duplicateRisk: r.duplicateRisk,
    replaced: true,
  };
}

function makeManualRow(title: string, nextIndex: number): Row {
  return {
    slot: String(nextIndex + 1).padStart(2, "0"),
    title,
    seoGrade: "S",
    relation: "직접 입력 주제",
    duplicateRisk: "직접 확인",
    replaced: true,
  };
}

export default function BatchBoard() {
  const store = useOperationStoreState();
  const [extraRows, setExtraRows] = useState<Row[]>([]);
  const [manualTitle, setManualTitle] = useState("");
  const rows: Row[] = [...batchQueue, ...extraRows];

  const getState = (slot: string): RowState => store.rowState[slot] ?? "active";

  const summary = useMemo(() => {
    const activeRows = rows.filter((r) => getState(r.slot) === "active");
    const count = (key: TaskKey) => activeRows.filter((r) => store.done[r.slot]?.[key]).length;

    return [
      { label: "네이버 작성", current: count("naver"), target: dailyTargets.naver },
      { label: "Google 작성", current: count("google"), target: dailyTargets.google },
      { label: "이미지 제작", current: count("image"), target: dailyTargets.image },
      { label: "예약/발행 준비", current: store.publishedTitles.length, target: dailyTargets.publish },
    ];
  }, [store, rows]);

  const addManualTitle = () => {
    const title = manualTitle.trim();
    if (!title) {
      alert("추가할 제목을 입력하세요.");
      return;
    }

    setSelectedTopic(title);
    setExtraRows((prev) => [...prev, makeManualRow(title, batchQueue.length + prev.length)]);
    setManualTitle("");
  };

  const finishRow = (slot: string, title: string, state: "published" | "duplicate") => {
    setRowState(slot, title, state);

    setExtraRows((prev) => {
      const visibleRows = [...batchQueue, ...prev];
      const used = visibleRows.map((x) => x.title);
      const activeCount = visibleRows.filter((x) => (store.rowState[x.slot] ?? "active") === "active" && x.slot !== slot).length;
      if (activeCount >= batchQueue.length) return prev;
      return [...prev, makeReplacement(used, visibleRows.length)];
    });
  };

  return (
    <Shell title="야간 일괄 작성" desc="직접 제목을 추가하고, 체크와 발행완료 상태가 저장됩니다.">
      <section className="grid gap-3 md:grid-cols-4">
        {summary.map((item) => (
          <div key={item.label} className="rounded-2xl bg-white p-4">
            <p className="font-black">{item.label}</p>
            <p className="mt-1 text-2xl font-black text-[#2F6B4F]">{item.current} / {item.target}</p>
          </div>
        ))}
      </section>

      <section className="mt-4 rounded-2xl border border-[#E4D5BE] bg-white p-4">
        <h2 className="text-xl font-black">직접 작성한 제목 추가</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <input
            value={manualTitle}
            onChange={(event) => setManualTitle(event.target.value)}
            placeholder="예: 초등학생 발 냄새 관리, 양말과 운동화 습관부터 시작해요"
            className="min-w-[320px] flex-1 rounded-xl border border-[#E4D5BE] px-4 py-3 text-sm font-bold outline-none"
          />
          <button type="button" onClick={addManualTitle} className="rounded-xl bg-[#1F1A16] px-4 py-2 text-xs font-black text-white">
            일괄작성에 추가
          </button>
        </div>
      </section>

      <section className="mt-4 rounded-2xl border border-[#E4D5BE] bg-white p-4">
        <h2 className="text-xl font-black">{nightBatchMeta.title}</h2>

        <div className="mt-4 space-y-2">
          {rows.map((item) => {
            const rowDone = store.done[item.slot] ?? {};
            const state = getState(item.slot);
            const isDone = state !== "active";
            const rowColor = state === "published" ? "bg-[#E8F6EE]" : state === "duplicate" ? "bg-[#EFEFEF]" : "bg-[#FFFDF8]";
            const label = state === "published" ? "발행완료" : state === "duplicate" ? "중복제외" : item.replaced ? "대체투입" : "";

            return (
              <div key={`${item.slot}-${item.title}`} className={`grid gap-3 rounded-2xl p-3 xl:grid-cols-[70px_1fr_390px] ${rowColor}`}>
                <div>
                  <div className="text-2xl font-black text-[#2F6B4F]">{item.slot}</div>
                  {label ? <div className={`mt-1 text-xs font-black ${state === "published" ? "text-[#D22222]" : "text-[#777]"}`}>{label}</div> : null}
                </div>

                <div>
                  <p className={`font-black ${isDone ? "text-[#777]" : ""}`}>{item.title}</p>
                  <p className="mt-1 text-xs text-[#6F6255]">SEO {item.seoGrade} · {item.relation}</p>

                  {!isDone ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {taskKeys.filter((k) => !rowDone[k]).map((k) => (
                        <label key={k} className="flex items-center gap-2 rounded-lg bg-white px-2 py-1 text-[11px] font-bold">
                          <input type="checkbox" className="h-3 w-3" onChange={() => markTask(item.slot, k)} />
                          {taskLabels[k]}
                        </label>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-wrap items-start justify-end gap-2">
                  {!isDone ? (
                    <>
                      <Link href={writeLink(item.title, "naver")} onClick={() => setSelectedTopic(item.title)} className="rounded-xl bg-[#1F1A16] px-3 py-2 text-xs font-black text-white">네이버</Link>
                      <Link href={writeLink(item.title, "google")} onClick={() => setSelectedTopic(item.title)} className="rounded-xl bg-white px-3 py-2 text-xs font-black text-[#1F1A16]">Google</Link>
                      <Link href={writeLink(item.title, "image")} onClick={() => setSelectedTopic(item.title)} className="rounded-xl bg-[#FFE8F1] px-3 py-2 text-xs font-black text-[#1F1A16]">이미지</Link>
                      <button onClick={() => finishRow(item.slot, item.title, "published")} className="rounded-xl bg-[#FFE8E8] px-3 py-2 text-xs font-black text-[#D22222]">✅ 발행완료</button>
                      <button onClick={() => finishRow(item.slot, item.title, "duplicate")} className="rounded-xl bg-[#FFF4EF] px-3 py-2 text-xs font-black text-[#9F3D2E]">⚠️ 중복</button>
                    </>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Shell>
  );
}
