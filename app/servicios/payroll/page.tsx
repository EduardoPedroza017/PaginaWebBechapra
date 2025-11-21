"use client";
import React from "react";
import { FileText, Calendar, Banknote, Users, Shield, CheckCircle, Briefcase, ChevronLeft, ChevronRight, ClipboardList, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.css";
import Footer from '@/components/Footer';
import ContactForm from '@/app/components/ContactForm';

const benefits = [
    {
        icon: <Shield className={styles.payrollCardIcon} />, 
        title: "Precisión y Fiabilidad",
        desc: "Contamos con un equipo de expertos en nómina que garantizan la exactitud en cada pago de empleado."
    },
    {
        icon: <Calendar className={styles.payrollCardIcon} />,
        title: "Cumplimiento Normativo",
        desc: "Nuestra gestión de nómina está diseñada para cumplir con todas las regulaciones fiscales y laborales vigentes."
    },
    {
        icon: <Banknote className={styles.payrollCardIcon} />,
        title: "Seguridad de los Datos",
        desc: "Implementamos medidas robustas de seguridad para proteger la información confidencial de tu empresa."
    },
    {
        icon: <Users className={styles.payrollCardIcon} />,
        title: "Costo-Efectividad",
        desc: "Ofrecemos soluciones de nómina de alta calidad a precios competitivos."
    },
];

const processSteps = [
    {
        icon: <FileText className={styles.payrollCardIcon} />,
        title: "Recepción de información",
        desc: "Recibimos y validamos los datos de empleados, incidencias y percepciones."
    },
    {
        icon: <Briefcase className={styles.payrollCardIcon} />,
        title: "Cálculo y timbrado",
        desc: "Realizamos el cálculo de nómina, deducciones, impuestos y timbrado de recibos."
    },
    {
        icon: <CheckCircle className={styles.payrollCardIcon} />,
        title: "Pago y reportes",
        desc: "Gestionamos la dispersión de pagos y generamos reportes para la empresa y empleados."
    },
];

export default function PayrollPage() {
    const textStyle: React.CSSProperties = {
        textAlign: 'justify',
    };

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)' }}>
            {/* HERO SECTION - Pantalla completa */}
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
                            Payroll & Nómina Empresarial
                        </h1>
                        <p style={{
                            fontSize: '1.15rem',
                            lineHeight: 1.6,
                            color: 'rgba(255,255,255,0.85)',
                            margin: '0 0 2rem 0',
                            maxWidth: '540px',
                            textAlign: 'justify'
                        }}>
                            Gestiona tu nómina de forma profesional, segura y sin errores. Cumplimos con todas las obligaciones fiscales y laborales, para que tú te enfoques en hacer crecer tu empresa. Payroll Bechapra es tranquilidad y eficiencia para tu negocio y tus colaboradores.
                        </p>
                        <Link href="/contacto" style={{
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
                            boxShadow: '0 20px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.1)'
                        }}>
                        <Image
                            src="/imagen/talento/atracciontalento.jpg"
                            alt="Payroll Bechapra"
                            fill
                            style={{
                                objectFit: 'cover'
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>            {/* ¿QUÉ ES PAYROLL? */}
            <section style={{
                width: '100vw',
                marginLeft: 'calc(-50vw + 50%)',
                padding: '4rem 0',
                background: '#fff',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
                <motion.h2 style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: 900,
                    color: '#003d8f',
                    marginBottom: '2rem',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1
                }} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6}}>
                    ¿Qué es el servicio de payroll?
                </motion.h2>
                <motion.div initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:0.1, duration:0.6}}>
                    <p style={{
                        fontSize: '1.1rem',
                        color: '#666',
                        lineHeight: 1.8,
                        marginTop: '3rem',
                        maxWidth: '800px',
                        margin: '3rem auto 0',
                        textAlign: 'justify'
                    }}>
                        <strong style={{color: '#003d8f'}}>Ideal para empresas</strong> que buscan eficiencia, seguridad y <strong style={{color: '#003d8f'}}>cumplimiento normativo</strong> en su gestión de recursos humanos y nómina.
                    </p>
                </motion.div>
                </div>
            </section>

            {/* BENEFICIOS */}
            <section style={{
                width: '100vw',
                marginLeft: 'calc(-50vw + 50%)',
                padding: '4rem 0',
                background: 'linear-gradient(120deg, #f7fbff 0%, #eaf6ff 100%)',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
                <motion.h2 style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: 900,
                    color: '#003d8f',
                    marginBottom: '3rem',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                    textAlign: 'center'
                }} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6}}>
                    Beneficios de externalizar tu nómina
                </motion.h2>
                <motion.div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '2rem'
                }} initial="hidden" whileInView="visible" viewport={{once:true}} variants={{hidden:{},visible:{transition:{staggerChildren:0.1}}}}>
                    {benefits.map((b, i) => {
                        const pastelBg = [
                            'linear-gradient(135deg, #e3f0ff 60%, #c7e0ff 100%)',
                            'linear-gradient(135deg, #f3f7ff 60%, #e6eaff 100%)',
                            'linear-gradient(135deg, #e0f7fa 60%, #b2ebf2 100%)',
                            'linear-gradient(135deg, #f0f7ff 60%, #e3f0ff 100%)'
                        ];
                        return (
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
                                background: pastelBg[i % pastelBg.length],
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
                                    marginBottom: '0.75rem',
                                    letterSpacing: '-0.01em',
                                    textShadow: '0 1px 8px #fff8, 0 0px 1px #fff'
                                }}>
                                    {b.title}
                                </h3>
                                <p style={{
                                    fontSize: '0.95rem',
                                    color: '#666',
                                    lineHeight: 1.7,
                                    margin: 0,
                                    textAlign: 'justify'
                                }}>
                                    {b.desc}
                                </p>
                            </div>
                        </motion.div>
                        );
                    })}
                </motion.div>
                </div>
            </section>

            {/* PROCESO */}

            <section style={{
                width: '100vw',
                marginLeft: 'calc(-50vw + 50%)',
                padding: '4rem 0',
                background: '#fff',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
                <motion.h2 style={{
                    fontSize: 'clamp(2.3rem, 4vw, 3.2rem)',
                    fontWeight: 900,
                    color: '#003d8f',
                    marginBottom: '3.5rem',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.1,
                    textAlign: 'center',
                    textShadow: '0 2px 12px #e3f0ff, 0 1px 0 #fff',
                }} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6}}>
                    ¿Cómo funciona nuestro proceso?
                </motion.h2>

                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '2.5rem',
                    justifyContent: 'center',
                    alignItems: 'stretch',
                }}>
                    {processSteps.map((step, i) => {
                        const pastelBg = [
                            'linear-gradient(135deg, #e3f0ff 60%, #c7e0ff 100%)',
                            'linear-gradient(135deg, #f3f7ff 60%, #e6eaff 100%)',
                            'linear-gradient(135deg, #e0f7fa 60%, #b2ebf2 100%)',
                        ];
                        return (
                            <motion.div
                                key={i}
                                initial={{opacity:0, y:30}}
                                whileInView={{opacity:1, y:0}}
                                viewport={{once:true}}
                                transition={{duration:0.5, delay:i*0.1}}
                                whileHover={{
                                    scale: 1.04,
                                    boxShadow: '0 12px 40px 0 rgba(0,87,217,0.13), 0 2px 8px 0 rgba(0,87,217,0.10)'
                                }}
                                style={{
                                    flex: '1 1 320px',
                                    minWidth: 320,
                                    maxWidth: 420,
                                    background: pastelBg[i % pastelBg.length],
                                    border: '2.5px solid #b3d0f7',
                                    borderRadius: '22px',
                                    boxShadow: '0 6px 32px 0 rgba(0, 74, 183, 0.07), 0 1.5px 6px 0 rgba(0,0,0,0.03)',
                                    padding: '2.7rem 2.2rem 2.2rem 2.2rem',
                                    marginTop: '2.5rem',
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    justifyContent: 'flex-start',
                                    transition: 'all 0.3s',
                                }}
                            >
                                {/* Número del paso destacado */}
                                <div style={{
                                    position: 'absolute',
                                    top: '-32px',
                                    left: '32px',
                                    width: '56px',
                                    height: '56px',
                                    background: 'linear-gradient(135deg, #003d8f 0%, #004AB7 100%)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: 900,
                                    fontSize: '2rem',
                                    boxShadow: '0 8px 24px rgba(0,61,143,0.18)',
                                    border: '3px solid #fff',
                                    zIndex: 2,
                                    letterSpacing: '-1px',
                                }}>
                                    {i + 1}
                                </div>
                                {/* Icono */}
                                <div style={{
                                    fontSize: '2.7rem',
                                    marginBottom: '1.2rem',
                                    color: '#004AB7',
                                    filter: 'drop-shadow(0 2px 8px #b3d0f7)',
                                    marginTop: '0.2rem',
                                }}>
                                    {step.icon}
                                </div>
                                {/* Título */}
                                <h3 style={{
                                    fontSize: '1.25rem',
                                    fontWeight: 800,
                                    color: '#004AB7',
                                    marginBottom: '0.7rem',
                                    letterSpacing: '-0.01em',
                                    textShadow: '0 1px 8px #fff8, 0 0px 1px #fff',
                                }}>
                                    {step.title}
                                </h3>
                                {/* Descripción */}
                                <p style={{
                                    fontSize: '1.05rem',
                                    color: '#0A1933',
                                    opacity: 0.85,
                                    lineHeight: 1.7,
                                    margin: 0,
                                    textAlign: 'left',
                                    fontWeight: 500,
                                }}>
                                    {step.desc}
                                </p>
                                {/* Flecha conectora visual */}
                                {i < processSteps.length - 1 && (
                                    <div style={{
                                        position: 'absolute',
                                        right: '-32px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        fontSize: '2.5rem',
                                        color: '#b3d0f7',
                                        fontWeight: 'bold',
                                        opacity: 0.7,
                                        zIndex: 1,
                                    }}>
                                        <span style={{fontWeight:900, fontSize:'2.5rem'}}>→</span>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {/* Consejo Moderno */}
                <motion.div
                    initial={{opacity:0, y:20}}
                    whileInView={{opacity:1, y:0}}
                    viewport={{once:true}}
                    transition={{delay:0.3, duration:0.6}}
                    style={{
                        marginTop: '3.5rem',
                        padding: '1.7rem 2.2rem 1.7rem 2.2rem',
                        borderRadius: '18px',
                        background: 'linear-gradient(90deg, #f7fbff 0%, #eaf6ff 100%)',
                        border: '2px solid #b3d0f7',
                        boxShadow: '0 4px 18px 0 rgba(0,87,217,0.07)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.3rem',
                        maxWidth: 700,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        textAlign: 'left',
                        position: 'relative',
                    }}
                >
                    {/* Icono de consejo */}
                    <div style={{
                        minWidth: 54,
                        minHeight: 54,
                        background: 'linear-gradient(135deg, #fff 60%, #e3f0ff 100%)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 8px #b3d0f7',
                        border: '2px solid #b3d0f7',
                        position: 'absolute',
                        left: '-32px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 2,
                    }}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="16" cy="16" r="16" fill="#e3f0ff"/>
                            <path d="M16 10V18" stroke="#004AB7" strokeWidth="2.2" strokeLinecap="round"/>
                            <circle cx="16" cy="22" r="1.5" fill="#004AB7"/>
                        </svg>
                    </div>
                    <div style={{
                        marginLeft: '2.5rem',
                        width: '100%',
                    }}>
                        <span style={{
                            display: 'inline-block',
                            fontWeight: 800,
                            color: '#004AB7',
                            fontSize: '1.08rem',
                            letterSpacing: '-0.5px',
                            marginBottom: '0.2rem',
                        }}>
                            Consejo
                        </span>
                        <span style={{
                            display: 'block',
                            fontSize: '1.08rem',
                            color: '#0A1933',
                            opacity: 0.92,
                            fontWeight: 500,
                            lineHeight: 1.7,
                        }}>
                            Todo el proceso es transparente y te mantenemos informado en cada etapa. Nuestro equipo está disponible para aclarar dudas en cualquier momento.
                        </span>
                    </div>
                </motion.div>
                </div>
            </section>

            {/* ¿QUÉ INCLUYE NUESTRO SERVICIO? */}
            <section style={{
                width: '100vw',
                marginLeft: 'calc(-50vw + 50%)',
                padding: '3rem 0 2rem',
                background: 'linear-gradient(120deg, #f7fbff 0%, #eaf6ff 100%)',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1rem' }}>
                <motion.h2 style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: 900,
                    color: '#003d8f',
                    marginBottom: '2rem',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                    textAlign: 'center'
                }} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6}}>
                    ¿Qué incluye nuestro servicio de nómina?
                </motion.h2>
                <motion.div initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:0.1, duration:0.6}}>
                    <p style={{
                        fontSize: '1.08rem',
                        color: '#003d8f',
                        fontWeight: 600,
                        margin: '0 auto 1.5rem',
                        maxWidth: 700,
                        textAlign: 'center',
                        letterSpacing: '-0.5px',
                    }}>
                        Nuestro servicio de nómina es integral y cubre todos los aspectos clave para la tranquilidad de tu empresa y colaboradores.
                    </p>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '1.1rem 2.2rem',
                        alignItems: 'start',
                    }}>
                        {[
                            {
                                icon: <svg width="38" height="38" fill="none" viewBox="0 0 44 44"><rect width="38" height="38" rx="12" fill="#e3f0ff"/><path d="M16 19h14M19 12v14" stroke="#004AB7" strokeWidth="2.2" strokeLinecap="round"/></svg>,
                                title: 'Cálculo de nómina y timbrado',
                                desc: 'Cálculo preciso de percepciones, deducciones, impuestos y timbrado de recibos.'
                            },
                            {
                                icon: <svg width="38" height="38" fill="none" viewBox="0 0 44 44"><rect width="38" height="38" rx="12" fill="#e3f0ff"/><path d="M16 19h14" stroke="#004AB7" strokeWidth="2.2" strokeLinecap="round"/><circle cx="19" cy="19" r="6" stroke="#004AB7" strokeWidth="2.2"/></svg>,
                                title: 'IMSS, RCV e INFONAVIT',
                                desc: 'Gestión de obligaciones ante IMSS, RCV, INFONAVIT y cumplimiento de impuestos estatales.'
                            },
                            {
                                icon: <svg width="38" height="38" fill="none" viewBox="0 0 44 44"><rect width="38" height="38" rx="12" fill="#e3f0ff"/><path d="M16 26l7-7-7-7" stroke="#004AB7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/><rect x="19" y="12" width="7" height="14" rx="3.5" stroke="#004AB7" strokeWidth="2.2"/></svg>,
                                title: 'Altas, bajas y modificaciones',
                                desc: 'Administración de movimientos de personal y actualizaciones salariales.'
                            },
                            {
                                icon: <svg width="38" height="38" fill="none" viewBox="0 0 44 44"><rect width="38" height="38" rx="12" fill="#e3f0ff"/><path d="M16 19h14" stroke="#004AB7" strokeWidth="2.2" strokeLinecap="round"/><path d="M19 12v14" stroke="#004AB7" strokeWidth="2.2" strokeLinecap="round"/></svg>,
                                title: 'Reportes y recibos digitales',
                                desc: 'Generación y envío de reportes detallados y recibos de nómina digitales a colaboradores.'
                            },
                            {
                                icon: <svg width="38" height="38" fill="none" viewBox="0 0 44 44"><rect width="38" height="38" rx="12" fill="#e3f0ff"/><path d="M19 12v14" stroke="#004AB7" strokeWidth="2.2" strokeLinecap="round"/><circle cx="19" cy="26" r="2" fill="#004AB7"/></svg>,
                                title: 'Atención y soporte experto',
                                desc: 'Acompañamiento personalizado y asesoría en todo momento para resolver tus dudas.'
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{opacity:0, y:20}}
                                whileInView={{opacity:1, y:0}}
                                viewport={{once:true}}
                                transition={{duration:0.5, delay:i*0.08}}
                                style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '1.1rem',
                                    background: i % 2 === 0 ? 'linear-gradient(90deg, #f7fbff 0%, #eaf6ff 100%)' : '#fff',
                                    borderRadius: '10px',
                                    boxShadow: '0 1.5px 8px rgba(0,61,143,0.04)',
                                    padding: '1.1rem 1.2rem',
                                    border: '1px solid #e3f0ff',
                                    minHeight: 0,
                                }}
                            >
                                <div style={{
                                    minWidth: 44,
                                    minHeight: 44,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>{item.icon}</div>
                                <div style={{textAlign:'left'}}>
                                    <div style={{
                                        fontWeight: 800,
                                        color: '#004AB7',
                                        fontSize: '1.01rem',
                                        marginBottom: 2,
                                        letterSpacing: '-0.5px',
                                    }}>{item.title}</div>
                                    <div style={{
                                        color: '#0A1933',
                                        opacity: 0.85,
                                        fontSize: '0.97rem',
                                        lineHeight: 1.45,
                                        fontWeight: 500,
                                    }}>{item.desc}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
                </div>
            </section>

            {/* PAYROLL SCOPE SECTION - FONDO DEGRADADO ANCHO COMPLETO */}
            <section style={{
                width: '100vw',
                marginLeft: 'calc(-50vw + 50%)',
                padding: '4rem 0',
                position: 'relative',
                overflow: 'hidden',
                background: '#fff',
            }}>
                {/* Fondo decorativo extra */}
                <div style={{
                    position: 'absolute',
                    top: '-80px',
                    left: '-80px',
                    width: '220px',
                    height: '220px',
                    background: 'radial-gradient(circle, #e3f0ff 0%, transparent 80%)',
                    zIndex: 0,
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '-60px',
                    right: '-60px',
                    width: '180px',
                    height: '180px',
                    background: 'radial-gradient(circle, #b3d0f7 0%, transparent 80%)',
                    zIndex: 0,
                }} />
                <div style={{
                    maxWidth: '1280px',
                    margin: '0 auto',
                    padding: '0 1.5rem',
                    position: 'relative',
                    zIndex: 1,
                }}>
                    <h2 style={{
                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                        fontWeight: 900,
                        color: '#003d8f',
                        marginBottom: '2rem',
                        textAlign: 'center',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.1,
                        textShadow: '0 2px 12px #e3f0ff, 0 1px 0 #fff',
                    }}>
                        Nuestro alcance en nómina, IMSS, RCV, INFONAVIT e Impuestos Estatales
                    </h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '1.5rem',
                    }}>
                        <div style={{
                            border: '1px solid #b3d0f7',
                            borderRadius: '10px',
                            padding: '1.2rem',
                            background: 'rgba(250,251,252,0.95)',
                            boxShadow: '0 1.5px 8px rgba(0,61,143,0.04)',
                            fontWeight: 500,
                            color: '#0A1933',
                            fontSize: '1.01rem',
                        }}>
                            Captura de incidencias de cada proceso de nómina.
                        </div>
                        <div style={{
                            border: '1px solid #b3d0f7',
                            borderRadius: '10px',
                            padding: '1.2rem',
                            background: 'rgba(250,251,252,0.95)',
                            boxShadow: '0 1.5px 8px rgba(0,61,143,0.04)',
                            fontWeight: 500,
                            color: '#0A1933',
                            fontSize: '1.01rem',
                        }}>
                            Altas, bajas y modificaciones salariales de empleados.
                        </div>
                        <div style={{
                            border: '1px solid #b3d0f7',
                            borderRadius: '10px',
                            padding: '1.2rem',
                            background: 'rgba(250,251,252,0.95)',
                            boxShadow: '0 1.5px 8px rgba(0,61,143,0.04)',
                            fontWeight: 500,
                            color: '#0A1933',
                            fontSize: '1.01rem',
                        }}>
                            Envío de recibos de pago a colaboradores por frecuencia de pago.
                        </div>
                        <div style={{
                            border: '1px solid #b3d0f7',
                            borderRadius: '10px',
                            padding: '1.2rem',
                            background: 'rgba(250,251,252,0.95)',
                            boxShadow: '0 1.5px 8px rgba(0,61,143,0.04)',
                            fontWeight: 500,
                            color: '#0A1933',
                            fontSize: '1.01rem',
                        }}>
                            Cálculo y envío de pre-nómina y nómina definitiva vía electrónica.
                        </div>
                        <div style={{
                            border: '1px solid #b3d0f7',
                            borderRadius: '10px',
                            padding: '1.2rem',
                            background: 'rgba(250,251,252,0.95)',
                            boxShadow: '0 1.5px 8px rgba(0,61,143,0.04)',
                            fontWeight: 500,
                            color: '#0A1933',
                            fontSize: '1.01rem',
                        }}>
                            Mantenimiento a tablas de ISR y cualquier información que afecta el cálculo de la nómina.
                        </div>
                        <div style={{
                            border: '1px solid #b3d0f7',
                            borderRadius: '10px',
                            padding: '1.2rem',
                            background: 'rgba(250,251,252,0.95)',
                            boxShadow: '0 1.5px 8px rgba(0,61,143,0.04)',
                            fontWeight: 500,
                            color: '#0A1933',
                            fontSize: '1.01rem',
                        }}>
                            Cálculo de fondo de ahorro y envío del layout correspondiente.
                        </div>
                        <div style={{
                            border: '1px solid #b3d0f7',
                            borderRadius: '10px',
                            padding: '1.2rem',
                            background: 'rgba(250,251,252,0.95)',
                            boxShadow: '0 1.5px 8px rgba(0,61,143,0.04)',
                            fontWeight: 500,
                            color: '#0A1933',
                            fontSize: '1.01rem',
                        }}>
                            Emisión bimestral de liquidación de retiro, Infonavit vía WEB.
                        </div>
                        <div style={{
                            border: '1px solid #b3d0f7',
                            borderRadius: '10px',
                            padding: '1.2rem',
                            background: 'rgba(250,251,252,0.95)',
                            boxShadow: '0 1.5px 8px rgba(0,61,143,0.04)',
                            fontWeight: 500,
                            color: '#0A1933',
                            fontSize: '1.01rem',
                        }}>
                            Cálculo y presentación de variables bimestrales de salario diario integrado.
                        </div>
                        <div style={{
                            border: '1px solid #b3d0f7',
                            borderRadius: '10px',
                            padding: '1.2rem',
                            background: 'rgba(250,251,252,0.95)',
                            boxShadow: '0 1.5px 8px rgba(0,61,143,0.04)',
                            fontWeight: 500,
                            color: '#0A1933',
                            fontSize: '1.01rem',
                        }}>
                            Ingreso de incapacidades y ausentismos en SUA.
                        </div>
                    </div>
                </div>
            </section>

             {/* FINAL CTA - Estilo Hero */}
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
                    <h3 style={{
                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                        fontWeight: 900,
                        color: 'white',
                        marginBottom: '1.5rem',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.1
                    }}>
                        ¿Listo para transformar tu operación?
                    </h3>
                    <p style={{
                        fontSize: '1.25rem',
                        color: 'rgba(255,255,255,0.9)',
                        marginBottom: '2.5rem',
                        maxWidth: '700px',
                        margin: '0 auto 2.5rem',
                        lineHeight: 1.6,
                        textAlign: 'justify'
                    }}>
                        Contáctanos y recibe una consultoría gratuita para diseñar la solución especializada que tu empresa necesita.
                    </p>
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
                        Solicitar consultoría gratuita
                        <ChevronRight size={22} />
                    </Link>
                </div>
            </section>


            {/* Contact Form Section Mejorada */}
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
                        ¿Listo para transformar tu operación?
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
                        Contáctanos y recibe una consultoría gratuita para diseñar la solución especializada que tu empresa necesita.
                    </p>
                    <div style={{ width: '100%' }}>
                        <ContactForm />
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
