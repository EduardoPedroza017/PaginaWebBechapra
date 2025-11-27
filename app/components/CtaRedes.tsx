"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import Image from "next/image";
import styles from "@/app/css/components/CtaRedes.module.css";


export default function CtaRedes({ dict }: { dict: any }) {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const socialLinks = dict.home?.ctaRedes?.socialLinks || [
    {
      id: "linkedin",
      name: "LinkedIn",
      url: "https://www.linkedin.com/",
      iconPath: "/imagen/icon/Iconos_Redes/Linkedin_PositivioStroke@2x.png",
      label: "Business Services Bechapra",
    },
    {
      id: "facebook",
      name: "Facebook",
      url: "https://www.facebook.com/",
      iconPath: "/imagen/icon/Iconos_Redes/Facebook_PositivioStroke@2x.png",
      label: "Business Services Bechapra",
    },
    {
      id: "instagram",
      name: "Instagram",
      url: "https://www.instagram.com/bechapra",
      iconPath: "/imagen/icon/Iconos_Redes/Instagram_PositivioStroke@2x.png",
      label: "bechapra",
    },
    {
      id: "youtube",
      name: "YouTube",
      url: "https://www.youtube.com/",
      iconPath: "/imagen/icon/Iconos_Redes/Youtube@2x.png",
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
    <section className="px-4 md:px-0">
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
          
          {/* FILA 1: Imagen arriba */}
          <motion.div
            className={styles.imageContainer}
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <Image
              src="/imagen/agenda/ahenda.avif"
              alt="Bechapra Business Services - Soluciones profesionales"
              fill
              priority
              className={styles.image}
            />
            <div className={styles.imageOverlay} />
          </motion.div>

          {/* FILA 2: Dos columnas - Contenido (izquierda) y Redes sociales (derecha) */}
          <div className={styles.bottomRow}>
            
            {/* Columna izquierda - Contenido */}
            <motion.div 
              className={styles.contentColumn}
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
                {dict.home?.ctaRedes?.title?.split('\n')[0] ?? 'Juntos trazamos'} <br />
                <span className={styles.titleHighlight}>
                  {dict.home?.ctaRedes?.title?.split('\n')[1] ?? 'tu camino al éxito.'}
                </span>
              </motion.h3>

              {/* Subtítulo */}
              <motion.p
                variants={itemVariants}
                className={styles.description}
              >
                {dict.home?.ctaRedes?.description ?? '¿Listo para llevar tus finanzas al siguiente nivel? Reserva una reunión con nuestros especialistas y comienza a diseñar una estrategia fiscal y administrativa que impulsará tu éxito. ¡Da el primer paso hoy!'}
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
                    <span>{dict.home?.ctaRedes?.cta ?? '¡AGÉNDE AHORA!'}</span>
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
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </motion.svg>
                  </div>
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Columna derecha - Redes sociales */}
            <motion.div 
              className={styles.socialColumn}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
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
                {dict.home?.ctaRedes?.visit ?? '¡VISÍTANOS!'}
              </motion.h4>

              <motion.div 
                className={styles.socialGrid}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {socialLinks.map((link) => (
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
                      <Image 
                        src={link.iconPath}
                        alt={`${link.name} icon`}
                        width={48}
                        height={48}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain'
                        }}
                      />
                    </motion.div>
                    <span className={styles.socialLabel}>{link.label}</span>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

          </div>
        </motion.div>
      </AnimatedSection>
    </section>
  );
}
