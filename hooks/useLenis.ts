// hooks/useLenis.ts
"use client";
import Lenis from "lenis";
import { useEffect } from "react";

export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true, // ✅ válido
      // ❌ smoothTouch: ya no existe en tus types
    });

    let rafId = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(rafId);
  }, []);
}
