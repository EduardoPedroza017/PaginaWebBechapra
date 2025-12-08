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
    <section className="relative w-screen -ml-[calc(50vw-50%)] py-20 px-6 bg-gradient-to-br from-blue-50 via-blue-50/50 to-blue-100/50 dark:from-slate-950 dark:via-blue-950/30 dark:to-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white text-center mb-12 tracking-tight"
        >
          <TranslateText text={title} />
        </motion.h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white dark:bg-slate-800 p-10 rounded-3xl border-2 border-blue-100 dark:border-slate-700 hover:border-blue-600 dark:hover:border-blue-600 hover:shadow-xl hover:shadow-blue-600/15 dark:hover:shadow-blue-900/30 transition-all duration-300 cursor-pointer"
              >
                <Icon
                  size={40}
                  strokeWidth={2.5}
                  className="text-blue-600 dark:text-blue-400 mb-6"
                />
                <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
                  <TranslateText text={reason.title} />
                </h3>
                <p className="text-base text-gray-700 dark:text-gray-300 opacity-75 leading-relaxed">
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
