"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import Footer from '@/components/Footer';

export default function NoticiasClient({ dict, categories }: any) {
    return (
        <main style={{ background: 'linear-gradient(180deg, #E8F4FF 0%, #D0E8FF 100%)' }}>
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

                <div style={{
                    maxWidth: '1280px',
                    margin: '0 auto',
                    position: 'relative',
                    zIndex: 2
                }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
                            fontWeight: 900,
                            color: 'white',
                            marginBottom: '1rem',
                            letterSpacing: '-0.02em',
                            lineHeight: 1.2
                        }}>
                            <span style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{dict.noticias.hero.title}</span> {dict.noticias.hero.subtitle}
                        </h1>

                        <p style={{
                            fontSize: '1.2rem',
                            color: 'rgba(255,255,255,0.9)',
                            lineHeight: 1.7,
                            marginBottom: '3rem',
                            maxWidth: '700px'
                        }}>
                            {dict.noticias.hero.description}
                        </p>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
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
                                {dict.noticias.hero.cta} →
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Buscador y Noticias Más Recientes */}
            <section style={{
                width: '100vw',
                marginLeft: 'calc(-50vw + 50%)',
                padding: '6rem 0',
                background: '#E0F0FF',
            }}>
                {/* Buscador */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: '4.5rem',
                }}>
                    <div style={{ display: 'flex', width: '100%', maxWidth: '600px' }}>
                        <input
                            type="text"
                            placeholder={dict.noticias.search.placeholder}
                            style={{
                                width: '100%',
                                maxWidth: '500px',
                                padding: '1rem 1.5rem',
                                borderRadius: '30px',
                                border: '1.5px solid #b3d0f7',
                                fontSize: '1.05rem',
                                outline: 'none',
                                boxShadow: '0 2px 12px rgba(0,61,143,0.04)',
                                marginRight: '0.5rem',
                                background: 'white',
                            }}
                            disabled
                        />
                        <button style={{
                            padding: '1rem 2rem',
                            borderRadius: '30px',
                            background: 'linear-gradient(90deg, #003d8f 0%, #0056d4 100%)',
                            color: 'white',
                            fontWeight: 700,
                            fontSize: '1rem',
                            border: 'none',
                            cursor: 'not-allowed',
                            boxShadow: '0 2px 12px rgba(0,61,143,0.08)'
                        }}
                            disabled
                        >
                            {dict.noticias.search.button}
                        </button>
                    </div>
                    <span style={{ color: '#888', fontSize: '0.98rem', marginTop: '0.7rem' }}>{dict.noticias.search.comingSoon}</span>
                </div>
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
                    {dict.noticias.recent.title}
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                        gap: '2.8rem',
                        padding: '0 0.5rem',
                        maxWidth: '1200px',
                        width: '100%',
                        margin: '0 auto',
                    }}
                >
                    {dict.noticias.articles.map((item: any, i: number) => (
                        <motion.article
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            whileHover={{ scale: 1.03, y: -8 }}
                            style={{
                                borderRadius: '18px',
                                background: 'white',
                                border: item.featured ? '2px solid #003d8f' : '2px solid rgba(0,61,143,0.10)',
                                transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                boxShadow: '0 8px 32px rgba(0,61,143,0.10)',
                                position: 'relative',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                minHeight: '420px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                            }}
                        >
                            {item.featured && (
                                <div style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                                    color: '#003d8f',
                                    padding: '0.4rem 0.8rem',
                                    borderRadius: '6px',
                                    fontSize: '0.75rem',
                                    fontWeight: 800,
                                    zIndex: 3,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    {dict.noticias.labels.featured}
                                </div>
                            )}

                            {/* Imagen */}
                            <div style={{
                                width: '100%',
                                height: '220px',
                                background: item.type === 'legal'
                                    ? 'linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)'
                                    : item.type === 'event'
                                        ? 'linear-gradient(135deg, #F0E6FF 0%, #E8D4FF 100%)'
                                        : 'linear-gradient(135deg, #E8F4FF 0%, #D0E8FF 100%)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    left: '1rem',
                                    background: item.type === 'legal'
                                        ? '#D97706'
                                        : item.type === 'event'
                                            ? '#7C3AED'
                                            : '#003d8f',
                                    color: 'white',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '8px',
                                    fontSize: '0.85rem',
                                    fontWeight: 700,
                                    zIndex: 2
                                }}>
                                    {item.category}
                                </div>
                            </div>

                            <div style={{ padding: '2rem' }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    marginBottom: '1rem',
                                    fontSize: '0.85rem',
                                    color: '#666'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                        <Clock size={16} />
                                        <span>{item.date}</span>
                                    </div>
                                    <span>•</span>
                                    <span>{item.readTime} {dict.noticias.labels.readTime}</span>
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
                                    href="#"
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
                                    {dict.noticias.labels.readArticle} →
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
                {/* Paginación simple */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '4.5rem',
                    marginBottom: '1.5rem',
                }}>
                    <button style={{
                        padding: '1.1rem 2.8rem',
                        borderRadius: '30px',
                        background: 'linear-gradient(90deg, #003d8f 0%, #0056d4 100%)',
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '1.08rem',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 2px 12px rgba(0,61,143,0.10)'
                    }}>
                        {dict.noticias.loadMore}
                    </button>
                </div>
            </section>

            {/* Categorías Section */}
            <section style={{
                width: '100vw',
                marginLeft: 'calc(-50vw + 50%)',
                padding: '6rem 0',
                background: '#E0F0FF',
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
                    {dict.noticias.categories.title}
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '2rem',
                        maxWidth: '1000px',
                        width: '100%',
                        margin: '0 auto',
                    }}
                >
                    {categories.map((item: any, i: number) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                whileHover={{ scale: 1.05, y: -8 }}
                                style={{
                                    padding: '2.5rem 2rem',
                                    borderRadius: '16px',
                                    background: 'linear-gradient(135deg, #E8F4FF 0%, #D0E8FF 100%)',
                                    border: '2px solid rgba(0,61,143,0.12)',
                                    transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                    boxShadow: '0 12px 35px rgba(0,61,143,0.08)',
                                    cursor: 'pointer',
                                    textAlign: 'center'
                                }}
                            >
                                <div style={{
                                    width: '70px',
                                    height: '70px',
                                    background: 'white',
                                    borderRadius: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 1.5rem',
                                    border: '1.5px solid rgba(0,61,143,0.15)',
                                    color: item.color
                                }}>
                                    <Icon size={36} />
                                </div>

                                <h3 style={{
                                    fontSize: '1.25rem',
                                    fontWeight: 800,
                                    color: '#003d8f',
                                    marginBottom: '0.5rem'
                                }}>
                                    {item.title}
                                </h3>

                                <p style={{
                                    fontSize: '0.85rem',
                                    color: '#666',
                                    marginBottom: '0.75rem',
                                    lineHeight: 1.4
                                }}>
                                    {item.description}
                                </p>

                                <p style={{
                                    fontSize: '0.95rem',
                                    color: '#003d8f',
                                    margin: 0,
                                    fontWeight: 700
                                }}>
                                    {item.count}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}
