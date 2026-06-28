import { published, recommended } from "../../data/v4/usableERP";
import { Box, Shell, WriteButton, SearchButton } from "./UsableLayout";

export default function PlatformBoard({ platform }: { platform: "네이버" | "Google" }) {
  const mode = platform === "네이버" ? "naver" : "google";
  return (
    <Shell title={`${platform} 관리`} desc={`${platform} 작성, 확인, 미완료 글을 바로 처리합니다.`}>
      <section className="grid gap-3 md:grid-cols-4">
        <Box title="오늘 작성">
          <div className="space-y-2">
            {recommended.slice(0,3).map((r) => (
              <div key={r.title} className="rounded-xl bg-[#EFF8F2] p-3">
                <p className="font-black">{r.title}</p>
                <div className="mt-2"><WriteButton title={r.title} mode={mode} /></div>
              </div>
            ))}
          </div>
        </Box>
        <Box title="미완료">
          <div className="space-y-2">
            {published.filter((p) => platform === "Google" ? p.google !== "발행완료" : p.naver !== "발행완료").map((p) => (
              <div key={p.id} className="rounded-xl bg-[#FFF4EF] p-3">
                <p className="font-black">{p.title}</p>
                <p className="text-xs text-[#9F3D2E]">{platform === "Google" ? p.google : p.naver}</p>
                <div className="mt-2"><WriteButton title={p.title} mode={mode} /></div>
              </div>
            ))}
          </div>
        </Box>
        <Box title="작성 기준">
          <div className="space-y-2 text-sm font-bold">
            <p>제목 1개</p><p>본문 확인</p><p>체크리스트</p><p>FAQ</p><p>발행완료 연결</p>
          </div>
        </Box>
        <Box title="최근 발행">
          <div className="space-y-2">
            {published.slice(0,4).map((p) => <div key={p.id} className="rounded-xl bg-[#FFFDF8] p-2 text-xs font-bold">{p.title}<div className="mt-1"><SearchButton query={p.title} /></div></div>)}
          </div>
        </Box>
      </section>
    </Shell>
  );
}
