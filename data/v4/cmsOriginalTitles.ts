import { scheduleItems } from "../schedule";
export type OriginalTitleItem = { id: string; date: string; originalTitle: string; platform: "Naver" | "Google"; status: string; project: string; keywords: string[] };
export const originalPublishedTitles: OriginalTitleItem[] = scheduleItems.map((item) => ({
  id: `${item.platform}-${item.id}`,
  date: item.date,
  originalTitle: item.title,
  platform: item.platform,
  status: item.status,
  project: item.project,
  keywords: [item.project, item.platform, item.status],
}));

export const draftQueueTitles: OriginalTitleItem[] = [
  { id: "draft-001", date: "미발행", originalTitle: "초등학생 체육복 관리와 세탁 습관", platform: "Naver", status: "미발행", project: "체육복", keywords: ["체육복"] },
  { id: "draft-002", date: "미발행", originalTitle: "초등학생 여름철 두피 냄새 관리와 머리 감기 습관", platform: "Naver", status: "미발행", project: "두피냄새", keywords: ["두피냄새"] },
  { id: "draft-003", date: "미발행", originalTitle: "초등학생 발 냄새 관리, 양말과 운동화 습관부터 시작해요", platform: "Naver", status: "미발행", project: "발냄새", keywords: ["발냄새"] },
  { id: "draft-004", date: "미발행", originalTitle: "초등학생 운동 후 땀 관리와 옷 갈아입기 습관", platform: "Google", status: "미발행", project: "운동후위생", keywords: ["운동후위생"] },
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
  return all.filter((item) => [item.date, item.originalTitle, item.platform, item.status, item.project, ...item.keywords].join(" ").toLowerCase().includes(q));
}
