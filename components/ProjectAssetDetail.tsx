"use client";

import type { Project } from "../data/projects";
import OneClickRenewalButton from "./OneClickRenewalButton";

function copy(text: string) {
  navigator.clipboard.writeText(text);
  alert("복사 완료!");
}

export default function ProjectAssetDetail({ project }: { project: Project }) {
  return (
    <div>
      <section className="rounded-[2rem] bg-[#231F1A] p-8 text-white">
        <p className="text-sm text-[#D9CBB7]">{project.category} · {project.grade} 자산</p>
        <h2 className="mt-3 text-5xl font-black">{project.topic}</h2>
        <p className="mt-4 text-xl text-[#F7F1E8]">
          이 주제의 네이버, Google, 쇼츠, 쿠팡, FAQ, SEO 작업을 한 화면에서 관리합니다.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <Status title="네이버" value={project.naver} />
          <Status title="Google" value={project.google} />
          <Status title="쇼츠" value={project.shorts} />
          <Status title="쿠팡" value={project.coupang} />
        </div>
      </section>

      <section className="mt-8">
        <OneClickRenewalButton project={project} />
      </section>

      <section className="mt-8 grid gap-5 xl:grid-cols-2">
        <Panel title="🟢 네이버 글">
          <p className="text-xl font-black">{project.naverTitle}</p>
          <p className="mt-3 text-[#7A6B5B]">조회수 {project.views} · 날짜 {project.date}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Btn onClick={() => copy(project.naverTitle)}>제목 복사</Btn>
            <a href="https://blog.naver.com/" target="_blank" className="rounded-2xl bg-[#DFF1E7] px-5 py-3 font-black">네이버 열기</a>
          </div>
        </Panel>

        <Panel title="🔵 Google 글">
          <p className="text-xl font-black">{project.googleTitle}</p>
          <p className="mt-3 text-[#7A6B5B]">상태: {project.google}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Btn onClick={() => copy(project.googleTitle)}>제목 복사</Btn>
            <a href="https://www.blogger.com/" target="_blank" className="rounded-2xl bg-[#EAF1FF] px-5 py-3 font-black">Blogger 열기</a>
          </div>
        </Panel>

        <Panel title="⚠️ 문제점">
          <p className="text-xl text-[#B35C3D]">{project.issue}</p>
          <p className="mt-4 font-black">다음 작업: {project.next}</p>
        </Panel>

        <Panel title="🛒 쿠팡 파트너스">
          <p>파트너스 ID: <span className="font-black">AF1467107</span></p>
          <p className="mt-3">이미지 안 버튼은 실제 링크가 되지 않으므로, 블로그 본문에 텍스트 링크로 넣어야 합니다.</p>
          <a href="https://partners.coupang.com/#affiliate/ws" target="_blank" className="mt-5 inline-block rounded-2xl bg-[#FFF3D6] px-5 py-3 font-black">쿠팡 파트너스 열기</a>
        </Panel>
      </section>
    </div>
  );
}

function Status({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-3xl bg-[#332D26] p-5">
      <p className="text-sm text-[#D9CBB7]">{title}</p>
      <p className="mt-2 text-3xl font-black">{value}</p>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[2rem] bg-white border border-[#E4D5BE] p-7">
      <h3 className="mb-4 text-2xl font-black">{title}</h3>
      {children}
    </div>
  );
}

function Btn({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button onClick={onClick} className="rounded-2xl bg-[#231F1A] px-5 py-3 font-black text-white">
      {children}
    </button>
  );
}
