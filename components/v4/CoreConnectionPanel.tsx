import Link from "next/link";
import { coreConnection } from "../../data/v4/coreConnection";

export default function CoreConnectionPanel() {
  return (
    <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black">🔗 Core Connection</h2>
          <p className="mt-2 text-[#7A6B5B]">
            CMS, Brain, Navigator를 Content Studio V4 중심으로 연결합니다.
          </p>
        </div>
        <span className="rounded-full bg-[#EFF8F2] px-4 py-2 text-xs font-black text-[#2F6B4F]">
          {coreConnection.project}
        </span>
      </div>

      <div className="mt-6 space-y-6">
        {coreConnection.groups.map((group) => (
          <div key={group.title} className="rounded-3xl bg-[#F7F1E8] p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-2xl font-black">{group.title}</h3>
              <span className="rounded-full bg-white px-4 py-2 text-xs font-black text-[#2F6B4F]">
                {group.status}
              </span>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl bg-white p-4 transition hover:-translate-y-1 hover:shadow-md"
                >
                  <p className="font-black">{item.name}</p>
                  <p className="mt-2 text-sm font-bold text-[#7A6B5B]">{item.role}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-4">
        {coreConnection.rules.map((rule) => (
          <div key={rule} className="rounded-2xl bg-[#EFF8F2] p-3 text-sm font-bold text-[#2F6B4F]">
            {rule}
          </div>
        ))}
      </div>
    </section>
  );
}
