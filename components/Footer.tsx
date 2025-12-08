"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';
import { CompanyLocation } from './CompanyLocation';

const footerLinks = {
	empresa: [
		{label: 'Acerca de', href: '/acerca-de'},
		{label: 'Servicios', href: '/servicios'},
		{label: 'Noticias', href: '/noticias'},
		{label: 'Prensa', href: '/prensa'},
		{label: 'Contacto', href: '/#contacto'},
	],
	servicios: [
		{label: 'Capital Humano', href: '/servicios/capital-humano'},
		{label: 'Servicios Legales', href: '/servicios/servicios-legales'},
		{label: 'Servicios Contables', href: '/servicios/servicios-contables'},
		{label: 'Desarrollo Organizacional', href: '/servicios/desarrollo-organizacional'},
	],
	legal: [
		{label: 'Política de privacidad', href: '/politica-de-privacidad'},
		{label: 'Términos de servicio', href: '/terminos-de-servicio'},
		{label: 'Política de cookies', href: '/politica-de-cookies'},
	]
};

const socialLinks = [
	{iconPath: '/image/icon/Iconos_Redes/Facebook_NegativoStroke@2x.png', href: 'https://facebook.com/bechapra', label: 'Facebook'},
	{iconPath: '/image/icon/Iconos_Redes/Linkedin_NegativoStroke@2x.png', href: 'https://linkedin.com/company/bechapra', label: 'LinkedIn'},
	{iconPath: '/image/icon/Iconos_Redes/Youtube_NegativoStroke@2x.png', href: 'https://youtube.com/@bechapra', label: 'YouTube'},
	{iconPath: '/image/icon/Iconos_Redes/Instagram_NegativoStroke@2x.png', href: 'https://instagram.com/bechapra', label: 'Instagram'},
];

export default function Footer() {
	 const currentYear = new Date().getFullYear();
   return (
	  <footer className="w-screen relative overflow-hidden text-white" style={{background: 'linear-gradient(135deg, #0A1933 0%, #003D95 50%, #004AB7 100%)', marginLeft: 'calc(-50vw + 50%)'}}>
			{/* Decorative background elements */}
			<motion.div
				animate={{scale: [1, 1.1, 1]}}
				transition={{duration: 8, repeat: Infinity}}
				style={{
					position: 'absolute',
					width: '400px',
					height: '400px',
					background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
					borderRadius: '50%',
					top: '-100px',
					right: '-100px',
					pointerEvents: 'none'
				}}
			/>
			<motion.div
				animate={{scale: [1, 0.9, 1]}}
				transition={{duration: 10, repeat: Infinity, delay: 1}}
				style={{
					position: 'absolute',
					width: '350px',
					height: '350px',
					background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
					borderRadius: '50%',
					bottom: '-80px',
					left: '-80px',
					pointerEvents: 'none'
				}}
			/>

			   <div className="max-w-[1400px] mx-auto relative z-10 px-5 py-10 md:py-16 lg:py-20">
				{/* Main footer content grid */}
					   <div className="flex flex-col gap-12 sm:grid sm:grid-cols-2 sm:gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.1fr] lg:gap-16 lg:mb-12">
					{/* Brand section - larger */}
					<motion.div
						initial={{opacity: 0, y: 20}}
						whileInView={{opacity: 1, y: 0}}
						viewport={{once: true}}
						transition={{duration: 0.6}}
					>
					   <Link href="/" className="flex justify-center sm:inline-block sm:justify-start mb-5 lg:mb-8 no-underline">
							<Image
								src="/image/logo/Logo_1x1_BlancoSinFondo@2x.png"
								alt="Bechapra Logo"
								width={100}
								height={100}
								   className="h-[70px] lg:h-[100px] w-auto mb-5 lg:mb-8"
								priority
							/>
						</Link>

					   <p className="text-sm lg:text-base text-white/80 leading-relaxed mb-5 lg:mb-6 text-center sm:text-left pr-0 sm:pr-4">
							Tu aliado estratégico en soluciones empresariales integrales. Transformamos organizaciones desde adentro.
						</p>

					{/* Social links */}
					   <div className="flex gap-3 mt-5 sm:justify-start justify-center">
							{socialLinks.map((social, i) => {
								return (
									<motion.a
										key={i}
										href={social.href}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={social.label}
										whileHover={{scale: 1.2, y: -3}}
										whileTap={{scale: 0.9}}
										   className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 text-white no-underline border border-white/20 p-2 transition-all hover:bg-white/20"
									>
										<Image 
											src={social.iconPath}
											alt={social.label}
											width={24}
											height={24}
											style={{
												width: '100%',
												height: '100%',
												objectFit: 'contain'
											}}
										/>
									</motion.a>
								);
							})}
						</div>
					</motion.div>

					{/* Links sections */}
					{[
						{title: 'Empresa', links: footerLinks.empresa},
						{title: 'Servicios', links: footerLinks.servicios},
						{title: 'Legal', links: footerLinks.legal}
					].map((section, sectionIdx) => (
						<motion.div
							key={sectionIdx}
							initial={{opacity: 0, y: 20}}
							whileInView={{opacity: 1, y: 0}}
							viewport={{once: true}}
							transition={{duration: 0.6, delay: (sectionIdx + 1) * 0.1}}
						>
							   <h3 className="uppercase text-white font-extrabold text-base lg:text-lg mb-7 tracking-wider opacity-90 text-center sm:text-left">
								{section.title}
							</h3>

							   <ul className="flex flex-col gap-3 items-center sm:items-start list-none p-0 m-0">
								{section.links.map((link, i) => (
									<li key={i}>
									   <Link href={link.href} className="text-white/75 no-underline text-sm lg:text-base transition-all inline-block hover:text-blue-500 hover:pl-2">
										   {link.label}
									   </Link>
									</li>
								))}
							</ul>
						</motion.div>
					))}

					{/* Contact info */}
					<motion.div
						initial={{opacity: 0, y: 20}}
						whileInView={{opacity: 1, y: 0}}
						viewport={{once: true}}
						transition={{duration: 0.6, delay: 0.4}}
					>
						   <h3 className="uppercase text-white font-extrabold text-sm mb-5 tracking-wider opacity-90 text-center sm:text-left">
							Contacto
						</h3>

					   <div className="text-white/75 [&_a]:text-white/75 [&_a:hover]:text-blue-400">
							   <CompanyLocation />
						</div>
					</motion.div>
				</div>

				{/* Divider */}
				   <div className="h-px my-7 lg:my-10" style={{background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)'}} />

				{/* Bottom footer */}
				   <motion.div
					   initial={{opacity: 0}}
					   whileInView={{opacity: 1}}
					   viewport={{once: true}}
					   transition={{duration: 0.6, delay: 0.5}}
					   className="flex flex-col items-center justify-center gap-4 text-center sm:flex-row sm:justify-between sm:gap-8"
				   >
					   <p className="text-xs text-white/60 m-0">© {currentYear} Bechapra. Todos los derechos reservados.</p>
					   <div className="flex gap-4 flex-wrap justify-center">
						   <a href="/politica-de-privacidad" className="text-xs text-white/60 no-underline transition-colors hover:text-blue-500">Política de privacidad</a>
						   <a href="/terminos-de-servicio" className="text-xs text-white/60 no-underline transition-colors hover:text-blue-500">Términos de servicio</a>
					   </div>
				   </motion.div>
			</div>
		</footer>
	);
}
