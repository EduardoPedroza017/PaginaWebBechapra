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

export default function PoliticaPrivacidad() {
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
	const sections = [
		{
			title: "1. Información que Recopilamos",
			content: `Bechapra recopila información personal cuando usted voluntariamente nos la proporciona a través de formularios de contacto, solicitudes de servicio, o registro en nuestro sitio web. Esta información puede incluir:

• Nombre completo
• Correo electrónico
• Número telefónico
• Empresa u organización
• Puesto o cargo
• Información relacionada con su consulta o solicitud de servicios`
		},
		{
			title: "2. Uso de la Información",
			content: `La información personal recopilada será utilizada exclusivamente para los siguientes propósitos:

• Responder a sus consultas y solicitudes de información
• Proporcionar y mejorar nuestros servicios empresariales
• Enviar comunicaciones relacionadas con servicios contratados
• Cumplir con obligaciones contractuales y legales
• Realizar análisis internos para mejorar nuestros servicios
• Enviar información sobre nuevos servicios (previo consentimiento)`
		},
		{
			title: "3. Protección de Datos Personales",
			content: `En cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, Bechapra implementa medidas de seguridad administrativas, técnicas y físicas para proteger sus datos personales contra daño, pérdida, alteración, destrucción o uso no autorizado.

Nos comprometemos a:
• Mantener la confidencialidad de su información
• No vender ni compartir sus datos con terceros sin su consentimiento
• Utilizar protocolos de seguridad encriptados
• Capacitar a nuestro personal en protección de datos`
		},
		{
			title: "4. Derechos ARCO",
			content: `Como titular de datos personales, usted tiene derecho a:

• Acceder a sus datos personales en nuestra posesión
• Rectificar datos inexactos o incompletos
• Cancelar sus datos cuando considere que no se requieren
• Oponerse al tratamiento de sus datos para fines específicos

Para ejercer cualquiera de estos derechos, puede contactarnos a través de: contacto@bechapra.com`
		},
		{
			title: "5. Transferencia de Datos",
			content: `Bechapra no transferirá sus datos personales a terceros sin su consentimiento, excepto en los siguientes casos:

• Cuando sea necesario para la prestación de servicios contratados
• Por requerimiento de autoridades competentes
• A empresas subsidiarias o afiliadas bajo los mismos estándares de protección
• Cuando sea necesario para proteger los intereses de Bechapra conforme a derecho`
		},
		{
			title: "6. Cookies y Tecnologías Similares",
			content: `Nuestro sitio web utiliza cookies y tecnologías similares para mejorar la experiencia del usuario. Para más información sobre cómo utilizamos estas tecnologías, consulte nuestra Política de Cookies.`
		},
		{
			title: "7. Modificaciones al Aviso de Privacidad",
			content: `Bechapra se reserva el derecho de modificar este Aviso de Privacidad en cualquier momento. Cualquier cambio será notificado a través de nuestro sitio web. Le recomendamos revisar periódicamente este aviso para estar informado sobre cómo protegemos su información.`
		},
		{
			title: "8. Contacto",
			content: `Para cualquier duda, aclaración o comentario sobre este Aviso de Privacidad, puede contactarnos:

Correo electrónico: contacto@bechapra.com
Teléfono: (55) 8548 2311
Ubicación: Ciudad de México, México

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
				title="Política de Privacidad"
				subtitle="Aviso de Privacidad de Bechapra - Protección de Datos Personales"
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
					<TranslateText text="Bechapra - Soluciones Empresariales, con domicilio en Ciudad de México, México, es responsable del tratamiento de sus datos personales. Este Aviso de Privacidad describe cómo recopilamos, usamos, almacenamos y protegemos su información personal en cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares." />
				</p>
			</motion.div>				{/* Sections */}
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
						<TranslateText text="Al utilizar nuestros servicios, usted acepta los términos establecidos en este Aviso de Privacidad." />
					</p>
				</motion.div>
			</section>

			<Footer />
		</main>
	);
}
