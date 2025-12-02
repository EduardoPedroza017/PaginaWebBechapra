"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  DollarSign, 
  Users,  
  UserCheck
} from 'lucide-react';
import styles from "./styles.module.css";
import ContactForm from "@/app/components/ContactForm";
import Footer from "@/components/Footer";

const services = [
	{
		icon: <Users />,
		title: "Servicios Especializados",
		desc: "Avalados por la STPS y registrados en el REPSE, garantizando transparencia y cumplimiento legal.",
	},
	{
		icon: <DollarSign />,
		title: "Payrolling",
		desc: "Desde el alta hasta la desvinculación, incluyendo pagos de cuotas patronales, IMSS, Infonavit, e impuestos.",
	},
	{
		icon: <UserCheck />,
		title: "Atracción de Talento",
		desc: "Utilizamos estrategias selectivas y entrevistas exhaustivas para presentarte a los candidatos correctos.",
	}
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Page() {
	const heroRef = useRef<HTMLElement | null>(null);

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
					{/* Back link sits over the hero; will become fixed when scrolling */}
					<Link href="/servicios" id="backLink" className={styles.backLink} aria-label="Volver a Servicios">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
							<path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
						<span>Volver</span>
					</Link>
					<div className={styles.heroContent}>
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
							Potencia el crecimiento y éxito de tu empresa con nuestros servicios de capital humano.
							¡Transforma tu empresa con nuestro enfoque estratégico!
						</motion.p>

						<div style={{ marginTop: '1.75rem' }}>
							<Link href="#contacto" className={styles.heroButton}>
								Contactar a Bechapra
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M13 7l5 5-5 5M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</Link>
						</div>
					</div>

					<div className={styles.heroVisual} aria-hidden="true">
						<div className={styles.heroImageWrap}>
							<Image
								src="/image/servicios/capital-humano.webp"
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
					Servicios Capital Humano
				</motion.h2>					<motion.div 
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
									<Link 
										href={
											service.title === "Atracción de Talento" ? "/servicios/atraccion-de-talento" :
											service.title === "Payrolling" ? "/servicios/payroll" :
											service.title === "Servicios Especializados" ? "/servicios/servicios-especializados" : "#"
										}
										className={styles.exploreButton}
									>
										Ver más
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
					src="/image/servicios/capital-humano.webp"
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
			Beneficios de Capital Humano
		</motion.h2>
        <div className={styles.benefitsCards}>
          <div className={styles.benefitCard}>
            <h3 className={styles.benefitTitle}>Acceso Exclusivo BTC</h3>
            <p className={styles.benefitDesc}>Accede a nuestra agenda de cursos gratuitos, avalados por el Colegio de Contadores Públicos de la Ciudad de México.</p>
          </div>
          <div className={styles.benefitCard}>
            <h3 className={styles.benefitTitle}>Reducción de Costos</h3>
            <p className={styles.benefitDesc}>Optimiza los procesos de reclutamiento, selección y gestión de nómina.</p>
          </div>
          <div className={styles.benefitCard}>
            <h3 className={styles.benefitTitle}>Asesoramiento Personalizado</h3>
            <p className={styles.benefitDesc}>Sesiones de asesoramiento personalizado con expertos en Capital Humano.</p>
          </div>
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
      <h2 className={styles.ctaModernTitle}>Todos los servicios en un solo lugar</h2>
      <p className={styles.ctaModernSubtitle}>Solicita una reunión para más información</p>
      <div className={styles.ctaModernButtons}>
        <a href="#contacto" className={styles.ctaModernPrimaryBtn}>Agenda una cita</a>
        <a href="#" className={styles.ctaModernSecondaryBtn}>Ver casos de éxito</a>
      </div>
    </div>
    <div className={styles.ctaModernImageWrap}>
			<Image
				src="/image/contacto/contacto-men.avif"
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
						Contáctanos
					</motion.h2>
					<ContactForm />
				</div>
			</section>

			{/* FOOTER */}
			<Footer />
		</main>
	);
}