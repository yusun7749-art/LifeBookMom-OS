import { platformStatus } from "../../data/v4/operatingERP";
import { OperatingShell, SectionBox } from "./OperatingLayout";

export default function PlatformBoard({ platform }: { platform: "네이버" | "Google" }) {
  const board = platformStatus.find((item) => item.platform === platform);
  return (
    <OperatingShell title={`${platform} 관리`} subtitle={`${platform} 제목, 본문, 이미지, 발행 상태를 분리 관리합니다.`}>
      <SectionBox title={`${platform} 현재 상태`}>
        <div className="rounded-3xl bg-[#FFFDF8] p-6">
          <p className="text-2xl font-black">{board?.title}</p>
          <p className="mt-3 font-black text-[#2F6B4F]">{board?.current}</p>
          <div className="mt-5 grid gap-3 md:grid-cols-4">
            {board?.required.map((item) => <div key={item} className="rounded-2xl bg-white p-4 font-bold">{item}</div>)}
          </div>
        </div>
      </SectionBox>
    </OperatingShell>
  );
}
