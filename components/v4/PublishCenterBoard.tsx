import Link from "next/link";
import { calendarItems } from "../../data/v4/usableERP";
import { OperatingShell, SectionBox } from "./OperatingLayout";

export default function PublishCenterBoard() {
  return (
    <OperatingShell title="✅ 발행완료" subtitle="발행 내역 확인과 작성 화면으로 바로 이동합니다.">
      <SectionBox title="바로가기">
        <div className="grid gap-3 md:grid-cols-4">
          <Link href="/batch-board" className="rounded-2xl bg-[#EFF8F2] p-4 font-black text-[#2F6B4F]">일괄작성</Link>
          <Link href="/planner" className="rounded-2xl bg-[#EFF8F2] p-4 font-black text-[#2F6B4F]">발행관리</Link>
          <Link href="/cms-search" className="rounded-2xl bg-[#EFF8F2] p-4 font-black text-[#2F6B4F]">콘텐츠검색</Link>
          <Link href="/content-brain" className="rounded-2xl bg-[#EFF8F2] p-4 font-black text-[#2F6B4F]">콘텐츠두뇌</Link>
        </div>
      </SectionBox>
      <SectionBox title="최근 발행 내역">
        <div className="divide-y divide-[#EEE4D6]">
          {calendarItems.slice(0, 20).map((item) => (
            <div key={`${item.date}-${item.title}`} className="py-2 text-sm font-bold">
              <span className="mr-3 text-[#2F6B4F]">{item.date}</span>{item.title}
            </div>
          ))}
        </div>
      </SectionBox>
    </OperatingShell>
  );
}
