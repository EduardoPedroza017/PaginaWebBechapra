"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Users, ChevronDown, CheckCircle, Target, TrendingUp, UserPlus, Lightbulb, Rocket } from 'lucide-react';
import ContactForm from '@/app/components/ContactForm';
import Footer from '@/components/Footer';
import Image from 'next/image';

interface AccordionSectionProps {
	title: string;
	isOpen: boolean;
	onClick: () => void;
	children: React.ReactNode;
}

const AccordionSection = ({ title, isOpen, onClick, children }: AccordionSectionProps) => (
	<motion.div
		initial={{opacity: 0, y: 20}}
		whileInView={{opacity: 1, y: 0}}
		viewport={{once: true}}
		style={{
			marginBottom: '1.25rem',
			borderRadius: '16px',
			border: '2px solid rgba(0,61,143,0.15)',
			overflow: 'hidden',
			background: 'white',
			boxShadow: '0 4px 12px rgba(0,61,143,0.06)',
			transition: 'all 0.3s ease'
		}}
	>
		<button
			onClick={onClick}
			style={{
				width: '100%',
				padding: '1.75rem 2rem',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				background: isOpen 
					? 'linear-gradient(135deg, #E8F4FF 0%, #D0E8FF 100%)' 
					: 'linear-gradient(135deg, #FFFFFF 0%, #F8FDFF 100%)',
				border: 'none',
				cursor: 'pointer',
				transition: 'all 0.3s ease',
				fontSize: '1.2rem',
				fontWeight: 800,
				color: '#003d8f',
				textAlign: 'left',
				position: 'relative'
			}}
		>
			{/* Barra decorativa izquierda */}
			<div style={{
				position: 'absolute',
				left: 0,
				top: 0,
				bottom: 0,
				width: '4px',
				background: isOpen 
					? 'linear-gradient(180deg, #003d8f 0%, #004AB7 100%)' 
					: 'transparent',
				transition: 'all 0.3s ease'
			}} />
			
			<span style={{marginLeft: '1rem'}}>{title}</span>
			<motion.div
				animate={{ rotate: isOpen ? 180 : 0 }}
				transition={{ duration: 0.3 }}
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					width: '32px',
					height: '32px',
					borderRadius: '8px',
					background: isOpen ? '#003d8f' : 'rgba(0,61,143,0.1)',
					color: isOpen ? 'white' : '#003d8f',
					transition: 'all 0.3s ease'
				}}
			>
				<ChevronDown size={20} />
			</motion.div>
		</button>
		<motion.div
			initial={false}
			animate={{
				height: isOpen ? 'auto' : 0,
				opacity: isOpen ? 1 : 0
			}}
			transition={{duration: 0.3, ease: 'easeInOut'}}
			style={{overflow: 'hidden'}}
		>
			<div style={{
				padding: '2rem 2rem 2rem 3rem', 
				color: '#666', 
				lineHeight: 1.8,
				background: 'linear-gradient(180deg, rgba(0,61,143,0.02) 0%, white 100%)'
			}}>
				{children}
			</div>
		</motion.div>
	</motion.div>
);

export default function Page() {
	const [openAccordion, setOpenAccordion] = useState<string | null>(null);

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

			{/* Sección de tarjetas: Integración y Team Building, Soft Skills, Desarrollo */}
			<section style={{
				maxWidth: '1280px',
				margin: '0 auto',
				padding: '5rem 1.5rem 3rem'
			}}>
				<motion.h2
					initial={{opacity: 0, y: 20}}
					whileInView={{opacity: 1, y: 0}}
					viewport={{once: true}}
					transition={{duration: 0.6}}
					style={{
						fontSize: 'clamp(2rem, 4vw, 2.8rem)',
						fontWeight: 900,
						color: '#003d8f',
						marginBottom: '3rem',
						textAlign: 'center',
						letterSpacing: '-0.02em'
					}}
				>
					Nuestros Programas de Capacitación
				</motion.h2>
				<div style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
					gap: '2.5rem'
				}}>
					{[
						{
							title: 'Integración y Team Building',
							icon: UserPlus,
							desc: 'Fortalece la cohesión de tu equipo a través de actividades vivenciales.',
							color: '#003d8f'
						},
						{
							title: 'Soft Skills',
							icon: Lightbulb,
							desc: 'Desarrolla habilidades interpersonales clave para el éxito profesional.',
							color: '#004AB7'
						},
						{
							title: 'Competencias Técnicas',
							icon: Rocket,
							desc: 'Programas especializados para dominar herramientas y procesos.',
							color: '#0056d4'
						}
					].map((item, i) => {
						const Icon = item.icon;
						return (
							<motion.div
								key={i}
								initial={{opacity: 0, y: 30}}
								whileInView={{opacity: 1, y: 0}}
								viewport={{once: true}}
								transition={{duration: 0.5, delay: i * 0.15}}
								whileHover={{
									y: -12,
									scale: 1.03,
									transition: {duration: 0.3}
								}}
								style={{
									padding: '2.5rem 2rem',
									borderRadius: '20px',
									background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FDFF 100%)',
									border: '2px solid rgba(0,61,143,0.12)',
									textAlign: 'center',
									boxShadow: '0 10px 30px rgba(0,61,143,0.08)',
									cursor: 'pointer',
									position: 'relative',
									overflow: 'hidden',
									transition: 'all 0.3s ease'
								}}
							>
								{/* Decorative gradient bar */}
								<div style={{
									position: 'absolute',
									top: 0,
									left: 0,
									right: 0,
									height: '4px',
									background: `linear-gradient(90deg, ${item.color} 0%, ${item.color}99 100%)`,
									borderRadius: '20px 20px 0 0'
								}} />

								{/* Icon container */}
								<motion.div
									initial={{scale: 0}}
									whileInView={{scale: 1}}
									viewport={{once: true}}
									transition={{duration: 0.5, delay: i * 0.15 + 0.2, type: 'spring'}}
									style={{
										width: '80px',
										height: '80px',
										background: `linear-gradient(135deg, ${item.color}15 0%, ${item.color}08 100%)`,
										borderRadius: '16px',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										margin: '0 auto 1.5rem',
										border: `2px solid ${item.color}20`
									}}
								>
									<Icon size={36} style={{color: item.color}} />
								</motion.div>

								<h3 style={{
									fontSize: '1.35rem',
									fontWeight: 800,
									color: item.color,
									margin: '0 0 1rem 0',
									lineHeight: 1.3
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

								{/* Shine effect on hover */}
								<motion.div
									initial={{opacity: 0}}
									whileHover={{opacity: 1}}
									style={{
										position: 'absolute',
										inset: 0,
										background: `radial-gradient(circle at 50% 50%, ${item.color}08 0%, transparent 70%)`,
										borderRadius: '20px',
										pointerEvents: 'none'
									}}
								/>
							</motion.div>
						);
					})}
				</div>
			</section>

			{/* Cómo Trabajamos */}
			<section style={{
				maxWidth: '1280px',
				margin: '0 auto',
				padding: '4rem 1.5rem',
				display: 'grid',
				gridTemplateColumns: '1fr 1fr',
				gap: '4rem',
				alignItems: 'center'
			}}>
				<motion.div
					initial={{opacity: 0, x: -30}}
					whileInView={{opacity: 1, x: 0}}
					viewport={{once: true}}
					transition={{duration: 0.7}}
				>
					<div style={{
						width: '100%',
						height: '400px',
						background: 'linear-gradient(135deg, #E8F4FF 0%, #D0E8FF 100%)',
						borderRadius: '20px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'relative',
						overflow: 'hidden',
						border: '2px solid rgba(0,61,143,0.1)'
					}}>
						<Image
							src="/imagen/servicos/servicios-especializados.jpg"
							alt="Cómo Trabajamos"
							fill
							style={{objectFit: 'cover'}}
						/>
					</div>
				</motion.div>

				<motion.div
					initial={{opacity: 0, x: 30}}
					whileInView={{opacity: 1, x: 0}}
					viewport={{once: true}}
					transition={{duration: 0.7}}
				>
					<h2 style={{
						fontSize: 'clamp(2rem, 4vw, 2.5rem)',
						fontWeight: 900,
						color: '#003d8f',
						marginBottom: '1.5rem',
						letterSpacing: '-0.02em'
					}}>
						Cómo Trabajamos
					</h2>
					<p style={{
						fontSize: '1.05rem',
						color: '#666',
						lineHeight: 1.8,
						marginBottom: '1.5rem'
					}}>
						Nuestro enfoque se centra en la participación activa y el aprendizaje vivencial. A través de ejercicios prácticos y dinámicos, nuestros especialistas guían a tu equipo en un viaje de descubrimiento y desarrollo personal y profesional.
					</p>
					<div style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '0.75rem'
					}}>
						{[
							'Adaptamos cada programa con necesidades específicas',
							'Garantizamos experiencia de aprendizaje personalizada y efectiva.'
						].map((item, i) => (
							<div key={i} style={{
								display: 'flex',
								alignItems: 'flex-start',
								gap: '0.75rem'
							}}>
								<CheckCircle size={24} style={{color: '#003d8f', flexShrink: 0, marginTop: '2px'}} />
								<span style={{fontSize: '0.95rem', color: '#666', lineHeight: 1.6}}>{item}</span>
							</div>
						))}
					</div>
				</motion.div>
			</section>

			{/* Sección con 3 beneficios */}
			<section style={{
				maxWidth: '1280px',
				margin: '0 auto',
				padding: '4rem 1.5rem'
			}}>
				<div style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
					gap: '2.5rem'
				}}>
					{[
						{title: 'Conjunto de habilidades técnicas y soft skills mejoradas', icon: Target},
						{title: 'Mayor entendimiento y aprecio por la importancia del trabajo en equipo y colaboración', icon: Users},
						{title: 'Mentalidad orientada hacia el crecimiento e innovación', icon: TrendingUp}
					].map((benefit, i) => (
						<motion.div
							key={i}
							initial={{opacity: 0, y: 30}}
							whileInView={{opacity: 1, y: 0}}
							viewport={{once: true}}
							transition={{duration: 0.5, delay: i * 0.1}}
							style={{
								padding: '2.5rem 2rem',
								borderRadius: '16px',
								background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FDFF 100%)',
								border: '2px solid rgba(0,61,143,0.1)',
								textAlign: 'center',
								boxShadow: '0 8px 24px rgba(0,61,143,0.08)'
							}}
						>
							<benefit.icon size={40} style={{color: '#003d8f', margin: '0 auto 1rem'}} />
							<h3 style={{
								fontSize: '1.15rem',
								fontWeight: 700,
								color: '#003d8f',
								margin: 0,
								lineHeight: 1.4
							}}>
								{benefit.title}
							</h3>
						</motion.div>
					))}
				</div>
			</section>

			{/* Mejora el rendimiento */}
			<section style={{
				maxWidth: '1280px',
				margin: '0 auto',
				padding: '4rem 1.5rem',
				display: 'grid',
				gridTemplateColumns: '1fr 1fr',
				gap: '4rem',
				alignItems: 'center'
			}}>
				<motion.div
					initial={{opacity: 0, x: -30}}
					whileInView={{opacity: 1, x: 0}}
					viewport={{once: true}}
					transition={{duration: 0.7}}
				>
					<h2 style={{
						fontSize: 'clamp(2rem, 4vw, 2.5rem)',
						fontWeight: 900,
						color: '#1a1a1a',
						marginBottom: '1.5rem',
						letterSpacing: '-0.02em'
					}}>
						Mejora el rendimiento de tu equipo
					</h2>
					<p style={{
						fontSize: '1.05rem',
						color: '#666',
						lineHeight: 1.8,
						marginBottom: '2rem'
					}}>
						Nuestros programas están diseñados para mejorar el desempeño individual y colectivo, aumentando la productividad y eficiencia de tu empresa.
					</p>
					<p style={{
						fontSize: '1.15rem',
						color: '#003d8f',
						fontWeight: 700,
						fontStyle: 'italic'
					}}>
						¡Convierte a tu equipo en un motor de éxito!
					</p>
					<Link
						href="#contacto"
						style={{
							display: 'inline-block',
							marginTop: '2rem',
							padding: '1rem 2.5rem',
							borderRadius: '12px',
							background: 'linear-gradient(135deg, #003d8f 0%, #004AB7 100%)',
							color: 'white',
							fontWeight: 700,
							fontSize: '1rem',
							textDecoration: 'none',
							boxShadow: '0 8px 24px rgba(0,61,143,0.25)',
							transition: 'all 0.3s ease'
						}}
					>
						COMIENZA AHORA →
					</Link>
				</motion.div>

				<motion.div
					initial={{opacity: 0, x: 30}}
					whileInView={{opacity: 1, x: 0}}
					viewport={{once: true}}
					transition={{duration: 0.7}}
				>
					<div style={{
						width: '100%',
						height: '400px',
						background: 'linear-gradient(135deg, #E8F4FF 0%, #D0E8FF 100%)',
						borderRadius: '20px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'relative',
						overflow: 'hidden',
						border: '2px solid rgba(0,61,143,0.1)'
					}}>
						<Image
							src="/imagen/servicos/Capital_Humano_FInal.jpg"
							alt="Mejora el rendimiento"
							fill
							style={{objectFit: 'cover'}}
						/>
					</div>
				</motion.div>
			</section>

			{/* Acordeones */}
			<section style={{
				maxWidth: '900px',
				margin: '0 auto',
				padding: '4rem 1.5rem'
			}}>
				<motion.h2
					initial={{opacity: 0, y: 20}}
					whileInView={{opacity: 1, y: 0}}
					viewport={{once: true}}
					transition={{duration: 0.6}}
					style={{
						fontSize: 'clamp(2rem, 4vw, 2.8rem)',
						fontWeight: 900,
						color: '#003d8f',
						marginBottom: '2.5rem',
						textAlign: 'center',
						letterSpacing: '-0.02em'
					}}
				>
					Explora Nuestros Cursos
				</motion.h2>

				<AccordionSection
					title="Competencias y habilidades técnicas"
					isOpen={openAccordion === 'competencias'}
					onClick={() => setOpenAccordion(openAccordion === 'competencias' ? null : 'competencias')}
				>
					<p style={{marginBottom: '1rem', fontSize: '1rem', color: '#555'}}>
						Ofrecemos cursos, talleres y seminarios enfocados en desarrollar competencias especializadas en tu equipo:
					</p>
					<ul style={{paddingLeft: '1.5rem', lineHeight: 2, color: '#666'}}>
						<li>Estrategia y dirección.</li>
						<li>Ventas y negociación.</li>
						<li>Design Thinking.</li>
						<li>Gestión de proyectos.</li>
						<li>Innovación y modelos de negocios.</li>
						<li>Estrategias de Contabilidad y Finanzas.</li>
						<li>Dirección en Recursos Humanos.</li>
						<li>Análisis de riesgos.</li>
						<li>Programación neurolingüística.</li>
						<li>Coaching.</li>
					</ul>
				</AccordionSection>

				<AccordionSection
					title="Soft Skills"
					isOpen={openAccordion === 'softskills'}
					onClick={() => setOpenAccordion(openAccordion === 'softskills' ? null : 'softskills')}
				>
					<p style={{marginBottom: '1rem', fontSize: '1rem', color: '#555'}}>
						Competencias que configuran el comportamiento individual de los profesionales:
					</p>
					<ul style={{paddingLeft: '1.5rem', lineHeight: 2, color: '#666'}}>
						<li>Liderazgo.</li>
						<li>Comunicación.</li>
						<li>Creatividad.</li>
						<li>Resolución de problemas.</li>
						<li>Gestión de tiempo.</li>
						<li>Manejo de estrés.</li>
						<li>Productividad personal.</li>
						<li>Pensamiento crítico.</li>
						<li>Trabajo en equipo.</li>
						<li>Inteligencia emocional.</li>
					</ul>
				</AccordionSection>

				<AccordionSection
					title="Integración y Team building"
					isOpen={openAccordion === 'teambuilding'}
					onClick={() => setOpenAccordion(openAccordion === 'teambuilding' ? null : 'teambuilding')}
				>
					<p style={{fontSize: '1rem', color: '#555', lineHeight: 1.8}}>
						A través de ejercicios de aprendizaje vivencial desarrollados por especialistas, ayudamos a mejorar la comunicación interpersonal, la toma de decisiones y el conocimiento interior, para trabajar en equipo. Este servicio requiere de la participación activa de tu equipo y puedes elegir entre incluir actividad física fuerte, moderada o nula.
					</p>
				</AccordionSection>
			</section>

			{/* CTA FINAL */}
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
							href="#contacto"
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
							Contactar ahora
						</motion.a>
					</motion.div>
				</div>
			</motion.section>

			{/* Sección de Contacto */}
			<section id="contacto" style={{
				maxWidth: '1280px',
				margin: '0 auto',
				padding: '6rem 1.5rem',
				background: 'linear-gradient(180deg, rgba(0,61,143,0.02) 0%, white 100%)'
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
						¿Interesado en nuestros servicios?
					</h2>
					<p style={{
						fontSize: '1.1rem',
						color: '#666',
						maxWidth: '700px',
						margin: '0 auto',
						lineHeight: 1.7
					}}>
						Envíanos un mensaje con los detalles y estaremos encantados de ayudarte.
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
						boxShadow: '0 10px 40px rgba(0,61,143,0.08)',
						border: '1px solid rgba(0,61,143,0.08)'
					}}
				>
					<ContactForm />
				</motion.div>
			</section>

			{/* Footer */}
			<Footer />
		</main>
	);
}