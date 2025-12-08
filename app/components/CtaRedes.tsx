"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { socialLinks } from "./data/homeData";
import { TranslateText } from "@/components/TranslateText";

export default function CtaRedes() {
  return (
    <div className="relative">
      {/* Main Card */}
      <motion.div
        className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/image/agenda/ahenda.avif"
            alt="Bechapra Business Services"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/80" />
        </div>

        {/* Content */}
        <div className="relative grid lg:grid-cols-2 gap-8 p-8 md:p-12 lg:p-16">
          {/* Left: CTA */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-blue-900/40 text-blue-500 dark:bg-blue-900/60 dark:text-blue-400"
            >
              <MessageCircle className="w-4 h-4" />
              <TranslateText text="Conecta con nosotros" />
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight"
            >
              <TranslateText text="Juntos trazamos" />
              <br />
              <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-500">
                <TranslateText text="tu camino al éxito" />
              </span>
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-lg max-w-lg text-slate-300 dark:text-slate-400"
            >
              <TranslateText text="¿Listo para llevar tu negocio al siguiente nivel? Agenda una reunión con nuestros especialistas y descubre cómo podemos ayudarte." />
            </motion.p>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              href="#contacto"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all bg-white text-slate-900 dark:bg-blue-500 dark:text-white"
            >
              <TranslateText text="¡Agenda ahora!" />
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>

          {/* Right: Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center justify-center lg:items-end"
          >
            <h4 className="text-lg font-bold text-white mb-6"><TranslateText text="¡Síguenos en redes!" /></h4>

            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
                  aria-label={`Visitar ${link.name}`}
                >
                  <div className="w-12 h-12 flex items-center justify-center">
                    <Image src={link.icon} alt="" width={40} height={40} className="object-contain brightness-0 invert" />
                  </div>
                  <span className="text-xs text-white/80 font-medium text-center">{link.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
