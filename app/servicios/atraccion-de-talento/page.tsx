"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Clock, Target, CheckCircle, TrendingUp, Award, Users, ChevronLeft, ChevronRight, Briefcase } from "lucide-react";
import Link from "next/link";
import Footer from '@/components/Footer';
import ContactForm from '@/app/components/ContactForm';

export default function Page() {
  const steps = [
    {
      n: "01",
      title: "Brief & perfil",
      desc: "Definimos objetivos, perfil ideal, tiempos y KPI. Acordamos el canal de comunicación y responsables.",
      icon: <User className="w-7 h-7" />,
    },
    {
      n: "02",
      title: "Sourcing & hunting",
      desc: "Research activo, base de candidatos, job boards y hunting directo. Priorizamos velocidad y calidad.",
      icon: <Target className="w-7 h-7" />,
    },
    {
      n: "03",
      title: "Entrevistas & filtros",
      desc: "Entrevista por competencias, validación de motivadores, salary match y cultura. Reporte corto por candidato.",
      icon: <User className="w-7 h-7" />,
    },
    {
      n: "04",
      title: "Shortlist & agenda",
      desc: "Envío de terna con comparativo. Coordinamos entrevistas con líderes y damos seguimiento.",
      icon: <TrendingUp className="w-7 h-7" />,
    },
    {
      n: "05",
      title: "Validaciones",
      desc: "Socioeconómico / referencias (si aplica). Cierre de oferta y fecha de ingreso con candidato.",
      icon: <CheckCircle className="w-7 h-7" />,
    },
    {
      n: "06",
      title: "Garantía",
      desc: "Periodo de sustitución sin costo según acuerdo. Retro continua y cierre del proceso.",
      icon: <Award className="w-7 h-7" />,
    },
  ];

  const kpis = [
    { 
      label: "Tiempo de respuesta", 
      value: "< 48h", 
      note: "presentación de primeros CVs",
      icon: <Clock className="w-9 h-9" />,
    },
    { 
      label: "Time To Fill", 
      value: "7–21 días", 
      note: "según seniority y ciudad",
      icon: <TrendingUp className="w-9 h-9" />,
    },
    { 
      label: "Tasa de aceptación", 
      value: "85%+", 
      note: "de ternas presentadas",
      icon: <CheckCircle className="w-9 h-9" />,
    },
    { 
      label: "Satisfacción", 
      value: "NPS 9.0", 
      note: "post–colocación",
      icon: <Award className="w-9 h-9" />,
    },
  ];

  const positions = [
    "Contabilidad", "Facturación", "Cobranza", "Vinculación",
    "Administración", "TI", "Automatizaciones", "Comercial",
    "Atención a Clientes", "Tesorería", "Nómina", "Atracción de Talento",
    "Dirección General", "Asuntos Corporativos", "Seguridad", "Jurídico",
  ];

  const benefits = [
    {
      title: "Selección Personalizada",
      subtitle: "Encuentra candidatos que se adapten a tu cultura",
      desc: "Encontrar candidatos que no solo cumplan con los criterios técnicos, sino que también se adapten a la cultura y valores de tu empresa.",
      icon: <User className="w-10 h-10" />,
    },
    {
      title: "Garantía de Calidad",
      subtitle: "Confianza en cada candidato",
      desc: "Puedes confiar en que cada candidato que te presentamos ha sido previamente entrevistado y evaluado para cumplir con tus estándares de calidad.",
      icon: <CheckCircle className="w-10 h-10" />,
    },
  ];

  const modalities = [
    {
      title: "Masivo y Operativo",
      desc: "Nos especializamos en encontrar perfiles operativos de centros de trabajo como call centers, despachos de cobranza o trabajadores de línea de producción.",
      icon: <Users className="w-8 h-8" />,
    },
    {
      title: "Administrativo y Especializado",
      desc: "Perfiles administrativos y especializados para áreas clave como finanzas, legal y tecnología.",
      icon: <Briefcase className="w-8 h-8" />,
    },
    {
      title: "Headhunter y Executive Search",
      desc: "Búsqueda de talento ejecutivo y especializado para posiciones estratégicas en tu organización.",
      icon: <Target className="w-8 h-8" />,
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)' }}>
      
      {/* === HERO SECTION === */}
      <section style={{
        position: 'relative',
        padding: '4rem 0 5rem',
        background: 'linear-gradient(90deg, #003d8f 0%, #004AB7 35%, #004AB7 65%, #0056d4 100%)',
        overflow: 'hidden',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)'
      }}>
        {/* Overlay decorativo */}
        <div style={{
          content: '',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.1) 0%, transparent 40%), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.08) 0%, transparent 40%)',
          pointerEvents: 'none'
        }} />

        <div style={{
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '3rem',
          alignItems: 'center',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1.5rem'
        }}>
          {/* Columna de Texto */}
          <div style={{ maxWidth: '600px' }}>
            <Link href="/servicios" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(10px)',
              color: 'white',
              padding: '0.6rem 1.2rem',
              borderRadius: '50px',
              border: '1px solid rgba(255,255,255,0.3)',
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textDecoration: 'none',
              marginBottom: '1.5rem'
            }}>
              <ChevronLeft size={18} />
              Volver
            </Link>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: 800,
              lineHeight: 1.1,
              color: '#FFFFFF',
              margin: '0 0 1rem 0',
              letterSpacing: '-0.02em'
            }}>
              Atracción de <span style={{background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Talento</span>
            </h1>
            <p style={{
              fontSize: '1.15rem',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.85)',
              margin: '0 0 2rem 0',
              maxWidth: '540px'
            }}>
              Reclutamos perfiles operativos, administrativos y especializados con un proceso claro, reportes útiles y tiempos comprometidos.
            </p>
            <Link href="#proceso" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.875rem 1.75rem',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #F0F4FF 100%)',
              color: '#004AB7',
              fontWeight: 700,
              fontSize: '1rem',
              borderRadius: '9999px',
              textDecoration: 'none',
              boxShadow: '0 10px 30px rgba(255,255,255,0.2), 0 1px 2px rgba(0,0,0,0.1)',
              transition: 'all 0.3s cubic-bezier(0.2,0.9,0.2,1)',
              border: '2px solid rgba(255,255,255,0.3)'
            }}>
              Contactar a Bechapra
              <ChevronRight size={20} />
            </Link>
          </div>
          {/* Columna de Imagen */}
          <div style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}>
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '580px',
              height: '340px',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.1)',
              background: 'linear-gradient(135deg, rgba(0,61,143,0.1) 0%, rgba(0,172,183,0.1) 100%)'
            }}>
              {/* Placeholder para imagen */}
            </div>
          </div>
        </div>
      </section>

      {/* === BENEFICIOS CLAVE === */}
      <section style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '4rem 1.5rem',
        background: 'linear-gradient(180deg, #FAFBFC 0%, #F0F7FF 100%)',
        borderRadius: '0'
      }}>
        <motion.h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 900,
          color: '#003d8f',
          marginBottom: '3rem',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          textAlign: 'center'
        }} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6}}>
          ¿Por qué elegirnos?
        </motion.h2>
        <motion.div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }} initial="hidden" whileInView="visible" viewport={{once:true}} variants={{hidden:{},visible:{transition:{staggerChildren:0.1}}}}>
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{opacity:0, y:30}}
              whileInView={{opacity:1, y:0}}
              viewport={{once:true}}
              transition={{duration:0.5, delay:i*0.08}}
              whileHover={{transform: 'translateY(-12px)'}}
              style={{
                padding: '2.5rem 2rem',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FCFF 100%)',
                border: '1.5px solid #D0E8FF',
                boxShadow: '0 4px 12px rgba(0,61,143,0.08), 0 1px 3px rgba(0,0,0,0.05)',
                transition: 'all 0.35s cubic-bezier(0.2,0.9,0.2,1)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Fondo decorativo */}
              <div style={{
                position: 'absolute',
                top: '-40px',
                right: '-40px',
                width: '100px',
                height: '100px',
                background: 'radial-gradient(circle, rgba(0,61,143,0.08) 0%, transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none'
              }} />
              
              <div style={{
                position: 'relative',
                zIndex: 1
              }}>
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '1rem',
                  filter: 'drop-shadow(0 2px 4px rgba(0,61,143,0.15))'
                }}>
                  {b.icon}
                </div>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: '#003d8f',
                  marginBottom: '0.5rem',
                  letterSpacing: '-0.01em'
                }}>
                  {b.title}
                </h3>
                <p style={{
                  fontSize: '0.85rem',
                  color: '#888',
                  marginBottom: '0.75rem',
                  fontWeight: 500
                }}>
                  {b.subtitle}
                </p>
                <p style={{
                  fontSize: '0.95rem',
                  color: '#666',
                  lineHeight: 1.7,
                  margin: 0
                }}>
                  {b.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* === PERFILES === */}
      <section style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '5rem 1.5rem',
        background: 'linear-gradient(180deg, transparent 0%, rgba(0,61,143,0.02) 100%)'
      }}>
        <motion.div initial={{opacity:0, y:30}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6}} style={{textAlign: 'center', marginBottom: '4rem'}}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 900,
            color: '#003d8f',
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
            lineHeight: 1.1
          }}>
            Perfiles que cubrimos
          </h2>
          <p style={{
            fontSize: '1.15rem',
            color: '#666',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Especialistas en múltiples áreas y niveles. Desde operativos hasta directivos.
          </p>
        </motion.div>

        {/* Carrusel infinito */}
        <div style={{
          overflow: 'hidden',
          position: 'relative',
          marginBottom: '4rem',
          background: 'linear-gradient(135deg, rgba(0,61,143,0.03) 0%, rgba(0,172,183,0.02) 100%)',
          borderRadius: '20px',
          padding: '3rem 0',
          border: '1.5px solid rgba(0,61,143,0.08)'
        }}>
          <motion.div
            initial={{x: 0}}
            animate={{x: '-100%'}}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop"
            }}
            style={{
              display: 'flex',
              gap: '1.8rem',
              width: 'fit-content',
              willChange: 'transform',
              padding: '0 1.5rem'
            }}
          >
            {[...positions, ...positions].map((p, i) => (
              <motion.div
                key={i}
                whileHover={{
                  scale: 1.12,
                  rotate: 3,
                  y: -12,
                  transition: {duration: 0.3, type: "spring", bounce: 0.4}
                }}
                style={{
                  flexShrink: 0,
                  width: '210px',
                  minHeight: '120px',
                  padding: '1.8rem 1.5rem',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FDFF 50%, #F0F9FF 100%)',
                  border: '2px solid rgba(0,61,143,0.12)',
                  textAlign: 'center',
                  fontWeight: 800,
                  color: '#003d8f',
                  fontSize: '1.05rem',
                  cursor: 'pointer',
                  transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  boxShadow: '0 12px 35px rgba(0,61,143,0.08), 0 0 1px rgba(0,61,143,0.1), inset 0 1px 0 rgba(255,255,255,0.8)',
                  backdropFilter: 'blur(12px)',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: 1.4
                }}
              >
                {/* Borde superior gradiente - Animado */}
                <motion.div
                  animate={{opacity: [0.6, 1, 0.6]}}
                  transition={{duration: 3, repeat: Infinity}}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: 'linear-gradient(90deg, #003d8f 0%, #004AB7 35%, #0056d4 65%, #004AB7 100%)',
                    borderRadius: '16px 16px 0 0'
                  }}
                />
                
                {/* Fondo decorativo con efecto radial */}
                <motion.div
                  initial={{opacity: 0, scale: 0.8}}
                  whileHover={{opacity: 1, scale: 1.2}}
                  style={{
                    position: 'absolute',
                    top: -30,
                    right: -30,
                    width: '100px',
                    height: '100px',
                    background: 'radial-gradient(circle, rgba(0,172,183,0.15) 0%, transparent 70%)',
                    borderRadius: '50%',
                    pointerEvents: 'none'
                  }}
                />
                
                <div style={{position: 'relative', zIndex: 2, letterSpacing: '-0.5px', wordWrap: 'break-word'}}>{p}</div>

                {/* Efecto de brillo premium */}
                <motion.div
                  whileHover={{opacity: 1}}
                  initial={{opacity: 0}}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 50%, rgba(0,172,183,0.1) 100%)',
                    borderRadius: '16px',
                    pointerEvents: 'none'
                  }}
                />

                {/* Borde derecho de luz */}
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  bottom: 0,
                  width: '1px',
                  background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)',
                  pointerEvents: 'none'
                }} />
              </motion.div>
            ))}
          </motion.div>

          {/* Gradient overlay izquierdo - Mejorado */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '120px',
            background: 'linear-gradient(90deg, #FFFFFF 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)',
            pointerEvents: 'none',
            zIndex: 10,
            borderRadius: '20px 0 0 20px'
          }} />

          {/* Gradient overlay derecho - Mejorado */}
          <div style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '120px',
            background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, #FFFFFF 100%)',
            pointerEvents: 'none',
            zIndex: 10,
            borderRadius: '0 20px 20px 0'
          }} />
        </div>

        {/* Indicador de movimiento */}
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem',
          color: '#004AB7',
          fontSize: '0.9rem',
          fontWeight: 600,
          opacity: 0.7
        }}>
          ← Desliza para más perfiles →
        </div>
      </section>

      {/* === PROCESO === */}
      <section id="proceso" style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '5rem 1.5rem',
        background: 'linear-gradient(180deg, rgba(0,61,143,0.02) 0%, transparent 100%)'
      }}>
        <motion.div initial={{opacity:0, y:30}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6}} style={{textAlign: 'center', marginBottom: '4rem'}}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 900,
            color: '#003d8f',
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
            lineHeight: 1.1
          }}>
            Nuestro proceso
          </h2>
          <p style={{
            fontSize: '1.15rem',
            color: '#666',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            6 pasos estratégicos y comprobados para encontrar el talento perfecto para tu empresa
          </p>
        </motion.div>

        {/* Grid 2x3 con espaciado amplio */}
        <motion.div initial="hidden" whileInView="visible" viewport={{once:true}} variants={{hidden:{},visible:{transition:{staggerChildren:0.08}}}} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2.5rem 2rem',
          position: 'relative',
          marginBottom: '3rem'
        }}>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{opacity:0, y:40, scale:0.95}}
              whileInView={{opacity:1, y:0, scale:1}}
              viewport={{once:true}}
              transition={{duration:0.7, delay:i*0.1, type:"spring", bounce:0.35}}
              whileHover={{
                y:-15,
                scale:1.02,
                boxShadow: '0 40px 80px rgba(0,61,143,0.25), 0 0 60px rgba(0,172,183,0.3)',
                borderColor: 'rgba(0,172,183,0.5)'
              }}
              style={{
                position: 'relative',
                padding: '2.5rem 2rem',
                borderRadius: '18px',
                background: `linear-gradient(135deg, ${['rgba(232,244,255,0.98)', 'rgba(208,232,255,0.98)', 'rgba(184,220,255,0.98)', 'rgba(160,208,255,0.98)', 'rgba(136,200,255,0.98)', 'rgba(112,192,255,0.98)'][i]} 0%, ${['rgba(208,232,255,0.95)', 'rgba(184,220,255,0.95)', 'rgba(160,208,255,0.95)', 'rgba(136,200,255,0.95)', 'rgba(112,192,255,0.95)', 'rgba(88,180,255,0.95)'][i]} 100%)`,
                border: '2.5px solid rgba(0,61,143,0.12)',
                boxShadow: '0 15px 40px rgba(0,61,143,0.12), inset 0 1px 0 rgba(255,255,255,0.5)',
                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                cursor: 'pointer',
                overflow: 'hidden',
                backdropFilter: 'blur(12px)'
              }}
            >
              {/* Fondo decorativo de esquina */}
              <motion.div
                initial={{opacity: 0, scale: 0}}
                whileInView={{opacity: 0.8, scale: 1}}
                viewport={{once:true}}
                transition={{duration:0.8, delay:i*0.1}}
                style={{
                  position: 'absolute',
                  top: '-60px',
                  right: '-60px',
                  width: '180px',
                  height: '180px',
                  background: `radial-gradient(circle, ${['#003d8f', '#004AB7', '#0056d4', '#0066ff', '#0076ff', '#5060ff'][i]}33 0%, transparent 70%)`,
                  borderRadius: '50%',
                  pointerEvents: 'none',
                  zIndex: 1
                }}
              />

              {/* Línea superior con degradado */}
              <motion.div
                initial={{scaleX: 0, opacity: 0}}
                whileInView={{scaleX: 1, opacity: 1}}
                viewport={{once:true}}
                transition={{duration:0.7, delay:i*0.12, ease:"easeOut"}}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '5px',
                  background: `linear-gradient(90deg, ${['#003d8f', '#004AB7', '#0056d4', '#0066ff', '#0076ff', '#5060ff'][i]} 0%, ${['#004AB7', '#0056d4', '#0066ff', '#0076ff', '#5060ff', '#4040ff'][i]} 50%, ${['#0056d4', '#0066ff', '#0076d4', '#5060ff', '#4040ff', '#3030ff'][i]} 100%)`,
                  transformOrigin: 'left',
                  zIndex: 3
                }}
              />

              <div style={{position: 'relative', zIndex: 2}}>
                {/* Número badge con animación */}
                <motion.div
                  initial={{scale: 0, rotate: -180}}
                  whileInView={{scale: 1, rotate: 0}}
                  viewport={{once:true}}
                  transition={{duration:0.8, delay:i*0.12, type:"spring", bounce:0.6}}
                  style={{
                    position: 'absolute',
                    top: '-30px',
                    left: '25px',
                    width: '70px',
                    height: '70px',
                    background: `linear-gradient(135deg, ${['#003d8f', '#004AB7', '#0056d4', '#0066ff', '#0076ff', '#5060ff'][i]} 0%, ${['#004AB7', '#0056d4', '#0066ff', '#0076ff', '#5060ff', '#4040ff'][i]} 100%)`,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 900,
                    fontSize: '2rem',
                    boxShadow: '0 15px 35px rgba(0,61,143,0.35), 0 0 0 5px rgba(255,255,255,0.9)',
                    border: '4px solid white'
                  }}
                >
                  {step.n}
                </motion.div>

                {/* Icono grande */}
                <motion.div
                  initial={{opacity: 0, scale: 0.8}}
                  whileInView={{opacity: 1, scale: 1}}
                  viewport={{once:true}}
                  transition={{duration:0.6, delay:i*0.15}}
                  style={{
                    fontSize: '3.5rem',
                    marginBottom: '1.5rem',
                    marginTop: '2rem',
                    filter: 'drop-shadow(0 4px 8px rgba(0,61,143,0.25))'
                  }}
                >
                  {step.icon}
                </motion.div>

                {/* Título */}
                <motion.h3
                  initial={{opacity: 0}}
                  whileInView={{opacity: 1}}
                  viewport={{once:true}}
                  transition={{duration:0.5, delay:i*0.18}}
                  style={{
                    fontSize: '1.3rem',
                    fontWeight: 900,
                    color: '#003d8f',
                    marginBottom: '1rem',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.2
                  }}
                >
                  {step.title}
                </motion.h3>

                {/* Descripción */}
                <motion.p
                  initial={{opacity: 0}}
                  whileInView={{opacity: 1}}
                  viewport={{once:true}}
                  transition={{duration:0.5, delay:i*0.22}}
                  style={{
                    fontSize: '0.95rem',
                    color: '#555',
                    lineHeight: 1.7,
                    margin: 0,
                    fontWeight: 500
                  }}
                >
                  {step.desc}
                </motion.p>
              </div>

              {/* Efecto overlay hover */}
              <motion.div
                initial={{opacity: 0}}
                whileHover={{opacity: 1}}
                transition={{duration: 0.3}}
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '18px',
                  background: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(0,172,183,0.15) 0%, transparent 50%)',
                  pointerEvents: 'none',
                  zIndex: 2
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Conectores visuales (solo desktop) */}
        <div style={{
          display: 'none',
          position: 'absolute',
          top: '180px',
          left: '0',
          right: '0',
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, #004AB7 25%, #004AB7 75%, transparent 100%)',
          opacity: 0.2
        }} />

        {/* Flecha transicional */}
        <motion.div
          initial={{opacity: 0, y: -20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once:true}}
          transition={{duration:0.8, delay:0.6}}
          style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            color: '#004AB7',
            fontWeight: 'bold',
            marginBottom: '2rem'
          }}
        >
          <motion.span
            animate={{y: [0, 12, 0]}}
            transition={{duration:2, repeat: Infinity, ease:"easeInOut"}}
          >
            ↓
          </motion.span>
        </motion.div>

        {/* Texto final inspiracional */}
        <motion.div
          initial={{opacity: 0, y: 30}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once:true}}
          transition={{delay:0.7, duration:0.6}}
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '2.5rem',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #003d8f 0%, #004AB7 100%)',
            border: '2px solid rgba(0,172,183,0.3)',
            textAlign: 'center',
            color: 'white'
          }}
        >
          <p style={{
            fontSize: '1.1rem',
            lineHeight: 1.8,
            margin: 0,
            fontWeight: 500,
            color: '#FFFFFF'
          }}>
            <strong style={{fontSize: '1.2rem', display: 'block', marginBottom: '0.5rem', color: '#FFFFFF'}}>✓ Cada etapa es fundamental</strong>
            Nuestro proceso garantiza que encontramos exactamente el perfil que necesitas. Transparencia, calidad y velocidad en cada paso.
          </p>
        </motion.div>
      </section>

      {/* === KPIs === */}
      <section id="kpis" style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '4rem 1.5rem',
        background: 'linear-gradient(180deg, #FAFBFC 0%, #F0F7FF 100%)',
        borderRadius: '0'
      }}>
        <motion.h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 900,
          color: '#003d8f',
          marginBottom: '1rem',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          textAlign: 'center'
        }} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6}}>
          Indicadores de servicio
        </motion.h2>
        <motion.p style={{
          fontSize: '1.1rem',
          color: '#666',
          textAlign: 'center',
          marginBottom: '3rem',
          maxWidth: '600px',
          margin: '1rem auto 3rem'
        }} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:0.1, duration:0.6}}>
          Resultados medibles y comprobados
        </motion.p>

        <motion.div initial="hidden" whileInView="visible" viewport={{once:true}} variants={{hidden:{},visible:{transition:{staggerChildren:0.1}}}} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {kpis.map((k, i) => (
            <motion.div
              key={i}
              initial={{opacity:0, y:30}}
              whileInView={{opacity:1, y:0}}
              viewport={{once:true}}
              transition={{duration:0.5, delay:i*0.08}}
              whileHover={{transform: 'translateY(-8px)'}}
              style={{
                padding: '2.5rem 2rem',
                borderRadius: '16px',
                background: i % 2 === 0 ? 'linear-gradient(135deg, #003d8f 0%, #004AB7 100%)' : 'linear-gradient(135deg, #FFFFFF 0%, #F8FCFF 100%)',
                border: i % 2 === 0 ? '1px solid rgba(0,61,143,0.2)' : '1.5px solid #D0E8FF',
                boxShadow: i % 2 === 0 ? '0 10px 30px rgba(0,61,143,0.15)' : '0 4px 12px rgba(0,61,143,0.08)',
                transition: 'all 0.35s cubic-bezier(0.2,0.9,0.2,1)',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              <div style={{
                fontSize: '2.5rem',
                marginBottom: '1rem',
                filter: i % 2 === 0 ? 'drop-shadow(0 2px 4px rgba(255,255,255,0.2))' : 'drop-shadow(0 2px 4px rgba(0,61,143,0.15))',
                color: i % 2 === 0 ? '#FFD700' : '#003d8f'
              }}>
                {k.icon}
              </div>
              <div style={{
                fontSize: '2rem',
                fontWeight: 900,
                color: i % 2 === 0 ? 'white' : '#003d8f',
                marginBottom: '0.5rem',
                letterSpacing: '-0.02em'
              }}>
                {k.value}
              </div>
              <div style={{
                fontSize: '1rem',
                fontWeight: 700,
                color: i % 2 === 0 ? 'rgba(255,255,255,0.9)' : '#003d8f',
                marginBottom: '0.5rem'
              }}>
                {k.label}
              </div>
              <p style={{
                fontSize: '0.85rem',
                color: i % 2 === 0 ? 'rgba(255,255,255,0.75)' : '#888',
                margin: 0
              }}>
                {k.note}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* === MODALIDADES === */}
      <section id="modalidades" style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '4rem 1.5rem'
      }}>
        <motion.h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 900,
          color: '#003d8f',
          marginBottom: '1rem',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          textAlign: 'center'
        }} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6}}>
          Modalidades de servicio
        </motion.h2>
        <motion.p style={{
          fontSize: '1.1rem',
          color: '#666',
          textAlign: 'center',
          marginBottom: '3rem',
          maxWidth: '600px',
          margin: '1rem auto 3rem'
        }} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:0.1, duration:0.6}}>
          Elige la opción que mejor se adapte a tus necesidades
        </motion.p>

        <motion.div initial="hidden" whileInView="visible" viewport={{once:true}} variants={{hidden:{},visible:{transition:{staggerChildren:0.1}}}} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {modalities.map((m, i) => (
            <motion.div
              key={i}
              initial={{opacity:0, y:30}}
              whileInView={{opacity:1, y:0}}
              viewport={{once:true}}
              transition={{duration:0.5, delay:i*0.1}}
              whileHover={{transform: 'translateY(-12px)'}}
              style={{
                padding: '2.5rem 2rem',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FCFF 100%)',
                border: '1.5px solid #D0E8FF',
                boxShadow: '0 4px 12px rgba(0,61,143,0.08), 0 1px 3px rgba(0,0,0,0.05)',
                transition: 'all 0.35s cubic-bezier(0.2,0.9,0.2,1)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Fondo decorativo */}
              <div style={{
                position: 'absolute',
                top: '-40px',
                right: '-40px',
                width: '100px',
                height: '100px',
                background: 'radial-gradient(circle, rgba(0,61,143,0.08) 0%, transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none'
              }} />
              
              <div style={{
                position: 'relative',
                zIndex: 1
              }}>
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '1rem',
                  filter: 'drop-shadow(0 2px 4px rgba(0,61,143,0.15))',
                  color: '#003d8f'
                }}>
                  {m.icon}
                </div>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: '#003d8f',
                  marginBottom: '0.75rem',
                  letterSpacing: '-0.01em'
                }}>
                  {m.title}
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  color: '#666',
                  lineHeight: 1.7,
                  margin: 0
                }}>
                  {m.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* === CTA FINAL - Estilo Hero === */}
      <section style={{
        position: 'relative',
        padding: '5rem 0',
        background: 'linear-gradient(90deg, #003d8f 0%, #004AB7 35%, #004AB7 65%, #0056d4 100%)',
        overflow: 'hidden',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)'
      }}>
        {/* Overlay decorativo */}
        <div style={{
          content: '',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.1) 0%, transparent 40%), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.08) 0%, transparent 40%)',
          pointerEvents: 'none'
        }} />

        <div style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1.5rem',
          textAlign: 'center'
        }}>
          <motion.h3 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 900,
            color: 'white',
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em',
            lineHeight: 1.1
          }} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6}}>
            ¿Listos para iniciar una búsqueda?
          </motion.h3>
          <motion.p style={{
            fontSize: '1.15rem',
            color: 'rgba(255,255,255,0.9)',
            marginBottom: '2.5rem',
            maxWidth: '700px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.6
          }} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:0.1, duration:0.6}}>
            Agenda una llamada y armamos juntos el perfil ideal y los tiempos de cobertura. Nuestro equipo de expertos está listo para ayudarte.
          </motion.p>
          <motion.div initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:0.2, duration:0.6}} style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
            <Link href="/contacto" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 2.5rem',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #F0F4FF 100%)',
              color: '#004AB7',
              fontWeight: 700,
              fontSize: '1.15rem',
              borderRadius: '9999px',
              textDecoration: 'none',
              boxShadow: '0 10px 30px rgba(255,255,255,0.2), 0 1px 2px rgba(0,0,0,0.1)',
              transition: 'all 0.3s cubic-bezier(0.2,0.9,0.2,1)',
              border: '2px solid rgba(255,255,255,0.3)'
            }}>
              Agendar llamada
              <ChevronRight size={22} />
            </Link>
            <Link href="/servicios/payroll" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 2.5rem',
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              color: 'white',
              fontWeight: 700,
              fontSize: '1.15rem',
              borderRadius: '9999px',
              textDecoration: 'none',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              transition: 'all 0.3s cubic-bezier(0.2,0.9,0.2,1)',
              border: '2px solid rgba(255,255,255,0.3)'
            }}>
              Ver Payroll
              <ChevronRight size={22} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* === CONTACT FORM === */}
      <section style={{
        padding: '5rem 1.5rem',
        background: '#f8f9fa'
      }}>
        <ContactForm />
      </section>

      <Footer />
    </div>
  );
}