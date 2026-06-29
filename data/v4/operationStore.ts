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

export type OperationStoreState = {
  selectedTopic: string;
  done: Record<string, Partial<Record<WorkTaskKey, boolean>>>;
  rowState: Record<string, BatchRowState>;
  publishedTitles: string[];
  duplicateTitles: string[];
  hiddenTopicTitles: string[];
  manualTitles: ManualTitleItem[];
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
};

export function readOperationStore(): OperationStoreState {
  if (typeof window === "undefined") return defaultOperationStore;
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    if (!raw) return defaultOperationStore;
    return { ...defaultOperationStore, ...JSON.parse(raw) };
  } catch {
    return defaultOperationStore;
  }
}

export function saveOperationStore(next: OperationStoreState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent("lifebookmom-store-change", { detail: next }));
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
      : [
          {
            id: `manual-${Date.now()}`,
            date: "미발행",
            originalTitle: clean,
            platform: "ALL" as const,
            status: "미발행" as const,
            source,
          },
          ...prev.manualTitles,
        ];

    return { ...prev, selectedTopic: clean, manualTitles };
  });
}

export function markTask(slot: string, key: WorkTaskKey, value = true) {
  return updateOperationStore((prev) => ({
    ...prev,
    done: {
      ...prev.done,
      [slot]: { ...(prev.done[slot] ?? {}), [key]: value },
    },
  }));
}

export function setRowState(slot: string, title: string, state: BatchRowState) {
  return updateOperationStore((prev) => {
    const publishedTitles = state === "published"
      ? Array.from(new Set([...prev.publishedTitles, title]))
      : prev.publishedTitles;
    const duplicateTitles = state === "duplicate"
      ? Array.from(new Set([...prev.duplicateTitles, title]))
      : prev.duplicateTitles;
    const hiddenTopicTitles = Array.from(new Set([...prev.hiddenTopicTitles, title]));

    return {
      ...prev,
      rowState: { ...prev.rowState, [slot]: state },
      publishedTitles,
      duplicateTitles,
      hiddenTopicTitles,
      done: {
        ...prev.done,
        [slot]: { ...(prev.done[slot] ?? {}), publish: state === "published" ? true : prev.done[slot]?.publish },
      },
    };
  });
}

export function markTopicHidden(title: string, state: "published" | "duplicate") {
  const clean = title.trim();
  if (!clean) return readOperationStore();

  return updateOperationStore((prev) => ({
    ...prev,
    hiddenTopicTitles: Array.from(new Set([...prev.hiddenTopicTitles, clean])),
    publishedTitles: state === "published" ? Array.from(new Set([...prev.publishedTitles, clean])) : prev.publishedTitles,
    duplicateTitles: state === "duplicate" ? Array.from(new Set([...prev.duplicateTitles, clean])) : prev.duplicateTitles,
  }));
}

export function clearOperationStore() {
  saveOperationStore(defaultOperationStore);
}
