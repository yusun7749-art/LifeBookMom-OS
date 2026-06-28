'use client';

import { useMemo, useState } from 'react';
import { contents, recommendedBuckets, todayTopics } from '../../data/v4/operationHomeData';
import { StatusBadge } from './OperationStatusBadge';

const quickCommands = [
  { key: '1', label: '네이버 원고', desc: '생활백서맘 문체 + 모바일 줄끝 검사' },
  { key: '2', label: 'Google 원고', desc: '동일 주제, 다른 제목·본문' },
  { key: '3', label: '이미지', desc: '리니 + 공식 워터마크 검사' },
  { key: '4', label: '발행완료', desc: '달력·CMS·진행률 동시 반영' },
];

export default function OperationHome() {
  const [query, setQuery] = useState('초등학생');
  const [refreshTick, setRefreshTick] = useState(0);
  const [doneIds, setDoneIds] = useState<string[]>([]);

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return contents;
    return contents.filter((item) => [item.keyword, item.category, item.naverTitle, item.googleTitle].some((v) => v.includes(q)));
  }, [query]);

  const todayDone = doneIds.length;
  const todayGoal = 6;
  const progress = Math.min(100, Math.round((todayDone / todayGoal) * 100));

  function markPublished(id: string) {
    setDoneIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }

  return (
    <main className="min-h-screen bg-[#fffaf1] px-6 py-6 text-zinc-900">
      <section className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-orange-100 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold text-orange-500">생활백서맘 운영본부</p>
            <h1 className="mt-1 text-3xl font-black tracking-tight">오늘 해야 할 일이 먼저 보이는 운영본부</h1>
            <p className="mt-2 text-sm text-zinc-500">운영본부 목적: 선장님이 구축이 아니라 발행과 수익화에 집중하도록 만드는 화면</p>
          </div>
          <button
            onClick={() => setRefreshTick((n) => n + 1)}
            className="rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-zinc-700"
          >
            ↻ 새로고침 {refreshTick > 0 ? `(${refreshTick})` : ''}
          </button>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-orange-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black">📅 오늘 해야 할 일</h2>
              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">발행 우선 모드</span>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {quickCommands.map((cmd) => (
                <div key={cmd.key} className="rounded-2xl border border-orange-100 bg-orange-50 p-4">
                  <div className="text-2xl font-black text-orange-600">{cmd.key}</div>
                  <div className="mt-1 font-bold">{cmd.label}</div>
                  <p className="mt-2 text-xs leading-5 text-zinc-500">{cmd.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <div className="flex justify-between text-sm font-bold">
                <span>오늘 목표</span>
                <span>{todayDone} / {todayGoal}</span>
              </div>
              <div className="mt-2 h-3 overflow-hidden rounded-full bg-zinc-100">
                <div className="h-full rounded-full bg-orange-400 transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-orange-100">
            <h2 className="text-xl font-black">🎯 승인 진행률</h2>
            <div className="mt-5 space-y-5">
              <div>
                <div className="flex justify-between text-sm font-bold"><span>애드센스 콘텐츠 기반</span><span>35 / 100</span></div>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-zinc-100"><div className="h-full w-[35%] rounded-full bg-emerald-400" /></div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-bold"><span>애드포스트 운영 기반</span><span>42 / 80</span></div>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-zinc-100"><div className="h-full w-[52%] rounded-full bg-blue-400" /></div>
              </div>
            </div>
          </section>
        </div>

        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-orange-100">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 className="text-xl font-black">🔥 오늘 추천 주제</h2>
            <p className="text-sm text-zinc-500">네이버와 Google을 같은 주제로 묶되 제목과 본문은 다르게 운영</p>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-5">
            {todayTopics.map((topic, i) => (
              <article key={topic.keyword} className="rounded-2xl border border-zinc-100 p-4 hover:border-orange-200 hover:bg-orange-50/50">
                <div className="text-xs font-black text-orange-500">추천 {i + 1} · {topic.category}</div>
                <h3 className="mt-2 font-black leading-6">{topic.naverTitle}</h3>
                <p className="mt-3 text-xs leading-5 text-zinc-500">Google: {topic.googleTitle}</p>
                <p className="mt-3 text-xs leading-5 text-zinc-400">{topic.reason}</p>
                <button className="mt-4 w-full rounded-xl bg-orange-500 px-3 py-2 text-xs font-bold text-white">이 주제로 작성</button>
              </article>
            ))}
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-orange-100">
            <h2 className="text-xl font-black">💡 콘텐츠 제작</h2>
            <p className="mt-2 text-sm text-zinc-500">키워드를 넣으면 작성된 글이 아니라 앞으로 쓸 주제를 찾는 영역</p>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="mt-4 w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-orange-400"
              placeholder="예: 초등학생, 여름, 안전, 사춘기"
            />
            <div className="mt-4 flex flex-wrap gap-2">
              {recommendedBuckets.map((bucket) => (
                <button key={bucket} onClick={() => setQuery(bucket)} className="rounded-full bg-zinc-100 px-3 py-2 text-xs font-bold hover:bg-orange-100 hover:text-orange-700">{bucket}</button>
              ))}
            </div>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-orange-100">
            <h2 className="text-xl font-black">📚 CMS 검색 · 진행 상태</h2>
            <div className="mt-5 overflow-hidden rounded-2xl border border-zinc-100">
              <table className="w-full text-left text-sm">
                <thead className="bg-zinc-50 text-xs text-zinc-500">
                  <tr>
                    <th className="px-4 py-3">주제</th>
                    <th className="px-4 py-3">네이버</th>
                    <th className="px-4 py-3">Google</th>
                    <th className="px-4 py-3">이미지</th>
                    <th className="px-4 py-3">발행</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {filtered.map((item) => {
                    const published = doneIds.includes(item.id) || item.published;
                    return (
                      <tr key={item.id} className="bg-white">
                        <td className="px-4 py-4">
                          <div className="font-bold">{item.keyword}</div>
                          <div className="mt-1 text-xs text-zinc-400">{item.date} · {item.category}</div>
                        </td>
                        <td className="px-4 py-4"><StatusBadge status={published ? 'published' : item.naverStatus} /></td>
                        <td className="px-4 py-4"><StatusBadge status={published ? 'published' : item.googleStatus} /></td>
                        <td className="px-4 py-4"><StatusBadge status={published ? 'published' : item.imageStatus} /></td>
                        <td className="px-4 py-4">
                          <button onClick={() => markPublished(item.id)} className="rounded-xl bg-zinc-900 px-3 py-2 text-xs font-bold text-white hover:bg-zinc-700">
                            {published ? '완료됨' : '발행완료'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
