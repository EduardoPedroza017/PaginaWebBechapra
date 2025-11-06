'use client';


import { motion } from "framer-motion";
import Link from "next/link";
import { Users, Award, BookOpen, ShieldCheck, Smile, BarChart3, Sparkles } from "lucide-react";
import styles from "./styles.module.css";

const servicios = [
  {
    icon: <span className={styles.iconCircle}><Users className={styles.iconSvg} /></span>,
    title: "Desarrollo Organizacional",
    desc: "Estrategias para fortalecer la cultura, el clima laboral y la alineación de equipos."
  },
  {
    icon: <span className={styles.iconCircle}><BookOpen className={styles.iconSvg} /></span>,
    title: "Capacitación Empresarial",
    desc: "Programas de formación y talleres para potenciar competencias y liderazgo."
  },
  {
    icon: <span className={styles.iconCircle}><ShieldCheck className={styles.iconSvg} /></span>,
    title: "NOM 035",
    desc: "Diagnóstico, cumplimiento y acompañamiento en factores de riesgo psicosocial."
  },
  {
    icon: <span className={styles.iconCircle}><Smile className={styles.iconSvg} /></span>,
    title: "Clima y bienestar",
    desc: "Encuestas, planes de acción y programas de bienestar para colaboradores."
  },
  {
    icon: <span className={styles.iconCircle}><Award className={styles.iconSvg} /></span>,
    title: "Gestión del talento",
    desc: "Planes de carrera, evaluación de desempeño y retención de talento clave."
  },
];

const beneficios = [
  {
    icon: <span className={styles.benefitBadge}><BarChart3 className={styles.benefitIconSvg} /></span>,
    title: "Resultados medibles",
    desc: "Mejora de clima, productividad y satisfacción laboral comprobada."
  },
  {
    icon: <span className={styles.benefitBadge}><ShieldCheck className={styles.benefitIconSvg} /></span>,
    title: "Cumplimiento normativo",
    desc: "Alineación con NOM 035 y mejores prácticas legales y de bienestar."
  },
  {
    icon: <span className={styles.benefitBadge}><Smile className={styles.benefitIconSvg} /></span>,
    title: "Ambiente positivo",
    desc: "Reducción de rotación y mayor compromiso del equipo."
  },
];


export default function DesarrolloOrganizacionalPage() {
  return (
    <main>
      <div>
        <Link href="/servicios" className={styles.doHeroBadge} style={{margin:'2rem 0 0 2rem', display:'inline-block'}}>
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
          <motion.h1 className={styles.doHeroTitle} initial={{opacity:0, y:-30}} animate={{opacity:1, y:0}} transition={{duration:0.7}}>
            Desarrollo Organizacional
          </motion.h1>
          <motion.p className={styles.doHeroDesc} initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.2, duration:0.7}}>
            Fortalece la cultura, el clima y el talento de tu empresa con soluciones integrales de capacitación, bienestar y cumplimiento normativo.
          </motion.p>
        </section>

        {/* Separador animado */}
        <div className={styles.animatedSeparator}>
          <span></span>
        </div>

        {/* SERVICIOS Mejorados con glassmorphism */}
        <section className={styles.doSection}>
          <motion.h2 className={styles.doSectionTitle} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6}}>
            Soluciones para tu organización
          </motion.h2>
          <div className={styles.doCardsGrid}>
            {servicios.map((s, i) => (
              <motion.div
                key={i}
                className={styles.doCard}
                initial={{opacity:0, y:30}}
                whileInView={{opacity:1, y:0}}
                viewport={{once:true}}
                transition={{duration:0.5, delay:i*0.08}}
              >
                <span className={styles.doCardIcon}>{s.icon}</span>
                <div className={styles.doCardTitle}>{s.title}</div>
                <div className={styles.doCardDesc}>{s.desc}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* BENEFICIOS Mejorados con badges y layout dinámico */}
        <section className={styles.doSection}>
          <motion.h2 className={styles.doSectionTitle} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6}}>
            Beneficios para tu empresa
          </motion.h2>
          <div className={styles.doBenefitsRow}>
            {beneficios.map((b, i) => (
              <motion.div
                key={i}
                className={styles.doBenefitCard}
                initial={{opacity:0, y:30}}
                whileInView={{opacity:1, y:0}}
                viewport={{once:true}}
                transition={{duration:0.5, delay:i*0.1}}
              >
                <span className={styles.doBenefitIcon}>{b.icon}</span>
                <div className={styles.doBenefitTitle}>{b.title}</div>
                <div className={styles.doBenefitDesc}>{b.desc}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA FINAL Mejorado con gradiente animado e icono */}
        <section className={styles.doCTA}>
          <span className={styles.ctaSparkle}><Sparkles size={32} /></span>
          <h3>Transforma tu organización hoy</h3>
          <p>Agenda una consulta y conoce nuestras soluciones personalizadas para cultura, clima y talento.</p>
          <Link href="/#contacto">
            Contactar ahora
          </Link>
        </section>
      </div>
    </main>
  );
}