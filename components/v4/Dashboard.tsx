import { stats, published, recommended } from "../../data/v4/usableERP";
import { Box, Shell, SmallCard, WriteButton } from "./UsableLayout";

export default function Dashboard() {
  return (
    <Shell title="운영현황" desc="숫자만 보지 않고 누르면 해당 작업으로 이동합니다.">
      <section className="grid gap-3 md:grid-cols-4">
        {stats.map((s) => <SmallCard key={s.title} title={s.title} value={s.value} desc="누르면 이동" href={s.link} />)}
      </section>
      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <Box title="미완료 Google">
          <div className="space-y-2">
            {published.filter((p) => p.google !== "발행완료").map((p) => <div key={p.id} className="flex items-center justify-between rounded-xl bg-[#FFF4EF] p-3"><span className="font-bold">{p.title}</span><WriteButton title={p.title} mode="google" /></div>)}
          </div>
        </Box>
        <Box title="다음 작성">
          <div className="space-y-2">
            {recommended.map((r) => <div key={r.title} className="flex items-center justify-between rounded-xl bg-[#EFF8F2] p-3"><span className="font-bold">{r.title}</span><WriteButton title={r.title} /></div>)}
          </div>
        </Box>
      </div>
    </Shell>
  );
}
