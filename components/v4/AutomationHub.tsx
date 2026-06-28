import { PageShell, CardGrid } from "./OSLayout";

export default function AutomationHub() {
  const items = [{'title': '출력 QA', 'status': 'READY', 'desc': 'QA, 백업, 발행 흐름을 자동화합니다.'}, {'title': 'GitHub 백업', 'status': 'READY', 'desc': 'QA, 백업, 발행 흐름을 자동화합니다.'}, {'title': '발행 완료', 'status': 'READY', 'desc': 'QA, 백업, 발행 흐름을 자동화합니다.'}, {'title': '일일 보고', 'status': 'READY', 'desc': 'QA, 백업, 발행 흐름을 자동화합니다.'}];
  return (
    <PageShell title="🤖 Automation Hub" subtitle="QA, 백업, 발행 흐름을 자동화합니다.">
      <CardGrid items={items} />
    </PageShell>
  );
}
