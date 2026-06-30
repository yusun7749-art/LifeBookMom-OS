"use client";

import { useEffect, useState } from "react";
import { CmsContentItem, readCmsItems } from "../../data/v4/cmsStore";

export function useCmsStore() {
  const [items, setItems] = useState<CmsContentItem[]>([]);

  useEffect(() => {
    const sync = () => setItems(readCmsItems());
    sync();

    window.addEventListener("storage", sync);
    window.addEventListener("lifebookmom-cms-change", sync as EventListener);
    window.addEventListener("lifebookmom-store-change", sync as EventListener);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("lifebookmom-cms-change", sync as EventListener);
      window.removeEventListener("lifebookmom-store-change", sync as EventListener);
    };
  }, []);

  return items;
}
