"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface Step {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface ProcessStepsProps {
  title: string;
  steps: Step[];
  tip?: string;
}

export default function ProcessSteps({ title, steps, tip }: ProcessStepsProps) {
  return (
    <section id="proceso" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-black text-center text-gray-900 mb-16 tracking-tight"
        >
          {title}
        </motion.h2>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 -translate-y-1/2 rounded-full" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  className="relative"
                >
                  <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-3xl p-8 pt-16 border-2 border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
                    {/* Step Number */}
                    <div className="absolute -top-8 left-8 w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-xl shadow-blue-600/30 border-4 border-white">
                      {i + 1}
                    </div>

                    {/* Icon */}
                    <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-5 shadow-md border border-blue-100">
                      <Icon size={28} className="text-blue-600" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-blue-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {/* Arrow */}
                  {i < steps.length - 1 && (
                    <div className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10">
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-blue-400 text-4xl font-bold"
                      >
                        →
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Tip Box */}
        {tip && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-16 max-w-3xl mx-auto"
          >
            <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 pl-20 border-2 border-blue-200">
              {/* Icon */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <div>
                <span className="font-bold text-blue-700 block mb-1">Consejo</span>
                <span className="text-gray-700">{tip}</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
