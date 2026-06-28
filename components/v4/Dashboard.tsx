import { progress, todayTasks } from "../../data/v4/operatingERP";
import { OperatingShell, SectionBox, SimpleCard } from "./OperatingLayout";

export default function Dashboard() {
  return (
    <OperatingShell title="📊 운영현황" subtitle="승인 진행률, 오늘 작업, 발행 상태를 확인합니다.">
      <section className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        {todayTasks.map((task) => <SimpleCard key={task.label} title={task.label} value={task.count} desc={task.status} />)}
      </section>
      <div className="mt-8">
        <SectionBox title="승인·운영 목표">
          <div className="grid gap-4 md:grid-cols-4">
            {progress.map((item) => <SimpleCard key={item.label} title={item.label} value={`${item.current}/${item.total}`} desc="진행 중" />)}
          </div>
        </SectionBox>
      </div>
    </OperatingShell>
  );
}
