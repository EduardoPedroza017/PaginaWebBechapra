"use client";

import Image from "next/image";
import { motion } from "framer-motion";




export default function HeroSection() {
  return (
    <section className="relative w-full bg-gradient-to-b from-[#e3eaff] via-[#f0f4fc] to-white overflow-hidden py-16 sm:py-20 md:py-28">
      {/* Radial background decor */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[120vw] h-[60vw] max-w-none pointer-events-none z-0" aria-hidden>
        <div className="w-full h-full bg-gradient-radial from-blue-200/40 via-transparent to-transparent rounded-full blur-3xl opacity-60" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-center relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="space-y-4 sm:space-y-5 z-20"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#0A1933] leading-tight">
              Impulsamos
              <br />
              tu talento y operación
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[#2563eb] font-medium">
              Capital Humano, Desarrollo Organizacional y Management Services integrados bajo una misma marca para acompañarte en cada etapa de crecimiento.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              {/* Botón azul: Explorar servicios */}
              <a
                href="#servicios"
                className="inline-flex items-center bg-gradient-to-br from-[#2563eb] to-[#0057d9] text-white font-bold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-200 text-base sm:text-lg"
              >
                Explorar Servicios
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                  <path d="M13 7l5 5-5 5M6 12h12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              {/* Botón blanco: Contactar */}
              <a
                href="#contacto"
                className="inline-flex items-center bg-white text-[#2563eb] font-bold px-6 py-3 rounded-full shadow border border-blue-200 hover:bg-blue-50 transition-colors duration-200 text-base sm:text-lg"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Contactar
              </a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-md rounded-[32px] bg-white/70 p-2 shadow-2xl shadow-blue-600/30">
              <Image
                src="/image/hero/Flayers_Home_01100.jpg"
                width={720}
                height={480}
                alt="Ilustración de estrategia y talento"
                className="object-cover rounded-[28px]"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}