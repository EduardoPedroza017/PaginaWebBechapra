"use client";

import React from 'react';
import { motion } from "framer-motion";
import Link from "next/link";
import Image from 'next/image';
import { Briefcase, Settings, Users } from 'lucide-react';
import Footer from '@/components/Footer';
import ContactForm from '@/app/components/ContactForm';

const SERVICES = [
  { 
    icon: Briefcase, 
    title: 'Servicios Contables', 
    desc: 'Ten una visión clara del presente y futuro contable-fiscal de tu empresa',
    href: '/servicios/servicios-contables'
  },
  { 
    icon: Settings, 
    title: 'Servicios Legales', 
    desc: 'Desde la redacción de contratos sólidos hasta la protección ante cualquier desafío legal',
    href: '/servicios/servicios-legales'
  },
  { 
    icon: Users, 
    title: 'Servicios PyME', 
    desc: 'Confía en nosotros para brindarte el apoyo y la orientación que necesitas para hacer crecer tu pyme de manera segura y exitosa',
    href: '/servicios/servicios-pyme'
  },
];

export default function ManagementServicesPage() {
	const [hoveredBenefit, setHoveredBenefit] = React.useState<number | null>(null);

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
							Soluciones integrales para gestionar y hacer crecer tu <span style={{
								background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
								WebkitBackgroundClip: 'text',
								WebkitTextFillColor: 'transparent',
								backgroundClip: 'text'
							}}>negocio</span>
						</h1>

						<p style={{
							fontSize: '1.15rem',
							color: 'rgba(255,255,255,0.9)',
							lineHeight: 1.6,
							marginBottom: '2rem'
						}}>
							¡Desde el manejo de tus finanzas hasta la protección legal de tu empresa!
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
					Servicios Management Services
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
					{SERVICES.map((service, i) => {
						const Icon = service.icon;
						return (
							<motion.div
								key={i}
								initial={{opacity: 0, y: 30}}
								whileInView={{opacity: 1, y: 0}}
								viewport={{once: true}}
								transition={{duration: 0.5, delay: i * 0.1}}
								whileHover={{scale: 1.03, y: -8}}
								style={{
									padding: '2.5rem 2rem',
									borderRadius: '12px',
									background: '#fff',
									border: '1px solid rgba(0,61,143,0.1)',
									borderLeft: '4px solid #0056d4',
									transition: 'all 0.3s ease',
									boxShadow: '0 4px 20px rgba(0,61,143,0.08)',
									position: 'relative',
									overflow: 'hidden',
									cursor: 'pointer',
									display: 'flex',
									flexDirection: 'column',
									minHeight: '280px'
								}}
							>
								{/* Icono */}
								<div style={{
									width: '65px',
									height: '65px',
									background: '#E8F4FF',
									borderRadius: '12px',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									marginBottom: '1.5rem',
									color: '#003d8f',
									fontSize: '2rem'
								}}>
									<Icon size={32} />
								</div>

								<div style={{flex: 1}}>
									<h3 style={{
										fontSize: '1.25rem',
										fontWeight: 800,
										color: '#1a1a1a',
										marginBottom: '0.75rem'
									}}>
										{service.title}
									</h3>

									<p style={{
										fontSize: '0.95rem',
										color: '#666',
										lineHeight: 1.6,
										margin: 0,
										marginBottom: '1.5rem',
										textAlign: 'justify',
										textJustify: 'inter-word'
									}}>
										{service.desc}
									</p>
								</div>

								{/* Botón Ver más */}
								<Link 
									href={service.href}
									style={{
										display: 'inline-flex',
										alignItems: 'center',
										gap: '0.5rem',
										color: '#0056d4',
										fontWeight: 700,
										fontSize: '0.95rem',
										textDecoration: 'none',
										marginTop: 'auto',
										transition: 'gap 0.2s ease'
									}}
								>
									Ver más →
								</Link>
							</motion.div>
						);
					})}
				</motion.div>
			</section>

			{/* Beneficios Section - Rediseñado con imagen */}
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
					Beneficios Management Services
				</motion.h2>

				{/* Layout 2 columnas: Imagen + Beneficios */}
				<div style={{
					display: 'grid',
					gridTemplateColumns: '1fr 1fr',
					gap: '4rem',
					alignItems: 'center'
				}}>
					{/* Columna izquierda - Imagen con sombra */}
					<motion.div
						initial={{opacity: 0, x: -40}}
						whileInView={{opacity: 1, x: 0}}
						viewport={{once: true}}
						transition={{duration: 0.7}}
						style={{
							position: 'relative',
							height: '600px',
							borderRadius: '24px',
							overflow: 'hidden',
							boxShadow: '0 25px 70px rgba(0,61,143,0.25), 0 10px 30px rgba(0,0,0,0.12)',
							border: '1px solid rgba(0,61,143,0.1)'
						}}
					>
						<Image
							src="/imagen/prueba/management-services-benefits.jpg"
							alt="Beneficios Management Services"
							fill
							style={{objectFit: 'cover'}}
							priority
						/>
						{/* Overlay gradiente */}
						<div style={{
							position: 'absolute',
							inset: 0,
							background: 'linear-gradient(135deg, rgba(0,61,143,0.15) 0%, rgba(0,74,183,0.08) 100%)',
							pointerEvents: 'none'
						}} />
					</motion.div>

					{/* Columna derecha - Beneficios en escalera */}
					<div style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '2rem',
						position: 'relative'
					}}>
						{[
							{
								icon: Briefcase,
								title: 'Acceso Exclusivo BTC',
								desc: 'Accede a nuestra agenda de cursos gratuitos, avalados por el Colegio de Contadores Públicos CDMX.'
							},
							{
								icon: Users,
								title: 'Asesoramiento Personalizado',
								desc: 'Sesiones de asesoramiento personalizado con expertos en contabilidad, legal y/o PyME'
							}
						].map((benefit, i) => {
							const Icon = benefit.icon;
							const isHovered = hoveredBenefit === i;
							
							return (
								<motion.div
									key={i}
									initial={{opacity: 0, x: 40}}
									whileInView={{opacity: 1, x: 0}}
									viewport={{once: true}}
									transition={{duration: 0.6, delay: i * 0.15}}
									whileHover={{scale: 1.03, y: -8}}
									onMouseEnter={() => setHoveredBenefit(i)}
									onMouseLeave={() => setHoveredBenefit(null)}
									style={{
										padding: '2.5rem',
										borderRadius: '20px',
										background: isHovered 
											? 'linear-gradient(135deg, #003d8f 0%, #004AB7 100%)' 
											: 'linear-gradient(135deg, #FFFFFF 0%, #F8FDFF 100%)',
										border: isHovered 
											? '2px solid rgba(255,255,255,0.2)' 
											: '2px solid rgba(0,61,143,0.12)',
										boxShadow: isHovered 
											? '0 20px 50px rgba(0,61,143,0.35)' 
											: '0 12px 35px rgba(0,61,143,0.08)',
										position: 'relative',
										overflow: 'hidden',
										cursor: 'pointer',
										transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
										marginLeft: i === 1 ? '60px' : '0', // Efecto escalera
										zIndex: isHovered ? 10 : 1
									}}
								>
									{/* Borde izquierdo decorativo */}
									<div style={{
										position: 'absolute',
										left: 0,
										top: 0,
										bottom: 0,
										width: '6px',
										background: isHovered 
											? 'linear-gradient(180deg, #FFD700 0%, #FFA500 100%)'
											: 'linear-gradient(180deg, #003d8f 0%, #004AB7 50%, #0056d4 100%)',
										borderTopLeftRadius: '20px',
										borderBottomLeftRadius: '20px',
										transition: 'all 0.4s ease'
									}} />

									{/* Contenido */}
									<div style={{
										display: 'flex',
										alignItems: 'flex-start',
										gap: '1.5rem',
										position: 'relative',
										zIndex: 2
									}}>
										{/* Icono */}
										<div style={{
											width: '70px',
											height: '70px',
											minWidth: '70px',
											background: isHovered 
												? 'rgba(255,255,255,0.2)' 
												: 'linear-gradient(135deg, #E8F4FF 0%, #D0E8FF 100%)',
											borderRadius: '16px',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											border: isHovered 
												? '1.5px solid rgba(255,255,255,0.3)' 
												: '1.5px solid rgba(0,61,143,0.15)',
											color: isHovered ? '#FFFFFF' : '#003d8f',
											transition: 'all 0.4s ease'
										}}>
											<Icon size={36} strokeWidth={2.5} />
										</div>

										{/* Texto */}
										<div style={{flex: 1}}>
											<h3 style={{
												fontSize: '1.35rem',
												fontWeight: 800,
												color: isHovered ? '#FFFFFF' : '#003d8f',
												marginBottom: '0.75rem',
												lineHeight: 1.3,
												transition: 'color 0.4s ease'
											}}>
												{benefit.title}
											</h3>

											<p style={{
												fontSize: '1rem',
												color: isHovered ? 'rgba(255,255,255,0.95)' : '#555',
												lineHeight: 1.7,
												margin: 0,
												textAlign: 'justify',
												transition: 'color 0.4s ease'
											}}>
												{benefit.desc}
											</p>
										</div>
									</div>

									{/* Efecto brillo al hover */}
									<motion.div
										animate={{opacity: isHovered ? 0.15 : 0}}
										style={{
											position: 'absolute',
											inset: 0,
											background: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.4) 0%, transparent 60%)',
											borderRadius: '20px',
											pointerEvents: 'none',
											transition: 'opacity 0.4s ease'
										}}
									/>
								</motion.div>
							);
						})}
					</div>
				</div>
			</section>

			{/* CTA Section - Dark Theme */}
			<section style={{
				width: '100vw',
				marginLeft: 'calc(-50vw + 50%)',
				padding: '5rem 1.5rem',
				background: 'linear-gradient(135deg, #1a1a2e 0%, #0f0f1e 50%, #1a1a2e 100%)',
				position: 'relative',
				overflow: 'hidden'
			}}>
				<div style={{
					maxWidth: '1280px',
					margin: '0 auto',
					position: 'relative',
					zIndex: 2,
					padding: '0 2rem'
				}}>
					<div style={{
						display: 'grid',
						gridTemplateColumns: '1fr 520px',
						gap: '3rem',
						alignItems: 'center',
						padding: '0'
					}}>
						{/* Left Content */}
						<motion.div
							initial={{opacity: 0, x: -30}}
							whileInView={{opacity: 1, x: 0}}
							viewport={{once: true}}
							transition={{duration: 0.7}}
						>
							<h2 style={{
								fontSize: 'clamp(2rem, 4vw, 2.8rem)',
								fontWeight: 900,
								color: 'white',
								marginBottom: '1.25rem',
								lineHeight: 1.2,
								letterSpacing: '-0.02em'
							}}>
								Todos los servicios en un solo lugar
							</h2>

							<p style={{
								fontSize: '1.1rem',
								color: 'rgba(255, 255, 255, 0.85)',
								marginBottom: '2.5rem',
								lineHeight: 1.65
							}}>
								Solicita una reunión para más información
							</p>

							<div style={{
								display: 'flex',
								gap: '1rem',
								flexWrap: 'wrap'
							}}>
								<motion.div
									whileHover={{scale: 1.05}}
									whileTap={{scale: 0.95}}
								>
									<Link href="/#contacto" style={{
										display: 'inline-block',
										padding: '1rem 2.5rem',
										background: '#0B62FF',
										color: 'white',
										borderRadius: '12px',
										fontWeight: 700,
										fontSize: '1rem',
										textDecoration: 'none',
										transition: 'all 0.3s ease',
										boxShadow: '0 8px 25px rgba(11, 98, 255, 0.3)',
										minWidth: '220px',
										textAlign: 'center'
									}}>
										Solicitar reunión
									</Link>
								</motion.div>

								<motion.div
									whileHover={{scale: 1.05}}
									whileTap={{scale: 0.95}}
								>
									<Link href="/servicios" style={{
										display: 'inline-block',
										padding: '1rem 2.5rem',
										background: 'transparent',
										color: 'white',
										borderRadius: '12px',
										fontWeight: 700,
										fontSize: '1rem',
										textDecoration: 'none',
										border: '2px solid rgba(255, 255, 255, 0.3)',
										transition: 'all 0.3s ease',
										minWidth: '220px',
										textAlign: 'center'
									}}>
										Ver servicios
									</Link>
								</motion.div>
							</div>
						</motion.div>

						{/* Right Image */}
						<motion.div
							initial={{opacity: 0, x: 30}}
							whileInView={{opacity: 1, x: 0}}
							viewport={{once: true}}
							transition={{duration: 0.7, delay: 0.2}}
							style={{
								display: 'flex',
								justifyContent: 'flex-end',
								alignItems: 'center'
							}}
						>
							<div style={{
								width: '100%',
								maxWidth: '520px',
								height: '300px',
								borderRadius: '18px',
								overflow: 'hidden',
								boxShadow: '0 28px 60px rgba(0, 0, 0, 0.4)',
								position: 'relative'
							}}>
								<Image
									src="/imagen/contacto/contacto-men.avif"
									alt="Management Services"
									width={520}
									height={300}
									quality={95}
									priority
									style={{
										width: '100%',
										height: '100%',
										objectFit: 'cover',
										display: 'block'
									}}
								/>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Contact Form Section */}
			<section style={{
				padding: '5rem 1.5rem',
				background: '#f8f9fa'
			}}>
				<motion.h2 
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					style={{
						fontSize: 'clamp(2rem, 4vw, 2.5rem)',
						fontWeight: 900,
						color: '#003d8f',
						marginBottom: '3rem',
						letterSpacing: '-0.02em',
						textAlign: 'center'
					}}
				>		
					Contáctanos
				</motion.h2>
				<ContactForm />
			</section>

			<Footer />
		</main>
	);
}