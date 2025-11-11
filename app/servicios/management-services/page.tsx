"use client";

import React from 'react';
import { motion } from "framer-motion";
import Link from "next/link";
import { Briefcase, Settings, Users, PieChart } from 'lucide-react';

const SERVICES = [
  { icon: Briefcase, title: 'Operaciones & Procesos', desc: 'Mapeo, optimización y documentación de procesos clave para mejorar eficiencia.' },
  { icon: Settings, title: 'Transformación Digital', desc: 'Automatización, selección de herramientas y migración de procesos a plataformas modernas.' },
  { icon: Users, title: 'Talento & Organización', desc: 'Estructura organizacional, roles y acompañamiento para equipos en crecimiento.' },
  { icon: PieChart, title: 'Análisis & KPI', desc: 'Diseño de dashboards y métricas para tomar decisiones oportunas.' },
];

export default function ManagementServicesPage() {
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
					{/* Left side - Text */}
					<motion.div
						initial={{opacity: 0, y: 30}}
						animate={{opacity: 1, y: 0}}
						transition={{duration: 0.7}}
					>
						<Link href="/servicios" style={{
							display: 'inline-flex',
							alignItems: 'center',
							gap: '0.75rem',
							padding: '0.65rem 1.25rem',
							background: 'white',
							color: '#003d8f',
							borderRadius: '50px',
							fontWeight: 600,
							textDecoration: 'none',
							fontSize: '0.95rem',
							marginBottom: '1.5rem',
							transition: 'all 0.3s ease'
						}}>
							← Volver
						</Link>

						<h1 style={{
							fontSize: 'clamp(2.5rem, 6vw, 3.8rem)',
							fontWeight: 900,
							color: 'white',
							lineHeight: 1.1,
							marginBottom: '1.5rem',
							letterSpacing: '-0.02em'
						}}>
							Management <span style={{
								background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
								WebkitBackgroundClip: 'text',
								WebkitTextFillColor: 'transparent',
								backgroundClip: 'text'
							}}>Services</span>
						</h1>

						<p style={{
							fontSize: '1.15rem',
							color: 'rgba(255,255,255,0.9)',
							lineHeight: 1.6,
							marginBottom: '2rem'
						}}>
							Servicios especializados para la gestión efectiva y profesional de tu negocio — diseño, automatización y talento.
						</p>

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
								textDecoration: 'none',
								transition: 'all 0.3s ease',
								boxShadow: '0 12px 30px rgba(0,0,0,0.15)'
							}}>
								Solicitar asesoría →
							</Link>
						</motion.div>
					</motion.div>

					{/* Right side - Image placeholder */}
					<motion.div
						initial={{opacity: 0, scale: 0.9}}
						animate={{opacity: 1, scale: 1}}
						transition={{duration: 0.7, delay: 0.2}}
						style={{
							height: '380px',
							background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)',
							borderRadius: '20px',
							border: '2px solid rgba(255,255,255,0.2)',
							backdropFilter: 'blur(10px)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							position: 'relative',
							overflow: 'hidden'
						}}
					>
						<div style={{
							fontSize: '4rem',
							color: 'rgba(255,255,255,0.3)'
						}}>
							⚙️
						</div>
					</motion.div>
				</div>
			</section>

			{/* Services Grid Section */}
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
						fontSize: 'clamp(2rem, 4vw, 3rem)',
						fontWeight: 900,
						color: '#003d8f',
						marginBottom: '4rem',
						textAlign: 'center',
						letterSpacing: '-0.02em'
					}}
				>
					Nuestros servicios
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
					{SERVICES.map((service, i) => {
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
									background: 'linear-gradient(135deg, #E8F4FF 0%, #F0F9FF 100%)',
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
									<Icon size={32} />
								</div>

								<div style={{position: 'relative', zIndex: 2}}>
									<h3 style={{
										fontSize: '1.25rem',
										fontWeight: 800,
										color: '#003d8f',
										marginBottom: '0.75rem'
									}}>
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
			</section>

			{/* Beneficios Section */}
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
					Metodología y beneficios
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
						{
							icon: Briefcase,
							title: 'Consultoría a la medida',
							desc: 'Diseñamos un plan de trabajo por fases para alcanzar resultados medibles en 90 días.'
						},
						{
							icon: Settings,
							title: 'Implementación tecnológica',
							desc: 'Integración de herramientas: ERPs ligeros, automatizaciones y dashboards.'
						},
						{
							icon: Users,
							title: 'Acompañamiento continuo',
							desc: 'Capacitación de equipos y seguimiento post-implementación para asegurar adopción.'
						}
					].map((benefit, i) => {
						const Icon = benefit.icon;
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
									<Icon size={32} />
								</div>

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
						);
					})}
				</motion.div>
			</section>

			{/* CTA final section */}
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
						¿Listo para transformar tu gestión?
					</h2>

					<p style={{
						fontSize: '1.15rem',
						color: 'rgba(255,255,255,0.9)',
						marginBottom: '2.5rem',
						lineHeight: 1.6
					}}>
						Solicita una evaluación gratuita y recibe un roadmap con prioridades personalizadas.
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
								Solicitar evaluación
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
								Agendar reunión
							</Link>
						</motion.div>
					</div>
				</motion.div>
			</section>
		</main>
	);
}