"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';

interface Benefit {
  title: string;
  icon: LucideIcon;
}

interface BenefitsSectionProps {
  benefits: Benefit[];
}

export default function BenefitsSection({ benefits }: BenefitsSectionProps) {
  return (
    <section className="relative w-screen -ml-[calc(50vw-50%)] py-20 px-6 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-slate-50 dark:from-slate-950 dark:via-blue-950/30 dark:to-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group bg-white dark:bg-slate-800 rounded-2xl p-8 border border-blue-100 dark:border-slate-700 shadow-lg hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-5 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 rounded-2xl flex items-center justify-center group-hover:from-blue-500 group-hover:to-indigo-600 dark:group-hover:from-blue-600 dark:group-hover:to-indigo-700 transition-all duration-300">
                  <Icon
                    size={32}
                    className="text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors duration-300"
                  />
                </div>
                <h3 className="text-lg font-bold text-blue-900 dark:text-white leading-relaxed group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <TranslateText text={benefit.title} />
                </h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
