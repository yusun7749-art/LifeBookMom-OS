"use client";

import { originalPublishedTitles } from "./cmsOriginalTitles";

export type CmsPlatform = "Naver" | "Google" | "ALL";
export type CmsStatus = "published" | "draft" | "duplicate";
export type CmsSource = "existing" | "manual" | "topic-finder" | "today-writing" | "data-center";

export type CmsContentItem = {
  id: string;
  title: string;
  platform: CmsPlatform;
  status: CmsStatus;
  date: string;
  project: string;
  source: CmsSource;
  viewCount?: number;
};

const CMS_KEY = "lifebookmom.project038.cms";

function today() {
  return new Date().toISOString().slice(0, 10);
}

function normalizeTitle(title: string) {
  return title.replace(/\s+/g, " ").trim();
}

function baseCmsItems(): CmsContentItem[] {
  return originalPublishedTitles.map((item) => ({
    id: item.id,
    title: item.originalTitle,
    platform: item.platform,
    status: "published" as const,
    date: item.date,
    project: item.project,
    source: "existing" as const,
    viewCount: item.viewCount ?? 0,
  }));
}

function uniqueByTitle(items: CmsContentItem[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = `${normalizeTitle(item.title)}-${item.platform}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function readCmsItems(): CmsContentItem[] {
  if (typeof window === "undefined") return baseCmsItems();

  try {
    const raw = window.localStorage.getItem(CMS_KEY);
    const saved: CmsContentItem[] = raw ? JSON.parse(raw) : [];
    return uniqueByTitle([...saved, ...baseCmsItems()]);
  } catch {
    return baseCmsItems();
  }
}

export function saveCmsItems(items: CmsContentItem[]) {
  if (typeof window === "undefined") return;
  const baseIds = new Set(baseCmsItems().map((item) => item.id));
  const userItems = uniqueByTitle(items).filter((item) => !baseIds.has(item.id));
  window.localStorage.setItem(CMS_KEY, JSON.stringify(userItems));
  window.dispatchEvent(new CustomEvent("lifebookmom-cms-change", { detail: userItems }));
}

export function updateCmsItems(updater: (prev: CmsContentItem[]) => CmsContentItem[]) {
  const prev = readCmsItems();
  const next = uniqueByTitle(updater(prev));
  saveCmsItems(next);
  return next;
}

export function isTitleUnavailable(title: string) {
  const clean = normalizeTitle(title);
  return readCmsItems().some((item) => normalizeTitle(item.title) === clean && (item.status === "published" || item.status === "duplicate"));
}

export function publishCmsTitle(title: string, source: CmsSource = "data-center", platform: CmsPlatform = "ALL") {
  const clean = normalizeTitle(title);
  if (!clean) return readCmsItems();

  return updateCmsItems((prev) => {
    const exists = prev.some((item) => normalizeTitle(item.title) === clean && item.status === "published");
    if (exists) return prev;

    return [
      {
        id: `cms-published-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        title: clean,
        platform,
        status: "published",
        date: today(),
        project: source,
        source,
        viewCount: 0,
      },
      ...prev.filter((item) => normalizeTitle(item.title) !== clean),
    ];
  });
}

export function duplicateCmsTitle(title: string, source: CmsSource = "data-center") {
  const clean = normalizeTitle(title);
  if (!clean) return readCmsItems();

  return updateCmsItems((prev) => {
    const exists = prev.some((item) => normalizeTitle(item.title) === clean && item.status === "duplicate");
    if (exists) return prev;

    return [
      {
        id: `cms-duplicate-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        title: clean,
        platform: "ALL",
        status: "duplicate",
        date: today(),
        project: source,
        source,
        viewCount: 0,
      },
      ...prev.filter((item) => normalizeTitle(item.title) !== clean),
    ];
  });
}

export function registerDraftTitle(title: string, source: CmsSource = "manual") {
  const clean = normalizeTitle(title);
  if (!clean) return readCmsItems();

  return updateCmsItems((prev) => {
    const exists = prev.some((item) => normalizeTitle(item.title) === clean);
    if (exists) return prev;

    return [
      {
        id: `cms-draft-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        title: clean,
        platform: "ALL",
        status: "draft",
        date: "미발행",
        project: source,
        source,
        viewCount: 0,
      },
      ...prev,
    ];
  });
}

export function cmsStats() {
  const items = readCmsItems();
  return {
    total: items.filter((item) => item.status === "published").length,
    naver: items.filter((item) => item.status === "published" && item.platform === "Naver").length,
    google: items.filter((item) => item.status === "published" && item.platform === "Google").length,
    added: items.filter((item) => item.source !== "existing").length,
    duplicate: items.filter((item) => item.status === "duplicate").length,
  };
}

export function cmsPublishedItems(platform?: CmsPlatform) {
  const items = readCmsItems().filter((item) => item.status === "published");
  if (!platform || platform === "ALL") return items;
  return items.filter((item) => item.platform === platform);
}
