"use client";

import { useMemo, useState } from "react";
import type { Project } from "../data/projects";

const categories = ["전체", "건강", "교육", "안전", "디지털", "생활"];
const statuses = ["전체", "리뉴얼", "완료", "예정", "미시작"];

export default function ProjectTable({ projects }: { projects: Project[] }) {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("전체");
  const [status, setStatus] = useState("전체");

  const filtered = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesKeyword =
        !q ||
        p.topic.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.naverTitle.toLowerCase().includes(q) ||
        p.googleTitle.toLowerCase().includes(q);
      const matchesCategory = category === "전체" || p.category === category;
      const matchesStatus =
        status === "전체" ||
        p.naver === status ||
        p.google === status ||
        p.shorts === status ||
        p.pinterest === status ||
        p.coupang === status;
      return matchesKeyword && matchesCategory && matchesStatus;
    });
  }, [keyword, category, status, projects]);

  return (
    <div>
      <div className="mb-6 rounded-3xl bg-white border border-[#E4D5BE] p-6">
        <div className="grid gap-4 xl:grid-cols-3">
          <div>
            <p className="mb-2 font-bold text-[#7A6B5B]">검색</p>
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="예: 유괴, SNS, 수족구, 쿠팡"
              className="w-full rounded-2xl border border-[#E4D5BE] bg-[#FFFDF8] px-4 py-3 outline-none focus:border-[#9CC7B0]"
            />
          </div>
          <div>
            <p className="mb-2 font-bold text-[#7A6B5B]">카테고리</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`rounded-full px-4 py-2 font-bold ${
                    category === c ? "bg-[#231F1A] text-white" : "bg-[#F7F1E8]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 font-bold text-[#7A6B5B]">상태</p>
            <div className="flex flex-wrap gap-2">
              {statuses.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`rounded-full px-4 py-2 font-bold ${
                    status === s ? "bg-[#231F1A] text-white" : "bg-[#F7F1E8]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-5 text-[#7A6B5B]">
          총 {projects.length}개 중 <span className="font-black text-[#231F1A]">{filtered.length}</span>개 표시 중
        </p>
      </div>

      <div className="overflow-auto rounded-3xl bg-white border border-[#E4D5BE]">
        <table className="w-full min-w-[1200px] text-left">
          <thead className="bg-[#FFF3D6]">
            <tr>
              <th className="p-4">주제</th>
              <th className="p-4">카테고리</th>
              <th className="p-4">네이버</th>
              <th className="p-4">Google</th>
              <th className="p-4">쇼츠</th>
              <th className="p-4">Pinterest</th>
              <th className="p-4">쿠팡</th>
              <th className="p-4">등급</th>
              <th className="p-4">상세</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-t border-[#E4D5BE]">
                <td className="p-4 font-black">{p.topic}</td>
                <td className="p-4">{p.category}</td>
                <td className="p-4">{p.naver}</td>
                <td className="p-4">{p.google}</td>
                <td className="p-4">{p.shorts}</td>
                <td className="p-4">{p.pinterest}</td>
                <td className="p-4">{p.coupang}</td>
                <td className="p-4 font-black">{p.grade}</td>
                <td className="p-4">
                  <a href={`/projects/${p.id}`} className="rounded-xl bg-[#231F1A] px-4 py-2 text-white">
                    열기
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="p-10 text-center text-[#7A6B5B]">
            검색 결과가 없습니다. 다른 키워드로 다시 검색해 주세요.
          </div>
        )}
      </div>
    </div>
  );
}
