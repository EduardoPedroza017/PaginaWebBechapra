"use client";

import React, { useEffect, useState } from 'react';
// Hook para obtener misión, visión y valores desde la API
function useEssence() {
	const [essence, setEssence] = useState<{ mision: string; vision: string; valores: string } | null>(null);
	useEffect(() => {
		fetch('http://localhost:5000/api/essence')
			.then(res => res.json())
			.then(data => setEssence(data))
			.catch(() => setEssence(null));
	}, []);
	return essence;
}
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Users, Target, Zap, Award, TrendingUp, Heart, Shield, Briefcase } from 'lucide-react';
import Footer from '@/components/Footer';


// Datos fusionados y simplificados
const historiaLogros = [
	{ year: '2009', event: 'Fundación de Bechapra' },
	{ year: '2012', event: 'Expansión nacional y nuevos servicios' },
	{ year: '2016', event: 'Primeros 100 clientes y certificación ISO' },
	{ year: '2019', event: 'Reconocimiento “Empresa Innovadora”' },
	{ year: '2022', event: 'Alianza internacional y 500+ empresas atendidas' },
	{ stat: '500+', label: 'Empresas atendidas' },
	{ stat: '15+', label: 'Años de experiencia' },
	{ stat: '95%', label: 'Satisfacción de clientes' },
	{ stat: '8', label: 'Servicios especializados' },
];

const historiasClientes = [
	// Fusiona testimonios y casos de éxito
	{
		nombre: 'María López',
		empresa: 'Grupo Alfa',
		texto: 'Bechapra nos ayudó a transformar nuestra cultura organizacional y optimizar procesos clave. ¡Resultados tangibles en meses!',
		resultado: 'Reducción del 40% en rotación anual.',
		foto: '/imagen/icon/CapitalHumano_IconLight_Azul@2x.png'
	},
	{
		nombre: 'Carlos Méndez',
		empresa: 'Finanzas XYZ',
		texto: 'El equipo de Bechapra es profesional, cercano y siempre proactivo. Los recomendamos ampliamente.',
		resultado: 'Ahorro de 120 horas/mes.',
		foto: '/imagen/icon/Servicios Administrativos_IconLight_Azul@2x.png'
	},
	{
		nombre: 'Ana Torres',
		empresa: 'TechNova',
		texto: 'Gracias a su consultoría, logramos una integración exitosa tras una fusión compleja.',
		resultado: 'Transición sin conflictos y aumento de satisfacción.',
		foto: '/imagen/icon/ServiciosdeImpuestos_IconLight_Azul@2x.png'
	},
];



const faqs = [
	{ q: '¿Qué tipo de empresas atienden?', a: 'Trabajamos con empresas de todos los tamaños y sectores, desde pymes hasta corporativos.' },
	{ q: '¿Ofrecen servicios a nivel nacional?', a: 'Sí, tenemos cobertura en todo México y alianzas internacionales.' },
	{ q: '¿Puedo solicitar una consultoría personalizada?', a: 'Por supuesto, agenda una llamada y diseñamos una solución a tu medida.' },
];





export default function AcercaDePage() {
	const essence = useEssence();
	return (
		<>
			<main>
				{/* Hero Section */}
				<section style={{
					width: '100vw',
					marginLeft: 'calc(-50vw + 50%)',
					padding: '6rem 1.5rem 8rem',
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
					<motion.div
						initial={{opacity: 0, y: 30}}
						animate={{opacity: 1, y: 0}}
						transition={{duration: 0.6}}
					>
						<h1 style={{
							fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
							fontWeight: 900,
							color: 'white',
							marginBottom: '1rem',
							letterSpacing: '-0.02em',
							lineHeight: 1.2
						}}>
							Acerca de <span style={{background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Bechapra</span>
						</h1>

						<p style={{
							fontSize: '1.2rem',
							color: 'rgba(255,255,255,0.9)',
							lineHeight: 1.7,
							marginBottom: '3rem',
							maxWidth: '700px'
						}}>
							Somos tu aliado estratégico en soluciones empresariales integrales. Con más de 15 años de experiencia, hemos acompañado a cientos de organizaciones en su transformación y crecimiento.
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
								Contáctanos →
							</Link>
						</motion.div>
					</motion.div>
				</div>
			</section>

			{/* Misión y Visión Section */}
			<section style={{
				maxWidth: '1280px',
				margin: '0 auto',
				padding: '6rem 1.5rem'
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
					Nuestra esencia
				</motion.h2>

								<motion.div
									initial={{opacity: 0, y: 40}}
									whileInView={{opacity: 1, y: 0}}
									viewport={{once: true}}
									transition={{duration: 0.6}}
									style={{
										display: 'grid',
										gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
										gap: '2.5rem',
										marginBottom: '5rem'
									}}
								>
									{([
										{icon: Target, title: 'Misión', field: 'mision'},
										{icon: Award, title: 'Visión', field: 'vision'},
										{icon: Heart, title: 'Valores', field: 'valores'}
									] as const).map((item, i) => {
										const Icon = item.icon;
										type EssenceField = 'mision' | 'vision' | 'valores';
										const field = item.field as EssenceField;
										const desc = essence && essence[field] ? essence[field] : (item.title === 'Misión'
											? 'Impulsar el crecimiento y éxito de las organizaciones a través de soluciones integrales en Capital Humano, Desarrollo Organizacional y Management Services.'
											: item.title === 'Visión'
												? 'Ser la empresa líder en soluciones empresariales, reconocida por nuestra excelencia, innovación y compromiso con el éxito de nuestros clientes.'
												: 'Integridad, transparencia, compromiso, innovación y pasión por el éxito de nuestros clientes son nuestros pilares fundamentales.');
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
													background: i === 1
														? 'linear-gradient(135deg, #003d8f 0%, #004AB7 100%)'
														: 'linear-gradient(135deg, #E8F4FF 0%, #D0E8FF 100%)',
													border: i === 1 ? 'none' : '2px solid rgba(0,61,143,0.12)',
													transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
													boxShadow: i === 1 ? '0 12px 35px rgba(0,61,143,0.2)' : '0 12px 35px rgba(0,61,143,0.08)',
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

												<div style={{
													width: '65px',
													height: '65px',
													background: i === 1 ? 'rgba(255,255,255,0.15)' : 'linear-gradient(135deg, #FFFFFF 0%, #F8FDFF 100%)',
													borderRadius: '14px',
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
													marginBottom: '1.5rem',
													border: i === 1 ? '1.5px solid rgba(255,255,255,0.2)' : '1.5px solid rgba(0,61,143,0.15)',
													color: i === 1 ? 'white' : '#003d8f',
													position: 'relative',
													zIndex: 2
												}}>
													<Icon size={32} />
												</div>

												<div style={{position: 'relative', zIndex: 2}}>
													<h3 style={{
														fontSize: '1.5rem',
														fontWeight: 800,
														color: i === 1 ? 'white' : '#003d8f',
														marginBottom: '0.75rem'
													}}>
														{item.title}
													</h3>

													<p style={{
														fontSize: '0.95rem',
														color: i === 1 ? 'rgba(255,255,255,0.85)' : '#666',
														lineHeight: 1.6,
														margin: 0
													}}>
														{desc}
													</p>
												</div>
											</motion.div>
										);
									})}
								</motion.div>
			</section>

						{/* Historia y logros fusionados */}
						<section style={{maxWidth: '1280px', margin: '0 auto', padding: '4rem 1.5rem'}}>
							<h2 style={{fontSize: '2rem', fontWeight: 900, color: '#003d8f', marginBottom: '2.5rem', textAlign: 'center'}}>Historia y logros</h2>
							<div style={{display: 'flex', flexWrap: 'wrap', gap: '2.5rem', justifyContent: 'center', marginBottom: '2.5rem'}}>
								{historiaLogros.filter(h => h.year).map((item, i) => (
									<div key={i} style={{minWidth: 180, background: 'linear-gradient(135deg, #E8F4FF 0%, #D0E8FF 100%)', borderRadius: 14, padding: '2rem 1.5rem', boxShadow: '0 4px 18px rgba(0,61,143,0.08)', textAlign: 'center'}}>
										<div style={{fontSize: '2rem', fontWeight: 800, color: '#003d8f', marginBottom: 8}}>{item.year}</div>
										<div style={{fontSize: '1rem', color: '#003d8f', fontWeight: 600}}>{item.event}</div>
									</div>
								))}
							</div>
							<div style={{display: 'flex', flexWrap: 'wrap', gap: '2.5rem', justifyContent: 'center'}}>
								{historiaLogros.filter(h => h.stat).map((stat, i) => (
									<div key={i} style={{minWidth: 180, background: 'white', borderRadius: 14, padding: '2rem 1.5rem', boxShadow: '0 4px 18px rgba(0,61,143,0.08)', textAlign: 'center', border: '1.5px solid #E8F4FF'}}>
										<div style={{fontSize: '2.2rem', fontWeight: 900, color: '#003d8f', marginBottom: 8}}>{stat.stat}</div>
										<div style={{fontSize: '1rem', color: '#003d8f', fontWeight: 600}}>{stat.label}</div>
									</div>
								))}
							</div>
						</section>


			{/* Historias de clientes (fusiona testimonios y casos de éxito) */}
			<section style={{maxWidth: '1280px', margin: '0 auto', padding: '4rem 1.5rem'}}>
			  <h2 style={{fontSize: '2rem', fontWeight: 900, color: '#003d8f', marginBottom: '2.5rem', textAlign: 'center'}}>Historias de clientes</h2>
			  <div style={{display: 'flex', flexWrap: 'wrap', gap: '2.5rem', justifyContent: 'center'}}>
				{historiasClientes.map((h, i) => (
				  <div key={i} style={{background: 'white', borderRadius: 16, boxShadow: '0 4px 18px rgba(0,61,143,0.08)', padding: '2rem 1.5rem', maxWidth: 340, minWidth: 260, textAlign: 'center', border: '1.5px solid #E8F4FF'}}>
					<img src={h.foto} alt={h.nombre} style={{width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 1rem'}} />
					<div style={{fontWeight: 700, color: '#003d8f', fontSize: '1.1rem'}}>{h.nombre}</div>
					<div style={{color: '#666', fontSize: '0.95rem', marginBottom: 8}}>{h.empresa}</div>
					<div style={{color: '#003d8f', fontWeight: 500, fontSize: '0.98rem', fontStyle: 'italic'}}>&ldquo;{h.texto}&rdquo;</div>
					<div style={{color: '#009688', fontWeight: 600, fontSize: '0.98rem', marginTop: 8}}>{h.resultado}</div>
				  </div>
				))}
			  </div>
			</section>


						{/* FAQ reducido */}
						<section style={{maxWidth: '1280px', margin: '0 auto', padding: '4rem 1.5rem'}}>
							<h2 style={{fontSize: '2rem', fontWeight: 900, color: '#003d8f', marginBottom: '2.5rem', textAlign: 'center'}}>Preguntas frecuentes</h2>
							<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem'}}>
								{faqs.map((f, i) => (
									<div key={i} style={{background: 'white', borderRadius: 14, boxShadow: '0 4px 18px rgba(0,61,143,0.08)', padding: '2rem 1.5rem', border: '1.5px solid #E8F4FF'}}>
										<div style={{fontWeight: 700, color: '#003d8f', fontSize: '1.08rem', marginBottom: 8}}>{f.q}</div>
										<div style={{color: '#666', fontSize: '0.98rem'}}>{f.a}</div>
									</div>
								))}
							</div>
							<div style={{textAlign: 'center', marginTop: '2rem'}}>
								<Link href="/#contacto" style={{color: '#003d8f', fontWeight: 700, textDecoration: 'underline'}}>¿Tienes otra pregunta? Contáctanos</Link>
							</div>
						</section>

			{/* ¿Por qué Bechapra? Section */}
			<section style={{
				maxWidth: '1280px',
				margin: '0 auto',
				padding: '5rem 1.5rem'
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
					¿Por qué Bechapra?
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
					{[
						{icon: Users, title: 'Equipo experto', desc: 'Profesionales con 15+ años en consultoría empresarial, HR y transformación digital.'},
						{icon: TrendingUp, title: 'Resultados comprobados', desc: 'Más de 500 empresas han transformado su operación con nuestras soluciones.'},
						{icon: Zap, title: 'Innovación continua', desc: 'Metodologías actualizadas, herramientas modernas y enfoque ágil en cada proyecto.'},
						{icon: Shield, title: 'Confiabilidad', desc: 'Compromiso con la confidencialidad, ética profesional y transparencia total.'},
						{icon: Briefcase, title: 'Soluciones integrales', desc: 'De capital humano a finanzas: una sola empresa para todas tus necesidades.'},
						{icon: Heart, title: 'Enfoque humano', desc: 'Entendemos que detrás de cada número hay personas y su bienestar es prioritario.'}
					].map((item, i) => {
						const Icon = item.icon;
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
									boxShadow: '0 12px 35px rgba(0,61,143,0.08)',
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
									position: 'relative',
									zIndex: 2
								}}>
									<Icon size={32} />
								</div>

								<div style={{position: 'relative', zIndex: 2}}>
									<h3 style={{
										fontSize: '1.25rem',
										fontWeight: 800,
										color: '#003d8f',
										marginBottom: '0.75rem'
									}}>
										{item.title}
									</h3>

									<p style={{
										fontSize: '0.95rem',
										color: '#666',
										lineHeight: 1.6,
										margin: 0
									}}>
										{item.desc}
									</p>
								</div>
							</motion.div>
						);
					})}
				</motion.div>
			</section>




			{/* Equipo directivo simplificado */}
			<section style={{maxWidth: '1280px', margin: '0 auto', padding: '5rem 1.5rem'}}>
			  <motion.div
				initial={{opacity: 0, y: 20}}
				whileInView={{opacity: 1, y: 0}}
				viewport={{once: true}}
				transition={{duration: 0.6}}
				style={{textAlign: 'center', marginBottom: '3rem'}}
			  >
				<h2 style={{fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 900, color: '#003d8f', marginBottom: '1rem', letterSpacing: '-0.02em'}}>
				  Nuestro equipo directivo
				</h2>
				<p style={{fontSize: '1.1rem', color: '#666', maxWidth: '700px', margin: '0 auto'}}>
				  Liderazgo con experiencia y compromiso con la excelencia.
				</p>
			  </motion.div>
			  <motion.div
				initial={{opacity: 0, y: 40}}
				whileInView={{opacity: 1, y: 0}}
				viewport={{once: true}}
				transition={{duration: 0.6}}
				style={{display: 'flex', justifyContent: 'center'}}
			  >
				<div style={{background: 'linear-gradient(135deg, #003d8f 0%, #004AB7 100%)', padding: '2rem 2.5rem', borderRadius: '12px', textAlign: 'center', minWidth: 220, maxWidth: 340, boxShadow: '0 8px 24px rgba(0,61,143,0.2)', position: 'relative', margin: '0 auto'}}>
				  <div style={{width: '70px', height: '70px', background: 'white', borderRadius: '50%', margin: '0 auto 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}>
					<Users size={36} style={{color: '#003d8f'}} />
				  </div>
				  <h3 style={{fontSize: '1.25rem', fontWeight: 800, color: 'white', marginBottom: '0.4rem', letterSpacing: '-0.01em'}}>
					Dirección General
				  </h3>
				  <div style={{width: '40px', height: '2px', background: 'rgba(255,255,255,0.4)', margin: '0.75rem auto', borderRadius: '2px'}} />
				  <p style={{fontSize: '0.9rem', color: 'rgba(255,255,255,0.9)', margin: 0, fontWeight: 500}}>
					CEO
				  </p>
				</div>
			  </motion.div>
			</section>

			{/* Proceso Section */}
			<section style={{
				maxWidth: '1280px',
				margin: '0 auto',
				padding: '5rem 1.5rem'
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
					Nuestro proceso
				</motion.h2>

				<motion.div
					initial={{opacity: 0, y: 40}}
					whileInView={{opacity: 1, y: 0}}
					viewport={{once: true}}
					transition={{duration: 0.6}}
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
						gap: '2rem'
					}}
				>
					{[
						{step: '01', title: 'Diagnóstico', desc: 'Conocemos tu operación, retos y objetivos en detalle.'},
						{step: '02', title: 'Diseño', desc: 'Creamos una solución personalizada y adaptada a ti.'},
						{step: '03', title: 'Implementación', desc: 'Ejecutamos el plan con acompañamiento continuo.'},
						{step: '04', title: 'Seguimiento', desc: 'Monitoreamos resultados y optimizamos constantemente.'}
					].map((item, i) => (
						<motion.div
							key={i}
							initial={{opacity: 0, y: 30}}
							whileInView={{opacity: 1, y: 0}}
							viewport={{once: true}}
							transition={{duration: 0.5, delay: i * 0.1}}
							style={{
								display: 'flex',
								gap: '1.5rem'
							}}
						>
							<div style={{
								width: '60px',
								height: '60px',
								minWidth: '60px',
								background: 'linear-gradient(135deg, #003d8f 0%, #0056d4 100%)',
								borderRadius: '12px',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								fontSize: '1.4rem',
								fontWeight: 900,
								color: 'white'
							}}>
								{item.step}
							</div>
							<div>
								<h3 style={{
									fontSize: '1.15rem',
									fontWeight: 800,
									color: '#003d8f',
									marginBottom: '0.5rem',
									margin: 0
								}}>
									{item.title}
								</h3>
								<p style={{
									fontSize: '0.95rem',
									color: '#666',
									lineHeight: 1.6,
									margin: 0
								}}>
									{item.desc}
								</p>
							</div>
						</motion.div>
					))}
				</motion.div>
			</section>
			</main>
			<Footer />
		</>
	);
}