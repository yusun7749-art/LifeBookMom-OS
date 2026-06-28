import Link from "next/link";
import { erpMenu, operatingMeta } from "../../data/v4/operatingERP";

export function OperatingShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#F5EFE6] p-8">
      <section className="rounded-[2.25rem] bg-[#1F1A16] p-9 text-white shadow-xl">
        <p className="text-sm font-bold text-[#D9CBB7]">{operatingMeta.project} · {operatingMeta.version}</p>
        <h1 className="mt-4 text-5xl font-black">{title}</h1>
        <p className="mt-4 text-xl font-bold text-[#F7F1E8]">{subtitle}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {erpMenu.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#1F1A16]">
              {item.title}
            </Link>
          ))}
        </div>
      </section>
      <div className="mt-8">{children}</div>
    </main>
  );
}

export function SimpleCard({ title, value, desc }: { title: string; value?: string | number; desc?: string }) {
  return (
    <div className="rounded-3xl border border-[#E4D5BE] bg-white p-6">
      <p className="text-xl font-black">{title}</p>
      {value !== undefined ? <p className="mt-3 text-3xl font-black text-[#2F6B4F]">{value}</p> : null}
      {desc ? <p className="mt-3 text-sm font-bold leading-6 text-[#6F6255]">{desc}</p> : null}
    </div>
  );
}

export function SectionBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
      <h2 className="text-3xl font-black">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}
