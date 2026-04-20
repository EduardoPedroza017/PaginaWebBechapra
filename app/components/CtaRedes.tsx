"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { socialLinks } from "./data/homeData";
import { TranslateText } from "@/components/TranslateText";

export default function CtaRedes() {
  return (
    <div className="relative">
      {/* Main Card - Flat Colors */}
      <motion.div
        className="relative rounded-3xl overflow-hidden bg-slate-900 dark:bg-slate-950 border border-slate-800"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Background Image - Clean Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/web/image/agenda/ahenda.avif"
            alt="BAUSEN Business Services"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-slate-900/90" />
        </div>

        {/* Content */}
        <div className="relative grid lg:grid-cols-2 gap-8 p-10 md:p-16 lg:p-20">
          {/* Left: CTA */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] bg-blue-700/20 text-blue-400"
            >
              <MessageCircle className="w-4 h-4" />
              <TranslateText text="Conecta con nosotros" />
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tighter italic"
            >
              <TranslateText text="Juntos trazamos" />
              <br />
              <span className="text-blue-500">
                <TranslateText text="tu camino al éxito" />
              </span>
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-lg max-w-lg text-slate-300 font-medium text-justify"
            >
              <TranslateText text="¿Listo para llevar tu negocio al siguiente nivel? Agenda una reunión con nuestros especialistas y descubre cómo podemos ayudarte." />
            </motion.p>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              href="#contacto"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all bg-white text-slate-900 hover:bg-slate-100"
            >
              <TranslateText text="¡Agenda ahora!" />
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>

          {/* Right: Social Links - Simplified */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center justify-center lg:items-end"
          >
            <h4 className="text-lg font-bold text-white mb-8"><TranslateText text="¡Síguenos en redes!" /></h4>

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
                  className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                  aria-label={`Visitar ${link.name}`}
                >
                  <div className="w-10 h-10 flex items-center justify-center">
                    <Image src={link.icon} alt="" width={32} height={32} className="object-contain invert" />
                  </div>
                  <span className="text-[10px] text-white/70 font-black uppercase tracking-widest">{link.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
