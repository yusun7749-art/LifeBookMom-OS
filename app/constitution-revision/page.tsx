import AppShell from "../../components/AppShell";
import {
  constitutionRevisionMeta,
  constitutionSections,
} from "../../data/constitutionRevisionSystem";

export default function ConstitutionRevisionPage() {
  return (
    <AppShell>
      <main className="space-y-8">
        <section className="rounded-[2rem] bg-[#231F1A] p-8 text-white">
          <p className="text-sm font-bold text-[#D9CBB7]">
            {constitutionRevisionMeta.project}
          </p>
          <h1 className="mt-3 text-5xl font-black">
            📜 Constitution Revision System
          </h1>
          <p className="mt-4 text-xl font-bold text-[#F7F1E8]">
            기존 헌법은 삭제하지 않고, 개정 이력과 현재 적용 규칙을 함께 관리합니다.
          </p>
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">운영 원칙</h2>
          <p className="mt-4 rounded-2xl bg-[#FFFDF8] p-5 text-lg font-bold">
            {constitutionRevisionMeta.principle}
          </p>
        </section>

        <section className="grid gap-6">
          {constitutionSections.map((section) => (
            <article
              key={section.id}
              className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8"
            >
              <p className="text-sm font-black text-[#7A6B5B]">{section.id}</p>
              <h2 className="mt-2 text-3xl font-black">{section.title}</h2>

              <div className="mt-6 grid gap-5 xl:grid-cols-3">
                <RuleBlock title="Original Rule" items={section.original} />
                <RevisionBlock revisions={section.revisions} />
                <RuleBlock title="Active Rule" items={section.active} active />
              </div>
            </article>
          ))}
        </section>
      </main>
    </AppShell>
  );
}

function RuleBlock({
  title,
  items,
  active = false,
}: {
  title: string;
  items: string[];
  active?: boolean;
}) {
  return (
    <section
      className={`rounded-2xl p-5 ${
        active ? "bg-[#EFF8F2]" : "bg-[#FFFDF8]"
      }`}
    >
      <h3
        className={`text-xl font-black ${
          active ? "text-[#2F6B4F]" : "text-[#231F1A]"
        }`}
      >
        {active ? "✅ " : ""}{title}
      </h3>
      <div className="mt-4 space-y-2">
        {items.map((item) => (
          <p key={item} className="text-sm font-bold text-[#5C5146]">
            • {item}
          </p>
        ))}
      </div>
    </section>
  );
}

function RevisionBlock({
  revisions,
}: {
  revisions: {
    version: string;
    date: string;
    title: string;
    changes: string[];
  }[];
}) {
  return (
    <section className="rounded-2xl bg-[#F7F1E8] p-5">
      <h3 className="text-xl font-black">Revision History</h3>
      <div className="mt-4 space-y-5">
        {revisions.map((revision) => (
          <div key={revision.version}>
            <p className="text-sm font-black text-[#7A6B5B]">
              {revision.date} · {revision.version}
            </p>
            <p className="mt-1 font-black">{revision.title}</p>
            <div className="mt-2 space-y-1">
              {revision.changes.map((change) => (
                <p key={change} className="text-sm font-bold text-[#5C5146]">
                  • {change}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
