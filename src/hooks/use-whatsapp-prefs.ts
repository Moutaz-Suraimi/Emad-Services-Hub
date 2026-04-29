import { useEffect, useState, useCallback } from "react";
import type { MessageTone } from "@/data/services";

const TONE_KEY = "ea_msg_tone";
const STATS_KEY = "ea_wa_stats";
const CONFIRM_KEY = "ea_wa_skip_confirm";

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function useTone(): [MessageTone, (t: MessageTone) => void] {
  const [tone, setToneState] = useState<MessageTone>("formal");
  useEffect(() => {
    const v = (typeof window !== "undefined" && localStorage.getItem(TONE_KEY)) as MessageTone | null;
    if (v === "formal" || v === "short") setToneState(v);
  }, []);
  const setTone = useCallback((t: MessageTone) => {
    setToneState(t);
    try { localStorage.setItem(TONE_KEY, t); } catch {}
  }, []);
  return [tone, setTone];
}

export type ServiceStats = Record<string, number>;

export function useServiceStats() {
  const [stats, setStats] = useState<ServiceStats>({});
  useEffect(() => {
    setStats(readJSON<ServiceStats>(STATS_KEY, {}));
    const onStorage = (e: StorageEvent) => {
      if (e.key === STATS_KEY) setStats(readJSON<ServiceStats>(STATS_KEY, {}));
    };
    const onCustom = () => setStats(readJSON<ServiceStats>(STATS_KEY, {}));
    window.addEventListener("storage", onStorage);
    window.addEventListener("ea-stats-updated", onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("ea-stats-updated", onCustom);
    };
  }, []);
  return stats;
}

export function incrementServiceStat(serviceId: string) {
  if (typeof window === "undefined") return;
  const current = readJSON<ServiceStats>(STATS_KEY, {});
  current[serviceId] = (current[serviceId] || 0) + 1;
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(current));
    window.dispatchEvent(new Event("ea-stats-updated"));
  } catch {}
}

export function getSkipConfirm(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(CONFIRM_KEY) === "1";
}
export function setSkipConfirm(v: boolean) {
  try { localStorage.setItem(CONFIRM_KEY, v ? "1" : "0"); } catch {}
}
