"use client";
import React from "react";
import Image from "next/image";
import { FileText, Calendar, Banknote, Users, Shield, TrendingUp, CheckCircle, Briefcase, ChevronLeft, ChevronRight, ClipboardList, Zap, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./styles.module.css";

const benefits = [
    {
        icon: <Shield className={styles.payrollCardIcon} />, 
        title: "Seguridad y cumplimiento",
        desc: "Asegura el pago correcto y puntual de la nómina, cumpliendo con todas las obligaciones fiscales y laborales."
    },
    {
        icon: <Calendar className={styles.payrollCardIcon} />,
        title: "Ahorro de tiempo",
        desc: "Externaliza procesos administrativos y enfoca tus recursos en el crecimiento de tu empresa."
    },
    {
        icon: <Banknote className={styles.payrollCardIcon} />,
        title: "Optimización de costos",
        desc: "Reduce errores, evita multas y mejora la eficiencia operativa con expertos en nómina."
    },
    {
        icon: <Users className={styles.payrollCardIcon} />,
        title: "Soporte especializado",
        desc: "Accede a asesoría y atención personalizada para tu empresa y tus colaboradores."
    },
    {
        icon: <TrendingUp className={styles.payrollCardIcon} />,
        title: "Escalabilidad",
        desc: "Adapta el servicio a las necesidades de tu empresa, sin importar el tamaño o sector."
    },
    {
        icon: <CheckCircle className={styles.payrollCardIcon} />,
        title: "Transparencia total",
        desc: "Reportes claros y acceso a información en tiempo real para la toma de decisiones."
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
                            Volver a Servicios
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
                            maxWidth: '540px'
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
                            <img
                                src="/imagen/talento/atracciontalento.jpg"
                                alt="Payroll Bechapra"
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
            </section>

            {/* ¿QUÉ ES PAYROLL? */}
            <section style={{
                maxWidth: '1280px',
                margin: '0 auto',
                padding: '4rem 1.5rem',
                textAlign: 'center'
            }}>
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
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2rem',
                        marginTop: '2rem'
                    }}>
                        {[
                            {icon: <ClipboardList size={40} color="#003d8f" />, title: 'Administración de Nómina', desc: 'Externaliza tu gestión de nómina con expertos que se encargan de todo el proceso administrativo'},
                            {icon: <CheckCircle size={40} color="#003d8f" />, title: 'Cálculo y Pago Seguro', desc: 'Sueldos correctos, pagos puntuales y cumplimiento total de obligaciones fiscales y laborales'},
                            {icon: <BarChart3 size={40} color="#003d8f" />, title: 'Reportes Profesionales', desc: 'Timbrado de recibos y reportes detallados para empresa y colaboradores en tiempo real'}
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{opacity:0, y:20}}
                                whileInView={{opacity:1, y:0}}
                                viewport={{once:true}}
                                transition={{duration:0.5, delay:i*0.1}}
                                style={{
                                    padding: '2rem',
                                    borderRadius: '16px',
                                    background: 'linear-gradient(135deg, #F0F7FF 0%, #E8F4FF 100%)',
                                    border: '1px solid #D0E8FF',
                                    transition: 'all 0.3s cubic-bezier(0.2,0.9,0.2,1)',
                                    cursor: 'pointer'
                                }}
                                whileHover={{transform: 'translateY(-8px)', boxShadow: '0 20px 40px rgba(0,61,143,0.12)'}}
                            >
                                <div style={{fontSize: '2.5rem', marginBottom: '1rem'}}>{item.icon}</div>
                                <h3 style={{
                                    fontSize: '1.25rem',
                                    fontWeight: 700,
                                    color: '#003d8f',
                                    marginBottom: '0.75rem'
                                }}>
                                    {item.title}
                                </h3>
                                <p style={{
                                    fontSize: '0.95rem',
                                    color: '#555',
                                    lineHeight: 1.6
                                }}>
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                    <p style={{
                        fontSize: '1.1rem',
                        color: '#666',
                        lineHeight: 1.8,
                        marginTop: '3rem',
                        maxWidth: '800px',
                        margin: '3rem auto 0'
                    }}>
                        <strong style={{color: '#003d8f'}}>Ideal para empresas</strong> que buscan eficiencia, seguridad y <strong style={{color: '#003d8f'}}>cumplimiento normativo</strong> en su gestión de recursos humanos y nómina.
                    </p>
                </motion.div>
            </section>

            {/* BENEFICIOS */}
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
                    Beneficios de externalizar tu nómina
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
                                    marginBottom: '0.75rem',
                                    letterSpacing: '-0.01em'
                                }}>
                                    {b.title}
                                </h3>
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

            {/* PROCESO */}
            <section style={{
                maxWidth: '1280px',
                margin: '0 auto',
                padding: '4rem 1.5rem'
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
                    ¿Cómo funciona nuestro proceso?
                </motion.h2>

                {/* Timeline Visual */}
                <motion.div initial="hidden" whileInView="visible" viewport={{once:true}} variants={{hidden:{},visible:{transition:{staggerChildren:0.15}}}} style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                    position: 'relative'
                }}>
                    {processSteps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{opacity:0, y:30}}
                            whileInView={{opacity:1, y:0}}
                            viewport={{once:true}}
                            transition={{duration:0.5, delay:i*0.1}}
                            style={{
                                position: 'relative'
                            }}
                        >
                            {/* Número del paso */}
                            <div style={{
                                position: 'absolute',
                                top: '-15px',
                                left: '20px',
                                width: '50px',
                                height: '50px',
                                background: 'linear-gradient(135deg, #003d8f 0%, #004AB7 100%)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 900,
                                fontSize: '1.5rem',
                                boxShadow: '0 8px 20px rgba(0,61,143,0.25)'
                            }}>
                                {i + 1}
                            </div>

                            {/* Card del paso */}
                            <motion.div
                                whileHover={{transform: 'translateY(-10px)', boxShadow: '0 25px 50px rgba(0,61,143,0.15)'}}
                                style={{
                                    padding: '2.5rem 2rem 2rem',
                                    borderRadius: '16px',
                                    background: i === 0 ? 'linear-gradient(135deg, #E8F4FF 0%, #D0E8FF 100%)' : i === 1 ? 'linear-gradient(135deg, #D0E8FF 0%, #B8DCFF 100%)' : 'linear-gradient(135deg, #B8DCFF 0%, #A0D0FF 100%)',
                                    border: '1.5px solid rgba(0,61,143,0.15)',
                                    boxShadow: '0 4px 15px rgba(0,61,143,0.08)',
                                    transition: 'all 0.35s cubic-bezier(0.2,0.9,0.2,1)',
                                    cursor: 'pointer',
                                    marginTop: '1.5rem',
                                    overflow: 'hidden',
                                    position: 'relative'
                                }}
                            >
                                {/* Borde decorativo superior */}
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: '4px',
                                    background: `linear-gradient(90deg, ${['#003d8f', '#004AB7', '#0056d4'][i]} 0%, ${['#004AB7', '#0056d4', '#0066ff'][i]} 100%)`
                                }} />

                                <div style={{
                                    position: 'relative',
                                    zIndex: 1
                                }}>
                                    <div style={{
                                        fontSize: '2.5rem',
                                        marginBottom: '1rem',
                                        filter: 'drop-shadow(0 2px 4px rgba(0,61,143,0.2))'
                                    }}>
                                        {step.icon}
                                    </div>
                                    <h3 style={{
                                        fontSize: '1.25rem',
                                        fontWeight: 700,
                                        color: '#003d8f',
                                        marginBottom: '0.75rem',
                                        letterSpacing: '-0.01em'
                                    }}>
                                        {step.title}
                                    </h3>
                                    <p style={{
                                        fontSize: '0.95rem',
                                        color: '#555',
                                        lineHeight: 1.7,
                                        margin: 0
                                    }}>
                                        {step.desc}
                                    </p>
                                </div>
                            </motion.div>

                            {/* Flecha conectora */}
                            {i < processSteps.length - 1 && (
                                <div style={{
                                    position: 'absolute',
                                    right: '-1rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    fontSize: '2rem',
                                    color: '#004AB7',
                                    fontWeight: 'bold',
                                    opacity: 0.3
                                }}>
                                    →
                                </div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>

                {/* Nota final */}
                <motion.div initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:0.3, duration:0.6}} style={{
                    marginTop: '3rem',
                    padding: '2rem',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #FFF9E6 0%, #FFF5CC 100%)',
                    border: '1.5px solid #FFE8A3',
                    textAlign: 'center'
                }}>
                    <p style={{
                        fontSize: '1rem',
                        color: '#854A00',
                        margin: 0,
                        lineHeight: 1.6
                    }}>
                        <strong>💡 Consejo:</strong> Todo el proceso es transparente y te mantenemos informado en cada etapa. Nuestro equipo está disponible para aclarar dudas en cualquier momento.
                    </p>
                </motion.div>
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
                        lineHeight: 1.6
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
        </div>
    );
}