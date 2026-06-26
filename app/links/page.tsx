import AppShell from "../../components/AppShell";
import Header from "../../components/Header";
import { links } from "../../data/links";

export default function LinksPage() {
  return (
    <AppShell>
      <Header
        title="🔗 바로가기 센터"
        text="운영에 필요한 사이트를 한 번에 엽니다. 자동 로그인은 불가능하지만, 로그인 상태는 브라우저가 기억합니다."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {links.map((link) => (
          <a key={link.label} href={link.url} target="_blank" className="rounded-3xl bg-white border border-[#E4D5BE] p-7 text-2xl font-black hover:bg-[#DFF1E7]">
            {link.label}
          </a>
        ))}
      </div>
    </AppShell>
  );
}
