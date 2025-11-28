'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

import { Users, Award, BookOpen, ShieldCheck, BarChart3 } from 'lucide-react';
import Footer from '../../../components/Footer';
import ContactForm from '../../../app/components/ContactForm';
import { useLanguage } from '../../../lib/LanguageContext';
import { translateText } from '../../../lib/translate';

type IconName = 'BookOpen' | 'BarChart3' | 'ShieldCheck' | 'Award' | 'Users';

interface ServicioCard {
  icon: IconName;
  title: string;
  desc: string;
  href?: string;
}

interface BeneficioCard {
  icon: IconName;
  title: string;
  desc: string;
}

const iconMap: Record<IconName, typeof BookOpen> = {
  BookOpen,
  BarChart3,
  ShieldCheck,
  Award,
  Users,
};

const initialServicios: ServicioCard[] = [
  {
    icon: 'BookOpen',
    title: 'Capacitación Empresarial',
    desc: 'Desde habilidades técnicas hasta desarrollo de liderazgo, formamos parte de las capacitadoras del CCPM',
    href: '/servicios/capacitacion-empresarial',
  },
  {
    icon: 'BarChart3',
    title: 'Consultoría Organizacional',
    desc: 'Soluciones para resolver problemas, identificar oportunidades, fomentar el aprendizaje y facilitar la implementación de cambios.',
    href: '/servicios/consultoria-organizacional',
  },
  {
    icon: 'ShieldCheck',
    title: 'NOM-035',
    desc: 'Detectamos problemas y oportunidades internas para fomentar un ambiente laboral saludable y colaborativo.',
    href: '/servicios/nom-035',
  },
];

const initialBeneficios: BeneficioCard[] = [
  {
    icon: 'Award',
    title: 'Acceso Exclusivo BTC',
    desc: 'Accede a nuestra agenda de cursos gratuitos, avalados por el Colegio de Contadores Públicos CDMX.',
  },
  {
    icon: 'Users',
    title: 'Asesoramiento Personalizado',
    desc: 'Sesiones de asesoramiento personalizado con expertos en NOM-035.',
  },
  {
    icon: 'BarChart3',
    title: 'Planificación Estratégica',
    desc: 'Desarrollamos estrategias a largo plazo que impulsen el crecimiento y el éxito de tu empresa en el mercado actual.',
  },
];

export default function DesarrolloOrganizacionalPage() {
  const { lang } = useLanguage();

  // HERO
  const [backText, setBackText] = useState('Volver');
  const [heroTitle, setHeroTitle] = useState('Creando una cultura de éxito empresarial');
  const [heroDesc, setHeroDesc] = useState('¡Potencia el crecimiento y la eficacia de tu empresa a través de nuestros servicios de Desarrollo Organizacional!');
  const [heroBtn, setHeroBtn] = useState('Solicitar consultoría');

  // Servicios
  const [servicios, setServicios] = useState<ServicioCard[]>(initialServicios);
  const [serviciosTitle, setServiciosTitle] = useState('Soluciones para tu organización');

  // Beneficios
  const [beneficios, setBeneficios] = useState<BeneficioCard[]>(initialBeneficios);
  const [beneficiosTitle, setBeneficiosTitle] = useState('Beneficios Centro de Capacitación');

  // CTA
  const [ctaTitle, setCtaTitle] = useState('Transforma tu organización hoy');
  const [ctaDesc, setCtaDesc] = useState('Agenda una consulta y conoce nuestras soluciones personalizadas para cultura, clima y talento.');
  const [ctaBtn, setCtaBtn] = useState('Agenda una cita');
  const [ctaBtn2, setCtaBtn2] = useState('Ver casos de éxito');

  // Contacto
  const [contactTitle, setContactTitle] = useState('¿Listo para transformar tu operación?');
  const [contactDesc, setContactDesc] = useState('Contáctanos y recibe una consultoría gratuita para diseñar la solución especializada que tu empresa necesita.');

  /* TRADUCCIONES */
  useEffect(() => {
    async function fetchTranslations() {
      if (lang === 'es') {
        setBackText('Volver');
        setHeroTitle('Creando una cultura de éxito empresarial');
        setHeroDesc('¡Potencia el crecimiento y la eficacia de tu empresa a través de nuestros servicios de Desarrollo Organizacional!');
        setHeroBtn('Solicitar consultoría');

        setServicios(initialServicios);
        setServiciosTitle('Soluciones para tu organización');

        setBeneficios(initialBeneficios);
        setBeneficiosTitle('Beneficios Centro de Capacitación');

        setCtaTitle('Transforma tu organización hoy');
        setCtaDesc('Agenda una consulta y conoce nuestras soluciones personalizadas para cultura, clima y talento.');
        setCtaBtn('Agenda una cita');
        setCtaBtn2('Ver casos de éxito');

        setContactTitle('¿Listo para transformar tu operación?');
        setContactDesc('Contáctanos y recibe una consultoría gratuita para diseñar la solución especializada que tu empresa necesita.');
      } else {
        setBackText(await translateText('Volver', lang));
        setHeroTitle(await translateText('Creando una cultura de éxito empresarial', lang));
        setHeroDesc(await translateText('¡Potencia el crecimiento y la eficacia de tu empresa a través de nuestros servicios de Desarrollo Organizacional!', lang));
        setHeroBtn(await translateText('Solicitar consultoría', lang));

        setServicios(
          await Promise.all(
            initialServicios.map(async (s) => ({
              ...s,
              title: await translateText(s.title, lang),
              desc: await translateText(s.desc, lang),
            }))
          )
        );
        setServiciosTitle(await translateText('Soluciones para tu organización', lang));

        setBeneficios(
          await Promise.all(
            initialBeneficios.map(async (b) => ({
              ...b,
              title: await translateText(b.title, lang),
              desc: await translateText(b.desc, lang),
            }))
          )
        );
        setBeneficiosTitle(await translateText('Beneficios Centro de Capacitación', lang));

        setCtaTitle(await translateText('Transforma tu organización hoy', lang));
        setCtaDesc(await translateText('Agenda una consulta y conoce nuestras soluciones personalizadas para cultura, clima y talento.', lang));
        setCtaBtn(await translateText('Agenda una cita', lang));
        setCtaBtn2(await translateText('Ver casos de éxito', lang));

        setContactTitle(await translateText('¿Listo para transformar tu operación?', lang));
        setContactDesc(await translateText('Contáctanos y recibe una consultoría gratuita para diseñar la solución especializada que tu empresa necesita.', lang));
      }
    }
    fetchTranslations();
  }, [lang]);

  /* --------------------------------------------------------------------- */
  /* ------------------------ RENDER PRINCIPAL --------------------------- */
  /* --------------------------------------------------------------------- */

  return (
    <main>
      <div>
        {/* ---------- HERO ---------- */}
        <section
          style={{
            width: '100vw',
            marginLeft: 'calc(-50vw + 50%)',
            background: 'linear-gradient(90deg, #003d8f 0%, #004AB7 35%, #004AB7 65%, #0056d4 100%)',
            padding: '4.5rem 1.5rem 4rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* DECORACIONES */}
          <div
            style={{
              position: 'absolute',
              top: -100,
              right: -100,
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
              borderRadius: '50%',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: -50,
              left: -50,
              width: '250px',
              height: '250px',
              background: 'radial-gradient(circle, rgba(0,172,183,0.15) 0%, transparent 70%)',
              borderRadius: '50%',
              pointerEvents: 'none',
            }}
          />

          {/* GRID */}
          <div
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              gap: '2.2rem',
              alignItems: 'center',
              position: 'relative',
              zIndex: 2,
              minHeight: '380px',
            }}
          >
            {/* LEFT */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <Link
                href="/servicios"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.6rem 1.5rem',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: '#003d8f',
                  background: 'white',
                  borderRadius: '50px',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                  marginBottom: '1.5rem',
                  textDecoration: 'none',
                }}
              >
                <span style={{ fontSize: '1.1rem' }}>‹</span>
                {backText}
              </Link>

              <h1
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                  fontWeight: 900,
                  color: 'white',
                  marginBottom: '1.1rem',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                }}
              >
                {heroTitle}
              </h1>

              <p
                style={{
                  fontSize: '1.15rem',
                  color: 'rgba(255,255,255,0.95)',
                  lineHeight: 1.7,
                  marginBottom: '1.5rem',
                  maxWidth: '500px',
                }}
              >
                {heroDesc}
              </p>

              <Link
                href="/#contacto"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem 2rem',
                  background: 'white',
                  color: '#003d8f',
                  fontWeight: 700,
                  borderRadius: '12px',
                  textDecoration: 'none',
                }}
              >
                {heroBtn} <span>→</span>
              </Link>
            </motion.div>

            {/* RIGHT (imagen placeholder) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div
                style={{
                  width: '100%',
                  height: '380px',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(0,172,183,0.1) 100%)',
                  borderRadius: '20px',
                  border: '2px solid rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.2rem',
                }}
              >
                Imagen Desarrollo Organizacional
              </div>
            </motion.div>
          </div>
        </section>

        {/* --------------------------- SERVICIOS --------------------------- */}
        <section
          style={{
            width: '100vw',
            marginLeft: 'calc(-50vw + 50%)',
            padding: '5rem 1.5rem',
            background: 'white',
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 900,
              color: '#003d8f',
              marginBottom: '4rem',
              textAlign: 'center',
            }}
          >
            {serviciosTitle}
          </motion.h2>

          {/* Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2.5rem',
              justifyContent: 'center',
              alignItems: 'stretch',
            }}
          >
            {servicios.map((s, i) => {
              const Icon = iconMap[s.icon];

              return (
                <motion.div
                  key={i}
                  whileHover={{
                    scale: 1.08,
                    y: -8,
                    transition: { duration: 0.3, type: 'spring', bounce: 0.4 },
                  }}
                  style={{
                    minHeight: '220px',
                    padding: '2rem',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FDFF 50%, #F0F9FF 100%)',
                    border: '2px solid rgba(0,61,143,0.12)',
                    textAlign: 'center',
                    boxShadow: '0 12px 35px rgba(0,61,143,0.08)',
                    position: 'relative',
                    overflow: 'hidden',
                    flexDirection: 'column',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {/* Línea superior animada */}
                  <motion.div
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      background:
                        'linear-gradient(90deg, #003d8f 0%, #004AB7 35%, #0056d4 65%, #004AB7 100%)',
                    }}
                  />

                  {/* Icono */}
                  <div
                    style={{
                      width: '70px',
                      height: '70px',
                      background: 'linear-gradient(135deg, #E8F4FF 0%, #D0E8FF 100%)',
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1rem',
                      border: '1.5px solid rgba(0,61,143,0.15)',
                      color: '#003d8f',
                    }}
                  >
                    <Icon size={28} />
                  </div>

                  <h3
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 800,
                      color: '#003d8f',
                      marginBottom: '0.8rem',
                    }}
                  >
                    {s.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.95rem',
                      color: '#666',
                      lineHeight: 1.5,
                      margin: 0,
                      textAlign: 'justify',
                    }}
                  >
                    {s.desc}
                  </p>

                  {s.href && (
                    <Link
                      href={s.href}
                      style={{
                        marginTop: '1.2rem',
                        display: 'inline-block',
                        padding: '0.7rem 1.5rem',
                        borderRadius: '10px',
                        background: '#004AB7',
                        color: '#fff',
                        fontWeight: 700,
                        textDecoration: 'none',
                      }}
                    >
                      Ver más
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* --------------------------- BENEFICIOS --------------------------- */}
        <section
          style={{
            width: '100vw',
            marginLeft: 'calc(-50vw + 50%)',
            padding: '5rem 1.5rem',
            background: 'linear-gradient(180deg, #E8F4FF 0%, #D0E8FF 100%)',
          }}
        >
          <div
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: '1.1fr 0.9fr',
              gap: '3rem',
              alignItems: 'center',
            }}
          >
            {/* LEFT */}
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 900,
                  color: '#003d8f',
                  marginBottom: '4rem',
                }}
              >
                {beneficiosTitle}
              </motion.h2>

              {/* Cards en escalera */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {beneficios.map((b, i) => {
                  const Icon = iconMap[b.icon];

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.18 }}
                      whileHover={{
                        scale: 1.05,
                        y: -12,
                        backgroundColor: '#0057D9',
                        color: '#fff',
                      }}
                      style={{
                        padding: '2.5rem 2rem',
                        borderRadius: '16px',
                        background: '#fff',
                        border: '2px solid rgba(0,61,143,0.12)',
                        boxShadow: '0 12px 35px rgba(0,61,143,0.08)',
                        marginLeft: `${i * 2.5}rem`,
                        cursor: 'pointer',
                        transition: '0.2s',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Icon size={32} />
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{b.title}</h3>
                      </div>

                      <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>{b.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Imagen beneficios */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Image
                src="/imagen/prueba/tranning.webp"
                alt="Beneficio visual"
                width={220}
                height={320}
                style={{
                  borderRadius: '18px',
                  boxShadow: '0 12px 35px rgba(0,61,143,0.12)',
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>
        </section>

        {/* --------------------------- CTA FINAL --------------------------- */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            width: '100vw',
            marginLeft: 'calc(-50vw + 50%)',
            background: 'linear-gradient(135deg, #1a1a2e 0%, #0f0f1e 50%, #1a1a2e 100%)',
            minHeight: '420px',
            padding: '5rem 2rem',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 520px',
                gap: '3rem',
                alignItems: 'center',
              }}
            >
              {/* Left */}
              <div>
                <h3
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: 900,
                    color: 'white',
                    marginBottom: '1.5rem',
                  }}
                >
                  {ctaTitle}
                </h3>

                <p
                  style={{
                    fontSize: '1.15rem',
                    color: 'rgba(255,255,255,0.8)',
                    marginBottom: '2.5rem',
                    lineHeight: 1.8,
                    textAlign: 'justify',
                  }}
                >
                  {ctaDesc}
                </p>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Link
                    href="/#contacto"
                    style={{
                      padding: '1.1rem 2.5rem',
                      borderRadius: '20px',
                      background: '#0B4ED9',
                      color: 'white',
                      fontWeight: 800,
                      textDecoration: 'none',
                    }}
                  >
                    {ctaBtn}
                  </Link>

                  <Link
                    href="#casos-exito"
                    style={{
                      padding: '1.1rem 2.5rem',
                      borderRadius: '20px',
                      border: '2px solid #0B4ED9',
                      color: 'white',
                      fontWeight: 800,
                      textDecoration: 'none',
                    }}
                  >
                    {ctaBtn2}
                  </Link>
                </div>
              </div>

              {/* Right */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Image
                  src="/imagen/contacto/contacto-men.avif"
                  alt="Desarrollo Organizacional"
                  width={520}
                  height={300}
                  style={{
                    width: '100%',
                    height: '300px',
                    borderRadius: '18px',
                    objectFit: 'cover',
                    boxShadow: '0 28px 60px rgba(0,0,0,0.4)',
                  }}
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* --------------------------- CONTACTO --------------------------- */}
        <section
          style={{
            width: '100vw',
            marginLeft: 'calc(-50vw + 50%)',
            background: 'white',
            padding: '5rem 0 4rem 0',
            borderTop: '1px solid rgba(0, 74, 183, 0.08)',
          }}
        >
          <div
            style={{
              maxWidth: '1100px',
              margin: '0 auto',
              textAlign: 'center',
            }}
          >
            <h2
              style={{
                color: '#0050C8',
                fontWeight: 900,
                fontSize: 'clamp(2.3rem, 5vw, 2.8rem)',
                marginBottom: '1.2rem',
              }}
            >
              {contactTitle}
            </h2>

            <div
              style={{
                color: '#6B7280',
                fontSize: '1.15rem',
                marginBottom: '2.5rem',
              }}
            >
              {contactDesc}
            </div>

            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              <ContactForm />
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <Footer />
      </div>
    </main>
  );
}
