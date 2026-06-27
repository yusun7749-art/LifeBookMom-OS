"use client";

import { useMemo, useState } from "react";
import { concernNodes, getConnectedConcerns, getGraphSummary } from "../../brain/parentingGraphEngine";

const categoryColor: Record<string, string> = {
  학교: "bg-[#FFF2C7]",
  친구: "bg-[#DFF1E7]",
  건강: "bg-[#FFE3D8]",
  안전: "bg-[#E8E4FF]",
  학습: "bg-[#E4F2FF]",
  감정: "bg-[#F7E4FF]",
  생활: "bg-[#F7F1E8]",
  수익: "bg-[#E6F7E6]",
};

export default function ParentingGraphCenter() {
  const [selectedId, setSelectedId] = useState("friend-refusal");
  const selected = useMemo(() => concernNodes.find((node) => node.id === selectedId) ?? concernNodes[0], [selectedId]);
  const connected = useMemo(() => getConnectedConcerns(selected.id), [selected.id]);
  const summary = getGraphSummary();

  return (
    <main className="min-h-screen bg-[#F5EFE6] p-8">
      <section className="rounded-[2.25rem] bg-[#1F1A16] p-9 text-white">
        <p className="text-sm font-bold text-[#D9CBB7]">LifeBookMom OS V5.3</p>
        <h1 className="mt-4 text-6xl font-black">🗺 Parenting Graph</h1>
        <p className="mt-5 max-w-4xl text-xl leading-9 text-[#F7F1E8]">{summary.philosophy}</p>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-3">
        <div className="rounded-[2rem] border border-[#E4D5BE] bg-white p-6">
          <p className="font-bold text-[#7A6B5B]">부모 고민 노드</p>
          <p className="mt-3 text-5xl font-black">{summary.nodeCount}</p>
          <p className="mt-2 text-sm text-[#9A8B7B]">초3 기준 시작 데이터</p>
        </div>
        <div className="rounded-[2rem] border border-[#E4D5BE] bg-white p-6">
          <p className="font-bold text-[#7A6B5B]">연결 관계</p>
          <p className="mt-3 text-5xl font-black">{summary.edgeCount}</p>
          <p className="mt-2 text-sm text-[#9A8B7B]">고민 흐름 기반</p>
        </div>
        <div className="rounded-[2rem] border border-[#E4D5BE] bg-white p-6">
          <p className="font-bold text-[#7A6B5B]">강한 경로</p>
          <p className="mt-3 text-3xl font-black">친구 → 자존감 → 표현</p>
          <p className="mt-2 text-sm text-[#9A8B7B]">대표 클러스터 후보</p>
        </div>
      </section>

      <section className="mt-8 grid gap-7 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
          <h2 className="text-3xl font-black">📌 고민 선택</h2>
          <div className="mt-5 space-y-3">
            {concernNodes.map((node) => (
              <button
                key={node.id}
                onClick={() => setSelectedId(node.id)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  selected.id === node.id ? "border-[#2E6B4E] bg-[#DFF1E7]" : "border-[#E4D5BE] bg-[#FFFDF8] hover:bg-[#F7F1E8]"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-black">{node.title}</p>
                  <span className={`rounded-full px-3 py-1 text-xs font-black ${categoryColor[node.category] ?? "bg-white"}`}>{node.category}</span>
                </div>
                <p className="mt-2 text-sm text-[#6F6255]">{node.parentMind}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-7">
          <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-3xl font-black">🧠 선택된 부모 고민</h2>
              <span className={`rounded-full px-4 py-2 text-sm font-black ${categoryColor[selected.category]}`}>{selected.category}</span>
            </div>
            <h3 className="mt-5 text-4xl font-black">{selected.title}</h3>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-[#FFFDF8] p-4">
                <p className="font-black text-[#B35C3D]">부모 마음</p>
                <p className="mt-2 text-[#6F6255]">{selected.parentMind}</p>
              </div>
              <div className="rounded-2xl bg-[#FFFDF8] p-4">
                <p className="font-black text-[#B35C3D]">검색 의도</p>
                <p className="mt-2 text-[#6F6255]">{selected.searchIntent}</p>
              </div>
            </div>
            <div className="mt-4 rounded-2xl bg-[#DFF1E7] p-5">
              <p className="font-black text-[#2E6B4E]">생활백서맘 콘텐츠 각도</p>
              <p className="mt-2">{selected.contentAngle}</p>
            </div>
          </section>

          <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
            <h2 className="text-3xl font-black">🔗 연결된 다음 고민</h2>
            <div className="mt-5 space-y-4">
              {connected.map(({ node, edge }) => (
                <div key={`${edge.from}-${edge.to}`} className="rounded-3xl border border-[#E4D5BE] bg-[#FFFDF8] p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-2xl font-black">{node.title}</p>
                    <span className="font-black text-[#B35C3D]">{"⭐".repeat(edge.strength)}</span>
                  </div>
                  <p className="mt-2 text-[#6F6255]">{edge.reason}</p>
                  <p className="mt-3 font-black text-[#2E6B4E]">다음 글 후보: {node.contentAngle}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
