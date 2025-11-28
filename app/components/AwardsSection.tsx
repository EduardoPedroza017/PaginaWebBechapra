"use client";

import { motion } from "framer-motion";

import AnimatedSection from "./AnimatedSection";
import Image from "next/image";
import { useLanguage } from "../../lib/LanguageContext";
import { useEffect, useState } from "react";
import { translateText } from "../../lib/translate";

export default function AwardsSection() {
  const { lang } = useLanguage();
  const [header, setHeader] = useState("Reconocimientos");
  const [titles, setTitles] = useState([
    "Concilio de Recursos Humanos",
    "Distintivo de Empresas Humanitarias",
    "Certificación de Trabajo Digno",
    "Registro de Especialistas Profesionales"
  ]);

  useEffect(() => {
    async function fetchTranslations() {
      if (lang === "es") {
        setHeader("Reconocimientos");
        setTitles([
          "Concilio de Recursos Humanos",
          "Distintivo de Empresas Humanitarias",
          "Certificación de Trabajo Digno",
          "Registro de Especialistas Profesionales"
        ]);
      } else {
        setHeader(await translateText("Reconocimientos", lang));
        setTitles([
          await translateText("Concilio de Recursos Humanos", lang),
          await translateText("Distintivo de Empresas Humanitarias", lang),
          await translateText("Certificación de Trabajo Digno", lang),
          await translateText("Registro de Especialistas Profesionales", lang)
        ]);
      }
    }
    fetchTranslations();
  }, [lang]);

  const reconocimientos = [
    {
      id: "ccrh",
      img: "",
      title: titles[0],
    },
    {
      id: "beh",
      img: "",
      title: titles[1],
    },
    {
      id: "trabajo",
      img: "",
      title: titles[2],
    },
    {
      id: "repse",
      img: "",
      title: titles[3],
    },
  ];
  // Duplicar logos para efecto infinito
  const duplicatedLogos = [...reconocimientos, ...reconocimientos];

  return (
    <section style={{ padding: 0, overflow: 'hidden' }}>
      <AnimatedSection>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: 900,
            color: '#0057D9',
            marginBottom: '0.75rem',
            letterSpacing: '-0.02em'
          }}>
            {header}
          </h2>
          <div style={{
            width: '80px',
            height: '4px',
            background: 'linear-gradient(90deg, #0057D9 0%, #004AB7 100%)',
            borderRadius: '4px',
            margin: '0 auto'
          }} />
        </div>

        {/* Carrusel infinito */}
        <div style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          padding: '1rem 0'
        }}>
          <motion.div
            animate={{
              x: [0, -50 + '%'],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
            style={{
              display: 'flex',
              gap: 'clamp(2rem, 4vw, 4rem)',
              width: 'fit-content'
            }}
          >
            {duplicatedLogos.map((rec, i) => (
              <div
                key={`${rec.id}-${i}`}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  padding: 'clamp(1rem, 2vw, 1.5rem) clamp(1.5rem, 3vw, 2.5rem)',
                  boxShadow: '0 2px 8px rgba(0, 87, 217, 0.08)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '180px',
                  minHeight: '90px',
                  flexShrink: 0
                }}
              >
                {rec.img ? (
                  <Image
                    src={rec.img}
                    alt={rec.title}
                    width={140}
                    height={70}
                    style={{
                      width: 'auto',
                      height: 'clamp(50px, 5vw, 70px)',
                      maxWidth: '160px',
                      objectFit: 'contain',
                      filter: 'grayscale(100%) opacity(0.7)'
                    }}
                  />
                ) : (
                  <div style={{
                    width: '140px',
                    height: '70px',
                    background: '#f8f9fa',
                    border: '2px dashed #cbd5e1',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: '#94a3b8',
                    textTransform: 'uppercase'
                  }}>
                    LOGO
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>
    </section>
  );
}
