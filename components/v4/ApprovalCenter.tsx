import Link from "next/link";
import { approvalChecklist, revenueCategories, trafficWinners } from "../../data/v4/usableERP";
import { Shell } from "./UsableLayout";

export default function ApprovalCenter() {
  return (
    <Shell title="승인센터" desc="애드센스·애드포스트 승인에 필요한 부족 요소를 먼저 처리합니다.">
      <section className="grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-4">
          <p className="font-black">애드센스 승인 준비</p>
          <p className="mt-2 text-3xl font-black text-[#2F6B4F]">진행중</p>
          <p className="mt-1 text-xs font-bold text-[#6F6255]">콘텐츠 품질·사이트 완성도·내부링크 집중</p>
        </div>
        <div className="rounded-2xl bg-white p-4">
          <p className="font-black">애드포스트 승인 준비</p>
          <p className="mt-2 text-3xl font-black text-[#B35C3D]">UV/PV 보강</p>
          <p className="mt-1 text-xs font-bold text-[#6F6255]">수족구 같은 실제 검색형 글 확대</p>
        </div>
        <div className="rounded-2xl bg-white p-4">
          <p className="font-black">오늘 목표</p>
          <p className="mt-2 text-3xl font-black text-[#1F1A16]">유입글 1개</p>
          <p className="mt-1 text-xs font-bold text-[#6F6255]">승인형 리뉴얼 1개 + 내부링크 3개</p>
        </div>
      </section>

      <section className="mt-4 rounded-2xl border border-[#E4D5BE] bg-white p-4">
        <h2 className="text-xl font-black">승인 핵심 체크리스트</h2>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {approvalChecklist.map((item) => (
            <div key={item.label} className="flex items-center justify-between rounded-xl bg-[#FFFDF8] p-3 text-sm font-bold">
              <span>{item.label}</span>
              <span className="rounded-full bg-[#FFE8E8] px-2 py-1 text-xs text-[#9F3D2E]">{item.status}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-2">
        <div className="rounded-2xl border border-[#E4D5BE] bg-white p-4">
          <h2 className="text-xl font-black">유입 성공 글 확장</h2>
          <div className="mt-3 space-y-2">
            {trafficWinners.map((item) => (
              <div key={item.title} className="rounded-xl bg-[#EFF8F2] p-3">
                <p className="font-black">{item.title}</p>
                <p className="mt-1 text-xs font-bold text-[#2F6B4F]">유입: {item.percent}</p>
                <p className="mt-1 text-xs text-[#6F6255]">다음 확장: {item.next}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#E4D5BE] bg-white p-4">
          <h2 className="text-xl font-black">글의 역할 구분</h2>
          <div className="mt-3 space-y-2">
            {revenueCategories.map((item) => (
              <div key={item.title} className="rounded-xl bg-[#FFFDF8] p-3">
                <p className="font-black">{item.title} <span className="text-[#2F6B4F]">{item.score}</span></p>
                <p className="mt-1 text-xs text-[#6F6255]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link href="/ideas" className="rounded-xl bg-[#1F1A16] px-4 py-3 text-xs font-black text-white">유입 주제 찾기</Link>
        <Link href="/batch-board" className="rounded-xl bg-[#DFF1E7] px-4 py-3 text-xs font-black text-[#1F1A16]">오늘작성으로 이동</Link>
      </div>
    </Shell>
  );
}
