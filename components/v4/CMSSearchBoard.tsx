import { published, recommended, blocked } from "../../data/v4/usableERP";
import { Box, Shell, WriteButton, SearchButton } from "./UsableLayout";

export default function CMSSearchBoard() {
  return (
    <Shell title="콘텐츠검색" desc="검색창 대신 빠른 버튼으로 작성됨, 중복, 추천을 바로 확인합니다.">
      <section className="grid gap-4 xl:grid-cols-3">
        <Box title="작성된 글">
          <div className="space-y-2">
            {published.map((p) => <div key={p.id} className="rounded-xl bg-[#FFFDF8] p-3"><p className="font-black">{p.title}</p><p className="text-xs text-[#7A6B5B]">{p.date} · {p.keywords.join(" · ")}</p><div className="mt-2"><SearchButton query={p.keywords[0]} /></div></div>)}
          </div>
        </Box>
        <Box title="중복 위험">
          <div className="space-y-2">
            {blocked.map((b) => <div key={b.title} className="rounded-xl bg-[#FFF4EF] p-3 text-sm font-bold text-[#9F3D2E]">{b.title} · {b.reason}</div>)}
          </div>
        </Box>
        <Box title="추천 글">
          <div className="space-y-2">
            {recommended.map((r) => <div key={r.title} className="flex items-center justify-between gap-2 rounded-xl bg-[#EFF8F2] p-3"><span className="font-bold">{r.title}</span><WriteButton title={r.title} /></div>)}
          </div>
        </Box>
      </section>
    </Shell>
  );
}
