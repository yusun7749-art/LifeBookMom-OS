import { naverChecklist } from "../../data/v4/lifebookmomOS";
import { PageShell } from "./OSLayout";

export default function ContentStudioHome() {
  return (
    <PageShell title="📝 Content Studio V4" subtitle="네이버·Google 콘텐츠 제작과 QA를 관리합니다.">
      <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
        <h2 className="text-3xl font-black">네이버 원클릭 출력 기준</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {naverChecklist.map((item) => (
            <div key={item} className="rounded-2xl bg-[#EFF8F2] p-4 font-bold text-[#2F6B4F]">{item}</div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
