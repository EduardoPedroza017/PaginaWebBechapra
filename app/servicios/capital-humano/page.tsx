"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../../lib/LanguageContext';
import { translateText } from '../../../lib/translate';
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


const initialServices = [
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
// Beneficios y textos iniciales
const initialBenefits = [
	{
		title: 'Acceso Exclusivo BTC',
		desc: 'Accede a nuestra agenda de cursos gratuitos, avalados por el Colegio de Contadores Públicos de la Ciudad de México.'
	},
	{
		title: 'Reducción de Costos',
		desc: 'Optimiza los procesos de reclutamiento, selección y gestión de nómina.'
	},
	{
		title: 'Asesoramiento Personalizado',
		desc: 'Sesiones de asesoramiento personalizado con expertos en Capital Humano.'
	}
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};


export default function Page() {
	const heroRef = useRef<HTMLElement | null>(null);
	const { lang } = useLanguage();

	// Estados para textos traducidos
	const [heroTitle, setHeroTitle] = useState('Capital Humano');
	const [heroLead, setHeroLead] = useState('Potencia el crecimiento y éxito de tu empresa con nuestros servicios de capital humano. ¡Transforma tu empresa con nuestro enfoque estratégico!');
	const [heroBtn, setHeroBtn] = useState('Contactar a Bechapra');
	const [backText, setBackText] = useState('Volver');
	const [servicesTitle, setServicesTitle] = useState('Servicios Capital Humano');
	const [services, setServices] = useState(initialServices);
	const [verMas, setVerMas] = useState('Ver más');
	const [benefitsTitle, setBenefitsTitle] = useState('Beneficios de Capital Humano');
	const [benefits, setBenefits] = useState(initialBenefits);
	const [ctaTitle, setCtaTitle] = useState('Todos los servicios en un solo lugar');
	const [ctaSubtitle, setCtaSubtitle] = useState('Solicita una reunión para más información');
	const [ctaBtn, setCtaBtn] = useState('Agenda una cita');
	const [ctaBtn2, setCtaBtn2] = useState('Ver casos de éxito');
	const [contactTitle, setContactTitle] = useState('Contáctanos');

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

	useEffect(() => {
		async function fetchTranslations() {
			if (lang === 'es') {
				setHeroTitle('Capital Humano');
				setHeroLead('Potencia el crecimiento y éxito de tu empresa con nuestros servicios de capital humano. ¡Transforma tu empresa con nuestro enfoque estratégico!');
				setHeroBtn('Contactar a Bechapra');
				setBackText('Volver');
				setServicesTitle('Servicios Capital Humano');
				setServices(initialServices);
				setVerMas('Ver más');
				setBenefitsTitle('Beneficios de Capital Humano');
				setBenefits(initialBenefits);
				setCtaTitle('Todos los servicios en un solo lugar');
				setCtaSubtitle('Solicita una reunión para más información');
				setCtaBtn('Agenda una cita');
				setCtaBtn2('Ver casos de éxito');
				setContactTitle('Contáctanos');
			} else {
				setHeroTitle(await translateText('Capital Humano', lang));
				setHeroLead(await translateText('Potencia el crecimiento y éxito de tu empresa con nuestros servicios de capital humano. ¡Transforma tu empresa con nuestro enfoque estratégico!', lang));
				setHeroBtn(await translateText('Contactar a Bechapra', lang));
				setBackText(await translateText('Volver', lang));
				setServicesTitle(await translateText('Servicios Capital Humano', lang));
				setServices(await Promise.all(initialServices.map(async s => ({
					...s,
					title: await translateText(s.title, lang),
					desc: await translateText(s.desc, lang)
				}))));
				setVerMas(await translateText('Ver más', lang));
				setBenefitsTitle(await translateText('Beneficios de Capital Humano', lang));
				setBenefits(await Promise.all(initialBenefits.map(async b => ({
					...b,
					title: await translateText(b.title, lang),
					desc: await translateText(b.desc, lang)
				}))));
				setCtaTitle(await translateText('Todos los servicios en un solo lugar', lang));
				setCtaSubtitle(await translateText('Solicita una reunión para más información', lang));
				setCtaBtn(await translateText('Agenda una cita', lang));
				setCtaBtn2(await translateText('Ver casos de éxito', lang));
				setContactTitle(await translateText('Contáctanos', lang));
			}
		}
		fetchTranslations();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lang]);

	return (
		<main className={styles.main}>
			{/* HERO SECTION */}
			<section className={styles.hero} ref={heroRef}>
				<div className={styles.heroInner}>
					<Link href="/servicios" id="backLink" className={styles.backLink} aria-label={backText}>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
							<path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
						<span>{backText}</span>
					</Link>
					<div className={styles.heroContent}>
						<motion.h1 
							className={styles.title}
							initial={{ opacity: 0, y: -30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7, delay: 0.1 }}
						>
							{heroTitle}
						</motion.h1>
						<motion.p 
							className={styles.lead}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7, delay: 0.2 }}
						>
							{heroLead}
						</motion.p>
						<div style={{ marginTop: '1.75rem' }}>
							<Link href="#contacto" className={styles.heroButton}>
								{heroBtn}
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
						{servicesTitle}
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
									<Link 
										href={
											service.title === (lang === 'es' ? "Atracción de Talento" : services[2]?.title) ? "/servicios/atraccion-de-talento" :
											service.title === (lang === 'es' ? "Payrolling" : services[1]?.title) ? "/servicios/payroll" :
											service.title === (lang === 'es' ? "Servicios Especializados" : services[0]?.title) ? "/servicios/servicios-especializados" : "#"
										}
										className={styles.exploreButton}
									>
										{verMas}
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
								{benefitsTitle}
							</motion.h2>
							<div className={styles.benefitsCards}>
								{benefits.map((b, i) => (
									<div className={styles.benefitCard} key={i}>
										<h3 className={styles.benefitTitle}>{b.title}</h3>
										<p className={styles.benefitDesc}>{b.desc}</p>
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
						<h2 className={styles.ctaModernTitle}>{ctaTitle}</h2>
						<p className={styles.ctaModernSubtitle}>{ctaSubtitle}</p>
						<div className={styles.ctaModernButtons}>
							<a href="#contacto" className={styles.ctaModernPrimaryBtn}>{ctaBtn}</a>
							<a href="#" className={styles.ctaModernSecondaryBtn}>{ctaBtn2}</a>
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
						{contactTitle}
					</motion.h2>
					<ContactForm />
				</div>
			</section>
			{/* FOOTER */}
			<Footer />
		</main>
	);
}