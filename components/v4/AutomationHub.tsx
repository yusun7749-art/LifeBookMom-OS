import { PageShell, CardGrid } from "./OSLayout";

export default function AutomationHub() {
  const items = [{'title': '출력 검사', 'status': '사용 가능', 'desc': '검사, 백업, 발행 흐름을 자동화합니다.'}, {'title': '저장소 백업', 'status': '사용 가능', 'desc': '검사, 백업, 발행 흐름을 자동화합니다.'}, {'title': '발행 완료', 'status': '사용 가능', 'desc': '검사, 백업, 발행 흐름을 자동화합니다.'}, {'title': '일일 보고', 'status': '사용 가능', 'desc': '검사, 백업, 발행 흐름을 자동화합니다.'}];
  return (
    <PageShell title="🤖 자동화" subtitle="검사, 백업, 발행 흐름을 자동화합니다.">
      <CardGrid items={items} />
    </PageShell>
  );
}
