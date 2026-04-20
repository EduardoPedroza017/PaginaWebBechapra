"use client";

import { motion } from "framer-motion";
import { Search, Lightbulb, Rocket, LineChart, ArrowRight } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";
import Section from "@/app/components/Section";

const steps = [
  {
    step: "01",
    title: "Diagnóstico",
    desc: "Análisis exhaustivo de su operación, retos y objetivos estratégicos.",
    icon: Search,
    color: "blue",
  },
  {
    step: "02",
    title: "Diseño",
    desc: "Conceptualización de soluciones a medida alineadas a su visión.",
    icon: Lightbulb,
    color: "indigo",
  },
  {
    step: "03",
    title: "Ejecución",
    desc: "Implementación ágil con acompañamiento experto continuo.",
    icon: Rocket,
    color: "purple",
  },
  {
    step: "04",
    title: "Optimización",
    desc: "Monitoreo de KPIs y mejora continua para maximizar el ROI.",
    icon: LineChart,
    color: "green",
  },
];

export default function ProcessSection() {
  return (
    <Section variant="white" size="lg">
      <div className="max-w-7xl mx-auto">
        {/* Header Unificado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full text-xs font-black uppercase tracking-widest mb-4 border border-blue-100 dark:border-blue-800/50">
            <Rocket size={14} />
            <TranslateText text="Metodología" />
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">
            <TranslateText text="Nuestro" />{" "}
            <span className="bg-linear-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Proceso
            </span>
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            <TranslateText text="Un enfoque estructurado y probado que garantiza resultados excepcionales en cada proyecto." />
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-px bg-slate-100 dark:bg-slate-800" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            {steps.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative text-center group"
              >
                {/* Step Number Badge */}
                <div className="relative z-10 w-24 h-24 mx-auto mb-10">
                  <div className="absolute inset-0 bg-blue-600 rounded-[2rem] rotate-6 group-hover:rotate-12 transition-transform duration-500 opacity-10" />
                  <div className="absolute inset-0 bg-blue-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-blue-900/20 transition-all duration-500 group-hover:scale-110">
                    <span className="text-3xl font-black text-white">{item.step}</span>
                  </div>
                </div>

                {/* Content Card */}
                <div className="bg-white dark:bg-slate-900/50 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <item.icon size={24} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                    <TranslateText text={item.title} />
                  </h3>
                  <p className="text-sm font-bold text-slate-600 dark:text-slate-400 leading-relaxed">
                    <TranslateText text={item.desc} />
                  </p>
                </div>

                {/* Desktop Arrow Indicator */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-12 -right-8 z-20">
                    <div className="w-16 h-px bg-linear-to-r from-blue-600/50 to-transparent" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
