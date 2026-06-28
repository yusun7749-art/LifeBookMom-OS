import { PageShell, CardGrid } from "./OSLayout";

export default function AnalyticsHub() {
  const items = [{'title': '조회수', 'status': 'READY', 'desc': '조회수, 대표글, 리뉴얼 우선순위를 확인합니다.'}, {'title': '대표글 후보', 'status': 'READY', 'desc': '조회수, 대표글, 리뉴얼 우선순위를 확인합니다.'}, {'title': '리뉴얼 대상', 'status': 'READY', 'desc': '조회수, 대표글, 리뉴얼 우선순위를 확인합니다.'}, {'title': '성과 요약', 'status': 'READY', 'desc': '조회수, 대표글, 리뉴얼 우선순위를 확인합니다.'}];
  return (
    <PageShell title="📈 Analytics Hub" subtitle="조회수, 대표글, 리뉴얼 우선순위를 확인합니다.">
      <CardGrid items={items} />
    </PageShell>
  );
}
