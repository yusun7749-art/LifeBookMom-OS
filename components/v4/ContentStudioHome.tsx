import { naverChecklist } from "../../data/v4/lifebookmomOS";
import { PageShell } from "./OSLayout";

export default function ContentStudioHome() {
  return (
    <PageShell title="📝 글쓰기" subtitle="네이버·구글 글쓰기와 출력 검사를 관리합니다.">
      <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
        <h2 className="text-3xl font-black">네이버 글쓰기 출력 기준</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {naverChecklist.map((item) => (
            <div key={item} className="rounded-2xl bg-[#EFF8F2] p-4 font-bold text-[#2F6B4F]">{item}</div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
