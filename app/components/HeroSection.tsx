"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "../css/components/HeroSection.module.css";

const heroImages = [
  "/imagen/prueba/Flayers_Home_01100.jpg",
  "/imagen/prueba/management-services-benefits.jpg",
  "/imagen/prueba/prueba-hero.jpg",
  "/imagen/prueba/servicio.jpg",
  "/imagen/prueba/tranning.webp"
];

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % heroImages.length;
        console.log('Cambiando de imagen:', prevIndex, '->', nextIndex);
        return nextIndex;
      });
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? heroImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className={`${styles.heroSection} ${styles.fullBleed} mb-16 sm:mb-24 md:mb-32 relative`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center relative">
          <div className={styles.radialDecor} aria-hidden />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`space-y-4 sm:space-y-6 ${styles.heroInner} z-20`}
          >
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl ${styles.heroTitle}`}>
              Impulsamos
              <br />
              tu talento y operación
            </h1>

            <p className={`text-base sm:text-lg leading-relaxed ${styles.heroSubtitle}`}>
              Capital Humano, Desarrollo Organizacional y Management Services integrados bajo una misma marca para acompañarte en cada etapa de crecimiento.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row lg:flex-row items-stretch sm:items-center gap-4 sm:gap-6 mt-6 w-full"
            >
              <motion.a
                href="#servicios"
                aria-label="Explorar servicios"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`${styles.exploreBtn} w-full sm:w-auto relative inline-flex items-center justify-center gap-3 rounded-full font-bold text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
              >
                <span className="tracking-wide relative z-10">Explorar servicios</span>
                <svg className="w-5 h-5 transition-transform duration-300 relative z-10" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 10h10M10 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.a>

              <motion.a
                href="#contacto"
                className={`${styles.secondaryBtn} w-full sm:w-auto relative z-50 text-center`}
                whileHover={{ x: 6 }}
                transition={{ duration: 0.22 }}
              >
                Solicitar información
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block"
          >
            <div className="w-full max-w-xl h-80 rounded-2xl bg-gradient-to-br from-blue-50 to-white shadow-2xl relative" style={{ overflow: 'hidden' }}>
              {/* Imagen 0 */}
              <div style={{
                position: 'absolute',
                inset: 0,
                opacity: currentImageIndex === 0 ? 1 : 0,
                transition: 'opacity 1s ease-in-out',
                zIndex: currentImageIndex === 0 ? 2 : 1
              }}>
                <Image src={heroImages[0]} alt="Imagen 1" fill sizes="600px" className="object-cover" priority />
              </div>
              
              {/* Imagen 1 */}
              <div style={{
                position: 'absolute',
                inset: 0,
                opacity: currentImageIndex === 1 ? 1 : 0,
                transition: 'opacity 1s ease-in-out',
                zIndex: currentImageIndex === 1 ? 2 : 1
              }}>
                <Image src={heroImages[1]} alt="Imagen 2" fill sizes="600px" className="object-cover" />
              </div>
              
              {/* Imagen 2 */}
              <div style={{
                position: 'absolute',
                inset: 0,
                opacity: currentImageIndex === 2 ? 1 : 0,
                transition: 'opacity 1s ease-in-out',
                zIndex: currentImageIndex === 2 ? 2 : 1
              }}>
                <Image src={heroImages[2]} alt="Imagen 3" fill sizes="600px" className="object-cover" />
              </div>
              
              {/* Imagen 3 */}
              <div style={{
                position: 'absolute',
                inset: 0,
                opacity: currentImageIndex === 3 ? 1 : 0,
                transition: 'opacity 1s ease-in-out',
                zIndex: currentImageIndex === 3 ? 2 : 1
              }}>
                <Image src={heroImages[3]} alt="Imagen 4" fill sizes="600px" className="object-cover" />
              </div>
              
              {/* Imagen 4 */}
              <div style={{
                position: 'absolute',
                inset: 0,
                opacity: currentImageIndex === 4 ? 1 : 0,
                transition: 'opacity 1s ease-in-out',
                zIndex: currentImageIndex === 4 ? 2 : 1
              }}>
                <Image src={heroImages[4]} alt="Imagen 5" fill sizes="600px" className="object-cover" />
              </div>

              {/* Botones de navegación */}
              <button
                onClick={prevImage}
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 30,
                  background: 'rgba(255,255,255,0.9)',
                  padding: '0.5rem',
                  borderRadius: '9999px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.9)';
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                }}
                aria-label="Imagen anterior"
              >
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextImage}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 30,
                  background: 'rgba(255,255,255,0.9)',
                  padding: '0.5rem',
                  borderRadius: '9999px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.9)';
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                }}
                aria-label="Siguiente imagen"
              >
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className={`absolute left-6 bottom-6 ${styles.overlayCard} shadow-lg w-40`}>
                <div className={`${styles.overlayInitial} bg-gradient-to-br from-blue-600 to-indigo-600 text-white`}>B</div>
                <p className="mt-2 text-sm text-slate-700">Imagen {currentImageIndex + 1}/5</p>
              </div>

              {/* Indicadores de slides */}
              <div className="absolute bottom-4 right-6 flex gap-2 z-20">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? "bg-blue-600 w-6"
                        : "bg-blue-300 hover:bg-blue-400 w-2"
                    }`}
                    aria-label={`Ir a imagen ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}