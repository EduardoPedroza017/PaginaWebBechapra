"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import SubpageHero from '@/components/SubpageHero';
import Footer from '@/components/Footer';
import { TranslateText } from '@/components/TranslateText';

function getInitialTheme(): 'light' | 'dark' {
	if (typeof window === 'undefined') return 'light';
	const saved = localStorage.getItem('theme');
	return (saved === 'dark' || saved === 'light') ? saved : 'light';
}

export default function PoliticaCookies() {
	const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);
	const handlerRef = useRef<((e: MediaQueryListEvent) => void) | null>(null);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
			handlerRef.current = (e: MediaQueryListEvent) => {
				const newTheme = e.matches ? 'dark' : 'light';
				setTheme(newTheme);
				localStorage.setItem('theme', newTheme);
			};
			
			mediaQuery.addEventListener('change', handlerRef.current);
			
			return () => {
				if (handlerRef.current) {
					mediaQuery.removeEventListener('change', handlerRef.current);
				}
			};
		}
	}, []);

	const cookieTypes = [
		{
			type: "Cookies Estrictamente Necesarias",
			description: "Estas cookies son esenciales para que el sitio web funcione correctamente. Permiten la navegación básica y el acceso a áreas seguras del sitio. Sin estas cookies, algunos servicios no pueden ser proporcionados.",
			examples: [
				"Cookies de sesión de usuario",
				"Cookies de seguridad y autenticación",
				"Cookies para recordar preferencias básicas"
			],
			required: true
		},
		{
			type: "Cookies de Rendimiento",
			description: "Estas cookies recopilan información sobre cómo los visitantes usan el sitio web, por ejemplo, qué páginas visitan con más frecuencia. Esta información se usa para optimizar el sitio web y mejorar la experiencia del usuario.",
			examples: [
				"Google Analytics",
				"Cookies de análisis de tráfico",
				"Métricas de tiempo de carga de páginas"
			],
			required: false
		},
		{
			type: "Cookies de Funcionalidad",
			description: "Estas cookies permiten que el sitio web recuerde las elecciones que usted hace (como su idioma o región) y proporcionan características mejoradas y más personales.",
			examples: [
				"Preferencias de idioma",
				"Configuraciones de visualización",
				"Recordar información de formularios"
			],
			required: false
		},
		{
			type: "Cookies de Marketing y Publicidad",
			description: "Estas cookies se utilizan para rastrear a los visitantes a través de sitios web. La intención es mostrar anuncios que sean relevantes y atractivos para el usuario individual.",
			examples: [
				"Cookies de redes sociales (Facebook, LinkedIn)",
				"Cookies de remarketing",
				"Seguimiento de conversiones"
			],
			required: false
		}
	];

	const sections = [
		{
			title: "¿Qué son las Cookies?",
			content: `Las cookies son pequeños archivos de texto que se almacenan en su dispositivo (ordenador, tableta o móvil) cuando visita un sitio web. Permiten que el sitio web reconozca su dispositivo y recuerde información sobre su visita, como sus preferencias y configuraciones.

Las cookies pueden ser:
• Cookies de sesión: Se eliminan cuando cierra su navegador
• Cookies persistentes: Permanecen en su dispositivo durante un período determinado
• Cookies propias: Establecidas por el sitio web que visita
• Cookies de terceros: Establecidas por otros servicios que aparecen en el sitio`
		},
		{
			title: "¿Cómo Utilizamos las Cookies?",
			content: `Bechapra utiliza cookies para mejorar su experiencia en nuestro sitio web y proporcionar servicios personalizados. Usamos cookies para:

• Mantener su sesión activa mientras navega por el sitio
• Recordar sus preferencias y configuraciones
• Analizar cómo los visitantes usan nuestro sitio web
• Mejorar la seguridad del sitio
• Comprender el rendimiento del sitio y realizar mejoras
• Personalizar el contenido según sus intereses
• Proporcionar funcionalidades de redes sociales`
		},
		{
			title: "Control de Cookies",
			content: `Usted tiene el derecho de aceptar o rechazar las cookies. Puede configurar su navegador para que le notifique cuando reciba una cookie, dándole la oportunidad de decidir si la acepta o no.

Cómo gestionar cookies en diferentes navegadores:

Chrome: Configuración > Privacidad y seguridad > Cookies
Firefox: Opciones > Privacidad y seguridad > Cookies
Safari: Preferencias > Privacidad > Cookies
Edge: Configuración > Privacidad > Cookies

Nota: Si bloquea o elimina las cookies, es posible que algunas funciones del sitio web no funcionen correctamente.`
		},
		{
			title: "Cookies de Terceros",
			content: `Nuestro sitio web puede utilizar servicios de terceros que establecen sus propias cookies. Estos servicios incluyen:

• Google Analytics: Para análisis de tráfico web
• Redes Sociales: Facebook, LinkedIn, Instagram, YouTube
• Servicios de mapas y geolocalización
• Herramientas de marketing y publicidad

No controlamos las cookies de terceros. Le recomendamos revisar las políticas de privacidad de estos servicios para obtener más información sobre cómo manejan sus datos.`
		},
		{
			title: "Actualización de esta Política",
			content: `Podemos actualizar esta Política de Cookies periódicamente para reflejar cambios en las tecnologías que utilizamos o por razones legales. Le notificaremos sobre cualquier cambio significativo mediante un aviso en nuestro sitio web.

Le recomendamos revisar esta página regularmente para mantenerse informado sobre cómo utilizamos las cookies.`
		},
		{
			title: "Más Información",
			content: `Si tiene preguntas sobre nuestra Política de Cookies o cómo manejamos sus datos, no dude en contactarnos:

Correo electrónico: contacto@bechapra.com
Teléfono: (55) 8548 2311
Ubicación: Ciudad de México, México

También puede consultar nuestra Política de Privacidad para obtener información detallada sobre cómo protegemos sus datos personales.

Última actualización: Noviembre 2025`
		}
	];

	return (
		<main style={{
			minHeight: '100vh',
			background: theme === 'dark' 
				? 'linear-gradient(to bottom, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
				: 'linear-gradient(to bottom, #ffffff 0%, #f8fafc 50%, #ffffff 100%)',
			position: 'relative'
		}}>
			{/* Decorative background elements */}
			<div style={{
				position: 'absolute',
				top: '10%',
				right: '-5%',
				width: '400px',
				height: '400px',
				background: 'radial-gradient(circle, rgba(0,74,183,0.08) 0%, transparent 70%)',
				borderRadius: '50%',
				pointerEvents: 'none',
				zIndex: 0
			}} />
			<div style={{
				position: 'absolute',
				bottom: '20%',
				left: '-3%',
				width: '350px',
				height: '350px',
				background: 'radial-gradient(circle, rgba(0,172,183,0.06) 0%, transparent 70%)',
				borderRadius: '50%',
				pointerEvents: 'none',
				zIndex: 0
			}} />

			{/* Hero Section */}
			<SubpageHero
				title="Política de Cookies"
				subtitle="Información sobre el uso de cookies en el sitio web de Bechapra"
			/>

			{/* Content Section */}
			<section style={{
				position: 'relative',
				zIndex: 1,
				maxWidth: '1200px',
				margin: '0 auto',
				padding: 'clamp(3rem, 5vw, 6rem) clamp(1.5rem, 3vw, 2rem)'
			}}>
			{/* Introduction */}
			<motion.div
				initial={{opacity: 0, y: 20}}
				whileInView={{opacity: 1, y: 0}}
				viewport={{once: true}}
				transition={{duration: 0.6}}
				style={{
					marginBottom: '4rem',
					padding: '2.5rem',
					background: theme === 'dark'
						? 'linear-gradient(135deg, #1e3a5f 0%, #1e40af 100%)'
						: 'linear-gradient(135deg, #004AB7 0%, #0066CC 100%)',
					borderRadius: '16px',
					boxShadow: theme === 'dark'
						? '0 10px 40px rgba(30,64,95,0.4), 0 0 0 1px rgba(30,64,95,0.2)'
						: '0 10px 40px rgba(0,74,183,0.2), 0 0 0 1px rgba(0,74,183,0.1)',
					position: 'relative',
					overflow: 'hidden'
				}}
			>
				<p style={{
					fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
					lineHeight: 1.8,
					color: 'white',
					margin: 0,
					position: 'relative',
					zIndex: 1
				}}>
					<TranslateText text="Esta Política de Cookies explica qué son las cookies, cómo las utilizamos en nuestro sitio web, y cómo puede controlarlas. Al continuar navegando por nuestro sitio, usted acepta el uso de cookies de acuerdo con esta política." />
				</p>
			</motion.div>				{/* Cookie Types */}
				<motion.div
					initial={{opacity: 0, y: 20}}
					whileInView={{opacity: 1, y: 0}}
					viewport={{once: true}}
					transition={{duration: 0.6}}
					style={{marginBottom: '4rem'}}
				>
					<h2 style={{
						fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)',
						fontWeight: 700,
						color: theme === 'dark' ? '#60a5fa' : '#004AB7',
						marginBottom: '2rem',
						margin: 0
					}}>
						<TranslateText text="Tipos de Cookies que Utilizamos" />
					</h2>

					<div style={{
						display: 'grid',
						gap: '1.5rem'
					}}>
						{cookieTypes.map((cookie, index) => (
							<motion.div
								key={index}
								initial={{opacity: 0, y: 20}}
								whileInView={{opacity: 1, y: 0}}
								viewport={{once: true}}
								transition={{duration: 0.6, delay: index * 0.1}}
							style={{
								padding: '2rem',
								background: theme === 'dark'
									? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
									: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
								borderRadius: '16px',
								border: theme === 'dark'
									? '1px solid rgba(148,163,184,0.1)'
									: '1px solid rgba(0,74,183,0.1)',
								boxShadow: theme === 'dark'
									? '0 4px 20px rgba(0,0,0,0.3), 0 0 0 1px rgba(148,163,184,0.1)'
									: '0 4px 20px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,74,183,0.05)',
								transition: 'all 0.3s ease',
								cursor: 'default'
							}}
							>
								<div style={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									marginBottom: '1rem',
									flexWrap: 'wrap',
									gap: '1rem'
								}}>
									<h3 style={{
										fontSize: 'clamp(1.25rem, 1.75vw, 1.5rem)',
										fontWeight: 700,
										color: theme === 'dark' ? '#e2e8f0' : '#1e293b',
										margin: 0
									}}>
										<TranslateText text={cookie.type} />
									</h3>
									<span style={{
										padding: '0.375rem 0.875rem',
										borderRadius: '20px',
										fontSize: '0.875rem',
										fontWeight: 600,
										background: cookie.required ? '#dcfce7' : '#f0f9ff',
										color: cookie.required ? '#166534' : '#075985'
									}}>
										<TranslateText text={cookie.required ? "Necesarias" : "Opcionales"} />
									</span>
								</div>

								<p style={{
									fontSize: 'clamp(0.95rem, 1.25vw, 1.0625rem)',
									lineHeight: 1.7,
									color: theme === 'dark' ? '#cbd5e1' : '#475569',
									marginBottom: '1rem',
									margin: 0
								}}>
									<TranslateText text={cookie.description} />
								</p>

								<div style={{
									marginTop: '1rem',
									paddingTop: '1rem',
									borderTop: theme === 'dark' ? '1px solid #334155' : '1px solid #e2e8f0'
								}}>
									<p style={{
										fontSize: '0.9rem',
										fontWeight: 600,
										color: theme === 'dark' ? '#94a3b8' : '#64748b',
										marginBottom: '0.5rem',
										margin: 0
									}}>
										<TranslateText text="Ejemplos:" />
									</p>
									<ul style={{
										margin: 0,
										paddingLeft: '1.5rem',
										display: 'flex',
										flexDirection: 'column',
										gap: '0.375rem'
									}}>
										{cookie.examples.map((example, i) => (
											<li key={i} style={{
												fontSize: '0.9rem',
												color: theme === 'dark' ? '#94a3b8' : '#64748b'
											}}>
												<TranslateText text={example} />
											</li>
										))}
									</ul>
								</div>
							</motion.div>
						))}
					</div>
				</motion.div>

				{/* Sections */}
				{sections.map((section, index) => (
					<motion.div
						key={index}
						initial={{opacity: 0, y: 20}}
						whileInView={{opacity: 1, y: 0}}
						viewport={{once: true}}
						transition={{duration: 0.6, delay: index * 0.1}}
						style={{
							marginBottom: '3rem',
							paddingLeft: '1.5rem',
							borderLeft: theme === 'dark' ? '3px solid #60a5fa' : '3px solid #004AB7'
						}}
					>
						<h2 style={{
							fontSize: 'clamp(1.5rem, 2vw, 1.875rem)',
							fontWeight: 700,
							color: theme === 'dark' ? '#60a5fa' : '#004AB7',
							marginBottom: '1.25rem',
							margin: 0
						}}>
							<TranslateText text={section.title} />
						</h2>
						<div style={{
							fontSize: 'clamp(1rem, 1.5vw, 1.0625rem)',
							lineHeight: 1.8,
							color: theme === 'dark' ? '#cbd5e1' : '#475569',
							whiteSpace: 'pre-line'
						}}>
							<TranslateText text={section.content} />
						</div>
					</motion.div>
				))}

				{/* Footer Note */}
				<motion.div
					initial={{opacity: 0, y: 20}}
					whileInView={{opacity: 1, y: 0}}
					viewport={{once: true}}
					transition={{duration: 0.6}}
					style={{
						marginTop: '4rem',
						padding: '2rem',
						background: theme === 'dark'
							? 'linear-gradient(135deg, #1e3a5f 0%, #1e40af 100%)'
							: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
						borderRadius: '12px',
						textAlign: 'center',
						border: theme === 'dark'
							? '1px solid rgba(96,165,250,0.2)'
							: '1px solid rgba(0,74,183,0.1)',
						boxShadow: theme === 'dark'
							? '0 2px 12px rgba(30,64,95,0.3)'
							: '0 2px 12px rgba(0,74,183,0.08)'
					}}
				>
					<p style={{
						fontSize: '0.95rem',
						color: theme === 'dark' ? '#cbd5e1' : '#64748b',
						margin: 0
					}}>
						<TranslateText text="Su privacidad es importante para nosotros. Utilizamos cookies para mejorar su experiencia mientras respetamos sus elecciones." />
					</p>
				</motion.div>
			</section>
            
            <Footer />

		</main>
	);
}
