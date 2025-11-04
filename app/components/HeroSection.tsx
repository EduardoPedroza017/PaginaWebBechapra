"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import styles from "../css/components/HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className="mb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
                Impulsamos
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
                tu talento y operación
              </span>
            </h1>

            <p className="text-lg text-slate-600 max-w-2xl leading-relaxed" >
              Capital Humano, Desarrollo Organizacional y Management Services integrados bajo una misma marca para acompañarte en cada etapa de crecimiento.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-6">
              <a
                href="#servicios"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:from-blue-700 transition-colors duration-200"
                aria-label="Explorar servicios"
              >
                <span>Explorar servicios</span>
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 10h10M10 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              <a
                href="#contacto"
                className="text-blue-700 underline underline-offset-4 font-medium"
              >
                Solicitar información
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="hidden lg:flex justify-center"
          >
            <div className="w-full max-w-xl h-80 rounded-2xl bg-gradient-to-br from-blue-50 to-white shadow-2xl overflow-hidden relative">
              {/* Main illustrative image - replace src with your provided asset in public/imagen when ready */}
                <div className={`absolute inset-0 ${styles.heroImage}`}>
                  <Image
                    src="https://images.unsplash.com/photo-1564869736456-0f9d5a0d2f4a?w=1200&q=80&auto=format&fit=crop"
                    alt="Ilustración representativa"
                    fill
                    className="object-cover opacity-90"
                  />
                </div>

              {/* Overlay card with small illustration/text */}
              <div className={`absolute left-6 bottom-6 ${styles.overlayCard} shadow-lg w-40`}>
                <div className={`${styles.overlayInitial} bg-gradient-to-br from-blue-600 to-indigo-600 text-white`}>B</div>
                <p className="mt-2 text-sm text-slate-700">Ilustración</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
