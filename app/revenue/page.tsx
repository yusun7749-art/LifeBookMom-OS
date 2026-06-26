import AppShell from "../../components/AppShell";
import Header from "../../components/Header";
import StatCard from "../../components/StatCard";
import { projects } from "../../data/projects";

export default function RevenuePage() {
  const coupangReady = projects.filter((p) => p.coupang === "예정").length;

  return (
    <AppShell>
      <Header title="💰 수익센터" text="애드포스트, 애드센스, 쿠팡 파트너스를 한곳에서 관리합니다." />
      <div className="grid gap-5 md:grid-cols-4">
        <StatCard title="네이버 AdPost" value="₩0" desc="승인 준비 중" />
        <StatCard title="Google AdSense" value="₩0" desc="운영 준비 중" />
        <StatCard title="쿠팡 후보" value={`${coupangReady}`} desc="상품 연결 가능" />
        <StatCard title="총수익" value="₩0" desc="시작 단계" />
      </div>
    </AppShell>
  );
}
