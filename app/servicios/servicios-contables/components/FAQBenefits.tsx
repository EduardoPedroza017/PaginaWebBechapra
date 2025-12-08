"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon, ChevronDown } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';

interface FAQ {
  q: string;
  a: string;
}

interface Benefit {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface FAQBenefitsProps {
  faqs: FAQ[];
  benefits: Benefit[];
}

export default function FAQBenefits({ faqs, benefits }: FAQBenefitsProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            <TranslateText text="Preguntas" />{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              <TranslateText text="frecuentes" />
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* FAQ Column */}
          <div>
            <h3 className="text-xl font-bold text-blue-900 dark:text-blue-300 mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-600 dark:to-indigo-600 rounded-full" />
              <TranslateText text="Dudas comunes" />
            </h3>
            
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="border border-blue-100 dark:border-slate-700 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50/50 to-white dark:from-slate-800 dark:to-slate-800 hover:border-blue-200 dark:hover:border-blue-700 transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left"
                  >
                    <span className="font-semibold text-gray-900 dark:text-white pr-4"><TranslateText text={faq.q} /></span>
                    <motion.div
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center"
                    >
                      <ChevronDown className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-5">
                          <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Benefits Column */}
          <div>
            <h3 className="text-xl font-bold text-blue-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
              Beneficios clave
            </h3>

            <div className="space-y-4">
              {benefits.map((benefit, i) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ x: 8, scale: 1.02 }}
                    className="group relative bg-gradient-to-br from-blue-50 via-indigo-50/50 to-slate-50 rounded-2xl p-6 border border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
                  >
                    {/* Left accent */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-indigo-500 to-cyan-400 rounded-l-2xl" />

                    <div className="flex items-start gap-4 pl-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">
                          {benefit.title}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {benefit.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
