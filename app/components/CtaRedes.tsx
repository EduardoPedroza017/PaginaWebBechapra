"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import Image from "next/image";
import styles from "@/app/css/components/CtaRedes.module.css";

export default function CtaRedes() {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const socialLinks = [
    {
      id: "linkedin",
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/business-services-bechapra",
      icon: (
        <svg style={{ width: '2.5rem', height: '2.5rem' }} viewBox="0 0 24 24" fill="#0057D9">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      label: "Business Services Bechapra",
    },
    {
      id: "facebook",
      name: "Facebook",
      url: "https://www.facebook.com/businessservicesbechapra",
      icon: (
        <svg style={{ width: '2.5rem', height: '2.5rem' }} viewBox="0 0 24 24" fill="#0057D9">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      label: "Business Services Bechapra",
    },
    {
      id: "instagram",
      name: "Instagram",
      url: "https://www.instagram.com/bechapra",
      icon: (
        <svg style={{ width: '2.5rem', height: '2.5rem' }} viewBox="0 0 24 24">
          <defs>
            <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0057D9" />
              <stop offset="100%" stopColor="#004AB7" />
            </linearGradient>
          </defs>
          <path fill="url(#instagram-gradient)" d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03z"/>
        </svg>
      ),
      label: "bechapra",
    },
    {
      id: "youtube",
      name: "YouTube",
      url: "https://www.youtube.com/@businessservicesbechapra",
      icon: (
        <svg style={{ width: '2.5rem', height: '2.5rem' }} viewBox="0 0 24 24" fill="#0057D9">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      label: "Business Services Bechapra",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="mb-32 px-4 md:px-0">
      <AnimatedSection>
        <motion.div 
          className={`${styles.container} max-w-6xl mx-auto`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          {/* Fondo claro con gradiente suave */}
          <div className={styles.backgroundGradient} />
          
          {/* Contenido principal - Layout con imagen y contenido lado a lado */}
          <div className={styles.contentGrid}>
            
            {/* Lado izquierdo - Imagen */}
            <motion.div
              className={styles.imageContainer}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <Image
                src="/imagen/cta-imagen.jpg"
                alt="Bechapra Business Services - Soluciones profesionales"
                fill
                priority
                className={styles.image}
              />
              <div className={styles.imageOverlay} />
            </motion.div>

            {/* Lado derecho - Contenido */}
            <motion.div 
              className={styles.contentRight}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              
              {/* Título */}
              <motion.h3
                variants={itemVariants}
                className={styles.title}
              >
                Juntos trazamos <br />
                <span className={styles.titleHighlight}>
                  tu camino al éxito.
                </span>
              </motion.h3>

              {/* Subtítulo */}
              <motion.p
                variants={itemVariants}
                className={styles.description}
              >
                ¿Listo para llevar tus finanzas al siguiente nivel? Reserva una reunión con nuestros especialistas y comienza a diseñar una estrategia fiscal y administrativa que impulsará tu éxito. ¡Da el primer paso hoy!
              </motion.p>

              {/* Botón CTA */}
              <motion.div variants={itemVariants}>
                <motion.a
                  href="#contacto"
                  className={styles.ctaButton}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={styles.ctaButtonContent}>
                    <span>¡AGÉNDE AHORA!</span>
                    <motion.svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5"
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </motion.svg>
                  </div>
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

          {/* Separador */}
          <div className={styles.divider} />

          {/* Sección de redes sociales */}
          <motion.div 
            className={styles.socialSection}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.h4
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className={styles.socialTitle}
            >
              ¡VISÍTANOS!
            </motion.h4>

            <motion.div 
              className={styles.socialGrid}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialItem}
                  variants={itemVariants}
                  onMouseEnter={() => setHoveredIcon(link.id)}
                  onMouseLeave={() => setHoveredIcon(null)}
                  aria-label={`Visitar ${link.name} de Bechapra`}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <motion.div 
                    className={styles.socialIconBox}
                    animate={{
                      scale: hoveredIcon === link.id ? 1.1 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {link.icon}
                  </motion.div>
                  <span className={styles.socialLabel}>{link.label}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatedSection>
    </section>
  );
}
