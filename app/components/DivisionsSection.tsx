"use client";

import { useEffect, useRef, useState } from "react";
import { FiCpu, FiMonitor, FiBriefcase } from "react-icons/fi";
import AnimatedSection from "./AnimatedSection";
import DivisionButton from "./DivisionButton";
import { TranslateText } from "@/components/TranslateText";


export default function DivisionsSection() {
  const divisions = [
    {
      label: "BTC",
      description: "Soluciones tecnológicas y transformación digital",
      image: "/imagen/division-btc.jpg",
      icon: <FiCpu size={44} color="#fff" />
    },
    {
      label: "Bechapra Studio",
      description: "Diseño y desarrollo de experiencias digitales",
      image: "/imagen/division-studio.jpg",
      icon: <FiMonitor size={44} color="#fff" />
    },
    {
      label: "Bechapra Consultores",
      description: "Asesoría estratégica y consultoría empresarial",
      image: "/imagen/division-consultores.jpg",
      icon: <FiBriefcase size={44} color="#fff" />
    }
  ];

  const [active, setActive] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Iniciar autoplay al montar el componente
    const id = window.setInterval(() => {
      setActive((s) => (s + 1) % divisions.length);
    }, 5000);

    return () => clearInterval(id);
  }, [divisions.length]);

  function startAutoplay() {
    stopAutoplay();
    intervalRef.current = window.setInterval(() => {
      setActive((s) => (s + 1) % divisions.length);
    }, 5000);
  }

  function stopAutoplay() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  return (
    <section id="divisiones" className="mb-16 sm:mb-24 md:mb-32">
      <AnimatedSection>
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white"><TranslateText text="Divisiones de Bechapra" /></h2>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-500 rounded-full mx-auto mb-6" />
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            <TranslateText text="Especializadas en diferentes áreas para ofrecerte soluciones a medida" />
          </p>
        </div>
      </AnimatedSection>

      {/* Visual showcase (overlapping cards) + fondo animado */}
      <div className="relative max-w-5xl mx-auto px-4">
        {/* Fondo animado mejorado con CSS */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          borderRadius: '28px',
          overflow: 'hidden',
          background: 'radial-gradient(ellipse 70% 40% at 50% 20%, #2563eb22 0%, #fff0 100%)',
          animation: 'fadeWaveBg 8s ease-in-out infinite alternate',
        }} />
        <div className="relative z-10 flex justify-center items-center min-h-[340px] md:min-h-[400px]">
          <div
            ref={containerRef}
            className="relative flex w-full justify-center items-end gap-0 md:gap-4 h-[340px] md:h-[400px]"
            onMouseEnter={stopAutoplay}
            onMouseLeave={startAutoplay}
          >
            {divisions.map((d, i) => {
              const isActive = i === active;
              const isRight = i === (active + 1) % divisions.length;
              const isLeft = i === (active - 1 + divisions.length) % divisions.length;

              // Card position and scale logic
              let cardClasses = "absolute transition-all duration-500 ease-in-out";
              if (isActive) {
                cardClasses += " left-1/2 -translate-x-1/2 z-20 scale-100 opacity-100 shadow-2xl";
              } else if (isLeft) {
                cardClasses += " left-1/4 -translate-x-1/2 z-10 scale-90 opacity-70 blur-[2px]";
              } else if (isRight) {
                cardClasses += " left-3/4 -translate-x-1/2 z-10 scale-90 opacity-70 blur-[2px]";
              } else {
                cardClasses += " opacity-0 pointer-events-none";
              }

              return (
                <div
                  key={d.label}
                  className={cardClasses + " w-[90%] md:w-[380px] h-[320px] md:h-[380px] rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 to-blue-700 flex flex-col justify-between group"}
                  aria-hidden={!isActive && !isLeft && !isRight}
                >
                  <div className="flex flex-col justify-between h-full relative z-10 p-6">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="bg-white/10 rounded-xl p-2 flex items-center justify-center">{d.icon}</span>
                      <h3 className={isActive ? "text-2xl sm:text-3xl md:text-4xl font-extrabold text-white" : "text-xl sm:text-2xl font-semibold text-white"}>
                        {d.label}
                      </h3>
                    </div>
                    <p className="text-sm sm:text-base text-white/90 mt-2 sm:mt-4"><TranslateText text={d.description} /></p>
                    <div className="mt-6">
                      <button className={isActive
                        ? "bg-white text-blue-600 font-bold px-5 py-2 rounded-full shadow-lg hover:bg-blue-50 transition"
                        : "bg-white/30 text-white font-semibold px-5 py-2 rounded-full cursor-default opacity-70"}
                        tabIndex={isActive ? 0 : -1}
                        aria-disabled={!isActive}
                      >
                        <TranslateText text="Conoce la división" />
                      </button>
                    </div>
                  </div>
                  <div
                    className="absolute inset-0 rounded-3xl bg-cover bg-center opacity-30"
                    style={{ backgroundImage: `url(${d.image})` }}
                    aria-hidden
                  />
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-blue-900/70 to-transparent z-0" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Accessible grid for screen readers / keyboard users */}
      <div className="sr-only">
        <div className="space-y-4 max-w-4xl mx-auto">
          {divisions.map((division, idx) => (
            <AnimatedSection key={division.label} delay={idx * 0.1}>
              <DivisionButton label={division.label} description={division.description} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}