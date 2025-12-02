"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import Image from "next/image";

export default function AwardsSection() {
  const reconocimientos = [
    {
      id: "ccrh",
      img: "",
      title: "Concilio de Recursos Humanos",
    },
    {
      id: "beh",
      img: "",
      title: "Distintivo de Empresas Humanitarias",
    },
    {
      id: "trabajo",
      img: "",
      title: "Certificación de Trabajo Digno",
    },
    {
      id: "repse",
      img: "",
      title: "Registro de Especialistas Profesionales",
    },
  ];

  // Duplicar logos para efecto infinito
  const duplicatedLogos = [...reconocimientos, ...reconocimientos];

  return (
    <section className="p-0 overflow-hidden">
      <AnimatedSection>
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-[clamp(2rem,4vw,2.75rem)] font-black text-[#0057D9] mb-3 tracking-tight" style={{letterSpacing: '-0.02em'}}>
            Reconocimientos
          </h2>
          <div className="w-20 h-1 rounded bg-gradient-to-r from-[#0057D9] to-[#004AB7] mx-auto" />
        </div>

        {/* Carrusel infinito */}
        <div className="relative w-full overflow-hidden py-4">
          <motion.div
            animate={{ x: [0, '-50%'] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
            className="flex gap-[clamp(2rem,4vw,4rem)] w-fit"
          >
            {duplicatedLogos.map((rec, i) => (
              <div
                key={`${rec.id}-${i}`}
                className="bg-white rounded-xl shadow-md flex items-center justify-center min-w-[180px] min-h-[90px] px-[clamp(1.5rem,3vw,2.5rem)] py-[clamp(1rem,2vw,1.5rem)] transition-all"
                style={{ boxShadow: '0 2px 8px rgba(0, 87, 217, 0.08)' }}
              >
                {rec.img ? (
                  <Image
                    src={rec.img}
                    alt={rec.title}
                    width={140}
                    height={70}
                    className="max-w-[160px] h-[clamp(50px,5vw,70px)] object-contain"
                    style={{ filter: 'grayscale(100%) opacity(0.7)' }}
                  />
                ) : (
                  <div className="w-[140px] h-[70px] bg-[#f8f9fa] border-2 border-dashed border-[#cbd5e1] rounded flex items-center justify-center text-xs font-semibold uppercase text-[#94a3b8]">
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
