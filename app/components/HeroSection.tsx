"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Mail, CheckCircle2, Sparkles } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 });
  const springY2 = useSpring(y2, { stiffness: 100, damping: 30 });

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center overflow-hidden transition-colors duration-500 bg-linear-to-br from-slate-50 via-blue-50/50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
    >
      {/* Dynamic Background Decorations (Parallax) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          style={{ y: springY1 }}
          className="absolute -top-40 -right-40 w-150 h-150 rounded-full blur-[120px] bg-blue-100/30 dark:bg-blue-600/10" 
        />
        <motion.div 
          style={{ y: springY2 }}
          className="absolute -bottom-40 -left-40 w-125 h-125 rounded-full blur-[100px] bg-blue-50/40 dark:bg-blue-500/10" 
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 rounded-full bg-linear-to-r from-blue-100/20 to-transparent dark:from-slate-900/12 dark:to-transparent" />
      </div>

      <motion.div 
        style={{ opacity, scale }}
        className="relative w-full max-w-7xl 2xl:max-w-360 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-blue-100/80 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 dark:border dark:border-blue-800/40 backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span><TranslateText text="Soluciones empresariales integrales" /></span>
            </motion.div>

            {/* Main Heading with Mask Reveal */}
            <div className="overflow-hidden">
              <motion.h1 
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl sm:text-6xl lg:text-8xl font-black leading-[1.05] tracking-tighter text-slate-900 dark:text-white"
              >
                <TranslateText text="Impulsamos" />
                <br />
                <span className="bg-linear-to-r bg-clip-text text-transparent from-blue-700 via-blue-500 to-blue-800 dark:from-slate-300 dark:via-slate-400 dark:to-slate-500">
                  <TranslateText text="tu talento" />
                </span>
              </motion.h1>
            </div>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg sm:text-xl leading-relaxed max-w-xl text-slate-600 dark:text-slate-400"
            >
              <TranslateText text="Capital Humano, Desarrollo Organizacional y Management Services para cada etapa de tu crecimiento." />
            </motion.p>

            {/* CTAs with Advanced Magnetic Interaction */}
            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <motion.a
                href="#servicios"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center justify-center gap-3 font-bold px-10 py-5 rounded-2xl shadow-2xl transition-all duration-300 bg-blue-700 text-white hover:bg-blue-600 shadow-blue-700/30 dark:shadow-blue-500/20"
              >
                <TranslateText text="Ver Servicios" />
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </motion.a>

              <motion.a
                href="#contacto"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-3 font-bold px-10 py-5 rounded-2xl transition-all duration-300 bg-white text-slate-900 border border-slate-200 hover:border-blue-400 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-800 dark:hover:border-blue-500 shadow-xl"
              >
                <Mail className="w-5 h-5 text-blue-700 dark:text-blue-500" />
                <TranslateText text="Contactar" />
              </motion.a>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="grid grid-cols-3 gap-8 pt-10 border-t border-slate-200 dark:border-slate-800"
            >
              {[
                { value: "40+", label: "Años de experiencia" },
                { value: "1,500+", label: "Clientes" },
                { value: "98%", label: "Satisfacción" },
              ].map((stat, i) => (
                <div key={i} className="group cursor-default">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-blue-700 dark:text-blue-500 transition-transform group-hover:-translate-y-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-500 mt-1">
                    <TranslateText text={stat.label} />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Image Side with Parallax Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="hidden md:block relative"
          >
            <div className="relative group">
              {/* Animated Floating Shapes */}
              <motion.div 
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-12 -left-12 w-32 h-32 rounded-3xl -z-10 bg-blue-500/10 dark:bg-blue-500/20 blur-xl" 
              />
              <motion.div 
                animate={{ 
                  y: [0, 20, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-16 -right-16 w-40 h-40 rounded-full -z-10 bg-indigo-500/10 dark:bg-indigo-500/20 blur-2xl" 
              />

              <div className="relative rounded-[40px] overflow-hidden shadow-2xl shadow-blue-900/40 group-hover:shadow-blue-600/50 transition-shadow duration-500">
                <Image
                  src="/web/image/hero/Flayers_Home_01100.jpg"
                  width={800}
                  height={1000}
                  alt="BAUSEN - Soluciones empresariales"
                  className="object-cover w-full h-auto scale-105 group-hover:scale-100 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-blue-950/60 via-transparent to-transparent dark:from-slate-950/80 dark:via-transparent dark:to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_28%)]" />
                <div className="absolute left-6 top-6 rounded-full border border-white/20 bg-slate-950/35 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-white backdrop-blur-md">
                  Estrategia y talento
                </div>
              </div>

              {/* Advanced Floating Card */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute -bottom-10 -left-10 rounded-3xl p-8 shadow-2xl backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 transition-transform duration-300 hover:scale-105"
              >
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-blue-600 text-white shadow-xl shadow-blue-600/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-xl font-black text-slate-900 dark:text-white leading-tight">
                      <TranslateText text="Líderes Certificados" />
                    </div>
                    <div className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-1 uppercase tracking-widest">
                      REPSE · ISO · NOM
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="absolute -right-6 top-10 rounded-[1.75rem] border border-white/20 bg-white/85 p-5 shadow-xl backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/85"
              >
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-blue-700 dark:text-blue-400">Impacto medible</div>
                <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">98%</div>
                <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Satisfaccion de clientes</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
