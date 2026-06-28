import AppShell from "../../components/AppShell";
import {
  brandBible,
  imageCreationOrder,
  imagePromptMaster,
  imageStyleGuide,
  masterReferenceRule,
  riniAssetLibrary,
  riniCharacterBible,
  watermarkRule,
} from "../../data/brandCenter";

export default function BrandCenterPage() {
  return (
    <AppShell>
      <main className="space-y-8">
        <section className="rounded-[2rem] bg-[#231F1A] p-8 text-white">
          <p className="text-sm font-bold text-[#D9CBB7]">
            LifeBookMom Brand Operating Standard
          </p>
          <h1 className="mt-3 text-5xl font-black">🎨 Brand Center</h1>
          <p className="mt-4 text-xl font-bold text-[#F7F1E8]">
            생활백서맘의 이미지, 리니 캐릭터, 워터마크, 브랜드 색감 기준을 저장합니다.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          <InfoCard title="브랜드" value={brandBible.brandName} />
          <InfoCard title="공식 캐릭터" value={brandBible.characterName} />
          <InfoCard title="기준 버전" value={brandBible.riniMasterVersion} />
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">📘 Brand Bible</h2>
          <p className="mt-4 rounded-2xl bg-[#FFFDF8] p-5 text-xl font-black">
            {brandBible.principle}
          </p>
          <List items={brandBible.philosophy} />
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">👧 Character Bible: 리니</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            <InfoCard title="이름" value={riniCharacterBible.name} />
            <InfoCard title="역할" value={riniCharacterBible.role} />
            <InfoCard title="나이" value={riniCharacterBible.age} />
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <ListBox title="고정 정체성" items={riniCharacterBible.identity} />
            <ListBox title="절대 변경 금지" items={riniCharacterBible.fixed} />
            <ListBox title="상황별 변경 가능" items={riniCharacterBible.changeable} />
          </div>
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">📚 RINI Asset Library</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-4">
            <ListBox title="Hair" items={riniAssetLibrary.hair} />
            <ListBox title="Outfit" items={riniAssetLibrary.outfits} />
            <ListBox title="Expression" items={riniAssetLibrary.expressions} />
            <ListBox title="Pose" items={riniAssetLibrary.poses} />
          </div>
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">🎨 Image Style Guide</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <ListBox title="색감/톤" items={imageStyleGuide.tone} />
            <ListBox title="레이아웃" items={imageStyleGuide.layout} />
            <ListBox title="금지사항" items={imageStyleGuide.forbidden} />
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
            <h2 className="text-3xl font-black">🌿 Watermark Rule</h2>
            <div className="mt-5 space-y-3">
              <InfoLine label="공식형태" value={watermarkRule.official} />
              <InfoLine label="배경" value={watermarkRule.background} />
              <InfoLine label="위치" value={watermarkRule.position} />
              <InfoLine label="크기" value={watermarkRule.size} />
              <InfoLine label="규칙" value={watermarkRule.rule} />
            </div>
          </section>

          <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
            <h2 className="text-3xl font-black">🖼 Master Reference</h2>
            <p className="mt-4 rounded-2xl bg-[#FFFDF8] p-5 font-bold text-[#5C5146]">
              {masterReferenceRule.source}
            </p>
            <List items={masterReferenceRule.priority} />
          </section>
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">🚀 Image Creation Order</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-4">
            {imageCreationOrder.map((step, index) => (
              <div key={step} className="rounded-2xl bg-[#EFF8F2] p-4 font-black">
                {index + 1}. {step}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">🧠 Image Prompt Master</h2>
          <pre className="mt-5 whitespace-pre-wrap rounded-2xl bg-[#FFFDF8] p-5 text-sm leading-7">
            {imagePromptMaster}
          </pre>
        </section>
      </main>
    </AppShell>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-[2rem] border border-[#E4D5BE] bg-white p-6">
      <p className="text-sm font-black text-[#7A6B5B]">{title}</p>
      <p className="mt-2 text-2xl font-black">{value}</p>
    </div>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-[#FFFDF8] p-4">
      <span className="font-black text-[#7A6B5B]">{label}: </span>
      <span className="font-bold">{value}</span>
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 grid gap-3">
      {items.map((item) => (
        <li key={item} className="rounded-2xl bg-[#F7F1E8] p-4 font-bold">
          • {item}
        </li>
      ))}
    </ul>
  );
}

function ListBox({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl bg-[#FFFDF8] p-5">
      <h3 className="text-xl font-black">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm font-bold text-[#5C5146]">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}
