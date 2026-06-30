"use client";

export type WorkMode = "naver" | "google" | "image";
export type WorkTaskKey = "naver" | "google" | "image" | "publish";
export type BatchRowState = "active" | "published" | "duplicate";

export type ManualTitleItem = {
  id: string;
  date: string;
  originalTitle: string;
  platform: "Naver" | "Google" | "ALL";
  status: "미발행" | "작성중" | "발행완료";
  source: "직접입력" | "주제찾기";
};

export type PublishedRecord = {
  id: string;
  title: string;
  platform: "Naver" | "Google" | "ALL";
  date: string;
  source: "오늘작성" | "데이터센터" | "글쓰기" | "발행관리" | "직접입력";
};

export type OperationStoreState = {
  selectedTopic: string;
  done: Record<string, Partial<Record<WorkTaskKey, boolean>>>;
  rowState: Record<string, BatchRowState>;
  publishedTitles: string[];
  duplicateTitles: string[];
  hiddenTopicTitles: string[];
  manualTitles: ManualTitleItem[];
  publishedRecords: PublishedRecord[];
};

const STORE_KEY = "lifebookmom.project037.store";

export const defaultOperationStore: OperationStoreState = {
  selectedTopic: "",
  done: {},
  rowState: {},
  publishedTitles: [],
  duplicateTitles: [],
  hiddenTopicTitles: [],
  manualTitles: [],
  publishedRecords: [],
};

function todayString() {
  return new Date().toISOString().slice(0, 10);
}

function uniq(list: string[]) {
  return Array.from(new Set(list.filter(Boolean)));
}

export function readOperationStore(): OperationStoreState {
  if (typeof window === "undefined") return defaultOperationStore;

  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    if (!raw) return defaultOperationStore;
    const parsed = JSON.parse(raw);

    return {
      ...defaultOperationStore,
      ...parsed,
      publishedTitles: uniq(parsed.publishedTitles ?? []),
      duplicateTitles: uniq(parsed.duplicateTitles ?? []),
      hiddenTopicTitles: uniq(parsed.hiddenTopicTitles ?? []),
      manualTitles: parsed.manualTitles ?? [],
      publishedRecords: parsed.publishedRecords ?? [],
      done: parsed.done ?? {},
      rowState: parsed.rowState ?? {},
    };
  } catch {
    return defaultOperationStore;
  }
}

export function saveOperationStore(next: OperationStoreState) {
  if (typeof window === "undefined") return;

  const cleaned: OperationStoreState = {
    ...defaultOperationStore,
    ...next,
    publishedTitles: uniq(next.publishedTitles),
    duplicateTitles: uniq(next.duplicateTitles),
    hiddenTopicTitles: uniq(next.hiddenTopicTitles),
    manualTitles: next.manualTitles ?? [],
    publishedRecords: next.publishedRecords ?? [],
    done: next.done ?? {},
    rowState: next.rowState ?? {},
  };

  window.localStorage.setItem(STORE_KEY, JSON.stringify(cleaned));
  window.dispatchEvent(new CustomEvent("lifebookmom-store-change", { detail: cleaned }));
}

export function updateOperationStore(updater: (prev: OperationStoreState) => OperationStoreState) {
  const prev = readOperationStore();
  const next = updater(prev);
  saveOperationStore(next);
  return next;
}

export function setSelectedTopic(topic: string) {
  return updateOperationStore((prev) => ({ ...prev, selectedTopic: topic }));
}

export function registerManualTitle(title: string, source: "직접입력" | "주제찾기" = "직접입력") {
  const clean = title.trim();
  if (!clean) return readOperationStore();

  return updateOperationStore((prev) => {
    const exists = prev.manualTitles.some((item) => item.originalTitle === clean);
    const manualTitles = exists
      ? prev.manualTitles
      : [{
          id: `manual-${Date.now()}`,
          date: "미발행",
          originalTitle: clean,
          platform: "ALL" as const,
          status: "미발행" as const,
          source,
        }, ...prev.manualTitles];

    return { ...prev, selectedTopic: clean, manualTitles };
  });
}

export function markTask(slot: string, key: WorkTaskKey, value = true) {
  return updateOperationStore((prev) => ({
    ...prev,
    done: { ...prev.done, [slot]: { ...(prev.done[slot] ?? {}), [key]: value } },
  }));
}

export function publishTopic(title: string, source: PublishedRecord["source"] = "데이터센터", platform: PublishedRecord["platform"] = "ALL") {
  const clean = title.trim();
  if (!clean) return readOperationStore();

  return updateOperationStore((prev) => {
    const exists = prev.publishedRecords.some((item) => item.title === clean);
    const record: PublishedRecord = {
      id: `published-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      title: clean,
      platform,
      date: todayString(),
      source,
    };

    return {
      ...prev,
      selectedTopic: clean,
      publishedTitles: uniq([...prev.publishedTitles, clean]),
      hiddenTopicTitles: uniq([...prev.hiddenTopicTitles, clean]),
      duplicateTitles: prev.duplicateTitles.filter((item) => item !== clean),
      publishedRecords: exists ? prev.publishedRecords : [record, ...prev.publishedRecords],
      manualTitles: prev.manualTitles.map((item) => item.originalTitle === clean ? { ...item, status: "발행완료" as const } : item),
    };
  });
}

export function duplicateTopic(title: string) {
  const clean = title.trim();
  if (!clean) return readOperationStore();

  return updateOperationStore((prev) => ({
    ...prev,
    duplicateTitles: uniq([...prev.duplicateTitles, clean]),
    hiddenTopicTitles: uniq([...prev.hiddenTopicTitles, clean]),
    publishedTitles: prev.publishedTitles.filter((item) => item !== clean),
  }));
}

export function setRowState(slot: string, title: string, state: BatchRowState) {
  if (state === "published") {
    const next = publishTopic(title, "오늘작성", "ALL");
    return updateOperationStore((prev) => ({
      ...next,
      rowState: { ...prev.rowState, [slot]: state },
      done: { ...prev.done, [slot]: { ...(prev.done[slot] ?? {}), publish: true } },
    }));
  }

  if (state === "duplicate") {
    const next = duplicateTopic(title);
    return updateOperationStore((prev) => ({ ...next, rowState: { ...prev.rowState, [slot]: state } }));
  }

  return updateOperationStore((prev) => ({ ...prev, rowState: { ...prev.rowState, [slot]: state } }));
}

export function markTopicHidden(title: string, state: "published" | "duplicate") {
  return state === "published" ? publishTopic(title, "데이터센터", "ALL") : duplicateTopic(title);
}

export function clearOperationStore() {
  saveOperationStore(defaultOperationStore);
}
