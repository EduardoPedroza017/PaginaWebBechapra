"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import styles from "./ServicesSection.module.css";
import Footer from '@/components/Footer';

const groups = [
	{
		title: "Capital Humano",
		href: "/servicios/capital-humano",
		// Icono azul proporcionado para "Capital Humano"
		icon: "/imagen/icon/Capital Humano_Icon_Color@2x.png",
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
		// Icono azul para "Desarrollo Organizacional"
		icon: "/imagen/icon/Iconos_Redes/Chat_NegativoStroke@2x.png",
		description: "Mejoramos procesos, cultura y capacidades para que la organización sea más ágil y productiva.",
		items: [
			{ title: "Capacitación Empresarial", href: "/servicios/capacitacion-empresarial" },
			{ title: "Consultoría Organizacional", href: "/servicios/consultoria-organizacional" },
			{ title: "NOM 035", href: "/servicios/nom-035" },
		],
	},
	{
		title: "Management Services",
		href: "/servicios/management-services",
		// Icono azul proporcionado para "Management Services"
		icon: "/imagen/icon/Servicios Administrativos_Icon_Color@2x.png",
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
	   <div style={{ background: 'linear-gradient(120deg, #f7fbff 0%, #eaf6ff 100%)', minHeight: '100vh' }}>
		   {/* Encabezado con 3D simple a un lado */}
		   <section className={`${styles.heroSection}`}>
			<div className={`${styles.heroInner} max-w-7xl mx-auto px-6`}>
				<div className={styles.heroContent}>
					<h1 className={styles.heroTitle}>Nuestros Servicios</h1>
					<p className={styles.heroLead}>Descubre soluciones integrales en Capital Humano, Desarrollo Organizacional y Management Services diseñadas para impulsar el crecimiento de tu empresa.</p>
					<Link href="#servicios-grid" className={styles.heroButton}>
						Explorar Servicios
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M13 7l5 5-5 5M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</Link>
				</div>

				<div className={`${styles.heroVisual} relative`} aria-hidden="true">
					<div className={styles.heroImageWrap}>
						<Image 
							src="/imagen/servicos/service.png" 
							alt="Persona trabajando con laptop y documentos" 
							fill
							className={styles.heroImage}
							style={{ objectFit: 'cover' }}
						/>
					</div>
				</div>
			</div>
		</section>

		{/* 3 columnas con subservicios (tarjetas clicables) */}
		   <section
			   id="servicios-grid"
			   className={styles.servicesGrid}
			   style={{
				   background: 'linear-gradient(120deg, #f7fbff 0%, #eaf6ff 100%)',
				   width: '100vw',
				   marginLeft: 'calc(-50vw + 50%)',
				   position: 'relative',
				   overflow: 'hidden',
				   padding: '7.5rem 0',
			   }}
		   >
			   <div className="max-w-7xl mx-auto px-6">
				<div className={styles.gridHeader}>
					<h2 className={styles.gridTitle}>Explora Nuestras Líneas de Servicio</h2>
					<p className={styles.gridSubtitle}>Soluciones especializadas para cada necesidad de tu negocio</p>
				</div>
				<div className={styles.cardsGrid}>
					{groups.map((g, idx) => (
						<GroupCard key={g.title} group={g} index={idx} />
					))}
				</div>
			</div>
		</section>

		   {/* Más info → final de página */}
		   <div id="fin-servicios" className="mt-16" />

		   {/* Footer */}
		   <Footer />
	   </div>
);
}

// Small inner component so we can handle clicks and keep inner Links working
function GroupCard({ group, index }: { group: (typeof groups)[number]; index: number }) {
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
			className={`${styles.serviceCard} ${styles.featuredCard}`}
			style={{ animationDelay: `${index * 0.15}s` }}
		>
			<span className={styles.cardAccent} aria-hidden="true" />
            
			<div className={styles.cardHeader}>
				<div className={styles.cardIconLarge}>
					<Image src={group.icon} alt="" width={64} height={64} className={styles.cardIcon} />
				</div>
				<h2 className={styles.cardTitleLarge}>{group.title}</h2>
				<p className={styles.cardDescLarge}>{group.description}</p>
			</div>

			<div className={styles.cardDivider} />

			<div className={styles.cardBody}>
				<h3 className={styles.serviceListTitle}>Servicios incluidos:</h3>
				<ul className={styles.serviceList}>
					{group.items.map((it) => (
						<li key={it.title} className={styles.serviceItem}>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.checkIcon}>
								<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
							<Link href={it.href} onClick={(e) => e.stopPropagation()} className={styles.itemLinkEnhanced}>
								{it.title}
							</Link>
						</li>
					))}
				</ul>
			</div>

			<div className={styles.cardFooter}>
				<span className={styles.exploreButton}>
					Ver más detalles
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M13 7l5 5-5 5M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</span>
			</div>
		</div>
	);
}
