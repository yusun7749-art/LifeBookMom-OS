import { PageShell, CardGrid } from "./OSLayout";

export default function WorkflowCenter() {
  const items = [{'title': '주제', 'status': '사용 가능', 'desc': '콘텐츠 제작 흐름을 관리합니다.'}, {'title': '원고', 'status': '사용 가능', 'desc': '콘텐츠 제작 흐름을 관리합니다.'}, {'title': '이미지', 'status': '사용 가능', 'desc': '콘텐츠 제작 흐름을 관리합니다.'}, {'title': '발행', 'status': '사용 가능', 'desc': '콘텐츠 제작 흐름을 관리합니다.'}];
  return (
    <PageShell title="🔄 작업순서" subtitle="콘텐츠 제작 흐름을 관리합니다.">
      <CardGrid items={items} />
    </PageShell>
  );
}
