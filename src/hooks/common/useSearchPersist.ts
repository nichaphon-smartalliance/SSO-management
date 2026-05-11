"use client";

import { useState, useEffect, useCallback } from "react";

type TimeUnit = "minute" | "hour" | "day";

function getCookieExpireMs(): number {
  const unit = (process.env.NEXT_PUBLIC_SEARCH_PERSIST_UNIT as TimeUnit) ?? "hour";
  const num = Number(process.env.NEXT_PUBLIC_SEARCH_PERSIST_EXPIRE_NUM ?? 1);

  const unitMs: Record<TimeUnit, number> = {
    minute: 60_000,
    hour: 3_600_000,
    day: 86_400_000,
  };
  return num * (unitMs[unit] ?? unitMs.hour);
}

function setCookie(key: string, value: string) {
  const ms = getCookieExpireMs();
  const expires = new Date(Date.now() + ms).toUTCString();
  document.cookie = `${key}=${encodeURIComponent(value)};expires=${expires};path=/`;
}

function getCookie(key: string): string | null {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${key}=`));
  if (!match) return null;
  return decodeURIComponent(match.split("=")[1]);
}

function deleteCookie(key: string) {
  document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}

/**
 * บันทึกค่า filter ลง cookie เพื่อให้คงอยู่ข้ามการ reload
 * ใช้ env vars NEXT_PUBLIC_SEARCH_PERSIST_EXPIRE_NUM และ NEXT_PUBLIC_SEARCH_PERSIST_UNIT
 */
export function useSearchPersist<T extends Record<string, unknown>>(
  key: string,
  defaultValue: T
) {
  const [filter, setFilterState] = useState<T>(defaultValue);

  useEffect(() => {
    const saved = getCookie(key);
    if (saved) {
      try {
        setFilterState(JSON.parse(saved));
      } catch {
        // cookie เสียหาย ใช้ค่า default
      }
    }
  }, [key]);

  const setFilter = useCallback(
    (value: T | ((prev: T) => T)) => {
      setFilterState((prev) => {
        const next = typeof value === "function" ? value(prev) : value;
        setCookie(key, JSON.stringify(next));
        return next;
      });
    },
    [key]
  );

  const clearFilter = useCallback(() => {
    deleteCookie(key);
    setFilterState(defaultValue);
  }, [key, defaultValue]);

  return { filter, setFilter, clearFilter };
}
