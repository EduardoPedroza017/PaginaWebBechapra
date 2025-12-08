"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';

interface FAQ {
  q: string;
  a: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="relative w-screen -ml-[calc(50vw-50%)] py-24 px-6 bg-gradient-to-br from-blue-50 via-blue-50/50 to-blue-50/30 dark:from-slate-950 dark:via-blue-950/30 dark:to-slate-900">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 0.6 }}
            className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-400 dark:from-blue-600 dark:to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 dark:shadow-blue-900/30"
          >
            <HelpCircle className="w-8 h-8 text-white" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            <TranslateText text="Preguntas" />{" "}
            <span className="bg-gradient-to-r from-blue-500 to-blue-400 dark:from-blue-400 dark:to-blue-500 bg-clip-text text-transparent">
              <TranslateText text="frecuentes" />
            </span>
          </h2>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-blue-100 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-600 transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className="font-semibold text-gray-900 dark:text-white pr-4"><TranslateText text={faq.q} /></span>
                <motion.div
                  animate={{ rotate: openFaq === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-100 dark:from-blue-900/50 dark:to-blue-800/50 rounded-full flex items-center justify-center"
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
                      <div className="pt-2 border-t border-blue-100 dark:border-slate-700">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed pt-4"><TranslateText text={faq.a} /></p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
