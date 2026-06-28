import Link from "next/link";
import OSCorePanel from "./OSCorePanel";
import { enterpriseVision } from "../../data/v4/osEnterprise";
import { finalGroups, finalIntegration, project024ReadyList, quickActions } from "../../data/v4/enterpriseFinal";

export default function EnterpriseDashboard() {
  return (
    <div className="min-h-screen bg-[#F5EFE6] p-8">
      <section className="overflow-hidden rounded-[2.25rem] bg-[#1F1A16] text-white shadow-xl">
        <div className="grid gap-8 p-9 xl:grid-cols-[1.25fr_0.75fr]">
          <div>
            <p className="text-sm font-bold text-[#D9CBB7]">Project023-03 · Final Integration</p>
            <h1 className="mt-4 text-6xl font-black leading-tight">{enterpriseVision.title}</h1>
            <p className="mt-4 text-2xl font-extrabold text-[#F7F1E8]">{finalIntegration.subtitle}</p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#D9CBB7]">{enterpriseVision.promise}</p>
          </div>

          <div className="rounded-[2rem] bg-[#DFF1E7] p-6 text-[#1F1A16]">
            <p className="text-sm font-black">다음 단계</p>
            <h2 className="mt-3 text-3xl font-black">{finalIntegration.next}</h2>
            <p className="mt-4 leading-7">이제 골격 생성은 종료하고 실제 기능 보완 요청을 받을 수 있는 상태로 정리합니다.</p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
        <h2 className="text-3xl font-black">⚡ 빠른 실행</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-4">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href} className="rounded-3xl bg-[#F7F1E8] p-5 transition hover:-translate-y-1 hover:shadow-md">
              <div className="text-4xl">{action.icon}</div>
              <p className="mt-3 text-xl font-black">{action.title}</p>
              <p className="mt-2 text-sm font-bold text-[#7A6B5B]">{action.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-8">
        <OSCorePanel />
      </div>

      <section className="mt-8 rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
        <h2 className="text-3xl font-black">🧱 통합된 운영 모듈</h2>
        <div className="mt-6 grid gap-6 xl:grid-cols-3">
          {finalGroups.map((group) => (
            <div key={group.title} className="rounded-3xl bg-[#FFFDF8] p-5">
              <p className="text-2xl font-black">{group.title}</p>
              <div className="mt-4 space-y-3">
                {group.modules.map((module) => (
                  <Link key={module.key} href={module.href} className="block rounded-2xl bg-white p-4 font-bold">
                    {module.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
        <h2 className="text-3xl font-black">🚀 Project024 준비 목록</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-5">
          {project024ReadyList.map((item) => (
            <div key={item} className="rounded-2xl bg-[#EFF8F2] p-4 text-sm font-bold text-[#2F6B4F]">{item}</div>
          ))}
        </div>
      </section>
    </div>
  );
}
