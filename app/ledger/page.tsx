import AppShell from "../../components/AppShell";

const projects = [
  {
    id: "Project001",
    title: "CEO Headquarters",
    status: "완료",
    progress: 100,
    summary: "운영본부 Dashboard 실행 및 기본 구조 확인 완료",
    completed: [
      "Dashboard 정상 표시 확인",
      "오늘 할 일, XP, 항해사 보고 표시",
      "운영본부를 LifeBookMom Enterprise의 중심 화면으로 확정",
    ],
    remaining: [],
    files: ["app/dashboard/page.tsx", "components/OperationDashboard.tsx"],
  },
  {
    id: "Project002",
    title: "Enterprise Dashboard / Operation Bridge",
    status: "진행중",
    progress: 55,
    summary: "운영본부를 회사 전체 상황을 보는 Enterprise Dashboard로 확장 중",
    completed: [
      "Enterprise Dashboard 방향 확정",
      "Company Health 설계",
      "Morning Brief / Enterprise Radar / Revenue Summary 필요성 확정",
    ],
    remaining: [
      "Company Health 실제 반영 확인",
      "Morning Brief 구현",
      "Enterprise Radar 구현",
      "Revenue Summary 구현",
    ],
    files: ["components/OperationDashboard.tsx"],
  },
  {
    id: "Project003",
    title: "Enterprise Memory & Journal",
    status: "완료",
    progress: 100,
    summary: "현재 상태와 결정의 역사를 기록하는 Memory, Journal 페이지 구축",
    completed: [
      "Memory 페이지 생성",
      "Journal 페이지 생성",
      "대화는 흘러가도 결정은 기록된다는 원칙 확정",
      "새 채팅에서도 진행상황을 확인할 수 있는 기반 마련",
    ],
    remaining: [],
    files: ["app/memory/page.tsx", "app/journal/page.tsx"],
  },
  {
    id: "Project004",
    title: "Project Ledger",
    status: "진행중",
    progress: 70,
    summary: "프로젝트별 완료/진행/대기 상태를 한 화면에서 확인하는 장부 구축",
    completed: [
      "Ledger 필요성 확정",
      "프로젝트별 상태 관리 방식 확정",
      "Resume Engine 방향 확정",
    ],
    remaining: [
      "Ledger 페이지 실행 확인",
      "운영본부 메뉴 연결",
      "Memory와 Journal에 Ledger 완료 기록 추가",
      "Git commit/push 상태 기록",
    ],
    files: ["app/ledger/page.tsx"],
  },
  {
    id: "Project005",
    title: "Navigator AI",
    status: "대기",
    progress: 0,
    summary: "오늘 추천 콘텐츠, 계절성, 조회수 예상 기능 예정",
    completed: [],
    remaining: [
      "추천 주제 데이터 구조 설계",
      "오늘의 추천 콘텐츠 화면 구현",
      "계절성/우선순위 표시",
    ],
    files: [],
  },
];

const directives = [
  "큰 회사보다 탄탄한 회사를 만든다.",
  "선장님은 코드 수정 대신 운영과 방향 결정에 집중한다.",
  "완료/진행중/대기 상태를 반드시 기록한다.",
  "새 채팅을 열어도 Memory, Journal, Ledger를 기준으로 이어간다.",
  "확인되지 않은 작업은 완료라고 말하지 않는다.",
];

export default function LedgerPage() {
  return (
    <AppShell>
      <main className="space-y-8">
        <section className="rounded-[2rem] bg-[#231F1A] p-8 text-white">
          <p className="text-sm font-bold text-[#D9CBB7]">
            LifeBookMom Enterprise Project Ledger
          </p>
          <h1 className="mt-3 text-4xl font-black">📒 Project Ledger</h1>
          <p className="mt-4 text-xl font-bold text-[#F7F1E8]">
            무엇이 끝났고, 무엇이 진행 중이며, 다음에 무엇을 해야 하는지 기록합니다.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-4">
          <LedgerStat title="전체 프로젝트" value={`${projects.length}개`} />
          <LedgerStat
            title="완료"
            value={`${projects.filter((p) => p.status === "완료").length}개`}
          />
          <LedgerStat
            title="진행중"
            value={`${projects.filter((p) => p.status === "진행중").length}개`}
          />
          <LedgerStat
            title="다음 작업"
            value="Project002"
          />
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">🚢 Resume Engine</h2>
          <p className="mt-3 text-[#5C5146]">
            새 채팅을 열면 이 내용을 기준으로 바로 이어서 진행합니다.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <InfoCard title="최근 완료" value="Project003 · Memory & Journal" />
            <InfoCard title="현재 작업" value="Project004 · Project Ledger" />
            <InfoCard title="다음 작업" value="Project002 · Enterprise Dashboard 정리" />
            <InfoCard title="주의" value="완료 여부가 확인되지 않은 작업은 완료로 기록하지 않음" />
          </div>
        </section>

        <section className="grid gap-6">
          {projects.map((project) => (
            <article
              key={project.id}
              className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-black text-[#7A6B5B]">
                    {project.id}
                  </p>
                  <h2 className="mt-2 text-3xl font-black">
                    {project.title}
                  </h2>
                  <p className="mt-3 text-[#5C5146]">
                    {project.summary}
                  </p>
                </div>

                <span
                  className={`rounded-full px-4 py-2 text-sm font-black ${
                    project.status === "완료"
                      ? "bg-[#EFF8F2] text-[#2F6B4F]"
                      : project.status === "진행중"
                      ? "bg-[#FFF7E8] text-[#8A5A13]"
                      : "bg-[#F7F1E8] text-[#5C5146]"
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <div className="mt-6">
                <div className="flex justify-between text-sm font-bold text-[#7A6B5B]">
                  <span>진행률</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="mt-2 h-4 rounded-full bg-[#F1E6D6]">
                  <div
                    className="h-4 rounded-full bg-[#9CC7B0]"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <div className="mt-6 grid gap-5 md:grid-cols-3">
                <ListBox
                  title="✅ 완료"
                  items={project.completed}
                  empty="완료 기록 없음"
                />
                <ListBox
                  title="🟡 남은 작업"
                  items={project.remaining}
                  empty="남은 작업 없음"
                />
                <ListBox
                  title="📁 관련 파일"
                  items={project.files}
                  empty="관련 파일 없음"
                />
              </div>
            </article>
          ))}
        </section>

        <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
          <h2 className="text-3xl font-black">📌 CEO Directives</h2>
          <div className="mt-5 grid gap-3">
            {directives.map((directive) => (
              <div
                key={directive}
                className="rounded-2xl bg-[#FFFDF8] p-4 font-bold text-[#5C5146]"
              >
                • {directive}
              </div>
            ))}
          </div>
        </section>
      </main>
    </AppShell>
  );
}

function LedgerStat({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-[2rem] border border-[#E4D5BE] bg-white p-6">
      <p className="text-sm font-black text-[#7A6B5B]">{title}</p>
      <p className="mt-2 text-3xl font-black">{value}</p>
    </div>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl bg-[#FFFDF8] p-5">
      <p className="text-sm font-black text-[#7A6B5B]">{title}</p>
      <p className="mt-2 text-lg font-black">{value}</p>
    </div>
  );
}

function ListBox({
  title,
  items,
  empty,
}: {
  title: string;
  items: string[];
  empty: string;
}) {
  return (
    <div className="rounded-2xl bg-[#F7F1E8] p-5">
      <h3 className="font-black">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-[#5C5146]">
        {items.length === 0 ? (
          <li>{empty}</li>
        ) : (
          items.map((item) => <li key={item}>• {item}</li>)
        )}
      </ul>
    </div>
  );
}