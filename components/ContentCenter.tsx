"use client";

import { useMemo, useState } from "react";
import { projects } from "../data/projects";
import OneClickRenewalButton from "./OneClickRenewalButton";

function copy(text: string) {
  navigator.clipboard.writeText(text);
  alert("복사 완료!");
}

export default function ContentCenter() {
  const [keyword, setKeyword] = useState("");
  const [selectedId, setSelectedId] = useState(projects[0].id);

  const filtered = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter((p) =>
      p.topic.toLowerCase().includes(q) ||
      p.naverTitle.toLowerCase().includes(q) ||
      p.googleTitle.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }, [keyword]);

  const selected = projects.find((p) => p.id === selectedId) || filtered[0] || projects[0];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-5xl font-black">📝 콘텐츠 제작 센터</h2>
        <p className="mt-4 text-xl text-[#6F6255]">
          이제 버튼 하나로 제목, 본문, FAQ, 쿠팡, 해시태그, 이미지 프롬프트까지 한 번에 요청합니다.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
        <aside className="rounded-[2rem] bg-white border border-[#E4D5BE] p-6">
          <p className="font-black">프로젝트 검색</p>
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="예: 수족구, SNS, 쿠팡"
            className="mt-3 w-full rounded-2xl border border-[#E4D5BE] bg-[#FFFDF8] px-4 py-3 outline-none"
          />

          <div className="mt-5 max-h-[620px] space-y-2 overflow-auto">
            {filtered.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                className={`w-full rounded-2xl p-4 text-left ${
                  selected.id === p.id ? "bg-[#DFF1E7]" : "bg-[#F7F1E8]"
                }`}
              >
                <p className="text-sm text-[#7A6B5B]">{p.category} · {p.grade}</p>
                <p className="mt-1 font-black">{p.topic}</p>
              </button>
            ))}
          </div>
        </aside>

        <section className="space-y-6">
          <div className="rounded-[2rem] bg-[#231F1A] p-8 text-white">
            <p className="text-sm text-[#D9CBB7]">{selected.category} · {selected.grade}</p>
            <h3 className="mt-3 text-4xl font-black">{selected.topic}</h3>
            <p className="mt-4 text-[#F7F1E8]">{selected.next}</p>
          </div>

          <OneClickRenewalButton project={selected} />

          <div className="grid gap-5 xl:grid-cols-2">
            <Panel title="🟢 네이버 제목">
              <p className="font-black">{selected.naverTitle}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Btn onClick={() => copy(selected.naverTitle)}>제목 복사</Btn>
                <a href="https://blog.naver.com/" target="_blank" className="rounded-2xl bg-[#DFF1E7] px-5 py-3 font-black">네이버 열기</a>
              </div>
            </Panel>

            <Panel title="🔵 Google 제목">
              <p className="font-black">{selected.googleTitle}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Btn onClick={() => copy(selected.googleTitle)}>제목 복사</Btn>
                <a href="https://www.blogger.com/" target="_blank" className="rounded-2xl bg-[#EAF1FF] px-5 py-3 font-black">Blogger 열기</a>
              </div>
            </Panel>
          </div>
        </section>
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[2rem] bg-white border border-[#E4D5BE] p-7">
      <h3 className="mb-4 text-2xl font-black">{title}</h3>
      {children}
    </div>
  );
}

function Btn({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button onClick={onClick} className="rounded-2xl bg-[#231F1A] px-5 py-3 font-black text-white">
      {children}
    </button>
  );
}
