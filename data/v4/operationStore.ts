"use client";

export type WorkMode = "naver" | "google" | "image";
export type WorkTaskKey = "naver" | "google" | "image" | "publish";
export type BatchRowState = "active" | "published" | "duplicate";

export type OperationStoreState = {
  selectedTopic: string;
  done: Record<string, Partial<Record<WorkTaskKey, boolean>>>;
  rowState: Record<string, BatchRowState>;
  publishedTitles: string[];
  duplicateTitles: string[];
};

const STORE_KEY = "lifebookmom.project0365.store";

export const defaultOperationStore: OperationStoreState = {
  selectedTopic: "",
  done: {},
  rowState: {},
  publishedTitles: [],
  duplicateTitles: [],
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

export function markTask(slot: string, key: WorkTaskKey, value = true) {
  return updateOperationStore((prev) => ({
    ...prev,
    done: {
      ...prev.done,
      [slot]: {
        ...(prev.done[slot] ?? {}),
        [key]: value,
      },
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

    return {
      ...prev,
      rowState: { ...prev.rowState, [slot]: state },
      publishedTitles,
      duplicateTitles,
      done: {
        ...prev.done,
        [slot]: { ...(prev.done[slot] ?? {}), publish: state === "published" ? true : prev.done[slot]?.publish },
      },
    };
  });
}

export function clearOperationStore() {
  saveOperationStore(defaultOperationStore);
}
