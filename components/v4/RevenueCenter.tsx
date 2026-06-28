import { PageShell, CardGrid } from "./OSLayout";

export default function RevenueCenter() {
  const items = [{'title': 'Coupang Partners', 'status': 'READY', 'desc': '수익원을 한 화면에서 관리합니다.'}, {'title': 'Naver AdPost', 'status': 'READY', 'desc': '수익원을 한 화면에서 관리합니다.'}, {'title': 'Google AdSense', 'status': 'READY', 'desc': '수익원을 한 화면에서 관리합니다.'}, {'title': '월간 수익', 'status': 'READY', 'desc': '수익원을 한 화면에서 관리합니다.'}];
  return (
    <PageShell title="💰 Revenue Center" subtitle="수익원을 한 화면에서 관리합니다.">
      <CardGrid items={items} />
    </PageShell>
  );
}
