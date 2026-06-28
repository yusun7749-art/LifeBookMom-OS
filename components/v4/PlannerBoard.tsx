import { plannerDays } from "../../data/v4/operatingERP";
import { OperatingShell, SectionBox } from "./OperatingLayout";

export default function PlannerBoard() {
  return (
    <OperatingShell title="📅 발행달력" subtitle="월간/주간 발행 계획과 완료 상태를 확인합니다.">
      <SectionBox title="6월 운영 달력">
        <div className="grid gap-4 md:grid-cols-7">
          {plannerDays.map((day) => (
            <div key={day.day} className="rounded-3xl bg-[#FFFDF8] p-5">
              <p className="text-3xl font-black">{day.day}</p>
              <p className="mt-3 font-black text-[#2F6B4F]">{day.status}</p>
              <p className="mt-2 text-sm font-bold text-[#7A6B5B]">{day.type}</p>
            </div>
          ))}
        </div>
      </SectionBox>
    </OperatingShell>
  );
}
