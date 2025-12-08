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
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 via-orange-500 to-amber-400 -translate-x-1/2 rounded-full" />

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
                      className="group relative bg-gradient-to-br from-white to-amber-50/30 rounded-2xl p-6 border border-amber-100 hover:border-amber-300 shadow-md hover:shadow-xl transition-all duration-300"
                    >
                      {/* Step Number */}
                      <div className="absolute -top-4 left-6 px-4 py-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full text-white text-sm font-bold shadow-md">
                        Paso {step.n}
                      </div>

                      <div className="flex items-start gap-4 mt-4">
                        {/* Icon */}
                        <div className="w-12 h-12 min-w-[48px] bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center group-hover:from-amber-400 group-hover:to-orange-500 transition-all duration-300">
                          <Icon
                            size={24}
                            className="text-amber-600 group-hover:text-white transition-colors duration-300"
                          />
                        </div>

                        {/* Text */}
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                            {step.title}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Center Dot - Desktop */}
                  <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white border-4 border-amber-500 rounded-full shadow-lg z-10" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
