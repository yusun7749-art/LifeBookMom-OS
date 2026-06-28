import Link from "next/link";
import OSCorePanel from "./OSCorePanel";
import CoreConnectionPanel from "./CoreConnectionPanel";
import { enterpriseVision } from "../../data/v4/osEnterprise";

export default function EnterpriseDashboard() {
  return (
    <div className="min-h-screen bg-[#F5EFE6] p-8">
      <section className="overflow-hidden rounded-[2.25rem] bg-[#1F1A16] text-white shadow-xl">
        <div className="grid gap-8 p-9 xl:grid-cols-[1.25fr_0.75fr]">
          <div>
            <p className="text-sm font-bold text-[#D9CBB7]">Project023 · Core Connection</p>
            <h1 className="mt-4 text-6xl font-black leading-tight">{enterpriseVision.title}</h1>
            <p className="mt-4 text-2xl font-extrabold text-[#F7F1E8]">{enterpriseVision.subtitle}</p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#D9CBB7]">
              Enterprise, CMS, Brain, Navigator를 하나의 운영 흐름으로 연결합니다.
            </p>
          </div>

          <div className="rounded-[2rem] bg-[#DFF1E7] p-6 text-[#1F1A16]">
            <p className="text-sm font-black">Project023-02</p>
            <h2 className="mt-3 text-3xl font-black">CMS · Brain · Navigator 연결</h2>
            <p className="mt-4 leading-7">
              이제 센터를 추가하지 않고 기존 센터들을 실제 운영 흐름으로 묶습니다.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/content-studio" className="rounded-2xl bg-[#1F1A16] px-5 py-4 font-black text-white">
                📝 Content Studio
              </Link>
              <Link href="/brain-runtime" className="rounded-2xl bg-white px-5 py-4 font-black text-[#1F1A16]">
                🧠 Brain
              </Link>
              <Link href="/navigator-core" className="rounded-2xl bg-white px-5 py-4 font-black text-[#1F1A16]">
                🧭 Navigator
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-8">
        <OSCorePanel />
      </div>

      <div className="mt-8">
        <CoreConnectionPanel />
      </div>
    </div>
  );
}
