"use client";

import { motion } from "framer-motion";
import { TranslateText } from '@/components/TranslateText';
import ContactForm from "@/app/components/ContactForm";

interface ContactSectionProps {
  title?: string;
}

export default function ContactSection({
  title = "Contactanos",
}: ContactSectionProps) {
  return (
    <section id="contacto" className="py-20 px-6 bg-gray-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-black text-blue-900 dark:text-white text-center mb-12 tracking-tight"
        >
          <TranslateText text={title} />
        </motion.h2>

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
