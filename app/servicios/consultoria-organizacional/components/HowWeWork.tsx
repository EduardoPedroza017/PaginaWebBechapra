"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';

interface HowWeWorkProps {
  title: string;
  description: string;
  steps: string[];
}

export default function HowWeWork({ title, description, steps }: HowWeWorkProps) {
  return (
    <section className="relative w-screen -ml-[calc(50vw-50%)] py-24 px-6 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-slate-50 dark:from-slate-950 dark:via-blue-950/30 dark:to-slate-900 overflow-hidden">
      {/* Decorative */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-br from-blue-200/30 to-indigo-200/20 dark:from-blue-900/20 dark:to-indigo-900/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-gradient-to-tl from-blue-200/25 to-blue-200/15 dark:from-blue-900/15 dark:to-blue-800/8 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-3xl blur-2xl" />
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 border border-blue-200 dark:border-blue-800 shadow-2xl flex items-center justify-center">
              {/* Process Visual */}
              <div className="p-8 space-y-4 w-full">
                {steps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.15 }}
                    className="flex items-center gap-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 shadow-md"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 rounded-lg flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-sm">{i + 1}</span>
                    </div>
                    <span className="text-blue-900 dark:text-blue-100 font-semibold text-sm"><TranslateText text={step} /></span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-black text-blue-900 dark:text-white mb-6 tracking-tight">
              <TranslateText text={title} />
            </h2>
            <p className="text-lg text-blue-800/80 dark:text-slate-300 leading-relaxed mb-8">
              <TranslateText text={description} />
            </p>

            <div className="space-y-4">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-start gap-3 group"
                >
                  <div className="w-6 h-6 min-w-[24px] rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                  <span className="text-blue-900 dark:text-slate-200 font-medium leading-relaxed">
                    <TranslateText text={step} />
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
