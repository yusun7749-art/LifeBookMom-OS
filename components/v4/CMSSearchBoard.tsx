"use client";

import { useMemo, useState } from "react";
import { blocked, published, recommended } from "../../data/v4/usableERP";
import { Box, Shell, WriteButton } from "./UsableLayout";

export default function CMSSearchBoard() {
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();

  const filteredPublished = useMemo(() => {
    if (!normalizedQuery) return published;
    return published.filter((item) => {
      const text = [
        item.title,
        item.group,
        item.point,
        item.date,
        item.naver,
        item.google,
        item.image,
        ...item.keywords,
      ]
        .join(" ")
        .toLowerCase();

      return text.includes(normalizedQuery);
    });
  }, [normalizedQuery]);

  const filteredRecommended = useMemo(() => {
    if (!normalizedQuery) return recommended;
    return recommended.filter((item) =>
      [item.title, item.group, item.reason, item.relation, item.seoGrade, item.duplicateRisk]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery)
    );
  }, [normalizedQuery]);

  const filteredBlocked = useMemo(() => {
    if (!normalizedQuery) return blocked;
    return blocked.filter((item) =>
      [item.title, item.reason].join(" ").toLowerCase().includes(normalizedQuery)
    );
  }, [normalizedQuery]);

  return (
    <Shell title="콘텐츠검색" desc="쓴 글, 중복 위험, 추천 글을 직접 검색하고 바로 작업합니다.">
      <section className="rounded-2xl border border-[#E4D5BE] bg-white p-4">
        <h2 className="text-xl font-black">검색</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="예: 체취, 사춘기, SNS, 물놀이"
            className="min-w-[320px] flex-1 rounded-xl border border-[#E4D5BE] px-4 py-3 text-sm font-bold outline-none"
          />
          <button
            type="button"
            onClick={() => setQuery("")}
            className="rounded-xl bg-[#1F1A16] px-4 py-3 text-xs font-black text-white"
          >
            초기화
          </button>
        </div>
        <p className="mt-2 text-xs font-bold text-[#6F6255]">
          검색 결과: 작성된 글 {filteredPublished.length}개 · 중복 위험 {filteredBlocked.length}개 · 추천 글 {filteredRecommended.length}개
        </p>
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-3">
        <Box title="작성된 글">
          <div className="space-y-2">
            {filteredPublished.map((item) => (
              <div key={item.id} className="rounded-xl bg-[#FFFDF8] p-3">
                <p className="font-black">{item.title}</p>
                <p className="mt-1 text-xs text-[#7A6B5B]">
                  {item.date} · {item.group} · 네이버 {item.naver} · Google {item.google} · 이미지 {item.image}
                </p>
                <p className="mt-1 text-xs font-bold text-[#2F6B4F]">{item.keywords.join(" · ")}</p>
                <p className="mt-1 text-xs text-[#6F6255]">{item.point}</p>
              </div>
            ))}

            {filteredPublished.length === 0 ? (
              <div className="rounded-xl bg-[#FFF4EF] p-3 text-sm font-bold text-[#9F3D2E]">
                작성된 글에서 검색 결과가 없습니다.
              </div>
            ) : null}
          </div>
        </Box>

        <Box title="중복 위험">
          <div className="space-y-2">
            {filteredBlocked.map((item) => (
              <div key={item.title} className="rounded-xl bg-[#FFF4EF] p-3">
                <p className="font-black text-[#9F3D2E]">{item.title}</p>
                <p className="mt-1 text-xs font-bold text-[#9F3D2E]">{item.reason}</p>
              </div>
            ))}

            {filteredBlocked.length === 0 ? (
              <div className="rounded-xl bg-[#EFF8F2] p-3 text-sm font-bold text-[#2F6B4F]">
                중복 위험 결과가 없습니다.
              </div>
            ) : null}
          </div>
        </Box>

        <Box title="추천 글">
          <div className="space-y-2">
            {filteredRecommended.map((item) => (
              <div key={item.title} className="rounded-xl bg-[#EFF8F2] p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-black">{item.title}</p>
                    <p className="mt-1 text-xs font-bold text-[#2F6B4F]">
                      SEO {item.seoGrade}등급 · 중복위험 {item.duplicateRisk}
                    </p>
                    <p className="mt-1 text-xs text-[#6F6255]">{item.reason}</p>
                  </div>
                  <div className="flex gap-2">
                    <WriteButton title={item.title} mode="naver" />
                    <WriteButton title={item.title} mode="google" />
                  </div>
                </div>
              </div>
            ))}

            {filteredRecommended.length === 0 ? (
              <div className="rounded-xl bg-[#FFF4EF] p-3 text-sm font-bold text-[#9F3D2E]">
                추천 글에서 검색 결과가 없습니다.
              </div>
            ) : null}
          </div>
        </Box>
      </section>
    </Shell>
  );
}
