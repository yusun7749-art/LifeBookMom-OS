import AppShell from "../../components/AppShell";

const recommendations = [
  {
    title: "초등학생 장마철 준비물 체크리스트",
    category: "생활",
    priority: "최우선",
    score: 94,
    reason: "계절성 검색 수요가 높고 네이버·구글 모두 노출 가능성이 높음",
  },
  {
    title: "초등학생 자기주도학습 루틴 만들기",
    category: "교육",
    priority: "대표글 후보",
    score: 91,
    reason: "기존 조회수 높은 콘텐츠를 자산화하기 좋음",
  },
  {
    title: "수족구 등교 기준 총정리",
    category: "건강",
    priority: "리뉴얼 필요",
    score: 88,
    reason: "부모 검색 의도가 명확하고 FAQ 확장 가능성이 높음",
  },
];

export default function NavigatorAIPage() {
  return (
    <AppShell>
      <main className="space-y-8">
        <section className="rounded-[2rem] bg-[#231F1A] p-8 text-white">
          <p className="text-sm font-bold text-[#D9CBB7]">
            LifeBookMom Navigator AI
          </p>
          <h1 className="mt-3 text-4xl font-black">🧭 Navigator AI</h1>
          <p className="mt-4 text-xl font-bold text-[#F7F1E8]">
            오늘 무엇을 먼저 해야 하는지 항해사 이리나가 추천합니다.
          </p>
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">🚢 오늘의 항해사 보고</h2>
          <p className="mt-4 rounded-2xl bg-[#FFFDF8] p-5 text-lg font-bold text-[#231F1A]">
            오늘은 계절성 콘텐츠와 대표글 리뉴얼을 우선합니다.  
            특히 장마철 준비물, 자기주도학습, 수족구 등교 기준은 빠르게 자산화할 가치가 높습니다.
          </p>
        </section>

        <section className="grid gap-6">
          {recommendations.map((item) => (
            <article
              key={item.title}
              className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-black text-[#7A6B5B]">
                    {item.category} · {item.priority}
                  </p>
                  <h2 className="mt-2 text-3xl font-black">{item.title}</h2>
                  <p className="mt-3 text-[#5C5146]">{item.reason}</p>
                </div>

                <div className="rounded-2xl bg-[#EFF8F2] px-5 py-4 text-center">
                  <p className="text-sm font-black text-[#2F6B4F]">추천 점수</p>
                  <p className="mt-1 text-3xl font-black text-[#2F6B4F]">
                    {item.score}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </AppShell>
  );
}