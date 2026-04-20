"use client";

import React from 'react';
import { motion } from 'framer-motion';
import SubpageHero from '@/components/SubpageHero';
import Footer from '@/components/Footer';
import Section from '@/app/components/Section';
import { TranslateText } from '@/components/TranslateText';
import { ShieldCheck, Info, Mail } from 'lucide-react';

export default function PoliticaPrivacidad() {
	const sections = [
		{
			title: "1. Información que Recopilamos",
			content: `BAUSEN recopila información personal cuando usted voluntariamente nos la proporciona a través de formularios de contacto, solicitudes de servicio, o registro en nuestro sitio web. Esta información puede incluir:

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
			content: `En cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, BAUSEN implementa medidas de seguridad administrativas, técnicas y físicas para proteger sus datos personales contra daño, pérdida, alteración, destrucción o uso no autorizado.

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

Para ejercer cualquiera de estos derechos, puede contactarnos a través de: contacto@bausen.com`
		},
		{
			title: "5. Transferencia de Datos",
			content: `BAUSEN no transferirá sus datos personales a terceros sin su consentimiento, excepto en los siguientes casos:

• Cuando sea necesario para la prestación de servicios contratados
• Por requerimiento de autoridades competentes
• A empresas subsidiarias o afiliadas bajo los mismos estándares de protección
• Cuando sea necesario para proteger los intereses de BAUSEN conforme a derecho`
		},
		{
			title: "6. Cookies y Tecnologías Similares",
			content: `Nuestro sitio web utiliza cookies y tecnologías similares para mejorar la experiencia del usuario. Para más información sobre cómo utilizamos estas tecnologías, consulte nuestra Política de Cookies.`
		},
		{
			title: "7. Modificaciones al Aviso de Privacidad",
			content: `BAUSEN se reserva el derecho de modificar este Aviso de Privacidad en cualquier momento. Cualquier cambio será notificado a través de nuestro sitio web. Le recomendamos revisar periódicamente este aviso para estar informado sobre cómo protegemos su información.`
		},
		{
			title: "8. Contacto",
			content: `Para cualquier duda, aclaración o comentario sobre este Aviso de Privacidad, puede contactarnos:

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
				title="Política de Privacidad"
				subtitle="Aviso de Privacidad de BAUSEN - Protección Integral de Datos Personales"
			/>

			<Section variant="white" size="lg">
        <div className="max-w-4xl mx-auto">
          {/* Introduction Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 p-10 bg-blue-600 rounded-[2.5rem] shadow-2xl shadow-blue-900/20 relative overflow-hidden text-white"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px]" />
            <div className="relative z-10 flex gap-6 items-start">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                <ShieldCheck size={28} />
              </div>
              <p className="text-lg font-medium leading-relaxed">
                <TranslateText text="BAUSEN - Soluciones Empresariales es responsable del tratamiento de sus datos personales. Describimos cómo recopilamos, usamos y protegemos su información en cumplimiento con la Ley Federal de Protección de Datos Personales." />
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
            className="mt-20 p-10 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-center"
          >
            <Info className="w-10 h-10 text-blue-600 mx-auto mb-6" />
            <p className="text-slate-600 dark:text-slate-400 font-bold mb-8">
              <TranslateText text="Al utilizar nuestros servicios, usted acepta los términos establecidos en este Aviso de Privacidad." />
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
