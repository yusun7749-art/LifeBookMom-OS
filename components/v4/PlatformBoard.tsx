import { originalPublishedTitles } from "../../data/v4/cmsOriginalTitles";
import { Shell, WriteButton } from "./UsableLayout";
import { buildImagePrompt } from "../../data/v4/imageGuardV2";

export default function PlatformBoard({ platform }: { platform: "네이버" | "Google" }) {
  const mode = platform === "네이버" ? "naver" : "google";

  return (
    <Shell title={`${platform} 원본 제목 관리`} desc="실제 발행 원본 제목을 한 줄 목록으로 확인하고 바로 수정합니다.">
      <section className="rounded-2xl border border-[#E4D5BE] bg-white p-4">
        <h2 className="text-xl font-black">전체 발행내역</h2>
        <div className="mt-3 divide-y divide-[#EEE4D6]">
          {originalPublishedTitles.map((item) => (
            <div key={item.id} className="flex flex-wrap items-center justify-between gap-2 py-2">
              <p className="min-w-0 flex-1 text-sm font-bold">
                <span className="mr-3 text-[#2F6B4F]">{item.date}</span>
                {item.originalTitle}
              </p>
              <div className="flex shrink-0 flex-wrap gap-2">
                <WriteButton title={item.originalTitle} mode="naver" />
                <WriteButton title={item.originalTitle} mode="google" />
                <WriteButton title={item.originalTitle} mode="image" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </Shell>
  );
}
