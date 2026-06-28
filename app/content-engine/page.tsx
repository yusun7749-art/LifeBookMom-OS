"use client";

import { useMemo, useState } from "react";
import AppShell from "../../components/AppShell";
import { projects } from "../../data/projects";

const modules = ["네이버", "Google", "FAQ", "쿠팡", "이미지", "해시태그", "쇼츠", "SEO 분석"];

export default function ContentEnginePage() {
  const [selectedModules, setSelectedModules] = useState(modules);
  const [projectIndex, setProjectIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [executed, setExecuted] = useState<string[]>([]);

  const project = projects[projectIndex];

  const prompt = useMemo(() => {
    return `생활백서맘 콘텐츠 제작을 시작해줘.

[프로젝트]
주제: ${project.topic}
카테고리: ${project.category}
네이버 제목: ${project.naverTitle}
Google 제목: ${project.googleTitle}
현재 문제점: ${project.issue}
다음 작업: ${project.next}
쿠팡 파트너스 ID: AF1467107

[선택된 작업]
${selectedModules.map((item) => `- ${item}`).join("\n")}

[반드시 작성]
1. 네이버 SEO 제목 3개
2. 네이버 본문
3. Google SEO 본문
4. FAQ 5개
5. 쿠팡 추천상품 3~5개 + 추천 이유
6. 쿠팡파트너스 고지문
7. 해시태그 30개
8. 생활백서맘 이미지 생성 프롬프트
9. SEO 평가 리포트

[작성 원칙]
- 생활백서맘 문체
- 부모가 바로 이해할 수 있게
- 정확한 정보 중심
- 과장 금지
- 복사해서 바로 사용 가능하게 작성
- 네이버와 구글 각각 목적에 맞게 구성
- 쿠팡 추천은 텍스트 영역으로만 작성
- 해시태그는 30개 한 줄로 작성
- 이미지 프롬프트는 생활백서맘 브랜드 규칙 유지

[브랜드 원칙]
- 큰 회사보다 탄탄한 회사를 만든다
- 부모에게 실제 도움이 되는 콘텐츠를 만든다
- 콘텐츠는 글이 아니라 자산으로 관리한다`;
  }, [project, selectedModules]);

  const toggle = (item: string) => {
    setSelectedModules((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    );
  };

  const mark = (step: string) => {
    setExecuted((prev) => (prev.includes(step) ? prev : [...prev, step]));
  };

  const saveRunLog = () => {
    const log = {
      at: new Date().toLocaleString("ko-KR"),
      topic: project.topic,
      modules: selectedModules,
      status: "Content Engine 실행",
    };
    localStorage.setItem("lifebookmom_last_content_run", JSON.stringify(log));
  };

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(prompt);
    mark("Prompt 생성");
    mark("Clipboard 복사");
    saveRunLog();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runAll = async () => {
    await navigator.clipboard.writeText(prompt);
    mark("Prompt 생성");
    mark("Clipboard 복사");
    mark("ChatGPT 열기");
    saveRunLog();
    setCopied(true);
    window.open("https://chatgpt.com/", "_blank");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AppShell>
      <main className="space-y-8">
        <section className="rounded-[2rem] bg-[#231F1A] p-8 text-white">
          <p className="text-sm text-[#D9CBB7]">LifeBookMom Enterprise</p>
          <h1 className="mt-3 text-5xl font-black">🚀 Content Engine V2</h1>
          <p className="mt-4 text-xl">프로젝트 선택 → 요청문 생성 → 실행 → 기록 확인까지 진행합니다.</p>
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          <div className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
            <h2 className="text-3xl font-black">프로젝트 선택</h2>
            <div className="mt-5 max-h-[520px] space-y-3 overflow-y-auto pr-2">
              {projects.map((p, index) => (
                <button
                  key={p.topic}
                  onClick={() => setProjectIndex(index)}
                  className={`w-full rounded-2xl p-4 text-left ${index === projectIndex ? "bg-[#EFF8F2]" : "bg-[#FFFDF8]"}`}
                >
                  <p className="text-sm font-bold text-[#7A6B5B]">{p.category} · {p.grade}</p>
                  <p className="mt-1 text-lg font-black">{p.topic}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="xl:col-span-2 space-y-6">
            <section className="rounded-[2rem] bg-[#231F1A] p-8 text-white">
              <p className="text-sm text-[#D9CBB7]">{project.category} · {project.grade}</p>
              <h2 className="mt-2 text-4xl font-black">{project.topic}</h2>
              <p className="mt-3 text-[#F7F1E8]">{project.next}</p>
            </section>

            <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
              <h2 className="text-3xl font-black">작업 모듈 선택</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-4">
                {modules.map((item) => (
                  <button
                    key={item}
                    onClick={() => toggle(item)}
                    className={`rounded-2xl border p-5 text-left text-xl font-bold ${selectedModules.includes(item) ? "border-[#9CC7B0] bg-[#EFF8F2]" : "border-[#E4D5BE] bg-[#FFFDF8]"}`}
                  >
                    {selectedModules.includes(item) ? "✅" : "□"} {item}
                  </button>
                ))}
              </div>
            </section>
          </div>
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">생성될 요청문</h2>
          <pre className="mt-5 max-h-[420px] overflow-y-auto whitespace-pre-wrap rounded-2xl bg-[#FFFDF8] p-5 text-sm leading-7">
            {prompt}
          </pre>
          {copied && <div className="mt-5 rounded-xl bg-[#EFF8F2] p-5 font-bold text-[#2F6B4F]">✅ 요청문 복사 완료</div>}
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">🚀 실행센터</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-5">
            <button onClick={copyPrompt} className="rounded-2xl bg-[#231F1A] p-5 font-black text-white">📋 복사</button>
            <button onClick={runAll} className="rounded-2xl bg-[#9CC7B0] p-5 font-black text-[#231F1A]">🚀 전체 실행</button>
            <a href="/ledger" className="rounded-2xl bg-[#F7F1E8] p-5 text-center font-black">📒 Ledger</a>
            <a href="/memory" className="rounded-2xl bg-[#F7F1E8] p-5 text-center font-black">🧠 Memory</a>
            <a href="/journal" className="rounded-2xl bg-[#F7F1E8] p-5 text-center font-black">📖 Journal</a>
          </div>
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">📍 실행 상태</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-4">
            {["Prompt 생성", "Clipboard 복사", "ChatGPT 열기", "실행기록 저장"].map((step) => {
              const done = executed.includes(step) || (step === "실행기록 저장" && executed.length > 0);
              return (
                <div key={step} className={`rounded-2xl p-4 font-black ${done ? "bg-[#EFF8F2] text-[#2F6B4F]" : "bg-[#F7F1E8] text-[#7A6B5B]"}`}>
                  {done ? "✅" : "○"} {step}
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </AppShell>
  );
}
