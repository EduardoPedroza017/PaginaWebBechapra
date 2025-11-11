"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, Users, Award, BarChart3 } from 'lucide-react';

const programas = [
	{ icon: <BookOpen size={26} />, title: 'Talleres de habilidades blandas', desc: 'Comunicación, liderazgo y trabajo en equipo, diseñados para mejorar la colaboración interna.', details: 'Sesiones prácticas con actividades en vivo, role-play y feedback dirigido. Duración típica: 8-16 horas por cohort.' },
	{ icon: <Users size={26} />, title: 'Formación técnica especializada', desc: 'Capacitaciones en herramientas y procesos específicos para tu operación.', details: 'Cursos adaptados al stack y procesos internos, incluyen ejercicios reales y material para transferir aprendizaje.' },
	{ icon: <Award size={26} />, title: 'Programas de liderazgo', desc: 'Mentoring y programas para mandos medios y directivos con seguimiento de impacto.', details: 'Planes de 6-12 meses con coaching, workshops y seguimiento de KPIs de liderazgo.' },
	{ icon: <BarChart3 size={26} />, title: 'Medición y evaluación', desc: 'KPI y evaluación post-capacitación para medir ROI y efectividad.', details: 'Diseñamos encuestas, rúbricas y paneles de control para medir la transferencia y el impacto en los indicadores clave.' },
];

export default function Page() {
	return (
		<main>
			{/* HERO Mejorado - Full width con gradiente */}
			<section style={{
				width: '100vw',
				marginLeft: 'calc(-50vw + 50%)',
				background: 'linear-gradient(90deg, #003d8f 0%, #004AB7 35%, #004AB7 65%, #0056d4 100%)',
				padding: '6rem 1.5rem 5rem',
				position: 'relative',
				overflow: 'hidden'
			}}>
				{/* Decorative elements */}
				<div style={{
					position: 'absolute',
					top: -100,
					right: -100,
					width: '300px',
					height: '300px',
					background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
					borderRadius: '50%',
					pointerEvents: 'none'
				}} />
				<div style={{
					position: 'absolute',
					bottom: -50,
					left: -50,
					width: '250px',
					height: '250px',
					background: 'radial-gradient(circle, rgba(0,172,183,0.15) 0%, transparent 70%)',
					borderRadius: '50%',
					pointerEvents: 'none'
				}} />

				<div style={{
					maxWidth: '1280px',
					margin: '0 auto',
					display: 'grid',
					gridTemplateColumns: '1.2fr 1fr',
					gap: '3rem',
					alignItems: 'center',
					position: 'relative',
					zIndex: 2
				}}>
					<motion.div initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} transition={{duration: 0.7}}>
						{/* Back button */}
						<Link 
							href="/servicios" 
							style={{
								display: 'inline-flex',
								alignItems: 'center',
								gap: '0.75rem',
								padding: '0.6rem 1.5rem',
								fontSize: '0.95rem',
								fontWeight: 700,
								color: '#003d8f',
								textDecoration: 'none',
								transition: 'all 0.3s ease',
								cursor: 'pointer',
								background: 'white',
								borderRadius: '50px',
								boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
								border: 'none',
								marginBottom: '1.5rem'
							}}
						>
							<span style={{fontSize: '1.1rem'}}>‹</span>
							Volver a Servicios
						</Link>
						<h1 style={{
							fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
							fontWeight: 900,
							color: 'white',
							marginBottom: '1.5rem',
							lineHeight: 1.1,
							letterSpacing: '-0.02em'
						}}>
							Capacitación <span style={{background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>Empresarial</span>
						</h1>
						<p style={{
							fontSize: '1.15rem',
							color: 'rgba(255,255,255,0.95)',
							lineHeight: 1.8,
							marginBottom: '2rem',
							maxWidth: '500px'
						}}>
							Programas prácticos, con instructores certificados y seguimiento que asegura la transferencia de conocimiento.
						</p>
						<Link href="/#contacto" style={{
							display: 'inline-flex',
							alignItems: 'center',
							gap: '0.75rem',
							padding: '1rem 2rem',
							borderRadius: '12px',
							background: 'white',
							color: '#003d8f',
							fontWeight: 700,
							fontSize: '1rem',
							textDecoration: 'none',
							transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
							cursor: 'pointer',
							boxShadow: '0 10px 30px rgba(255,255,255,0.2)'
						}}>
							Solicitar diagnóstico
							<span>→</span>
						</Link>
					</motion.div>

					<motion.div 
						initial={{opacity: 0, scale: 0.9, rotate: -5}} 
						animate={{opacity: 1, scale: 1, rotate: 0}} 
						transition={{duration: 0.8, delay: 0.2}}
						style={{
							position: 'relative'
						}}
					>
						<div style={{
							width: '100%',
							height: '380px',
							background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(0,172,183,0.1) 100%)',
							borderRadius: '20px',
							border: '2px solid rgba(255,255,255,0.2)',
							backdropFilter: 'blur(10px)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: 'white',
							fontSize: '1.2rem',
							fontWeight: '600',
							textAlign: 'center',
							padding: '2rem'
						}}>
							Imagen Capacitación Empresarial
						</div>
					</motion.div>
				</div>
			</section>

			{/* Stats section */}
			<section style={{
				maxWidth: '1280px',
				margin: '0 auto',
				padding: '5rem 1.5rem'
			}}>
				<motion.div
					initial={{opacity: 0, y: 40}}
					whileInView={{opacity: 1, y: 0}}
					viewport={{once: true}}
					transition={{duration: 0.6}}
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
						gap: '2.5rem'
					}}
				>
					{[
						{label: 'Horas impartidas', value: '300+', icon: BookOpen, color: '#003d8f'},
						{label: 'Satisfacción', value: '98%', icon: Award, color: '#004AB7'},
						{label: 'Transferencia medida', value: '75%', icon: BarChart3, color: '#0056d4'}
					].map((stat, i) => {
						const Icon = stat.icon;
						return (
							<motion.div
								key={i}
								initial={{opacity:0, y:20}}
								whileInView={{opacity:1, y:0}}
								viewport={{once:true}}
								transition={{duration:0.5, delay:i*0.1}}
								whileHover={{scale:1.05, y:-8}}
								style={{
									padding: '2.5rem 2rem',
									borderRadius: '16px',
									background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}dd 100%)`,
									border: '1px solid rgba(255,255,255,0.2)',
									textAlign: 'center',
									color: 'white',
									boxShadow: `0 15px 40px ${stat.color}33, inset 0 1px 0 rgba(255,255,255,0.1)`,
									cursor: 'pointer',
									position: 'relative',
									overflow: 'hidden'
								}}
							>
								{/* Fondo animado */}
								<motion.div
									animate={{scale: [1, 1.1, 1]}}
									transition={{duration:3, repeat:Infinity}}
									style={{
										position: 'absolute',
										top: 0,
										right: 0,
										width: '100px',
										height: '100px',
										background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
										borderRadius: '50%',
										pointerEvents: 'none'
									}}
								/>
								<div style={{position: 'relative', zIndex: 2}}>
									<Icon size={40} style={{margin: '0 auto 1rem', color: '#FFD700'}} />
									<div style={{fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem', letterSpacing: '-0.02em'}}>{stat.value}</div>
									<div style={{fontSize: '0.95rem', opacity: 0.95, fontWeight: 600}}>{stat.label}</div>
								</div>
							</motion.div>
						);
					})}
				</motion.div>
			</section>

			<section style={{
				maxWidth: '1280px',
				margin: '0 auto',
				padding: '5rem 1.5rem',
				background: 'linear-gradient(180deg, transparent 0%, rgba(0,61,143,0.02) 100%)'
			}}>
				<motion.h2 
					initial={{opacity: 0, y: 20}} 
					whileInView={{opacity: 1, y: 0}} 
					viewport={{once: true}} 
					transition={{duration: 0.6}}
					style={{
						fontSize: 'clamp(2rem, 4vw, 3rem)',
						fontWeight: 900,
						color: '#003d8f',
						marginBottom: '2rem',
						textAlign: 'center',
						letterSpacing: '-0.02em'
					}}
				>
					Nuestros Programas
				</motion.h2>

				<motion.p
					initial={{opacity: 0, y: 20}}
					whileInView={{opacity: 1, y: 0}}
					viewport={{once: true}}
					transition={{delay: 0.1, duration: 0.6}}
					style={{
						fontSize: '1.05rem',
						color: '#666',
						textAlign: 'center',
						maxWidth: '700px',
						margin: '0 auto 4rem',
						lineHeight: 1.7
					}}
				>
					Diseñamos programas de capacitación alineados a la estrategia y cultura de cada organización. Nuestros programas son prácticos, medibles y adaptados al ritmo de tus equipos.
				</motion.p>

				{/* Carrusel de programas - Infinito */}
				<div style={{
					overflow: 'hidden',
					position: 'relative',
					marginBottom: '3rem',
					background: 'linear-gradient(135deg, rgba(0,61,143,0.03) 0%, rgba(0,172,183,0.02) 100%)',
					borderRadius: '20px',
					padding: '2.5rem 0',
					border: '1.5px solid rgba(0,61,143,0.08)'
				}}>
					<motion.div
						initial={{x: 0}}
						animate={{x: `-${programas.length * (280 + 24)}px`}}
						transition={{
							duration: 70,
							repeat: Infinity,
							ease: "linear",
							repeatType: "loop"
						}}
						style={{
							display: 'flex',
							gap: '1.5rem',
							width: 'fit-content',
							willChange: 'transform',
							padding: '0 1.5rem'
						}}
					>
						{/* Renderizar 3 veces para garantizar flujo infinito suave */}
						{[...programas, ...programas, ...programas].map((p, i) => (
							<motion.div
								key={i}
								whileHover={{
									scale: 1.08,
									y: -8,
									transition: {duration: 0.3, type: "spring", bounce: 0.4}
								}}
								style={{
									flexShrink: 0,
									width: '280px',
									minHeight: '240px',
									padding: '2rem',
									borderRadius: '16px',
									background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FDFF 50%, #F0F9FF 100%)',
									border: '2px solid rgba(0,61,143,0.12)',
									textAlign: 'center',
									transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
									boxShadow: '0 12px 35px rgba(0,61,143,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
									backdropFilter: 'blur(12px)',
									position: 'relative',
									overflow: 'hidden',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									cursor: 'pointer'
								}}
							>
								{/* Borde superior animado */}
								<motion.div
									animate={{opacity: [0.6, 1, 0.6]}}
									transition={{duration: 3, repeat: Infinity}}
									style={{
										position: 'absolute',
										top: 0,
										left: 0,
										right: 0,
										height: '3px',
										background: 'linear-gradient(90deg, #003d8f 0%, #004AB7 35%, #0056d4 65%, #004AB7 100%)',
										borderRadius: '16px 16px 0 0'
									}}
								/>

								{/* Icono mejorado */}
								<div style={{
									width: '70px',
									height: '70px',
									background: 'linear-gradient(135deg, #E8F4FF 0%, #D0E8FF 100%)',
									borderRadius: '14px',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									marginBottom: '1rem',
									position: 'relative',
									zIndex: 2,
									border: '1.5px solid rgba(0,61,143,0.15)',
									color: '#003d8f',
									fontSize: '2rem'
								}}>
									{p.icon}
								</div>

								{/* Contenido */}
								<div style={{position: 'relative', zIndex: 2}}>
									<h3 style={{
										fontSize: '1.1rem',
										fontWeight: 800,
										color: '#003d8f',
										marginBottom: '0.8rem'
									}}>
										{p.title}
									</h3>
									<p style={{
										fontSize: '0.95rem',
										color: '#666',
										lineHeight: 1.5,
										margin: 0
									}}>
										{p.desc}
									</p>
								</div>

								{/* Efecto de brillo */}
								<motion.div
									whileHover={{opacity: 1}}
									initial={{opacity: 0}}
									style={{
										position: 'absolute',
										inset: 0,
										background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 50%, rgba(0,172,183,0.1) 100%)',
										borderRadius: '16px',
										pointerEvents: 'none'
									}}
								/>
							</motion.div>
						))}
					</motion.div>

					{/* Gradients laterales */}
					<div style={{
						position: 'absolute',
						left: 0,
						top: 0,
						bottom: 0,
						width: '120px',
						background: 'linear-gradient(90deg, #FFFFFF 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)',
						pointerEvents: 'none',
						zIndex: 10,
						borderRadius: '20px 0 0 20px'
					}} />
					<div style={{
						position: 'absolute',
						right: 0,
						top: 0,
						bottom: 0,
						width: '120px',
						background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, #FFFFFF 100%)',
						pointerEvents: 'none',
						zIndex: 10,
						borderRadius: '0 20px 20px 0'
					}} />
				</div>
			</section>

			{/* Beneficios mejorados */}
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
						fontSize: 'clamp(2rem, 4vw, 3rem)',
						fontWeight: 900,
						color: '#003d8f',
						marginBottom: '4rem',
						textAlign: 'center',
						letterSpacing: '-0.02em'
					}}
				>
					¿Por qué elegir Bechapra?
				</motion.h2>

				<motion.div
					initial={{opacity: 0, y: 40}}
					whileInView={{opacity: 1, y: 0}}
					viewport={{once: true}}
					transition={{duration: 0.6}}
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
						gap: '2.5rem'
					}}
				>
					{[
						{title: 'Entregables claros', desc: 'Materiales, guías y reportes de impacto al finalizar cada ciclo.'},
						{title: 'Planes personalizados', desc: 'Diseño de itinerarios formativos alineados a objetivos estratégicos.'},
						{title: 'Medición continua', desc: 'Encuestas pre-post y métricas para demostrar resultados.'}
					].map((benefit, i) => (
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

							{/* Decorativo radial */}
							<motion.div
								initial={{opacity: 0, scale: 0}}
								whileInView={{opacity: 0.8, scale: 1}}
								transition={{duration: 0.8}}
								style={{
									position: 'absolute',
									top: -30,
									right: -30,
									width: '150px',
									height: '150px',
									background: 'radial-gradient(circle, rgba(0,172,183,0.15) 0%, transparent 70%)',
									borderRadius: '50%',
									pointerEvents: 'none'
								}}
							/>

							<div style={{position: 'relative', zIndex: 2}}>
								<h3 style={{
									fontSize: '1.25rem',
									fontWeight: 800,
									color: '#003d8f',
									marginBottom: '0.75rem'
								}}>
									{benefit.title}
								</h3>

								<p style={{
									fontSize: '0.95rem',
									color: '#666',
									lineHeight: 1.6,
									margin: 0
								}}>
									{benefit.desc}
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
					))}
				</motion.div>
			</section>

			{/* CTA FINAL Mejorado */}
			<motion.section
				initial={{opacity: 0, y: 30}}
				whileInView={{opacity: 1, y: 0}}
				viewport={{once: true}}
				transition={{duration: 0.8}}
				style={{
					width: '100vw',
					marginLeft: 'calc(-50vw + 50%)',
					background: 'linear-gradient(90deg, #003d8f 0%, #004AB7 35%, #004AB7 65%, #0056d4 100%)',
					padding: '5rem 1.5rem',
					marginTop: '4rem',
					position: 'relative',
					overflow: 'hidden'
				}}
			>
				{/* Decorative elements */}
				<div style={{
					position: 'absolute',
					top: -100,
					right: -100,
					width: '300px',
					height: '300px',
					background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
					borderRadius: '50%',
					pointerEvents: 'none'
				}} />
				<div style={{
					position: 'absolute',
					bottom: -50,
					left: -50,
					width: '250px',
					height: '250px',
					background: 'radial-gradient(circle, rgba(0,172,183,0.15) 0%, transparent 70%)',
					borderRadius: '50%',
					pointerEvents: 'none'
				}} />

				<div style={{
					maxWidth: '1280px',
					margin: '0 auto',
					textAlign: 'center',
					position: 'relative',
					zIndex: 2
				}}>
					<motion.h3
						initial={{opacity: 0, scale: 0.9}}
						whileInView={{opacity: 1, scale: 1}}
						transition={{duration: 0.6}}
						style={{
							fontSize: 'clamp(2rem, 4vw, 3rem)',
							fontWeight: 900,
							color: 'white',
							marginBottom: '1.5rem',
							letterSpacing: '-0.02em'
						}}
					>
						Solicita tu diagnóstico formativo
					</motion.h3>

					<motion.p
						initial={{opacity: 0, y: 20}}
						whileInView={{opacity: 1, y: 0}}
						transition={{delay: 0.2, duration: 0.6}}
						style={{
							fontSize: '1.15rem',
							color: 'rgba(255,255,255,0.95)',
							marginBottom: '2rem',
							maxWidth: '600px',
							margin: '0 auto 2rem',
							lineHeight: 1.8
						}}
					>
						Recibiras una propuesta con cronograma, metodología y ROI estimado.
					</motion.p>

					<motion.div
						initial={{opacity: 0, y: 20}}
						whileInView={{opacity: 1, y: 0}}
						transition={{delay: 0.3, duration: 0.6}}
						style={{
							display: 'flex',
							gap: '1rem',
							justifyContent: 'center',
							flexWrap: 'wrap'
						}}
					>
						<Link 
							href="/#contacto" 
							style={{
								padding: '1.1rem 2.5rem',
								borderRadius: '12px',
								background: 'white',
								color: '#003d8f',
								fontWeight: 700,
								fontSize: '1rem',
								textDecoration: 'none',
								transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
								cursor: 'pointer',
								boxShadow: '0 10px 30px rgba(255,255,255,0.2)',
								display: 'inline-flex',
								alignItems: 'center',
								gap: '0.75rem'
							}}
						>
							Solicitar propuesta
							<span>→</span>
						</Link>
						<motion.a
							whileHover={{scale: 1.05}}
							href="#"
							style={{
								padding: '1.1rem 2.5rem',
								borderRadius: '12px',
								background: 'rgba(255,255,255,0.15)',
								color: 'white',
								fontWeight: 700,
								fontSize: '1rem',
								textDecoration: 'none',
								transition: 'all 0.3s ease',
								cursor: 'pointer',
								border: '2px solid rgba(255,255,255,0.3)',
								backdropFilter: 'blur(10px)',
								display: 'inline-flex',
								alignItems: 'center',
								gap: '0.75rem'
							}}
						>
							Conocer más
						</motion.a>
					</motion.div>
				</div>
			</motion.section>
		</main>
	);
}