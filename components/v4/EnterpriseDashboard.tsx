import Link from "next/link";
import { recommended, stats, published } from "../../data/v4/usableERP";
import { Box, Shell, SmallCard, WriteButton } from "./UsableLayout";

export default function EnterpriseDashboard() {
  return (
    <Shell title="생활백서맘 운영본부" desc="오늘 쓸 글, 미완료 작업, 중복 위험을 바로 확인합니다.">
      <section className="grid gap-3 md:grid-cols-4">
        {stats.map((s) => <SmallCard key={s.title} title={s.title} value={s.value} desc="누르면 이동" href={s.link} />)}
      </section>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Box title="오늘 바로 쓸 글">
          <div className="space-y-2">
            {recommended.map((r) => (
              <div key={r.title} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[#EFF8F2] p-3">
                <div>
                  <p className="font-black">{r.title}</p>
                  <p className="text-xs font-bold text-[#2F6B4F]">{r.reason}</p>
                </div>
                <div className="flex gap-2">
                  <WriteButton title={r.title} mode="naver" />
                  <Link href={`/content-studio?topic=${encodeURIComponent(r.title)}&mode=google`} className="rounded-xl bg-white px-3 py-2 text-xs font-black">Google</Link>
                </div>
              </div>
            ))}
          </div>
        </Box>

        <Box title="최근 발행 / 미완료">
          <div className="space-y-2">
            {published.slice(0, 5).map((p) => (
              <div key={p.id} className="rounded-xl bg-[#FFFDF8] p-3">
                <p className="font-black">{p.title}</p>
                <p className="text-xs font-bold text-[#7A6B5B]">{p.date} · 네이버 {p.naver} · Google {p.google} · 이미지 {p.image}</p>
              </div>
            ))}
          </div>
        </Box>
      </div>
    </Shell>
  );
}
