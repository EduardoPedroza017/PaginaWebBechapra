"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
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
    <section id="contacto" className="py-24 px-6 bg-gradient-to-b from-emerald-50/30 to-white">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
            <ShieldCheck size={16} />
            Contáctanos
          </div>
          <h3 className="text-3xl md:text-4xl font-black text-emerald-700 mb-4 tracking-tight">
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
          className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-emerald-100"
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
