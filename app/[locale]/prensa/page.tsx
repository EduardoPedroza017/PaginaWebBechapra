"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Newspaper, ExternalLink, Calendar, Download } from 'lucide-react';
import Footer from '@/components/Footer';

export default function PrensaPage() {
    return (
        <main>
            {/* Hero Section */}
            <section style={{
                width: '100vw',
                marginLeft: 'calc(-50vw + 50%)',
                padding: '6rem 1.5rem 8rem',
                background: 'linear-gradient(90deg, #003d8f 0%, #004AB7 35%, #004AB7 65%, #0056d4 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Decorative circles */}
                <motion.div
                    animate={{scale: [1, 1.2, 1]}}
                    transition={{duration: 5, repeat: Infinity}}
                    style={{
                        position: 'absolute',
                        width: '500px',
                        height: '500px',
                        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                        borderRadius: '50%',
                        top: '-200px',
                        right: '-200px',
                        pointerEvents: 'none'
                    }}
                />
                <motion.div
                    animate={{scale: [1, 1.1, 1]}}
                    transition={{duration: 6, repeat: Infinity, delay: 0.5}}
                    style={{
                        position: 'absolute',
                        width: '400px',
                        height: '400px',
                        background: 'radial-gradient(circle, rgba(0,172,183,0.1) 0%, transparent 70%)',
                        borderRadius: '50%',
                        bottom: '-150px',
                        left: '-150px',
                        pointerEvents: 'none'
                    }}
                />

                <div style={{
                    maxWidth: '1280px',
                    margin: '0 auto',
                    position: 'relative',
                    zIndex: 2
                }}>
                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.6}}
                    >
                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
                            fontWeight: 900,
                            color: 'white',
                            marginBottom: '1rem',
                            letterSpacing: '-0.02em',
                            lineHeight: 1.2
                        }}>
                            <span style={{background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Sala de</span> Prensa
                        </h1>

                        <p style={{
                            fontSize: '1.2rem',
                            color: 'rgba(255,255,255,0.9)',
                            lineHeight: 1.7,
                            marginBottom: '3rem',
                            maxWidth: '700px'
                        }}>
                            Mantente informado sobre nuestros comunicados oficiales, reconocimientos y apariciones en medios.
                        </p>

                        <motion.div
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                        >
                            <Link href="/#contacto" style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '1rem 2rem',
                                background: 'white',
                                color: '#003d8f',
                                borderRadius: '12px',
                                fontWeight: 700,
                                fontSize: '1rem',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 12px 30px rgba(0,0,0,0.15)'
                            }}>
                                Contacto de prensa →
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Comunicados de Prensa Section */}
            <section style={{
                width: '100vw',
                marginLeft: 'calc(-50vw + 50%)',
                padding: '6rem 0',
                background: '#fff',
            }}>
                <motion.h2
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.6}}
                    style={{
                        fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                        fontWeight: 900,
                        color: '#003d8f',
                        marginBottom: '4rem',
                        letterSpacing: '-0.02em',
                        textAlign: 'center'
                    }}
                >
                    Comunicados de Prensa
                </motion.h2>

                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <motion.div
                        initial={{opacity: 0, y: 40}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.6}}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                            gap: '2.5rem',
                            marginBottom: '5rem',
                            maxWidth: '1100px',
                            width: '100%',
                        }}
                    >
                    {[
                        {
                            date: '15 Octubre 2024',
                            title: 'Bechapra expande sus servicios de Capital Humano',
                            excerpt: 'La empresa anuncia nuevas soluciones integrales para el desarrollo organizacional y gestión del talento.',
                            link: '#'
                        },
                        {
                            date: '3 Septiembre 2024',
                            title: 'Reconocimiento como empresa líder en consultoría',
                            excerpt: 'Bechapra recibe distinción por su excelencia en servicios empresariales y compromiso con clientes.',
                            link: '#'
                        },
                        {
                            date: '20 Julio 2024',
                            title: 'Nueva alianza estratégica con sector tecnológico',
                            excerpt: 'Acuerdo permitirá integrar innovación digital en todos nuestros servicios de Management.',
                            link: '#'
                        }
                    ].map((item, i) => (
                        <motion.article
                            key={i}
                            initial={{opacity: 0, y: 30}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{duration: 0.5, delay: i * 0.1}}
                            whileHover={{scale: 1.03, y: -8}}
                            style={{
                                padding: '2.5rem 2rem',
                                borderRadius: '16px',
                                background: 'linear-gradient(135deg, #E8F4FF 0%, #D0E8FF 100%)',
                                border: '2px solid rgba(0,61,143,0.12)',
                                transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                boxShadow: '0 12px 35px rgba(0,61,143,0.08)',
                                position: 'relative',
                                overflow: 'hidden',
                                cursor: 'pointer'
                            }}
                        >
                            {/* Borde superior decorativo */}
                            <motion.div
                                animate={{opacity: [0.6, 1, 0.6]}}
                                transition={{duration: 3, repeat: Infinity, delay: i * 0.3}}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: '4px',
                                    background: `linear-gradient(90deg, #003d8f 0%, #004AB7 50%, #0056d4 100%)`
                                }}
                            />

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                marginBottom: '1.5rem',
                                color: '#003d8f'
                            }}>
                                <Calendar size={18} />
                                <span style={{fontSize: '0.9rem', fontWeight: 600}}>{item.date}</span>
                            </div>

                            <h3 style={{
                                fontSize: '1.35rem',
                                fontWeight: 800,
                                color: '#003d8f',
                                marginBottom: '1rem',
                                lineHeight: 1.3
                            }}>
                                {item.title}
                            </h3>

                            <p style={{
                                fontSize: '0.95rem',
                                color: '#666',
                                lineHeight: 1.6,
                                marginBottom: '1.5rem'
                            }}>
                                {item.excerpt}
                            </p>

                            <Link 
                                href={item.link}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    color: '#003d8f',
                                    fontWeight: 700,
                                    fontSize: '0.95rem',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                Leer más <ExternalLink size={16} />
                            </Link>
                        </motion.article>
                    ))}
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
