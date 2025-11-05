"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import styles from "./styles.module.css";

const groups = [
	{
	title: "Capital Humano",
	href: "/servicios/capital-humano",
	icon: "/imagen/icons/icon-attraction.svg",
	description: "Gestionamos talento, nómina y soluciones humanas que permiten a tu empresa crecer.",
	items: [
	{ title: "Servicios especializados", href: "/servicios/servicios-especializados" },
	{ title: "Payrolling", href: "/servicios/payroll" },
	{ title: "Atracción de Talento", href: "/servicios/atraccion-de-talento" },
	],
	},
	{
	title: "Desarrollo Organizacional",
	href: "/servicios/desarrollo-organizacional",
	icon: "/imagen/icons/icon-training.svg",
	description: "Mejoramos procesos, cultura y capacidades para que la organización sea más ágil y productiva.",
	items: [
	{ title: "Desarrollo organizacional", href: "/servicios/desarrollo-organizacional" },
	{ title: "Capacitación Empresarial", href: "/servicios/capacitacion-empresarial" },
	{ title: "NOM 035", href: "/servicios/nom-035" },
	],
	},
	{
	title: "Management Services",
	href: "/servicios/management-services",
	icon: "/imagen/icons/icon-outsourcing.svg",
	description: "Servicios contables, legales y administrativos bajo un solo proveedor confiable.",
	items: [
	{ title: "Servicios Contables", href: "/servicios/servicios-contables" },
	{ title: "Servicios Legales", href: "/servicios/servicios-legales" },
	{ title: "Servicios PYME", href: "/servicios/servicios-pyme" },
	],
	},
] as const;


export default function ServiciosIndex() {
	return (
		<>
		{/* Encabezado con 3D simple a un lado */}
			<section className={`${styles.heroSection}`}>
				<div className={`${styles.heroInner} max-w-7xl mx-auto px-6`}>
						<div>
							<h1 className="text-balance text-4xl font-semibold leading-tight md:text-5xl heroTitle">Servicios</h1>
							<p className="mt-3 max-w-xl text-white/75 heroLead">Explora nuestras tres líneas principales y entra a cada subservicio.</p>
							<Link href="#fin-servicios" className="glass-btn-secondary mt-4 inline-flex">Más info</Link>
						</div>

						<div className="relative aspect-[4/3] w-full" aria-hidden="true">
							<div className="absolute inset-0 rounded-3xl border p-1 backdrop-blur-xl" style={{ borderColor:'rgba(255,255,255,0.15)', background:'var(--brand-secondary-15)' }}>
								<div className="glass-inset h-full w-full rounded-[22px] grid place-items-center">
									<div className="size-36 rounded-full" style={{ background:'radial-gradient(circle at 30% 30%, var(--brand-primary-15), transparent 60%)' }} />
								</div>
							</div>
						</div>
				</div>
		</section>

		{/* 3 columnas con subservicios (tarjetas clicables) */}
		<section className="mt-10">
			<div className="max-w-7xl mx-auto px-6">
				<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
					{groups.map((g) => (
						<GroupCard key={g.title} group={g} />
					))}
				</div>
			</div>
		</section>


		{/* Más info → final de página */}
		<div id="fin-servicios" className="mt-16" />
		</>
	);
}

// Small inner component so we can handle clicks and keep inner Links working
function GroupCard({ group }: { group: (typeof groups)[number] }) {
	const router = useRouter();

	function handleClick() {
		router.push(group.href);
	}

	function handleKey(e: React.KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			router.push(group.href);
		}
	}

	return (
		<div
			role="link"
			tabIndex={0}
			onClick={handleClick}
			onKeyDown={handleKey}
			aria-label={`${group.title} — ver subservicios`}
			className={`${styles.glassCard} group block p-6 transition-transform hover:shadow-2xl transform-gpu hover:-translate-y-2 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-[rgba(0,87,217,0.12)] cursor-pointer`}
		>
			<span className={styles.cardAccent} aria-hidden="true" />
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-4">
					<div className={styles.cardIconWrap} aria-hidden>
						<Image src={group.icon} alt="" width={48} height={48} className={styles.cardIcon} />
					</div>
					<div>
						<h2 className={styles.cardTitle}>{group.title}</h2>
						<p className={styles.cardDesc}>{group.description}</p>
					</div>
				</div>
				<span className={styles.count}>{group.items.length} servicios</span>
			</div>

			<ul className="mt-3 space-y-2 text-sm">
				{group.items.map((it) => (
					<li key={it.title} className="flex items-center gap-3">
						<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="flex-shrink-0">
							<circle cx="4" cy="4" r="4" fill="rgba(0,87,217,0.12)" />
						</svg>
						<Link href={it.href} onClick={(e) => e.stopPropagation()} className={styles.itemLink}>{it.title}</Link>
					</li>
				))}
			</ul>

			<div className="mt-4 flex items-center text-sm">
				<span className={styles.exploreText}>Explorar</span>
				<svg className="ml-auto" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
					<path d="M8 5l8 7-8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</div>
		</div>
	);
}