"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface Stat {
  label: string;
  value: string;
  icon: LucideIcon;
}

interface StatsSectionProps {
  stats: Stat[];
}

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ scale: 1.03, y: -8 }}
                className="relative group bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl p-8 text-center text-white shadow-xl shadow-emerald-500/20 cursor-pointer overflow-hidden"
              >
                {/* Animated Background */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"
                />

                <div className="relative z-10">
                  <Icon size={44} className="mx-auto mb-4 text-emerald-200" />
                  <div className="text-5xl font-black mb-2 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-emerald-100 font-semibold">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
