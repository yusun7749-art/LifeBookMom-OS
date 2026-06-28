import Link from "next/link";
import { batchQueue, batchSummary } from "../../data/v4/nightBatchERP";
import { recommended, stats, published } from "../../data/v4/usableERP";
import { Box, SeoBadge, Shell, WriteButton } from "./UsableLayout";

export default function EnterpriseDashboard() {
  return (
    <Shell title="생활백서맘 운영본부" desc="저녁 7시부터 새벽까지 하루치 글을 한 번에 열어두고 작성합니다.">
      <section className="grid gap-3 md:grid-cols-4">
        {batchSummary.map((s) => (
          <Link key={s.label} href="/batch-board" className="rounded-2xl bg-[#FFFDF8] p-4">
            <p className="font-black">{s.label}</p>
            <p className="mt-1 text-2xl font-black text-[#2F6B4F]">{s.current} / {s.target}</p>
          </Link>
        ))}
      </section>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Box title="오늘 일괄 작성 큐">
          <div className="space-y-2">
            {batchQueue.slice(0, 10).map((r) => (
              <div key={r.title} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[#EFF8F2] p-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-black">{r.slot}. {r.title}</p>
                    <span className="rounded-full bg-white px-2 py-1 text-xs font-black text-[#2F6B4F]">SEO {r.seoGrade}</span>
                  </div>
                  <p className="text-xs text-[#6F6255]">{r.relation}</p>
                </div>
                <Link href="/batch-board" className="rounded-xl bg-[#1F1A16] px-3 py-2 text-xs font-black text-white">
                  큐 열기
                </Link>
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
