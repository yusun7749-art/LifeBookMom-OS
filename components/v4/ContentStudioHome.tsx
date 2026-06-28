import { recommended } from "../../data/v4/usableERP";
import { Box, SeoBadge, Shell, WriteButton } from "./UsableLayout";

export default function ContentStudioHome() {
  return (
    <Shell title="글쓰기" desc="네이버와 Google을 반드시 분리해서 작성합니다.">
      <Box title="바로 작성 후보">
        <div className="space-y-2">
          {recommended.map((r) => (
            <div key={r.title} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[#EFF8F2] p-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-black">{r.title}</p>
                  <SeoBadge grade={r.seoGrade} />
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#B35C3D]">중복위험 {r.duplicateRisk}</span>
                </div>
                <p className="mt-1 text-xs text-[#2F6B4F]">{r.reason}</p>
                <p className="mt-1 text-xs text-[#6F6255]">{r.relation}</p>
              </div>
              <div className="flex gap-2">
                <WriteButton title={r.title} mode="naver" />
                <WriteButton title={r.title} mode="google" />
              </div>
            </div>
          ))}
        </div>
      </Box>

      <div className="mt-4">
        <Box title="작성 순서">
          <div className="grid gap-2 md:grid-cols-4">
            <div className="rounded-xl bg-[#FFFDF8] p-3 text-sm font-bold">1. 네이버 작성</div>
            <div className="rounded-xl bg-[#FFFDF8] p-3 text-sm font-bold">2. Google 작성</div>
            <div className="rounded-xl bg-[#FFFDF8] p-3 text-sm font-bold">3. 이미지 제작</div>
            <div className="rounded-xl bg-[#FFFDF8] p-3 text-sm font-bold">4. 발행완료</div>
          </div>
        </Box>
      </div>
    </Shell>
  );
}
