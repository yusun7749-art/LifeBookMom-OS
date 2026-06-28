import Link from "next/link";
import { progress, todayTasks, todayTopicCandidates } from "../../data/v4/operatingERP";
import { OperatingShell, SectionBox, SimpleCard } from "./OperatingLayout";

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.min(100, Math.round((current / total) * 100));
  return (
    <div>
      <div className="h-4 rounded-full bg-[#F1E5D2]">
        <div className="h-4 rounded-full bg-[#2F6B4F]" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-2 text-sm font-black text-[#6F6255]">{current} / {total}</p>
    </div>
  );
}

export default function EnterpriseDashboard() {
  return (
    <OperatingShell title="🚢 생활백서맘 운영본부" subtitle="오늘 무엇을 써야 하는지, 무엇이 미완료인지 먼저 보여줍니다.">
      <section className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        {todayTasks.map((task) => (
          <SimpleCard key={task.label} title={task.label} value={task.count} desc={task.status} />
        ))}
      </section>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <SectionBox title="🔥 오늘 추천 주제">
          <div className="space-y-4">
            {todayTopicCandidates.map((topic, index) => (
              <div key={topic.title} className="rounded-3xl bg-[#FFFDF8] p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xl font-black">{index + 1}. {topic.title}</p>
                  <Link href="/content-studio" className="rounded-2xl bg-[#1F1A16] px-4 py-2 text-sm font-black text-white">작성하기</Link>
                </div>
                <p className="mt-2 text-sm font-bold text-[#7A6B5B]">{topic.reason}</p>
                <div className="mt-3 grid gap-2 md:grid-cols-4">
                  <span className="rounded-xl bg-white p-2 text-sm font-bold">네이버: {topic.naver}</span>
                  <span className="rounded-xl bg-white p-2 text-sm font-bold">Google: {topic.google}</span>
                  <span className="rounded-xl bg-white p-2 text-sm font-bold">이미지: {topic.image}</span>
                  <span className="rounded-xl bg-white p-2 text-sm font-bold">발행: {topic.publish}</span>
                </div>
              </div>
            ))}
          </div>
        </SectionBox>

        <SectionBox title="🎯 승인 진행률">
          <div className="space-y-5">
            {progress.map((item) => (
              <div key={item.label}>
                <p className="mb-2 font-black">{item.label}</p>
                <ProgressBar current={item.current} total={item.total} />
              </div>
            ))}
          </div>
        </SectionBox>
      </div>

      <div className="mt-8">
        <SectionBox title="↻ 새로고침">
          <p className="rounded-2xl bg-[#EFF8F2] p-4 font-bold text-[#2F6B4F]">
            발행 완료 후 이 화면에서 전체 상태를 다시 확인합니다. 다음 단계에서 실제 저장/반영 기능을 연결합니다.
          </p>
        </SectionBox>
      </div>
    </OperatingShell>
  );
}
