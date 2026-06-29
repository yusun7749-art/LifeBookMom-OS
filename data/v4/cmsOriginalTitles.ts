import { scheduleItems } from "../schedule";

export type OriginalTitleItem = {
  id: string;
  date: string;
  originalTitle: string;
  platform: "Naver" | "Google";
  status: string;
  project: string;
  keywords: string[];
  viewCount?: number;
};

export const originalPublishedTitles: OriginalTitleItem[] = scheduleItems.map((item) => ({
  id: `${item.platform}-${item.id}`,
  date: item.date,
  originalTitle: item.title,
  platform: item.platform,
  status: item.status,
  project: item.project,
  keywords: [item.project, item.platform, item.status],
  viewCount: item.views ?? 0,
}));

export const draftQueueTitles: OriginalTitleItem[] = [
  { id: "draft-001", date: "미발행", originalTitle: "수족구 형제자매 전염 막는 집안 소독과 생활수칙", platform: "Naver", status: "미발행", project: "수족구 확장", keywords: ["수족구", "형제전염", "소독"] },
  { id: "draft-002", date: "미발행", originalTitle: "로블록스 자녀보호설정, 부모가 꼭 확인해야 할 7가지", platform: "Naver", status: "미발행", project: "로블록스 확장", keywords: ["로블록스", "자녀보호", "설정"] },
  { id: "draft-003", date: "미발행", originalTitle: "초등학생 학교폭력 초기 신호, 부모가 가장 먼저 확인할 행동", platform: "Naver", status: "미발행", project: "학교폭력", keywords: ["학교폭력", "친구관계", "폭력"] },
];

export function allOriginalItems(platform?: "Naver" | "Google" | "ALL") {
  const all = [...originalPublishedTitles, ...draftQueueTitles];
  if (!platform || platform === "ALL") return all;
  return all.filter((item) => item.platform === platform);
}

export function findOriginalTitles(query: string, platform?: "Naver" | "Google" | "ALL") {
  const q = query.trim().toLowerCase();
  const all = allOriginalItems(platform);
  if (!q) return all;

  return all.filter((item) =>
    [item.date, item.originalTitle, item.platform, item.status, item.project, ...item.keywords]
      .join(" ")
      .toLowerCase()
      .includes(q)
  );
}

export const titleStats = {
  naver: originalPublishedTitles.filter((item) => item.platform === "Naver").length,
  google: originalPublishedTitles.filter((item) => item.platform === "Google").length,
  total: originalPublishedTitles.length,
};

export const viewTopTitles = [...originalPublishedTitles]
  .filter((item) => (item.viewCount ?? 0) > 0)
  .sort((a, b) => (b.viewCount ?? 0) - (a.viewCount ?? 0))
  .slice(0, 10);
