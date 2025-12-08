"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';

interface Step {
  n: string;
  title: string;
  desc: string;
  icon: LucideIcon;
}

interface ProcessTimelineProps {
  title: string;
  steps: Step[];
}

export default function ProcessTimeline({ title, steps }: ProcessTimelineProps) {
  return (
    <section id="proceso" className="py-24 px-6 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-black text-center text-gray-900 dark:text-white mb-16 tracking-tight"
        >
          <TranslateText text={title} />
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line - Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-blue-600 to-blue-400 dark:from-blue-500 dark:via-blue-400 dark:to-blue-500 -translate-x-1/2 rounded-full" />

          <div className="space-y-8 lg:space-y-0">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative lg:grid lg:grid-cols-2 lg:gap-12 ${
                    i > 0 ? "lg:mt-[-60px]" : ""
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`${
                      isEven ? "lg:pr-16" : "lg:col-start-2 lg:pl-16"
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02, y: -4 }}
                      className="group relative bg-gradient-to-br from-white to-blue-50/30 dark:from-slate-800 dark:to-blue-950/30 rounded-2xl p-6 border border-blue-100 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 shadow-md hover:shadow-xl transition-all duration-300"
                    >
                      {/* Step Number */}
                      <div className="absolute -top-4 left-6 px-4 py-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full text-white text-sm font-bold shadow-md">
                        <TranslateText text={`Paso ${step.n}`} />
                      </div>

                      <div className="flex items-start gap-4 mt-4">
                        {/* Icon */}
                        <div className="w-12 h-12 min-w-[48px] bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 rounded-xl flex items-center justify-center group-hover:from-blue-400 group-hover:to-blue-600 transition-all duration-300">
                          <Icon
                            size={24}
                            className="text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors duration-300"
                          />
                        </div>

                        {/* Text */}
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {step.title}
                          </h3>
                          <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Center Dot - Desktop */}
                  <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white dark:bg-slate-800 border-4 border-blue-500 dark:border-blue-400 rounded-full shadow-lg z-10" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
