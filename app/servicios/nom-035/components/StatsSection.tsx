"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';

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
    <section className="py-20 px-6 bg-white dark:bg-slate-900">
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
                className="relative group bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 rounded-3xl p-8 text-center text-white shadow-xl shadow-blue-500/20 dark:shadow-blue-900/20 cursor-pointer overflow-hidden"
              >
                {/* Animated Background */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"
                />

                <div className="relative z-10">
                  <Icon size={44} className="mx-auto mb-4 text-blue-200 dark:text-blue-300" />
                  <div className="text-5xl font-black mb-2 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-blue-100 dark:text-blue-200 font-semibold">
                    <TranslateText text={stat.label} />
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
