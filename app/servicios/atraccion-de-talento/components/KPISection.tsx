"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';

interface KPI {
  icon: LucideIcon;
  label: string;
  value: string;
  note: string;
}

interface KPISectionProps {
  title: string;
  kpis: KPI[];
}

export default function KPISection({ title, kpis }: KPISectionProps) {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-blue-50 via-blue-100/50 to-cyan-50/30 dark:from-slate-900 dark:via-blue-950/50 dark:to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-black text-center text-gray-900 dark:text-white mb-16 tracking-tight"
        >
          <TranslateText text={title} />
        </motion.h2>

        {/* KPIs Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, i) => {
            const Icon = kpi.icon;
            return (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl border border-blue-100 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 text-center overflow-hidden"
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-600/0 group-hover:from-blue-500/5 group-hover:to-blue-600/5 dark:group-hover:from-blue-500/10 dark:group-hover:to-blue-600/10 transition-all duration-500" />

                {/* Icon */}
                <div className="relative w-14 h-14 mx-auto bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 rounded-2xl flex items-center justify-center mb-4 group-hover:from-blue-400 group-hover:to-blue-600 transition-all duration-300">
                  <Icon
                    size={28}
                    className="text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors duration-300"
                  />
                </div>

                {/* Value */}
                <div className="relative text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent mb-2">
                  <TranslateText text={kpi.value} />
                </div>

                {/* Label */}
                <div className="relative text-gray-900 dark:text-white font-bold mb-1">
                  <TranslateText text={kpi.label} />
                </div>

                {/* Note */}
                <div className="relative text-sm text-gray-500 dark:text-slate-400">
                  <TranslateText text={kpi.note} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
