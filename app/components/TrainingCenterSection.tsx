"use client";

import { useEffect, useRef, useState } from "react";
import { GraduationCap, Users, Video, Award, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { trainingFeatures } from "./data/homeData";
import { TranslateText } from "@/components/TranslateText";
import Link from "next/link";

const imageMap: Record<string, string> = {
  eventos: "/web/image/traniing/evento.jfif",
  webinars: "/web/image/traniing/escuela.jfif",
  becarios: "/web/image/traniing/escuela.jfif",
};

const iconMap = {
  users: Users,
  video: Video,
  award: Award,
};

export default function TrainingCenterSection() {
  const [active, setActive] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoplay = () => {
    stopAutoplay();
    intervalRef.current = setInterval(() => {
      setActive((s) => (s + 1) % trainingFeatures.length);
    }, 5000);
  };

  const stopAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, []);

  const ActiveIcon = iconMap[trainingFeatures[active].icon as keyof typeof iconMap];

  return (
    <div className="relative py-8 sm:py-12">
      <div
        className="absolute inset-x-0 top-0 h-64 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(33,130,255,0.10), transparent 65%)",
        }}
      />

      <div className="relative text-center max-w-4xl mx-auto mb-20">
        <span
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 border"
          style={{
            backgroundColor: "var(--background)",
            color: "var(--brand-primary)",
            borderColor: "var(--surface-border)",
          }}
        >
          <GraduationCap className="w-4 h-4" />
          <TranslateText text="Formacion de Talento" />
        </span>
        <h2
          className="text-4xl lg:text-6xl font-black mb-6 tracking-tighter italic"
          style={{ color: "var(--brand-accent)" }}
        >
          Bausen Training Center
        </h2>
        <p
          className="text-lg font-medium leading-relaxed text-justify md:text-center max-w-2xl mx-auto"
          style={{ color: "var(--foreground)" }}
        >
          <TranslateText text="Formamos y conectamos el talento del futuro con las mejores oportunidades estrategicas de crecimiento." />
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div
          className="relative rounded-[2rem] overflow-hidden border"
          style={{
            borderColor: "var(--surface-border)",
            backgroundColor: "var(--surface-card)",
            boxShadow: "0 24px 70px rgba(15,23,42,0.08)",
          }}
          onMouseEnter={stopAutoplay}
          onMouseLeave={startAutoplay}
        >
          <div className="grid lg:grid-cols-2">
            <Link href="/training-center" className="relative min-h-[320px] lg:min-h-[520px] overflow-hidden block">
              <img
                src={imageMap[trainingFeatures[active].id] || "/web/image/traniing/evento.jfif"}
                alt={trainingFeatures[active].label}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white p-8"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(35,70,221,0.18) 0%, rgba(35,70,221,0.68) 100%)",
                  }}
                >
                  <ActiveIcon className="w-16 h-16 mb-6 opacity-90" />
                  <h3 className="text-2xl font-black tracking-tight italic text-center text-white">
                    {trainingFeatures[active].label}
                  </h3>
                </motion.div>
              </AnimatePresence>
            </Link>

            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <div className="flex flex-wrap gap-3 mb-10">
                {trainingFeatures.map((feature, i) => {
                  const Icon = iconMap[feature.icon as keyof typeof iconMap];
                  const isActive = active === i;

                  return (
                    <button
                      key={feature.id}
                      onClick={() => setActive(i)}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border"
                      style={
                        isActive
                          ? {
                              backgroundColor: "var(--brand-primary)",
                              color: "#ffffff",
                              borderColor: "var(--brand-primary)",
                              boxShadow: "0 12px 30px rgba(35,70,221,0.18)",
                            }
                          : {
                              backgroundColor: "var(--background)",
                              color: "var(--foreground)",
                              borderColor: "var(--surface-border)",
                            }
                      }
                    >
                      <Icon className="w-3 h-3" />
                      <TranslateText text={feature.label} />
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                >
                  <h3
                    className="text-3xl font-black mb-6 tracking-tight italic"
                    style={{ color: "var(--brand-accent)" }}
                  >
                    <TranslateText text={trainingFeatures[active].label} />
                  </h3>
                  <p
                    className="text-base leading-relaxed mb-10 text-justify"
                    style={{ color: "var(--foreground)" }}
                  >
                    <TranslateText text={trainingFeatures[active].description} />
                  </p>
                  <Link
                    href="/training-center"
                    className="inline-flex items-center gap-3 px-8 py-4 text-white font-black uppercase tracking-widest text-[10px] rounded-xl transition-all group"
                    style={{
                      backgroundColor: "var(--brand-primary)",
                      boxShadow: "0 16px 40px rgba(35,70,221,0.22)",
                    }}
                  >
                    <TranslateText text="Mas informacion" />
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
