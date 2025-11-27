"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle, Target, TrendingUp, Lightbulb, Shield, BarChart3 } from 'lucide-react';
import ContactForm from '@/app/components/ContactForm';
import Footer from '@/components/Footer';

export default function Page() {
    return (
        <main>
            {/* HERO */}
            <section style={{
                width: '100vw',
                marginLeft: 'calc(-50vw + 50%)',
                background: 'linear-gradient(90deg, #003d8f 0%, #004AB7 35%, #004AB7 65%, #0056d4 100%)',
                padding: '6rem 1.5rem 5rem',
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
                    gap: '3rem',
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 2
                }}>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
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
                            <span style={{ fontSize: '1.1rem' }}>‹</span>
                            Volver
                        </Link>
                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                            fontWeight: 900,
                            color: 'white',
                            marginBottom: '1.5rem',
                            lineHeight: 1.1,
                            letterSpacing: '-0.02em'
                        }}>
                            Consultoría <span style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Organizacional</span>
                        </h1>
                        <p style={{
                            fontSize: '1.15rem',
                            color: 'rgba(255,255,255,0.95)',
                            lineHeight: 1.8,
                            marginBottom: '2rem',
                            maxWidth: '500px'
                        }}>
                            Consultoría experta para optimizar estructura y procesos. Desbloquea el potencial de tu organización.
                        </p>
                        <Link href="#contacto" style={{
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
                            Comienza ahora
                            <span>→</span>
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
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
                            fontWeight: '600',
                            textAlign: 'center',
                            padding: '2rem'
                        }}>
                            Imagen Consultoría Organizacional
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Sección de tarjetas de servicios (fondo blanco, full width) */}
            <section style={{
                width: '100vw',
                marginLeft: 'calc(-50vw + 50%)',
                background: 'white',
                padding: '5rem 0 3rem 0',
                display: 'flex',
                justifyContent: 'center',
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: '1280px',
                    padding: '0 2rem',
                }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{
                            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                            fontWeight: 900,
                            color: '#003d8f',
                            marginBottom: '3rem',
                            textAlign: 'center',
                            letterSpacing: '-0.02em'
                        }}
                    >
                        Nuestros Servicios de Consultoría
                    </motion.h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '2rem'
                    }}>
                        {[
                            {
                                title: 'Estrategia de Organización',
                                icon: Target,
                                color: '#003d8f'
                            },
                            {
                                title: 'Administrativa',
                                icon: BarChart3,
                                color: '#004AB7'
                            },
                            {
                                title: 'Prevención de Riesgos Laborales',
                                icon: Shield,
                                color: '#0056d4'
                            },
                            {
                                title: 'Financiera',
                                icon: TrendingUp,
                                color: '#003d8f'
                            },
                            {
                                title: 'Recursos Humanos',
                                icon: CheckCircle,
                                color: '#004AB7'
                            },
                            {
                                title: 'Especializada',
                                icon: Lightbulb,
                                color: '#0056d4'
                            }
                        ].map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    whileHover={{
                                        y: -12,
                                        scale: 1.03,
                                        transition: { duration: 0.3 }
                                    }}
                                    style={{
                                        padding: '2.5rem 2rem',
                                        borderRadius: '20px',
                                        background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FDFF 100%)',
                                        border: '2px solid rgba(0,61,143,0.12)',
                                        textAlign: 'center',
                                        boxShadow: '0 10px 30px rgba(0,61,143,0.08)',
                                        cursor: 'pointer',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {/* Decorative gradient bar */}
                                    <div style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: '4px',
                                        background: `linear-gradient(90deg, ${item.color} 0%, ${item.color}99 100%)`,
                                        borderRadius: '20px 20px 0 0'
                                    }} />

                                    {/* Icon container */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: i * 0.1 + 0.2, type: 'spring' }}
                                        style={{
                                            width: '80px',
                                            height: '80px',
                                            background: `linear-gradient(135deg, ${item.color}15 0%, ${item.color}08 100%)`,
                                            borderRadius: '16px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            margin: '0 auto 1.5rem',
                                            border: `2px solid ${item.color}20`
                                        }}
                                    >
                                        <Icon size={36} style={{ color: item.color }} />
                                    </motion.div>

                                    <h3 style={{
                                        fontSize: '1.2rem',
                                        fontWeight: 800,
                                        color: item.color,
                                        margin: 0,
                                        lineHeight: 1.3
                                    }}>
                                        {item.title}
                                    </h3>

                                    {/* Shine effect on hover */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            background: `radial-gradient(circle at 50% 50%, ${item.color}08 0%, transparent 70%)`,
                                            borderRadius: '20px',
                                            pointerEvents: 'none'
                                        }}
                                    />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Cómo Trabajamos (fondo azul claro y suave, full width) */}
            <section style={{
                width: '100vw',
                marginLeft: 'calc(-50vw + 50%)',
                background: 'linear-gradient(180deg, #E8F4FF 0%, #D0E8FF 100%)',
                padding: '4rem 0',
                display: 'flex',
                justifyContent: 'center',
            }}>
                <div style={{
                    maxWidth: '1280px',
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '4rem',
                    alignItems: 'center',
                    padding: '0 2rem',
                }}>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <div style={{
                            width: '100%',
                            height: '400px',
                            background: 'linear-gradient(135deg, #E8F4FF 0%, #D0E8FF 100%)',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                            border: '2px solid rgba(0,61,143,0.1)'
                        }}>
                            <span style={{ fontSize: '1.2rem', color: '#003d8f', fontWeight: 700 }}>Imagen Cómo Trabajamos</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <h2 style={{
                            fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                            fontWeight: 900,
                            color: '#003d8f',
                            marginBottom: '1.5rem',
                            letterSpacing: '-0.02em'
                        }}>
                            Cómo Trabajamos
                        </h2>
                        <p style={{
                            fontSize: '1.05rem',
                            color: '#666',
                            lineHeight: 1.8,
                            marginBottom: '1.5rem'
                        }}>
                            En Bechapra creemos en la colaboración estrecha y el enfoque personalizado para cada cliente. Nuestro proceso de trabajo se divide en tres pasos clave:
                        </p>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.75rem'
                        }}>
                            {[
                                'Diagnóstico y Análisis',
                                'Diseño de Soluciones Personalizadas',
                                'Implementación y Seguimiento'
                            ].map((item, i) => (
                                <div key={i} style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '0.75rem'
                                }}>
                                    <CheckCircle size={24} style={{ color: '#003d8f', flexShrink: 0, marginTop: '2px' }} />
                                    <span style={{ fontSize: '0.95rem', color: '#666', lineHeight: 1.6 }}>{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Potencia el crecimiento (fondo blanco, full width) */}
            <section style={{
                width: '100vw',
                marginLeft: 'calc(-50vw + 50%)',
                background: 'white',
                padding: '4rem 0',
                display: 'flex',
                justifyContent: 'center',
            }}>
                <div style={{
                    maxWidth: '1280px',
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '4rem',
                    alignItems: 'center',
                    padding: '0 2rem',
                }}>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <h2 style={{
                            fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                            fontWeight: 900,
                            color: '#1a1a1a',
                            marginBottom: '1.5rem',
                            letterSpacing: '-0.02em'
                        }}>
                            Potencia el crecimiento y el éxito de tu empresa
                        </h2>
                        <p style={{
                            fontSize: '1.05rem',
                            color: '#666',
                            lineHeight: 1.8,
                            marginBottom: '1.5rem'
                        }}>
                            Desarrollamos estrategias estructurales y funcionales que impulsan el crecimiento y la eficiencia, permitiéndote superar el estancamiento y alcanzar nuevos horizontes de éxito.
                        </p>
                        <p style={{
                            fontSize: '1.1rem',
                            color: '#003d8f',
                            fontWeight: 700,
                            marginBottom: '2rem'
                        }}>
                            Estamos aquí para entender tus desafíos y diseñar una solución personalizada para tu empresa.
                        </p>
                        <Link
                            href="#contacto"
                            style={{
                                display: 'inline-block',
                                padding: '1rem 2.5rem',
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, #003d8f 0%, #004AB7 100%)',
                                color: 'white',
                                fontWeight: 700,
                                fontSize: '1rem',
                                textDecoration: 'none',
                                boxShadow: '0 8px 24px rgba(0,61,143,0.25)',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            COMIENZA AHORA →
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <div style={{
                            width: '100%',
                            height: '400px',
                            background: 'linear-gradient(135deg, #E8F4FF 0%, #D0E8FF 100%)',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                            border: '2px solid rgba(0,61,143,0.1)'
                        }}>
                            <span style={{ fontSize: '1.2rem', color: '#003d8f', fontWeight: 700 }}>Imagen Potencia</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Sección con beneficios (fondo azul claro y suave, full width, cards centrados) */}
            <section style={{
                width: '100vw',
                marginLeft: 'calc(-50vw + 50%)',
                background: 'linear-gradient(180deg, #E8F4FF 0%, #D0E8FF 100%)',
                padding: '4rem 0 0 0',
                marginBottom: '0',
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: '1400px',
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '2.5rem',
                    alignItems: 'end',
                }}>
                    {[
                        { title: 'Plan estratégico personalizado', icon: Target },
                        { title: 'Herramientas y procesos mejorados', icon: BarChart3 },
                        { title: 'Protocolos de Seguridad y Prevención de Riesgos Laborales', icon: Shield }
                    ].map((benefit, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            style={{
                                padding: '2.5rem 2rem 2rem 2rem',
                                borderRadius: '20px',
                                background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FDFF 100%)',
                                border: '2px solid rgba(0,61,143,0.12)',
                                textAlign: 'center',
                                boxShadow: '0 10px 30px rgba(0,61,143,0.08)',
                                cursor: 'pointer',
                                position: 'relative',
                                overflow: 'hidden',
                                transition: 'all 0.3s ease',
                                marginBottom: '0',
                            }}
                        >
                            <benefit.icon size={40} style={{ color: '#003d8f', margin: '0 auto 1rem' }} />
                            <h3 style={{
                                fontSize: '1.15rem',
                                fontWeight: 700,
                                color: '#003d8f',
                                margin: 0,
                                lineHeight: 1.4
                            }}>
                                {benefit.title}
                            </h3>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA FINAL */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{
                    width: '100vw',
                    marginLeft: 'calc(-50vw + 50%)',
                    background: 'linear-gradient(135deg, #003d8f 0%, #004AB7 100%)',
                    padding: '5rem 1.5rem',
                    marginTop: '4rem',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <div style={{
                    maxWidth: '1280px',
                    margin: '0 auto',
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 2
                }}>
                    <motion.h3
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        style={{
                            fontSize: 'clamp(2rem, 4vw, 3rem)',
                            fontWeight: 900,
                            color: 'white',
                            marginBottom: '1.5rem',
                            letterSpacing: '-0.02em'
                        }}
                    >
                        No dejes que los problemas detengan tu progreso
                    </motion.h3>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        style={{
                            fontSize: '1.15rem',
                            color: 'rgba(255,255,255,0.95)',
                            marginBottom: '2rem',
                            maxWidth: '600px',
                            margin: '0 auto 2rem',
                            lineHeight: 1.8
                        }}
                    >
                        ¡Descubre cómo podemos ayudarte a superarlos!
                    </motion.p>
                </div>
            </motion.section>

            {/* Sección de Contacto (full width) */}
            <section id="contacto" style={{
                width: '100vw',
                marginLeft: 'calc(-50vw + 50%)',
                background: 'linear-gradient(180deg, rgba(0,61,143,0.02) 0%, white 100%)',
                padding: '6rem 0',
                display: 'flex',
                justifyContent: 'center',
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: '1280px',
                    padding: '0 1.5rem',
                }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        style={{
                            textAlign: 'center',
                            marginBottom: '3rem'
                        }}
                    >
                        <h2 style={{
                            fontSize: 'clamp(2rem, 4vw, 3rem)',
                            fontWeight: 900,
                            color: '#003d8f',
                            marginBottom: '1rem',
                            letterSpacing: '-0.02em'
                        }}>
                            ¿Interesado en alguno de nuestros servicios?
                        </h2>
                        <p style={{
                            fontSize: '1.1rem',
                            color: '#666',
                            maxWidth: '700px',
                            margin: '0 auto',
                            lineHeight: 1.7
                        }}>
                            ¡Envíenos un mensaje con los detalles y estaremos encantados de ayudarle!
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        style={{
                            maxWidth: '900px',
                            margin: '0 auto',
                            background: 'white',
                            padding: '3rem 2.5rem',
                            borderRadius: '20px'
                            // Sin sombra ni borde para un look limpio
                        }}
                    >
                        <ContactForm />
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </main>
    );
}
