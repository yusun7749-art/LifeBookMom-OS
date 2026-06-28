import { ideaCategories, keywordIdeas } from "../../data/v4/operatingERP";
import { OperatingShell, SectionBox } from "./OperatingLayout";

export default function IdeasBoard() {
  return (
    <OperatingShell title="💡 주제찾기" subtitle="키워드를 넣으면 카테고리와 추천 주제를 찾는 화면입니다.">
      <SectionBox title="키워드 예시: 초등학생">
        <div className="grid gap-3 md:grid-cols-5">
          {ideaCategories.map((item) => <div key={item} className="rounded-2xl bg-[#EFF8F2] p-4 font-black text-[#2F6B4F]">{item}</div>)}
        </div>
      </SectionBox>
      <div className="mt-8">
        <SectionBox title="추천 주제">
          <div className="grid gap-3 md:grid-cols-3">
            {keywordIdeas.map((item) => <div key={item} className="rounded-2xl bg-[#FFFDF8] p-4 font-bold">{item}</div>)}
          </div>
        </SectionBox>
      </div>
    </OperatingShell>
  );
}
