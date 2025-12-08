"use client";

import { motion } from "framer-motion";
import { Mail, Rocket } from "lucide-react";
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
    <section id="contacto" className="py-24 px-6 bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold mb-4">
            <Rocket size={16} />
            <TranslateText text="Comienza hoy" />
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-blue-600 dark:text-blue-400 mb-4">
            <TranslateText text={title} />
          </h2>
          <p className="text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto"><TranslateText text={subtitle} /></p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-slate-800 dark:to-blue-950/30 rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100 dark:border-slate-700"
        >
          <ContactForm />
        </motion.div>

        {/* Alternative Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-500 dark:text-slate-400 mb-2">
            <TranslateText text="¿Prefieres contactarnos directamente?" />
          </p>
          <a
            href="mailto:contacto@bechapra.com"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            <Mail size={18} />
            contacto@bechapra.com
          </a>
        </motion.div>
      </div>
    </section>
  );
}
