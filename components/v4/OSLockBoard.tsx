import { lifebookmomConstitution } from "../../data/v4/lifebookmomConstitution";
import { lifebookmomStyleBook } from "../../data/v4/lifebookmomStyleBook";
import { lifebookmomSeoEngine } from "../../data/v4/lifebookmomSeoEngine";
import { Shell, Box } from "./UsableLayout";

export default function OSLockBoard() {
  return (
    <Shell title="OS LOCK" desc="글쓰기 요청문에 실제로 들어가는 고정 규칙입니다.">
      <section className="grid gap-4 xl:grid-cols-2">
        <Box title="생활백서맘 헌법">
          <div className="space-y-2">
            {lifebookmomConstitution.rules.map((rule) => (
              <p key={rule} className="rounded-xl bg-[#EFF8F2] p-3 text-sm font-bold text-[#2F6B4F]">✓ {rule}</p>
            ))}
          </div>
        </Box>

        <Box title="감성 소제목 / 줄바꿈">
          <div className="space-y-2">
            <p className="rounded-xl bg-[#EFF8F2] p-3 text-sm font-bold text-[#2F6B4F]">
              {lifebookmomStyleBook.emotionalSubtopic.format}
            </p>
            {lifebookmomStyleBook.spacing.map((rule) => (
              <p key={rule} className="rounded-xl bg-[#FFFDF8] p-3 text-sm font-bold">{rule}</p>
            ))}
          </div>
        </Box>

        <Box title="이미지 / 쿠팡 출력 금지">
          <div className="space-y-2">
            {[...lifebookmomStyleBook.imageRule, ...lifebookmomStyleBook.coupangRule].map((rule) => (
              <p key={rule} className="rounded-xl bg-[#FFF4EF] p-3 text-sm font-bold text-[#9F3D2E]">✕ {rule}</p>
            ))}
          </div>
        </Box>

        <Box title="SEO 5등급">
          <div className="space-y-2">
            {lifebookmomSeoEngine.grades.map((item) => (
              <p key={item.grade} className="rounded-xl bg-[#FFFDF8] p-3 text-sm font-bold">
                {item.grade} {item.stars} · {item.rule}
              </p>
            ))}
          </div>
        </Box>
      </section>
    </Shell>
  );
}
