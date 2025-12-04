"use client";

import { motion } from "framer-motion";
import { HelpCircle, ChevronDown, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const faqs = [
  {
    q: "¿Qué tipo de empresas atienden?",
    a: "Trabajamos con empresas de todos los tamaños y sectores, desde pymes hasta corporativos multinacionales.",
  },
  {
    q: "¿Ofrecen servicios a nivel nacional?",
    a: "Sí, tenemos cobertura en todo México y alianzas estratégicas internacionales para proyectos globales.",
  },
  {
    q: "¿Puedo solicitar una consultoría personalizada?",
    a: "Por supuesto, agenda una llamada sin compromiso y diseñamos una solución totalmente adaptada a tus necesidades.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold mb-4">
            <HelpCircle size={16} />
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Preguntas{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
              Frecuentes
            </span>
          </h2>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4 mb-12">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 text-left group"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {faq.q}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors"
                  >
                    <ChevronDown
                      size={20}
                      className="text-gray-600 group-hover:text-blue-600"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === i ? "auto" : 0,
                    opacity: openIndex === i ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-gray-600 mt-4 pt-4 border-t border-gray-100 leading-relaxed">
                    {faq.a}
                  </p>
                </motion.div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-gray-600 mb-4">¿Tienes otra pregunta?</p>
          <Link
            href="/#contacto"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-600/25 transition-all duration-300"
          >
            <MessageCircle size={18} />
            Contáctanos
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
