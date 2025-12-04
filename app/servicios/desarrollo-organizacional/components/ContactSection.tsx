"use client";

import { motion } from "framer-motion";
import { MessageSquare, Mail, Rocket } from "lucide-react";
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
    <section id="contacto" className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            <Rocket size={16} />
            Comienza hoy
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-blue-600 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100"
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
          <p className="text-gray-500 mb-2">
            ¿Prefieres contactarnos directamente?
          </p>
          <a
            href="mailto:contacto@bechapra.com"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
          >
            <Mail size={18} />
            contacto@bechapra.com
          </a>
        </motion.div>
      </div>
    </section>
  );
}
