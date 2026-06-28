
import { dashboard } from '../../data/v4/dashboard';

export default function Dashboard() {
  return (
    <main style={{ padding: 32, fontFamily: 'sans-serif', background: '#F5EFE6', minHeight: '100vh' }}>
      <section style={{ background: '#1F1A16', color: 'white', borderRadius: 28, padding: 32 }}>
        <p style={{ fontWeight: 700 }}>{dashboard.project} · {dashboard.branch}</p>
        <h1 style={{ fontSize: 56, margin: '16px 0' }}>📊 {dashboard.title}</h1>
        <p>Enterprise, Navigator, Analytics, Revenue, Automation 상태를 한 화면에서 확인합니다.</p>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginTop: 24 }}>
        {dashboard.widgets.map((widget) => (
          <article key={widget.title} style={{ background: 'white', border: '1px solid #E4D5BE', borderRadius: 24, padding: 24 }}>
            <p style={{ color: '#7A6B5B', fontWeight: 800 }}>{widget.title}</p>
            <h2 style={{ fontSize: 28, margin: '12px 0' }}>{widget.value}</h2>
            <p style={{ color: '#6F6255' }}>{widget.detail}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
