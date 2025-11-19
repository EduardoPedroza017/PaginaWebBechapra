"use client";

import React from 'react';
import { motion } from "framer-motion";
import Link from "next/link";
import { Gavel, FileText, Users, ShieldCheck, ChevronLeft } from 'lucide-react';

const services = [
	{icon: Gavel, title: 'Asesoría mercantil', desc: 'Constitución, contratos y gobierno corporativo para empresas en crecimiento.'},
	{icon: ShieldCheck, title: 'Cumplimiento y regulatorio', desc: 'Políticas internas, cumplimiento normativo y defensa administrativa.'},
	{icon: FileText, title: 'Contratación laboral y seguridad', desc: 'Asesoría en contratos laborales, políticas y desvinculaciones con enfoque preventivo.'},
	{icon: Users, title: 'Protección de datos y privacidad', desc: 'Avisos de privacidad, contratos con proveedores y buenas prácticas para datos personales.'},
];

export default function Page() {
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
						<ChevronLeft size={18} /> Volver
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
								Servicios <span style={{background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Legales</span>
							</h1>

							<p style={{
								fontSize: '1.1rem',
								color: 'rgba(255,255,255,0.9)',
								lineHeight: 1.7,
								marginBottom: '2.5rem'
							}}>
								Protege tu negocio con asesoría legal práctica enfocada en prevención y cumplimiento normativo.
							</p>

							<div style={{
								display: 'flex',
								gap: '1.5rem',
								marginBottom: '2.5rem',
								flexWrap: 'wrap'
							}}>
								<div style={{
									display: 'flex',
									flexDirection: 'column',
									gap: '0.25rem'
								}}>
									<strong style={{fontSize: '1.5rem', color: '#FFD700'}}>+300</strong>
									<span style={{fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)'}}>Casos atendidos</span>
								</div>
								<div style={{
									display: 'flex',
									flexDirection: 'column',
									gap: '0.25rem'
								}}>
									<strong style={{fontSize: '1.5rem', color: '#FFD700'}}>8+</strong>
									<span style={{fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)'}}>Años de experiencia</span>
								</div>
							</div>

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
									Solicitar asesoría →
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
							⚖️
						</motion.div>
					</div>
				</div>
			</section>

			{/* Servicios Section */}
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

			{/* Packages Section */}
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
					Paquetes y modalidades
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
						{name: 'Retainer básico', price: 'MXN 6,500 / mes', desc: 'Soporte legal continuado: revisiones contractuales y consultas mensuales.'},
						{name: 'Proyecto puntual', price: 'Desde MXN 12,000', desc: 'Contratos, políticas o auditoría legal por proyecto con entregables claros.'},
						{name: 'Soporte completo', price: 'A cotizar', desc: 'Paquete a medida con representación, gestión de riesgos y capacitación a equipo.'}
					].map((pkg, i) => (
						<motion.div
							key={i}
							initial={{opacity: 0, y: 30}}
							whileInView={{opacity: 1, y: 0}}
							viewport={{once: true}}
							transition={{duration: 0.5, delay: i * 0.1}}
							style={{
								padding: '2.5rem 2rem',
								borderRadius: '16px',
								background: 'linear-gradient(135deg, #F0F9FF 0%, #E8F5FF 100%)',
								border: '2px solid rgba(0,61,143,0.12)',
								transition: 'all 0.3s ease'
							}}
						>
							<h3 style={{
								fontSize: '1.1rem',
								fontWeight: 800,
								color: '#003d8f',
								marginBottom: '0.5rem'
							}}>
								{pkg.name}
							</h3>
							<div style={{
								fontSize: '1.4rem',
								fontWeight: 900,
								color: '#0056d4',
								marginBottom: '1rem'
							}}>
								{pkg.price}
							</div>
							<p style={{
								fontSize: '0.95rem',
								color: '#666',
								lineHeight: 1.6,
								margin: 0
							}}>
								{pkg.desc}
							</p>
						</motion.div>
					))}
				</motion.div>
			</section>

			{/* Timeline Section */}
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
					Cómo trabajamos
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
						{step: '01', title: 'Diagnóstico', desc: 'Revisión rápida para identificar prioridades y riesgos.'},
						{step: '02', title: 'Plan de trabajo', desc: 'Propuesta con fases, entregables y cronograma.'},
						{step: '03', title: 'Ejecución', desc: 'Implementación, capacitación y soporte continuo.'}
					].map((item, i) => (
						<motion.div
							key={i}
							initial={{opacity: 0, y: 30}}
							whileInView={{opacity: 1, y: 0}}
							viewport={{once: true}}
							transition={{duration: 0.5, delay: i * 0.1}}
							style={{
								display: 'flex',
								gap: '1.5rem',
								padding: '2rem',
								borderRadius: '12px',
								background: 'linear-gradient(135deg, #F0F9FF 0%, #E8F5FF 100%)',
								border: '1px solid rgba(0,61,143,0.1)'
							}}
						>
							<div style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								width: '60px',
								height: '60px',
								background: 'linear-gradient(135deg, #003d8f 0%, #004AB7 100%)',
								color: 'white',
								borderRadius: '12px',
								fontWeight: 900,
								fontSize: '1.3rem',
								flexShrink: 0
							}}>
								{item.step}
							</div>
							<div>
								<h4 style={{
									fontSize: '1.1rem',
									fontWeight: 800,
									color: '#003d8f',
									marginBottom: '0.5rem'
								}}>
									{item.title}
								</h4>
								<p style={{
									fontSize: '0.95rem',
									color: '#666',
									margin: 0,
									lineHeight: 1.5
								}}>
									{item.desc}
								</p>
							</div>
						</motion.div>
					))}
				</motion.div>
			</section>

			{/* FAQ Section */}
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
						marginBottom: '1.5rem',
						letterSpacing: '-0.02em',
						textAlign: 'center'
					}}
				>
					Preguntas frecuentes
				</motion.h2>

				<motion.div
					initial={{opacity: 0, y: 40}}
					whileInView={{opacity: 1, y: 0}}
					viewport={{once: true}}
					transition={{duration: 0.6}}
					style={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr',
						gap: '4rem',
						alignItems: 'start'
					}}
				>
					{/* Left Column - FAQs */}
					<div>
						<h3 style={{
							fontSize: '1.3rem',
							fontWeight: 700,
							color: '#003d8f',
							marginBottom: '2rem'
						}}>
							Dudas comunes
						</h3>
						{[
							{q: '¿Pueden acompañar procesos judiciales?', a: 'Sí, trabajamos con despachos asociados y coordinamos la defensa o representación según el alcance que requiera tu empresa.'},
							{q: '¿Qué tan rápido implementan políticas internas?', a: 'Dependiendo del tamaño, en 2 a 6 semanas podemos tener políticas y procedimientos implementados con capacitación al personal clave.'},
							{q: '¿Ofrecen servicios por proyecto o retainer?', a: 'Ambos: paquetes por proyecto y retainer mensual para soporte continuo y asesoría preventiva.'}
						].map((faq, i) => (
							<FAQItem key={i} question={faq.q} answer={faq.a} index={i} />
						))}
					</div>

					{/* Right Column - Benefits */}
					<div>
						<h3 style={{
							fontSize: '1.3rem',
							fontWeight: 700,
							color: '#003d8f',
							marginBottom: '2rem'
						}}>
							Beneficios clave
						</h3>
						<motion.div
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: '1.5rem'
							}}
						>
							{[
								{icon: ShieldCheck, title: 'Prevención de riesgos', desc: 'Identificación proactiva de contingencias legales antes de que escalen.'},
								{icon: Gavel, title: 'Respuesta ágil', desc: 'Atención rápida y estratégica ante requerimientos o notificaciones.'},
								{icon: FileText, title: 'Documentación clara', desc: 'Contratos, políticas y procedimientos formalizados y aplicables.'}
							].map((benefit, i) => {
								const Icon = benefit.icon;
								return (
									<motion.div
										key={i}
										initial={{opacity: 0, y: 20}}
										whileInView={{opacity: 1, y: 0}}
										viewport={{once: true}}
										transition={{duration: 0.5, delay: i * 0.1}}
										whileHover={{scale: 1.05, y: -8}}
										style={{
											padding: '2rem',
											borderRadius: '14px',
											background: i % 2 === 0
												? 'linear-gradient(135deg, #E8F4FF 0%, #D0E8FF 100%)'
												: 'linear-gradient(135deg, #F0F9FF 0%, #E8F5FF 100%)',
											border: '2px solid rgba(0,61,143,0.12)',
											transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
											minHeight: '160px',
											display: 'flex',
											flexDirection: 'column',
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
											width: '50px',
											height: '50px',
											background: 'linear-gradient(135deg, #003d8f 0%, #004AB7 100%)',
											borderRadius: '10px',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											marginBottom: '1rem',
											color: 'white',
											fontSize: '1.5rem',
											position: 'relative',
											zIndex: 2,
											flexShrink: 0
										}}>
											<Icon size={28} />
										</div>

										<div style={{position: 'relative', zIndex: 2, flex: 1}}>
											<h4 style={{
												fontSize: '1.1rem',
												fontWeight: 800,
												color: '#003d8f',
												marginBottom: '0.5rem'
											}}>
												{benefit.title}
											</h4>

											<p style={{
												fontSize: '0.9rem',
												color: '#666',
												lineHeight: 1.5,
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
												borderRadius: '14px',
												pointerEvents: 'none'
											}}
										/>
									</motion.div>
								);
							})}
						</motion.div>
					</div>
				</motion.div>
			</section>

			{/* Testimonial Section */}
			<section style={{
				maxWidth: '1280px',
				margin: '0 auto',
				padding: '5rem 1.5rem'
			}}>
				<motion.div
					initial={{opacity: 0, y: 30}}
					whileInView={{opacity: 1, y: 0}}
					viewport={{once: true}}
					transition={{duration: 0.6}}
					style={{
						padding: '3rem 2.5rem',
						borderRadius: '16px',
						background: 'linear-gradient(135deg, #E8F4FF 0%, #D0E8FF 100%)',
						border: '2px solid rgba(0,61,143,0.1)',
						textAlign: 'center'
					}}
				>
					<div style={{
						width: '70px',
						height: '70px',
						background: 'linear-gradient(135deg, #003d8f 0%, #004AB7 100%)',
						borderRadius: '50%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						margin: '0 auto 1.5rem',
						color: 'white',
						fontSize: '1.8rem',
						fontWeight: 900
					}}>
						MO
					</div>

				<blockquote style={{
					fontSize: '1.25rem',
					fontStyle: 'italic',
					color: '#003d8f',
					marginBottom: '1.5rem'
				}}>
					&ldquo;La asesoría preventiva nos ayudó a reducir contingencias y a formalizar procesos clave en la operación.&rdquo;
				</blockquote>					<cite style={{
						fontSize: '1rem',
						fontStyle: 'normal',
						color: '#666',
						fontWeight: 600
					}}>
						— M. Ortega, Dirección Legal
					</cite>
				</motion.div>
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
						¿Listo para reducir riesgos legales?
					</h2>

					<p style={{
						fontSize: '1.15rem',
						color: 'rgba(255,255,255,0.9)',
						marginBottom: '2.5rem',
						lineHeight: 1.6
					}}>
						Hablemos: proponemos un plan legal inicial personalizado para tu empresa.
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
								Contactar ahora
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
								Solicitar evaluación
							</Link>
						</motion.div>
					</div>
				</motion.div>
			</section>
		</main>
	);
}

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
					style={{
						color: '#666'
					}}
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