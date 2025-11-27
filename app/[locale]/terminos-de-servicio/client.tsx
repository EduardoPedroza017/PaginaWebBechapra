"use client";

import React from 'react';
import { motion } from 'framer-motion';
import SubpageHero from '@/components/SubpageHero';
import Footer from '@/components/Footer';

export default function TerminosServicioClient({ dict }: any) {
    return (
        <main style={{
            minHeight: '100vh',
            background: 'linear-gradient(to bottom, #ffffff 0%, #f8fafc 50%, #ffffff 100%)',
            position: 'relative'
        }}>
            {/* Decorative background elements */}
            <div style={{
                position: 'absolute',
                top: '10%',
                right: '-5%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(0,74,183,0.08) 0%, transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 0
            }} />
            <div style={{
                position: 'absolute',
                bottom: '20%',
                left: '-3%',
                width: '350px',
                height: '350px',
                background: 'radial-gradient(circle, rgba(0,172,183,0.06) 0%, transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 0
            }} />

            {/* Hero Section */}
            <SubpageHero
                title={dict.terminosServicio.hero.title}
                subtitle={dict.terminosServicio.hero.subtitle}
            />

            {/* Content Section */}
            <section style={{
                position: 'relative',
                zIndex: 1,
                maxWidth: '1200px',
                margin: '0 auto',
                padding: 'clamp(3rem, 5vw, 6rem) clamp(1.5rem, 3vw, 2rem)'
            }}>
                {/* Introduction */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{
                        marginBottom: '4rem',
                        padding: '2.5rem',
                        background: 'linear-gradient(135deg, #004AB7 0%, #0066CC 100%)',
                        borderRadius: '16px',
                        boxShadow: '0 10px 40px rgba(0,74,183,0.2), 0 0 0 1px rgba(0,74,183,0.1)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <p style={{
                        fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
                        lineHeight: 1.8,
                        color: 'white',
                        margin: 0,
                        position: 'relative',
                        zIndex: 1
                    }}>
                        {dict.terminosServicio.introduction}
                    </p>
                </motion.div>

                {/* Sections */}
                {dict.terminosServicio.sections.map((section: any, index: number) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        style={{
                            marginBottom: '3rem',
                            paddingLeft: '1.5rem',
                            borderLeft: '3px solid #004AB7'
                        }}
                    >
                        <h2 style={{
                            fontSize: 'clamp(1.5rem, 2vw, 1.875rem)',
                            fontWeight: 700,
                            color: '#004AB7',
                            marginBottom: '1.25rem',
                            margin: 0
                        }}>
                            {section.title}
                        </h2>
                        <div style={{
                            fontSize: 'clamp(1rem, 1.5vw, 1.0625rem)',
                            lineHeight: 1.8,
                            color: '#475569',
                            whiteSpace: 'pre-line'
                        }}>
                            {section.content}
                        </div>
                    </motion.div>
                ))}

                {/* Footer Note */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{
                        marginTop: '4rem',
                        padding: '2rem',
                        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                        borderRadius: '12px',
                        textAlign: 'center',
                        border: '1px solid rgba(0,74,183,0.1)',
                        boxShadow: '0 2px 12px rgba(0,74,183,0.08)'
                    }}
                >
                    <p style={{
                        fontSize: '0.95rem',
                        color: '#64748b',
                        margin: 0
                    }}>
                        {dict.terminosServicio.footer}
                    </p>
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}
