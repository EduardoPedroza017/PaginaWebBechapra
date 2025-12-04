"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare } from "lucide-react";
import ContactForm from "@/app/components/ContactForm";

interface ContactSectionProps {
  title?: string;
  subtitle?: string;
}

export default function ContactSection({
  title = "Contáctanos",
  subtitle = "Estamos listos para ayudarte a transformar tu empresa",
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
            <MessageSquare size={16} />
            Contacto
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            {title.split(" ").slice(0, 1).join(" ")}{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {title.split(" ").slice(1).join(" ") || "Contáctanos"}
            </span>
          </h2>
          <p className="text-xl text-gray-600">{subtitle}</p>
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
