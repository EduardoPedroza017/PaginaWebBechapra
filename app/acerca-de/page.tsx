"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Users, Target, Zap, Award, TrendingUp, Heart, Shield, Briefcase, Handshake } from 'lucide-react';

export default function AcercaDePage() {
	return (
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
					{[
						{icon: Target, title: 'Misión', desc: 'Impulsar el crecimiento y éxito de las organizaciones a través de soluciones integrales en Capital Humano, Desarrollo Organizacional y Management Services.'},
						{icon: Award, title: 'Visión', desc: 'Ser la empresa líder en soluciones empresariales, reconocida por nuestra excelencia, innovación y compromiso con el éxito de nuestros clientes.'},
						{icon: Heart, title: 'Valores', desc: 'Integridad, transparencia, compromiso, innovación y pasión por el éxito de nuestros clientes son nuestros pilares fundamentales.'}
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
										{item.desc}
									</p>
								</div>
							</motion.div>
						);
					})}
				</motion.div>
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

			{/* Stats Section */}
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
						gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
						gap: '2.5rem',
						textAlign: 'center'
					}}
				>
					{[
						{number: '500+', label: 'Empresas atendidas'},
						{number: '15+', label: 'Años de experiencia'},
						{number: '95%', label: 'Satisfacción de clientes'},
						{number: '8', label: 'Servicios especializados'}
					].map((stat, i) => (
						<motion.div
							key={i}
							initial={{opacity: 0, scale: 0.8}}
							whileInView={{opacity: 1, scale: 1}}
							viewport={{once: true}}
							transition={{duration: 0.5, delay: i * 0.1}}
						>
							<div style={{
								fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
								fontWeight: 900,
								color: '#003d8f',
								marginBottom: '0.5rem',
								background: 'linear-gradient(135deg, #003d8f 0%, #0056d4 100%)',
								WebkitBackgroundClip: 'text',
								WebkitTextFillColor: 'transparent'
							}}>
								{stat.number}
							</div>
							<p style={{
								fontSize: '1rem',
								color: '#666',
								margin: 0,
								fontWeight: 600
							}}>
								{stat.label}
							</p>
						</motion.div>
					))}
				</motion.div>
			</section>

			{/* Alianzas Estratégicas Section */}
			<section style={{
				maxWidth: '1280px',
				margin: '0 auto',
				padding: '5rem 1.5rem'
			}}>
				<motion.div
					initial={{opacity: 0, y: 20}}
					whileInView={{opacity: 1, y: 0}}
					viewport={{once: true}}
					transition={{duration: 0.6}}
					style={{
						textAlign: 'center',
						marginBottom: '4rem'
					}}
				>
					<div style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						gap: '1rem',
						marginBottom: '1rem'
					}}>
						<Handshake size={40} style={{color: '#003d8f'}} />
						<h2 style={{
							fontSize: 'clamp(2rem, 4vw, 2.5rem)',
							fontWeight: 900,
							color: '#003d8f',
							letterSpacing: '-0.02em',
							margin: 0
						}}>
							Alianzas Estratégicas
						</h2>
					</div>
					<p style={{
						fontSize: '1.1rem',
						color: '#666',
						maxWidth: '700px',
						margin: '0 auto'
					}}>
						Colaboramos con líderes de la industria para ofrecer soluciones de clase mundial
					</p>
				</motion.div>

				<motion.div
					initial={{opacity: 0, y: 40}}
					whileInView={{opacity: 1, y: 0}}
					viewport={{once: true}}
					transition={{duration: 0.6}}
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
						gap: '2.5rem',
						alignItems: 'center'
					}}
				>
					{[1, 2, 3, 4, 5, 6].map((item, i) => (
						<motion.div
							key={i}
							initial={{opacity: 0, scale: 0.9}}
							whileInView={{opacity: 1, scale: 1}}
							viewport={{once: true}}
							transition={{duration: 0.4, delay: i * 0.1}}
							whileHover={{scale: 1.05, y: -8}}
							style={{
								padding: '2.5rem 2rem',
								borderRadius: '16px',
								background: 'white',
								border: '2px solid rgba(0,61,143,0.12)',
								transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
								boxShadow: '0 12px 35px rgba(0,61,143,0.08)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								minHeight: '150px',
								cursor: 'pointer',
								position: 'relative',
								overflow: 'hidden'
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
									background: 'linear-gradient(90deg, #003d8f 0%, #004AB7 50%, #0056d4 100%)'
								}}
							/>

							{/* Placeholder para logo */}
							<div style={{
								width: '100%',
								height: '80px',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								color: '#003d8f',
								fontSize: '0.9rem',
								fontWeight: 600,
								textAlign: 'center',
								opacity: 0.6
							}}>
								Logo Alianza {item}
							</div>
						</motion.div>
					))}
				</motion.div>
			</section>

			{/* Equipo Bechapra - Organigrama Section */}
			<section style={{
				maxWidth: '1400px',
				margin: '0 auto',
				padding: '5rem 1.5rem'
			}}>
				<motion.div
					initial={{opacity: 0, y: 20}}
					whileInView={{opacity: 1, y: 0}}
					viewport={{once: true}}
					transition={{duration: 0.6}}
					style={{
						textAlign: 'center',
						marginBottom: '4rem'
					}}
				>
					<h2 style={{
						fontSize: 'clamp(2rem, 4vw, 2.5rem)',
						fontWeight: 900,
						color: '#003d8f',
						marginBottom: '1rem',
						letterSpacing: '-0.02em'
					}}>
						Estructura Organizacional
					</h2>
					<p style={{
						fontSize: '1.1rem',
						color: '#666',
						maxWidth: '700px',
						margin: '0 auto'
					}}>
						Nuestro equipo directivo comprometido con la excelencia
					</p>
				</motion.div>

				<motion.div
					initial={{opacity: 0, y: 40}}
					whileInView={{opacity: 1, y: 0}}
					viewport={{once: true}}
					transition={{duration: 0.6}}
					style={{
						background: 'white',
						borderRadius: '24px',
						padding: '4rem 3rem',
						border: '1px solid rgba(0,61,143,0.08)',
						boxShadow: '0 4px 20px rgba(0,61,143,0.06)'
					}}
				>
					{/* NIVEL 1: Dirección General */}
					<motion.div
						initial={{opacity: 0, y: 20}}
						whileInView={{opacity: 1, y: 0}}
						viewport={{once: true}}
						style={{
							display: 'flex',
							justifyContent: 'center',
							marginBottom: '2rem'
						}}
					>
						<div style={{
							background: 'linear-gradient(135deg, #003d8f 0%, #004AB7 100%)',
							padding: '2rem 3.5rem',
							borderRadius: '12px',
							textAlign: 'center',
							minWidth: '320px',
							boxShadow: '0 8px 24px rgba(0,61,143,0.2)',
							position: 'relative'
						}}>
							<div style={{
								width: '70px',
								height: '70px',
								background: 'white',
								borderRadius: '50%',
								margin: '0 auto 1.25rem',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
							}}>
								<Users size={36} style={{color: '#003d8f'}} />
							</div>
							<h3 style={{
								fontSize: '1.25rem',
								fontWeight: 800,
								color: 'white',
								marginBottom: '0.4rem',
								letterSpacing: '-0.01em'
							}}>
								Dirección General
							</h3>
							<div style={{
								width: '40px',
								height: '2px',
								background: 'rgba(255,255,255,0.4)',
								margin: '0.75rem auto',
								borderRadius: '2px'
							}} />
							<p style={{
								fontSize: '0.9rem',
								color: 'rgba(255,255,255,0.9)',
								margin: 0,
								fontWeight: 500
							}}>
								CEO
							</p>
						</div>
					</motion.div>

					{/* Conector vertical */}
					<div style={{
						width: '2px',
						height: '50px',
						background: 'linear-gradient(180deg, rgba(0,61,143,0.3) 0%, rgba(0,61,143,0.1) 100%)',
						margin: '0 auto'
					}} />

					{/* NIVEL 2: Directores de División */}
					<motion.div
						initial={{opacity: 0, y: 20}}
						whileInView={{opacity: 1, y: 0}}
						viewport={{once: true}}
						transition={{delay: 0.2}}
						style={{
							position: 'relative',
							marginBottom: '2rem'
						}}
					>
						{/* Línea horizontal superior conectora */}
						<div style={{
							position: 'absolute',
							top: '0',
							left: '15%',
							right: '15%',
							height: '2px',
							background: 'linear-gradient(90deg, transparent 0%, rgba(0,61,143,0.2) 20%, rgba(0,61,143,0.2) 80%, transparent 100%)',
							zIndex: 0
						}} />

						<div style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(3, 1fr)',
							gap: '2.5rem',
							paddingTop: '50px',
							position: 'relative'
						}}>
							{/* Conectores verticales individuales */}
							{[0, 1, 2].map((i) => (
								<div key={i} style={{
									position: 'absolute',
									width: '2px',
									height: '50px',
									background: 'linear-gradient(180deg, rgba(0,61,143,0.2) 0%, rgba(0,61,143,0.1) 100%)',
									top: '0',
									left: `calc(${(i * 33.333) + 16.666}% - 1px)`,
									zIndex: 0
								}} />
							))}

							{[
								{title: 'Capital Humano', areas: 3},
								{title: 'Management Services', areas: 2},
								{title: 'Servicios Especializados', areas: 1}
							].map((director, i) => (
								<motion.div
									key={i}
									initial={{opacity: 0, y: 20}}
									whileInView={{opacity: 1, y: 0}}
									viewport={{once: true}}
									transition={{delay: 0.3 + i * 0.1}}
									style={{
										background: '#FAFBFC',
										padding: '2rem 1.5rem',
										borderRadius: '12px',
										textAlign: 'center',
										border: '1px solid rgba(0,61,143,0.1)',
										boxShadow: '0 2px 12px rgba(0,61,143,0.06)',
										position: 'relative',
										zIndex: 1
									}}
								>
									<div style={{
										width: '56px',
										height: '56px',
										background: 'linear-gradient(135deg, #003d8f 0%, #004AB7 100%)',
										borderRadius: '50%',
										margin: '0 auto 1rem',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center'
									}}>
										<Briefcase size={26} style={{color: 'white'}} />
									</div>
									<h4 style={{
										fontSize: '1.05rem',
										fontWeight: 800,
										color: '#003d8f',
										marginBottom: '0.5rem',
										lineHeight: 1.3
									}}>
										{director.title}
									</h4>
									<div style={{
										width: '30px',
										height: '2px',
										background: 'rgba(0,61,143,0.2)',
										margin: '0.5rem auto',
										borderRadius: '2px'
									}} />
									<p style={{
										fontSize: '0.8rem',
										color: '#666',
										margin: 0,
										fontWeight: 600
									}}>
										Director de División
									</p>
									<p style={{
										fontSize: '0.75rem',
										color: '#999',
										marginTop: '0.5rem',
										margin: 0
									}}>
										{director.areas} {director.areas === 1 ? 'área' : 'áreas'}
									</p>
								</motion.div>
							))}
						</div>
					</motion.div>

					{/* Conector vertical */}
					<div style={{
						width: '2px',
						height: '40px',
						background: 'linear-gradient(180deg, rgba(0,61,143,0.1) 0%, rgba(0,61,143,0.05) 100%)',
						margin: '0 auto'
					}} />

					{/* NIVEL 3: Líderes de Departamento */}
					<motion.div
						initial={{opacity: 0, y: 20}}
						whileInView={{opacity: 1, y: 0}}
						viewport={{once: true}}
						transition={{delay: 0.4}}
					>
						<div style={{
							textAlign: 'center',
							marginBottom: '2rem'
						}}>
							<h5 style={{
								fontSize: '0.95rem',
								fontWeight: 700,
								color: '#003d8f',
								textTransform: 'uppercase',
								letterSpacing: '0.5px',
								margin: 0
							}}>
								Líderes de Departamento
							</h5>
						</div>

						<div style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
							gap: '1.25rem',
							maxWidth: '1100px',
							margin: '0 auto'
						}}>
							{[
								'Reclutamiento',
								'Nómina',
								'Capacitación',
								'Contabilidad',
								'Legal',
								'Desarrollo Organizacional'
							].map((dept, i) => (
								<motion.div
									key={i}
									initial={{opacity: 0, scale: 0.95}}
									whileInView={{opacity: 1, scale: 1}}
									viewport={{once: true}}
									transition={{delay: 0.5 + i * 0.05}}
									style={{
										background: 'white',
										padding: '1.25rem 1rem',
										borderRadius: '8px',
										textAlign: 'center',
										border: '1px solid rgba(0,61,143,0.08)',
										boxShadow: '0 1px 6px rgba(0,61,143,0.04)',
										transition: 'all 0.2s ease'
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.transform = 'translateY(-4px)';
										e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,61,143,0.12)';
										e.currentTarget.style.borderColor = 'rgba(0,61,143,0.2)';
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.transform = 'translateY(0)';
										e.currentTarget.style.boxShadow = '0 1px 6px rgba(0,61,143,0.04)';
										e.currentTarget.style.borderColor = 'rgba(0,61,143,0.08)';
									}}
								>
									<div style={{
										width: '36px',
										height: '36px',
										background: '#F0F9FF',
										borderRadius: '50%',
										margin: '0 auto 0.75rem',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										border: '1px solid rgba(0,61,143,0.12)'
									}}>
										<Users size={18} style={{color: '#003d8f'}} />
									</div>
									<h6 style={{
										fontSize: '0.9rem',
										fontWeight: 700,
										color: '#003d8f',
										marginBottom: '0.25rem',
										lineHeight: 1.3
									}}>
										{dept}
									</h6>
									<p style={{
										fontSize: '0.7rem',
										color: '#999',
										margin: 0,
										fontWeight: 500
									}}>
										Líder
									</p>
								</motion.div>
							))}
						</div>
					</motion.div>
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

			{/* CTA Final Section */}
			<section style={{
				width: '100vw',
				marginLeft: 'calc(-50vw + 50%)',
				padding: '6rem 1.5rem',
				background: 'linear-gradient(90deg, #003d8f 0%, #004AB7 35%, #004AB7 65%, #0056d4 100%)',
				position: 'relative',
				overflow: 'hidden',
				marginTop: '5rem'
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
						¿Listo para transformar tu empresa?
					</h2>

					<p style={{
						fontSize: '1.15rem',
						color: 'rgba(255,255,255,0.9)',
						marginBottom: '2.5rem',
						lineHeight: 1.6
					}}>
						Conecta con nuestro equipo y descubre cómo podemos acompañarte en tu crecimiento.
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
								Contactar
							</Link>
						</motion.div>

						<motion.div
							whileHover={{scale: 1.05}}
							whileTap={{scale: 0.95}}
						>
							<Link href="/servicios" style={{
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
								Ver servicios
							</Link>
						</motion.div>
					</div>
				</motion.div>
			</section>
		</main>
	);
}