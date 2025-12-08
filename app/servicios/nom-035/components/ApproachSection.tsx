"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';

interface Step {
  num: string;
  title: string;
  desc: string;
  icon: LucideIcon;
}

interface ApproachSectionProps {
  title: string;
  steps: Step[];
}

export default function ApproachSection({ title, steps }: ApproachSectionProps) {
  return (
    <section id="enfoque" className="py-24 px-6 bg-white dark:bg-slate-900 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute -top-20 -right-20 w-56 h-56 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/20 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-gradient-to-tl from-blue-100 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 rounded-full blur-3xl opacity-40" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-black text-center mb-16 tracking-tight"
        >
          <span className="text-gray-900 dark:text-white"><TranslateText text="Nuestro" /> </span>
          <span className="bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            <TranslateText text={title} />
          </span>
        </motion.h2>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="group relative bg-gradient-to-br from-blue-50 via-indigo-50/50 to-blue-50/30 dark:from-slate-800 dark:via-blue-950/30 dark:to-slate-800 rounded-3xl p-8 border border-blue-100 dark:border-slate-700 shadow-lg hover:shadow-2xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                {/* Large Number Background */}
                <div className="absolute -top-4 -right-4 text-[120px] font-black text-blue-500/10 dark:text-blue-400/10 leading-none pointer-events-none">
                  {step.num}
                </div>

                {/* Top Gradient Line */}
                <motion.div
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-400 dark:from-blue-600 dark:via-indigo-600 dark:to-blue-600 rounded-t-3xl"
                />

                {/* Icon */}
                <div className="relative w-16 h-16 bg-white dark:bg-slate-700 rounded-2xl flex items-center justify-center mb-6 border border-blue-200 dark:border-blue-700 shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Icon size={32} className="text-blue-600 dark:text-blue-400" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    <TranslateText text={step.title} />
                  </h3>
                  <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
                    <TranslateText text={step.desc} />
                  </p>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 to-indigo-400/0 group-hover:from-blue-400/5 group-hover:to-indigo-400/5 rounded-3xl transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
