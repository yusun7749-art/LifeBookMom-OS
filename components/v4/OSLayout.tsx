import Link from "next/link";
import { osMeta, osQuickActions } from "../../data/v4/lifebookmomOS";

export function PageShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#F5EFE6] p-8">
      <section className="rounded-[2.25rem] bg-[#1F1A16] p-9 text-white shadow-xl">
        <p className="text-sm font-bold text-[#D9CBB7]">{osMeta.project} · {osMeta.version}</p>
        <h1 className="mt-4 text-5xl font-black">{title}</h1>
        <p className="mt-4 text-xl font-bold text-[#F7F1E8]">{subtitle}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/enterprise" className="rounded-2xl bg-[#DFF1E7] px-5 py-3 font-black text-[#1F1A16]">🏢 Enterprise</Link>
          <Link href="/dashboard" className="rounded-2xl bg-white px-5 py-3 font-black text-[#1F1A16]">📊 Dashboard</Link>
          <Link href="/content-studio" className="rounded-2xl bg-white px-5 py-3 font-black text-[#1F1A16]">📝 Content Studio</Link>
          <Link href="/navigator-core" className="rounded-2xl bg-white px-5 py-3 font-black text-[#1F1A16]">🧭 Navigator</Link>
        </div>
      </section>
      <div className="mt-8">{children}</div>
    </main>
  );
}

export function CardGrid({ items }: { items: { title: string; value?: string; desc?: string; href?: string; status?: string }[] }) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const body = (
          <div className="rounded-3xl border border-[#E4D5BE] bg-white p-6 transition hover:-translate-y-1 hover:shadow-md">
            <p className="text-xl font-black">{item.title}</p>
            {item.value ? <p className="mt-3 text-3xl font-black text-[#2F6B4F]">{item.value}</p> : null}
            {item.status ? <p className="mt-3 text-sm font-black text-[#B35C3D]">{item.status}</p> : null}
            {item.desc ? <p className="mt-3 text-sm font-bold leading-6 text-[#6F6255]">{item.desc}</p> : null}
          </div>
        );
        return item.href ? <Link key={item.title} href={item.href}>{body}</Link> : <div key={item.title}>{body}</div>;
      })}
    </section>
  );
}

export function QuickActions() {
  return (
    <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
      <h2 className="text-3xl font-black">⚡ 빠른 실행</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-4">
        {osQuickActions.map((action) => (
          <Link key={action.href} href={action.href} className="rounded-3xl bg-[#F7F1E8] p-5 transition hover:-translate-y-1 hover:shadow-md">
            <div className="text-4xl">{action.icon}</div>
            <p className="mt-3 text-xl font-black">{action.title}</p>
            <p className="mt-2 text-sm font-bold text-[#7A6B5B]">{action.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
