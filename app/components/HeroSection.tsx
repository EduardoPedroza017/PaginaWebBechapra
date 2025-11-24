"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "../css/components/HeroSection.module.css";

const heroImages = [
  "/imagen/prueba/Flayers_Home_01100.jpg"
];

export default function HeroSection() {
  const [currentImageIndex] = useState(0);

  return (
    <section className={`${styles.heroSection} ${styles.fullBleed} relative`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-center relative">
          <div className={styles.radialDecor} aria-hidden />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`space-y-4 sm:space-y-5 ${styles.heroInner} z-20`}
          >
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl ${styles.heroTitle}`}>
              Impulsamos
              <br />
              tu talento y operación
            </h1>

            <p className={`text-base sm:text-lg leading-relaxed ${styles.heroSubtitle}`}>
              Capital Humano, Desarrollo Organizacional y Management Services integrados bajo una misma marca para acompañarte en cada etapa de crecimiento.
            </p>


          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block"
          >
            <div className="w-full max-w-xl h-80 rounded-2xl bg-gradient-to-br from-blue-50 to-white shadow-2xl relative" style={{ overflow: 'hidden' }}>
              <Image src={heroImages[0]} alt="Imagen principal" fill sizes="600px" className="object-cover" priority />
              <div className={`absolute left-6 bottom-6 ${styles.overlayCard} shadow-lg w-40`}>
                <div className={`${styles.overlayInitial} bg-gradient-to-br from-blue-600 to-indigo-600 text-white`}>B</div>
                <p className="mt-2 text-sm text-slate-700">Imagen principal</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}