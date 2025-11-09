'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Users, Award, BookOpen, ShieldCheck, Smile, BarChart3, Sparkles } from 'lucide-react';
import styles from './styles.module.css';

const servicios = [
  {
    icon: <span className={styles.iconCircle}><Users className={styles.iconSvg} /></span>,
    title: 'Desarrollo Organizacional',
    desc: 'Estrategias para fortalecer la cultura, el clima laboral y la alineación de equipos.'
  },
  {
    icon: <span className={styles.iconCircle}><BookOpen className={styles.iconSvg} /></span>,
    title: 'Capacitación Empresarial',
    desc: 'Programas de formación y talleres para potenciar competencias y liderazgo.'
  },
  {
    icon: <span className={styles.iconCircle}><ShieldCheck className={styles.iconSvg} /></span>,
    title: 'NOM 035',
    desc: 'Diagnóstico, cumplimiento y acompañamiento en factores de riesgo psicosocial.'
  },
  {
    icon: <span className={styles.iconCircle}><Smile className={styles.iconSvg} /></span>,
    title: 'Clima y bienestar',
    desc: 'Encuestas, planes de acción y programas de bienestar para colaboradores.'
  },
  {
    icon: <span className={styles.iconCircle}><Award className={styles.iconSvg} /></span>,
    title: 'Gestión del talento',
    desc: 'Planes de carrera, evaluación de desempeño y retención de talento clave.'
  },
];

const beneficios = [
  {
    icon: <span className={styles.benefitBadge}><BarChart3 className={styles.benefitIconSvg} /></span>,
    title: 'Resultados medibles',
    desc: 'Mejora de clima, productividad y satisfacción laboral comprobada.'
  },
  {
    icon: <span className={styles.benefitBadge}><ShieldCheck className={styles.benefitIconSvg} /></span>,
    title: 'Cumplimiento normativo',
    desc: 'Alineación con NOM 035 y mejores prácticas legales y de bienestar.'
  },
  {
    icon: <span className={styles.benefitBadge}><Smile className={styles.benefitIconSvg} /></span>,
    title: 'Ambiente positivo',
    desc: 'Reducción de rotación y mayor compromiso del equipo.'
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.52 } }
};

// Scroller refs & helpers
const useScrollerState = () => {
  const _ref = React.useRef<HTMLDivElement | null>(null);
  const [active, setActive] = React.useState(0);
  const [itemsCount, setItemsCount] = React.useState(0);

  React.useEffect(() => {
    const el = _ref.current;
    if (!el) return;
    setItemsCount(el.children.length);

    const onScroll = () => {
      const children = Array.from(el.children) as HTMLElement[];
      if (!children.length) return;
      // find child whose left edge is nearest to container scrollLeft
      const scrollLeft = el.scrollLeft;
      let nearest = 0;
      let nearestDiff = Infinity;
      children.forEach((c, i) => {
        const diff = Math.abs(c.offsetLeft - scrollLeft);
        if (diff < nearestDiff) { nearest = i; nearestDiff = diff; }
      });
      setActive(nearest);
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    // initial
    onScroll();
    return () => el.removeEventListener('scroll', onScroll as EventListener);
  }, []);

  const scrollToIndex = (idx: number) => {
    const el = _ref.current; if (!el) return;
    const child = el.children[idx] as HTMLElement | undefined;
    if (!child) return;
    el.scrollTo({ left: child.offsetLeft, behavior: 'smooth' });
    setActive(idx);
  };
  const scrollNext = () => scrollToIndex(Math.min(itemsCount - 1, active + 1));
  const scrollPrev = () => scrollToIndex(Math.max(0, active - 1));

  return { scrollerRef: _ref, active, itemsCount, scrollNext, scrollPrev, scrollToIndex } as const;
};

export default function DesarrolloOrganizacionalPage() {
  const { scrollerRef, active, itemsCount, scrollNext, scrollPrev, scrollToIndex } = useScrollerState();

  return (
    <main>
      <div>
        <Link href="/servicios" className={styles.doHeroBadge} style={{ margin: '2rem 0 0 2rem', display: 'inline-block' }}>
          ← Volver a Servicios
        </Link>
        {/* HERO Mejorado con fondo animado y partículas */}
        <section className={styles.doHero}>
          <div className={styles.heroParticles} aria-hidden="true">
            <span className={styles.particle1}></span>
            <span className={styles.particle2}></span>
            <span className={styles.particle3}></span>
          </div>
          <div className={styles.doHeroBadge}>Impulsa tu organización</div>
          <motion.h1 className={styles.doHeroTitle} initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            Desarrollo Organizacional
          </motion.h1>
          <motion.p className={styles.doHeroDesc} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}>
            Fortalece la cultura, el clima y el talento de tu empresa con soluciones integrales de capacitación, bienestar y cumplimiento normativo.
          </motion.p>
        </section>

        {/* Separador animado */}
        <div className={styles.animatedSeparator}>
          <span></span>
        </div>

        {/* SERVICIOS Mejorados con glassmorphism y scroller */}
        <section className={styles.doSection}>
          <motion.h2 className={styles.doSectionTitle} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            Soluciones para tu organización
          </motion.h2>

          <div className={styles.doCardsWrapper}>
            <motion.div
              ref={scrollerRef}
              className={styles.doCardsScroller}
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              role="list"
              aria-label="Servicios disponibles"
              tabIndex={0}
            >
              {servicios.map((s, i) => (
                <motion.article
                  key={i}
                  className={styles.doCard}
                  role="listitem"
                  aria-label={s.title}
                  variants={cardVariants}
                >
                  <span className={styles.doCardIcon}>{s.icon}</span>
                  <div className={styles.doCardTitle}>{s.title}</div>
                  <div className={styles.doCardDesc}>{s.desc}</div>
                </motion.article>
              ))}
            </motion.div>
            {/* Navigation controls (JS handled below via ref) */}
            <div className={styles.scrollerControls} aria-hidden="false">
              <button type="button" onClick={() => scrollPrev()} className={styles.scrollerBtnPrev} aria-label="Anterior">‹</button>
              <button type="button" onClick={() => scrollNext()} className={styles.scrollerBtnNext} aria-label="Siguiente">›</button>
            </div>
            <div className={styles.scrollerDots} aria-hidden="false">
              {Array.from({ length: itemsCount }).map((_, idx) => (
                <button key={idx} className={`${styles.scrollerDot} ${active === idx ? styles.activeDot : ''}`} onClick={() => scrollToIndex(idx)} aria-label={`Ir a tarjeta ${idx + 1}`} />
              ))}
            </div>
          </div>
        </section>

        {/* BENEFICIOS Mejorados con badges y layout dinámico */}
        <section className={styles.doSection}>
          <motion.h2 className={styles.doSectionTitle} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            Beneficios para tu empresa
          </motion.h2>
          <div className={styles.doBenefitsRow}>
            {beneficios.map((b, i) => (
              <motion.div
                key={i}
                className={styles.doBenefitCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <span className={styles.doBenefitIcon}>{b.icon}</span>
                <div className={styles.doBenefitTitle}>{b.title}</div>
                <div className={styles.doBenefitDesc}>{b.desc}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA FINAL Mejorado con gradiente animado e icono */}
        <motion.section
          className={styles.doCTA}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.ctaSparkle}><Sparkles size={36} /></span>
          <h3 className={styles.ctaTitle}>Transforma tu organización hoy</h3>
          <p className={styles.ctaText}>Agenda una consulta y conoce nuestras soluciones personalizadas para cultura, clima y talento.</p>
          <Link href="/#contacto" className={styles.ctaButton}>
            Contactar ahora
          </Link>
        </motion.section>
      </div>
    </main>
  );
}