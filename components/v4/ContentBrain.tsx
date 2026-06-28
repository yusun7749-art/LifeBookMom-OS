import Link from "next/link";
import {
  blockedRecommendations,
  checkDuplicateTopic,
  contentMap,
  makeWriteLink,
  nextRecommendations,
  publishedContents,
} from "../../data/v4/contentBrain";
import { OperatingShell, SectionBox } from "./OperatingLayout";

function Badge({ value }: { value: string }) {
  const color = value === "발행완료" || value === "낮음" ? "#2F6B4F" : value === "중간" ? "#B35C3D" : "#7A6B5B";
  return <span className="rounded-full bg-white px-2 py-1 text-[11px] font-black" style={{ color }}>{value}</span>;
}

function WriteButton({ topic }: { topic: string }) {
  return (
    <Link href={makeWriteLink(topic)} className="rounded-xl bg-[#1F1A16] px-3 py-2 text-xs font-black text-white">
      작성하기
    </Link>
  );
}

export default function ContentBrain() {
  const sampleChecks = [
    checkDuplicateTopic("초등학생 체취 변화"),
    checkDuplicateTopic("초3 사춘기 신호"),
    checkDuplicateTopic("초등학생 속옷 교체 시기"),
  ];

  return (
    <OperatingShell title="🧠 콘텐츠 두뇌" subtitle="중복을 막고, 안 쓴 주제는 바로 작성으로 연결합니다.">
      <section className="grid gap-4 xl:grid-cols-3">
        <SectionBox title="⚠ 중복 추천 차단">
          <div className="grid gap-3">
            {sampleChecks.map((check) => (
              <div key={check.input} className="rounded-2xl bg-[#FFFDF8] p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-black">{check.input}</p>
                  {check.duplicate ? <Badge value="중복위험" /> : <WriteButton topic={check.input} />}
                </div>
                <p className="mt-1 text-xs font-bold text-[#B35C3D]">
                  {check.duplicate ? "이미 작성한 글과 비슷합니다" : "작성 가능 후보입니다"}
                </p>
                {check.results.slice(0, 1).map((item) => (
                  <p key={item.title} className="mt-2 rounded-xl bg-white p-2 text-xs text-[#7A6B5B]">
                    {item.title} · 유사도 {item.similarity}%
                  </p>
                ))}
              </div>
            ))}
          </div>
        </SectionBox>

        <SectionBox title="➡ 다음에 쓰면 좋은 글">
          <div className="grid gap-3">
            {nextRecommendations.map((item) => (
              <div key={item.title} className="rounded-2xl bg-[#EFF8F2] p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-black">{item.title}</p>
                  <WriteButton topic={item.title} />
                </div>
                <p className="mt-2 text-xs font-bold text-[#2F6B4F]">{item.reason}</p>
                <p className="mt-1 text-xs text-[#6F6255]">{item.relation}</p>
              </div>
            ))}
          </div>
        </SectionBox>

        <SectionBox title="🚫 추천 제외">
          <div className="grid gap-2">
            {blockedRecommendations.map((item) => (
              <div key={item} className="rounded-xl bg-[#FFF4EF] p-3 text-xs font-bold text-[#9F3D2E]">{item}</div>
            ))}
          </div>
        </SectionBox>
      </section>

      <div className="mt-6">
        <SectionBox title="🗺 콘텐츠 지도">
          <div className="grid gap-4 md:grid-cols-3">
            {contentMap.map((group) => (
              <div key={group.group} className="rounded-2xl bg-[#FFFDF8] p-4">
                <p className="text-xl font-black">{group.group}</p>
                <p className="mt-3 text-sm font-black text-[#2F6B4F]">작성완료</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {group.done.map((item) => <span key={item} className="rounded-full bg-white px-2 py-1 text-xs font-bold">✅ {item}</span>)}
                </div>
                <p className="mt-4 text-sm font-black text-[#B35C3D]">아직 안 쓴 주제</p>
                <div className="mt-2 grid gap-2">
                  {group.todo.map((item) => (
                    <div key={item} className="flex items-center justify-between rounded-xl bg-white p-2">
                      <span className="text-xs font-bold">□ {item}</span>
                      <WriteButton topic={`초등학생 ${item}`} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionBox>
      </div>

      <div className="mt-6">
        <SectionBox title="✅ 최근 작성한 글 5개">
          <div className="grid gap-3">
            {publishedContents.slice(0, 5).map((item) => (
              <div key={item.title} className="rounded-2xl bg-[#FFFDF8] p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-black">{item.title}</p>
                  <div className="flex gap-2">
                    <Badge value={item.naver} />
                    <Badge value={item.google} />
                    <Badge value={item.image} />
                  </div>
                </div>
                <p className="mt-1 text-xs font-bold text-[#7A6B5B]">{item.category} · {item.date} · {item.keywords.join(" · ")}</p>
              </div>
            ))}
          </div>
        </SectionBox>
      </div>
    </OperatingShell>
  );
}
