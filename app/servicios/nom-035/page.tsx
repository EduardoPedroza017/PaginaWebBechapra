"use client";

import SubpageHero from "../../../components/SubpageHero";
import styles from './styles.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Clock, Book, Users } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function Page() {
	const timeline = [
		{ icon: <Clock size={18} />, title: 'Diagnóstico', desc: 'Encuestas y entrevistas para mapear riesgos.' },
		{ icon: <Book size={18} />, title: 'Diseño', desc: 'Políticas, protocolos y plan de intervención.' },
		{ icon: <Users size={18} />, title: 'Implementación', desc: 'Capacitaciones y acompañamiento en sitio.' },
	];

	const faqs = [
		{ q: '¿Qué es la NOM-035 y por qué es importante?', a: 'La NOM-035 protege el bienestar laboral identificando factores de riesgo psicosocial. Su cumplimiento reduce ausentismo, rotación y mejora clima.' },
		{ q: '¿Cuánto tiempo tarda una implementación típica?', a: 'Depende del tamaño de la organización; un diagnóstico inicial toma 2-4 semanas y la implementación del plan suele desarrollarse en 3-6 meses.' },
		{ q: '¿Proveen evidencia documental para auditorías?', a: 'Sí, entregamos reportes, actas y matrices de cierre que facilitan verificaciones y auditorías internas.' },
	];

	const [openFaq, setOpenFaq] = React.useState<number | null>(0);

	return (
		<main>
			<SubpageHero title="NOM 035" subtitle="Implementación y cumplimiento normativo." />

			<motion.section className={styles.nomHero} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
				<div className={styles.nomInner}>
					<div className={styles.nomLeft}>
						<h2 className={styles.nomTitle}>Cumple la NOM-035 y protege el bienestar organizacional</h2>
						<p className={styles.nomLead}>Te acompañamos en la identificación, diagnóstico y seguimiento de factores de riesgo psicosocial, con metodologías prácticas y herramienta de medición.</p>
						<ul className={styles.nomBullets}>
							<li>Diagnóstico inicial y encuesta estandarizada.</li>
							<li>Plan de intervención y políticas internas.</li>
							<li>Capacitación a mandos y seguimiento de impacto.</li>
						</ul>
						<div style={{ marginTop: 14 }}>
							<Link href="/#contacto" className={styles.nomPrimary}>Solicitar asesoría</Link>
						</div>
					</div>
					<div className={styles.nomRight} aria-hidden>
						<div className={styles.nomBadge}><ShieldCheck size={28} color="#2b7cf0" /></div>
						<div className={styles.nomStats}>
							<div className={styles.nomStat}><strong>+120</strong><span>Organizaciones asistidas</span></div>
							<div className={styles.nomStat}><strong>95%</strong><span>Acciones implementadas</span></div>
						</div>
					</div>
				</div>
			</motion.section>

			<section className={styles.nomContainer}>
				<h3 className={styles.sectionTitle}>Nuestro enfoque</h3>
				<div className={styles.nomSteps}>
					<article className={styles.nomCard}>
						<div className={styles.nomStepNum}>1</div>
						<h4>Evaluación</h4>
						<p>Aplicamos encuestas y entrevistas para mapear factores de riesgo y condiciones organizacionales.</p>
					</article>
					<article className={styles.nomCard}>
						<div className={styles.nomStepNum}>2</div>
						<h4>Plan de intervención</h4>
						<p>Diseñamos políticas, protocolos y acciones correctivas alineadas a la NOM-035.</p>
					</article>
					<article className={styles.nomCard}>
						<div className={styles.nomStepNum}>3</div>
						<h4>Capacitación</h4>
						<p>Formación para mandos y colaboradores para reducir riesgos y mejorar resiliencia.</p>
					</article>
				</div>

				{/* Extras: timeline, FAQ, testimonial & resources */}
				<div className={styles.nomExtras}>
					<div className={styles.nomTimeline} aria-hidden>
						{timeline.map((t, idx) => (
							<div key={idx} className={styles.nomTimelineItem}>
								<div className={styles.nomTimelineIcon}>{t.icon}</div>
								<div>
									<strong>{t.title}</strong>
									<div className={styles.nomTimelineDesc}>{t.desc}</div>
								</div>
							</div>
						))}
					</div>

					<div className={styles.nomFaqWrap}>
						<h4>Preguntas frecuentes</h4>
						<div className={styles.nomFAQ}>
							{faqs.map((f, i) => (
								<div key={i} className={styles.nomFaqItem}>
									<button className={styles.faqQuestion} onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i} aria-controls={`faq-${i}`}>
										{f.q}
										<span className={styles.faqChevron}>{openFaq === i ? '−' : '+'}</span>
									</button>
									<AnimatePresence initial={false}>
										{openFaq === i && (
											<motion.div id={`faq-${i}`} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.28 }} className={styles.faqAnswer}>
												<p style={{ margin: 0 }}>{f.a}</p>
											</motion.div>
										)}
									</AnimatePresence>
								</div>
							))}
						</div>
					</div>

					<aside className={styles.testimonial}>
						<div className={styles.testAvatar}>CB</div>
						<blockquote>
							<p>La implementación fue clara, práctica y con resultados visibles en 3 meses. El acompañamiento facilitó la aceptación interna.</p>
							<cite>— C. Bautista, RRHH</cite>
						</blockquote>
					</aside>
				</div>

				<div className={styles.nomCTA}>
					<div className={styles.nomCTABox}>
						<div>
							<h4>¿Listo para comenzar?</h4>
							<p className={styles.muted}>Solicita un diagnóstico inicial y recibe una hoja de ruta práctica.</p>
						</div>
						<div style={{ display: 'flex', gap: 10 }}>
							<Link href="/#contacto" className={styles.nomButton}>Contáctanos</Link>
							<Link href="/#contacto" className={styles.secondaryButton}>Solicitar presupuesto</Link>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}