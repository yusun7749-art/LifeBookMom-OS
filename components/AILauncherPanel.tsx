"use client";

import { useEffect, useState } from "react";
import {
  getAILauncherHistory,
  getAILauncherLast,
  LauncherLog,
  LauncherStep,
  recordPublishingDone,
  runAILauncher,
} from "../data/aiLauncher";

export default function AILauncherPanel({
  project,
  naverPrompt,
  googlePrompt,
  imagePrompt,
}: {
  project: any;
  naverPrompt: string;
  googlePrompt: string;
  imagePrompt: string;
}) {
  const [step, setStep] = useState<LauncherStep>("대기");
  const [last, setLast] = useState<LauncherLog | null>(null);
  const [history, setHistory] = useState<LauncherLog[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setLast(getAILauncherLast());
    setHistory(getAILauncherHistory());
  }, []);

  const run = async (label: string, prompt: string) => {
    setDone(false);
    await runAILauncher({
      label,
      prompt,
      projectTopic: project.topic,
      onStep: setStep,
    });
    setLast(getAILauncherLast());
    setHistory(getAILauncherHistory());
  };

  const publishDone = () => {
    recordPublishingDone(project);
    setStep("Ready");
    setDone(true);
    setTimeout(() => setDone(false), 2500);
  };

  return (
    <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black">🚀 AI Launcher</h2>
          <p className="mt-2 font-bold text-[#7A6B5B]">
            네이버와 Google은 분리되어 있고, 네이버는 Project018 동기화 헌법을 사용합니다.
          </p>
        </div>

        <div
          className={`rounded-full px-5 py-3 font-black ${
            step === "Ready"
              ? "bg-[#EFF8F2] text-[#2F6B4F]"
              : "bg-[#FFF7E8] text-[#8A5A13]"
          }`}
        >
          {step === "Ready" ? "🟢 Ready" : `🟡 ${step}`}
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-5">
        {["Bootstrap 확인", "요청문 생성", "클립보드 복사", "이리나 작업창 연결", "Ready"].map(
          (item) => (
            <div
              key={item}
              className={`rounded-2xl p-4 text-center font-black ${
                step === item || step === "Ready"
                  ? "bg-[#EFF8F2] text-[#2F6B4F]"
                  : "bg-[#F7F1E8] text-[#7A6B5B]"
              }`}
            >
              {step === item || step === "Ready" ? "✅" : "○"} {item}
            </div>
          )
        )}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <button
          onClick={() => run("네이버 원클릭", naverPrompt)}
          className="rounded-2xl bg-[#231F1A] p-5 text-left font-black text-white hover:bg-[#332D26]"
        >
          1️⃣ 네이버 원클릭
          <p className="mt-2 text-sm text-[#D9CBB7]">
            Project018 · 네이버 전용 · 복붙형 원고
          </p>
        </button>

        <button
          onClick={() => run("Google 원클릭", googlePrompt)}
          className="rounded-2xl bg-[#4F5F8F] p-5 text-left font-black text-white hover:bg-[#44517A]"
        >
          2️⃣ Google 원클릭
          <p className="mt-2 text-sm text-[#E6E9F5]">
            Google 전용 · SEO 구조 · H2/H3
          </p>
        </button>

        <button
          onClick={() => run("이미지 생성", imagePrompt)}
          className="rounded-2xl bg-[#231F1A] p-5 text-left font-black text-white hover:bg-[#332D26]"
        >
          3️⃣ 이미지 생성
          <p className="mt-2 text-sm text-[#D9CBB7]">
            리니 헌법 · 10컷 프롬프트
          </p>
        </button>

        <button
          onClick={publishDone}
          className="rounded-2xl bg-[#9CC7B0] p-5 text-left font-black text-[#231F1A]"
        >
          4️⃣ 발행 완료
          <p className="mt-2 text-sm">
            CMS · Memory · Workflow 기록
          </p>
        </button>
      </div>

      {last && (
        <div className="mt-5 rounded-2xl bg-[#FFFDF8] p-5 font-bold text-[#5C5146]">
          마지막 실행: {last.at} · {last.label} · {last.projectTopic}
        </div>
      )}

      {done && (
        <div className="mt-5 rounded-2xl bg-[#EFF8F2] p-5 font-black text-[#2F6B4F]">
          ✅ 발행 완료 이벤트가 저장되었습니다.
        </div>
      )}

      {history.length > 0 && (
        <details className="mt-5 rounded-2xl bg-[#F7F1E8] p-5">
          <summary className="cursor-pointer font-black">최근 AI Launcher 기록</summary>
          <div className="mt-4 space-y-2">
            {history.slice(0, 5).map((item, index) => (
              <div key={`${item.at}-${index}`} className="text-sm font-bold text-[#5C5146]">
                • {item.at} · {item.label} · {item.projectTopic}
              </div>
            ))}
          </div>
        </details>
      )}
    </section>
  );
}
