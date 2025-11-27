"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ShieldCheck, Clock, Book, Users } from 'lucide-react';
import ContactForm from '@/app/components/ContactForm';
import Footer from '@/components/Footer';

export default function Nom035Client({ dict }: any) {
    const [openFaq, setOpenFaq] = React.useState<number | null>(0);

    const icons = {
        ShieldCheck,
        Clock,
        Book,
        Users
    };

    return (
        <main>
            {/* HERO Mejorado - Full width con gradiente */}
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
                            {dict.common.back}
                        </Link>
                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                            fontWeight: 900,
                            color: 'white',
                            marginBottom: '1.5rem',
                            lineHeight: 1.1,
                            letterSpacing: '-0.02em'
                        }}>
                            {dict.nom035.hero.title}
                        </h1>
                        <p style={{
                            fontSize: '1.15rem',
                            color: 'rgba(255,255,255,0.95)',
                            lineHeight: 1.8,
                            marginBottom: '2rem',
                            maxWidth: '500px'
                        }}>
                            {dict.nom035.hero.description}
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
                            {dict.nom035.hero.cta}
                            <span>→</span>
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{ position: 'relative' }}
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
                            Imagen NOM-035
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats section */}
            <section style={{
                maxWidth: '1280px',
                margin: '0 auto',
                padding: '5rem 1.5rem'
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '2.5rem'
                    }}
                >
                    {dict.nom035.stats.map((stat: any, i: number) => {
                        const Icon = icons[stat.icon as keyof typeof icons];
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                whileHover={{ scale: 1.05, y: -8 }}
                                style={{
                                    padding: '2.5rem 2rem',
                                    borderRadius: '16px',
                                    background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}dd 100%)`,
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    textAlign: 'center',
                                    color: 'white',
                                    boxShadow: `0 15px 40px ${stat.color}33, inset 0 1px 0 rgba(255,255,255,0.1)`,
                                    cursor: 'pointer',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                        width: '100px',
                                        height: '100px',
                                        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                                        borderRadius: '50%',
                                        pointerEvents: 'none'
                                    }}
                                />
                                <div style={{ position: 'relative', zIndex: 2 }}>
                                    <Icon size={40} style={{ margin: '0 auto 1rem', color: '#FFD700' }} />
                                    <div style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>{stat.value}</div>
                                    <div style={{ fontSize: '0.95rem', opacity: 0.95, fontWeight: 600 }}>{stat.label}</div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </section>

            {/* Nuestro enfoque section */}
            <section style={{
                width: '100vw',
                marginLeft: 'calc(-50vw + 50%)',
                background: 'white',
                padding: '5rem 0',
                display: 'flex',
                justifyContent: 'center',
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: '1280px',
                    padding: '0 1.5rem',
                }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{
                            fontSize: 'clamp(2rem, 4vw, 3rem)',
                            fontWeight: 900,
                            color: '#003d8f',
                            marginBottom: '4rem',
                            textAlign: 'center',
                            letterSpacing: '-0.02em'
                        }}
                    >
                        {dict.nom035.approachTitle}
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: '2.5rem',
                            marginBottom: '4rem'
                        }}
                    >
                        {dict.nom035.approach.map((step: any, i: number) => {
                            const Icon = icons[step.icon as keyof typeof icons];
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    whileHover={{ scale: 1.05, y: -12 }}
                                    style={{
                                        padding: '2.5rem 2rem',
                                        borderRadius: '16px',
                                        background: i % 2 === 0
                                            ? 'linear-gradient(135deg, #E8F4FF 0%, #D0E8FF 100%)'
                                            : 'linear-gradient(135deg, #F0F9FF 0%, #E8F5FF 100%)',
                                        border: ' 2px solid rgba(0,61,143,0.12)',
                                        transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                        boxShadow: '0 12px 35px rgba(0,61,143,0.08), inset 0 1px 0 rgba(255,255,255,0.6)',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <div style={{
                                        position: 'absolute',
                                        top: -20,
                                        right: -20,
                                        fontSize: '120px',
                                        fontWeight: 900,
                                        color: 'rgba(0,61,143,0.08)',
                                        lineHeight: 1
                                    }}>
                                        {step.num}
                                    </div>

                                    <motion.div
                                        animate={{ opacity: [0.6, 1, 0.6] }}
                                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
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
                                        width: '65px',
                                        height: '65px',
                                        background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FDFF 100%)',
                                        borderRadius: '14px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '1.5rem',
                                        border: '1.5px solid rgba(0,61,143,0.15)',
                                        color: '#003d8f',
                                        fontSize: '2rem',
                                        position: 'relative',
                                        zIndex: 2
                                    }}>
                                        <Icon size={32} />
                                    </div>

                                    <div style={{ position: 'relative', zIndex: 2 }}>
                                        <h3 style={{
                                            fontSize: '1.25rem',
                                            fontWeight: 800,
                                            color: '#003d8f',
                                            marginBottom: '0.75rem'
                                        }}>
                                            {step.title}
                                        </h3>

                                        <p style={{
                                            fontSize: '0.95rem',
                                            color: '#666',
                                            lineHeight: 1.6,
                                            margin: 0
                                        }}>
                                            {step.desc}
                                        </p>
                                    </div>

                                    <motion.div
                                        whileHover={{ opacity: 1 }}
                                        initial={{ opacity: 0 }}
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5) 0%, transparent 70%)',
                                            borderRadius: '16px',
                                            pointerEvents: 'none'
                                        }}
                                    />
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* FAQ Section */}
            <section style={{
                width: '100vw',
                marginLeft: 'calc(-50vw + 50%)',
                background: 'linear-gradient(180deg, #E8F4FF 0%, #D0E8FF 100%)',
                padding: '5rem 0',
                display: 'flex',
                justifyContent: 'center',
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: '1280px',
                    padding: '0 1.5rem',
                }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{
                            fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                            fontWeight: 900,
                            color: '#003d8f',
                            marginBottom: '4rem',
                            letterSpacing: '-0.02em',
                            textAlign: 'center'
                        }}
                    >
                        {dict.nom035.faqTitle}
                    </motion.h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '4rem',
                        alignItems: 'start'
                    }}>
                        {/* FAQs - Left side */}
                        <div>
                            <h3 style={{
                                fontSize: '1.3rem',
                                fontWeight: 700,
                                color: '#003d8f',
                                marginBottom: '1.5rem',
                                margin: '0 0 1.5rem 0'
                            }}>
                                {dict.nom035.faq.commonTitle}
                            </h3>
                            {dict.nom035.faq.common.map((faq: any, i: number) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    style={{
                                        marginBottom: '1rem',
                                        borderRadius: '12px',
                                        border: '2px solid rgba(0,61,143,0.12)',
                                        background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FDFF 100%)',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <button
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                        style={{
                                            width: '100%',
                                            padding: '1.5rem',
                                            border: 'none',
                                            background: 'none',
                                            textAlign: 'left',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        <span style={{
                                            fontSize: '1rem',
                                            fontWeight: 700,
                                            color: '#003d8f'
                                        }}>
                                            {faq.q}
                                        </span>
                                        <motion.span
                                            animate={{ rotate: openFaq === i ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                            style={{
                                                fontSize: '1.5rem',
                                                color: '#004AB7',
                                                flexShrink: 0,
                                                marginLeft: '1rem'
                                            }}
                                        >
                                            +
                                        </motion.span>
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {openFaq === i && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                style={{
                                                    padding: '0 1.5rem 1.5rem',
                                                    borderTop: '1px solid rgba(0,61,143,0.1)'
                                                }}
                                            >
                                                <p style={{
                                                    margin: 0,
                                                    color: '#666',
                                                    lineHeight: 1.6,
                                                    fontSize: '0.95rem'
                                                }}>
                                                    {faq.a}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>

                        {/* Benefits - Right side */}
                        <div>
                            <h3 style={{
                                fontSize: '1.3rem',
                                fontWeight: 700,
                                color: '#003d8f',
                                marginBottom: '1.5rem',
                                margin: '0 0 1.5rem 0'
                            }}>
                                {dict.nom035.faq.benefitsTitle}
                            </h3>

                            {dict.nom035.faq.benefits.map((benefit: any, i: number) => {
                                const Icon = icons[benefit.icon as keyof typeof icons];
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: i * 0.15 }}
                                        whileHover={{ x: 12 }}
                                        style={{
                                            padding: '1.75rem',
                                            borderRadius: '12px',
                                            background: 'linear-gradient(135deg, #E8F4FF 0%, #F0F9FF 100%)',
                                            border: '2px solid rgba(0,61,143,0.15)',
                                            marginBottom: '1.5rem',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            minHeight: '160px'
                                        }}
                                    >
                                        <div style={{
                                            display: 'flex',
                                            gap: '1rem',
                                            alignItems: 'flex-start',
                                            flex: 1
                                        }}>
                                            <div style={{
                                                width: '50px',
                                                height: '50px',
                                                background: 'linear-gradient(135deg, #003d8f 0%, #004AB7 100%)',
                                                borderRadius: '10px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'white',
                                                flexShrink: 0,
                                                boxShadow: '0 8px 16px rgba(0,61,143,0.2)'
                                            }}>
                                                <Icon size={24} />
                                            </div>

                                            <div style={{ flex: 1 }}>
                                                <h4 style={{
                                                    fontSize: '1rem',
                                                    fontWeight: 700,
                                                    color: '#003d8f',
                                                    marginBottom: '0.5rem',
                                                    margin: '0 0 0.5rem 0'
                                                }}>
                                                    {benefit.title}
                                                </h4>
                                                <p style={{
                                                    fontSize: '0.9rem',
                                                    color: '#666',
                                                    lineHeight: 1.5,
                                                    margin: 0
                                                }}>
                                                    {benefit.desc}
                                                </p>
                                            </div>
                                        </div>

                                        <motion.div
                                            animate={{ scale: [1, 1.05, 1] }}
                                            transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                                            style={{
                                                position: 'absolute',
                                                inset: 0,
                                                background: 'radial-gradient(circle at 100% 0%, rgba(0,172,183,0.1) 0%, transparent 70%)',
                                                borderRadius: '12px',
                                                pointerEvents: 'none'
                                            }}
                                        />
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA final section */}
            <section style={{
                width: '100vw',
                marginLeft: 'calc(-50vw + 50%)',
                padding: '6rem 1.5rem',
                background: 'linear-gradient(90deg, #003d8f 0%, #004AB7 35%, #004AB7 65%, #0056d4 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 5, repeat: Infinity }}
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
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
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

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    style={{
                        maxWidth: '1280px',
                        margin: '0 auto',
                        textAlign: 'center',
                        position: 'relative',
                        zIndex: 2
                    }}
                >
                    <h2 style={{
                        fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                        fontWeight: 900,
                        color: 'white',
                        marginBottom: '1rem',
                        letterSpacing: '-0.02em'
                    }}>
                        {dict.nom035.ctaFinal.title}
                    </h2>

                    <p style={{
                        fontSize: '1.15rem',
                        color: 'rgba(255,255,255,0.9)',
                        marginBottom: '2.5rem',
                        lineHeight: 1.6
                    }}>
                        {dict.nom035.ctaFinal.description}
                    </p>

                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link href="/#contacto" style={{
                                display: 'inline-block',
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
                                {dict.nom035.ctaFinal.primary}
                            </Link>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link href="/#contacto" style={{
                                display: 'inline-block',
                                padding: '1rem 2rem',
                                background: 'rgba(255,255,255,0.2)',
                                color: 'white',
                                borderRadius: '12px',
                                fontWeight: 700,
                                fontSize: '1rem',
                                textDecoration: 'none',
                                border: '2px solid rgba(255,255,255,0.3)',
                                backdropFilter: 'blur(10px)',
                                transition: 'all 0.3s ease'
                            }}>
                                {dict.nom035.ctaFinal.secondary}
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* Sección de Contacto */}
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
                            {dict.nom035.contact.title}
                        </h2>
                        <p style={{
                            fontSize: '1.1rem',
                            color: '#666',
                            maxWidth: '700px',
                            margin: '0 auto',
                            lineHeight: 1.7
                        }}>
                            {dict.nom035.contact.description}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <ContactForm />
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
