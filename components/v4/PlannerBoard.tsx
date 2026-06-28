import { calendarItems } from "../../data/v4/usableERP";
import { Box, SearchButton, Shell, WriteButton } from "./UsableLayout";

export default function PlannerBoard() {
  return (
    <Shell title="발행달력" desc="지난 발행, 오늘 상태, 앞으로 쓸 글을 한 번에 봅니다.">
      <Box title="6월 발행 내역과 예정">
        <div className="grid gap-3 md:grid-cols-4 xl:grid-cols-7">
          {calendarItems.map((c) => (
            <div key={c.date} className="rounded-xl bg-[#FFFDF8] p-3">
              <p className="text-sm font-black">{c.date}</p>
              <p className="mt-1 font-black">{c.title}</p>
              <p className="mt-1 text-xs text-[#7A6B5B]">네이버 {c.naver}</p>
              <p className="text-xs text-[#7A6B5B]">Google {c.google}</p>
              <div className="mt-2 flex gap-1">
                <SearchButton query={c.title} />
                <WriteButton title={c.title} />
              </div>
            </div>
          ))}
        </div>
      </Box>
    </Shell>
  );
}
