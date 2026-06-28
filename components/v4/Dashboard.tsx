import { dashboardWidgets } from "../../data/v4/lifebookmomOS";
import { CardGrid, PageShell } from "./OSLayout";

export default function Dashboard() {
  return (
    <PageShell title="📊 운영현황" subtitle="운영본부 상태와 다음 작업을 한 화면에서 확인합니다.">
      <CardGrid items={dashboardWidgets.map((w) => ({ title: w.title, value: w.value, desc: w.desc }))} />
    </PageShell>
  );
}
