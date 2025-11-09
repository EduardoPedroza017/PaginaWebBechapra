"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { User, Clock, Target, CheckCircle, TrendingUp, Award, Users, Handshake, Phone, ArrowRight } from "lucide-react";
import styles from "./styles.module.css";

export default function Page() {
  const [activeBenefit, setActiveBenefit] = useState(0);

  const steps = [
    {
      n: "01",
      title: "Brief & perfil",
      desc: "Definimos objetivos, perfil ideal, tiempos y KPI. Acordamos el canal de comunicación y responsables.",
      icon: <User className="w-7 h-7" />,
    },
    {
      n: "02",
      title: "Sourcing & hunting",
      desc: "Research activo, base de candidatos, job boards y hunting directo. Priorizamos velocidad y calidad.",
      icon: <Target className="w-7 h-7" />,
    },
    {
      n: "03",
      title: "Entrevistas & filtros",
      desc: "Entrevista por competencias, validación de motivadores, salary match y cultura. Reporte corto por candidato.",
      icon: <User className="w-7 h-7" />,
    },
    {
      n: "04",
      title: "Shortlist & agenda",
      desc: "Envío de terna con comparativo. Coordinamos entrevistas con líderes y damos seguimiento.",
      icon: <TrendingUp className="w-7 h-7" />,
    },
    {
      n: "05",
      title: "Validaciones",
      desc: "Socioeconómico / referencias (si aplica). Cierre de oferta y fecha de ingreso con candidato.",
      icon: <CheckCircle className="w-7 h-7" />,
    },
    {
      n: "06",
      title: "Garantía",
      desc: "Periodo de sustitución sin costo según acuerdo. Retro continua y cierre del proceso.",
      icon: <Award className="w-7 h-7" />,
    },
  ];

  const kpis = [
    { 
      label: "Tiempo de respuesta", 
      value: "< 48h", 
      note: "presentación de primeros CVs",
      icon: <Clock className="w-9 h-9" />,
    },
    { 
      label: "Time To Fill", 
      value: "7–21 días", 
      note: "según seniority y ciudad",
      icon: <TrendingUp className="w-9 h-9" />,
    },
    { 
      label: "Tasa de aceptación", 
      value: "85%+", 
      note: "de ternas presentadas",
      icon: <CheckCircle className="w-9 h-9" />,
    },
    { 
      label: "Satisfacción", 
      value: "NPS 9.0", 
      note: "post–colocación",
      icon: <Award className="w-9 h-9" />,
    },
  ];

  const positions = [
    "Contabilidad", "Facturación", "Cobranza", "Vinculación",
    "Administración", "TI", "Automatizaciones", "Comercial",
    "Atención a Clientes", "Tesorería", "Nómina", "Atracción de Talento",
    "Dirección General", "Asuntos Corporativos", "Seguridad", "Jurídico",
  ];

  const modalities = [
    {
      title: "Headhunting puntual",
      desc: "Búsqueda especializada por vacante. Pago por éxito con garantía de sustitución.",
      icon: <Target className="w-8 h-8" />,
    },
    {
      title: "Reclutamiento masivo",
      desc: "Perfiles operativos/volumen. Procesos paralelos y filtros rápidos para cubrir picos.",
      icon: <Users className="w-8 h-8" />,
    },
    {
      title: "RPO / célula dedicada",
      desc: "Equipo Bechapra integrado a tu operación para cubrir múltiples vacantes mes a mes.",
      icon: <Handshake className="w-8 h-8" />,
    },
  ];

  const benefits = [
    {
      title: "Enfoque en el negocio",
      subtitle: "Liberamos la operación de reclutamiento",
      desc: "Te liberamos de la operación de reclutamiento para que tus líderes se concentren en resultados.",
      icon: <Target className="w-10 h-10" />,
    },
    {
      title: "Comunicación y visibilidad",
      subtitle: "Reporte y seguimiento semanal",
      desc: "Seguimiento semanal, tablero simple de estatus y retro por candidato.",
      icon: <User className="w-10 h-10" />,
    },
    {
      title: "Calidad + velocidad",
      subtitle: "Primeros CVs en 24–48h",
      desc: "Primeros CVs en 24–48h y shortlist accionable. Evaluación por competencias y cultura.",
      icon: <TrendingUp className="w-10 h-10" />,
    },
  ];

  const positionsTrack = [...positions, ...positions];

  return (
    <div className={styles.pageContainer}>
      
      {/* === HERO SECTION === */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground} />
        
        <div className={styles.heroContainer}>
          <div className={styles.heroGrid}>
            
            {/* Columna izquierda */}
            <div className={styles.heroContent}>
              <div className={styles.heroBadge}>
                <User className="w-4 h-4" />
                <span>Capital Humano</span>
              </div>

              <h1 className={styles.heroTitle}>
                Atracción de <span className={styles.heroTitleGradient}>Talento</span>
              </h1>

              <p className={styles.heroDescription}>
                Reclutamos perfiles operativos, administrativos y especializados con un proceso claro, reportes útiles y tiempos comprometidos.
              </p>

              <div className={styles.heroButtons}>
                <a href="#proceso" className={styles.btnPrimary}>
                  Ver proceso completo
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#kpis" className={styles.btnSecondary}>
                  <Clock className="w-4 h-4" />
                  Indicadores
                </a>
              </div>
            </div>

            {/* Columna derecha - Imagen */}
            <div className={styles.heroImageWrapper}>
              <div className={styles.heroImageGlow} />
              <div className={styles.heroImageCard}>
                <Image
                  src="/imagen/talento/atracciontalento.jpg"
                  alt="Atracción de Talento"
                  className={styles.heroImage}
                  width={900}
                  height={560}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === BENEFICIOS CLAVE === */}
      <section className={styles.benefitsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>¿Por qué elegirnos?</h2>
            <p className={styles.sectionSubtitle}>Nuestros diferenciales que impulsan tu éxito</p>
          </div>

          {/* Tabs */}
          <div className={styles.benefitsTabs}>
            {benefits.map((b, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveBenefit(i)}
                className={`${styles.benefitTab} ${activeBenefit === i ? styles.benefitTabActive : ''}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: i * 0.08, type: "spring", bounce: 0.22 }}
              >
                <span className={styles.benefitTabIcon}>{b.icon}</span>
                <div className={styles.benefitTabText}>
                  <div className={styles.benefitTabTitle}>{b.title}</div>
                  <div className={styles.benefitTabSubtitle}>{b.subtitle}</div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Panel */}
          <div className={styles.benefitPanel}>
            <div className={styles.benefitPanelContent}>
              <div className={styles.benefitPanelIcon}>
                {benefits[activeBenefit].icon}
              </div>
              <div>
                <h3 className={styles.benefitPanelTitle}>
                  {benefits[activeBenefit].title}
                </h3>
                <p className={styles.benefitPanelDesc}>
                  {benefits[activeBenefit].desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === PERFILES === */}
      <section className={styles.positionsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Perfiles que cubrimos</h2>
            <p className={styles.sectionSubtitle}>Especialistas en múltiples áreas y niveles</p>
          </div>
        </div>

        <div className={styles.positionsWrapper}>
          <div className={styles.positionsTrack}>
            {positionsTrack.map((p, i) => (
              <div key={i} className={styles.positionPill}>
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === PROCESO === */}
      <section id="proceso" className={styles.processSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Nuestro proceso</h2>
            <p className={styles.sectionSubtitle}>6 pasos para encontrar el talento perfecto</p>
          </div>

          <div className={styles.processGrid}>
            {steps.map((s, i) => (
              <div key={i} className={styles.processCard}>
                <div className={styles.processCardHeader}>
                  <div className={styles.processNumber}>{s.n}</div>
                  <div className={styles.processIcon}>{s.icon}</div>
                </div>
                <h3 className={styles.processTitle}>{s.title}</h3>
                <p className={styles.processDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === KPIs === */}
      <section id="kpis" className={styles.kpisSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Indicadores de servicio</h2>
            <p className={styles.sectionSubtitle}>Resultados medibles y comprobados</p>
          </div>

          <div className={styles.kpisGrid}>
            {kpis.map((k, i) => (
              <div
                key={i}
                className={`${styles.kpiCard} ${i % 2 === 0 ? styles.kpiCardBlue : styles.kpiCardWhite}`}
              >
                <div className={styles.kpiIconWrapper}>
                  {k.icon}
                </div>
                <div className={styles.kpiValue}>{k.value}</div>
                <div className={styles.kpiLabel}>{k.label}</div>
                <div className={styles.kpiNote}>{k.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === MODALIDADES === */}
      <section id="modalidades" className={styles.modalitiesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Modalidades de servicio</h2>
            <p className={styles.sectionSubtitle}>Elige la opción que mejor se adapte a tus necesidades</p>
          </div>

          <div className={styles.modalitiesGrid}>
            {modalities.map((m, i) => (
              <div key={i} className={styles.modalityCard}>
                <div className={styles.modalityIcon}>{m.icon}</div>
                <h3 className={styles.modalityTitle}>{m.title}</h3>
                <p className={styles.modalityDesc}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === CTA FINAL === */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaCard}>
            <div className={styles.ctaGrid}>
              <div className={styles.ctaContent}>
                <div className={styles.ctaIconWrapper}>
                  <Phone className={styles.ctaIcon} />
                </div>
                <h3 className={styles.ctaTitle}>
                  ¿Listos para iniciar una búsqueda?
                </h3>
                <p className={styles.ctaDescription}>
                  Agenda una llamada y armamos juntos el perfil ideal y los tiempos de cobertura. Nuestro equipo de expertos está listo para ayudarte.
                </p>
              </div>
              
              <div className={styles.ctaButtons}>
                <a href="#final" className={styles.ctaBtnPrimary}>
                  Agendar llamada
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a href="/servicios/payroll" className={styles.ctaBtnSecondary}>
                  Ver Payrolling
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="final" />
    </div>
  );
}