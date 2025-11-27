"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { DollarSign, Users, UserCheck } from 'lucide-react';
import styles from "./styles.module.css";
import ContactForm from "@/app/components/ContactForm";
import Footer from "@/components/Footer";

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function CapitalHumanoClient({ dict }: any) {
    const heroRef = useRef<HTMLElement | null>(null);

    const services = [
        {
            icon: <Users />,
            title: dict.capitalHumano.services[0].title,
            desc: dict.capitalHumano.services[0].desc,
            link: "/servicios/servicios-especializados"
        },
        {
            icon: <DollarSign />,
            title: dict.capitalHumano.services[1].title,
            desc: dict.capitalHumano.services[1].desc,
            link: "/servicios/payroll"
        },
        {
            icon: <UserCheck />,
            title: dict.capitalHumano.services[2].title,
            desc: dict.capitalHumano.services[2].desc,
            link: "/servicios/atraccion-de-talento"
        }
    ];

    useEffect(() => {
        const backEl = document.getElementById('backLink');
        function onScroll() {
            if (!heroRef.current || !backEl) return;
            const heroRect = heroRef.current.getBoundingClientRect();
            const heroBottom = heroRect.bottom + window.scrollY;
            if (window.scrollY > heroBottom - 48) {
                backEl.classList.add('scrolled');
            } else {
                backEl.classList.remove('scrolled');
            }
        }
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, []);

    return (
        <main className={styles.main}>
            {/* HERO SECTION */}
            <section className={styles.hero} ref={heroRef}>
                <div className={styles.heroInner}>
                    <Link href="/servicios" id="backLink" className={styles.backLink} aria-label={dict.common.back}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>{dict.common.back}</span>
                    </Link>
                    <div className={styles.heroContent}>
                        <motion.h1
                            className={styles.title}
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                        >
                            {dict.capitalHumano.hero.title}
                        </motion.h1>

                        <motion.p
                            className={styles.lead}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            {dict.capitalHumano.hero.description}
                        </motion.p>

                        <div style={{ marginTop: '1.75rem' }}>
                            <Link href="#contacto" className={styles.heroButton}>
                                {dict.capitalHumano.hero.cta}
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 7l5 5-5 5M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    <div className={styles.heroVisual} aria-hidden="true">
                        <div className={styles.heroImageWrap}>
                            <Image
                                src="/imagen/servicos/capital-humano.webp"
                                alt="Persona trabajando con laptop y documentos"
                                fill
                                className={styles.heroImage}
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* SEPARATOR */}
            <div className={styles.separator}>
                <span></span>
            </div>

            {/* SERVICES SECTION */}
            <section className={styles.servicesSection}>
                <div className={styles.container}>
                    <motion.h2
                        className={styles.sectionTitle}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {dict.capitalHumano.servicesTitle}
                    </motion.h2>
                    <motion.div
                        className={styles.servicesGrid}
                        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.14 } } }}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                    >
                        {services.map((service, index) => (
                            <motion.article
                                key={index}
                                className={styles.serviceCard}
                                variants={cardVariants}
                                style={{ animationDelay: `${index * 0.08}s` }}
                            >
                                <div className={styles.serviceIcon}>
                                    {service.icon}
                                </div>
                                <h3 className={styles.serviceTitle}>{service.title}</h3>
                                <p className={styles.serviceDesc}>{service.desc}</p>

                                <div className={styles.cardFooter}>
                                    <Link href={service.link} className={styles.exploreButton}>
                                        {dict.common.readMore}
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path d="M13 7l5 5-5 5M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </Link>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* BENEFICIOS HUMAN CAPITAL */}
            <section className={styles.benefitsSection}>
                <div className={styles.container}>
                    <div className={styles.benefitsGrid}>
                        <div className={styles.benefitsImageWrap}>
                            <Image
                                src="/imagen/capital-humano/cap-hum.webp"
                                alt="Equipo colaborando en oficina"
                                width={500}
                                height={400}
                                className={styles.benefitsImage}
                            />
                        </div>

                        <div className={styles.benefitsContent}>
                            <motion.h2
                                className={styles.benefitsTitle}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                {dict.capitalHumano.benefitsTitle}
                            </motion.h2>
                            <div className={styles.benefitsCards}>
                                {dict.capitalHumano.benefits.map((benefit: any, index: number) => (
                                    <div key={index} className={styles.benefitCard}>
                                        <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                                        <p className={styles.benefitDesc}>{benefit.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA SECTION MEJORADA */}
            <motion.section
                className={styles.ctaSectionModern}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className={styles.ctaModernContainer}>
                    <div className={styles.ctaModernContent}>
                        <h2 className={styles.ctaModernTitle}>{dict.capitalHumano.cta.title}</h2>
                        <p className={styles.ctaModernSubtitle}>{dict.capitalHumano.cta.subtitle}</p>
                        <div className={styles.ctaModernButtons}>
                            <a href="#contacto" className={styles.ctaModernPrimaryBtn}>{dict.capitalHumano.cta.primary}</a>
                            <a href="#" className={styles.ctaModernSecondaryBtn}>{dict.capitalHumano.cta.secondary}</a>
                        </div>
                    </div>
                    <div className={styles.ctaModernImageWrap}>
                        <Image
                            src="/imagen/contacto/contacto-men.avif"
                            alt="Reunión de negocios Bechapra"
                            width={520}
                            height={340}
                            className={styles.ctaModernImage}
                        />
                    </div>
                </div>
            </motion.section>

            {/* CONTACT SECTION */}
            <section id="contacto" className={styles.contactSection}>
                <div className={styles.container}>
                    <motion.h2
                        className={styles.sectionTitle}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {dict.capitalHumano.contactTitle}
                    </motion.h2>
                    <ContactForm />
                </div>
            </section>

            <Footer />
        </main>
    );
}
