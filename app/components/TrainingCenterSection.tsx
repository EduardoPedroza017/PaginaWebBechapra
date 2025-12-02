"use client";

import { useEffect, useRef, useState } from "react";
import { GraduationCap, Users, Video, Award } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";

export default function TrainingCenterSection() {
  const features = [
    {
      label: "Ferias de Empleo",
      description: "Participación activa en ferias de empleo con escuelas y universidades",
      image: "/image/training-ferias.jpg",
      icon: <Users size={44} color="#fff" />
    },
    {
      label: "Webinars Institucionales",
      description: "Capacitaciones y webinars especializados con instituciones educativas",
      image: "/image/training-webinars.jpg",
      icon: <Video size={44} color="#fff" />
    },
    {
      label: "Sistema de Becarios",
      description: "Programa integral de formación y desarrollo de talento joven",
      image: "/image/training-becarios.jpg",
      icon: <Award size={44} color="#fff" />
    }
  ];

  const [active, setActive] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((s) => (s + 1) % features.length);
    }, 5000);

    return () => clearInterval(id);
  }, [features.length]);

  function startAutoplay() {
    stopAutoplay();
    intervalRef.current = window.setInterval(() => {
      setActive((s) => (s + 1) % features.length);
    }, 5000);
  }

  function stopAutoplay() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  return (
    <section id="training-center">
      <AnimatedSection>
        <div className="text-center max-w-3xl mx-auto mb-6 px-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <GraduationCap size={40} style={{color: '#003d8f'}} />
            <h2 className="text-[clamp(2rem,4vw,2.8rem)] font-black text-[#003d8f] tracking-tight m-0">Bechapra Training Center</h2>
          </div>
          <div className="w-20 h-1 rounded bg-gradient-to-r from-[#003d8f] to-[#0056d4] mx-auto mb-6" />
          <p className="text-[clamp(1rem,2vw,1.2rem)] text-[#666] leading-relaxed">Formamos y conectamos el talento del futuro con las mejores oportunidades</p>
        </div>
      </AnimatedSection>

      {/* Visual showcase with rotating features */}
      <div className="relative max-w-5xl mx-auto px-6">
        {/* Background gradient */}
        <div className="absolute inset-0 z-0 pointer-events-none rounded-3xl overflow-hidden" style={{background: 'radial-gradient(ellipse 70% 40% at 50% 20%, rgba(37,99,235,0.08) 0%, transparent 100%)'}} />

        <div className="relative z-10 bg-white/90 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-xl border-0" onMouseEnter={stopAutoplay} onMouseLeave={startAutoplay}>
          {/* Tabs/Indicators */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {features.map((feature, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`px-6 py-3 rounded-xl text-[0.95rem] font-bold flex items-center gap-2 transition-all duration-300 border ${active === i ? 'bg-gradient-to-br from-[#003d8f] to-[#004AB7] text-white shadow-lg border-0' : 'bg-[#003d8f0d] text-[#003d8f] border-[#003d8f26] hover:bg-[#003d8f1a]'}`}
              >
                {feature.label}
              </button>
            ))}
          </div>

          {/* Content Display */}
          <motion.div
            key={active}
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
            className="grid gap-12 md:grid-cols-2 items-center"
          >
            {/* Text Content */}
            <div className="p-6">
              <div className="w-[70px] h-[70px] bg-gradient-to-br from-[#003d8f] to-[#004AB7] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                {features[active].icon}
              </div>
              <h3 className="text-[clamp(1.8rem,3vw,2.5rem)] font-black text-[#003d8f] mb-4 tracking-tight">{features[active].label}</h3>
              <p className="text-[1.1rem] text-[#666] leading-relaxed mb-8">{features[active].description}</p>
              <button className="px-8 py-4 rounded-xl bg-gradient-to-br from-[#003d8f] to-[#004AB7] text-white font-bold text-base shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">Conoce más →</button>
            </div>
            {/* Image Display */}
            <div className="relative rounded-2xl overflow-hidden min-h-[300px] md:min-h-[400px] bg-gradient-to-br from-[#E8F4FF] to-[#D0E8FF] flex items-center justify-center border border-[#003d8f1a]">
              {/* Placeholder for image */}
              <div className="text-center text-[#003d8f] opacity-60">
                <div className="text-5xl mb-4 flex items-center justify-center">{features[active].icon}</div>
                <p className="text-xs font-semibold">Imagen: {features[active].label}</p>
              </div>
            </div>
          </motion.div>

          {/* Progress indicators */}
          <div className="flex justify-center gap-3 mt-12">
            {features.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`transition-all duration-300 rounded-full h-3 ${active === i ? 'bg-gradient-to-r from-[#003d8f] to-[#0056d4] w-10' : 'bg-[#003d8f33] w-3 hover:bg-[#003d8f66]'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Grilla de cards eliminada para evitar duplicidad */}
    </section>
  );
}
