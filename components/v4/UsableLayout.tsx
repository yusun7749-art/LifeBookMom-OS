"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { erpMeta, menu } from "../../data/v4/usableERP";
import { irinaLink } from "../../data/v4/irinaLink";
import { setSelectedTopic } from "../../data/v4/operationStore";

const iconMap: Record<string, string> = {
  "운영본부": "🏠",
  "오늘작성": "📝",
  "주제찾기": "🔍",
  "글쓰기": "✍️",
  "발행관리": "📅",
  "데이터센터": "📊",
  "승인센터": "💰",
  "설정": "⚙️",
};

export function Shell({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <main className="min-h-screen bg-[#F5EFE6]">
      <div className="flex min-h-screen">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-[#E4D5BE] bg-white p-4 lg:block">
          <div className="rounded-2xl bg-[#1F1A16] p-4 text-white">
            <p className="text-[11px] font-bold text-[#D9CBB7]">{erpMeta.project}</p>
            <h1 className="mt-1 text-xl font-black leading-tight">생활백서맘<br />Revenue OS</h1>
            <p className="mt-2 text-xs font-bold text-[#F7F1E8]">승인 · 유입 · 수익 중심</p>
          </div>

          <nav className="mt-4 space-y-1">
            {menu.map((m) => {
              const active = pathname === m.href || (pathname === "/" && m.href === "/enterprise");
              return (
                <Link key={m.href} href={m.href} className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-black transition ${active ? "bg-[#DFF1E7] text-[#1F1A16]" : "text-[#3A332D] hover:bg-[#F7F1E8]"}`}>
                  <span>{iconMap[m.title] ?? "•"}</span>
                  <span>{m.title}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 rounded-2xl bg-[#FFFDF8] p-3">
            <p className="text-xs font-black text-[#7A6B5B]">오늘 기준</p>
            <p className="mt-1 text-sm font-black text-[#2F6B4F]">승인 먼저 · 수익 다음</p>
          </div>
        </aside>

        <section className="min-w-0 flex-1 p-4">
          <header className="rounded-2xl bg-[#1F1A16] px-5 py-4 text-white shadow">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-[#D9CBB7]">{erpMeta.version}</p>
                <h1 className="mt-1 text-2xl font-black">{title}</h1>
                <p className="mt-1 text-sm font-bold text-[#F7F1E8]">{desc}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link href="/enterprise" className="rounded-xl bg-[#DFF1E7] px-3 py-2 text-xs font-black text-[#1F1A16]">처음화면</Link>
                <a href={irinaLink.href} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-[#FFE8F1] px-3 py-2 text-xs font-black text-[#1F1A16]">이리나 연결</a>
              </div>
            </div>

            <div className="mt-3 flex gap-2 overflow-x-auto lg:hidden">
              {menu.map((m) => (
                <Link key={m.href} href={m.href} className="shrink-0 rounded-xl bg-white px-3 py-2 text-xs font-black text-[#1F1A16]">{iconMap[m.title]} {m.title}</Link>
              ))}
            </div>
          </header>

          <div className="mt-4">{children}</div>
        </section>
      </div>
    </main>
  );
}

export function Box({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="rounded-2xl border border-[#E4D5BE] bg-white p-4"><h2 className="text-xl font-black">{title}</h2><div className="mt-3">{children}</div></section>;
}

export function SmallCard({ title, value, desc, href }: { title: string; value?: string | number; desc?: string; href?: string }) {
  const inner = <div className="rounded-2xl bg-[#FFFDF8] p-4"><p className="font-black">{title}</p>{value !== undefined && <p className="mt-1 text-2xl font-black text-[#2F6B4F]">{value}</p>}{desc && <p className="mt-1 text-xs font-bold text-[#6F6255]">{desc}</p>}</div>;
  return href ? <Link href={href}>{inner}</Link> : inner;
}

export function SeoBadge({ grade }: { grade?: string }) {
  return <span className="rounded-full bg-[#DFF1E7] px-2 py-1 text-xs font-black text-[#2F6B4F]">SEO {grade ?? "S"}</span>;
}

export function WriteButton({ title, mode }: { title: string; mode: "naver" | "google" | "image" }) {
  const label = mode === "naver" ? "네이버" : mode === "google" ? "Google" : "이미지";
  return (
    <Link href={`/content-studio?topic=${encodeURIComponent(title)}&mode=${mode}`} onClick={() => setSelectedTopic(title)} className={`rounded-xl px-3 py-2 text-xs font-black ${mode === "image" ? "bg-[#FFE8F1] text-[#1F1A16]" : "bg-[#1F1A16] text-white"}`}>
      {label}
    </Link>
  );
}
