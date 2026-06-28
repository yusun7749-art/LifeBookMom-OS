import AppShell from "../../components/AppShell";

const captainLogs = [
  {
    id: "2026-06-27-foundation",
    date: "2026-06-27",
    title: "LifeBookMom Enterprise 기초공사 시작",
    category: "system",
    summary:
      "LifeBookMom OS를 생활백서맘을 운영하는 AI 회사 운영체제로 개발하기로 결정했다.",
    decisions: [
      "큰 회사보다 탄탄한 회사를 만든다.",
      "중요한 결정은 OS 안에 기록한다.",
      "선장님은 코드 수정 대신 운영에 집중한다.",
      "항해사 이리나는 업데이트팩 방식으로 개발을 책임진다.",
    ],
    nextActions: [
      "Enterprise Dashboard 안정화",
      "Content Engine 기초 구조 설계",
      "콘텐츠 자산관리 시스템 설계",
    ],
  },
];

const projectStatus = [
  {
    title: "GitHub 연결",
    status: "완료",
    detail: "origin https://github.com/yusun7749-art/LifeBookMom-OS.git 연결 확인 완료",
  },
  {
    title: "운영본부 Dashboard",
    status: "완료",
    detail: "http://localhost:3000/dashboard 정상 표시 확인",
  },
  {
    title: "콘텐츠 제작 오류",
    status: "완료",
    detail: "brandImageRules is not defined 오류 수정 후 콘텐츠 제작 페이지 정상 표시 확인",
  },
  {
    title: "Enterprise Dashboard",
    status: "진행중",
    detail: "Company Health, Morning Brief, Enterprise Radar, Revenue Summary 반영 필요",
  },
  {
    title: "Navigator AI",
    status: "대기",
    detail: "오늘 추천 콘텐츠, 계절성, 조회수 예상 기능 예정",
  },
];

export default function MemoryPage() {
  return (
    <AppShell>
      <main className="space-y-8">
        <section className="rounded-[2rem] bg-[#231F1A] p-8 text-white">
          <p className="text-sm font-bold text-[#D9CBB7]">
            LifeBookMom Enterprise Memory Core
          </p>
          <h1 className="mt-3 text-4xl font-black">🧠 Enterprise Memory</h1>
          <p className="mt-4 text-xl font-bold text-[#F7F1E8]">
            대화는 흘러가도, 결정은 기록된다.
          </p>
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">📍 현재 프로젝트 상태</h2>

          <div className="mt-6 grid gap-4">
            {projectStatus.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-[#FFFDF8] p-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl font-black">{item.title}</h3>
                  <span className="rounded-full bg-[#EFF8F2] px-4 py-2 text-sm font-black text-[#2F6B4F]">
                    {item.status}
                  </span>
                </div>
                <p className="mt-2 text-[#5C5146]">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">📒 Captain Log</h2>

          <div className="mt-6 grid gap-5">
            {captainLogs.map((log) => (
              <article
                key={log.id}
                className="rounded-2xl bg-[#F7F1E8] p-6"
              >
                <p className="text-sm font-bold text-[#7A6B5B]">
                  {log.date} · {log.category}
                </p>
                <h3 className="mt-2 text-2xl font-black">{log.title}</h3>
                <p className="mt-3 text-[#5C5146]">{log.summary}</p>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-black">결정사항</h4>
                    <ul className="mt-2 space-y-2 text-[#5C5146]">
                      {log.decisions.map((decision) => (
                        <li key={decision}>• {decision}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-black">다음 작업</h4>
                    <ul className="mt-2 space-y-2 text-[#5C5146]">
                      {log.nextActions.map((action) => (
                        <li key={action}>• {action}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </AppShell>
  );
}