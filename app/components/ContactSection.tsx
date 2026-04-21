"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import ContactForm from "./ContactForm";
import { TranslateText } from "@/components/TranslateText";
import Section from "./Section";

const contactInfo = [
  { icon: Phone, label: "Teléfono", value: "+52 (442) 123 4567" },
  { icon: Mail, label: "Email", value: "contacto@bausen.com" },
  { icon: MapPin, label: "Ubicación", value: "Querétaro, México" },
];

export default function ContactSection() {
  return (
    <Section variant="white" size="lg">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Info Side */}
        <div className="space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[--background] dark:bg-blue-900/20 text-[--brand-primary] dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              <MessageSquare size={14} />
              <TranslateText text="Contacto Directo" />
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-[--foreground] dark:text-white tracking-tighter mb-6 italic">
              <TranslateText text="Hablemos de su" />{' '}
              <span className="text-[--brand-accent] dark:text-blue-400">
                <TranslateText text="proyecto" />
              </span>
            </h2>
            <p className="text-lg text-[--foreground] dark:text-slate-400 font-medium leading-relaxed text-justify">
              <TranslateText text="Estamos aquí para transformar su operación con soluciones estratégicas de alto impacto. Nuestro equipo está listo para atenderle." />
            </p>
          </motion.div>

          <div className="space-y-6">
            {contactInfo.map((item, i) => (
              <div key={i} className="flex items-center gap-6 p-6 rounded-2xl bg-[--surface-card] dark:bg-slate-900 border border-[--surface-border] dark:border-slate-800">
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-[--brand-primary] dark:text-blue-400 shadow-sm">
                  <item.icon size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-[--foreground] mb-1">{item.label}</div>
                  <div className="text-sm font-bold text-[--brand-accent] dark:text-white">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Side */}
        <div className="bg-[--surface-card] dark:bg-slate-900 rounded-3xl p-8 lg:p-12 border border-[--surface-border] dark:border-slate-800">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}