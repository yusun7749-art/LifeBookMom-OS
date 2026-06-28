import { PageShell, CardGrid } from "./OSLayout";

export default function CMSHub() {
  const items = [{'title': 'Naver Engine V4', 'status': 'READY', 'desc': '콘텐츠 DB와 발행 상태를 관리합니다.'}, {'title': 'Google SEO', 'status': 'READY', 'desc': '콘텐츠 DB와 발행 상태를 관리합니다.'}, {'title': '발행 대기', 'status': 'READY', 'desc': '콘텐츠 DB와 발행 상태를 관리합니다.'}, {'title': '콘텐츠 아카이브', 'status': 'READY', 'desc': '콘텐츠 DB와 발행 상태를 관리합니다.'}];
  return (
    <PageShell title="📚 CMS Hub" subtitle="콘텐츠 DB와 발행 상태를 관리합니다.">
      <CardGrid items={items} />
    </PageShell>
  );
}
