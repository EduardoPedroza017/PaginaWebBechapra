"use client";

import React from 'react';
import { motion } from 'framer-motion';
import SubpageHero from '@/components/SubpageHero';
import Footer from '@/components/Footer';
import Section from '@/app/components/Section';
import { TranslateText } from '@/components/TranslateText';
import { Cookie, Info, Mail, Settings } from 'lucide-react';

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
			content: `BAUSEN utiliza cookies para mejorar su experiencia en nuestro sitio web y proporcionar servicios personalizados. Usamos cookies para:

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

Correo electrónico: contacto@bausen.com
Teléfono: (55) 8548 2311
Ubicación: Ciudad de México, México

Última actualización: Noviembre 2026`
		}
	];

	return (
		<div className="min-h-screen bg-white dark:bg-slate-950">
			<SubpageHero
        badge="Legal & Transparencia"
				title="Política de Cookies"
				subtitle="Información Transparente sobre el Uso de Tecnologías de Seguimiento en BAUSEN"
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
                <Cookie size={28} />
              </div>
              <p className="text-lg font-medium leading-relaxed">
                <TranslateText text="Esta Política de Cookies explica qué son, cómo las utilizamos y cómo puede controlarlas. Nuestra prioridad es garantizar una navegación fluida respetando siempre sus preferencias de privacidad." />
              </p>
            </div>
          </motion.div>

          {/* Cookie Types Cards */}
          <div className="space-y-8 mb-24">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-10 tracking-tight flex items-center gap-4">
              <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
              Tipos de Cookies Utilizadas
            </h2>
            <div className="grid gap-6">
              {cookieTypes.map((cookie, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all group"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      <TranslateText text={cookie.type} />
                    </h3>
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${cookie.required ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                      <TranslateText text={cookie.required ? "Obligatoria" : "Opcional"} />
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 font-medium mb-6 leading-relaxed">
                    <TranslateText text={cookie.description} />
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cookie.examples.map(ex => (
                      <span key={ex} className="px-3 py-1 bg-white dark:bg-slate-800 rounded-lg text-xs font-bold text-slate-400 dark:text-slate-500 border border-slate-200/50 dark:border-slate-700/50">
                        {ex}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Legal Sections */}
          <div className="space-y-16">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
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
            <Settings className="w-10 h-10 text-blue-600 mx-auto mb-6" />
            <p className="text-slate-600 dark:text-slate-400 font-bold mb-8">
              <TranslateText text="Usted puede gestionar sus preferencias de cookies en cualquier momento desde la configuración de su navegador." />
            </p>
            <a href="mailto:contacto@bausen.com" className="inline-flex items-center gap-2 text-blue-600 font-black uppercase tracking-widest text-xs hover:text-blue-700 transition-colors">
              <Mail size={16} />
              Solicitar más información
            </a>
          </motion.div>
        </div>
			</Section>

			<Footer />
		</div>
	);
}
