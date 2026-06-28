import { publishFlow } from "../../data/v4/operatingERP";
import { OperatingShell, SectionBox } from "./OperatingLayout";

export default function PublishCenterBoard() {
  return (
    <OperatingShell title="✅ 발행완료" subtitle="발행 완료를 누르면 CMS, 달력, 오늘 완료, 통계에 반영되는 구조입니다.">
      <SectionBox title="발행 완료 반영 흐름">
        <div className="grid gap-3 md:grid-cols-4">
          {publishFlow.map((item, index) => <div key={item} className="rounded-2xl bg-[#EFF8F2] p-4 font-black text-[#2F6B4F]">{index + 1}. {item}</div>)}
        </div>
      </SectionBox>
    </OperatingShell>
  );
}
