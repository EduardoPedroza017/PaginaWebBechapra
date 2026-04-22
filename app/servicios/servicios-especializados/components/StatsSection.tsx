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
    <section className="py-20 px-6 border-b border-blue-100/80 dark:border-slate-800" style={{ background: "var(--surface-section-white)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-flex items-center rounded-full border px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em]" style={{ color: "var(--brand-primary)", borderColor: "var(--surface-border)", backgroundColor: "var(--background)" }}>
            Indicadores clave
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            const isFeatured = i === 1;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`text-center p-8 rounded-[2rem] border transition-all duration-300 cursor-pointer ${isFeatured ? "md:-translate-y-3" : ""}`}
                style={{
                  background: isFeatured
                    ? "linear-gradient(180deg, rgba(37,99,235,0.10) 0%, rgba(255,255,255,0.98) 100%)"
                    : "var(--surface-card)",
                  borderColor: isFeatured ? "rgba(37,99,235,0.30)" : "var(--surface-border)",
                  boxShadow: isFeatured
                    ? "0 20px 50px rgba(37,99,235,0.16)"
                    : "0 12px 32px rgba(15,23,42,0.06)",
                }}
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl" style={{ backgroundColor: isFeatured ? "var(--brand-primary)" : "rgba(37,99,235,0.10)" }}>
                  <Icon size={32} className={isFeatured ? "text-white" : "text-blue-600 dark:text-blue-400"} />
                </div>
                <div className="text-4xl md:text-5xl font-black text-blue-600 dark:text-blue-400 mb-2 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-base font-semibold" style={{ color: "var(--foreground)" }}>
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
