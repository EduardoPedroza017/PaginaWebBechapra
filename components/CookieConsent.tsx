"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { setCookieConsentBackend } from "../lib/cookieConsent";

export default function CookieConsent() {
	const [showBanner, setShowBanner] = useState(false);

	useEffect(() => {
		// Verificar si el usuario ya aceptó o rechazó las cookies
		const cookieConsent = localStorage.getItem('cookieConsent');
		if (!cookieConsent) {
			// Mostrar el banner después de un pequeño delay
			setTimeout(() => setShowBanner(true), 1000);
		}
	}, []);

	const handleAccept = async () => {
		localStorage.setItem('cookieConsent', 'accepted');
		localStorage.setItem('cookieConsentDate', new Date().toISOString());
		setShowBanner(false);
		
		// Activar todas las cookies (analíticas, marketing, etc.)
		enableAllCookies();
		
		// Guardar preferencia en backend
		await setCookieConsentBackend(true);
		
		console.log('✅ Cookies aceptadas - Todas las cookies habilitadas');
	};

	const handleReject = async () => {
		localStorage.setItem('cookieConsent', 'rejected');
		localStorage.setItem('cookieConsentDate', new Date().toISOString());
		setShowBanner(false);
		
		// Eliminar cookies no esenciales
		disableNonEssentialCookies();
		
		// Guardar preferencia en backend
		await setCookieConsentBackend(false);
		
		console.log('❌ Cookies rechazadas - Solo cookies esenciales');
	};

	// Función para habilitar todas las cookies
	const enableAllCookies = () => {
		// Aquí puedes activar Google Analytics
		if (typeof window !== 'undefined' && (window as Window & { gtag?: (...args: unknown[]) => void }).gtag) {
			(window as unknown as { gtag: (...args: unknown[]) => void }).gtag('consent', 'update', {
				analytics_storage: 'granted',
				ad_storage: 'granted',
				functionality_storage: 'granted',
				personalization_storage: 'granted',
				security_storage: 'granted'
			});
		}

		// Ejemplo: Activar Google Analytics
		// if (typeof window !== 'undefined') {
		//   window.dataLayer = window.dataLayer || [];
		//   window.dataLayer.push({
		//     'event': 'cookie_consent_granted'
		//   });
		// }

		// Guardar preferencias específicas
		localStorage.setItem('analytics_enabled', 'true');
		localStorage.setItem('marketing_enabled', 'true');
		localStorage.setItem('functionality_enabled', 'true');
	};

	// Función para deshabilitar cookies no esenciales
	const disableNonEssentialCookies = () => {
		// Denegar consentimiento en Google Analytics
		if (typeof window !== 'undefined' && (window as Window & { gtag?: (...args: unknown[]) => void }).gtag) {
			(window as unknown as { gtag: (...args: unknown[]) => void }).gtag('consent', 'update', {
				analytics_storage: 'denied',
				ad_storage: 'denied',
				functionality_storage: 'denied',
				personalization_storage: 'denied',
				security_storage: 'granted' // Solo seguridad permitida
			});
		}

		// Eliminar cookies de terceros existentes
		const cookiesToDelete = [
			'_ga', '_gid', '_gat', // Google Analytics
			'_fbp', '_fbc', // Facebook
			'__utm', // Tracking cookies
		];

		cookiesToDelete.forEach(cookieName => {
			document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
			document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
		});

		// Guardar preferencias
		localStorage.setItem('analytics_enabled', 'false');
		localStorage.setItem('marketing_enabled', 'false');
		localStorage.setItem('functionality_enabled', 'false');

		console.log('🧹 Cookies no esenciales eliminadas');
	};

	const handleClose = () => {
		setShowBanner(false);
	};

	return (
		<AnimatePresence>
			{showBanner && (
				<>
					{/* Overlay de fondo */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						style={{
							position: 'fixed',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							backgroundColor: 'rgba(0, 0, 0, 0.5)',
							zIndex: 9998,
							backdropFilter: 'blur(4px)'
						}}
						onClick={handleClose}
					/>

					{/* Banner de Cookies */}
					<motion.div
						initial={{ y: 100, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 100, opacity: 0 }}
						transition={{ duration: 0.4, ease: 'easeOut' }}
						style={{
							position: 'fixed',
							bottom: 0,
							left: 0,
							right: 0,
							zIndex: 9999,
							padding: 'clamp(1.5rem, 3vw, 2rem)',
							background: 'linear-gradient(to top, #ffffff 0%, #f8fafc 100%)',
							boxShadow: '0 -4px 30px rgba(0, 0, 0, 0.15), 0 -2px 10px rgba(0, 74, 183, 0.1)',
							borderTop: '3px solid #004AB7'
						}}
					>
						<div style={{
							maxWidth: '1400px',
							margin: '0 auto',
							display: 'flex',
							flexDirection: 'column',
							gap: '1.5rem'
						}}>
							{/* Contenido del mensaje */}
							<div style={{
								display: 'flex',
								alignItems: 'flex-start',
								gap: '1.5rem',
								flexWrap: 'wrap'
							}}>
								{/* Icono */}
								<div style={{
									width: '48px',
									height: '48px',
									borderRadius: '12px',
									background: 'linear-gradient(135deg, #004AB7 0%, #0066CC 100%)',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									flexShrink: 0,
									boxShadow: '0 4px 12px rgba(0, 74, 183, 0.3)'
								}}>
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
										<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
									</svg>
								</div>

								{/* Texto */}
								<div style={{ flex: 1, minWidth: '300px' }}>
									<h3 style={{
										fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
										fontWeight: 700,
										color: '#1e293b',
										marginBottom: '0.75rem',
										margin: 0
									}}>
										Este sitio web utiliza cookies
									</h3>
									<p style={{
										fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
										lineHeight: 1.6,
										color: '#475569',
										margin: 0,
										marginBottom: '0.5rem'
									}}>
										Este sitio web utiliza cookies y otras tecnologías de seguimiento para mejorar su experiencia de navegación. 
										Bechapra está comprometido con su privacidad y seguridad.{' '}
										<Link 
											href="/politica-de-privacidad" 
											style={{
												color: '#004AB7',
												textDecoration: 'underline',
												fontWeight: 600
											}}
										>
											Conozca más sobre nuestra Política de Privacidad
										</Link>
										{' '}y{' '}
										<Link 
											href="/politica-de-cookies" 
											style={{
												color: '#004AB7',
												textDecoration: 'underline',
												fontWeight: 600
											}}
										>
											Política de Cookies
										</Link>
										. Puede aceptar o rechazar todas las cookies que venden y/o comparten su información personal.
									</p>
								</div>
							</div>

							{/* Botones */}
							<div style={{
								display: 'flex',
								gap: '1rem',
								flexWrap: 'wrap',
								justifyContent: 'flex-end',
								alignItems: 'center'
							}}>
								<button
									onClick={handleReject}
									style={{
										padding: 'clamp(0.75rem, 1.5vw, 1rem) clamp(1.5rem, 2.5vw, 2rem)',
										fontSize: 'clamp(0.9rem, 1.25vw, 1rem)',
										fontWeight: 600,
										color: '#475569',
										background: 'transparent',
										border: '2px solid #cbd5e1',
										borderRadius: '8px',
										cursor: 'pointer',
										transition: 'all 0.3s ease',
										fontFamily: 'inherit'
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.background = '#f1f5f9';
										e.currentTarget.style.borderColor = '#94a3b8';
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.background = 'transparent';
										e.currentTarget.style.borderColor = '#cbd5e1';
									}}
								>
									Rechazar
								</button>

								<button
									onClick={handleAccept}
									style={{
										padding: 'clamp(0.75rem, 1.5vw, 1rem) clamp(2rem, 3vw, 2.5rem)',
										fontSize: 'clamp(0.9rem, 1.25vw, 1rem)',
										fontWeight: 600,
										color: 'white',
										background: 'linear-gradient(135deg, #004AB7 0%, #0066CC 100%)',
										border: 'none',
										borderRadius: '8px',
										cursor: 'pointer',
										transition: 'all 0.3s ease',
										boxShadow: '0 4px 12px rgba(0, 74, 183, 0.3)',
										fontFamily: 'inherit'
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.transform = 'translateY(-2px)';
										e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 74, 183, 0.4)';
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.transform = 'translateY(0)';
										e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 74, 183, 0.3)';
									}}
								>
									Aceptar
								</button>

								{/* Botón cerrar */}
								<button
									onClick={handleClose}
									style={{
										width: '40px',
										height: '40px',
										borderRadius: '8px',
										background: 'transparent',
										border: '2px solid #cbd5e1',
										cursor: 'pointer',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										transition: 'all 0.3s ease'
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.background = '#fee2e2';
										e.currentTarget.style.borderColor = '#fca5a5';
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.background = 'transparent';
										e.currentTarget.style.borderColor = '#cbd5e1';
									}}
									aria-label="Cerrar"
								>
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2">
										<path d="M18 6L6 18M6 6l12 12"/>
									</svg>
								</button>
							</div>

							{/* Links adicionales */}
							<div style={{
								display: 'flex',
								gap: '1.5rem',
								flexWrap: 'wrap',
								fontSize: '0.875rem',
								color: '#64748b',
								borderTop: '1px solid #e2e8f0',
								paddingTop: '1rem'
							}}>
								<Link 
									href="/terminos-de-servicio" 
									style={{
										color: '#64748b',
										textDecoration: 'none',
										transition: 'color 0.3s ease'
									}}
									onMouseEnter={(e) => e.currentTarget.style.color = '#004AB7'}
									onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
								>
									Términos de Servicio
								</Link>
								<span style={{ color: '#cbd5e1' }}>|</span>
								<Link 
									href="/politica-de-privacidad" 
									style={{
										color: '#64748b',
										textDecoration: 'none',
										transition: 'color 0.3s ease'
									}}
									onMouseEnter={(e) => e.currentTarget.style.color = '#004AB7'}
									onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
								>
									Política de Privacidad
								</Link>
								<span style={{ color: '#cbd5e1' }}>|</span>
								<Link 
									href="/politica-de-cookies" 
									style={{
										color: '#64748b',
										textDecoration: 'none',
										transition: 'color 0.3s ease'
									}}
									onMouseEnter={(e) => e.currentTarget.style.color = '#004AB7'}
									onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
								>
									Política de Cookies
								</Link>
							</div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
