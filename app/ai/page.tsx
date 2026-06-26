import AppShell from "../../components/AppShell";
import Header from "../../components/Header";

const actions = ["네이버 글 리뉴얼", "Google 글 작성", "쇼츠 대본 만들기", "Pinterest 문구", "쿠팡 연결 후보", "SEO 문제점 검사"];

export default function AiPage() {
  return (
    <AppShell>
      <Header title="🤖 AI센터" text="항해사에게 요청할 작업을 버튼처럼 정리한 공간입니다." />
      <div className="grid gap-5 md:grid-cols-3">
        {actions.map((x) => (
          <div key={x} className="rounded-3xl bg-white border border-[#E4D5BE] p-7">
            <h3 className="text-2xl font-black">{x}</h3>
            <p className="mt-3 text-[#7A6B5B]">다음 단계에서 자동 프롬프트 복사 기능을 연결합니다.</p>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
