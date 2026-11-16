"use client";

import { useEffect, useState } from "react";
import { nextThemeChange, themeAt, themeColors, themePreferenceKey, type Theme } from "@/lib/theme";

function readThemeOverride() {
  try {
    return window.localStorage.getItem(themePreferenceKey);
  } catch {
    return null;
  }
}

export function ThemeControl() {
  const [override, setOverride] = useState<string | null>();
  const [activeTheme, setActiveTheme] = useState<Theme>();

  useEffect(() => {
    setOverride(readThemeOverride());

    function syncOverride(event: StorageEvent) {
      if (event.key === themePreferenceKey || event.key === null) {
        setOverride(readThemeOverride());
      }
    }

    window.addEventListener("storage", syncOverride);
    return () => window.removeEventListener("storage", syncOverride);
  }, []);

  useEffect(() => {
    if (override === undefined) return;
    const [choice, expiresAt] = (override ?? "").split(":");
    const expiration = Number(expiresAt);
    let timer: number | undefined;

    function syncTheme() {
      window.clearTimeout(timer);
      const now = new Date();
      const nextChange = nextThemeChange(now);
      const hasOverride = (choice === "light" || choice === "dark") && expiration > now.getTime();
      const theme = hasOverride ? choice : themeAt(now);
      const refreshAt = hasOverride ? Math.min(expiration, nextChange) : nextChange;

      document.documentElement.dataset.theme = theme;
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", themeColors[theme]);
      setActiveTheme(theme);
      timer = window.setTimeout(syncTheme, Math.min(refreshAt - now.getTime(), 60_000));
    }

    syncTheme();
    window.addEventListener("focus", syncTheme);
    window.addEventListener("pageshow", syncTheme);
    document.addEventListener("visibilitychange", syncTheme);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("focus", syncTheme);
      window.removeEventListener("pageshow", syncTheme);
      document.removeEventListener("visibilitychange", syncTheme);
    };
  }, [override]);

  const nextTheme = activeTheme === "light" ? "dark" : "light";

  function toggleTheme() {
    const next = `${nextTheme}:${nextThemeChange(new Date())}`;
    setOverride(next);
    try {
      window.localStorage.setItem(themePreferenceKey, next);
    } catch {
      // The theme can still be changed for this page.
    }
  }

  return (
    <button
      type="button"
      aria-label={`Switch to ${nextTheme} mode`}
      onClick={toggleTheme}
      className="group inline-flex min-h-11 w-16 shrink-0 items-center justify-center rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-luxe-gold"
    >
      <span className="inline-flex h-8 w-full items-center justify-center gap-1 rounded-sm border border-luxe-gold/35 bg-luxe-bg/75 text-[10px] font-semibold text-luxe-white transition-colors group-hover:border-luxe-gold group-hover:bg-luxe-surface">
        <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" className="size-3 text-luxe-gold">
          {nextTheme === "light" ? (
            <>
              <circle cx="10" cy="10" r="3.3" />
              <path d="M10 1.8v2m0 12.4v2M1.8 10h2m12.4 0h2M4.2 4.2l1.4 1.4m8.8 8.8 1.4 1.4m0-11.6-1.4 1.4m-8.8 8.8-1.4 1.4" />
            </>
          ) : (
            <path d="M16.8 12.2a7.1 7.1 0 0 1-9-9 7.1 7.1 0 1 0 9 9Z" />
          )}
        </svg>
        {nextTheme === "light" ? "Light" : "Dark"}
      </span>
    </button>
  );
}
