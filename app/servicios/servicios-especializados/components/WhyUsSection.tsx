"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';

interface Reason {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface WhyUsProps {
  title: string;
  reasons: Reason[];
}

export default function WhyUsSection({ title, reasons }: WhyUsProps) {
  return (
    <section className="relative w-full py-24 px-6 overflow-hidden" style={{ background: "var(--surface-section-blue)" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center rounded-full border px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] mb-5" style={{ color: "var(--brand-primary)", borderColor: "var(--surface-border)", backgroundColor: "rgba(255,255,255,0.72)" }}>
            Diferenciadores
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            <TranslateText text={title} />
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            const isFeatured = i === 1;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`p-10 rounded-[2rem] border transition-all duration-300 cursor-pointer ${isFeatured ? "bg-slate-950 text-white md:-translate-y-3" : "bg-white dark:bg-slate-800"}`}
                style={{
                  borderColor: isFeatured ? "rgba(255,255,255,0.08)" : "rgba(37,99,235,0.16)",
                  boxShadow: isFeatured ? "0 24px 60px rgba(15,23,42,0.28)" : "0 18px 42px rgba(15,23,42,0.08)",
                }}
              >
                <Icon
                  size={40}
                  strokeWidth={2.5}
                  className={`mb-6 ${isFeatured ? "text-blue-400" : "text-blue-600 dark:text-blue-400"}`}
                />
                <h3 className={`text-2xl font-extrabold mb-4 tracking-tight ${isFeatured ? "text-white" : "text-gray-900 dark:text-white"}`}>
                  <TranslateText text={reason.title} />
                </h3>
                <p className={`text-base leading-relaxed ${isFeatured ? "text-slate-300" : "text-gray-700 dark:text-gray-300 opacity-75"}`}>
                  <TranslateText text={reason.desc} />
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
