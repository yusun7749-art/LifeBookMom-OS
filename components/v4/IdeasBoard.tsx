import { recommended, duplicateCheck } from "../../data/v4/usableERP";
import { Shell, WriteButton } from "./UsableLayout";

export default function IdeasBoard() {
  const sample = duplicateCheck("초등학생");

  return (
    <Shell title="주제찾기" desc="추천 주제에서 네이버 / Google / 이미지까지 바로 실행합니다.">
      <section className="rounded-2xl border border-[#E4D5BE] bg-white p-4">
        <h2 className="text-xl font-black">작성 추천 주제</h2>
        <div className="mt-3 divide-y divide-[#EEE4D6]">
          {recommended.map((item) => (
            <div key={item.title} className="flex flex-wrap items-center justify-between gap-2 py-2">
              <p className="min-w-0 flex-1 text-sm font-bold">
                <span className="mr-2 rounded-full bg-[#DFF1E7] px-2 py-1 text-xs text-[#2F6B4F]">SEO {item.seoGrade}</span>
                {item.title}
              </p>
              <div className="flex shrink-0 flex-wrap gap-2">
                <WriteButton title={item.title} mode="naver" />
                <WriteButton title={item.title} mode="google" />
                <WriteButton title={item.title} mode="image" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-4 rounded-2xl border border-[#E4D5BE] bg-white p-4">
        <h2 className="text-xl font-black">이미 쓴 글 확인</h2>
        <div className="mt-3 divide-y divide-[#EEE4D6]">
          {sample.slice(0, 6).map((item) => (
            <div key={item.id} className="py-2 text-sm font-bold text-[#9F3D2E]">
              {item.date} {item.title} · 유사도 {item.score}%
            </div>
          ))}
        </div>
      </section>
    </Shell>
  );
}
