"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';
import ContactForm from "@/app/components/ContactForm";

interface ContactSectionProps {
  title?: string;
  subtitle?: string;
}

export default function ContactSection({
  title = "¿Listo para transformar tu operación?",
  subtitle = "Contáctanos y recibe una consultoría gratuita para diseñar la solución especializada que tu empresa necesita.",
}: ContactSectionProps) {
  return (
    <section id="contacto" className="py-24 px-6 bg-gradient-to-b from-blue-50/30 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold mb-4">
            <ShieldCheck size={16} />
            <TranslateText text="Contáctanos" />
          </div>
          <h3 className="text-3xl md:text-4xl font-black text-blue-700 dark:text-blue-400 mb-4 tracking-tight">
            <TranslateText text={title} />
          </h3>
          <p className="text-xl text-gray-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            <TranslateText text={subtitle} />
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-10 shadow-lg border border-blue-100 dark:border-slate-700"
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
