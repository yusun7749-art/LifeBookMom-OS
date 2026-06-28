import Link from "next/link";
import { dashboard } from "../../data/v4/dashboard";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#F5EFE6] p-8">
      <section className="rounded-[2.25rem] bg-[#1F1A16] p-9 text-white shadow-xl">
        <p className="text-sm font-bold text-[#D9CBB7]">{dashboard.project} · {dashboard.branch}</p>
        <h1 className="mt-4 text-6xl font-black">📊 {dashboard.title}</h1>
        <p className="mt-4 text-xl font-bold text-[#F7F1E8]">운영본부 상태를 한 화면에서 확인합니다.</p>
        <Link href="/enterprise" className="mt-6 inline-block rounded-2xl bg-[#DFF1E7] px-5 py-4 font-black text-[#1F1A16]">← Enterprise Home</Link>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {dashboard.widgets.map((widget) => (
          <article key={widget.title} className="rounded-3xl border border-[#E4D5BE] bg-white p-6">
            <p className="font-black text-[#7A6B5B]">{widget.title}</p>
            <h2 className="mt-3 text-3xl font-black">{widget.value}</h2>
            <p className="mt-2 text-sm font-bold text-[#6F6255]">{widget.detail}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
