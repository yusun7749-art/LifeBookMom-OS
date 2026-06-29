"use client";

import { useState } from "react";
import { blocked, contentMap, duplicateCheck, recommended } from "../../data/v4/usableERP";
import { Box, SeoBadge, Shell, WriteButton } from "./UsableLayout";

export default function ContentBrain() {
  const [hidden, setHidden] = useState<string[]>([]);
  const checks = ["초등학생 체취 변화", "초3 사춘기 신호", "초등학생 속옷 교체 시기"].map((q) => ({ q, results: duplicateCheck(q) }));
  const visibleRecommended = recommended.filter((r) => !hidden.includes(r.title));

  return (
    <Shell title="콘텐츠 두뇌" desc="이미 쓴 글은 막고, 중복 버튼으로 추천에서 제외합니다.">
      <section className="grid gap-3 xl:grid-cols-3">
        <Box title="중복 추천 차단">
          <div className="space-y-2">
            {checks.map((c) => (
              <div key={c.q} className="rounded-xl bg-[#FFFDF8] p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-black">{c.q}</p>
                  {c.results.length ? <span className="text-xs font-black text-[#B35C3D]">중복위험</span> : <WriteButton title={c.q} />}
                </div>
                {c.results.slice(0,1).map((r) => <p key={r.id} className="mt-1 text-xs text-[#7A6B5B]">{r.title} · 유사도 {r.score}%</p>)}
              </div>
            ))}
          </div>
        </Box>

        <Box title="다음에 쓰면 좋은 글">
          <div className="space-y-2">
            {visibleRecommended.map((r) => (
              <div key={r.title} className="rounded-xl bg-[#EFF8F2] p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-black">{r.title}</p>
                      <SeoBadge grade={r.seoGrade} />
                    </div>
                    <p className="text-xs font-bold text-[#2F6B4F]">{r.reason}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <WriteButton title={r.title} mode="naver" />
                    <WriteButton title={r.title} mode="google" />
                    <button onClick={() => setHidden((p) => [...p, r.title])} className="rounded-xl bg-[#EFEFEF] px-3 py-2 text-xs font-black text-[#777]">⚠️ 중복</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Box>

        <Box title="추천 제외">
          <div className="grid gap-2">
            {[...blocked, ...hidden.map((title) => ({ title, reason: "직접 중복 제외" }))].map((b) => <div key={b.title} className="rounded-xl bg-[#FFF4EF] p-2 text-xs font-bold text-[#9F3D2E]">{b.title} · {b.reason}</div>)}
          </div>
        </Box>
      </section>

      <div className="mt-4">
        <Box title="콘텐츠 지도">
          <div className="grid gap-3 md:grid-cols-3">
            {contentMap.map((g) => (
              <div key={g.group} className="rounded-xl bg-[#FFFDF8] p-3">
                <p className="font-black">{g.group}</p>
                <p className="mt-2 text-xs font-bold text-[#2F6B4F]">완료: {g.done.join(", ")}</p>
                <p className="mt-1 text-xs font-bold text-[#B35C3D]">다음: {g.todo.join(", ")}</p>
              </div>
            ))}
          </div>
        </Box>
      </div>
    </Shell>
  );
}
