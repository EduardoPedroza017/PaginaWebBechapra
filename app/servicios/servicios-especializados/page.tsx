"use client";

import React, { useState } from "react";
import { Briefcase, Building2, Users, ShieldCheck, Globe2, Wrench, BarChart3, TrendingUp, Award, Clock, ChevronRight, ChevronLeft } from "lucide-react";

const servicios = [
	{
		icon: Briefcase,
		title: "Administración de personal externo",
		desc: "Gestión integral de talento para proyectos, outsourcing y servicios temporales.",
		color: "#0057D9"
	},
	{
		icon: Building2,
		title: "Servicios por industria",
		desc: "Soluciones especializadas para manufactura, retail, logística, salud, TI y más.",
		color: "#004AB7"
	},
	{
		icon: Users,
		title: "Reclutamiento especializado",
		desc: "Búsqueda y selección de perfiles técnicos, ejecutivos y operativos a la medida.",
		color: "#0057D9"
	},
	{
		icon: ShieldCheck,
		title: "Cumplimiento normativo",
		desc: "Aseguramos procesos alineados a la ley y regulaciones de cada sector.",
		color: "#004AB7"
	},
	{
		icon: Globe2,
		title: "Servicios internacionales",
		desc: "Gestión de personal y nómina para empresas globales o con operaciones en México.",
		color: "#0057D9"
	},
	{
		icon: Wrench,
		title: "Soluciones a la medida",
		desc: "Diseño de esquemas y servicios según el giro, tamaño y retos de tu empresa.",
		color: "#004AB7"
	},
	{
		icon: BarChart3,
		title: "Consultoría y optimización",
		desc: "Diagnóstico, mejora de procesos y asesoría en recursos humanos y nómina.",
		color: "#0057D9"
	},
];

const stats = [
	{ value: "20+", label: "Años de experiencia", icon: Award },
	{ value: "500+", label: "Empresas satisfechas", icon: TrendingUp },
	{ value: "24/7", label: "Soporte dedicado", icon: Clock },
	{ value: "98%", label: "Tasa de retención", icon: ShieldCheck }
];

export default function ServiciosEspecializadosPage() {
	const [hoveredCard, setHoveredCard] = useState<number | null>(null);

	return (
		<div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)' }}>
			{/* HERO SECTION - Igual a /servicios */}
			<section style={{
				position: 'relative',
				padding: '4rem 0 5rem',
				background: 'linear-gradient(90deg, #003d8f 0%, #004AB7 35%, #004AB7 65%, #0056d4 100%)',
				overflow: 'hidden',
				width: '100vw',
				marginLeft: 'calc(-50vw + 50%)'
			}}>
				{/* Overlay decorativo */}
				<div style={{
					content: '',
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					background: 'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.1) 0%, transparent 40%), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.08) 0%, transparent 40%)',
					pointerEvents: 'none'
				}} />

				<div style={{
					position: 'relative',
					zIndex: 1,
					display: 'grid',
					gridTemplateColumns: '1.2fr 1fr',
					gap: '3rem',
					alignItems: 'center',
					maxWidth: '1280px',
					margin: '0 auto',
					padding: '0 1.5rem'
				}}>
					{/* Columna de Texto */}
					<div style={{ maxWidth: '600px' }}>
						<a href="/servicios" style={{
							display: 'inline-flex',
							alignItems: 'center',
							gap: '0.5rem',
							background: 'rgba(255,255,255,0.15)',
							backdropFilter: 'blur(10px)',
							color: 'white',
							padding: '0.6rem 1.2rem',
							borderRadius: '50px',
							border: '1px solid rgba(255,255,255,0.3)',
							fontSize: '0.95rem',
							fontWeight: 600,
							cursor: 'pointer',
							transition: 'all 0.3s ease',
							textDecoration: 'none',
							marginBottom: '1.5rem'
						}}>
							<ChevronLeft size={18} />
							Volver
						</a>
						<h1 style={{
							fontSize: '3rem',
							fontWeight: 800,
							lineHeight: 1.1,
							color: '#FFFFFF',
							margin: '0 0 1rem 0',
							letterSpacing: '-0.02em'
						}}>
							Servicios Especializados
						</h1>
						<p style={{
							fontSize: '1.15rem',
							lineHeight: 1.6,
							color: 'rgba(255,255,255,0.85)',
							margin: '0 0 2rem 0',
							maxWidth: '540px'
						}}>
							Soluciones modernas y seguras para el sector financiero: optimizamos procesos de talento, nómina y cumplimiento para que tu organización mantenga foco en el crecimiento.
						</p>
						<a href="/contacto" style={{
							display: 'inline-flex',
							alignItems: 'center',
							gap: '0.75rem',
							padding: '0.875rem 1.75rem',
							background: 'linear-gradient(135deg, #FFFFFF 0%, #F0F4FF 100%)',
							color: '#004AB7',
							fontWeight: 700,
							fontSize: '1rem',
							borderRadius: '9999px',
							textDecoration: 'none',
							boxShadow: '0 10px 30px rgba(255,255,255,0.2), 0 1px 2px rgba(0,0,0,0.1)',
							transition: 'all 0.3s cubic-bezier(0.2,0.9,0.2,1)',
							border: '2px solid rgba(255,255,255,0.3)'
						}}>
							Contactar a Bechapra
							<ChevronRight size={20} />
						</a>
					</div>
					{/* Columna de Imagen */}
					<div style={{
						position: 'relative',
						display: 'flex',
						justifyContent: 'flex-end',
						alignItems: 'center'
					}}>
						<div style={{
							position: 'relative',
							width: '100%',
							maxWidth: '580px',
							height: '340px',
							borderRadius: '20px',
							overflow: 'hidden',
							boxShadow: '0 20px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.1)'
						}}>
							<img
								src="/imagen/servicos/servicios-especializados.jpg"
								alt="Servicios Especializados Bechapra"
								style={{
									width: '100%',
									height: '100%',
									objectFit: 'cover',
									display: 'block'
								}}
							/>
						</div>
					</div>
				</div>
			</section>			{/* STATS SECTION */}
			<section style={{ 
				padding: '4rem 2rem', 
				background: 'linear-gradient(180deg, #F8FAFF 0%, #ffffff 100%)',
				borderBottom: '1px solid #E5EEFF'
			}}>
				<div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
					{stats.map((stat, i) => (
						<div key={i} style={{ 
							textAlign: 'center',
							padding: '2rem 1.5rem',
							background: 'white',
							borderRadius: '20px',
							border: '2px solid #E5EEFF',
							transition: 'all 0.3s ease',
							cursor: 'pointer'
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.transform = 'translateY(-8px)';
							e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,87,217,0.15)';
							e.currentTarget.style.borderColor = '#0057D9';
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.transform = 'translateY(0)';
							e.currentTarget.style.boxShadow = 'none';
							e.currentTarget.style.borderColor = '#E5EEFF';
						}}>
							<stat.icon size={36} color="#0057D9" style={{ margin: '0 auto 1rem' }} />
							<div style={{ fontSize: '2.8rem', fontWeight: 900, color: '#0057D9', marginBottom: '0.5rem', letterSpacing: '-1px' }}>{stat.value}</div>
							<div style={{ fontSize: '1rem', color: '#0A1933', fontWeight: 600 }}>{stat.label}</div>
						</div>
					))}
				</div>
			</section>

			{/* NUESTRAS SOLUCIONES SECTION */}
			<section style={{ padding: '5rem 2rem', background: '#ffffff' }}>
				<div style={{ maxWidth: '1400px', margin: '0 auto' }}>
					
					<div style={{ textAlign: 'center', marginBottom: '4rem' }}>
						<h2 style={{ 
							fontSize: 'clamp(2rem, 4vw, 3rem)', 
							fontWeight: 900, 
							color: '#0A1933', 
							marginBottom: '1rem',
							letterSpacing: '-1px'
						}}>
							Nuestras soluciones
						</h2>
						<p style={{ fontSize: '1.2rem', color: '#0A1933', opacity: 0.7, maxWidth: '700px', margin: '0 auto' }}>
							Adaptamos nuestros servicios a las necesidades de tu sector y operación. Descubre cómo podemos ayudarte:
						</p>
					</div>

					{/* Cards Grid */}
					<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
						{servicios.map((servicio, i) => (
							<div
								key={i}
								onMouseEnter={() => setHoveredCard(i)}
								onMouseLeave={() => setHoveredCard(null)}
								style={{
									background: hoveredCard === i 
										? 'linear-gradient(135deg, #F8FAFF 0%, #EEF4FF 100%)'
										: 'white',
									borderRadius: '24px',
									padding: '2.5rem',
									border: hoveredCard === i 
										? '2px solid #0057D9'
										: '2px solid #E5EEFF',
									transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
									transform: hoveredCard === i ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)',
									boxShadow: hoveredCard === i 
										? '0 25px 60px rgba(0,87,217,0.2)'
										: '0 4px 20px rgba(0,87,217,0.05)',
									cursor: 'pointer',
									position: 'relative',
									overflow: 'hidden'
								}}
							>
								{/* Background decoration */}
								<div style={{
									position: 'absolute',
									top: '-50%',
									right: '-50%',
									width: '200%',
									height: '200%',
									background: `radial-gradient(circle, ${servicio.color}10 0%, transparent 70%)`,
									transition: 'all 0.4s ease',
									transform: hoveredCard === i ? 'scale(1.2)' : 'scale(0.8)',
									opacity: hoveredCard === i ? 1 : 0
								}} />

								{/* Icon */}
								<div style={{
									width: '70px',
									height: '70px',
									background: hoveredCard === i 
										? `linear-gradient(135deg, ${servicio.color} 0%, ${servicio.color}DD 100%)`
										: `${servicio.color}10`,
									borderRadius: '18px',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									marginBottom: '1.5rem',
									transition: 'all 0.4s ease',
									transform: hoveredCard === i ? 'rotate(-5deg) scale(1.1)' : 'rotate(0) scale(1)',
									position: 'relative',
									zIndex: 1
								}}>
									<servicio.icon size={32} color={hoveredCard === i ? '#ffffff' : servicio.color} strokeWidth={2.5} />
								</div>

								{/* Content */}
								<h3 style={{ 
									fontSize: '1.35rem', 
									fontWeight: 800, 
									color: hoveredCard === i ? '#0057D9' : '#0A1933',
									marginBottom: '1rem',
									transition: 'color 0.3s ease',
									position: 'relative',
									zIndex: 1,
									letterSpacing: '-0.3px'
								}}>
									{servicio.title}
								</h3>
								<p style={{ 
									fontSize: '1.05rem', 
									color: '#0A1933', 
									opacity: 0.75,
									lineHeight: 1.6,
									position: 'relative',
									zIndex: 1
								}}>
									{servicio.desc}
								</p>

								{/* Arrow indicator */}
								<div style={{
									marginTop: '1.5rem',
									display: 'flex',
									alignItems: 'center',
									gap: '0.5rem',
									color: servicio.color,
									fontWeight: 700,
									fontSize: '0.95rem',
									opacity: hoveredCard === i ? 1 : 0,
									transform: hoveredCard === i ? 'translateX(0)' : 'translateX(-10px)',
									transition: 'all 0.3s ease',
									position: 'relative',
									zIndex: 1
								}}>
									Conocer más <ChevronRight size={18} />
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* WHY BECHAPRA SECTION */}
			<section style={{ padding: '5rem 2rem', background: 'linear-gradient(180deg, #F8FAFF 0%, #ffffff 100%)' }}>
				<div style={{ maxWidth: '1400px', margin: '0 auto' }}>
					<h2 style={{ 
						fontSize: 'clamp(2rem, 4vw, 3rem)', 
						fontWeight: 900, 
						color: '#0A1933', 
						textAlign: 'center',
						marginBottom: '3rem',
						letterSpacing: '-1px'
					}}>
						¿Por qué elegir Bechapra?
					</h2>

					<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
						{[
							{ icon: ShieldCheck, title: "Experiencia comprobada", desc: "Más de 20 años brindando soluciones especializadas a empresas líderes de México y el extranjero." },
							{ icon: BarChart3, title: "Resultados medibles", desc: "Procesos optimizados, reducción de costos y cumplimiento total en cada proyecto." },
							{ icon: Users, title: "Atención personalizada", desc: "Equipo dedicado y soporte 24/7 para cada cliente y cada industria." }
						].map((item, i) => (
							<div key={i} style={{
								background: 'white',
								padding: '2.5rem',
								borderRadius: '24px',
								border: '2px solid #E5EEFF',
								transition: 'all 0.3s ease'
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.transform = 'translateY(-8px)';
								e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,87,217,0.15)';
								e.currentTarget.style.borderColor = '#0057D9';
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.transform = 'translateY(0)';
								e.currentTarget.style.boxShadow = 'none';
								e.currentTarget.style.borderColor = '#E5EEFF';
							}}>
								<item.icon size={40} color="#0057D9" style={{ marginBottom: '1.5rem' }} strokeWidth={2.5} />
								<h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0A1933', marginBottom: '1rem', letterSpacing: '-0.5px' }}>{item.title}</h3>
								<p style={{ fontSize: '1.05rem', color: '#0A1933', opacity: 0.75, lineHeight: 1.6 }}>{item.desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* FINAL CTA - Estilo Hero */}
			<section style={{
				position: 'relative',
				padding: '5rem 0',
				background: 'linear-gradient(90deg, #003d8f 0%, #004AB7 35%, #004AB7 65%, #0056d4 100%)',
				overflow: 'hidden',
				width: '100vw',
				marginLeft: 'calc(-50vw + 50%)'
			}}>
				{/* Overlay decorativo */}
				<div style={{
					content: '',
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					background: 'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.1) 0%, transparent 40%), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.08) 0%, transparent 40%)',
					pointerEvents: 'none'
				}} />

				<div style={{
					position: 'relative',
					zIndex: 1,
					maxWidth: '1280px',
					margin: '0 auto',
					padding: '0 1.5rem',
					textAlign: 'center'
				}}>
					<h3 style={{
						fontSize: 'clamp(2rem, 4vw, 3rem)',
						fontWeight: 900,
						color: 'white',
						marginBottom: '1.5rem',
						letterSpacing: '-0.02em',
						lineHeight: 1.1
					}}>
						¿Listo para transformar tu operación?
					</h3>
					<p style={{
						fontSize: '1.25rem',
						color: 'rgba(255,255,255,0.9)',
						marginBottom: '2.5rem',
						maxWidth: '700px',
						margin: '0 auto 2.5rem',
						lineHeight: 1.6
					}}>
						Contáctanos y recibe una consultoría gratuita para diseñar la solución especializada que tu empresa necesita.
					</p>
					<a href="/contacto" style={{
						display: 'inline-flex',
						alignItems: 'center',
						gap: '0.75rem',
						padding: '1rem 2.5rem',
						background: 'linear-gradient(135deg, #FFFFFF 0%, #F0F4FF 100%)',
						color: '#004AB7',
						fontWeight: 700,
						fontSize: '1.15rem',
						borderRadius: '9999px',
						textDecoration: 'none',
						boxShadow: '0 10px 30px rgba(255,255,255,0.2), 0 1px 2px rgba(0,0,0,0.1)',
						transition: 'all 0.3s cubic-bezier(0.2,0.9,0.2,1)',
						border: '2px solid rgba(255,255,255,0.3)'
					}}>
						Solicitar consultoría gratuita
						<ChevronRight size={22} />
					</a>
				</div>
			</section>
		</div>
	);
}