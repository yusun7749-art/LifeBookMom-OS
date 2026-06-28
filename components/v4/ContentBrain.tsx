import { blockedRecommendations, checkDuplicateTopic, contentMap, nextRecommendations, publishedContents } from "../../data/v4/contentBrain";
import { OperatingShell, SectionBox } from "./OperatingLayout";

function Badge({ value }: { value: string }) {
  const color = value === "발행완료" || value === "낮음" ? "#2F6B4F" : value === "중간" ? "#B35C3D" : "#7A6B5B";
  return <span className="rounded-full bg-white px-3 py-1 text-xs font-black" style={{ color }}>{value}</span>;
}

export default function ContentBrain() {
  const sampleChecks = [
    checkDuplicateTopic("초등학생 체취 변화"),
    checkDuplicateTopic("초3 사춘기 신호"),
    checkDuplicateTopic("초등학생 속옷 교체 시기"),
  ];

  return (
    <OperatingShell title="🧠 콘텐츠 두뇌" subtitle="이미 쓴 글, 비슷한 글, 다음에 써야 할 글을 자동으로 구분합니다.">
      <SectionBox title="⚠ 중복 추천 차단">
        <div className="grid gap-4 md:grid-cols-3">
          {sampleChecks.map((check) => (
            <div key={check.input} className="rounded-3xl bg-[#FFFDF8] p-5">
              <p className="text-xl font-black">{check.input}</p>
              <p className="mt-2 font-black text-[#B35C3D]">
                {check.duplicate ? "이미 작성한 글과 비슷합니다" : "작성 가능 후보입니다"}
              </p>
              <div className="mt-4 space-y-3">
                {check.results.slice(0, 3).map((item) => (
                  <div key={item.title} className="rounded-2xl bg-white p-4">
                    <p className="font-bold">{item.title}</p>
                    <p className="mt-1 text-sm text-[#7A6B5B]">유사도 {item.similarity}% · {item.date}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionBox>

      <div className="mt-8">
        <SectionBox title="✅ 이미 작성한 글">
          <div className="space-y-4">
            {publishedContents.map((item) => (
              <div key={item.title} className="rounded-3xl bg-[#FFFDF8] p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xl font-black">{item.title}</p>
                  <div className="flex gap-2">
                    <Badge value={item.naver} />
                    <Badge value={item.google} />
                    <Badge value={item.image} />
                  </div>
                </div>
                <p className="mt-2 text-sm font-bold text-[#7A6B5B]">{item.category} · {item.date}</p>
                <p className="mt-2 text-sm text-[#6F6255]">{item.summary}</p>
                <p className="mt-3 text-xs font-bold text-[#2F6B4F]">{item.keywords.join(" · ")}</p>
              </div>
            ))}
          </div>
        </SectionBox>
      </div>

      <div className="mt-8">
        <SectionBox title="🗺 콘텐츠 지도">
          <div className="grid gap-6 md:grid-cols-3">
            {contentMap.map((group) => (
              <div key={group.group} className="rounded-3xl bg-[#FFFDF8] p-5">
                <p className="text-2xl font-black">{group.group}</p>
                <p className="mt-4 font-black text-[#2F6B4F]">작성완료</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {group.done.map((item) => <span key={item} className="rounded-full bg-white px-3 py-2 text-sm font-bold">✅ {item}</span>)}
                </div>
                <p className="mt-5 font-black text-[#B35C3D]">아직 안 쓴 주제</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {group.todo.map((item) => <span key={item} className="rounded-full bg-white px-3 py-2 text-sm font-bold">□ {item}</span>)}
                </div>
              </div>
            ))}
          </div>
        </SectionBox>
      </div>

      <div className="mt-8">
        <SectionBox title="🚫 오늘 추천에서 제외할 주제">
          <div className="grid gap-3 md:grid-cols-5">
            {blockedRecommendations.map((item) => (
              <div key={item} className="rounded-2xl bg-[#FFF4EF] p-4 text-sm font-bold text-[#9F3D2E]">{item}</div>
            ))}
          </div>
        </SectionBox>
      </div>

      <div className="mt-8">
        <SectionBox title="➡ 다음에 쓰면 좋은 글">
          <div className="grid gap-4 md:grid-cols-2">
            {nextRecommendations.map((item) => (
              <div key={item.title} className="rounded-3xl bg-[#EFF8F2] p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xl font-black">{item.title}</p>
                  <Badge value={item.duplicateRisk} />
                </div>
                <p className="mt-3 text-sm font-bold text-[#2F6B4F]">{item.reason}</p>
                <p className="mt-2 text-sm text-[#6F6255]">{item.relation}</p>
              </div>
            ))}
          </div>
        </SectionBox>
      </div>
    </OperatingShell>
  );
}
