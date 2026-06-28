"use client";

import { useMemo, useState } from "react";
import AppShell from "../../components/AppShell";
import { aiBootstrapMeta, bootstrapLoadOrder, buildBootstrapPrompt } from "../../data/aiBootstrap";

export default function AIBootstrapPage() {
  const [copied, setCopied] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const prompt = useMemo(() => buildBootstrapPrompt(), []);

  const copyBootstrap = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setLoaded(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openRina = async () => {
    await navigator.clipboard.writeText(prompt);
    setLoaded(true);
    window.open("https://chatgpt.com/", "_blank");
  };

  return (
    <AppShell>
      <main className="space-y-8">
        <section className="rounded-[2rem] bg-[#231F1A] p-8 text-white">
          <p className="text-sm font-bold text-[#D9CBB7]">{aiBootstrapMeta.project}</p>
          <h1 className="mt-3 text-5xl font-black">🤖 AI Bootstrap Engine</h1>
          <p className="mt-4 text-xl font-bold text-[#F7F1E8]">
            리나를 호출하기 전 헌법, 브랜드, 리니, 상품, 단축키 규칙을 먼저 준비합니다.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          <InfoCard title="Version" value={aiBootstrapMeta.version} />
          <InfoCard title="Status" value={loaded ? "READY" : "WAITING"} />
          <InfoCard title="Mode" value="운영본부 경유 호출" />
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">🚦 Bootstrap Load Order</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {bootstrapLoadOrder.map((item, index) => (
              <div key={item} className="rounded-2xl bg-[#EFF8F2] p-4 font-black text-[#2F6B4F]">
                ✅ {index + 1}. {item}
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <button
            onClick={copyBootstrap}
            className="rounded-2xl bg-[#231F1A] p-5 text-xl font-black text-white"
          >
            📋 Bootstrap Context 복사
          </button>

          <button
            onClick={openRina}
            className="rounded-2xl bg-[#9CC7B0] p-5 text-xl font-black text-[#231F1A]"
          >
            🤖 리나 호출
          </button>

          <a
            href="/constitution-center"
            className="rounded-2xl bg-[#F7F1E8] p-5 text-center text-xl font-black"
          >
            📜 헌법 확인
          </a>
        </section>

        {copied && (
          <div className="rounded-2xl bg-[#EFF8F2] p-5 font-black text-[#2F6B4F]">
            ✅ Bootstrap Context 복사 완료. 새 GPT 창에 붙여넣고 바로 작업을 시작하세요.
          </div>
        )}

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">🧠 생성될 Bootstrap Context</h2>
          <pre className="mt-5 max-h-[560px] overflow-y-auto whitespace-pre-wrap rounded-2xl bg-[#FFFDF8] p-5 text-sm leading-7">
            {prompt}
          </pre>
        </section>
      </main>
    </AppShell>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-[2rem] border border-[#E4D5BE] bg-white p-6">
      <p className="text-sm font-black text-[#7A6B5B]">{title}</p>
      <p className="mt-2 break-words text-2xl font-black">{value}</p>
    </div>
  );
}
