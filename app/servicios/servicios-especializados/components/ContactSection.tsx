"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { TranslateText } from '@/components/TranslateText';

const ContactForm = dynamic(() => import("@/app/components/ContactForm"), {
  ssr: false,
});

interface ContactSectionProps {
  title?: string;
  subtitle?: string;
}

export default function ContactSection({
  title = "Listo para transformar tu operacion?",
  subtitle = "Contactanos y recibe una consultoria gratuita para disenar la solucion especializada que tu empresa necesita.",
}: ContactSectionProps) {
  return (
    <section
      id="contacto"
      className="relative w-screen -ml-[calc(50vw-50%)] py-20 px-6 bg-white dark:bg-slate-900 border-t border-blue-100 dark:border-slate-800 overflow-hidden"
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h3 className="text-3xl md:text-4xl font-black text-blue-700 dark:text-blue-400 mb-4 tracking-tight">
            <TranslateText text={title} />
          </h3>
          <p className="text-xl text-gray-700 dark:text-gray-300 opacity-80 leading-relaxed max-w-2xl mx-auto">
            <TranslateText text={subtitle} />
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
