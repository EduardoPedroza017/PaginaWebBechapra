"use client";

import React from 'react';
import SubpageHero from "../../../components/SubpageHero";
import styles from './styles.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Gavel, FileText, Users, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const services = [
	{ icon: <Gavel size={20} />, title: 'Asesoría mercantil', desc: 'Constitución, contratos y gobierno corporativo para empresas en crecimiento.', details: 'Redacción y revisión de contratos, apoyo en asambleas y estructura societaria, con revisiones periódicas y plantillas adaptadas.' },
	{ icon: <ShieldCheck size={20} />, title: 'Cumplimiento y regulatorio', desc: 'Políticas internas, cumplimiento normativo y defensa administrativa.', details: 'Evaluaciones de cumplimiento, implementación de controles, respuesta a requerimientos y manejo de notificaciones administrativas.' },
	{ icon: <FileText size={20} />, title: 'Contratación laboral y seguridad', desc: 'Asesoría en contratos laborales, políticas y desvinculaciones con enfoque preventivo.', details: 'Elaboración de contratos, políticas internas, procedimientos disciplinarios y apoyo en procesos de baja laboral y conciliaciones.' },
	{ icon: <Users size={20} />, title: 'Protección de datos y privacidad', desc: 'Avisos de privacidad, contratos con proveedores y buenas prácticas para datos personales.', details: 'Mapeo de datos, políticas, cláusulas contractuales y guía para cumplir la Ley de Protección de Datos aplicable.' },
];

const faqs = [
	{ q: '¿Pueden acompañar procesos judiciales?', a: 'Sí, trabajamos con despachos asociados y coordinamos la defensa o representación según el alcance que requiera tu empresa.' },
	{ q: '¿Qué tan rápido implementan políticas internas?', a: 'Dependiendo del tamaño, en 2 a 6 semanas podemos tener políticas y procedimientos implementados con capacitación al personal clave.' },
	{ q: '¿Ofrecen servicios por proyecto o retainer?', a: 'Ambos: paquetes por proyecto y retainer mensual para soporte continuo y asesoría preventiva.' },
];

export default function Page() {
	const [openService, setOpenService] = React.useState<number | null>(null);
	const [openFaq, setOpenFaq] = React.useState<number | null>(null);

	return (
		<main>
			<SubpageHero title="Servicios Legales" subtitle="Asesoría, prevención y cumplimiento." />

			<motion.section className={styles.hero} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
				<div className={styles.heroInner}>
					<div className={styles.heroLeft}>
						<h2 className={styles.heroTitle}>Protege tu negocio con asesoría legal práctica</h2>
						<p className={styles.lead}>Estrategia legal enfocada en prevención y cumplimiento. Documentación clara, procesos aplicables y respuesta ágil cuando lo necesites.</p>

						<div className={styles.quickStats}>
							<div className={styles.stat}><strong>+300</strong><span>Casos atendidos</span></div>
							<div className={styles.stat}><strong>8+</strong><span>Años de experiencia</span></div>
						</div>

						<div className={styles.heroActions}>
							<Link href="/#contacto" className={styles.primary}>Solicitar asesoría</Link>
							<Link href="/servicios/servicios-legales#paquetes" className={styles.secondary}>Ver paquetes</Link>
						</div>
					</div>

					<div className={styles.heroRight} aria-hidden>
						<div className={styles.heroCard}>
							<Gavel size={34} color="#0b63e4" />
							<h4>Prevención y respuesta legal</h4>
							<p>Enfoque práctico para evitar riesgos y resolver contingencias.</p>
						</div>
					</div>
				</div>
			</motion.section>

			<section className={styles.container}>
				<h3 className={styles.sectionTitle}>Nuestros servicios</h3>

				<div className={styles.grid}>
					{services.map((s, i) => (
						<motion.article key={i} className={styles.card} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.36 }}>
							<div className={styles.cardIcon}>{s.icon}</div>
							<h4 className={styles.cardTitle}>{s.title}</h4>
							<p className={styles.cardDesc}>{s.desc}</p>

							<div style={{ marginTop: 10 }}>
								<button className={styles.linkButton} onClick={() => setOpenService(openService === i ? null : i)} aria-expanded={openService === i} aria-controls={`svc-${i}`}>{openService === i ? 'Cerrar' : 'Ver más'}</button>
							</div>

							<AnimatePresence initial={false}>
								{openService === i && (
									<motion.div id={`svc-${i}`} className={styles.cardDetail} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.28 }}>
										<p style={{ margin: 0 }}>{s.details}</p>
									</motion.div>
								)}
							</AnimatePresence>
						</motion.article>
					))}
				</div>

				<div id="paquetes" className={styles.packages}>
					<h4>Paquetes y modalidades</h4>
					<div className={styles.packageGrid}>
						<div className={styles.packageCard}>
							<strong>Retainer básico</strong>
							<div className={styles.packagePrice}>MXN 6,500 / mes</div>
							<p className={styles.packageText}>Soporte legal continuado: revisiones contractuales y consultas mensuales.</p>
						</div>
						<div className={styles.packageCard}>
							<strong>Proyecto puntual</strong>
							<div className={styles.packagePrice}>Desde MXN 12,000</div>
							<p className={styles.packageText}>Contratos, políticas o auditoría legal por proyecto con entregables claros.</p>
						</div>
						<div className={styles.packageCard}>
							<strong>Soporte completo</strong>
							<div className={styles.packagePrice}>A cotizar</div>
							<p className={styles.packageText}>Paquete a medida con representación, gestión de riesgos y capacitación a equipo.</p>
						</div>
					</div>
				</div>

				<div className={styles.timeline}>
					<h4>Cómo trabajamos</h4>
					<div className={styles.steps}>
						<div className={styles.step}><div className={styles.stepNum}>1</div><div><strong>Diagnóstico</strong><div className={styles.stepDesc}>Revisión rápida para identificar prioridades.</div></div></div>
						<div className={styles.step}><div className={styles.stepNum}>2</div><div><strong>Plan de trabajo</strong><div className={styles.stepDesc}>Propuesta con fases y entregables.</div></div></div>
						<div className={styles.step}><div className={styles.stepNum}>3</div><div><strong>Ejecución</strong><div className={styles.stepDesc}>Implementación, capacitación y soporte.</div></div></div>
					</div>
				</div>

				<div className={styles.faqsWrap}>
					<div className={styles.faqs}>
						<h4>Preguntas frecuentes</h4>
						{faqs.map((f, idx) => (
							<div key={idx} className={styles.faqItem}>
								<button className={styles.faqQ} onClick={() => setOpenFaq(openFaq === idx ? null : idx)} aria-expanded={openFaq === idx} aria-controls={`faq-${idx}`}>{f.q}</button>
								<AnimatePresence initial={false}>
									{openFaq === idx && (
										<motion.div id={`faq-${idx}`} className={styles.faqA} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.26 }}>
											<p style={{ margin: 0 }}>{f.a}</p>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						))}
					</div>

					<aside className={styles.testimonial}>
						<blockquote>
							<p>La asesoría preventiva nos ayudó a reducir contingencias y a formalizar procesos clave en la operación.</p>
							<cite>— M. Ortega, Dirección Legal</cite>
						</blockquote>
						<div className={styles.ctaBox}>
							<Link href="/#contacto" className={styles.primary}>Solicitar evaluación</Link>
						</div>
					</aside>
				</div>

				<div className={styles.finalCTA}>
					<div className={styles.finalInner}>
						<div>
							<h4>¿Listo para reducir riesgos legales?</h4>
							<p className={styles.muted}>Hablemos: proponemos un plan inicial para tu empresa.</p>
						</div>
						<Link href="/#contacto" className={styles.primary}>Contactar ahora</Link>
					</div>
				</div>

			</section>
		</main>
	);
}