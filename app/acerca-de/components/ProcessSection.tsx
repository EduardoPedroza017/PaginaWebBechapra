"use client";

import { motion } from "framer-motion";
import { Search, Lightbulb, Rocket, LineChart, ArrowRight } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";

const steps = [
  {
    step: "01",
    title: "Diagnóstico",
    desc: "Conocemos tu operación, retos y objetivos en detalle.",
    icon: Search,
    color: "blue",
  },
  {
    step: "02",
    title: "Diseño",
    desc: "Creamos una solución personalizada y adaptada a ti.",
    icon: Lightbulb,
    color: "indigo",
  },
  {
    step: "03",
    title: "Implementación",
    desc: "Ejecutamos el plan con acompañamiento continuo.",
    icon: Rocket,
    color: "purple",
  },
  {
    step: "04",
    title: "Seguimiento",
    desc: "Monitoreamos resultados y optimizamos constantemente.",
    icon: LineChart,
    color: "green",
  },
];

const colorStyles: Record<string, string> = {
  blue: "from-blue-600 to-blue-700",
  indigo: "from-indigo-600 to-indigo-700",
  purple: "from-purple-600 to-purple-700",
  green: "from-green-600 to-emerald-600",
};

export default function ProcessSection() {
  return (
    <section className="py-24 px-6 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">
            <Rocket size={16} />
            <TranslateText text="Metodología" />
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            <TranslateText text="Nuestro" />{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              <TranslateText text="Proceso" />
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
            <TranslateText text="Un enfoque estructurado que garantiza resultados excepcionales." />
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-[10%] right-[10%] h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 rounded-full" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((item, i) => {
              const Icon = item.icon;
              const gradient = colorStyles[item.color];

              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="relative"
                >
                  {/* Step Number Badge */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`relative z-10 w-20 h-20 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl`}
                  >
                    <span className="text-3xl font-black text-white">
                      {item.step}
                    </span>
                  </motion.div>

                  {/* Arrow (between steps) */}
                  {i < steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-10 -right-4 z-20">
                      <ArrowRight size={24} className="text-gray-300" />
                    </div>
                  )}

                  {/* Content Card */}
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                  >
                    <div className="w-12 h-12 bg-gray-100 dark:bg-slate-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon size={24} className="text-gray-700 dark:text-slate-300" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      <TranslateText text={item.title} />
                    </h3>
                    <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">
                      <TranslateText text={item.desc} />
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
