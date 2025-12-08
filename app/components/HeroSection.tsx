"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Mail, CheckCircle2, Sparkles } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden transition-colors duration-300 bg-gradient-to-br from-slate-50 via-blue-50/50 to-white dark:from-slate-950 dark:via-blue-950/50 dark:to-slate-900">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-3xl bg-blue-100/20 dark:bg-blue-600/10" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl bg-blue-50/30 dark:bg-blue-500/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-blue-100/20 to-transparent dark:from-blue-900/20 dark:to-transparent" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-7"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-500 dark:border dark:border-blue-800/50"
            >
              <Sparkles className="w-4 h-4" />
              <span><TranslateText text="Soluciones empresariales integrales" /></span>
            </motion.div>
              
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white">
              <TranslateText text="Impulsamos" />
              <br />
              <span className="bg-gradient-to-r bg-clip-text text-transparent from-blue-600 via-blue-500 to-blue-700 dark:from-blue-500 dark:via-blue-600 dark:to-blue-700">
                <TranslateText text="tu talento" />
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-lg sm:text-xl leading-relaxed max-w-xl text-slate-600 dark:text-slate-300">
              <TranslateText text="Capital Humano, Desarrollo Organizacional y Management Services para cada etapa de tu crecimiento." />
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <motion.a
                href="#servicios"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center justify-center gap-3 font-bold px-8 py-4 rounded-2xl shadow-xl transition-all duration-300 bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/30 dark:shadow-blue-600/20"
              >
                <TranslateText text="Ver Servicios" />
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              
              <motion.a
                href="#contacto"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-3 font-bold px-8 py-4 rounded-2xl shadow-lg border-2 transition-all duration-300 bg-white text-slate-700 border-slate-100 hover:border-blue-200 hover:bg-blue-50 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 dark:hover:bg-slate-700 dark:hover:border-blue-600"
              >
                <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <TranslateText text="Contactar" />
              </motion.a>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200 dark:border-slate-700"
            >
              {[
                { value: "15+", label: "Años de experiencia" },
                { value: "500+", label: "Clientes" },
                { value: "98%", label: "Satisfacción" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl md:text-3xl font-black text-blue-600 dark:text-blue-400">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400">
                    <TranslateText text={stat.label} />
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block relative"
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-3xl -z-10 bg-blue-200 dark:bg-blue-800/30" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-3xl -z-10 bg-blue-100 dark:bg-blue-700/20" />
              
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/20">
                <Image
                  src="/image/hero/Flayers_Home_01100.jpg"
                  width={600}
                  height={500}
                  alt="Bechapra - Soluciones empresariales"
                  className="object-cover w-full h-auto"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent dark:from-blue-950/60 dark:to-transparent" />
              </div>

              {/* Floating card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="absolute -bottom-8 -left-8 rounded-2xl p-6 shadow-2xl backdrop-blur-sm bg-white/95 dark:bg-slate-900/95 dark:border dark:border-slate-700"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-green-100 dark:bg-green-900/40">
                    <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">
                      <TranslateText text="Certificados" />
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      REPSE · ISO · NOM
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}