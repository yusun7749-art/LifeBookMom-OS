import AppShell from "../../components/AppShell";

const journalEntries = [
  {
    date: "2026-06-27",
    title: "Enterprise Memory Core 구축",
    type: "시스템",
    reason:
      "채팅이 길어지거나 새 창으로 이동할 때 진행상황이 사라지는 문제를 막기 위해 현재 상태를 프로그램 안에 기록하기로 했다.",
    decisions: [
      "대화는 흘러가도, 결정은 기록된다.",
      "Memory는 현재 상태를 기록한다.",
      "Journal은 결정의 역사를 기록한다.",
      "완료/진행중/대기 상태를 구분해서 남긴다.",
    ],
    result:
      "http://localhost:3000/memory 페이지에서 현재 상태를 확인할 수 있게 되었다.",
  },
  {
    date: "2026-06-27",
    title: "개발 방식 변경",
    type: "운영 규칙",
    reason:
      "선장님이 코드 직접 수정에 부담을 느끼고, 실수로 파일이 틀어질까 불안해했기 때문에 개발 방식 자체를 바꾸기로 했다.",
    decisions: [
      "선장님은 코드 수정 대신 운영과 방향 결정에 집중한다.",
      "항해사 이리나는 코드와 구조를 책임진다.",
      "가능한 한 덮어쓰기/설치 방식으로 진행한다.",
      "완료했다고 말할 때는 실제 반영 여부를 구분해서 보고한다.",
    ],
    result:
      "앞으로 기능은 Memory와 Journal에 함께 기록하며 진행한다.",
  },
  {
    date: "2026-06-27",
    title: "콘텐츠 제작 오류 수정",
    type: "오류 수정",
    reason:
      "콘텐츠 제작 페이지에서 brandImageRules is not defined 오류가 발생해 화면이 멈췄다.",
    decisions: [
      "OneClickRenewalButton.tsx에서 brandImageRules 변수를 선언한다.",
      "lifebookmomBrandRules를 JSON 문자열로 변환해 이미지 프롬프트에 넣는다.",
      "같은 오류가 다시 나오면 해당 파일부터 확인한다.",
    ],
    result:
      "콘텐츠 제작 센터가 정상 표시되는 것을 확인했다.",
  },
  {
    date: "2026-06-27",
    title: "회사 철학 확정",
    type: "CEO Directive",
    reason:
      "선장님이 큰 회사보다 뿌리가 깊고 탄탄한 회사를 만들자고 말했다.",
    decisions: [
      "큰 회사보다 탄탄한 회사를 만든다.",
      "생활백서맘은 신뢰를 기반으로 성장한다.",
      "기능보다 지속 가능한 구조를 우선한다.",
      "부모에게 실제 도움이 되는 콘텐츠를 만든다.",
    ],
    result:
      "LifeBookMom Enterprise의 핵심 철학으로 기록한다.",
  },
];

export default function JournalPage() {
  return (
    <AppShell>
      <main className="space-y-8">
        <section className="rounded-[2rem] bg-[#231F1A] p-8 text-white">
          <p className="text-sm font-bold text-[#D9CBB7]">
            LifeBookMom Enterprise Journal
          </p>
          <h1 className="mt-3 text-4xl font-black">📖 Enterprise Journal</h1>
          <p className="mt-4 text-xl font-bold text-[#F7F1E8]">
            무엇을 했는지뿐 아니라, 왜 그렇게 결정했는지 기록합니다.
          </p>
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">🚢 오늘의 핵심 원칙</h2>
          <p className="mt-4 rounded-2xl bg-[#FFFDF8] p-5 text-xl font-black text-[#231F1A]">
            대화는 흘러가도, 결정은 기록된다.
          </p>
        </section>

        <section className="grid gap-6">
          {journalEntries.map((entry) => (
            <article
              key={entry.title}
              className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-black text-[#7A6B5B]">
                    {entry.date} · {entry.type}
                  </p>
                  <h2 className="mt-2 text-3xl font-black">{entry.title}</h2>
                </div>
                <span className="rounded-full bg-[#EFF8F2] px-4 py-2 text-sm font-black text-[#2F6B4F]">
                  기록됨
                </span>
              </div>

              <div className="mt-6 rounded-2xl bg-[#FFFDF8] p-5">
                <h3 className="font-black">왜 이 결정을 했나</h3>
                <p className="mt-2 text-[#5C5146]">{entry.reason}</p>
              </div>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <div className="rounded-2xl bg-[#F7F1E8] p-5">
                  <h3 className="font-black">결정사항</h3>
                  <ul className="mt-3 space-y-2 text-[#5C5146]">
                    {entry.decisions.map((decision) => (
                      <li key={decision}>• {decision}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl bg-[#F7F1E8] p-5">
                  <h3 className="font-black">결과</h3>
                  <p className="mt-3 text-[#5C5146]">{entry.result}</p>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </AppShell>
  );
}