import { recommended, stats, published } from "../../data/v4/usableERP";
import { Box, SeoBadge, Shell, WriteButton } from "./UsableLayout";
import Link from "next/link";

export default function EnterpriseDashboard() {
  return (
    <Shell title="생활백서맘 운영본부" desc="중복은 제외하고, 연관 주제 중 SEO S/A등급 위주로 추천합니다.">
      <section className="grid gap-3 md:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.title} href={s.link} className="rounded-2xl bg-[#FFFDF8] p-4">
            <p className="font-black">{s.title}</p>
            <p className="mt-1 text-2xl font-black text-[#2F6B4F]">{s.value}</p>
          </Link>
        ))}
      </section>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Box title="오늘 바로 쓸 글">
          <div className="space-y-2">
            {recommended.map((r) => (
              <div key={r.title} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[#EFF8F2] p-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-black">{r.title}</p>
                    <SeoBadge grade={r.seoGrade} />
                    <span className="rounded-full bg-white px-2 py-1 text-xs font-black text-[#2F6B4F]">연관추천</span>
                  </div>
                  <p className="text-xs font-bold text-[#2F6B4F]">{r.reason}</p>
                  <p className="text-xs text-[#6F6255]">{r.relation}</p>
                </div>
                <div className="flex gap-2">
                  <WriteButton title={r.title} mode="naver" />
                  <WriteButton title={r.title} mode="google" />
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
