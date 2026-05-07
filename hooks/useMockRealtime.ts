"use client";

import { useState, useEffect } from "react";

/**
 * Hook pour simuler des mises à jour de données en temps réel (mock).
 * @param initialData Les données initiales
 * @param intervalMs L'intervalle de mise à jour en millisecondes
 * @param updateFn La fonction qui génère la nouvelle valeur
 */
export function useMockRealtime<T>(
  initialData: T,
  intervalMs: number = 5000,
  updateFn: (current: T) => T
) {
  const [data, setData] = useState<T>(initialData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((current) => updateFn(current));
    }, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs, updateFn]);

  return data;
}
