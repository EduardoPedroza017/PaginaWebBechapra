"use client";

import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const ThreeScene = dynamic(() => import("./ThreeScene"), { ssr: false });

function SvgBadge() {
  return (
    <div className="flex items-center justify-center w-24 h-24 rounded-xl bg-gradient-to-br from-[--background] to-white/60">
      <svg className="w-12 h-12 animate-spin-slow text-[--brand-primary]" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="3" className="opacity-30" />
        <path d="M24 8v8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M24 32v8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function Canvas2DBadge() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
  const ctx = canvas.getContext("2d")!;
    let raf = 0;
    const w = (canvas.width = 96);
    const h = (canvas.height = 96);

    const dots = Array.from({ length: 12 }).map((_, i) => ({
      x: Math.cos((i / 12) * Math.PI * 2) * 28 + w / 2,
      y: Math.sin((i / 12) * Math.PI * 2) * 28 + h / 2,
      r: 3 + (i % 3),
      ang: (i / 12) * Math.PI * 2,
    }));

    function draw(t: number) {
      ctx.clearRect(0, 0, w, h);
      dots.forEach((d, i) => {
        const ang = d.ang + t / 800 + i * 0.1;
        const x = Math.cos(ang) * 28 + w / 2;
        const y = Math.sin(ang) * 28 + h / 2;
        ctx.beginPath();
        ctx.fillStyle = `hsl(${(i * 40) % 360}deg 70% 50%)`;
        ctx.arc(x, y, d.r, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={ref} className="w-24 h-24 rounded-xl bg-white/60" />;
}

export default function TechShowcase() {
  return (
    <section className="mb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-3xl bg-gradient-to-br from-white/60 to-[--background] p-8 md:p-10 shadow-lg border border-[--surface-border]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-1 flex flex-col items-start gap-3">
              <h2 className="text-4xl font-extrabold text-[--brand-accent]">BAUSEN</h2>
              <p className="text-[--foreground]">Innovación en Capital Humano, Tecnología y Servicios.</p>
              <div className="mt-4 flex gap-3">
                <span className="px-3 py-1 rounded-full bg-[--brand-primary] text-white text-sm">SVG</span>
                <span className="px-3 py-1 rounded-full bg-[--background] text-[--foreground] text-sm">Canvas 2D</span>
                <span className="px-3 py-1 rounded-full bg-[--brand-accent] text-white text-sm">WebGL</span>
              </div>
            </div>

            <div className="md:col-span-2 grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center gap-3 p-4 bg-white/60 rounded-2xl border border-[--surface-border]">
                <SvgBadge />
                <div className="text-sm font-semibold">SVG</div>
                <div className="text-xs text-[--foreground]">Animaciones vectoriales ligeras</div>
              </div>

              <div className="flex flex-col items-center gap-3 p-4 bg-white/60 rounded-2xl border border-[--surface-border]">
                <Canvas2DBadge />
                <div className="text-sm font-semibold">Canvas 2D</div>
                <div className="text-xs text-[--foreground]">Gráficos y visualizaciones rápidas</div>
              </div>

              <div className="flex flex-col items-center gap-3 p-4 bg-white/60 rounded-2xl border border-[--surface-border]">
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-gradient-to-br from-[--background] to-white/60 flex items-center justify-center">
                  {/* Load small ThreeScene thumbnail (dynamic, client-only) */}
                  <div className="w-full h-full">
                    <ThreeScene className="w-full h-full" />
                  </div>
                </div>
                <div className="text-sm font-semibold">WebGL</div>
                <div className="text-xs text-[--foreground]">Experiencias 3D interactivas</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
