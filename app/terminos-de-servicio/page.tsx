"use client";

import React from 'react';
import { motion } from 'framer-motion';
import SubpageHero from '@/components/SubpageHero';
import Footer from '@/components/Footer';
import Section from '@/app/components/Section';
import { TranslateText } from '@/components/TranslateText';
import { FileText, Info, Mail, Gavel } from 'lucide-react';

export default function TerminosServicio() {
	const sections = [
		{
			title: "1. Aceptación de los Términos",
			content: `Al acceder y utilizar el sitio web de BAUSEN (en adelante, "el Sitio"), usted acepta estar sujeto a estos Términos de Servicio, todas las leyes y regulaciones aplicables, y acepta que es responsable del cumplimiento de las leyes locales aplicables.

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
			content: `BAUSEN proporciona servicios de consultoría empresarial, capital humano, servicios legales, contables y organizacionales. La información presentada en este sitio web es de carácter informativo y no constituye una oferta de servicios definitiva.

Los servicios específicos están sujetos a:
• Evaluación previa de necesidades
• Firma de contrato o carta de servicios
• Términos y condiciones particulares para cada servicio
• Disponibilidad de recursos y profesionales especializados

Para contratar nuestros servicios, es necesario establecer comunicación directa con nuestros representantes autorizados.`
		},
		{
			title: "4. Propiedad Intelectual",
			content: `Todo el contenido incluido en este sitio, como textos, gráficos, logotipos, iconos, imágenes, clips de audio, descargas digitales y compilaciones de datos, es propiedad de BAUSEN o de sus proveedores de contenido y está protegido por las leyes mexicanas e internacionales de derechos de autor.

Queda expresamente prohibido:
• Reproducir, duplicar, copiar, vender o revender cualquier contenido sin autorización
• Usar marcas comerciales de BAUSEN sin consentimiento escrito
• Crear trabajos derivados del contenido del sitio
• Eliminar avisos de derechos de autor o marcas registradas`
		},
		{
			title: "5. Limitación de Responsabilidad",
			content: `BAUSEN no será responsable de ningún daño directo, indirecto, incidental, consecuente o punitivo que resulte de:

• El uso o la imposibilidad de usar el sitio web
• Acceso no autorizado a nuestros servidores o información
• Errores u omisiones en el contenido
• Interrupciones o cesaciones de transmisión
• Virus que puedan infectar su equipo

El sitio web se proporciona "tal cual" sin garantías de ningún tipo, ya sean expresas o implícitas.`
		},
		{
			title: "6. Enlaces a Sitios de Terceros",
			content: `Este sitio puede contener enlaces a sitios web de terceros que no son operados por BAUSEN. No tenemos control sobre el contenido, políticas de privacidad o prácticas de sitios de terceros y no asumimos ninguna responsabilidad por ellos.

Le recomendamos que lea los términos y condiciones y las políticas de privacidad de cualquier sitio web de terceros que visite.`
		},
		{
			title: "7. Modificaciones a los Términos",
			content: `BAUSEN se reserva el derecho de revisar estos términos de servicio en cualquier momento sin previo aviso. Al usar este sitio web, usted acepta estar sujeto a la versión actual de estos términos de servicio.

Es su responsabilidad revisar periódicamente estos términos para estar al tanto de cualquier actualización.`
		},
		{
			title: "8. Ley Aplicable y Jurisdicción",
			content: `Estos términos se regirán e interpretarán de acuerdo con las leyes de los Estados Unidos Mexicanos. Cualquier disputa relacionada con estos términos estará sujeta a la jurisdicción exclusiva de los tribunales de Ciudad de México, México.`
		},
		{
			title: "9. Contacto",
			content: `Si tiene alguna pregunta sobre estos Términos de Servicio, puede contactarnos:

Correo electrónico: contacto@bausen.com
Teléfono: (55) 8548 2311
Ubicación: Ciudad de México, México

Fecha de última actualización: Noviembre 2026`
		}
	];

	return (
		<div className="min-h-screen bg-white dark:bg-slate-950">
			<SubpageHero
        badge="Cumplimiento Legal"
				title="Términos de Servicio"
				subtitle="Condiciones de Uso del Sitio Web de BAUSEN - Transparencia y Seguridad"
			/>

			<Section variant="white" size="lg">
        <div className="max-w-4xl mx-auto">
          {/* Introduction Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 p-10 bg-slate-900 rounded-[2.5rem] shadow-2xl shadow-blue-900/20 relative overflow-hidden text-white"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]" />
            <div className="relative z-10 flex gap-6 items-start">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                <Gavel size={28} />
              </div>
              <p className="text-lg font-medium leading-relaxed">
                <TranslateText text="Bienvenido a BAUSEN. Estos Términos de Servicio rigen su acceso y uso de nuestro sitio web. Al navegar, usted acepta estar sujeto a las condiciones establecidas en este documento legal." />
              </p>
            </div>
          </motion.div>

          {/* Legal Sections */}
          <div className="space-y-16">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-4 group-hover:text-blue-600 transition-colors">
                  <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
                  <TranslateText text={section.title} />
                </h2>
                <div className="text-lg leading-relaxed text-slate-500 dark:text-slate-400 font-medium whitespace-pre-line pl-6">
                  <TranslateText text={section.content} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 p-10 rounded-[2.5rem] bg-blue-50 dark:bg-slate-900 border border-blue-100 dark:border-slate-800 text-center"
          >
            <Info className="w-10 h-10 text-blue-600 mx-auto mb-6" />
            <p className="text-slate-600 dark:text-slate-400 font-bold mb-8">
              <TranslateText text="El uso continuado de este sitio web constituye la aceptación de estos términos." />
            </p>
            <a href="mailto:contacto@bausen.com" className="inline-flex items-center gap-2 text-blue-600 font-black uppercase tracking-widest text-xs hover:text-blue-700 transition-colors">
              <Mail size={16} />
              Enviar consulta legal
            </a>
          </motion.div>
        </div>
			</Section>

			<Footer />
		</div>
	);
}
