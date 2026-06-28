import AppShell from "../../components/AppShell";
import {
  shortcutCenterMeta,
  shortcutPromise,
  shortcutRules,
  shortcutUsageExamples,
  titleSelectionRule,
} from "../../data/shortcutRules";

export default function ShortcutCenterPage() {
  return (
    <AppShell>
      <main className="space-y-8">
        <section className="rounded-[2rem] bg-[#231F1A] p-8 text-white">
          <p className="text-sm font-bold text-[#D9CBB7]">{shortcutCenterMeta.project}</p>
          <h1 className="mt-3 text-5xl font-black">⌨️ Shortcut Center</h1>
          <p className="mt-4 text-xl font-bold text-[#F7F1E8]">
            생활백서맘 단축키와 대표 제목 선정 규칙을 저장합니다.
          </p>
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">🏆 제목 선정 규칙 변경</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <InfoLine label="기존" value={titleSelectionRule.oldRule} />
            <InfoLine label="변경" value={titleSelectionRule.newRule} />
          </div>
          <p className="mt-5 rounded-2xl bg-[#FFFDF8] p-5 font-bold text-[#5C5146]">
            {titleSelectionRule.reason}
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {titleSelectionRule.criteria.map((item) => (
              <div key={item} className="rounded-2xl bg-[#EFF8F2] p-4 font-black text-[#2F6B4F]">
                ★ {item}
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {shortcutRules.map((rule) => (
            <article key={rule.key} className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#231F1A] text-3xl font-black text-white">
                  {rule.key}
                </div>
                <div>
                  <h2 className="text-2xl font-black">{rule.title}</h2>
                  <p className="mt-2 font-bold text-[#7A6B5B]">{rule.summary}</p>
                </div>
              </div>
              <ul className="mt-5 space-y-2 text-sm font-bold text-[#5C5146]">
                {rule.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
            <h2 className="text-3xl font-black">🚢 사용 예시</h2>
            <div className="mt-5 grid gap-3">
              {shortcutUsageExamples.map((item) => (
                <pre key={item} className="whitespace-pre-wrap rounded-2xl bg-[#FFFDF8] p-4 text-sm font-bold">
                  {item}
                </pre>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
            <h2 className="text-3xl font-black">📌 고정 약속</h2>
            <div className="mt-5 grid gap-3">
              {shortcutPromise.map((item) => (
                <div key={item} className="rounded-2xl bg-[#F7F1E8] p-4 font-bold">
                  • {item}
                </div>
              ))}
            </div>
          </section>
        </section>
      </main>
    </AppShell>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-[#FFFDF8] p-5">
      <p className="text-sm font-black text-[#7A6B5B]">{label}</p>
      <p className="mt-2 text-xl font-black">{value}</p>
    </div>
  );
}
