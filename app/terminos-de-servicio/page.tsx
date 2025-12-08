"use client";

import React from 'react';
import { motion } from 'framer-motion';
import SubpageHero from '@/components/SubpageHero';
import Footer from '@/components/Footer';
import { TranslateText } from '@/components/TranslateText';

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
		<main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative">
			{/* Decorative background elements */}
			<div className="absolute top-[10%] right-[-5%] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(0,74,183,0.08)_0%,transparent_70%)] rounded-full pointer-events-none z-0" />
			<div className="absolute bottom-[20%] left-[-3%] w-[350px] h-[350px] bg-[radial-gradient(circle,rgba(0,172,183,0.06)_0%,transparent_70%)] rounded-full pointer-events-none z-0" />

			{/* Hero Section */}
			<SubpageHero
				title="Términos de Servicio"
				subtitle="Condiciones de Uso del Sitio Web de Bechapra"
			/>

			{/* Content Section */}
			<section className="relative z-[1] max-w-[1200px] mx-auto px-6 py-12 md:py-16 lg:py-24">
			{/* Introduction */}
			<motion.div
				initial={{opacity: 0, y: 20}}
				whileInView={{opacity: 1, y: 0}}
				viewport={{once: true}}
				transition={{duration: 0.6}}
				className="mb-16 p-10 bg-gradient-to-br from-blue-700 to-blue-600 dark:from-blue-900 dark:to-blue-800 rounded-2xl shadow-xl relative overflow-hidden"
			>
				<p className="text-base md:text-lg leading-relaxed text-white m-0 relative z-[1]">
					<TranslateText text="Bienvenido a Bechapra. Estos Términos de Servicio rigen su acceso y uso de nuestro sitio web y servicios. Al utilizar nuestro sitio, usted reconoce que ha leído, entendido y acepta estar sujeto a estos términos." />
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
					className="mb-12 pl-6 border-l-[3px] border-blue-700 dark:border-blue-400"
				>
					<h2 className="text-xl md:text-2xl font-bold text-blue-700 dark:text-blue-400 mb-5">
						<TranslateText text={section.title} />
					</h2>
					<div className="text-base leading-relaxed text-gray-600 dark:text-slate-300 whitespace-pre-line">
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
				className="mt-16 p-8 bg-blue-50 dark:bg-slate-800 rounded-xl text-center border border-blue-100 dark:border-slate-700"
			>
				<p className="text-sm text-gray-600 dark:text-slate-400 m-0">
					<TranslateText text="El uso continuado de este sitio web constituye la aceptación de estos términos." />
				</p>
			</motion.div>
			</section>

			<Footer />
		</main>
	);
}
