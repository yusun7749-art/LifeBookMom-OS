import { PageShell, CardGrid } from "./OSLayout";

export default function SettingsCenter() {
  const items = [{'title': '브랜드', 'status': 'READY', 'desc': '브랜드와 운영 기준을 관리합니다.'}, {'title': '리니', 'status': 'READY', 'desc': '브랜드와 운영 기준을 관리합니다.'}, {'title': '이미지 규칙', 'status': 'READY', 'desc': '브랜드와 운영 기준을 관리합니다.'}, {'title': '쿠팡 ID', 'status': 'READY', 'desc': '브랜드와 운영 기준을 관리합니다.'}];
  return (
    <PageShell title="⚙️ Settings Center" subtitle="브랜드와 운영 기준을 관리합니다.">
      <CardGrid items={items} />
    </PageShell>
  );
}
