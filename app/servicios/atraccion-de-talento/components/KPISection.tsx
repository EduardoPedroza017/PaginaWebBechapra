"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

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
    <section className="py-24 px-6 bg-gradient-to-br from-amber-50 via-orange-50/50 to-yellow-50/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-black text-center text-gray-900 mb-16 tracking-tight"
        >
          {title}
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
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl border border-amber-100 hover:border-amber-300 transition-all duration-300 text-center overflow-hidden"
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-orange-500/0 group-hover:from-amber-500/5 group-hover:to-orange-500/5 transition-all duration-500" />

                {/* Icon */}
                <div className="relative w-14 h-14 mx-auto bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mb-4 group-hover:from-amber-400 group-hover:to-orange-500 transition-all duration-300">
                  <Icon
                    size={28}
                    className="text-amber-600 group-hover:text-white transition-colors duration-300"
                  />
                </div>

                {/* Value */}
                <div className="relative text-3xl md:text-4xl font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
                  {kpi.value}
                </div>

                {/* Label */}
                <div className="relative text-gray-900 font-bold mb-1">
                  {kpi.label}
                </div>

                {/* Note */}
                <div className="relative text-sm text-gray-500">{kpi.note}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
