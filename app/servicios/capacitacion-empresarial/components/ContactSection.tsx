"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import ContactForm from "@/app/components/ContactForm";

interface ContactSectionProps {
  title?: string;
  subtitle?: string;
}

export default function ContactSection({
  title = "¿Interesado en nuestros servicios?",
  subtitle = "Envíanos un mensaje con los detalles y estaremos encantados de ayudarte.",
}: ContactSectionProps) {
  return (
    <section id="contacto" className="py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            <GraduationCap size={16} />
            Contáctanos
          </div>
          <h3 className="text-3xl md:text-4xl font-black text-blue-600 mb-4 tracking-tight">
            {title}
          </h3>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-blue-50/50 to-cyan-50/30 rounded-3xl p-8 md:p-10 shadow-lg border border-blue-100"
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
