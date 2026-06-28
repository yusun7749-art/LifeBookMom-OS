type CompanyHealthProps = {
  totalProjects: number;
  naverRenewal: number;
  googleDone: number;
  shortsReady: number;
  coupangReady: number;
  sss: number;
};

export default function CompanyHealth({
  totalProjects,
  naverRenewal,
  googleDone,
  shortsReady,
  coupangReady,
  sss,
}: CompanyHealthProps) {
  const healthScore = Math.max(
    0,
    Math.min(
      100,
      Math.round(60 + sss * 3 + googleDone * 1.5 + naverRenewal * 1 - shortsReady * 0.5)
    )
  );

  const statusText = healthScore >= 85 ? "정상 항해 중" : healthScore >= 70 ? "안정 항해 중" : "점검 필요";

  return (
    <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-[#7A6B5B]">LifeBookMom Enterprise Health</p>
          <h3 className="mt-2 text-3xl font-black">🏢 회사 건강도</h3>
          <p className="mt-2 text-[#7A6B5B]">콘텐츠 자산, 리뉴얼, AI 운영 준비도를 기준으로 계산합니다.</p>
        </div>

        <div className="text-right">
          <p className="text-5xl font-black text-[#5C7F68]">{healthScore}%</p>
          <p className="mt-1 text-sm font-bold text-[#7A6B5B]">{statusText}</p>
        </div>
      </div>

      <div className="mt-6 h-5 rounded-full bg-[#F1E6D6]">
        <div className="h-5 rounded-full bg-[#9CC7B0]" style={{ width: `${healthScore}%` }} />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        <HealthItem label="전체 콘텐츠" value={`${totalProjects}개`} />
        <HealthItem label="SSS 자산" value={`${sss}개`} />
        <HealthItem label="Google 완료" value={`${googleDone}개`} />
        <HealthItem label="네이버 리뉴얼" value={`${naverRenewal}개`} />
        <HealthItem label="쇼츠 후보" value={`${shortsReady}개`} />
        <HealthItem label="쿠팡 후보" value={`${coupangReady}개`} />
      </div>
    </section>
  );
}

function HealthItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-[#FFFDF8] p-4">
      <p className="text-sm font-bold text-[#7A6B5B]">{label}</p>
      <p className="mt-2 text-2xl font-black">{value}</p>
    </div>
  );
}
