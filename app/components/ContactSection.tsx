"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import ContactForm from "./ContactForm";
import { TranslateText } from "@/components/TranslateText";

const contactInfo = [
  { icon: Phone, label: "Telefono", value: "+52 (442) 123 4567" },
  { icon: Mail, label: "Email", value: "contacto@bausen.com" },
  { icon: MapPin, label: "Ubicacion", value: "Queretaro, Mexico" },
];

export default function ContactSection() {
  return (
    <div className="relative py-8 sm:py-12">
      <div
        className="absolute inset-x-0 top-0 h-72 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(33,130,255,0.08), transparent 65%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-[0.2em] mb-6 border"
              style={{
                backgroundColor: "var(--background)",
                color: "var(--brand-primary)",
                borderColor: "var(--surface-border)",
              }}
            >
              <MessageSquare size={14} />
              <TranslateText text="Contacto Directo" />
            </span>

            <h2
              className="text-4xl lg:text-5xl font-black tracking-tighter mb-6 italic"
              style={{ color: "var(--foreground)" }}
            >
              <TranslateText text="Hablemos de su" />{" "}
              <span style={{ color: "var(--brand-accent)" }}>
                <TranslateText text="proyecto" />
              </span>
            </h2>

            <p
              className="text-lg font-medium leading-relaxed text-justify"
              style={{ color: "var(--foreground)" }}
            >
              <TranslateText text="Estamos aqui para transformar su operacion con soluciones estrategicas de alto impacto. Nuestro equipo esta listo para atenderle." />
            </p>
          </motion.div>

          <div className="space-y-6">
            {contactInfo.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-6 p-6 rounded-2xl border"
                style={{
                  backgroundColor: "var(--surface-card)",
                  borderColor: "var(--surface-border)",
                  boxShadow: "0 14px 30px rgba(15,23,42,0.04)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
                  style={{
                    backgroundColor: "#ffffff",
                    color: "var(--brand-primary)",
                  }}
                >
                  <item.icon size={20} />
                </div>
                <div>
                  <div
                    className="text-[10px] font-black uppercase tracking-widest mb-1"
                    style={{ color: "var(--foreground)" }}
                  >
                    {item.label}
                  </div>
                  <div className="text-sm font-bold" style={{ color: "var(--brand-accent)" }}>
                    {item.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="rounded-3xl p-8 lg:p-12 border"
          style={{
            backgroundColor: "var(--surface-card)",
            borderColor: "var(--surface-border)",
            boxShadow: "0 30px 80px rgba(15,23,42,0.08)",
          }}
        >
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
