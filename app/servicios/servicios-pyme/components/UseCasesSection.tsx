"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Briefcase, Store, TrendingUp } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';

interface UseCase {
  title: string;
  desc: string;
}

interface UseCasesSectionProps {
  useCases: UseCase[];
}

const icons = [ShoppingCart, Briefcase, Store, TrendingUp];

export default function UseCasesSection({ useCases }: UseCasesSectionProps) {
  return (
    <section className="relative w-screen -ml-[calc(50vw-50%)] py-24 px-6 bg-gradient-to-br from-blue-50 via-blue-50/50 to-blue-50/30 dark:from-slate-950 dark:via-blue-950/30 dark:to-slate-900 overflow-hidden">
      {/* Decorative */}
      <div className="absolute -top-20 -right-20 w-56 h-56 bg-gradient-to-br from-blue-200 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/20 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-gradient-to-tl from-blue-200 to-blue-200 dark:from-blue-900/25 dark:to-blue-800/15 rounded-full blur-3xl opacity-40" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold mb-4"
          >
            <TranslateText text="Industrias" />
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            <TranslateText text="Casos de" />{" "}
            <span className="bg-gradient-to-r from-blue-500 to-blue-400 dark:from-blue-400 dark:to-blue-500 bg-clip-text text-transparent">
              <TranslateText text="uso" />
            </span>
          </h2>
        </motion.div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-white dark:bg-slate-800 rounded-2xl p-6 border border-blue-100 dark:border-slate-700 shadow-lg hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 cursor-pointer"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 mb-4 bg-gradient-to-br from-blue-500 to-blue-400 dark:from-blue-600 dark:to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 dark:shadow-blue-900/20"
                >
                  <Icon className="w-6 h-6 text-white" />
                </motion.div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <TranslateText text={useCase.title} />
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  <TranslateText text={useCase.desc} />
                </p>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 dark:from-blue-500 dark:via-blue-400 dark:to-blue-500 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
