import Link from "next/link";
import { navigatorCoreMeta, navigatorPriorities, navigatorRoutes } from "../../data/v4/navigatorCore";

export default function NavigatorCore() {
  return (
    <main className="min-h-screen bg-[#F5EFE6] p-8">
      <section className="rounded-[2.25rem] bg-[#1F1A16] p-9 text-white shadow-xl">
        <p className="text-sm font-bold text-[#D9CBB7]">{navigatorCoreMeta.project} · {navigatorCoreMeta.branch}</p>
        <h1 className="mt-4 text-6xl font-black">🧭 {navigatorCoreMeta.title}</h1>
        <p className="mt-4 text-2xl font-extrabold text-[#F7F1E8]">{navigatorCoreMeta.subtitle}</p>
        <Link href="/enterprise" className="mt-6 inline-block rounded-2xl bg-[#DFF1E7] px-5 py-4 font-black text-[#1F1A16]">← Enterprise Home</Link>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3 xl:grid-cols-4">
        {navigatorRoutes.map((route) => (
          <Link key={route.href} href={route.href} className="rounded-3xl border border-[#E4D5BE] bg-white p-5 transition hover:-translate-y-1 hover:shadow-md">
            <p className="text-xl font-black">{route.name}</p>
            <p className="mt-2 text-sm font-bold text-[#2F6B4F]">{route.status}</p>
          </Link>
        ))}
      </section>

      <section className="mt-8 rounded-[2rem] bg-white p-7">
        <h2 className="text-3xl font-black">🎯 다음 우선순위</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {navigatorPriorities.map((item) => (
            <div key={item} className="rounded-2xl bg-[#EFF8F2] p-4 font-bold text-[#2F6B4F]">{item}</div>
          ))}
        </div>
      </section>
    </main>
  );
}
