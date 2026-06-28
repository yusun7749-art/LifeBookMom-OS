import Link from "next/link";
import { erpMeta, menu } from "../../data/v4/usableERP";

export function Shell({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#F5EFE6] p-4">
      <section className="rounded-2xl bg-[#1F1A16] px-5 py-4 text-white shadow">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-[#D9CBB7]">{erpMeta.project} · {erpMeta.version}</p>
            <h1 className="mt-1 text-3xl font-black">{title}</h1>
            <p className="mt-1 text-sm font-bold text-[#F7F1E8]">{desc}</p>
          </div>
          <Link href="/enterprise" className="rounded-xl bg-[#DFF1E7] px-3 py-2 text-xs font-black text-[#1F1A16]">처음 화면</Link>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {menu.map((m) => (
            <Link key={m.href} href={m.href} className="rounded-xl bg-white px-3 py-2 text-xs font-black text-[#1F1A16]">
              {m.title}
            </Link>
          ))}
        </div>
      </section>
      <div className="mt-4">{children}</div>
    </main>
  );
}

export function Box({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-[#E4D5BE] bg-white p-4">
      <h2 className="text-xl font-black">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export function SmallCard({ title, value, desc, href }: { title: string; value?: string | number; desc?: string; href?: string }) {
  const inner = (
    <div className="rounded-2xl bg-[#FFFDF8] p-4">
      <p className="font-black">{title}</p>
      {value !== undefined && <p className="mt-1 text-2xl font-black text-[#2F6B4F]">{value}</p>}
      {desc && <p className="mt-1 text-xs font-bold text-[#6F6255]">{desc}</p>}
    </div>
  );

  return href ? <Link href={href}>{inner}</Link> : inner;
}

export function WriteButton({ title, mode = "naver" }: { title: string; mode?: string }) {
  const label = mode === "google" ? "Google 작성" : "네이버 작성";
  return (
    <Link href={`/content-studio?topic=${encodeURIComponent(title)}&mode=${mode}`} className="rounded-xl bg-[#1F1A16] px-3 py-2 text-xs font-black text-white">
      {label}
    </Link>
  );
}

export function SearchButton({ query }: { query: string }) {
  return (
    <Link href={`/cms-search?q=${encodeURIComponent(query)}`} className="rounded-xl bg-white px-3 py-2 text-xs font-black text-[#1F1A16]">
      검색
    </Link>
  );
}

export function SeoBadge({ grade }: { grade: string }) {
  const bg = grade === "S" ? "#DFF1E7" : grade === "A" ? "#EFF8F2" : "#FFF4EF";
  return (
    <span className="rounded-full px-3 py-1 text-xs font-black text-[#2F6B4F]" style={{ background: bg }}>
      SEO {grade}등급
    </span>
  );
}
