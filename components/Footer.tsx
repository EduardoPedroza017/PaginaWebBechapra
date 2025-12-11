"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { CompanyLocation } from './CompanyLocation';
import { TranslateText } from './TranslateText';

const footerLinks = {
	empresa: [
		{ label: 'Acerca de', href: '/acerca-de' },
		{ label: 'Servicios', href: '/servicios' },
		{ label: 'Noticias', href: '/noticias' },
		{ label: 'Prensa', href: '/prensa' },
		{ label: 'Contacto', href: '/#contacto' },
	],
	servicios: [
		{ label: 'Capital Humano', href: '/servicios/capital-humano' },
		{ label: 'Servicios Legales', href: '/servicios/servicios-legales' },
		{ label: 'Servicios Contables', href: '/servicios/servicios-contables' },
		{ label: 'Desarrollo Organizacional', href: '/servicios/desarrollo-organizacional' },
	],
	legal: [
		{ label: 'Política de privacidad', href: '/politica-de-privacidad' },
		{ label: 'Términos de servicio', href: '/terminos-de-servicio' },
		{ label: 'Política de cookies', href: '/politica-de-cookies' },
	]
};

const socialLinks = [
	{ iconPath: '/image/icon/Iconos_Redes/Facebook_NegativoStroke@2x.png', href: 'https://facebook.com/bechapra', label: 'Facebook' },
	{ iconPath: '/image/icon/Iconos_Redes/Linkedin_NegativoStroke@2x.png', href: 'https://linkedin.com/company/bechapra', label: 'LinkedIn' },
	{ iconPath: '/image/icon/Iconos_Redes/Youtube_NegativoStroke@2x.png', href: 'https://youtube.com/@bechapra', label: 'YouTube' },
	{ iconPath: '/image/icon/Iconos_Redes/Instagram_NegativoStroke@2x.png', href: 'https://instagram.com/bechapra', label: 'Instagram' },
];

function useLogoUrl() {
	const [logoUrl, setLogoUrl] = useState<string>('/image/bechapra-logo.png');
	useEffect(() => {
		async function fetchLogo() {
			try {
				const res = await fetch('http://localhost:5000/api/logo');
				const data = await res.json();
				if (data.url) {
					setLogoUrl(data.url);
				}
			} catch (e) {
				setLogoUrl('/image/bechapra-logo.png');
			}
		}
		fetchLogo();
	}, []);
	return logoUrl;
}

function LogoImage() {
	const logoUrl = useLogoUrl();
	return (
		<Image
			src={logoUrl}
			alt="Bechapra"
			width={120}
			height={32}
			className="h-8 w-auto block"
		/>
	);
}

function FooterLinkSection({ title, links, delay }: { title: string, links: { label: string, href: string }[], delay: number }) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6, delay }}
			className="w-full"
		>
			{/* Mobile Accordion Header */}
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="flex md:hidden items-center justify-between w-full py-3 text-left group"
			>
				<h3 className="uppercase text-white font-extrabold text-sm tracking-wider opacity-90 group-hover:text-blue-400 transition-colors">
					<TranslateText text={title} />
				</h3>
				<ChevronDown className={`w-5 h-5 text-white/60 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-400' : ''}`} />
			</button>

			{/* Desktop Header */}
			<h3 className="hidden md:block uppercase text-white font-extrabold text-sm lg:text-base mb-6 tracking-wider opacity-90">
				<TranslateText text={title} />
			</h3>

			{/* Links List (Accordion on Mobile, Static on Desktop) */}
			<div className="hidden md:block">
				<ul className="flex flex-col gap-3 list-none p-0 m-0">
					{links.map((link, i) => (
						<li key={i}>
							<Link href={link.href} className="text-white/70 no-underline text-sm lg:text-base transition-all inline-block hover:text-white hover:translate-x-1">
								<TranslateText text={link.label} />
							</Link>
						</li>
					))}
				</ul>
			</div>

			{/* Mobile Collapsible Content */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="md:hidden overflow-hidden"
					>
						<ul className="flex flex-col gap-3 list-none p-0 m-0 pb-4 pl-2 border-l border-white/10 ml-1">
							{links.map((link, i) => (
								<li key={i}>
									<Link href={link.href} className="text-white/70 no-underline text-sm transition-all inline-block hover:text-white hover:translate-x-1">
										<TranslateText text={link.label} />
									</Link>
								</li>
							))}
						</ul>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="w-full relative overflow-hidden bg-slate-950 text-white">
			{/* Gradient Background */}
			<div className="absolute inset-0 bg-linear-to-br from-slate-950 via-[#003D95] to-[#004AB7] opacity-90" />

			{/* Decorative background elements */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<motion.div
					animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
					transition={{ duration: 8, repeat: Infinity }}
					className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-blue-500/20 blur-3xl"
				/>
				<motion.div
					animate={{ scale: [1, 0.9, 1], opacity: [0.2, 0.4, 0.2] }}
					transition={{ duration: 10, repeat: Infinity, delay: 1 }}
					className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-3xl"
				/>
			</div>

			<div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto relative z-10 px-6 sm:px-8 lg:px-12 py-12 lg:py-20">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">

					{/* Brand Section (Left Column) */}
					<div className="lg:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
						<Link href="/" className="inline-block mb-6">
							<Image
								src="/image/logo/Logo_1x1_BlancoSinFondo@2x.png"
								alt="Bechapra Logo"
								width={120}
								height={120}
								className="h-20 w-auto"
								priority
							/>
						</Link>
						<p className="text-white/80 leading-relaxed mb-8 max-w-sm">
							<TranslateText text="Tu aliado estratégico en soluciones empresariales integrales. Transformamos organizaciones desde adentro." />
						</p>
						<div className="flex gap-4">
							{socialLinks.map((social, i) => (
								<motion.a
									key={i}
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={social.label}
									whileHover={{ scale: 1.1, y: -2 }}
									whileTap={{ scale: 0.95 }}
									className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center transition-colors hover:bg-white hover:text-blue-600"
								>
									<Image
										src={social.iconPath}
										alt={social.label}
										width={20}
										height={20}
										className="w-5 h-5 object-contain brightness-0 invert group-hover:invert-0"
									/>
								</motion.a>
							))}
						</div>
					</div>

					{/* Links Sections (Middle Columns) */}
					<div className="lg:col-span-2">
						<FooterLinkSection title="Empresa" links={footerLinks.empresa} delay={0.1} />
					</div>
					<div className="lg:col-span-3">
						<FooterLinkSection title="Servicios" links={footerLinks.servicios} delay={0.2} />
					</div>

					{/* Contact Section (Right Column) */}
					<div className="lg:col-span-3">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.3 }}
						>
							<h3 className="uppercase text-white font-extrabold text-sm lg:text-base mb-6 tracking-wider opacity-90 text-center md:text-left">
								<TranslateText text="Contacto" />
							</h3>
							<div className="text-white/75 [&_a]:text-white/75 [&_a:hover]:text-white [&_a]:transition-colors">
								<CompanyLocation />
							</div>
						</motion.div>
					</div>
				</div>

				{/* Divider */}
				<div className="h-px w-full bg-linear-to-r from-transparent via-white/20 to-transparent my-8" />

				{/* Bottom Bar */}
				<div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-white/60">
					<div className="flex items-center gap-3">
						<LogoImage />
						<span className="text-xs text-slate-500 font-semibold tracking-wide">© {currentYear} Bechapra</span>
					</div>
					<div className="flex items-center gap-6">
						<Link href="/politica-de-privacidad" className="hover:text-white transition-colors">
							<TranslateText text="Privacidad" />
						</Link>
						<Link href="/terminos-de-servicio" className="hover:text-white transition-colors">
							<TranslateText text="Términos" />
						</Link>
					</div>
				</div>

			</div>
		</footer>
	);
}
