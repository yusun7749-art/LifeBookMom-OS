"use client";

import { useEffect, useState } from "react";
import {
  getWorkspaceStatus,
  launchRinaWorkspace,
  markWorkspaceConnected,
} from "../data/oneClickWorkspace";

export default function OneClickWorkspacePanel({
  naverPrompt,
  googlePrompt,
  imagePrompt,
  onDone,
}: {
  naverPrompt: string;
  googlePrompt: string;
  imagePrompt: string;
  onDone: () => void;
}) {
  const [connected, setConnected] = useState(false);
  const [last, setLast] = useState("");
  const [copied, setCopied] = useState("");

  useEffect(() => {
    const status = getWorkspaceStatus();
    setConnected(status.connected);
    setLast(status.last);
  }, []);

  const run = async (label: string, prompt: string) => {
    await launchRinaWorkspace(prompt);
    markWorkspaceConnected();

    const status = getWorkspaceStatus();
    setConnected(status.connected);
    setLast(status.last);
    setCopied(label);

    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black">🚀 One Click Workspace</h2>
          <p className="mt-2 font-bold text-[#7A6B5B]">
            ChatGPT 탭을 계속 만들지 않고 이리나 작업창 1개만 재사용합니다.
          </p>
        </div>

        <div
          className={`rounded-full px-5 py-3 font-black ${
            connected ? "bg-[#EFF8F2] text-[#2F6B4F]" : "bg-[#FFF0F0] text-[#8A2E2E]"
          }`}
        >
          {connected ? "🟢 작업창 연결됨" : "🔴 작업창 없음"}
        </div>
      </div>

      {last && (
        <p className="mt-3 text-sm font-bold text-[#7A6B5B]">
          마지막 연결: {last}
        </p>
      )}

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <button
          onClick={() => run("네이버 원클릭", naverPrompt)}
          className="rounded-2xl bg-[#231F1A] p-5 text-left font-black text-white"
        >
          1️⃣ 네이버 원클릭
          <p className="mt-2 text-sm text-[#D9CBB7]">복사 + 이리나 작업창</p>
        </button>

        <button
          onClick={() => run("Google 원클릭", googlePrompt)}
          className="rounded-2xl bg-[#231F1A] p-5 text-left font-black text-white"
        >
          2️⃣ Google 원클릭
          <p className="mt-2 text-sm text-[#D9CBB7]">복사 + 이리나 작업창</p>
        </button>

        <button
          onClick={() => run("이미지 생성", imagePrompt)}
          className="rounded-2xl bg-[#231F1A] p-5 text-left font-black text-white"
        >
          3️⃣ 이미지 생성
          <p className="mt-2 text-sm text-[#D9CBB7]">리니 헌법 적용</p>
        </button>

        <button
          onClick={onDone}
          className="rounded-2xl bg-[#9CC7B0] p-5 text-left font-black text-[#231F1A]"
        >
          4️⃣ 발행 완료
          <p className="mt-2 text-sm">기록 저장</p>
        </button>
      </div>

      {copied && (
        <div className="mt-5 rounded-2xl bg-[#EFF8F2] p-5 font-black text-[#2F6B4F]">
          ✅ {copied} 요청문 복사 완료. 이리나 작업창에서 Ctrl+V 후 Enter 하세요.
        </div>
      )}
    </section>
  );
}
