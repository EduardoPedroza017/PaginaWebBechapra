"use client";

import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  Zap,
  Shield,
  Briefcase,
  Heart,
  CheckCircle,
} from "lucide-react";
import { TranslateText } from "@/components/TranslateText";

const reasons = [
  {
    icon: Users,
    title: "Equipo experto",
    desc: "Profesionales con 15+ años en consultoría empresarial, HR y transformación digital.",
    color: "blue",
  },
  {
    icon: TrendingUp,
    title: "Resultados comprobados",
    desc: "Más de 500 empresas han transformado su operación con nuestras soluciones.",
    color: "indigo",
  },
  {
    icon: Zap,
    title: "Innovación continua",
    desc: "Metodologías actualizadas, herramientas modernas y enfoque ágil en cada proyecto.",
    color: "cyan",
  },
  {
    icon: Shield,
    title: "Confiabilidad",
    desc: "Compromiso con la confidencialidad, ética profesional y transparencia total.",
    color: "blue",
  },
  {
    icon: Briefcase,
    title: "Soluciones integrales",
    desc: "De capital humano a finanzas: una sola empresa para todas tus necesidades.",
    color: "indigo",
  },
  {
    icon: Heart,
    title: "Enfoque humano",
    desc: "Entendemos que detrás de cada número hay personas y su bienestar es prioritario.",
    color: "cyan",
  },
];

const colorStyles: Record<string, { bg: string; icon: string; border: string }> = {
  blue: {
    bg: "from-blue-50 to-blue-100/50",
    icon: "from-blue-600 to-blue-700",
    border: "border-blue-200",
  },
  indigo: {
    bg: "from-indigo-50 to-indigo-100/50",
    icon: "from-indigo-600 to-indigo-700",
    border: "border-indigo-200",
  },
  cyan: {
    bg: "from-cyan-50 to-cyan-100/50",
    icon: "from-cyan-500 to-blue-500",
    border: "border-cyan-200",
  },
};

export default function WhyUsSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-slate-900 dark:to-slate-800">
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
            <CheckCircle size={16} />
            <TranslateText text="Nuestras Fortalezas" />
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            <TranslateText text="¿Por qué" />{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Bechapra
            </span>
            ?
          </h2>
          <p className="text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
            <TranslateText text="Descubre las razones por las que cientos de empresas confían en nosotros." />
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((item, i) => {
            const Icon = item.icon;
            const colors = colorStyles[item.color];

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group"
              >
                <div
                  className={`relative h-full bg-gradient-to-br ${colors.bg} dark:from-slate-800 dark:to-slate-800/50 rounded-2xl p-6 border ${colors.border} dark:border-slate-700 hover:shadow-lg hover:-translate-y-2 transition-all duration-300`}
                >
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${colors.icon} rounded-xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon size={24} className="text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    <TranslateText text={item.title} />
                  </h3>
                  <p className="text-gray-600 dark:text-slate-400 leading-relaxed"><TranslateText text={item.desc} /></p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
