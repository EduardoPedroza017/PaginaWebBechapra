"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRestorer() {
  const pathname = usePathname();
  const saveTimeout = useRef<number | null>(null);

  useEffect(() => {
    const key = `scroll:${pathname}`;

    // Restore saved position for this path (if any)
    try {
      const saved = Number(localStorage.getItem(key) || 0);
      if (saved && typeof window !== "undefined") {
        // allow paint/layout to settle
        setTimeout(() => window.scrollTo({ top: saved, behavior: "auto" }), 50);
      }
    } catch (e) {
      // ignore
    }

    const save = () => {
      try {
        localStorage.setItem(key, String(window.scrollY || 0));
      } catch (e) {
        // ignore
      }
    };

    const onScroll = () => {
      if (saveTimeout.current) window.clearTimeout(saveTimeout.current);
      // throttle writes
      saveTimeout.current = window.setTimeout(() => {
        save();
        saveTimeout.current = null;
      }, 150) as unknown as number;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("beforeunload", save);

    return () => {
      if (saveTimeout.current) window.clearTimeout(saveTimeout.current);
      try {
        // final save for this path
        localStorage.setItem(key, String(window.scrollY || 0));
      } catch (e) {}
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("beforeunload", save);
    };
  }, [pathname]);

  // also save when the document becomes hidden (mobile tabs, etc.)
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) {
        try {
          localStorage.setItem(`scroll:${pathname}`, String(window.scrollY || 0));
        } catch (e) {}
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [pathname]);

  return null;
}
