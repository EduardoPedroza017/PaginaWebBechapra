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
      image: "/imagen/training-ferias.jpg",
      icon: <Users size={44} color="#fff" />
    },
    {
      label: "Webinars Institucionales",
      description: "Capacitaciones y webinars especializados con instituciones educativas",
      image: "/imagen/training-webinars.jpg",
      icon: <Video size={44} color="#fff" />
    },
    {
      label: "Sistema de Becarios",
      description: "Programa integral de formación y desarrollo de talento joven",
      image: "/imagen/training-becarios.jpg",
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
        <div style={{
          textAlign: 'center',
          maxWidth: '900px',
          margin: '0 auto 1.5rem',
          padding: '0 1.5rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <GraduationCap size={40} style={{color: '#003d8f'}} />
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              fontWeight: 900,
              color: '#003d8f',
              margin: 0,
              letterSpacing: '-0.02em'
            }}>
              Bechapra Training Center
            </h2>
          </div>
          <div style={{
            width: '80px',
            height: '4px',
            background: 'linear-gradient(90deg, #003d8f 0%, #0056d4 100%)',
            borderRadius: '4px',
            margin: '0 auto 1.5rem'
          }} />
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: '#666',
            lineHeight: 1.7
          }}>
            Formamos y conectamos el talento del futuro con las mejores oportunidades
          </p>
        </div>
      </AnimatedSection>

      {/* Visual showcase with rotating features */}
      <div style={{
        position: 'relative',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1.5rem'
      }}>
        {/* Background gradient */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          borderRadius: '28px',
          overflow: 'hidden',
          background: 'radial-gradient(ellipse 70% 40% at 50% 20%, rgba(37,99,235,0.08) 0%, transparent 100%)'
        }} />

        <div style={{
          position: 'relative',
          zIndex: 1,
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(12px)',
          borderRadius: '24px',
          padding: '3rem 2rem',
          boxShadow: '0 8px 32px rgba(0, 74, 183, 0.12)',
          border: 'none'
        }}
        onMouseEnter={stopAutoplay}
        onMouseLeave={startAutoplay}
        >
          {/* Tabs/Indicators */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '3rem',
            flexWrap: 'wrap'
          }}>
            {features.map((feature, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: active === i 
                    ? 'linear-gradient(135deg, #003d8f 0%, #004AB7 100%)'
                    : 'rgba(0,61,143,0.05)',
                  color: active === i ? 'white' : '#003d8f',
                  border: active === i ? 'none' : '1px solid rgba(0,61,143,0.15)',
                  borderRadius: '12px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: active === i ? '0 4px 12px rgba(0,61,143,0.2)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (active !== i) {
                    e.currentTarget.style.background = 'rgba(0,61,143,0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (active !== i) {
                    e.currentTarget.style.background = 'rgba(0,61,143,0.05)';
                  }
                }}
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
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '3rem',
              alignItems: 'center'
            }}
          >
            {/* Text Content */}
            <div style={{
              padding: '2rem 1rem'
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                background: 'linear-gradient(135deg, #003d8f 0%, #004AB7 100%)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                boxShadow: '0 8px 20px rgba(0,61,143,0.2)'
              }}>
                {features[active].icon}
              </div>

              <h3 style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                fontWeight: 900,
                color: '#003d8f',
                marginBottom: '1rem',
                letterSpacing: '-0.02em'
              }}>
                {features[active].label}
              </h3>

              <p style={{
                fontSize: '1.1rem',
                color: '#666',
                lineHeight: 1.7,
                marginBottom: '2rem'
              }}>
                {features[active].description}
              </p>

              <button style={{
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, #003d8f 0%, #004AB7 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 20px rgba(0,61,143,0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,61,143,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,61,143,0.2)';
              }}
              >
                Conoce más →
              </button>
            </div>

            {/* Image Display */}
            <div style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              minHeight: '400px',
              background: 'linear-gradient(135deg, #E8F4FF 0%, #D0E8FF 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(0,61,143,0.1)'
            }}>
              {/* Placeholder for image */}
              <div style={{
                textAlign: 'center',
                color: '#003d8f',
                opacity: 0.6
              }}>
                <div style={{
                  fontSize: '4rem',
                  marginBottom: '1rem'
                }}>
                  {features[active].icon}
                </div>
                <p style={{
                  fontSize: '0.9rem',
                  fontWeight: 600
                }}>
                  Imagen: {features[active].label}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Progress indicators */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            marginTop: '3rem'
          }}>
            {features.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  width: active === i ? '40px' : '12px',
                  height: '12px',
                  background: active === i 
                    ? 'linear-gradient(90deg, #003d8f 0%, #0056d4 100%)'
                    : 'rgba(0,61,143,0.2)',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Grilla de cards eliminada para evitar duplicidad */}
    </section>
  );
}
