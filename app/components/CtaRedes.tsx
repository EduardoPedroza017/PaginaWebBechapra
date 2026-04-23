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
        className="relative rounded-3xl overflow-hidden bg-slate-950 border border-white/10"
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
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-linear-to-br from-blue-900/40 via-slate-950/80 to-slate-950" />
        </div>

        {/* Content */}
        <div className="relative grid gap-8 p-8 md:p-12 lg:grid-cols-2 lg:gap-10 lg:p-16">
          {/* Left: CTA */}
          <div className="space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md md:p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white"
            >
              <MessageCircle className="w-4 h-4 text-blue-400" />
              <TranslateText text="Conecta con nosotros" />
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-black leading-tight tracking-tighter text-white sm:text-4xl md:text-5xl"
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
              className="max-w-lg text-lg font-medium leading-relaxed text-slate-300"
            >
              <TranslateText text="¿Listo para llevar tu negocio al siguiente nivel? Agenda una reunión con nuestros especialistas y descubre cómo podemos ayudarte." />
            </motion.p>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              href="#contacto"
              className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-blue-600 px-8 py-4 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-blue-900/20 transition-all hover:-translate-y-0.5 hover:bg-blue-500"
            >
              <TranslateText text="¡Agenda ahora!" />
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
                    <Image src={link.icon} alt="" width={32} height={32} className="object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
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
