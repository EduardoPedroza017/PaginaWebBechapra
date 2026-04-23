"use client";

import { motion } from "framer-motion";
import { Calendar, Trophy, TrendingUp, Users, Clock, Award } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";
import Section from "@/app/components/Section";

const timelineData = [
  { year: "2009", event: "Fundación de BAUSEN", icon: Calendar },
  { year: "2012", event: "Expansión nacional y nuevos servicios", icon: TrendingUp },
  { year: "2016", event: "Primeros 100 clientes y certificación ISO", icon: Award },
  { year: "2019", event: 'Reconocimiento "Empresa Innovadora"', icon: Trophy },
  { year: "2022", event: "Alianza internacional y 500+ empresas", icon: Users },
];

const statsData = [
  { value: "500+", label: "Empresas atendidas", icon: Users },
  { value: "15+", label: "Años de experiencia", icon: Clock },
  { value: "95%", label: "Satisfacción de clientes", icon: Trophy },
  { value: "8", label: "Servicios especializados", icon: Award },
];

export default function HistorySection() {
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
            <Calendar size={14} />
            <TranslateText text="Nuestra Trayectoria" />
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">
            <TranslateText text="Historia y" />{" "}
            <span className="bg-linear-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              <TranslateText text="Logros" />
            </span>
          </h2>
        </motion.div>

        {/* Modern Timeline */}
        <div className="relative mb-32">
          {/* Progress Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 dark:bg-slate-800 hidden md:block transform -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
            {timelineData.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative text-center group"
              >
                {/* Dot Connector */}
                <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 border-blue-600 z-10 group-hover:scale-150 group-hover:bg-blue-600 transition-all duration-300" />

                <div className="bg-white dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-500 relative z-20 group-hover:-translate-y-2">
                  <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <item.icon size={28} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-3xl font-black text-blue-700 dark:text-blue-500 mb-2">{item.year}</div>
                  <p className="text-sm font-bold text-slate-600 dark:text-slate-400 leading-relaxed">
                    <TranslateText text={item.event} />
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Pulse Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10">
          {statsData.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative p-8 rounded-[2rem] bg-blue-50/50 dark:bg-slate-900/50 border border-blue-100 dark:border-slate-800 text-center group hover:bg-white dark:hover:bg-slate-800 transition-all duration-500 shadow-lg hover:shadow-2xl overflow-hidden"
            >
              <div className="relative z-10">
                <div className="text-4xl lg:text-5xl font-black text-blue-700 dark:text-blue-500 mb-3 tracking-tighter">
                  {stat.value}
                </div>
                <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-blue-600 transition-colors">
                  <TranslateText text={stat.label} />
                </div>
              </div>
              {/* Subtle animated background glow */}
              <div className="absolute inset-0 bg-linear-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
