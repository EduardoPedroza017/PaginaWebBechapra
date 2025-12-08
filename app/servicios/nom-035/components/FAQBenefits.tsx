"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon, Plus } from "lucide-react";
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
    <section className="relative w-screen -ml-[calc(50vw-50%)] py-24 px-6 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-blue-50/30 dark:from-slate-950 dark:via-blue-950/30 dark:to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-black text-center mb-16 tracking-tight text-blue-900 dark:text-white"
        >
          <TranslateText text="Preguntas frecuentes" />
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* FAQs */}
          <div>
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-6">
              <TranslateText text="Dudas comunes" />
            </h3>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="rounded-2xl border-2 border-blue-100 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-shadow"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className={`w-full px-6 py-5 flex justify-between items-center text-left transition-all duration-300 ${
                      openFaq === i
                        ? "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50"
                        : "bg-white dark:bg-slate-800 hover:bg-blue-50/50 dark:hover:bg-slate-700"
                    }`}
                  >
                    <span className="text-base font-bold text-blue-900 dark:text-blue-200 pr-4">
                      <TranslateText text={faq.q} />
                    </span>
                    <motion.div
                      animate={{ rotate: openFaq === i ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        openFaq === i
                          ? "bg-gradient-to-br from-blue-500 to-indigo-500 dark:from-blue-600 dark:to-indigo-600 text-white"
                          : "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
                      }`}
                    >
                      <Plus size={20} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 py-5 bg-gradient-to-b from-blue-50/50 to-white dark:from-blue-950/30 dark:to-slate-800 border-t border-blue-100 dark:border-slate-700">
                          <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
                            <TranslateText text={faq.a} />
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h3 className="text-xl font-bold text-blue-800 mb-6">
              Beneficios clave
            </h3>
            <div className="space-y-5">
              {benefits.map((benefit, i) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                    whileHover={{ x: 8 }}
                    className="group bg-gradient-to-br from-white to-blue-50/50 rounded-2xl p-6 border-2 border-blue-100 hover:border-blue-300 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 min-w-[48px] bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Icon size={24} className="text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-blue-900 mb-1 group-hover:text-blue-600 transition-colors">
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
