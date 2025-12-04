"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon, Plus } from "lucide-react";

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
    <section className="relative w-screen -ml-[calc(50vw-50%)] py-24 px-6 bg-gradient-to-br from-emerald-50 via-teal-50/50 to-cyan-50/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-black text-center mb-16 tracking-tight text-emerald-900"
        >
          Preguntas frecuentes
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* FAQs */}
          <div>
            <h3 className="text-xl font-bold text-emerald-800 mb-6">
              Dudas comunes
            </h3>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="rounded-2xl border-2 border-emerald-100 overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className={`w-full px-6 py-5 flex justify-between items-center text-left transition-all duration-300 ${
                      openFaq === i
                        ? "bg-gradient-to-r from-emerald-50 to-teal-50"
                        : "bg-white hover:bg-emerald-50/50"
                    }`}
                  >
                    <span className="text-base font-bold text-emerald-900 pr-4">
                      {faq.q}
                    </span>
                    <motion.div
                      animate={{ rotate: openFaq === i ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        openFaq === i
                          ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white"
                          : "bg-emerald-100 text-emerald-600"
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
                        <div className="px-6 py-5 bg-gradient-to-b from-emerald-50/50 to-white border-t border-emerald-100">
                          <p className="text-gray-600 leading-relaxed">
                            {faq.a}
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
            <h3 className="text-xl font-bold text-emerald-800 mb-6">
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
                    className="group bg-gradient-to-br from-white to-emerald-50/50 rounded-2xl p-6 border-2 border-emerald-100 hover:border-emerald-300 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 min-w-[48px] bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Icon size={24} className="text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-emerald-900 mb-1 group-hover:text-emerald-600 transition-colors">
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
