import Link from "next/link";
import { originalPublishedTitles, draftQueueTitles } from "../../data/v4/cmsOriginalTitles";
import { stats } from "../../data/v4/usableERP";
import { Shell, WriteButton } from "./UsableLayout";

export default function EnterpriseDashboard() {
  return (
    <Shell title="생활백서맘 운영본부" desc="발행완료로 체크한 원본 제목 기준으로 전체 프로그램에 반영합니다.">
      <section className="grid gap-3 md:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.title} href={s.link} className="rounded-2xl bg-[#FFFDF8] p-4">
            <p className="font-black">{s.title}</p>
            <p className="mt-1 text-2xl font-black text-[#2F6B4F]">{s.value}</p>
          </Link>
        ))}
      </section>

      <section className="mt-4 rounded-2xl border border-[#E4D5BE] bg-white p-4">
        <h2 className="text-xl font-black">최근 발행 원본 제목</h2>
        <div className="mt-3 divide-y divide-[#EEE4D6]">
          {originalPublishedTitles.slice(0, 8).map((item) => (
            <div key={item.id} className="flex flex-wrap items-center justify-between gap-2 py-2">
              <p className="min-w-0 flex-1 text-sm font-bold">
                <span className="mr-3 text-[#2F6B4F]">{item.date}</span>
                {item.originalTitle}
              </p>
              <div className="flex shrink-0 flex-wrap gap-2">
                <WriteButton title={item.originalTitle} mode="naver" />
                <WriteButton title={item.originalTitle} mode="google" />
                <WriteButton title={item.originalTitle} mode="image" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-4 rounded-2xl border border-[#E4D5BE] bg-white p-4">
        <h2 className="text-xl font-black">미발행 후보</h2>
        <div className="mt-3 divide-y divide-[#EEE4D6]">
          {draftQueueTitles.map((item) => (
            <div key={item.id} className="flex flex-wrap items-center justify-between gap-2 py-2">
              <p className="min-w-0 flex-1 text-sm font-bold">
                <span className="mr-3 text-[#B35C3D]">미발행</span>
                {item.originalTitle}
              </p>
              <div className="flex shrink-0 flex-wrap gap-2">
                <WriteButton title={item.originalTitle} mode="naver" />
                <WriteButton title={item.originalTitle} mode="google" />
                <WriteButton title={item.originalTitle} mode="image" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </Shell>
  );
}
