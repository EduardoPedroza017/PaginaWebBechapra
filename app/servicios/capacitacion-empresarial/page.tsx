"use client";

import SubpageHero from "../../../components/SubpageHero";
import styles from './styles.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Users, Award, BarChart3, Sparkles } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const programas = [
	{ icon: <BookOpen size={26} />, title: 'Talleres de habilidades blandas', desc: 'Comunicación, liderazgo y trabajo en equipo, diseñados para mejorar la colaboración interna.', details: 'Sesiones prácticas con actividades en vivo, role-play y feedback dirigido. Duración típica: 8-16 horas por cohort.' },
	{ icon: <Users size={26} />, title: 'Formación técnica especializada', desc: 'Capacitaciones en herramientas y procesos específicos para tu operación.', details: 'Cursos adaptados al stack y procesos internos, incluyen ejercicios reales y material para transferir aprendizaje.' },
	{ icon: <Award size={26} />, title: 'Programas de liderazgo', desc: 'Mentoring y programas para mandos medios y directivos con seguimiento de impacto.', details: 'Planes de 6-12 meses con coaching, workshops y seguimiento de KPIs de liderazgo.' },
	{ icon: <BarChart3 size={26} />, title: 'Medición y evaluación', desc: 'KPI y evaluación post-capacitación para medir ROI y efectividad.', details: 'Diseñamos encuestas, rúbricas y paneles de control para medir la transferencia y el impacto en los indicadores clave.' },
];

export default function Page() {
	const scrollerRef = React.useRef<HTMLDivElement | null>(null);
	const [openIndex, setOpenIndex] = React.useState<number | null>(null);
	const [isPaused, setIsPaused] = React.useState(false);

	React.useEffect(() => {
		const mq = typeof window !== 'undefined' && 'matchMedia' in window ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
		if (mq && mq.matches) return;
		const el = scrollerRef.current;
		if (!el) return;
		const container = el;
		let raf = 0;
		let last = performance.now();
		const speed = 0.06; // px per ms (~60px/s)

		function step(now: number) {
			const dt = now - last;
			last = now;
			if (!isPaused && openIndex === null) {
				container.scrollLeft += speed * dt;
				if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 2) {
					container.scrollTo({ left: 0, behavior: 'smooth' });
				}
			}
			raf = requestAnimationFrame(step);
		}

		raf = requestAnimationFrame(step);
		return () => cancelAnimationFrame(raf);
	}, [isPaused, openIndex]);

	React.useEffect(() => {
		const el = scrollerRef.current;
		if (!el) return;
		const onTouchStart = () => setIsPaused(true);
		const onTouchEnd = () => setTimeout(() => setIsPaused(false), 2500);
		el.addEventListener('touchstart', onTouchStart, { passive: true });
		el.addEventListener('touchend', onTouchEnd);
		return () => {
			el.removeEventListener('touchstart', onTouchStart as EventListener);
			el.removeEventListener('touchend', onTouchEnd as EventListener);
		};
	}, []);

	return (
		<main>
			<SubpageHero title="Capacitación Empresarial" subtitle="Programas y talleres a medida." />

			{/* Hero ampliado: más contenido, CTA y estadísticas */}
			<motion.section className={styles.ceHeroBanner} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} aria-labelledby="ce-hero-title">
				<div className={styles.ceHeroInner}>
					<div className={styles.ceHeroContent}>
						<div className={styles.ceHeroTop}>
							<div className={styles.ceHeroBadge} aria-hidden>
								<Sparkles size={18} color="#2b7cf0" />
							</div>
							<h2 id="ce-hero-title" className={styles.ceHeroTitle}>Capacita a tu equipo para los retos actuales</h2>
						</div>
						<p className={styles.ceHeroSubtitle}>Programas prácticos, con instructores certificados y seguimiento que asegura la transferencia de conocimiento.</p>
						<div style={{ marginTop: 14 }}>
							<Link href="/#contacto" className={styles.ceCTAButton} aria-label="Solicitar diagnóstico formativo">Solicitar diagnóstico</Link>
						</div>
					</div>
					<div className={styles.ceStats} aria-hidden>
						<div className={styles.ceStat}><strong>300+</strong><span>Horas impartidas</span></div>
						<div className={styles.ceStat}><strong>98%</strong><span>Satisfacción</span></div>
						<div className={styles.ceStat}><strong>75%</strong><span>Transferencia medida</span></div>
					</div>
				</div>
			</motion.section>

			<section className={styles.ceContainer}>
				<div className={styles.ceIntro}>
					<p className={styles.muted}>En Bechapra diseñamos programas de capacitación alineados a la estrategia y cultura de cada organización. Nuestros programas son prácticos, medibles y adaptados al ritmo de tus equipos.</p>
					<p className={styles.ceLead}>Ofrecemos formatos presenciales, en línea y blended con instructores certificados y seguimiento para asegurar transferencia de aprendizaje.</p>
				</div>

				{/* Scroller único: cards amplias (autoplay, sin controles visibles) */}

				<div ref={scrollerRef} className={styles.ceGridScroller} role="list" aria-label="Programas de capacitación"
					tabIndex={0}
					onMouseEnter={() => setIsPaused(true)}
					onMouseLeave={() => setIsPaused(false)}
					onFocus={() => setIsPaused(true)}
					onBlur={() => setIsPaused(false)}
				>
					{programas.map((p, i) => (
						<motion.article key={i} className={styles.ceCard} role="listitem" whileHover={{ translateY: -6 }} transition={{ type: 'spring', stiffness: 220 }}>
							<div className={styles.ceIcon}>{p.icon}</div>
							<div>
								<h4 className={styles.ceCardTitle}>{p.title}</h4>
								<p className={styles.ceCardDesc}>{p.desc}</p>
								<div className={styles.ceCardMeta}>
									<div className={styles.ceMetaPill}>Formato: In-company / Online</div>
									<div className={styles.ceMetaPill}>Duración: Variable</div>
								</div>
								<div style={{ marginTop: 10 }}>
									<button className={styles.ceBtn} onClick={() => setOpenIndex(openIndex === i ? null : i)} aria-expanded={openIndex === i} aria-controls={`det-${i}`}>{openIndex === i ? 'Cerrar' : 'Ver más'}</button>
								</div>
								<AnimatePresence initial={false}>
									{openIndex === i && (
										<motion.div id={`det-${i}`} style={{ marginTop: 10 }} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.32 }}>
											<p style={{ margin: 0 }}>{p.details}</p>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						</motion.article>
					))}
				</div>

				<div className={styles.ceBenefits}>
					<div className={styles.ceBenefit}>
						<h4>Entregables claros</h4>
						<p>Materiales, guías y reportes de impacto al finalizar cada ciclo.</p>
					</div>
					<div className={styles.ceBenefit}>
						<h4>Planes personalizados</h4>
						<p>Diseño de itinerarios formativos alineados a objetivos estratégicos.</p>
					</div>
					<div className={styles.ceBenefit}>
						<h4>Medición continua</h4>
						<p>Encuestas pre-post y métricas para demostrar resultados.</p>
					</div>
				</div>

				<div className={styles.ceCTA}>
					<div className={styles.ceCTABox}>
						<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
							<Sparkles size={22} color="#2b7cf0" />
							<h3>Solicita tu diagnóstico formativo</h3>
						</div>
						<p className={styles.muted}>Recibiras una propuesta con cronograma, metodología y ROI estimado.</p>
						<Link href="/#contacto" className={styles.ceCTAButton}>Solicitar propuesta</Link>
					</div>
				</div>
			</section>
		</main>
	);
}