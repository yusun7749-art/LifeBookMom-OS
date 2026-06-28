import AppShell from "../../components/AppShell";
import {
  amendmentHistory,
  constitutionHierarchy,
  constitutionMeta,
  contentConstitution,
  imageConstitution,
  lockedRules,
  productConstitution,
  shortcutConstitution,
} from "../../data/constitutionCenter";

export default function ConstitutionCenterPage() {
  return (
    <AppShell>
      <main className="space-y-8">
        <section className="rounded-[2rem] bg-[#231F1A] p-8 text-white">
          <p className="text-sm font-bold text-[#D9CBB7]">{constitutionMeta.project}</p>
          <h1 className="mt-3 text-5xl font-black">📜 Constitution Center</h1>
          <p className="mt-4 text-xl font-bold text-[#F7F1E8]">
            생활백서맘 OS의 모든 기능이 가장 먼저 따라야 하는 최상위 헌법입니다.
          </p>
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">제0조 최상위 원칙</h2>
          <p className="mt-4 rounded-2xl bg-[#FFFDF8] p-6 text-xl font-black text-[#231F1A]">
            {constitutionMeta.articleZero}
          </p>
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">🔒 LOCKED Rules</h2>
          <div className="mt-6 grid gap-4">
            {lockedRules.map((rule) => (
              <article key={rule.id} className="rounded-2xl bg-[#FFFDF8] p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-black text-[#7A6B5B]">{rule.id}</p>
                    <h3 className="mt-1 text-2xl font-black">🔒 {rule.title}</h3>
                  </div>
                  <span className="rounded-full bg-[#231F1A] px-4 py-2 text-sm font-black text-white">
                    {rule.level}
                  </span>
                </div>
                <p className="mt-3 text-lg font-black">{rule.value}</p>
                <p className="mt-2 text-sm font-bold text-[#7A6B5B]">{rule.reason}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <ConstitutionBlock title="🎨 이미지 헌법" items={imageConstitution} />
          <ConstitutionBlock title="✍️ 콘텐츠 헌법" items={contentConstitution} />
          <ConstitutionBlock title="🛒 Product Intelligence 헌법" items={productConstitution} />
          <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
            <h2 className="text-3xl font-black">⌨️ 단축키 헌법</h2>
            <Shortcut title="1 = 네이버" items={shortcutConstitution.shortcut1} />
            <Shortcut title="2 = Google" items={shortcutConstitution.shortcut2} />
            <Shortcut title="3 = 이미지" items={shortcutConstitution.shortcut3} />
            <Shortcut title="4 = 발행 완료" items={shortcutConstitution.shortcut4} />
          </section>
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">🏛 운영본부 계층 구조</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {constitutionHierarchy.map((item, index) => (
              <div key={item} className="rounded-2xl bg-[#EFF8F2] p-4 font-black text-[#2F6B4F]">
                {index + 1}. {item}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">📝 개정 이력</h2>
          <div className="mt-5 grid gap-4">
            {amendmentHistory.map((item) => (
              <article key={item.title} className="rounded-2xl bg-[#FFFDF8] p-5">
                <p className="text-sm font-black text-[#7A6B5B]">{item.date}</p>
                <h3 className="mt-1 text-2xl font-black">{item.title}</h3>
                <ul className="mt-3 space-y-2 text-sm font-bold text-[#5C5146]">
                  {item.changes.map((change) => (
                    <li key={change}>• {change}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </main>
    </AppShell>
  );
}

function ConstitutionBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
      <h2 className="text-3xl font-black">{title}</h2>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <div key={item} className="rounded-2xl bg-[#F7F1E8] p-4 font-bold">
            • {item}
          </div>
        ))}
      </div>
    </section>
  );
}

function Shortcut({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-5 rounded-2xl bg-[#FFFDF8] p-5">
      <h3 className="text-xl font-black">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm font-bold text-[#5C5146]">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}
