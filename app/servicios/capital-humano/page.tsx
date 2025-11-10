'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  DollarSign, 
  Users, 
  ShieldCheck, 
  BarChart3, 
  GraduationCap, 
  UserCheck,
  Lock,
  Zap,
  HeadphonesIcon
} from 'lucide-react';
import styles from "./styles.module.css";
import ContactForm from "@/app/components/ContactForm";

const services = [
	{
		icon: <DollarSign />,
		title: "Payroll & Compensación",
		desc: "Gestión integral de nómina, cumplimiento fiscal y reporting para el sector financiero.",
	},
	{
		icon: <Users />,
		title: "Atracción y Retención",
		desc: "Estrategias de selección, employer branding y planes de retención de talento crítico.",
	},
	{
		icon: <ShieldCheck />,
		title: "Cumplimiento y NOM",
		desc: "Políticas internas, compliance laboral y alineamiento a normativas sectoriales.",
	},
	{
		icon: <BarChart3 />,
		title: "Evaluación de desempeño",
		desc: "Diseño de KPIs, medición por competencias y programas de desarrollo para mandos.",
	},
	{
		icon: <GraduationCap />,
		title: "Capacitación financiera",
		desc: "Programas especializados para equipos financieros y de control interno.",
	},
	{
		icon: <UserCheck />,
		title: "Outsourcing parcial",
		desc: "Soporte experto en picos de trabajo y proyectos temporales con gobernanza clara.",
	}
];

const features = [
	{
		icon: <Lock />,
		title: "Seguridad y confidencialidad",
		desc: "Procesos alineados a mejores prácticas de seguridad para manejo de información salarial y personal."
	},
	{
		icon: <Zap />,
		title: "Integración con sistemas",
		desc: "Conectamos con ERPs y payroll providers para reducir trabajo manual y errores."
	},
	{
		icon: <HeadphonesIcon />,
		title: "Soporte 24/7*",
		desc: "Planes de soporte para ventanas críticas y cierres contables (SLAs adaptables)."
	}
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Page() {
	return (
		<main className={styles.main}>
			<Link href="/servicios" className={styles.backLink}>
				← Volver a Servicios
			</Link>

			{/* HERO SECTION */}
			<section className={styles.hero}>
				<div className={styles.heroParticles} aria-hidden="true">
					<span className={styles.particle1}></span>
					<span className={styles.particle2}></span>
					<span className={styles.particle3}></span>
				</div>
				
				<div className={styles.heroContent}>
					<motion.div 
						className={styles.kicker}
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						Servicios
					</motion.div>
					
					<motion.h1 
						className={styles.title}
						initial={{ opacity: 0, y: -30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 0.1 }}
					>
						Capital Humano
					</motion.h1>
					
					<motion.p 
						className={styles.lead}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 0.2 }}
					>
						Soluciones modernas y seguras para el sector financiero: optimizamos procesos de talento,
						nómina y cumplimiento para que tu organización mantenga foco en el crecimiento.
					</motion.p>
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
						Nuestras soluciones
					</motion.h2>

					<motion.div 
						className={styles.servicesGrid}
						variants={containerVariants}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true }}
					>
						{services.map((service, index) => (
							<motion.article 
								key={index} 
								className={styles.serviceCard}
								variants={cardVariants}
							>
								<div className={styles.serviceIcon}>
									{service.icon}
								</div>
								<h3 className={styles.serviceTitle}>{service.title}</h3>
								<p className={styles.serviceDesc}>{service.desc}</p>
							</motion.article>
						))}
					</motion.div>
				</div>
			</section>

			{/* FEATURES SECTION */}
			<section className={styles.featuresSection}>
				<div className={styles.container}>
					<motion.div 
						className={styles.featuresGrid}
						variants={containerVariants}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true }}
					>
						{features.map((feature, index) => (
							<motion.div 
								key={index} 
								className={styles.featureCard}
								variants={cardVariants}
							>
								<div className={styles.featureIcon}>
									{feature.icon}
								</div>
								<h4 className={styles.featureTitle}>{feature.title}</h4>
								<p className={styles.featureDesc}>{feature.desc}</p>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>

			{/* CTA SECTION */}
			<motion.section 
				className={styles.ctaSection}
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.8 }}
			>
				<div className={styles.container}>
					<div className={styles.ctaContent}>
						<h3 className={styles.ctaTitle}>¿Listo para optimizar tu Capital Humano?</h3>
						<p className={styles.ctaText}>Agenda una consulta y descubre cómo podemos ayudarte</p>
						<div className={styles.ctaButtons}>
							<a href="#contacto" className={styles.primaryBtn}>Contactar a Bechapra</a>
							<a href="#" className={styles.ghostBtn}>Ver casos de éxito</a>
						</div>
					</div>
				</div>
			</motion.section>

			{/* CONTACT SECTION */}
			<section id="contacto" className={styles.contactSection}>
				<div className={styles.container}>
					<ContactForm />
				</div>
			</section>
		</main>
	);
}