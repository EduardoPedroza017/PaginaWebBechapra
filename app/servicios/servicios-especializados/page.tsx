"use client";

import React from "react";
import Image from "next/image";
import { Briefcase, Building2, Users, ShieldCheck, Globe2, Wrench, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./styles.module.css";

const servicios = [
	{
		icon: <Briefcase className={styles.specialCardIcon} />, 
		title: "Administración de personal externo",
		desc: "Gestión integral de talento para proyectos, outsourcing y servicios temporales."
	},
	{
		icon: <Building2 className={styles.specialCardIcon} />,
		title: "Servicios por industria",
		desc: "Soluciones especializadas para manufactura, retail, logística, salud, TI y más."
	},
	{
		icon: <Users className={styles.specialCardIcon} />,
		title: "Reclutamiento especializado",
		desc: "Búsqueda y selección de perfiles técnicos, ejecutivos y operativos a la medida."
	},
	{
		icon: <ShieldCheck className={styles.specialCardIcon} />,
		title: "Cumplimiento normativo",
		desc: "Aseguramos procesos alineados a la ley y regulaciones de cada sector."
	},
	{
		icon: <Globe2 className={styles.specialCardIcon} />,
		title: "Servicios internacionales",
		desc: "Gestión de personal y nómina para empresas globales o con operaciones en México."
	},
	{
		icon: <Wrench className={styles.specialCardIcon} />,
		title: "Soluciones a la medida",
		desc: "Diseño de esquemas y servicios según el giro, tamaño y retos de tu empresa."
	},
	{
		icon: <BarChart3 className={styles.specialCardIcon} />,
		title: "Consultoría y optimización",
		desc: "Diagnóstico, mejora de procesos y asesoría en recursos humanos y nómina."
	},
];

export default function ServiciosEspecializadosPage() {
	return (
		<div className={styles.specialPageContainer}>
			{/* HERO */}
			<section className={styles.specialHeroSection}>
				<div className={styles.specialHeroGrid}>
								<div className={styles.specialHeroTextCol}>
									<motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} transition={{duration:0.5}} style={{marginBottom:'1.2rem'}}>
										<span style={{display:'inline-block', background:'rgba(0,87,217,0.10)', color:'var(--brand-primary)', fontWeight:700, borderRadius:'9999px', padding:'0.5rem 1.2rem', fontSize:'1rem', letterSpacing:'0.5px'}}>Soluciones a la medida</span>
									</motion.div>
									<motion.h1 className={styles.specialHeroTitle} initial={{opacity:0, y:-30}} animate={{opacity:1, y:0}} transition={{duration:0.7}}>
										Servicios Especializados
									</motion.h1>
									<motion.p className={styles.specialHeroDesc} initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.2, duration:0.7}}>
										<span style={{fontWeight:600, color:'var(--brand-secondary)'}}>Expertos en soluciones flexibles</span> para cada industria, tamaño de empresa y reto de negocio.<br />
										En <b>Bechapra</b> diseñamos, implementamos y operamos servicios especializados que impulsan la eficiencia, el cumplimiento y el crecimiento de tu organización.
									</motion.p>
								</div>
					<motion.div className={styles.specialHeroImgCol} initial={{opacity:0, x:40}} animate={{opacity:1, x:0}} transition={{delay:0.3, duration:0.7}}>
						<div className={styles.specialHeroImgCard}>
							<Image
								src="/imagen/talento/atracciontalento.jpg"
								alt="Servicios Especializados Bechapra"
								className={styles.specialHeroImg}
								width={420}
								height={220}
								loading="lazy"
							/>
						</div>
					</motion.div>
				</div>
			</section>

			{/* SERVICIOS */}
			<section className={styles.specialSection}>
				<motion.h2 className={styles.specialSectionTitle} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6}}>
					¿Qué servicios especializados ofrece Bechapra?
				</motion.h2>
				<motion.p className={styles.specialSectionDesc} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:0.1, duration:0.6}}>
					Adaptamos nuestros servicios a las necesidades de tu sector y operación. Descubre cómo podemos ayudarte:
				</motion.p>
				<motion.div className={styles.specialCardsRow} initial="hidden" whileInView="visible" viewport={{once:true}} variants={{hidden:{},visible:{transition:{staggerChildren:0.12}}}}>
					{servicios.map((s, i) => (
						<motion.div
							className={styles.specialCard}
							key={i}
							initial={{opacity:0, y:30}}
							whileInView={{opacity:1, y:0}}
							viewport={{once:true}}
							transition={{duration:0.5, delay:i*0.08}}
						>
							{s.icon}
							<div className={styles.specialCardTitle}>{s.title}</div>
							<div className={styles.specialCardDesc}>{s.desc}</div>
						</motion.div>
					))}
				</motion.div>
					</section>

					{/* BENEFICIOS DIFERENCIADORES */}
					<section className={styles.specialSection}>
						<motion.h2 className={styles.specialSectionTitle} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6}}>
							¿Por qué elegir Bechapra?
						</motion.h2>
						<motion.div className={styles.specialCardsRow} initial="hidden" whileInView="visible" viewport={{once:true}} variants={{hidden:{},visible:{transition:{staggerChildren:0.12}}}}>
							<motion.div className={styles.specialCard} initial={{opacity:0, y:30}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.5}}>
								<ShieldCheck className={styles.specialCardIcon} />
								<div className={styles.specialCardTitle}>Experiencia comprobada</div>
								<div className={styles.specialCardDesc}>Más de 20 años brindando soluciones especializadas a empresas líderes de México y el extranjero.</div>
							</motion.div>
							<motion.div className={styles.specialCard} initial={{opacity:0, y:30}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.5, delay:0.1}}>
								<BarChart3 className={styles.specialCardIcon} />
								<div className={styles.specialCardTitle}>Resultados medibles</div>
								<div className={styles.specialCardDesc}>Procesos optimizados, reducción de costos y cumplimiento total en cada proyecto.</div>
							</motion.div>
							<motion.div className={styles.specialCard} initial={{opacity:0, y:30}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.5, delay:0.2}}>
								<Users className={styles.specialCardIcon} />
								<div className={styles.specialCardTitle}>Atención personalizada</div>
								<div className={styles.specialCardDesc}>Equipo dedicado y soporte 24/7 para cada cliente y cada industria.</div>
							</motion.div>
						</motion.div>
					</section>

					{/* CTA FINAL */}
					<section className={styles.specialSection}>
						<motion.div initial={{opacity:0, scale:0.95}} whileInView={{opacity:1, scale:1}} viewport={{once:true}} transition={{duration:0.7}} style={{textAlign:'center', background:'linear-gradient(90deg, #F0F4FC 60%, #E0E9F8 100%)', borderRadius:'1.5rem', padding:'2.5rem 1.5rem', boxShadow:'0 4px 24px 0 rgba(0,87,217,0.08)', maxWidth:700, margin:'0 auto'}}>
							<h3 style={{fontSize:'2rem', fontWeight:800, color:'var(--brand-primary)', marginBottom:'1rem'}}>¿Listo para transformar tu operación?</h3>
							<p style={{fontSize:'1.15rem', color:'var(--special-dark)', marginBottom:'2rem'}}>Contáctanos y recibe una consultoría gratuita para diseñar la solución especializada que tu empresa necesita.</p>
							<a href="/contacto" className="btn btn-primary" style={{fontSize:'1.1rem', padding:'1rem 2.5rem'}}>Solicitar consultoría</a>
						</motion.div>
					</section>
				</div>
			);
		}