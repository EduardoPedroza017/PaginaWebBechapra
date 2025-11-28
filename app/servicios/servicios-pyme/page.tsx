
"use client";

import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import Link from "next/link";
import { Briefcase, Layers, Users, DollarSign, ChevronLeft } from 'lucide-react';
import ContactForm from '@/app/components/ContactForm';
import Footer from '@/components/Footer';
import { useLanguage } from "../../../lib/LanguageContext";
import { translateText } from "../../../lib/translate";

type Service = {
	icon: React.ElementType;
	title: string;
	desc: string;
};

const baseServices: Service[] = [
	{icon: Briefcase, title: 'Constitución y contratos', desc: 'Acompañamiento para constituir tu empresa y contratos comerciales básicos.'},
	{icon: Layers, title: 'Contabilidad simplificada', desc: 'Procesos simples y reportes claros pensados para PYMEs.'},
	{icon: Users, title: 'Recursos humanos', desc: 'Contratos, políticas y gestión de personal en formatos accesibles.'},
	{icon: DollarSign, title: 'Optimización de costos', desc: 'Revisión de gastos y recomendaciones para mejorar flujo de efectivo.'},
];

const baseUseCases = [
	{title: 'Venta en línea', desc: 'Optimización de procesos contables y facturación para tiendas online que crecen.'},
	{title: 'Servicios profesionales', desc: 'Paquetes con contratos, políticas y gestión de clientes recurrentes.'},
	{title: 'Restaurantes y retail', desc: 'Control de inventarios, costos y recomendaciones para mejorar margen.'},
	{title: 'Escalamiento', desc: 'Procesos para preparar la empresa para inversión o crecimiento estructurado.'}
];

const basePackages = [
	{name: 'Starter', price: 'MXN 2,500 / mes', items: ['Registro básico', 'Reporte mensual', 'Consultas por email']},
	{name: 'Growth', price: 'MXN 6,000 / mes', items: ['Todo Starter', 'Reportes KPI', 'Soporte telefónico']},
	{name: 'Scale', price: 'MXN 12,000 / mes', items: ['Todo Growth', 'Cierre anual', 'Consultoría estratégica']}
];

const baseFaqs = [
	{q: '¿Puedo cambiar de paquete después?', a: 'Sí, puedes escalar o bajar de paquete con 30 días de aviso y ajustamos la facturación.'},
	{q: '¿Ofrecen facturación y nómina?', a: 'Sí, ofrecemos soluciones de facturación y coordinación con proveedores de nómina según la necesidad.'},
	{q: '¿Cuál es el tiempo de implementación?', a: 'Generalmente entre 1-2 semanas para tener el sistema operando con documentación básica y capacitación inicial.'}
];

// FAQItem must be defined at the top-level, not inside another function
function FAQItem({question, answer, index}: {question: string; answer: string; index: number}) {
	const [open, setOpen] = React.useState(false);
	return (
		<motion.div
			initial={{opacity: 0, y: 20}}
			whileInView={{opacity: 1, y: 0}}
			viewport={{once: true}}
			transition={{duration: 0.5, delay: index * 0.1}}
			style={{
				borderBottom: '1px solid rgba(0,61,143,0.15)',
				paddingBottom: '1.5rem',
				marginBottom: '1.5rem'
			}}
		>
			<button
				onClick={() => setOpen(!open)}
				style={{
					width: '100%',
					padding: '1.25rem 0',
					background: 'none',
					border: 'none',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					cursor: 'pointer',
					fontSize: '1.05rem',
					fontWeight: 700,
					color: '#003d8f',
					transition: 'all 0.3s ease'
				}}
			>
				{question}
				<motion.span
					animate={{rotate: open ? 180 : 0}}
					transition={{duration: 0.3}}
					style={{fontSize: '1.3rem'}}
				>
					▼
				</motion.span>
			</button>
			{open && (
				<motion.div
					initial={{opacity: 0, height: 0}}
					animate={{opacity: 1, height: 'auto'}}
					exit={{opacity: 0, height: 0}}
					transition={{duration: 0.3}}
					style={{color: '#666'}}
				>
					<p style={{
						fontSize: '0.95rem',
						lineHeight: 1.6,
						margin: 0,
						color: '#555'
					}}>
						{answer}
					</p>
				</motion.div>
			)}
		</motion.div>
	);
}

const baseTexts = {
	volver: 'Volver',
	heroTitle: 'Servicios',
	heroHighlight: 'PYME',
	heroDesc: 'Paquetes pensados para empresas pequeñas: menos complejidad, más foco en crecimiento y escalabilidad.',
	heroCta: 'Quiero una propuesta →',
	queIncluimos: 'Qué incluimos',
	casosDeUso: 'Casos de uso',
	paquetes: 'Paquetes',
	elegirPaquete: 'Elegir paquete',
	faq: 'Preguntas frecuentes',
	ctaFinalTitle: '¿Listo para arrancar?',
	ctaFinalDesc: 'Solicita una propuesta adaptada a tu operación y tamaño de empresa.',
	ctaFinalContactar: 'Contactar',
	ctaFinalVerPaquetes: 'Ver paquetes',
	contactoTitle: '¿Listo para profesionalizar tu PYME?',
	contactoDesc: 'Contáctanos y recibe una consultoría gratuita para diseñar la solución ideal para tu empresa.'
};

type TranslatedTexts = typeof baseTexts;


function Page() {
	const langCtx = useLanguage();
	// Use only lang property (avoid .language which may not exist)
	const language = langCtx?.lang || 'es';
	const [services, setServices] = useState<Service[]>(baseServices);
	const [useCases, setUseCases] = useState(baseUseCases);
	const [packages, setPackages] = useState(basePackages);
	const [faqs, setFaqs] = useState(baseFaqs);
	const [texts, setTexts] = useState<TranslatedTexts>(baseTexts);

	useEffect(() => {
		if (language === 'es') {
			setServices(baseServices);
			setUseCases(baseUseCases);
			setPackages(basePackages);
			setFaqs(baseFaqs);
			setTexts(baseTexts);
			return;
		}
		(async () => {
			const [servs, uses, pkgs, fqs, txts] = await Promise.all([
				Promise.all(baseServices.map(async s => ({
					...s,
					title: await translateText(s.title, language),
					desc: await translateText(s.desc, language)
				}))),
				Promise.all(baseUseCases.map(async u => ({
					...u,
					title: await translateText(u.title, language),
					desc: await translateText(u.desc, language)
				}))),
				Promise.all(basePackages.map(async p => ({
					...p,
					name: await translateText(p.name, language),
					price: await translateText(p.price, language),
					items: await Promise.all(p.items.map(item => translateText(item, language)))
				}))),
				Promise.all(baseFaqs.map(async f => ({
					q: await translateText(f.q, language),
					a: await translateText(f.a, language)
				}))),
				(async () => {
					const entries = await Promise.all(
						Object.entries(baseTexts).map(async ([k, v]) => [k, await translateText(v, language)])
					);
					return Object.fromEntries(entries) as TranslatedTexts;
				})()
			]);
			setServices(servs);
			setUseCases(uses);
			setPackages(pkgs);
			setFaqs(fqs);
			setTexts(txts);
		})();
	}, [language]);

	       return (
		       <main>
			       {/* Hero Section */}
			<section style={{
				width: '100vw',
				marginLeft: 'calc(-50vw + 50%)',
				padding: '5rem 1.5rem 6rem',
				background: 'linear-gradient(90deg, #003d8f 0%, #004AB7 35%, #004AB7 65%, #0056d4 100%)',
				position: 'relative',
				overflow: 'hidden'
			}}>
				{/* Decorative circles */}
				<motion.div
					animate={{scale: [1, 1.2, 1]}}
					transition={{duration: 5, repeat: Infinity}}
					style={{
						position: 'absolute',
						width: '500px',
						height: '500px',
						background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
						borderRadius: '50%',
						top: '-200px',
						right: '-200px',
						pointerEvents: 'none'
					}}
				/>
				<motion.div
					animate={{scale: [1, 1.1, 1]}}
					transition={{duration: 6, repeat: Infinity, delay: 0.5}}
					style={{
						position: 'absolute',
						width: '400px',
						height: '400px',
						background: 'radial-gradient(circle, rgba(0,172,183,0.1) 0%, transparent 70%)',
						borderRadius: '50%',
						bottom: '-150px',
						left: '-150px',
						pointerEvents: 'none'
					}}
				/>

				<div style={{
					maxWidth: '1280px',
					margin: '0 auto',
					position: 'relative',
					zIndex: 2
				}}>
					<Link href="/servicios" style={{
						display: 'inline-flex',
						alignItems: 'center',
						gap: '0.5rem',
						padding: '0.65rem 1.25rem',
						background: 'white',
						color: '#003d8f',
						borderRadius: '50px',
						fontSize: '0.95rem',
						fontWeight: 600,
						textDecoration: 'none',
						marginBottom: '2rem',
						transition: 'all 0.3s ease',
						boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
					}}>
						<ChevronLeft size={18} /> {texts.volver}
					</Link>

					<div style={{
						display: 'grid',
						gridTemplateColumns: '1.2fr 1fr',
						gap: '3rem',
						alignItems: 'center'
					}}>
						<motion.div
							initial={{opacity: 0, y: 30}}
							animate={{opacity: 1, y: 0}}
							transition={{duration: 0.6}}
						>
							<h1 style={{
								fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
								fontWeight: 900,
								color: 'white',
								marginBottom: '1rem',
								letterSpacing: '-0.02em',
								lineHeight: 1.2
							}}>
								{texts.heroTitle} <span style={{background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>{texts.heroHighlight}</span>
							</h1>
							<p style={{
								fontSize: '1.1rem',
								color: 'rgba(255,255,255,0.9)',
								lineHeight: 1.7,
								marginBottom: '2.5rem'
							}}>
								{texts.heroDesc}
							</p>
							<motion.div
								whileHover={{scale: 1.05}}
								whileTap={{scale: 0.95}}
							>
								<Link href="/#contacto" style={{
									display: 'inline-flex',
									alignItems: 'center',
									gap: '0.5rem',
									padding: '1rem 2rem',
									background: 'white',
									color: '#003d8f',
									borderRadius: '12px',
									fontWeight: 700,
									fontSize: '1rem',
									textDecoration: 'none',
									transition: 'all 0.3s ease',
									boxShadow: '0 12px 30px rgba(0,0,0,0.15)'
								}}>
									{texts.heroCta}
								</Link>
							</motion.div>
						</motion.div>

						<motion.div
							initial={{opacity: 0, y: 40}}
							animate={{opacity: 1, y: 0}}
							transition={{duration: 0.7, delay: 0.2}}
							style={{
								height: '380px',
								background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
								borderRadius: '20px',
								backdropFilter: 'blur(10px)',
								border: '1px solid rgba(255,255,255,0.2)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								fontSize: '5rem',
								color: 'rgba(255,255,255,0.3)'
							}}
						>
							💼
						</motion.div>
					</div>
				</div>
			</section>

			{/* Qué incluimos Section (fondo blanco, full width) */}
			<section style={{
				width: '100vw',
				marginLeft: 'calc(-50vw + 50%)',
				background: 'white',
				padding: '5rem 0',
				display: 'flex',
				justifyContent: 'center',
			}}>
				<div style={{
					width: '100%',
					maxWidth: '1280px',
					padding: '0 1.5rem',
				}}>
				<motion.h2
					initial={{opacity: 0, y: 20}}
					whileInView={{opacity: 1, y: 0}}
					viewport={{once: true}}
					transition={{duration: 0.6}}
					style={{
						fontSize: 'clamp(2rem, 4vw, 2.5rem)',
						fontWeight: 900,
						color: '#003d8f',
						marginBottom: '4rem',
						letterSpacing: '-0.02em',
						textAlign: 'center'
					}}
				>
				{texts.queIncluimos}
				</motion.h2>

				<motion.div
					initial={{opacity: 0, y: 40}}
					whileInView={{opacity: 1, y: 0}}
					viewport={{once: true}}
					transition={{duration: 0.6}}
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
						gap: '2.5rem',
						marginBottom: '5rem'
					}}
				>
								{services.map((service, i) => {
									const Icon = service.icon;
									return (
										<motion.div
											key={i}
											initial={{opacity: 0, y: 30}}
											whileInView={{opacity: 1, y: 0}}
											viewport={{once: true}}
											transition={{duration: 0.5, delay: i * 0.1}}
											whileHover={{scale: 1.05, y: -12}}
											style={{
												padding: '2.5rem 2rem',
												borderRadius: '16px',
												background: i % 2 === 0
													? 'linear-gradient(135deg, #E8F4FF 0%, #D0E8FF 100%)'
													: 'linear-gradient(135deg, #F0F9FF 0%, #E8F5FF 100%)',
												border: '2px solid rgba(0,61,143,0.12)',
												transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
												boxShadow: '0 12px 35px rgba(0,61,143,0.08), inset 0 1px 0 rgba(255,255,255,0.6)',
												position: 'relative',
												overflow: 'hidden',
												cursor: 'pointer'
											}}
										>
											{/* Borde superior decorativo */}
											<motion.div
												animate={{opacity: [0.6, 1, 0.6]}}
												transition={{duration: 3, repeat: Infinity, delay: i * 0.3}}
												style={{
													position: 'absolute',
													top: 0,
													left: 0,
													right: 0,
													height: '4px',
													background: `linear-gradient(90deg, #003d8f 0%, #004AB7 50%, #0056d4 100%)`
												}}
											/>
											{/* Icono */}
											<div style={{
												width: '65px',
												height: '65px',
												background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FDFF 100%)',
												borderRadius: '14px',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												marginBottom: '1.5rem',
												border: '1.5px solid rgba(0,61,143,0.15)',
												color: '#003d8f',
												fontSize: '2rem',
												position: 'relative',
												zIndex: 2
											}}>
												{React.createElement(Icon as any, { size: 32 })}
											</div>
											<div style={{position: 'relative', zIndex: 2} as React.CSSProperties}>
																								<h3 style={{
																									fontSize: '1.25rem',
																									fontWeight: 800,
																									color: '#003d8f',
																									marginBottom: '0.75rem'
																								} as React.CSSProperties}>
																									{service.title}
																								</h3>
												<p style={{
													fontSize: '0.95rem',
													color: '#666',
													lineHeight: 1.6,
													margin: 0
												}}>
													{service.desc}
												</p>
											</div>
											{/* Efecto brillo */}
											<motion.div
												whileHover={{opacity: 1}}
												initial={{opacity: 0}}
												style={{
													position: 'absolute',
													inset: 0,
													background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5) 0%, transparent 70%)',
													borderRadius: '16px',
													pointerEvents: 'none'
												}}
											/>
										</motion.div>
									);
								})}
				</motion.div>
				</div>
			</section>

			{/* Casos de uso Section (fondo azul claro, full width) */}
			<section style={{
				width: '100vw',
				marginLeft: 'calc(-50vw + 50%)',
				background: 'linear-gradient(180deg, #E8F4FF 0%, #D0E8FF 100%)',
				padding: '5rem 0',
				display: 'flex',
				justifyContent: 'center',
			}}>
				<div style={{
					width: '100%',
					maxWidth: '1280px',
					padding: '0 1.5rem',
				}}>
				<motion.h2
					initial={{opacity: 0, y: 20}}
					whileInView={{opacity: 1, y: 0}}
					viewport={{once: true}}
					transition={{duration: 0.6}}
					style={{
						fontSize: 'clamp(2rem, 4vw, 2.5rem)',
						fontWeight: 900,
						color: '#003d8f',
						marginBottom: '4rem',
						letterSpacing: '-0.02em',
						textAlign: 'center'
					}}
				>
				{texts.casosDeUso}
				</motion.h2>

				<motion.div
					initial={{opacity: 0, y: 40}}
					whileInView={{opacity: 1, y: 0}}
					viewport={{once: true}}
					transition={{duration: 0.6}}
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
						gap: '2.5rem'
					}}
				>
				{useCases.map((useCase, i) => (
				  <motion.div
				    key={i}
				    initial={{opacity: 0, y: 30}}
				    whileInView={{opacity: 1, y: 0}}
				    viewport={{once: true}}
				    transition={{duration: 0.5, delay: i * 0.1}}
				    whileHover={{scale: 1.05, y: -8}}
				    style={{
				      padding: '2rem',
				      borderRadius: '14px',
				      background: 'linear-gradient(135deg, #F0F9FF 0%, #E8F5FF 100%)',
				      border: '2px solid rgba(0,61,143,0.1)',
				      transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
				      cursor: 'pointer'
				    }}
				  >
				    <h3 style={{
				      fontSize: '1.15rem',
				      fontWeight: 800,
				      color: '#003d8f',
				      marginBottom: '0.75rem'
				    }}>
				      {useCase.title}
				    </h3>
				    <p style={{
				      fontSize: '0.95rem',
				      color: '#666',
				      lineHeight: 1.6,
				      margin: 0
				    }}>
				      {useCase.desc}
				    </p>
				  </motion.div>
				))}
				</motion.div>
				</div>
			</section>

			{/* Paquetes Section (fondo blanco, full width) */}
			<section style={{
				width: '100vw',
				marginLeft: 'calc(-50vw + 50%)',
				background: 'white',
				padding: '5rem 0',
				display: 'flex',
				justifyContent: 'center',
			}}>
				<div style={{
					width: '100%',
					maxWidth: '1280px',
					padding: '0 1.5rem',
				}}>
				<motion.h2
					initial={{opacity: 0, y: 20}}
					whileInView={{opacity: 1, y: 0}}
					viewport={{once: true}}
					transition={{duration: 0.6}}
					style={{
						fontSize: 'clamp(2rem, 4vw, 2.5rem)',
						fontWeight: 900,
						color: '#003d8f',
						marginBottom: '4rem',
						letterSpacing: '-0.02em',
						textAlign: 'center'
					}}
				>
				{texts.paquetes}
				</motion.h2>

				<motion.div
					initial={{opacity: 0, y: 40}}
					whileInView={{opacity: 1, y: 0}}
					viewport={{once: true}}
					transition={{duration: 0.6}}
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
						gap: '2.5rem'
					}}
				>
				{packages.map((pkg, i) => (
				  <motion.div
				    key={i}
				    initial={{opacity: 0, y: 30}}
				    whileInView={{opacity: 1, y: 0}}
				    viewport={{once: true}}
				    transition={{duration: 0.5, delay: i * 0.1}}
				    style={{
				      padding: '2.5rem 2rem',
				      borderRadius: '16px',
				      background: i === 1
					? 'linear-gradient(135deg, #003d8f 0%, #004AB7 100%)'
					: 'linear-gradient(135deg, #F0F9FF 0%, #E8F5FF 100%)',
				      border: i === 1 ? 'none' : '2px solid rgba(0,61,143,0.12)',
				      transition: 'all 0.3s ease',
				      boxShadow: i === 1 ? '0 12px 35px rgba(0,61,143,0.2)' : 'none'
				    }}
				  >
				    <h3 style={{
				      fontSize: '1.1rem',
				      fontWeight: 800,
				      color: i === 1 ? 'white' : '#003d8f',
				      marginBottom: '0.5rem'
				    }}>
				      {pkg.name}
				    </h3>
				    <div style={{
				      fontSize: '1.4rem',
				      fontWeight: 900,
				      color: i === 1 ? '#FFD700' : '#0056d4',
				      marginBottom: '1.5rem'
				    }}>
				      {pkg.price}
				    </div>
				    <ul style={{
				      listStyle: 'none',
				      padding: 0,
				      margin: '1.5rem 0',
				      display: 'flex',
				      flexDirection: 'column',
				      gap: '0.75rem'
				    }}>
				      {pkg.items.map((item: string, j: number) => (
					<li key={j} style={{
					  fontSize: '0.95rem',
					  color: i === 1 ? 'rgba(255,255,255,0.9)' : '#666',
					  display: 'flex',
					  alignItems: 'center',
					  gap: '0.5rem'
					}}>
					  <span style={{
					    display: 'inline-block',
					    width: '6px',
					    height: '6px',
					    borderRadius: '50%',
					    background: i === 1 ? '#FFD700' : '#003d8f',
					    flexShrink: 0
					  }} />
					  {item}
					</li>
				      ))}
				    </ul>
				    <motion.div
				      whileHover={{scale: 1.05}}
				      whileTap={{scale: 0.95}}
				    >
				      <Link href="/#contacto" style={{
					display: 'inline-block',
					width: '100%',
					padding: '0.85rem 1.5rem',
					background: i === 1 ? 'white' : '#003d8f',
					color: i === 1 ? '#003d8f' : 'white',
					borderRadius: '8px',
					fontWeight: 700,
					fontSize: '0.95rem',
					textDecoration: 'none',
					transition: 'all 0.3s ease',
					textAlign: 'center',
					border: 'none'
				      }}>
					{texts.elegirPaquete}
				      </Link>
				    </motion.div>
				  </motion.div>
				))}
				</motion.div>
				</div>
			</section>

			{/* FAQ Section (fondo azul claro, full width) */}
			<section style={{
				width: '100vw',
				marginLeft: 'calc(-50vw + 50%)',
				background: 'linear-gradient(180deg, #E8F4FF 0%, #D0E8FF 100%)',
				padding: '5rem 0',
				display: 'flex',
				justifyContent: 'center',
			}}>
				<div style={{
					width: '100%',
					maxWidth: '1280px',
					padding: '0 1.5rem',
				}}>
				<motion.h2
					initial={{opacity: 0, y: 20}}
					whileInView={{opacity: 1, y: 0}}
					viewport={{once: true}}
					transition={{duration: 0.6}}
					style={{
						fontSize: 'clamp(2rem, 4vw, 2.5rem)',
						fontWeight: 900,
						color: '#003d8f',
						marginBottom: '4rem',
						letterSpacing: '-0.02em',
						textAlign: 'center'
					}}
				>
				{texts.faq}
				</motion.h2>

				<motion.div
					initial={{opacity: 0, y: 40}}
					whileInView={{opacity: 1, y: 0}}
					viewport={{once: true}}
					transition={{duration: 0.6}}
					style={{
						maxWidth: '700px',
						margin: '0 auto'
					}}
				>
				{faqs.map((faq, i) => (
				  <FAQItem key={i} question={faq.q} answer={faq.a} index={i} />
				))}
				</motion.div>
				</div>
			</section>

			{/* CTA Final Section */}
			<section style={{
				width: '100vw',
				marginLeft: 'calc(-50vw + 50%)',
				padding: '6rem 1.5rem',
				background: 'linear-gradient(90deg, #003d8f 0%, #004AB7 35%, #004AB7 65%, #0056d4 100%)',
				position: 'relative',
				overflow: 'hidden'
			}}>
				{/* Decorative elements */}
				<motion.div
					animate={{scale: [1, 1.2, 1]}}
					transition={{duration: 5, repeat: Infinity}}
					style={{
						position: 'absolute',
						width: '500px',
						height: '500px',
						background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
						borderRadius: '50%',
						top: '-200px',
						right: '-200px',
						pointerEvents: 'none'
					}}
				/>

				<motion.div
					animate={{scale: [1, 1.1, 1]}}
					transition={{duration: 6, repeat: Infinity, delay: 0.5}}
					style={{
						position: 'absolute',
						width: '400px',
						height: '400px',
						background: 'radial-gradient(circle, rgba(0,172,183,0.1) 0%, transparent 70%)',
						borderRadius: '50%',
						bottom: '-150px',
						left: '-150px',
						pointerEvents: 'none'
					}}
				/>

				<motion.div
					initial={{opacity: 0, y: 30}}
					whileInView={{opacity: 1, y: 0}}
					viewport={{once: true}}
					transition={{duration: 0.7}}
					style={{
						maxWidth: '1280px',
						margin: '0 auto',
						textAlign: 'center',
						position: 'relative',
						zIndex: 2
					}}
				>
					<h2 style={{
						fontSize: 'clamp(2rem, 4vw, 2.8rem)',
						fontWeight: 900,
						color: 'white',
						marginBottom: '1rem',
						letterSpacing: '-0.02em'
					}}>
				{texts.ctaFinalTitle}
					</h2>

					<p style={{
						fontSize: '1.15rem',
						color: 'rgba(255,255,255,0.9)',
						marginBottom: '2.5rem',
						lineHeight: 1.6
					}}>
				{texts.ctaFinalDesc}
					</p>

					<div style={{
						display: 'flex',
						gap: '1rem',
						justifyContent: 'center',
						flexWrap: 'wrap'
					}}>
						<motion.div
							whileHover={{scale: 1.05}}
							whileTap={{scale: 0.95}}
						>
							<Link href="/#contacto" style={{
								display: 'inline-block',
								padding: '1rem 2rem',
								background: 'white',
								color: '#003d8f',
								borderRadius: '12px',
								fontWeight: 700,
								fontSize: '1rem',
								textDecoration: 'none',
								transition: 'all 0.3s ease',
								boxShadow: '0 12px 30px rgba(0,0,0,0.15)'
							}}>
					{texts.ctaFinalContactar}
							</Link>
						</motion.div>

						<motion.div
							whileHover={{scale: 1.05}}
							whileTap={{scale: 0.95}}
						>
							<Link href="/#contacto" style={{
								display: 'inline-block',
								padding: '1rem 2rem',
								background: 'rgba(255,255,255,0.2)',
								color: 'white',
								borderRadius: '12px',
								fontWeight: 700,
								fontSize: '1rem',
								textDecoration: 'none',
								border: '2px solid rgba(255,255,255,0.3)',
								backdropFilter: 'blur(10px)',
								transition: 'all 0.3s ease'
							}}>
					{texts.ctaFinalVerPaquetes}
							</Link>
						</motion.div>
					</div>
				</motion.div>
			</section>
			{/* Sección de Contacto (full width, limpio) */}
			<section id="contacto" style={{
				width: '100vw',
				marginLeft: 'calc(-50vw + 50%)',
				background: 'linear-gradient(180deg, rgba(0,61,143,0.02) 0%, white 100%)',
				padding: '6rem 0',
				display: 'flex',
				justifyContent: 'center',
			}}>
				<div style={{
					width: '100%',
					maxWidth: '1280px',
					padding: '0 1.5rem',
				}}>
					<motion.div
						initial={{opacity: 0, y: 30}}
						whileInView={{opacity: 1, y: 0}}
						viewport={{once: true}}
						transition={{duration: 0.7}}
						style={{
							textAlign: 'center',
							marginBottom: '3rem'
						}}
					>
						<h2 style={{
							fontSize: 'clamp(2rem, 4vw, 3rem)',
							fontWeight: 900,
							color: '#003d8f',
							marginBottom: '1rem',
							letterSpacing: '-0.02em'
						}}>
				{texts.contactoTitle}
						</h2>
						<p style={{
							fontSize: '1.1rem',
							color: '#666',
							maxWidth: '700px',
							margin: '0 auto',
							lineHeight: 1.7
						}}>
				{texts.contactoDesc}
						</p>
					</motion.div>

					<motion.div
						initial={{opacity: 0, y: 40}}
						whileInView={{opacity: 1, y: 0}}
						viewport={{once: true}}
						transition={{duration: 0.7, delay: 0.2}}
						style={{
							maxWidth: '900px',
							margin: '0 auto',
							background: 'white',
							padding: '3rem 2.5rem',
							borderRadius: '20px',
							// Sin sombra ni borde para un look limpio
						}}
					>
						<ContactForm />
					</motion.div>
				</div>
			</section>

			{/* Footer */}
			<Footer />
		</main>
	);
}

export default Page;