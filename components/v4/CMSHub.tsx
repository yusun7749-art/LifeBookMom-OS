import { PageShell, CardGrid } from "./OSLayout";

export default function CMSHub() {
  const items = [{'title': '네이버 글', 'status': '사용 가능', 'desc': '콘텐츠 자료와 발행 상태를 관리합니다.'}, {'title': '구글 글', 'status': '사용 가능', 'desc': '콘텐츠 자료와 발행 상태를 관리합니다.'}, {'title': '발행 대기', 'status': '사용 가능', 'desc': '콘텐츠 자료와 발행 상태를 관리합니다.'}, {'title': '콘텐츠 보관함', 'status': '사용 가능', 'desc': '콘텐츠 자료와 발행 상태를 관리합니다.'}];
  return (
    <PageShell title="📚 콘텐츠창고" subtitle="콘텐츠 자료와 발행 상태를 관리합니다.">
      <CardGrid items={items} />
    </PageShell>
  );
}
