"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Linkedin, Youtube, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
	const currentYear = new Date().getFullYear();

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
		{iconPath: '/imagen/icon/Iconos_Redes/Facebook_NegativoStroke@2x.png', href: 'https://facebook.com/bechapra', label: 'Facebook'},
		{iconPath: '/imagen/icon/Iconos_Redes/Linkedin_NegativoStroke@2x.png', href: 'https://linkedin.com/company/bechapra', label: 'LinkedIn'},
		{iconPath: '/imagen/icon/Iconos_Redes/Youtube_NegativoStroke@2x.png', href: 'https://youtube.com/@bechapra', label: 'YouTube'},
		{iconPath: '/imagen/icon/Iconos_Redes/Instagram_NegativoStroke@2x.png', href: 'https://instagram.com/bechapra', label: 'Instagram'},
	];

	return (
		<footer style={{
			width: '100vw',
			marginLeft: 'calc(-50vw + 50%)',
			background: 'linear-gradient(135deg, #001a4d 0%, #003d8f 50%, #004AB7 100%)',
			color: 'white',
			position: 'relative',
			overflow: 'hidden'
		}}>
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
					background: 'radial-gradient(circle, rgba(0,172,183,0.05) 0%, transparent 70%)',
					borderRadius: '50%',
					bottom: '-80px',
					left: '-80px',
					pointerEvents: 'none'
				}}
			/>

			<div style={{
				maxWidth: '1400px',
				margin: '0 auto',
				padding: '4rem 2rem 2rem',
				position: 'relative',
				zIndex: 2
			}}>
				{/* Main footer content grid */}
				<div style={{
					display: 'grid',
					gridTemplateColumns: '1.3fr 1fr 1fr 1fr 1.1fr',
					gap: '4rem',
					marginBottom: '3rem',
					alignItems: 'start'
				}}>
					{/* Brand section - larger */}
					<motion.div
						initial={{opacity: 0, y: 20}}
						whileInView={{opacity: 1, y: 0}}
						viewport={{once: true}}
						transition={{duration: 0.6}}
					>
						<Link href="/" style={{
							display: 'inline-block',
							marginBottom: '2rem',
							textDecoration: 'none'
						}}>
							<Image
								src="/imagen/Logo_1x1_BlancoSinFondo@2x.png"
								alt="Bechapra Logo"
								width={100}
								height={100}
								style={{
									width: 'auto',
									height: '100px'
								}}
								priority
							/>
						</Link>

						<p style={{
							fontSize: '0.95rem',
							color: 'rgba(255,255,255,0.8)',
							lineHeight: 1.6,
							marginBottom: '1.5rem',
							margin: 0,
							paddingRight: '1rem'
						}}>
							Tu aliado estratégico en soluciones empresariales integrales. Transformamos organizaciones desde adentro.
						</p>

						{/* Social links */}
						<div style={{
							display: 'flex',
							gap: '1rem',
							marginTop: '1.5rem'
						}}>
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
										style={{
											display: 'inline-flex',
											alignItems: 'center',
											justifyContent: 'center',
											width: '40px',
											height: '40px',
											borderRadius: '8px',
											background: 'rgba(255,255,255,0.1)',
											color: 'white',
											textDecoration: 'none',
											transition: 'all 0.3s ease',
											border: '1px solid rgba(255,255,255,0.2)',
											padding: '0.5rem'
										}}
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
							<h3 style={{
								fontSize: '1rem',
								fontWeight: 800,
								marginBottom: '1.75rem',
								color: 'white',
								margin: 0,
								textTransform: 'uppercase',
								letterSpacing: '0.05em',
								opacity: 0.9
							}}>
								{section.title}
							</h3>

							<ul style={{
								listStyle: 'none',
								padding: 0,
								margin: 0,
								display: 'flex',
								flexDirection: 'column',
								gap: '1rem'
							}}>
								{section.links.map((link, i) => (
									<li key={i}>
										<Link href={link.href} style={{
											color: 'rgba(255,255,255,0.75)',
											textDecoration: 'none',
											fontSize: '0.95rem',
											transition: 'all 0.3s ease',
											display: 'inline-block'
										}}
										onMouseEnter={(e) => {
											const el = e.currentTarget as HTMLAnchorElement;
											el.style.color = '#FFD700';
											el.style.paddingLeft = '8px';
										}}
										onMouseLeave={(e) => {
											const el = e.currentTarget as HTMLAnchorElement;
											el.style.color = 'rgba(255,255,255,0.75)';
											el.style.paddingLeft = '0px';
										}}
										>
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
						<h3 style={{
							fontSize: '1rem',
							fontWeight: 800,
							marginBottom: '1.75rem',
							color: 'white',
							margin: 0,
							textTransform: 'uppercase',
							letterSpacing: '0.05em',
							opacity: 0.9
						}}>
							Contacto
						</h3>

						<div style={{
							display: 'flex',
							flexDirection: 'column',
							gap: '1.25rem'
						}}>
							<a href="mailto:contacto@bechapra.com" style={{
								display: 'flex',
								alignItems: 'flex-start',
								gap: '0.75rem',
								color: 'rgba(255,255,255,0.75)',
								textDecoration: 'none',
								transition: 'all 0.3s ease',
								fontSize: '0.9rem'
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.color = '#FFD700';
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.color = 'rgba(255,255,255,0.75)';
							}}
							>
								<Mail size={18} style={{marginTop: '2px', flexShrink: 0}} />
								<span>contacto@bechapra.com</span>
							</a>

							<a href="tel:+525585482311" style={{
								display: 'flex',
								alignItems: 'flex-start',
								gap: '0.75rem',
								color: 'rgba(255,255,255,0.75)',
								textDecoration: 'none',
								transition: 'all 0.3s ease',
								fontSize: '0.9rem'
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.color = '#FFD700';
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.color = 'rgba(255,255,255,0.75)';
							}}
							>
								<Phone size={18} style={{marginTop: '2px', flexShrink: 0}} />
								<span>(55) 8548 2311</span>
							</a>

							<div style={{
								display: 'flex',
								alignItems: 'flex-start',
								gap: '0.75rem',
								color: 'rgba(255,255,255,0.75)',
								fontSize: '0.9rem'
							}}>
								<MapPin size={18} style={{marginTop: '2px', flexShrink: 0}} />
								<span>Ciudad de México, México</span>
							</div>
						</div>
					</motion.div>
				</div>

				{/* Divider */}
				<div style={{
					height: '1px',
					background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
					margin: '3rem 0'
				}} />

				{/* Bottom footer */}
				<motion.div
					initial={{opacity: 0}}
					whileInView={{opacity: 1}}
					viewport={{once: true}}
					transition={{duration: 0.6, delay: 0.5}}
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						flexWrap: 'wrap',
						gap: '2rem'
					}}
				>
					<p style={{
						fontSize: '0.9rem',
						color: 'rgba(255,255,255,0.6)',
						margin: 0
					}}>
						© {currentYear} Bechapra. Todos los derechos reservados.
					</p>

					<div style={{
						display: 'flex',
						gap: '2rem',
						flexWrap: 'wrap'
					}}>
						<a href="/politica-de-privacidad" style={{
							fontSize: '0.9rem',
							color: 'rgba(255,255,255,0.6)',
							textDecoration: 'none',
							transition: 'color 0.3s ease'
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.color = '#FFD700';
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
						}}
						>
							Política de privacidad
						</a>
						<a href="/terminos-de-servicio" style={{
							fontSize: '0.9rem',
							color: 'rgba(255,255,255,0.6)',
							textDecoration: 'none',
							transition: 'color 0.3s ease'
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.color = '#FFD700';
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
						}}
						>
							Términos de servicio
						</a>
					</div>
				</motion.div>
			</div>
		</footer>
	);
}
