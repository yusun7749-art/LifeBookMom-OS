import { duplicateCheck, recommended, contentMap } from "../../data/v4/usableERP";
import { Box, SearchButton, Shell, WriteButton } from "./UsableLayout";

export default function IdeasBoard() {
  const sample = duplicateCheck("초등학생");
  return (
    <Shell title="주제찾기" desc="주제를 복사하지 않아도 여기서 검색하고 바로 작성합니다.">
      <Box title="빠른 검색">
        <div className="rounded-xl bg-[#FFFDF8] p-3">
          <p className="font-black">검색 예시: 초등학생</p>
          <p className="mt-1 text-xs text-[#7A6B5B]">실제 검색창 연결 전까지 버튼으로 바로 확인합니다.</p>
          <div className="mt-2 flex gap-2">
            <SearchButton query="초등학생" />
            <SearchButton query="체취" />
            <SearchButton query="사춘기" />
            <SearchButton query="SNS" />
          </div>
        </div>
      </Box>

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <Box title="작성 추천 주제">
          <div className="space-y-2">
            {recommended.map((r) => (
              <div key={r.title} className="flex items-center justify-between gap-2 rounded-xl bg-[#EFF8F2] p-3">
                <div>
                  <p className="font-black">{r.title}</p>
                  <p className="text-xs font-bold text-[#2F6B4F]">{r.reason}</p>
                </div>
                <WriteButton title={r.title} />
              </div>
            ))}
          </div>
        </Box>
        <Box title="이미 쓴 글 확인">
          <div className="space-y-2">
            {sample.slice(0,4).map((r) => (
              <div key={r.id} className="rounded-xl bg-[#FFF4EF] p-3">
                <p className="font-black">{r.title}</p>
                <p className="text-xs text-[#9F3D2E]">유사도 {r.score}% · 이미 작성됨</p>
              </div>
            ))}
          </div>
        </Box>
      </div>

      <div className="mt-4">
        <Box title="비어 있는 주제">
          <div className="grid gap-3 md:grid-cols-3">
            {contentMap.map((g) => (
              <div key={g.group} className="rounded-xl bg-[#FFFDF8] p-3">
                <p className="font-black">{g.group}</p>
                {g.todo.slice(0,5).map((t) => <div key={t} className="mt-2 flex justify-between rounded-lg bg-white p-2"><span className="text-xs font-bold">{t}</span><WriteButton title={`초등학생 ${t}`} /></div>)}
              </div>
            ))}
          </div>
        </Box>
      </div>
    </Shell>
  );
}
