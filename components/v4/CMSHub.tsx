import Link from "next/link";
import { PageShell } from "./OSLayout";

export default function CMSHub() {
  const items = [
    { title: "네이버 원본 제목", href: "/naver-board", desc: "네이버 전체 발행내역 검색/수정" },
    { title: "Google 원본 제목", href: "/google-board", desc: "Google 전체 발행내역 검색/수정" },
    { title: "콘텐츠 검색", href: "/cms-search", desc: "전체 원본 제목 통합 검색" },
    { title: "야간 일괄작성", href: "/batch-board", desc: "발행완료/중복 처리" },
  ];

  return (
    <PageShell title="📚 콘텐츠창고" subtitle="모든 카드는 실제 화면으로 이동합니다.">
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-orange-100">
            <p className="text-xl font-black">{item.title}</p>
            <p className="mt-2 text-sm font-bold text-zinc-500">{item.desc}</p>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
