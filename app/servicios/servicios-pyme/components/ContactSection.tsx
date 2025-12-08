"use client";

import { motion } from "framer-motion";
import { Send, Rocket, Phone, Mail, MapPin } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';

export default function ContactSection() {
  return (
    <section id="contacto" className="py-24 px-6 bg-gradient-to-b from-blue-50/30 to-white dark:from-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 0.6 }}
            className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-400 dark:from-blue-600 dark:to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 dark:shadow-blue-900/30"
          >
            <Rocket className="w-8 h-8 text-white" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            <TranslateText text="¿Listo para profesionalizar" />{" "}
            <span className="bg-gradient-to-r from-blue-500 to-blue-400 dark:from-blue-400 dark:to-blue-500 bg-clip-text text-transparent">
              <TranslateText text="tu PYME?" />
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            <TranslateText text="Contáctanos y recibe una consultoría gratuita para diseñar la solución ideal para tu empresa." />
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              { icon: Phone, label: "Teléfono", value: "+52 (55) 1234-5678" },
              { icon: Mail, label: "Email", value: "pyme@bechapra.com" },
              { icon: MapPin, label: "Ubicación", value: "Ciudad de México, MX" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 8 }}
                className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-blue-100 dark:border-slate-700 shadow-sm hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all cursor-pointer"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-400 dark:from-blue-600 dark:to-blue-500 rounded-xl flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400"><TranslateText text={item.label} /></p>
                  <p className="font-semibold text-gray-900 dark:text-white">{item.value}</p>
                </div>
              </motion.div>
            ))}

            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="p-6 bg-gradient-to-br from-blue-500 to-blue-400 dark:from-blue-600 dark:to-blue-500 rounded-2xl text-white"
            >
              <h4 className="font-bold mb-2"><TranslateText text="Más de 200+ PYMEs confían en nosotros" /></h4>
              <p className="text-sm text-blue-100 dark:text-blue-200"><TranslateText text="Soluciones adaptadas al tamaño de tu negocio." /></p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-slate-700">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                      <TranslateText text="Nombre completo" />
                    </label>
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all outline-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                      <TranslateText text="Email" />
                    </label>
                    <input
                      type="email"
                      placeholder="tu@email.com"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all outline-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                      <TranslateText text="Empresa" />
                    </label>
                    <input
                      type="text"
                      placeholder="Nombre de tu empresa"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all outline-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                      <TranslateText text="Número de empleados" />
                    </label>
                    <select className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all outline-none text-gray-900 dark:text-white">
                      <option>1-10</option>
                      <option>11-50</option>
                      <option>51-100</option>
                      <option>100+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    <TranslateText text="¿Cómo podemos ayudarte?" />
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Cuéntanos sobre tu negocio y tus necesidades..."
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all outline-none resize-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-400 dark:from-blue-600 dark:to-blue-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-500/30 dark:shadow-blue-900/30 hover:shadow-blue-500/50 dark:hover:shadow-blue-900/50 transition-all flex items-center justify-center gap-3"
                >
                  <Send className="w-5 h-5" />
                  <TranslateText text="Enviar solicitud" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
