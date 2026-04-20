"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { TranslateText } from "@/components/TranslateText";
import Section from "@/app/components/Section";

const faqs = [
  {
    q: "¿Qué tipo de empresas atienden?",
    a: "Brindamos consultoría estratégica a organizaciones de todos los niveles: desde startups en crecimiento y PYMEs, hasta corporativos multinacionales con operaciones complejas.",
  },
  {
    q: "¿Ofrecen servicios a nivel nacional?",
    a: "Sí, contamos con cobertura total en el territorio mexicano y alianzas estratégicas globales que nos permiten ejecutar proyectos de escala internacional con la misma calidad.",
  },
  {
    q: "¿Puedo solicitar una consultoría personalizada?",
    a: "Absolutamente. Diseñamos cada solución desde cero basándonos en un diagnóstico profundo. Agende una sesión estratégica inicial sin compromiso para explorar sus necesidades.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section variant="white" size="lg">
      <div className="max-w-4xl mx-auto">
        {/* Header Unificado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full text-xs font-black uppercase tracking-widest mb-4 border border-blue-100 dark:border-blue-800/50">
            <HelpCircle size={14} />
            Resolviendo Dudas
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">
            <TranslateText text="Preguntas" />{" "}
            <span className="bg-linear-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Frecuentes
            </span>
          </h2>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4 mb-20">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className={`w-full text-left p-8 rounded-[2rem] border transition-all duration-500 group ${
                  openIndex === i 
                    ? "bg-white dark:bg-slate-900 border-blue-200 dark:border-blue-800 shadow-2xl shadow-blue-900/5" 
                    : "bg-slate-50/50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 hover:border-blue-100 dark:hover:border-blue-900/30"
                }`}
              >
                <div className="flex items-center justify-between gap-6">
                  <h3 className={`text-lg lg:text-xl font-black transition-colors duration-300 ${
                    openIndex === i ? "text-blue-700 dark:text-blue-400" : "text-slate-900 dark:text-white"
                  }`}>
                    <TranslateText text={faq.q} />
                  </h3>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                    openIndex === i ? "bg-blue-600 text-white rotate-180 shadow-lg shadow-blue-600/30" : "bg-white dark:bg-slate-800 text-slate-400"
                  }`}>
                    <ChevronDown size={24} />
                  </div>
                </div>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="text-lg text-slate-600 dark:text-slate-400 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 leading-relaxed font-medium">
                        <TranslateText text={faq.a} />
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Floating Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center p-10 rounded-[2.5rem] bg-blue-50 dark:bg-slate-900/50 border border-blue-100 dark:border-slate-800"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <p className="text-lg font-black text-slate-900 dark:text-white">
              <TranslateText text="¿Aún tiene dudas estratégicas?" />
            </p>
            <Link
              href="/#contacto"
              className="inline-flex items-center gap-3 px-8 py-4 bg-blue-700 text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl hover:bg-blue-600 hover:-translate-y-1 transition-all group"
            >
              <MessageCircle size={18} />
              <TranslateText text="Hablemos Ahora" />
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
