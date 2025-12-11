"use client";

import { useEffect, useRef, useState } from "react";
import { GraduationCap, Users, Video, Award, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { trainingFeatures } from "./data/homeData";
import { TranslateText } from "@/components/TranslateText";

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

  const ActiveIcon = iconMap[trainingFeatures[active].icon];

  return (
    <section id="training-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto mb-12"
      >
        <span className="inline-flex items-center gap-2 font-semibold text-sm px-4 py-2 rounded-full mb-4 text-blue-700 bg-blue-100 dark:bg-blue-900/40 dark:text-blue-500">
          <GraduationCap className="w-4 h-4" />
          <TranslateText text="Formación de talento" />
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
          Bechapra Training Center
        </h2>
        <p className="text-lg max-w-xl mx-auto text-slate-600 dark:text-slate-300">
          <TranslateText text="Formamos y conectamos el talento del futuro con las mejores oportunidades" />
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        <div
          className="relative rounded-3xl overflow-hidden shadow-xl bg-white dark:bg-slate-800/80 dark:border dark:border-slate-700"
          onMouseEnter={stopAutoplay}
          onMouseLeave={startAutoplay}
        >
          <div className="grid lg:grid-cols-2">
            {/* Left: Image/Visual */}
            <div className="relative min-h-[300px] lg:min-h-[500px] bg-gradient-to-br from-blue-600 to-blue-800 overflow-hidden">
              {/* <div className="absolute inset-0 bg-[url('/image/pattern.svg')] opacity-10" /> */}

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-white p-8"
                >
                  <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
                    <ActiveIcon className="w-12 h-12" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-center">
                    {trainingFeatures[active].label}
                  </h3>
                </motion.div>
              </AnimatePresence>

              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                <motion.div
                  key={active}
                  className="h-full bg-white"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear" }}
                />
              </div>
            </div>

            {/* Right: Content */}
            <div className="p-8 lg:p-12 flex flex-col justify-center bg-white dark:bg-slate-800/80">
              {/* Tabs */}
              <div className="flex flex-wrap gap-2 mb-8">
                {trainingFeatures.map((feature, i) => {
                  const Icon = iconMap[feature.icon];
                  return (
                    <button
                      key={feature.id}
                      onClick={() => setActive(i)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${active === i
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                          : "text-slate-600 hover:bg-slate-200 bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                        }`}
                    >
                      <Icon className="w-4 h-4" />
                      <TranslateText text={feature.label} />
                    </button>
                  );
                })}
              </div>

              {/* Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900 dark:text-white">
                    <TranslateText text={trainingFeatures[active].label} />
                  </h3>
                  <p className="text-lg mb-8 leading-relaxed text-slate-600 dark:text-slate-300">
                    <TranslateText text={trainingFeatures[active].description} />
                  </p>
                  <button className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/25 hover:bg-blue-700 hover:-translate-y-1 transition-all">
                    <TranslateText text="Más información" />
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </motion.div>
              </AnimatePresence>

              {/* Dots */}
              <div className="flex gap-2 mt-8">
                {trainingFeatures.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-2 rounded-full transition-all ${active === i ? "bg-blue-600 w-8" : "w-2 hover:bg-slate-300 bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600"
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
