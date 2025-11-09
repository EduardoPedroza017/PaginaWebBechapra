"use client";

import SubpageHero from "../../../components/SubpageHero";
import styles from './styles.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, PieChart, ClipboardCheck } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const services = [
	{ icon: <FileText size={22} />, title: 'Contabilidad general', desc: 'Registros, conciliaciones y cierre mensual con reportes claros para la dirección.' },
	{ icon: <PieChart size={22} />, title: 'Reportes y KPI', desc: 'Estados financieros, análisis de rentabilidad y dashboards a medida.' },
	{ icon: <ClipboardCheck size={22} />, title: 'Impuestos y cumplimiento', desc: 'Declaraciones, cumplimiento fiscal y asesoría tributaria constante.' },
];

export default function Page() {
	const [openService, setOpenService] = React.useState<number | null>(null);
	const [openFaq, setOpenFaq] = React.useState<number | null>(null);
	const packages = [
		{ name: 'Básico', price: 'MXN 3,500/mo', items: ['Registro contable mensual', 'Conciliaciones básicas', 'Reporte mensual'] },
		{ name: 'Empresarial', price: 'MXN 7,500/mo', items: ['Todo Básico', 'Reportes KPI', 'Asesoría trimestral'] },
		{ name: 'Corporativo', price: 'MXN 14,000/mo', items: ['Todo Empresarial', 'Contabilidad por proyecto', 'Soporte prioritario'] },
	];

	const timeline = [
		{ step: '01', title: 'Diagnóstico inicial', desc: 'Revisión de libros, procedimientos y puntos críticos.' },
		{ step: '02', title: 'Plan operativo', desc: 'Propuesta de trabajo, controles y calendarización.' },
		{ step: '03', title: 'Ejecución y entrega', desc: 'Cierres, reportes y entrega de evidencia.' },
	];

	const faqs = [
	  { q: '¿Ofrecen facturación electrónica?', a: 'Sí, gestionamos y enlazamos la contabilidad con tus CFDI para conciliaciones automáticas.' },
	  { q: '¿Cómo manejan la confidencialidad?', a: 'Firmamos acuerdos de confidencialidad y usamos accesos controlados para proteger tu información.' },
	];
	return (
		<main>
			<SubpageHero title="Servicios Contables" subtitle="Contabilidad y administración financiera." />

			<motion.section className={styles.acHero} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
				<div className={styles.acHeroInner}>
					<div className={styles.acHeroLeft}>
						<h2 className={styles.acHeroTitle}>Contabilidad confiable que impulsa tu negocio</h2>
						<p className={styles.acLead}>Nos encargamos de la contabilidad operativa y la administración financiera para que puedas tomar decisiones con información clara y oportuna.</p>

						<div className={styles.acStats}>
							<div className={styles.acStat}><strong>+500</strong><span>Libros contables</span></div>
							<div className={styles.acStat}><strong>10+</strong><span>Años de experiencia</span></div>
						</div>

						<div style={{ marginTop: 14 }}>
							<Link href="/#contacto" className={styles.acCTAButton}>Solicitar consulta</Link>
						</div>
					</div>

					<div className={styles.acHeroRight} aria-hidden>
						<div className={styles.acHeroCard}>
							<FileText size={28} color="#2b7cf0" />
							<h4>Soporte contable completo</h4>
							<p>Procesos, cierres y reportes con control y calidad.</p>
						</div>
					</div>
				</div>
			</motion.section>

			<section className={styles.acContainer}>
				<h3 className={styles.sectionTitle}>Qué ofrecemos</h3>
				<div className={styles.acGrid}>
					{services.map((s, i) => (
						<article key={i} className={styles.acCard}>
							<div className={styles.acIcon}>{s.icon}</div>
							<h4 className={styles.acTitle}>{s.title}</h4>
							<p className={styles.acDesc}>{s.desc}</p>
							<div style={{ marginTop: 10 }}>
								<button className={styles.acSmallBtn} onClick={() => setOpenService(openService === i ? null : i)} aria-expanded={openService === i} aria-controls={`svc-${i}`}>{openService === i ? 'Cerrar' : 'Ver más'}</button>
							</div>
							{openService === i && (
								<div id={`svc-${i}`} className={styles.acServiceDetail}>
									<p style={{ margin: 0 }}>{s.desc} - Incluye conciliaciones detalladas, apuntes de ajuste y soporte para auditorías internas.</p>
								</div>
							)}
						</article>
					))}
				</div>

				{/* Paquetes y timeline */}
				<div className={styles.acPackages}>
					<h4>Paquetes populares</h4>
					<div className={styles.packageGrid}>
						{packages.map((p, idx) => (
							<div key={idx} className={styles.packageCard}>
								<strong className={styles.packageName}>{p.name}</strong>
								<div className={styles.packagePrice}>{p.price}</div>
								<ul className={styles.packageList}>
									{p.items.map((it, j) => <li key={j}>{it}</li>)}
								</ul>
								<Link href="/#contacto" className={styles.secondaryButton}>Elegir paquete</Link>
							</div>
						))}
					</div>
				</div>

				<div className={styles.acBenefits}>
					<div className={styles.acBenefit}>
						<h4>Transparencia</h4>
						<p>Reportes claros y conciliaciones para entender tu posición real.</p>
					</div>
					<div className={styles.acBenefit}>
						<h4>Proactividad</h4>
						<p>Alertas y recomendaciones para optimizar impuestos y flujos.</p>
					</div>
					<div className={styles.acBenefit}>
						<h4>Soporte</h4>
						<p>Equipo contable disponible para dudas y revisiones periódicas.</p>
					</div>
				</div>

				<div className={styles.acTimeline}>
					{timeline.map((t, k) => (
						<div key={k} className={styles.acTimelineItem}>
							<div className={styles.acTimelineStep}>{t.step}</div>
							<div>
								<strong>{t.title}</strong>
								<div className={styles.acTimelineDesc}>{t.desc}</div>
							</div>
						</div>
					))}
				</div>

				{/* FAQ y Testimonial */}
				<div className={styles.acFaqsWrap}>
					<div className={styles.acFAQ}>
						<h4>Preguntas frecuentes</h4>
						{faqs.map((f, i) => (
							<div key={i} className={styles.faqItem}>
								<button className={styles.faqQuestion} onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i} aria-controls={`faq-${i}`}>{f.q}</button>
								<AnimatePresence initial={false}>
									{openFaq === i && (
										<motion.div id={`faq-${i}`} className={styles.faqAnswer} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.26 }}>
											<p style={{ margin: 0 }}>{f.a}</p>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						))}
					</div>

					<aside className={styles.acTestimonial}>
						<blockquote>
							<p>Trabajar con el equipo contable mejoró nuestra predictibilidad financiera y liberó tiempo para decisiones estratégicas.</p>
							<cite>— J. Morales, CFO</cite>
						</blockquote>
						<div className={styles.resourceBox}>
							<div className={styles.resourceLeft}>Guía: Cómo preparar tus estados financieros</div>
							{/* Download button removed by request */}
						</div>
					</aside>
				</div>

				<div className={styles.acBenefits}>
					<div className={styles.acBenefit}>
						<h4>Transparencia</h4>
						<p>Reportes claros y conciliaciones para entender tu posición real.</p>
					</div>
					<div className={styles.acBenefit}>
						<h4>Proactividad</h4>
						<p>Alertas y recomendaciones para optimizar impuestos y flujos.</p>
					</div>
					<div className={styles.acBenefit}>
						<h4>Soporte</h4>
						<p>Equipo contable disponible para dudas y revisiones periódicas.</p>
					</div>
				</div>

				<div className={styles.acCTA}>
					<div className={styles.acCTABox}>
						<div>
							<h4>¿Listo para ordenar tus finanzas?</h4>
							<p className={styles.muted}>Agenda una reunión y recibe una propuesta personalizada.</p>
						</div>
						<Link href="/#contacto" className={styles.acPrimary}>Contactar</Link>
					</div>
				</div>
			</section>
		</main>
	);
}