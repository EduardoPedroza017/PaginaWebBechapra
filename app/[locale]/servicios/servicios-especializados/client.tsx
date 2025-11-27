"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Footer from '@/components/Footer';

const ContactForm = dynamic(() => import("@/app/components/ContactForm"), { ssr: false });

const cardBgColors = [
    'linear-gradient(135deg, #e3f0ff 60%, #c7e0ff 100%)', // azul más saturado
    'linear-gradient(135deg, #e6eaff 60%, #d1d8f7 100%)', // azul-gris más fuerte
    'linear-gradient(135deg, #e0f3ff 60%, #b8e2ff 100%)', // celeste más vivo
    'linear-gradient(135deg, #ede3ff 60%, #d7c7ff 100%)', // lila más saturado
    'linear-gradient(135deg, #e3fff6 60%, #b8ffe6 100%)', // menta más saturado
    'linear-gradient(135deg, #f3e3ff 60%, #e0c7ff 100%)', // lila-gris más fuerte
    'linear-gradient(135deg, #e3f0ff 60%, #c7e0ff 100%)', // azul hielo más saturado
];

export default function ServiciosEspecializadosClient({ dict, servicios, stats, whyItems }: any) {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)' }}>
            {/* HERO SECTION - Igual a /servicios */}
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
                            background: '#fff',
                            color: '#004AB7',
                            padding: '0.6rem 1.2rem',
                            borderRadius: '50px',
                            border: '2px solid #fff',
                            fontSize: '0.95rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            textDecoration: 'none',
                            marginBottom: '1.5rem',
                            boxShadow: '0 2px 8px rgba(0,74,183,0.08)',
                            letterSpacing: '-0.5px',
                            position: 'relative',
                            zIndex: 2
                        }}>
                            <ChevronLeft size={18} />
                            {dict.serviciosEspecializados.hero.back}
                        </Link>
                        <h1 style={{
                            fontSize: '3rem',
                            fontWeight: 800,
                            lineHeight: 1.1,
                            color: '#FFFFFF',
                            margin: '0 0 1rem 0',
                            letterSpacing: '-0.02em'
                        }}>
                            {dict.serviciosEspecializados.hero.title}
                        </h1>
                        <p style={{
                            fontSize: '1.15rem',
                            lineHeight: 1.6,
                            color: 'rgba(255,255,255,0.85)',
                            margin: '0 0 2rem 0',
                            maxWidth: '540px'
                        }}>
                            {dict.serviciosEspecializados.hero.description}
                        </p>
                        <Link href="/#contacto" style={{
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
                            {dict.serviciosEspecializados.hero.cta}
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
                            boxShadow: '0 20px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.1)'
                        }}>
                            <Image
                                src="/imagen/servicos/servicios-especializados.jpg"
                                alt="Servicios Especializados Bechapra"
                                fill
                                style={{
                                    objectFit: 'cover'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>			{/* STATS SECTION */}
            <section style={{
                padding: '4rem 2rem',
                background: 'linear-gradient(180deg, #F8FAFF 0%, #ffffff 100%)',
                borderBottom: '1px solid #E5EEFF'
            }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
                    {stats.map((stat: any, i: number) => (
                        <div key={i} style={{
                            textAlign: 'center',
                            padding: '2rem 1.5rem',
                            background: 'white',
                            borderRadius: '20px',
                            border: '2px solid #E5EEFF',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,87,217,0.15)';
                                e.currentTarget.style.borderColor = '#0057D9';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.borderColor = '#E5EEFF';
                            }}>
                            <stat.icon size={36} color="#0057D9" style={{ margin: '0 auto 1rem' }} />
                            <div style={{ fontSize: '2.8rem', fontWeight: 900, color: '#0057D9', marginBottom: '0.5rem', letterSpacing: '-1px' }}>{stat.value}</div>
                            <div style={{ fontSize: '1rem', color: '#0A1933', fontWeight: 600 }}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* NUESTRAS SOLUCIONES SECTION */}
            <section style={{
                padding: '5rem 0',
                background: '#fff',
                width: '100vw',
                marginLeft: 'calc(-50vw + 50%)',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>

                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{
                            fontSize: 'clamp(2rem, 4vw, 3rem)',
                            fontWeight: 900,
                            color: '#0A1933',
                            marginBottom: '1rem',
                            letterSpacing: '-1px'
                        }}>
                            {dict.serviciosEspecializados.solutions.title}
                        </h2>
                        <p style={{ fontSize: '1.2rem', color: '#0A1933', opacity: 0.7, maxWidth: '700px', margin: '0 auto' }}>
                            {dict.serviciosEspecializados.solutions.description}
                        </p>
                    </div>

                    {/* Cards Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                        {servicios.map((servicio: any, i: number) => (
                            <div
                                key={i}
                                onMouseEnter={() => setHoveredCard(i)}
                                onMouseLeave={() => setHoveredCard(null)}
                                style={{
                                    background: hoveredCard === i
                                        ? cardBgColors[i % cardBgColors.length]
                                        : cardBgColors[i % cardBgColors.length],
                                    borderRadius: '24px',
                                    padding: '2.5rem',
                                    border: hoveredCard === i
                                        ? '2.5px solid #0057D9'
                                        : '2.5px solid #D0D8F0',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transform: hoveredCard === i ? 'translateY(-14px) scale(1.025)' : 'translateY(0) scale(1)',
                                    boxShadow: hoveredCard === i
                                        ? '0 12px 40px 0 rgba(0,87,217,0.18), 0 2px 8px 0 rgba(0,87,217,0.10)'
                                        : '0 2px 12px 0 rgba(0,87,217,0.10)',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    color: hoveredCard === i ? '#0A1933' : '#0A1933',
                                }}
                            >
                                {/* Background decoration */}
                                <div style={{
                                    position: 'absolute',
                                    top: '-50%',
                                    right: '-50%',
                                    width: '200%',
                                    height: '200%',
                                    background: `radial-gradient(circle, ${servicio.color}10 0%, transparent 70%)`,
                                    transition: 'all 0.4s ease',
                                    transform: hoveredCard === i ? 'scale(1.2)' : 'scale(0.8)',
                                    opacity: hoveredCard === i ? 1 : 0
                                }} />

                                {/* Icon */}
                                <div style={{
                                    width: '70px',
                                    height: '70px',
                                    background: hoveredCard === i
                                        ? `linear-gradient(135deg, ${servicio.color} 0%, ${servicio.color}DD 100%)`
                                        : `${servicio.color}10`,
                                    borderRadius: '18px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '1.5rem',
                                    transition: 'all 0.4s ease',
                                    transform: hoveredCard === i ? 'rotate(-5deg) scale(1.1)' : 'rotate(0) scale(1)',
                                    position: 'relative',
                                    zIndex: 1
                                }}>
                                    <servicio.icon size={32} color={hoveredCard === i ? '#ffffff' : servicio.color} strokeWidth={2.5} />
                                </div>

                                {/* Content */}
                                <h3 style={{
                                    fontSize: '1.35rem',
                                    fontWeight: 800,
                                    color: hoveredCard === i ? '#004AB7' : '#0A1933',
                                    marginBottom: '1rem',
                                    transition: 'color 0.3s ease',
                                    position: 'relative',
                                    zIndex: 1,
                                    letterSpacing: '-0.3px',
                                    textShadow: hoveredCard === i ? '0 1px 8px #fff8, 0 0px 1px #fff' : 'none'
                                }}>
                                    {servicio.title}
                                </h3>
                                <p style={{
                                    fontSize: '1.05rem',
                                    color: hoveredCard === i ? '#0A1933' : '#0A1933',
                                    opacity: hoveredCard === i ? 0.95 : 0.75,
                                    lineHeight: 1.6,
                                    position: 'relative',
                                    zIndex: 1,
                                    textShadow: hoveredCard === i ? '0 1px 8px #fff8, 0 0px 1px #fff' : 'none'
                                }}>
                                    {servicio.desc}
                                </p>

                                {/* Arrow indicator */}
                                <div style={{
                                    marginTop: '1.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    color: hoveredCard === i ? '#004AB7' : servicio.color,
                                    fontWeight: 700,
                                    fontSize: '0.95rem',
                                    opacity: hoveredCard === i ? 1 : 0,
                                    transform: hoveredCard === i ? 'translateX(0)' : 'translateX(-10px)',
                                    transition: 'all 0.3s ease',
                                    position: 'relative',
                                    zIndex: 1,
                                    textShadow: hoveredCard === i ? '0 1px 8px #fff8, 0 0px 1px #fff' : 'none'
                                }}>
                                    {dict.serviciosEspecializados.solutions.cta} <ChevronRight size={18} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHY BECHAPRA SECTION */}
            <section style={{
                padding: '5rem 0',
                background: 'linear-gradient(120deg, #f7fbff 0%, #eaf6ff 100%)',
                width: '100vw',
                marginLeft: 'calc(-50vw + 50%)',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
                    <h2 style={{
                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                        fontWeight: 900,
                        color: '#0A1933',
                        textAlign: 'center',
                        marginBottom: '3rem',
                        letterSpacing: '-1px'
                    }}>
                        {dict.serviciosEspecializados.why.title}
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {whyItems.map((item: any, i: number) => (
                            <div key={i} style={{
                                background: 'white',
                                padding: '2.5rem',
                                borderRadius: '24px',
                                border: '2px solid #E5EEFF',
                                transition: 'all 0.3s ease'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                    e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,87,217,0.15)';
                                    e.currentTarget.style.borderColor = '#0057D9';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                    e.currentTarget.style.borderColor = '#E5EEFF';
                                }}>
                                <item.icon size={40} color="#0057D9" style={{ marginBottom: '1.5rem' }} strokeWidth={2.5} />
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0A1933', marginBottom: '1rem', letterSpacing: '-0.5px' }}>{item.title}</h3>
                                <p style={{ fontSize: '1.05rem', color: '#0A1933', opacity: 0.75, lineHeight: 1.6 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* FORMULARIO DE CONTACTO */}
            <section style={{
                background: '#fff',
                padding: '5rem 0 3rem',
                borderTop: '1px solid #E5EEFF',
                width: '100vw',
                marginLeft: 'calc(-50vw + 50%)',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <div
                    style={{
                        maxWidth: '900px',
                        margin: '0 auto',
                        padding: '0 1.5rem',
                        width: '100%',
                    }}
                >
                    <h3
                        style={{
                            fontSize: '2.3rem',
                            fontWeight: 900,
                            color: '#004AB7',
                            marginBottom: '1.5rem',
                            letterSpacing: '-0.02em',
                            textAlign: 'center',
                        }}
                    >
                        {dict.serviciosEspecializados.contact.title}
                    </h3>
                    <p
                        style={{
                            fontSize: '1.25rem',
                            color: '#0A1933',
                            marginBottom: '2.5rem',
                            textAlign: 'center',
                            opacity: 0.8,
                            lineHeight: 1.6,
                            maxWidth: 700,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}
                    >
                        {dict.serviciosEspecializados.contact.description}
                    </p>
                    <div style={{ width: '100%' }}>
                        <ContactForm />
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <Footer />
        </div>
    );
}
