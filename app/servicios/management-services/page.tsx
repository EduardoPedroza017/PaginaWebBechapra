"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import styles from './styles.module.css';
import { Briefcase, Settings, Users, PieChart } from 'lucide-react';
import React from 'react';

const HERO_VARIANTS = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.08, when: 'beforeChildren' } },
};

const SERVICES = [
  { icon: <Briefcase size={20} />, title: 'Operaciones & Procesos', desc: 'Mapeo, optimización y documentación de procesos clave para mejorar eficiencia.' },
  { icon: <Settings size={20} />, title: 'Transformación Digital', desc: 'Automatización, selección de herramientas y migración de procesos a plataformas modernas.' },
  { icon: <Users size={20} />, title: 'Talento & Organización', desc: 'Estructura organizacional, roles y acompañamiento para equipos en crecimiento.' },
  { icon: <PieChart size={20} />, title: 'Análisis & KPI', desc: 'Diseño de dashboards y métricas para tomar decisiones oportunas.' },
];

export default function ManagementServicesPage() {
  const [active, setActive] = React.useState<number | null>(null);
  const decorRef = React.useRef<HTMLDivElement | null>(null);
  const cardsRef = React.useRef<HTMLDivElement | null>(null);

  // small parallax on mouse move inside header
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width; // -0.5..0.5 roughly
    const dy = (e.clientY - cy) / rect.height;
    if (decorRef.current) {
      decorRef.current.style.transform = `translate3d(${dx * 18}px, ${dy * 8}px, 0) scale(1.02)`;
    }
    if (cardsRef.current) {
      cardsRef.current.style.transform = `translate3d(${dx * -10}px, ${dy * -6}px, 0) rotate(${dx * 4}deg)`;
    }
  };

  const handleMouseLeave = () => {
    if (decorRef.current) decorRef.current.style.transform = '';
    if (cardsRef.current) cardsRef.current.style.transform = '';
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Link href="/servicios" className={styles.back}>← Volver a Servicios</Link>

  <motion.header className={styles.header} variants={HERO_VARIANTS} initial="hidden" animate="visible" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <motion.h1 className={styles.title} whileHover={{ scale: 1.02 }}>Management Services</motion.h1>
          <motion.p className={styles.subtitle}>Servicios especializados para la gestión efectiva y profesional de tu negocio — diseño, automatización y talento.</motion.p>

          <motion.div className={styles.heroVisual} initial={{ scale: 0.98 }} animate={{ scale: 1 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
            <div className={styles.decor} aria-hidden ref={decorRef} />
            <svg className={styles.wave} viewBox="0 0 800 200" preserveAspectRatio="none" aria-hidden>
              <path d="M0,100 C150,200 350,0 800,100 L800 200 L0 200 Z" fill="rgba(11,99,228,0.06)" />
            </svg>
          </motion.div>
        </motion.header>

        <section className={styles.servicesSection}>
          <div className={styles.servicesGrid}>
            {SERVICES.map((s, i) => (
              <motion.article key={i} className={styles.serviceCard} tabIndex={0} role="button" onFocus={() => setActive(i)} onBlur={() => setActive(null)} whileHover={{ y: -8, boxShadow: '0 22px 44px rgba(11,99,228,0.12)', transition: { duration: 0.32, ease: [0.2,0.8,0.2,1] } }} onHoverStart={() => setActive(i)} onHoverEnd={() => setActive(null)} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.44, delay: i * 0.06 }}>
                <div className={styles.serviceIcon}>{s.icon}</div>
                <h3 className={styles.serviceTitle}>{s.title}</h3>
                <p className={styles.serviceDesc}>{s.desc}</p>
              </motion.article>
            ))}
          </div>

          <motion.div className={styles.showcase} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.44 }}>
            <motion.div className={styles.cardsLayer} ref={cardsRef} animate={active !== null ? { rotate: active * 2 } : { rotate: 0 }} transition={{ type: 'spring', stiffness: 40, damping: 14 }}>
              <motion.div className={styles.infoCard} whileHover={{ scale: 1.03 }}>
                <h4>Consultoría a la medida</h4>
                <p>Diseñamos un plan de trabajo por fases para alcanzar resultados medibles en 90 días.</p>
              </motion.div>
              <motion.div className={styles.infoCard} whileHover={{ scale: 1.03 }}>
                <h4>Implementación tecnológica</h4>
                <p>Integración de herramientas: ERPs ligeros, automatizaciones y dashboards.</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        <motion.section className={styles.ctaSection} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <div className={styles.ctaInner}>
            <div>
              <h3 className={styles.ctaTitle}>Transforma la gestión de tu empresa</h3>
              <p className={styles.ctaText}>Solicita una evaluación gratuita y recibe un roadmap con prioridades.</p>
            </div>
            <Link href="/#contacto" className={styles.ctaButton}>Solicitar evaluación</Link>
          </div>
        </motion.section>
      </div>
    </main>
  );
}