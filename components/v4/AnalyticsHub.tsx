
import { analyticsHub } from '../../data/v4/analyticsHub';

export default function AnalyticsHub() {
  return (
    <main style={{ padding: 32, fontFamily: 'sans-serif' }}>
      <h1>📊 {analyticsHub.title}</h1>
      <p>{analyticsHub.project}</p>
      <p>Branch : {analyticsHub.branch}</p>
      <ul>
        {analyticsHub.panels.map((panel) => (
          <li key={panel}>{panel}</li>
        ))}
      </ul>
    </main>
  );
}
