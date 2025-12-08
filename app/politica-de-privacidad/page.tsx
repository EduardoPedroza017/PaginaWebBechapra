"use client";

import React from 'react';
import { motion } from 'framer-motion';
import SubpageHero from '@/components/SubpageHero';
import Footer from '@/components/Footer';
import { TranslateText } from '@/components/TranslateText';

export default function PoliticaPrivacidad() {
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
		<main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative">
			{/* Decorative background elements */}
			<div className="absolute top-[10%] right-[-5%] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(0,74,183,0.08)_0%,transparent_70%)] rounded-full pointer-events-none z-0" />
			<div className="absolute bottom-[20%] left-[-3%] w-[350px] h-[350px] bg-[radial-gradient(circle,rgba(0,172,183,0.06)_0%,transparent_70%)] rounded-full pointer-events-none z-0" />

			{/* Hero Section */}
			<SubpageHero
				title="Política de Privacidad"
				subtitle="Aviso de Privacidad de Bechapra - Protección de Datos Personales"
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
					<TranslateText text="Bechapra - Soluciones Empresariales, con domicilio en Ciudad de México, México, es responsable del tratamiento de sus datos personales. Este Aviso de Privacidad describe cómo recopilamos, usamos, almacenamos y protegemos su información personal en cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares." />
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
					<TranslateText text="Al utilizar nuestros servicios, usted acepta los términos establecidos en este Aviso de Privacidad." />
				</p>
			</motion.div>
			</section>

			<Footer />
		</main>
	);
}
