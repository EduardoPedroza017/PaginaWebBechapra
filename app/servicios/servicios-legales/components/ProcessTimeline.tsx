"use client";

import { motion } from "framer-motion";
import { TranslateText } from '@/components/TranslateText';

interface Step {
  step: string;
  title: string;
  desc: string;
}

interface ProcessTimelineProps {
  steps: Step[];
}

export default function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <section className="py-24 px-6 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
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
            <TranslateText text="Metodología" />
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            <TranslateText text="Cómo" />{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              <TranslateText text="trabajamos" />
            </span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-indigo-300 to-blue-200 dark:from-blue-800 dark:via-indigo-800 dark:to-blue-800 rounded-full transform -translate-y-1/2" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {steps.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative"
              >
                {/* Card */}
                <motion.div
                  whileHover={{ y: -8 }}
                  className="relative bg-gradient-to-br from-blue-50 via-indigo-50/50 to-slate-50 rounded-3xl p-8 shadow-xl border border-blue-100 hover:border-blue-300 transition-all duration-300"
                >
                  {/* Step Number */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="absolute -top-6 left-8 w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30"
                  >
                    <span className="text-xl font-black text-white">{item.step}</span>
                  </motion.div>

                  <div className="mt-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>

                {/* Connector Arrow */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 transform -translate-y-1/2 z-10">
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-full h-full bg-white rounded-full flex items-center justify-center shadow-lg border border-blue-200"
                    >
                      <span className="text-blue-500 font-bold">→</span>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
