import { PageShell, CardGrid } from "./OSLayout";

export default function RevenueCenter() {
  const items = [{'title': '쿠팡 파트너스', 'status': '사용 가능', 'desc': '수익원을 한 화면에서 관리합니다.'}, {'title': '네이버 애드포스트', 'status': '사용 가능', 'desc': '수익원을 한 화면에서 관리합니다.'}, {'title': '구글 애드센스', 'status': '사용 가능', 'desc': '수익원을 한 화면에서 관리합니다.'}, {'title': '월간 수익', 'status': '사용 가능', 'desc': '수익원을 한 화면에서 관리합니다.'}];
  return (
    <PageShell title="💰 수익관리" subtitle="수익원을 한 화면에서 관리합니다.">
      <CardGrid items={items} />
    </PageShell>
  );
}
