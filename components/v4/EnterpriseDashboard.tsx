import Link from "next/link";
import { approvalChecklist, revenueCategories, stats, trafficWinners } from "../../data/v4/usableERP";
import { Shell } from "./UsableLayout";

export default function EnterpriseDashboard() {
  return (
    <Shell title="생활백서맘 운영본부" desc="오늘은 글쓰기보다 승인·유입·수익에 도움이 되는 일을 먼저 처리합니다.">
      <section className="grid gap-3 md:grid-cols-4">
        <Link href="/approval-center" className="rounded-2xl bg-white p-4">
          <p className="font-black">현재 최우선</p>
          <p className="mt-1 text-2xl font-black text-[#D22222]">승인</p>
          <p className="mt-1 text-xs font-bold text-[#6F6255]">애드센스 + 애드포스트</p>
        </Link>
        <Link href="/ideas" className="rounded-2xl bg-white p-4">
          <p className="font-black">오늘 유입글</p>
          <p className="mt-1 text-2xl font-black text-[#2F6B4F]">1개</p>
          <p className="mt-1 text-xs font-bold text-[#6F6255]">수족구형 검색 질문</p>
        </Link>
        <Link href="/batch-board" className="rounded-2xl bg-white p-4">
          <p className="font-black">오늘작성</p>
          <p className="mt-1 text-2xl font-black text-[#1F1A16]">바로가기</p>
          <p className="mt-1 text-xs font-bold text-[#6F6255]">네이버·Google·이미지</p>
        </Link>
        <Link href="/planner" className="rounded-2xl bg-white p-4">
          <p className="font-black">발행관리</p>
          <p className="mt-1 text-2xl font-black text-[#1F1A16]">점검</p>
          <p className="mt-1 text-xs font-bold text-[#6F6255]">완료·예약·내역</p>
        </Link>
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-2">
        <div className="rounded-2xl border border-[#E4D5BE] bg-white p-4">
          <h2 className="text-xl font-black">오늘 꼭 처리할 승인 작업</h2>
          <div className="mt-3 space-y-2">
            {approvalChecklist.slice(0, 5).map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-xl bg-[#FFFDF8] p-3 text-sm font-bold">
                <span>{item.label}</span>
                <span className="rounded-full bg-[#FFE8E8] px-2 py-1 text-xs text-[#9F3D2E]">{item.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#E4D5BE] bg-white p-4">
          <h2 className="text-xl font-black">실제 유입 성공 글</h2>
          <div className="mt-3 space-y-2">
            {trafficWinners.map((item) => (
              <div key={item.title} className="rounded-xl bg-[#EFF8F2] p-3">
                <p className="font-black">{item.title}</p>
                <p className="mt-1 text-xs font-bold text-[#2F6B4F]">유입 {item.percent} · 다음 확장: {item.next}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-2xl border border-[#E4D5BE] bg-white p-4">
        <h2 className="text-xl font-black">수익 운영 원칙</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {revenueCategories.map((item) => (
            <div key={item.title} className="rounded-xl bg-[#FFFDF8] p-3">
              <p className="font-black">{item.title} <span className="text-[#2F6B4F]">{item.score}</span></p>
              <p className="mt-1 text-xs text-[#6F6255]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </Shell>
  );
}
