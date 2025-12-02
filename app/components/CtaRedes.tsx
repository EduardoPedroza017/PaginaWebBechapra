"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import Image from "next/image";


export default function CtaRedes() {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const socialLinks = [
    {
      id: "linkedin",
      name: "LinkedIn",
      url: "https://www.linkedin.com/",
      iconPath: "/image/icon/Iconos_Redes/Linkedin_PositivioStroke@2x.png",
      label: "Business Services Bechapra",
    },
    {
      id: "facebook",
      name: "Facebook",
      url: "https://www.facebook.com/",
      iconPath: "/image/icon/Iconos_Redes/Facebook_PositivioStroke@2x.png",
      label: "Business Services Bechapra",
    },
    {
      id: "instagram",
      name: "Instagram",
      url: "https://www.instagram.com/bechapra",
      iconPath: "/image/icon/Iconos_Redes/Instagram_PositivioStroke@2x.png",
      label: "bechapra",
    },
    {
      id: "youtube",
      name: "YouTube",
      url: "https://www.youtube.com/",
      iconPath: "/image/icon/Iconos_Redes/Youtube@2x.png",
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
          className="relative max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-lg bg-gradient-to-br from-[#f0f4fc] to-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          {/* Fondo claro con gradiente suave */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#e3eaff] via-[#f0f4fc] to-white opacity-80 pointer-events-none z-0" />

          {/* FILA 1: Imagen arriba */}
          <motion.div
            className="relative w-full h-56 sm:h-72 md:h-80 lg:h-96 overflow-hidden z-10"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <Image
              src="/image/agenda/ahenda.avif"
              alt="Bechapra Business Services - Soluciones profesionales"
              fill
              priority
              className="object-cover w-full h-full rounded-t-3xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0057d9]/60 to-transparent z-10" />
          </motion.div>

          {/* FILA 2: Dos columnas - Contenido (izquierda) y Redes sociales (derecha) */}
          <div className="relative z-20 flex flex-col md:flex-row gap-8 md:gap-0 px-4 md:px-12 py-8 md:py-12">
            {/* Columna izquierda - Contenido */}
            <motion.div
              className="flex-1 flex flex-col justify-center"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Título */}
              <motion.h3
                variants={itemVariants}
                className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0057D9] mb-3 leading-tight"
              >
                Juntos trazamos <br />
                <span className="text-[#004AB7]">tu camino al éxito.</span>
              </motion.h3>

              {/* Subtítulo */}
              <motion.p
                variants={itemVariants}
                className="text-base md:text-lg text-[#0A1933] mb-6"
              >
                ¿Listo para llevar tus finanzas al siguiente nivel? Reserva una reunión con nuestros especialistas y comienza a diseñar una estrategia fiscal y administrativa que impulsará tu éxito. ¡Da el primer paso hoy!
              </motion.p>

              {/* Botón CTA */}
              <motion.div variants={itemVariants}>
                <motion.a
                  href="#contacto"
                  className="inline-flex items-center gap-2 bg-gradient-to-br from-[#0057D9] to-[#004AB7] text-white px-8 py-3 rounded-full font-extrabold tracking-wide shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
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
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </motion.svg>
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Columna derecha - Redes sociales */}
            <motion.div
              className="flex-1 flex flex-col items-center justify-center md:pl-12"
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
                className="text-lg md:text-xl font-bold text-[#0057D9] mb-4"
              >
                ¡VISÍTANOS!
              </motion.h4>

              <motion.div
                className="grid grid-cols-2 gap-4 md:gap-6"
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
                    className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-[#0057D9]"
                    variants={itemVariants}
                    onMouseEnter={() => setHoveredIcon(link.id)}
                    onMouseLeave={() => setHoveredIcon(null)}
                    aria-label={`Visitar ${link.name} de Bechapra`}
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <motion.div
                      className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-[#f0f4fc] to-[#e3eaff]"
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
                        className="object-contain w-full h-full"
                      />
                    </motion.div>
                    <span className="text-xs text-[#0A1933] font-semibold text-center">{link.label}</span>
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
