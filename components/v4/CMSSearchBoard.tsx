import { cmsSearchTabs } from "../../data/v4/operatingERP";
import { OperatingShell, SectionBox } from "./OperatingLayout";

export default function CMSSearchBoard() {
  return (
    <OperatingShell title="🔎 콘텐츠검색" subtitle="작성된 글, 작성예정 글, 중복 글, 추천 글을 한 곳에서 찾습니다.">
      <SectionBox title="검색 기준">
        <div className="grid gap-3 md:grid-cols-7">
          {cmsSearchTabs.map((tab) => <div key={tab} className="rounded-2xl bg-[#EFF8F2] p-4 text-center font-black text-[#2F6B4F]">{tab}</div>)}
        </div>
      </SectionBox>
      <div className="mt-8">
        <SectionBox title="검색 예시: 초등학생">
          <p className="rounded-2xl bg-[#FFFDF8] p-4 font-bold">다음 단계에서 실제 CMS 데이터와 연결합니다.</p>
        </SectionBox>
      </div>
    </OperatingShell>
  );
}
