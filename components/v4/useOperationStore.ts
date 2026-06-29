"use client";

import { useEffect, useState } from "react";
import { defaultOperationStore, OperationStoreState, readOperationStore } from "../../data/v4/operationStore";

export function useOperationStoreState() {
  const [store, setStore] = useState<OperationStoreState>(defaultOperationStore);

  useEffect(() => {
    setStore(readOperationStore());

    const sync = () => setStore(readOperationStore());
    window.addEventListener("storage", sync);
    window.addEventListener("lifebookmom-store-change", sync as EventListener);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("lifebookmom-store-change", sync as EventListener);
    };
  }, []);

  return store;
}
