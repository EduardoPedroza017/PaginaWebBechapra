"use client";

import { useEffect, useRef } from "react";

export default function HeroParticles({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number | null = null;
    const canvasEl = canvas;
    const ctxEl = ctx;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // NUEVA FUNCIÓN: Obtiene el tamaño real del contenedor padre
    function getCanvasSize() {
      const parent = canvasEl.parentElement;
      if (!parent) return { width: 300, height: 300 };
      
      const rect = parent.getBoundingClientRect();
      return {
        width: rect.width || parent.clientWidth || 300,
        height: rect.height || parent.clientHeight || 300
      };
    }

    let width = 300;
    let height = 300;

    function resize() {
      const size = getCanvasSize();
      width = size.width;
      height = size.height;
      
      canvasEl.width = Math.round(width * dpr);
      canvasEl.height = Math.round(height * dpr);
      canvasEl.style.width = width + "px";
      canvasEl.style.height = height + "px";
      ctxEl.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // simple particle system
    const particles: { x: number; y: number; vx: number; vy: number; r: number; hue: number }[] = [];
    const createParticle = (scale = 1) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25 * scale,
      vy: (Math.random() - 0.5) * 0.25 * scale,
      r: (1 + Math.random() * 2.5) * scale,
      hue: 160 + Math.random() * 120,
    });

    function init() {
      particles.length = 0;
      const area = width * height;
      let densityDivisor = 60000;
      let scale = 1;
      if (width < 768) {
        densityDivisor = 150000;
        scale = 0.9;
      }
      if (width < 420) {
        densityDivisor = 240000;
        scale = 0.7;
      }
      const count = Math.max(4, Math.round(area / densityDivisor));
      for (let i = 0; i < count; i++) particles.push(createParticle(scale));
    }

    function draw() {
      if (!ctxEl) return;
      ctxEl.clearRect(0, 0, width, height);
      
      const g = ctxEl.createLinearGradient(0, 0, width, height);
      g.addColorStop(0, 'rgba(62,232,255,0.03)');
      g.addColorStop(1, 'rgba(150,86,255,0.02)');
      ctxEl.fillStyle = g;
      ctxEl.fillRect(0, 0, width, height);

      for (const p of particles) {
        p.x += prefersReduced ? p.vx * 0.2 : p.vx;
        p.y += prefersReduced ? p.vy * 0.2 : p.vy;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        ctxEl.beginPath();
        ctxEl.fillStyle = `hsla(${p.hue}, 90%, 60%, 0.75)`;
        ctxEl.shadowColor = `hsla(${p.hue}, 90%, 60%, 0.9)`;
        ctxEl.shadowBlur = width < 420 ? 6 : 12;
        ctxEl.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctxEl.fill();
        ctxEl.closePath();
      }
    }

    function loop() {
      draw();
      animationId = requestAnimationFrame(loop);
    }

    // ESPERAR a que el DOM esté completamente renderizado
    setTimeout(() => {
      resize();
      init();
      if (!prefersReduced) loop();
    }, 50);

    const onResize = () => {
      resize();
      init();
    };
    window.addEventListener("resize", onResize);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      aria-hidden
      ref={ref}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none'
      }}
    />
  );
}