"use client";

import { buildBootstrapPrompt } from "../data/aiBootstrap";

export default function RinaBootstrapButton() {
  const openRina = async () => {
    await navigator.clipboard.writeText(buildBootstrapPrompt());
    window.open("https://chatgpt.com/", "_blank");
  };

  return (
    <button
      onClick={openRina}
      className="rounded-2xl bg-[#231F1A] px-6 py-4 font-black text-white"
    >
      🤖 리나 호출
    </button>
  );
}
