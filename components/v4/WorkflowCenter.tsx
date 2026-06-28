import { PageShell, CardGrid } from "./OSLayout";

export default function WorkflowCenter() {
  const items = [{'title': '주제', 'status': 'READY', 'desc': '콘텐츠 제작 흐름을 관리합니다.'}, {'title': '원고', 'status': 'READY', 'desc': '콘텐츠 제작 흐름을 관리합니다.'}, {'title': '이미지', 'status': 'READY', 'desc': '콘텐츠 제작 흐름을 관리합니다.'}, {'title': '발행', 'status': 'READY', 'desc': '콘텐츠 제작 흐름을 관리합니다.'}];
  return (
    <PageShell title="🔄 Workflow Center" subtitle="콘텐츠 제작 흐름을 관리합니다.">
      <CardGrid items={items} />
    </PageShell>
  );
}
