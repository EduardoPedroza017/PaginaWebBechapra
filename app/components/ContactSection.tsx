"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, MessageSquare } from "lucide-react";
import ContactForm from "./ContactForm";

const contactInfo = [
  { icon: Phone, label: "Teléfono", value: "+52 (442) 123 4567" },
  { icon: Mail, label: "Email", value: "contacto@bechapra.com" },
  { icon: MapPin, label: "Ubicación", value: "Querétaro, México" },
  { icon: Clock, label: "Horario", value: "Lun - Vie: 9:00 - 18:00" },
];

export default function ContactSection() {
  return (
    <div className="relative">
      {/* Background decorations */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-cyan-50 rounded-full blur-3xl opacity-50" />

      <div className="relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4"
          >
            <MessageSquare className="w-4 h-4" />
            ¿Listo para conectar?
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Hablemos sobre{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              tu proyecto
            </span>
          </h2>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Cuéntanos tus ideas, necesidades o dudas y nuestro equipo te contactará a la brevedad. 
            ¡Estamos aquí para ayudarte a transformar tu operación!
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Info Cards */}
            <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-3xl p-8 text-white">
              <h3 className="text-xl font-bold mb-6">Información de Contacto</h3>

              <div className="space-y-6">
                {contactInfo.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-blue-300" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-300 font-medium">{item.label}</p>
                      <p className="text-white font-semibold">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-sm text-blue-300 mb-4">Síguenos en redes</p>
                <div className="flex gap-3">
                  {["facebook", "instagram", "linkedin", "twitter"].map((social) => (
                    <motion.a
                      key={social}
                      href="#"
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    >
                      <span className="text-xs text-white uppercase font-bold">{social[0]}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="bg-slate-100 rounded-2xl h-48 flex items-center justify-center overflow-hidden"
            >
              <div className="text-center">
                <MapPin className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-500">Querétaro, México</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Envíanos un mensaje</h3>
              <p className="text-slate-600 mb-8">Completa el formulario y te contactaremos pronto.</p>
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
