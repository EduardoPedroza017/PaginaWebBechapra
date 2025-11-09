"use client";

import React from 'react';
import SubpageHero from "../../../components/SubpageHero";
import styles from './styles.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Layers, Users, DollarSign } from 'lucide-react';
import Link from 'next/link';

const services = [
	{ icon: <Briefcase size={18} />, title: 'Constitución y contratos', desc: 'Acompañamiento para constituir tu empresa y contratos comerciales básicos.' },
	{ icon: <Layers size={18} />, title: 'Contabilidad simplificada', desc: 'Procesos simples y reportes claros pensados para PYMEs.' },
	{ icon: <Users size={18} />, title: 'Recursos humanos', desc: 'Contratos, políticas y gestión de personal en formatos accesibles.' },
	{ icon: <DollarSign size={18} />, title: 'Optimización de costos', desc: 'Revisión de gastos y recomendaciones para mejorar flujo de efectivo.' },
];

const packages = [
	{ name: 'Starter', price: 'MXN 2,500 / mes', items: ['Registro básico', 'Reporte mensual', 'Consultas por email'] },
	{ name: 'Growth', price: 'MXN 6,000 / mes', items: ['Todo Starter', 'Reportes KPI', 'Soporte telefónico'] },
	{ name: 'Scale', price: 'MXN 12,000 / mes', items: ['Todo Growth', 'Cierre anual', 'Consultoría estratégica'] },
];

const faqs = [
	{ q: '¿Puedo cambiar de paquete después?', a: 'Sí, puedes escalar o bajar de paquete con 30 días de aviso y ajustamos la facturación.' },
	{ q: '¿Ofrecen facturación y nómina?', a: 'Sí, ofrecemos soluciones de facturación y coordinación con proveedores de nómina según la necesidad.' },
];

export default function Page() {
	const [openService, setOpenService] = React.useState<number | null>(null);
	const [openFaq, setOpenFaq] = React.useState<number | null>(null);
	const scrollerRef = React.useRef<HTMLDivElement | null>(null);
	const pausedRef = React.useRef(false);

	// autoplay horizontal scroller for use cases
	React.useEffect(() => {
		const el = scrollerRef.current;
		if (!el) return;
		let raf = 0;
		const speed = 0.28; // pixels per ms
		let last = performance.now();

		const loop = (now: number) => {
			const dt = Math.min(60, now - last);
			last = now;
			if (!pausedRef.current) {
				el.scrollLeft += speed * dt;
				// wrap-around
				if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
					el.scrollLeft = 0;
				}
			}
			raf = requestAnimationFrame(loop);
		};

		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	}, []);

	return (
		<main>
			<SubpageHero title="Servicios PYME" subtitle="Paquetes y acompañamiento para pequeñas y medianas empresas." />

			<motion.section className={styles.hero} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
				<div className={styles.heroInner}>
					<div className={styles.heroLeft}>
						<h2 className={styles.title}>Soluciones prácticas para PYMEs</h2>
						<p className={styles.lead}>Paquetes pensados para empresas pequeñas: menos complejidad, más foco en crecimiento.</p>
						<div className={styles.actions}>
							<Link href="/#contacto" className={styles.primary}>Quiero una propuesta</Link>
							<Link href="/servicios/servicios-pyme#paquetes" className={styles.secondary}>Ver paquetes</Link>
						</div>
					</div>
					<div className={styles.heroRight} aria-hidden>
						<div className={styles.visualCard}>
							<Briefcase size={34} color="#0b63e4" />
							<h4>Soporte ágil</h4>
							<p>Procesos simplificados para dedicar menos tiempo a la administración.</p>
						</div>
					</div>
				</div>
			</motion.section>

			<section className={styles.container}>
				<motion.h3 className={styles.sectionTitle} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.36 }}>Qué incluimos</motion.h3>

				<div className={styles.grid}>
					{services.map((s, i) => (
						<motion.article key={i} className={styles.card} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.06 }}>
							<div className={styles.icon}>{s.icon}</div>
							<h4 className={styles.cardTitle}>{s.title}</h4>
							<p className={styles.cardDesc}>{s.desc}</p>
							<div style={{ marginTop: 10 }}>
								<button className={styles.linkBtn} onClick={() => setOpenService(openService === i ? null : i)} aria-expanded={openService === i} aria-controls={`svc-pyme-${i}`}>{openService === i ? 'Cerrar' : 'Ver más'}</button>
							</div>
							<AnimatePresence>
								{openService === i && (
									<motion.div id={`svc-pyme-${i}`} className={styles.detail} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.24 }}>
										<p style={{ margin: 0 }}>Ofrecemos documentación, plantillas y acompañamiento operativo para implementar cada servicio de forma rápida. Además apoyamos en la selección de herramientas digitales y procesos internos.</p>
									</motion.div>
								)}
							</AnimatePresence>
						</motion.article>
					))}
				</div>

				{/* Use-cases scroller */}
				<motion.div className={styles.useCasesSection} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.36 }}>
					<h4>Casos de uso</h4>
					<div className={styles.useCasesScroller} ref={scrollerRef} onMouseEnter={() => (pausedRef.current = true)} onMouseLeave={() => (pausedRef.current = false)} onTouchStart={() => (pausedRef.current = true)} onTouchEnd={() => (pausedRef.current = false)} role="list">
						<div className={styles.useCaseCard} role="listitem">
							<h5>Venta en línea</h5>
							<p>Optimización de procesos contables y facturación para tiendas online que crecen.</p>
						</div>
						<div className={styles.useCaseCard} role="listitem">
							<h5>Servicios profesionales</h5>
							<p>Paquetes con contratos, políticas y gestión de clientes recurrentes.</p>
						</div>
						<div className={styles.useCaseCard} role="listitem">
							<h5>Restaurantes y retail</h5>
							<p>Control de inventarios, costos y recomendaciones para mejorar margen.</p>
						</div>
						<div className={styles.useCaseCard} role="listitem">
							<h5>Escalamiento</h5>
							<p>Procesos para preparar la empresa para inversión o crecimiento estructurado.</p>
						</div>
					</div>
				</motion.div>

				<motion.div id="paquetes" className={styles.packages} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.36 }}>
					<h4>Paquetes</h4>
					<div className={styles.packageGrid}>
						{packages.map((p, idx) => (
							<motion.div key={idx} className={styles.packageCard} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.28, delay: idx * 0.04 }}>
								<strong>{p.name}</strong>
								<div className={styles.price}>{p.price}</div>
								<ul>
									{p.items.map((it, j) => <li key={j}>{it}</li>)}
								</ul>
								<Link href="/#contacto" className={styles.choose}>Elegir</Link>
							</motion.div>
						))}
					</div>
				</motion.div>

				<motion.div className={styles.faqs} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3 }}>
					<h4>Preguntas frecuentes</h4>
					{faqs.map((f, idx) => (
						<div key={idx} className={styles.faqItem}>
							<button className={styles.faqQ} onClick={() => setOpenFaq(openFaq === idx ? null : idx)} aria-expanded={openFaq === idx} aria-controls={`faq-pyme-${idx}`}>{f.q}</button>
							<AnimatePresence>
								{openFaq === idx && (
									<motion.div id={`faq-pyme-${idx}`} className={styles.faqA} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22 }}>
										<p style={{ margin: 0 }}>{f.a}</p>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					))}
				</motion.div>

				<motion.div className={styles.finalCTA} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.34 }}>
					<div className={styles.finalInner}>
						<div>
							<h4>¿Listo para arrancar?</h4>
							<p className={styles.muted}>Solicita una propuesta adaptada a tu operación.</p>
						</div>
						<Link href="/#contacto" className={styles.primary}>Contactar</Link>
					</div>
				</motion.div>
			</section>
		</main>
	);
}