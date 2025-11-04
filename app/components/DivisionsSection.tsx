"use client";

import { useEffect, useRef, useState } from "react";
import AnimatedSection from "./AnimatedSection";
import DivisionButton from "./DivisionButton";
import carouselStyles from "../css/components/DivisionsCarousel.module.css";

export default function DivisionsSection() {
  const divisions = [
    { label: "BTC", description: "Soluciones tecnológicas y transformación digital", image: "/imagen/division-btc.jpg" },
    { label: "Bechapra Studio", description: "Diseño y desarrollo de experiencias digitales", image: "/imagen/division-studio.jpg" },
    { label: "Bechapra Consultores", description: "Asesoría estratégica y consultoría empresarial", image: "/imagen/division-consultores.jpg" }
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

  function goPrev() {
    setActive((s) => (s - 1 + divisions.length) % divisions.length);
  }

  function goNext() {
    setActive((s) => (s + 1) % divisions.length);
  }

  return (
    <section id="divisiones" className="mb-32">
      <AnimatedSection>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Divisiones de Bechapra</h2>
          <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mb-6" />
          <p className="text-lg text-slate-600">
            Especializadas en diferentes áreas para ofrecerte soluciones a medida
          </p>
        </div>
      </AnimatedSection>

      {/* Visual showcase (overlapping cards) */}
      <div className="max-w-5xl mx-auto">
        <div
          ref={containerRef}
          className={carouselStyles.stackRow}
          onMouseEnter={stopAutoplay}
          onMouseLeave={startAutoplay}
        >
          {divisions.map((d, i) => {
            const isActive = i === active;
            const isRight = i === (active + 1) % divisions.length;
            const isLeft = i === (active - 1 + divisions.length) % divisions.length;

            const cls = `${carouselStyles.card} ${
              isActive ? carouselStyles.highlight : isLeft ? carouselStyles.left : isRight ? carouselStyles.right : carouselStyles.hidden
            }`;

            return (
              <div
                key={d.label}
                className={cls}
                aria-hidden={!isActive && !isLeft && !isRight}
              >
                <div className={carouselStyles.cardInner}>
                  <div className={carouselStyles.cardText}>
                    <h3 className={isActive ? "text-4xl font-extrabold text-white" : "text-2xl font-semibold text-white"}>
                      {d.label}
                    </h3>
                    <p className="text-white/90 mt-4" style={{ color: '#ffffff' }}>{d.description}</p>

                    <div className={carouselStyles.itemsBox}>
                      <button className={isActive ? carouselStyles.btnPrimaryActive : carouselStyles.btnPrimary}>
                        Ver división
                      </button>
                    </div>
                  </div>

                  <div
                    className={carouselStyles.cardImageCrop}
                    style={{ backgroundImage: `url(${d.image})` }}
                    aria-hidden
                  />
                </div>
              </div>
            );
          })}
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