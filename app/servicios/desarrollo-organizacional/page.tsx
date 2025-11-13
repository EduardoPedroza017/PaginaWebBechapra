'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Users, Award, BookOpen, ShieldCheck, Smile, BarChart3 } from 'lucide-react';
import Footer from '@/components/Footer';
import ContactForm from '@/app/components/ContactForm';

const servicios = [
  {
    icon: <BookOpen size={28} />,
    title: 'Capacitación Empresarial',
    desc: 'Desde habilidades técnicas hasta desarrollo de liderazgo, formamos parte de las capacitadoras del CCPM',
    href: '/servicios/capacitacion-empresarial'
  },
  {
    icon: <BarChart3 size={28} />,
    title: 'Consultoría Organizacional',
    desc: 'Soluciones para resolver problemas, identificar oportunidades, fomentar el aprendizaje y facilitar la implementación de cambios.'
    // Sin ruta
  },
  {
    icon: <ShieldCheck size={28} />,
    title: 'NOM-035',
    desc: 'Detectamos problemas y oportunidades internas para fomentar un ambiente laboral saludable y colaborativo.',
    href: '/servicios/nom-035'
  },
];

const beneficios = [
  {
    icon: <Award size={32} />,
    title: 'Acceso Exclusivo BTC',
    desc: 'Accede a nuestra agenda de cursos gratuitos, avalados por el Colegio de Contadores Públicos CDMX.'
  },
  {
    icon: <Users size={32} />,
    title: 'Asesoramiento Personalizado',
    desc: 'Sesiones de asesoramiento personalizado con expertos en NOM-035.'
  },
  {
    icon: <BarChart3 size={32} />,
    title: 'Planificación Estratégica',
    desc: 'Desarrollamos estrategias a largo plazo que impulsen el crecimiento y el éxito de tu empresa en el mercado actual.'
  },
];

export default function DesarrolloOrganizacionalPage() {

  return (
    <main>
      <div>
        {/* HERO Mejorado - Full width con gradiente */}
        <section style={{
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          background: 'linear-gradient(90deg, #003d8f 0%, #004AB7 35%, #004AB7 65%, #0056d4 100%)',
          padding: '4.5rem 1.5rem 4rem', // Menos padding arriba y abajo
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative elements */}
          <div style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute',
            bottom: -50,
            left: -50,
            width: '250px',
            height: '250px',
            background: 'radial-gradient(circle, rgba(0,172,183,0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none'
          }} />

          <div style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '2.2rem', // Menos espacio entre columnas
            alignItems: 'center',
            position: 'relative',
            zIndex: 2,
            minHeight: '380px' // Asegura altura mínima para centrar
          }}>
            <motion.div initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} transition={{duration: 0.7}}>
              {/* Back button */}
              <Link 
                href="/servicios" 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.6rem 1.5rem',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: '#003d8f',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  background: 'white',
                  borderRadius: '50px',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                  border: 'none',
                  marginBottom: '1.5rem'
                }}
              >
                <span style={{fontSize: '1.1rem'}}>‹</span>
                Volver
              </Link>
              <h1 style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                fontWeight: 900,
                color: 'white',
                marginBottom: '1.1rem',
                lineHeight: 1.1,
                letterSpacing: '-0.02em'
              }}>
                Creando una cultura de éxito empresarial
              </h1>
              <p style={{
                fontSize: '1.15rem',
                color: 'rgba(255,255,255,0.95)',
                lineHeight: 1.7,
                marginBottom: '1.5rem',
                maxWidth: '500px'
              }}>
                ¡Potencia el crecimiento y la eficacia de tu empresa a través de nuestros servicios de Desarrollo Organizacional!
              </p>
              <Link href="/#contacto" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 2rem',
                borderRadius: '12px',
                background: 'white',
                color: '#003d8f',
                fontWeight: 700,
                fontSize: '1rem',
                textDecoration: 'none',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(255,255,255,0.2)'
              }}>
                Solicitar consultoría
                <span>→</span>
              </Link>
            </motion.div>

            <motion.div 
              initial={{opacity: 0, scale: 0.9, rotate: -5}} 
              animate={{opacity: 1, scale: 1, rotate: 0}} 
              transition={{duration: 0.8, delay: 0.2}}
              style={{
                position: 'relative'
              }}
            >
              <div style={{
                width: '100%',
                height: '380px',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(0,172,183,0.1) 100%)',
                borderRadius: '20px',
                border: '2px solid rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.2rem',
                fontWeight: 600,
                textAlign: 'center',
                padding: '2rem'
              }}>
                Imagen Desarrollo Organizacional
              </div>
            </motion.div>
          </div>
        </section>

        {/* SERVICIOS Mejorados */}
        <section style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '5rem 1.5rem',
          background: 'linear-gradient(180deg, transparent 0%, rgba(0,61,143,0.02) 100%)'
        }}>
          <motion.h2 
            initial={{opacity: 0, y: 20}} 
            whileInView={{opacity: 1, y: 0}} 
            viewport={{once: true}} 
            transition={{duration: 0.6}}
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 900,
              color: '#003d8f',
              marginBottom: '4rem',
              textAlign: 'center',
              letterSpacing: '-0.02em'
            }}
          >
            Soluciones para tu organización
          </motion.h2>

          {/* Grid de cards de servicios */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2.5rem',
            justifyContent: 'center',
            alignItems: 'stretch',
          }}>
            {servicios.map((s, i) => (
              <motion.div
                key={i}
                whileHover={{
                  scale: 1.08,
                  y: -8,
                  transition: {duration: 0.3, type: "spring", bounce: 0.4}
                }}
                style={{
                  minHeight: '220px',
                  padding: '2rem',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FDFF 50%, #F0F9FF 100%)',
                  border: '2px solid rgba(0,61,143,0.12)',
                  textAlign: 'center',
                  transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  boxShadow: '0 12px 35px rgba(0,61,143,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
                  backdropFilter: 'blur(12px)',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                {/* Borde superior animado */}
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

                {/* Icono mejorado */}
                <div style={{
                  width: '70px',
                  height: '70px',
                  background: 'linear-gradient(135deg, #E8F4FF 0%, #D0E8FF 100%)',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  position: 'relative',
                  zIndex: 2,
                  border: '1.5px solid rgba(0,61,143,0.15)',
                  color: '#003d8f',
                  fontSize: '2rem'
                }}>
                  {s.icon}
                </div>

                {/* Contenido */}
                <div style={{position: 'relative', zIndex: 2}}>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    color: '#003d8f',
                    marginBottom: '0.8rem',
                    textAlign: 'center'
                  }}>
                    {s.title}
                  </h3>
                  <p style={{
                    fontSize: '0.95rem',
                    color: '#666',
                    lineHeight: 1.5,
                    margin: 0,
                    textAlign: 'justify',
                    textJustify: 'inter-word'
                  }}>
                    {s.desc}
                  </p>
                </div>

                {/* Botón de acción si hay ruta */}
                {s.href && (
                  <Link href={s.href} style={{
                    marginTop: '1.2rem',
                    display: 'inline-block',
                    padding: '0.7rem 1.5rem',
                    borderRadius: '10px',
                    background: '#004AB7',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '1rem',
                    textDecoration: 'none',
                    boxShadow: '0 4px 16px rgba(0,74,183,0.10)',
                    transition: 'background 0.2s, color 0.2s',
                  }}>
                    Ver más
                  </Link>
                )}

                {/* Efecto de brillo */}
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
              </motion.div>
            ))}
          </div>
        </section>

        {/* BENEFICIOS Mejorados */}
        <section style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '5rem 1.5rem',
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: '3rem',
          alignItems: 'center'
        }}>
          <div>
            <motion.h2 
              initial={{opacity: 0, y: 20}} 
              whileInView={{opacity: 1, y: 0}} 
              viewport={{once: true}} 
              transition={{duration: 0.6}}
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 900,
                color: '#003d8f',
                marginBottom: '4rem',
                textAlign: 'left',
                letterSpacing: '-0.02em'
              }}
            >
              Beneficios Centro de Capacitación
            </motion.h2>

            {/* Cards en escalera con hover azul y texto blanco */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2.5rem',
              marginTop: '1rem'
            }}>
              {beneficios.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{opacity: 0, y: 30}}
                  whileInView={{opacity: 1, y: 0}}
                  viewport={{once: true}}
                  transition={{duration: 0.18, delay: 0}}
                  whileHover={{
                    scale: 1.05,
                    y: -12,
                    backgroundColor: '#0057D9',
                    color: '#fff',
                    transition: { duration: 0.18 }
                  }}
                  style={{
                    padding: '2.5rem 2rem',
                    borderRadius: '16px',
                    background: '#fff',
                    color: '#222',
                    border: '2px solid rgba(0,61,143,0.12)',
                    transition: 'background 0.18s, color 0.18s',
                    boxShadow: '0 12px 35px rgba(0,61,143,0.08), inset 0 1px 0 rgba(255,255,255,0.6)',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    marginLeft: `${i * 2.5}rem`,
                    textAlign: 'justify',
                    textJustify: 'inter-word',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                  }}
                >
                  <div style={{display: 'flex', alignItems: 'center', gap: '1.1rem'}}>
                    <span
                      style={{
                        color: 'inherit',
                        background: 'rgba(0,61,143,0.07)',
                        borderRadius: '10px',
                        padding: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'color 0.2s',
                      }}
                    >
                      {b.icon}
                    </span>
                    <h3
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: 800,
                        marginBottom: '0.75rem',
                        color: 'inherit',
                        textAlign: 'left',
                        transition: 'color 0.2s',
                      }}
                    >
                      {b.title}
                    </h3>
                  </div>
                  <p
                    style={{
                      fontSize: '0.95rem',
                      color: 'inherit',
                      lineHeight: 1.6,
                      margin: 0,
                      textAlign: 'justify',
                      textJustify: 'inter-word',
                      transition: 'color 0.2s',
                    }}
                  >
                    {b.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Image
              src="/imagen/prueba/tranning.webp"
              alt="Beneficio visual"
              width={220}
              height={320}
              style={{
                borderRadius: '18px',
                boxShadow: '0 12px 35px rgba(0,61,143,0.12)',
                objectFit: 'cover',
                width: '220px',
                height: '320px',
                display: 'block'
              }}
            />
          </div>
        </section>

        {/* CTA FINAL Mejorado */}
        <motion.section
          initial={{opacity: 0, y: 30}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.8}}
          style={{
            width: '100vw',
            marginLeft: 'calc(-50vw + 50%)',
            background: 'linear-gradient(135deg, #1a1a2e 0%, #0f0f1e 50%, #1a1a2e 100%)',
            padding: '3rem 2rem',
            marginTop: '4rem',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{
            maxWidth: '1280px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 2,
            padding: '0 2rem'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 520px',
              gap: '3rem',
              alignItems: 'center',
              padding: '0'
            }}>
              <div style={{
                textAlign: 'left',
                maxWidth: '640px'
              }}>
                <motion.h3
                  initial={{opacity: 0, scale: 0.9}}
                  whileInView={{opacity: 1, scale: 1}}
                  transition={{duration: 0.6}}
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: 900,
                    color: 'white',
                    marginBottom: '1.5rem',
                    letterSpacing: '-0.02em'
                  }}
                >
                  Transforma tu organización hoy
                </motion.h3>

                <motion.p
                  initial={{opacity: 0, y: 20}}
                  whileInView={{opacity: 1, y: 0}}
                  transition={{delay: 0.2, duration: 0.6}}
                  style={{
                    fontSize: '1.15rem',
                    color: 'rgba(255,255,255,0.8)',
                    marginBottom: '2.5rem',
                    lineHeight: 1.8,
                    textAlign: 'justify',
                    textJustify: 'inter-word'
                  }}
                >
                  Agenda una consulta y conoce nuestras soluciones personalizadas para cultura, clima y talento.
                </motion.p>

                <motion.div
                  initial={{opacity: 0, y: 20}}
                  whileInView={{opacity: 1, y: 0}}
                  transition={{delay: 0.3, duration: 0.6}}
                  style={{
                    display: 'flex',
                    gap: '1.25rem',
                    flexDirection: 'column',
                    alignItems: 'flex-start'
                  }}
                >
                  <div style={{display: 'flex', gap: '2rem', flexDirection: 'row'}}>
                    <Link 
                      href="/#contacto" 
                      style={{
                        padding: '1.1rem 2.5rem',
                        borderRadius: '20px',
                        background: '#0B4ED9',
                        color: '#fff',
                        fontWeight: 800,
                        fontSize: '1.25rem',
                        textDecoration: 'none',
                        transition: 'background 0.18s, color 0.18s',
                        cursor: 'pointer',
                        boxShadow: '0 8px 24px rgba(11, 78, 217, 0.12)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '320px',
                        minHeight: '64px',
                        textAlign: 'center',
                        border: 'none',
                        letterSpacing: '-0.01em'
                      }}
                    >
                      Agenda una cita
                    </Link>
                    <Link 
                      href="#casos-exito" 
                      style={{
                        padding: '1.1rem 2.5rem',
                        borderRadius: '20px',
                        background: 'transparent',
                        color: '#fff',
                        fontWeight: 800,
                        fontSize: '1.25rem',
                        textDecoration: 'none',
                        transition: 'background 0.18s, color 0.18s',
                        cursor: 'pointer',
                        boxShadow: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '320px',
                        minHeight: '64px',
                        textAlign: 'center',
                        border: '2px solid #0B4ED9',
                        letterSpacing: '-0.01em'
                      }}
                    >
                      Ver casos de éxito
                    </Link>
                  </div>
                </motion.div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}>
                <div style={{
                  width: '100%',
                  maxWidth: '520px',
                  height: '300px',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  boxShadow: '0 28px 60px rgba(0, 0, 0, 0.4)',
                  position: 'relative'
                }}>
                  <Image
                    src="/imagen/contacto/contacto-men.avif"
                    alt="Desarrollo Organizacional"
                    width={520}
                    height={300}
                    quality={95}
                    priority
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* CONTACT SECTION */}
        <section style={{
          padding: '5rem 0',
          background: 'white',
          borderTop: '1px solid rgba(0, 74, 183, 0.08)'
        }}>
          <div style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 1.5rem'
          }}>
            <h2
              style={{
                color: '#003d8f',
                fontWeight: 900,
                fontSize: 'clamp(2.2rem, 4vw, 2.8rem)',
                textAlign: 'center',
                marginBottom: '2.5rem',
                letterSpacing: '-0.01em',
                textShadow: '0 2px 12px rgba(0,61,143,0.08)'
              }}
            >
              Contáctanos
            </h2>
            <ContactForm />
          </div>
        </section>

        {/* FOOTER */}
        <Footer />
      </div>
    </main>
  );
}