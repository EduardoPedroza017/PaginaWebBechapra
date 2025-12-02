"use client";

import React from 'react';
import { motion } from 'framer-motion';
import SubpageHero from '@/components/SubpageHero';
import Footer from '@/components/Footer';

export default function TerminosServicio() {
	const sections = [
		{
			title: "1. Aceptación de los Términos",
			content: `Al acceder y utilizar el sitio web de Bechapra (en adelante, "el Sitio"), usted acepta estar sujeto a estos Términos de Servicio, todas las leyes y regulaciones aplicables, y acepta que es responsable del cumplimiento de las leyes locales aplicables.

Si no está de acuerdo con alguno de estos términos, no debe utilizar o acceder a este sitio. Los materiales contenidos en este sitio están protegidos por las leyes de derechos de autor y marcas registradas aplicables.`
		},
		{
			title: "2. Uso del Sitio Web",
			content: `El contenido de este sitio web es únicamente para su información general y está sujeto a cambios sin previo aviso.

Usted se compromete a:
• Utilizar el Sitio únicamente para fines lícitos
• No intentar obtener acceso no autorizado a ninguna parte del Sitio
• No transmitir contenido que sea ilegal, amenazante, abusivo, difamatorio u obsceno
• No interferir con el funcionamiento del Sitio o servidores
• No utilizar robots, spiders o dispositivos automáticos sin autorización previa`
		},
		{
			title: "3. Servicios Profesionales",
			content: `Bechapra proporciona servicios de consultoría empresarial, capital humano, servicios legales, contables y organizacionales. La información presentada en este sitio web es de carácter informativo y no constituye una oferta de servicios definitiva.

Los servicios específicos están sujetos a:
• Evaluación previa de necesidades
• Firma de contrato o carta de servicios
• Términos y condiciones particulares para cada servicio
• Disponibilidad de recursos y profesionales especializados

Para contratar nuestros servicios, es necesario establecer comunicación directa con nuestros representantes autorizados.`
		},
		{
			title: "4. Propiedad Intelectual",
			content: `Todo el contenido incluido en este sitio, como textos, gráficos, logotipos, iconos, imágenes, clips de audio, descargas digitales y compilaciones de datos, es propiedad de Bechapra o de sus proveedores de contenido y está protegido por las leyes mexicanas e internacionales de derechos de autor.

Queda expresamente prohibido:
• Reproducir, duplicar, copiar, vender o revender cualquier contenido sin autorización
• Usar marcas comerciales de Bechapra sin consentimiento escrito
• Crear trabajos derivados del contenido del sitio
• Eliminar avisos de derechos de autor o marcas registradas`
		},
		{
			title: "5. Limitación de Responsabilidad",
			content: `Bechapra no será responsable de ningún daño directo, indirecto, incidental, consecuente o punitivo que resulte de:

• El uso o la imposibilidad de usar el sitio web
• Acceso no autorizado a nuestros servidores o información
• Errores u omisiones en el contenido
• Interrupciones o cesaciones de transmisión
• Virus que puedan infectar su equipo

El sitio web se proporciona "tal cual" sin garantías de ningún tipo, ya sean expresas o implícitas.`
		},
		{
			title: "6. Enlaces a Sitios de Terceros",
			content: `Este sitio puede contener enlaces a sitios web de terceros que no son operados por Bechapra. No tenemos control sobre el contenido, políticas de privacidad o prácticas de sitios de terceros y no asumimos ninguna responsabilidad por ellos.

Le recomendamos que lea los términos y condiciones y las políticas de privacidad de cualquier sitio web de terceros que visite.`
		},
		{
			title: "7. Modificaciones a los Términos",
			content: `Bechapra se reserva el derecho de revisar estos términos de servicio en cualquier momento sin previo aviso. Al usar este sitio web, usted acepta estar sujeto a la versión actual de estos términos de servicio.

Es su responsabilidad revisar periódicamente estos términos para estar al tanto de cualquier actualización.`
		},
		{
			title: "8. Ley Aplicable y Jurisdicción",
			content: `Estos términos se regirán e interpretarán de acuerdo con las leyes de los Estados Unidos Mexicanos. Cualquier disputa relacionada con estos términos estará sujeta a la jurisdicción exclusiva de los tribunales de Ciudad de México, México.`
		},
		{
			title: "9. Contacto",
			content: `Si tiene alguna pregunta sobre estos Términos de Servicio, puede contactarnos:

Correo electrónico: contacto@bechapra.com
Teléfono: (55) 8548 2311
Ubicación: Ciudad de México, México

Fecha de última actualización: Noviembre 2025`
		}
	];

	return (
		<main style={{
			minHeight: '100vh',
			background: 'linear-gradient(to bottom, #ffffff 0%, #f8fafc 50%, #ffffff 100%)',
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
				title="Términos de Servicio"
				subtitle="Condiciones de Uso del Sitio Web de Bechapra"
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
						background: 'linear-gradient(135deg, #004AB7 0%, #0066CC 100%)',
						borderRadius: '16px',
						boxShadow: '0 10px 40px rgba(0,74,183,0.2), 0 0 0 1px rgba(0,74,183,0.1)',
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
						Bienvenido a Bechapra. Estos Términos de Servicio rigen su acceso y uso de nuestro sitio web y servicios. Al utilizar nuestro sitio, usted reconoce que ha leído, entendido y acepta estar sujeto a estos términos.
					</p>
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
							borderLeft: '3px solid #004AB7'
						}}
					>
						<h2 style={{
							fontSize: 'clamp(1.5rem, 2vw, 1.875rem)',
							fontWeight: 700,
							color: '#004AB7',
							marginBottom: '1.25rem',
							margin: 0
						}}>
							{section.title}
						</h2>
						<div style={{
							fontSize: 'clamp(1rem, 1.5vw, 1.0625rem)',
							lineHeight: 1.8,
							color: '#475569',
							whiteSpace: 'pre-line'
						}}>
							{section.content}
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
						background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
						borderRadius: '12px',
						textAlign: 'center',
						border: '1px solid rgba(0,74,183,0.1)',
						boxShadow: '0 2px 12px rgba(0,74,183,0.08)'
					}}
				>
					<p style={{
						fontSize: '0.95rem',
						color: '#64748b',
						margin: 0
					}}>
						El uso continuado de este sitio web constituye la aceptación de estos términos.
					</p>
				</motion.div>
			</section>

			<Footer />
		</main>
	);
}
