"use client";

import { useEffect, useState } from "react";
import {
  enterpriseWorkspaceMeta,
  getWorkspaceDashboard,
  openContentStudio,
  resetWorkspaceStatus,
  workspaceFlow,
} from "../data/enterpriseWorkspace";

export default function EnterpriseWorkspacePanel() {
  const [dashboard, setDashboard] = useState<any>(null);

  const refresh = () => {
    setDashboard(getWorkspaceDashboard());
  };

  useEffect(() => {
    refresh();
  }, []);

  const reset = () => {
    resetWorkspaceStatus();
    refresh();
  };

  if (!dashboard) return null;

  return (
    <section className="space-y-6">
      <section className="rounded-[2rem] bg-[#231F1A] p-8 text-white">
        <p className="text-sm font-bold text-[#D9CBB7]">
          {enterpriseWorkspaceMeta.project}
        </p>
        <h1 className="mt-3 text-5xl font-black">🏢 Enterprise Workspace</h1>
        <p className="mt-4 text-xl font-bold text-[#F7F1E8]">
          별도 프로그램 없이 운영본부 안에서 작업창과 발행흐름을 관리합니다.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-4">
        <StatusCard title="Version" value={enterpriseWorkspaceMeta.version} />
        <StatusCard title="이리나 작업창" value={dashboard.rinaStatus} />
        <StatusCard title="마지막 연결" value={dashboard.rinaLast || "없음"} />
        <StatusCard
          title="마지막 실행"
          value={dashboard.launcherLast?.label ?? "없음"}
        />
      </section>

      <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
        <h2 className="text-3xl font-black">🚢 Workspace Flow</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {workspaceFlow.map((item, index) => (
            <div
              key={item}
              className="rounded-2xl bg-[#EFF8F2] p-4 font-black text-[#2F6B4F]"
            >
              {index + 1}. {item}
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <button
          onClick={openContentStudio}
          className="rounded-2xl bg-[#231F1A] p-5 text-left text-xl font-black text-white"
        >
          📝 Content Studio 열기
          <p className="mt-2 text-sm text-[#D9CBB7]">
            프로젝트 선택과 AI Launcher 실행
          </p>
        </button>

        <button
          onClick={refresh}
          className="rounded-2xl bg-[#F7F1E8] p-5 text-left text-xl font-black"
        >
          🔄 상태 새로고침
          <p className="mt-2 text-sm text-[#7A6B5B]">
            작업창·실행·발행 기록 확인
          </p>
        </button>

        <button
          onClick={reset}
          className="rounded-2xl bg-[#FFF0F0] p-5 text-left text-xl font-black text-[#8A2E2E]"
        >
          🧹 작업창 상태 초기화
          <p className="mt-2 text-sm">
            탭을 닫았는데 연결됨으로 보일 때 사용
          </p>
        </button>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <HistoryCard
          title="🚀 최근 AI Launcher 기록"
          empty="아직 실행 기록이 없습니다."
          history={dashboard.launcherHistory}
          render={(item: any) =>
            `${item.at} · ${item.label} · ${item.projectTopic}`
          }
        />

        <HistoryCard
          title="✅ 최근 발행 완료 기록"
          empty="아직 발행 완료 기록이 없습니다."
          history={dashboard.publishHistory}
          render={(item: any) =>
            `${item.at} · ${item.topic} · ${item.status}`
          }
        />
      </section>
    </section>
  );
}

function StatusCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-[2rem] border border-[#E4D5BE] bg-white p-6">
      <p className="text-sm font-black text-[#7A6B5B]">{title}</p>
      <p className="mt-2 break-words text-2xl font-black">{value}</p>
    </div>
  );
}

function HistoryCard({
  title,
  empty,
  history,
  render,
}: {
  title: string;
  empty: string;
  history: any[];
  render: (item: any) => string;
}) {
  return (
    <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-8">
      <h2 className="text-3xl font-black">{title}</h2>
      {history.length === 0 ? (
        <p className="mt-5 rounded-2xl bg-[#FFFDF8] p-5 font-bold text-[#7A6B5B]">
          {empty}
        </p>
      ) : (
        <div className="mt-5 space-y-3">
          {history.slice(0, 10).map((item, index) => (
            <div
              key={`${render(item)}-${index}`}
              className="rounded-2xl bg-[#FFFDF8] p-4 font-bold text-[#5C5146]"
            >
              • {render(item)}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
