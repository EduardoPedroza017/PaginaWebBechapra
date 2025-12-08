"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';

interface Stat {
  value: string;
  label: string;
  icon: LucideIcon;
}

interface StatsSectionProps {
  stats: Stat[];
}

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="py-16 px-6 bg-gradient-to-b from-blue-50/50 to-white dark:from-slate-900 dark:to-slate-950 border-b border-blue-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="text-center p-8 bg-white dark:bg-slate-800 rounded-2xl border-2 border-blue-100 dark:border-slate-700 hover:border-blue-600 dark:hover:border-blue-600 hover:shadow-xl hover:shadow-blue-600/15 dark:hover:shadow-blue-900/30 transition-all duration-300 cursor-pointer"
              >
                <Icon size={36} className="text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                <div className="text-4xl md:text-5xl font-black text-blue-600 dark:text-blue-400 mb-2 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-base text-gray-900 dark:text-gray-100 font-semibold">
                  <TranslateText text={stat.label} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
