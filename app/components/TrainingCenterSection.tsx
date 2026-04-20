"use client";

import { useEffect, useRef, useState } from "react";
import { GraduationCap, Users, Video, Award, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { trainingFeatures } from "./data/homeData";
import { TranslateText } from "@/components/TranslateText";
import Link from "next/link";
import Section from "./Section";

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
    <Section variant="white" size="lg">
      <div className="text-center max-w-4xl mx-auto mb-20">
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-blue-100 dark:border-blue-800/50">
          <GraduationCap className="w-4 h-4" />
          <TranslateText text="Formación de Talento" />
        </span>
        <h2 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter italic">
          Bausen Training Center
        </h2>
        <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed text-justify md:text-center max-w-2xl mx-auto">
          <TranslateText text="Formamos y conectamos el talento del futuro con las mejores oportunidades estratégicas de crecimiento." />
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div
          className="relative rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm"
          onMouseEnter={stopAutoplay}
          onMouseLeave={startAutoplay}
        >
          <div className="grid lg:grid-cols-2">
            <Link
              href="/training-center"
              className="relative min-h-[300px] lg:min-h-[500px] bg-blue-700 overflow-hidden block"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 z-10 bg-blue-700"
                >
                  <ActiveIcon className="w-16 h-16 mb-6 opacity-80" />
                  <h3 className="text-2xl font-black tracking-tight italic text-center">
                    {trainingFeatures[active].label}
                  </h3>
                </motion.div>
              </AnimatePresence>
              
              <img
                src={imageMap[trainingFeatures[active].id] || "/web/image/traniing/evento.jfif"}
                alt={trainingFeatures[active].label}
                className="absolute inset-0 w-full h-full object-cover z-0"
              />
            </Link>

            <div className="p-12 lg:p-16 flex flex-col justify-center">
              <div className="flex flex-wrap gap-2 mb-10">
                {trainingFeatures.map((feature, i) => {
                  const Icon = iconMap[feature.icon as keyof typeof iconMap];
                  return (
                    <button
                      key={feature.id}
                      onClick={() => setActive(i)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${active === i
                          ? "bg-blue-700 text-white"
                          : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-800"
                        }`}
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
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-6 tracking-tight italic">
                    <TranslateText text={trainingFeatures[active].label} />
                  </h3>
                  <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed mb-10 text-justify">
                    <TranslateText text={trainingFeatures[active].description} />
                  </p>
                  <Link
                    href="/training-center"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-blue-700 text-white font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-blue-800 transition-all group"
                  >
                    <TranslateText text="Más información" />
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
