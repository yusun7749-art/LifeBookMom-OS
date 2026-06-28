import Link from "next/link";
import { koreanUILock, osCenters, osMeta, todayMissions } from "../../data/v4/lifebookmomOS";
import { PageShell, QuickActions } from "./OSLayout";

export default function EnterpriseDashboard() {
  return (
    <PageShell title={osMeta.title} subtitle={osMeta.subtitle}>
      <QuickActions />

      <section className="mt-8 rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
        <h2 className="text-3xl font-black">🔒 쉬운 용어 원칙</h2>
        <p className="mt-3 rounded-2xl bg-[#EFF8F2] p-4 font-bold text-[#2F6B4F]">
          {koreanUILock.rule}
        </p>
      </section>

      <section className="mt-8 rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
        <h2 className="text-3xl font-black">🏛 운영본부 통합 메뉴</h2>
        <div className="mt-6 grid gap-6 xl:grid-cols-4">
          {osCenters.map((group) => (
            <div key={group.group} className="rounded-3xl bg-[#FFFDF8] p-5">
              <p className="text-2xl font-black">{group.group}</p>
              <div className="mt-4 space-y-3">
                {group.items.map((item) => (
                  <Link key={item.href} href={item.href} className="block rounded-2xl bg-white p-4 font-bold">
                    {item.title}
                    <span className="ml-2 text-xs text-[#2F6B4F]">{item.status}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
        <h2 className="text-3xl font-black">🎯 오늘 우선순위</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-4">
          {todayMissions.map((item) => (
            <div key={item.title} className="rounded-2xl bg-[#EFF8F2] p-4">
              <p className="font-black">{item.title}</p>
              <p className="mt-2 text-sm font-bold text-[#2F6B4F]">{item.priority}</p>
              <p className="mt-2 text-sm text-[#6F6255]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
