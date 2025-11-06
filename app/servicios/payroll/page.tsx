"use client";
import React from "react";
import { FileText, Calendar, Banknote, Users, Shield, TrendingUp, CheckCircle, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
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
        <div className={styles.payrollPageContainer}>
            {/* HERO MEJORADO */}
            <section className={styles.payrollHeroSection}>
                <div className={styles.payrollHeroGrid}>
                    <div className={styles.payrollHeroTextCol}>
                        <motion.h1 className={styles.payrollHeroTitle} initial={{opacity:0, y:-30}} animate={{opacity:1, y:0}} transition={{duration:0.7}}>
                            Payroll <span className={styles.payrollHeroTitleAccent}>& Nómina Empresarial</span>
                        </motion.h1>
                        <motion.p className={styles.payrollHeroDesc} initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.2, duration:0.7}}>
                            Gestiona tu nómina de forma profesional, segura y sin errores. Cumplimos con todas las obligaciones fiscales y laborales, para que tú te enfoques en hacer crecer tu empresa. <b>Payroll Bechapra</b> es tranquilidad y eficiencia para tu negocio y tus colaboradores.
                        </motion.p>
                    </div>
                    <motion.div className={styles.payrollHeroImgCol} initial={{opacity:0, x:40}} animate={{opacity:1, x:0}} transition={{delay:0.3, duration:0.7}}>
                        <div className={styles.payrollHeroImgCard}>
                            <img
                                src="/imagen/talento/atracciontalento.jpg"
                                alt="Payroll Bechapra"
                                className={styles.payrollHeroImg}
                                loading="lazy"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ¿QUÉ ES PAYROLL? */}
            <section className={styles.payrollSection}>
                <motion.h2 className={styles.payrollSectionTitle} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6}}>
                    ¿Qué es el servicio de payroll?
                </motion.h2>
                <motion.p className={styles.payrollSectionDesc} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:0.1, duration:0.6}}>
                    Payroll es la externalización de la administración de nómina, donde un equipo experto se encarga de todo el proceso: desde el cálculo y pago de sueldos, hasta el cumplimiento de obligaciones fiscales, timbrado de recibos y generación de reportes. Ideal para empresas que buscan eficiencia, seguridad y cumplimiento normativo.
                </motion.p>
            </section>

            {/* BENEFICIOS */}
            <section className={styles.payrollSection}>
                <motion.h2 className={styles.payrollSectionTitle} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6}}>
                    Beneficios de externalizar tu nómina
                </motion.h2>
                <motion.div className={styles.payrollCardsRow} initial="hidden" whileInView="visible" viewport={{once:true}} variants={{hidden:{},visible:{transition:{staggerChildren:0.15}}}}>
                    {benefits.map((b, i) => (
                        <motion.div
                            className={styles.payrollCard}
                            key={i}
                            initial={{opacity:0, y:30}}
                            whileInView={{opacity:1, y:0}}
                            viewport={{once:true}}
                            transition={{duration:0.5, delay:i*0.1}}
                        >
                            {b.icon}
                            <div className={styles.payrollCardTitle}>{b.title}</div>
                            <div className={styles.payrollCardDesc}>{b.desc}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* PROCESO */}
            <section className={styles.payrollSection}>
                <motion.h2 className={styles.payrollSectionTitle} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6}}>
                    ¿Cómo funciona nuestro proceso?
                </motion.h2>
                <motion.div className={styles.payrollCardsRow} initial="hidden" whileInView="visible" viewport={{once:true}} variants={{hidden:{},visible:{transition:{staggerChildren:0.15}}}}>
                    {processSteps.map((step, i) => (
                        <motion.div
                            className={styles.payrollCard}
                            key={i}
                            initial={{opacity:0, y:30}}
                            whileInView={{opacity:1, y:0}}
                            viewport={{once:true}}
                            transition={{duration:0.5, delay:i*0.1}}
                        >
                            {step.icon}
                            <div className={styles.payrollCardTitle}>{step.title}</div>
                            <div className={styles.payrollCardDesc}>{step.desc}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>
        </div>
    );
}