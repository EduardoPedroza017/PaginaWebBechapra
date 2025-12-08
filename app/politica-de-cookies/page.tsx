"use client";

import React from 'react';
import { motion } from 'framer-motion';
import SubpageHero from '@/components/SubpageHero';
import Footer from '@/components/Footer';
import { TranslateText } from '@/components/TranslateText';

export default function PoliticaCookies() {
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
		<main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative">
			{/* Decorative background elements */}
			<div className="absolute top-[10%] right-[-5%] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(0,74,183,0.08)_0%,transparent_70%)] rounded-full pointer-events-none z-0" />
			<div className="absolute bottom-[20%] left-[-3%] w-[350px] h-[350px] bg-[radial-gradient(circle,rgba(0,172,183,0.06)_0%,transparent_70%)] rounded-full pointer-events-none z-0" />

			{/* Hero Section */}
			<SubpageHero
				title="Política de Cookies"
				subtitle="Información sobre el uso de cookies en el sitio web de Bechapra"
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
					<TranslateText text="Esta Política de Cookies explica qué son las cookies, cómo las utilizamos en nuestro sitio web, y cómo puede controlarlas. Al continuar navegando por nuestro sitio, usted acepta el uso de cookies de acuerdo con esta política." />
				</p>
			</motion.div>

			{/* Cookie Types */}
			<motion.div
				initial={{opacity: 0, y: 20}}
				whileInView={{opacity: 1, y: 0}}
				viewport={{once: true}}
				transition={{duration: 0.6}}
				className="mb-16"
			>
				<h2 className="text-2xl md:text-3xl font-bold text-blue-700 dark:text-blue-400 mb-8">
					<TranslateText text="Tipos de Cookies que Utilizamos" />
				</h2>

				<div className="grid gap-6">
					{cookieTypes.map((cookie, index) => (
						<motion.div
							key={index}
							initial={{opacity: 0, y: 20}}
							whileInView={{opacity: 1, y: 0}}
							viewport={{once: true}}
							transition={{duration: 0.6, delay: index * 0.1}}
							className="p-8 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300"
						>
							<div className="flex justify-between items-center mb-4 flex-wrap gap-4">
								<h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white m-0">
									<TranslateText text={cookie.type} />
								</h3>
								<span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${cookie.required ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'}`}>
									<TranslateText text={cookie.required ? "Necesarias" : "Opcionales"} />
								</span>
							</div>

							<p className="text-base leading-relaxed text-gray-600 dark:text-slate-300 mb-4">
								<TranslateText text={cookie.description} />
							</p>

							<div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-600">
								<p className="text-sm font-semibold text-gray-500 dark:text-slate-400 mb-2">
									<TranslateText text="Ejemplos:" />
								</p>
								<ul className="m-0 pl-6 flex flex-col gap-1.5">
									{cookie.examples.map((example, i) => (
										<li key={i} className="text-sm text-gray-500 dark:text-slate-400">
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
					<TranslateText text="Su privacidad es importante para nosotros. Utilizamos cookies para mejorar su experiencia mientras respetamos sus elecciones." />
				</p>
			</motion.div>
			</section>
            
            <Footer />

		</main>
	);
}
