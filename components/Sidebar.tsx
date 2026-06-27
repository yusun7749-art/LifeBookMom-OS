"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
  ["/dashboard", "🏠 운영본부"],
  ["/navigator", "🧭 항해사 전략실"],
  ["/brand-system", "🌿 작성 엔진"],
  ["/projects", "📂 프로젝트 자산"],
  ["/content", "📝 콘텐츠 제작"],
  ["/publish", "✅ 발행 완료"],
  ["/ai", "🤖 Brain Memory"],
  ["/shorts", "🎬 미디어센터"],
  ["/revenue", "💰 수익센터"],
  ["/calendar", "📅 일정센터"],
  ["/links", "🔗 바로가기"],
  ["/settings", "⚙ 설정"],
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-80 shrink-0 border-r border-[#E4D5BE] bg-white p-6">
      <div className="rounded-[2rem] bg-[#231F1A] p-5 text-white">
        <p className="text-sm text-[#D9CBB7]">생활백서맘 회사 운영체제</p>
        <h1 className="mt-2 text-3xl font-black leading-tight">🌱 LifeBookMom Brain</h1>
        <p className="mt-3 text-sm text-[#F7F1E8]">선장님 전용 통합 운영본부</p>
      </div>

      <nav className="mt-6 space-y-2">
        {menus.map(([href, label]) => {
          const active = pathname === href || (pathname === "/" && href === "/dashboard");
          return (
            <Link
              key={href}
              href={href}
              className={`block w-full rounded-2xl px-4 py-3 text-left font-bold transition ${
                active ? "bg-[#DFF1E7]" : "hover:bg-[#F7F1E8]"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
