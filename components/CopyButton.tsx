"use client";

export default function CopyButton({ text, label }: { text: string; label: string }) {
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        alert("복사 완료!");
      }}
      className="rounded-2xl bg-[#231F1A] px-5 py-3 font-black text-white"
    >
      {label}
    </button>
  );
}
