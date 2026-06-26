import AppShell from "../../components/AppShell";
import Header from "../../components/Header";

export default function SettingsPage() {
  return (
    <AppShell>
      <Header title="⚙ 설정" text="브랜드 이름, 색상, 운영 원칙을 관리하는 공간입니다." />
      <div className="rounded-3xl bg-white border border-[#E4D5BE] p-8">
        <h3 className="text-3xl font-black">🌱 생활백서맘 브랜드 원칙</h3>
        <p className="mt-4 text-xl">오늘도 한 걸음. 작은 실천이 큰 브랜드를 만듭니다.</p>
      </div>
    </AppShell>
  );
}
