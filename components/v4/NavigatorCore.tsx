import { osCenters, todayMissions } from "../../data/v4/lifebookmomOS";
import { CardGrid, PageShell } from "./OSLayout";

export default function NavigatorCore() {
  const routes = osCenters.flatMap((group) => group.items.map((item) => ({ title: item.title, href: item.href, status: item.status, desc: group.group })));
  return (
    <PageShell title="🧭 오늘 할 일" subtitle="오늘 해야 할 작업과 운영본부 이동을 연결합니다.">
      <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
        <h2 className="text-3xl font-black">오늘 작업</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-4">
          {todayMissions.map((item) => (
            <div key={item.title} className="rounded-2xl bg-[#EFF8F2] p-4 font-bold text-[#2F6B4F]">{item.title}</div>
          ))}
        </div>
      </section>
      <div className="mt-8">
        <CardGrid items={routes} />
      </div>
    </PageShell>
  );
}
