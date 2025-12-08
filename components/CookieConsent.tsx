"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { setCookieConsentBackend } from "../lib/cookieConsent";
import { TranslateText } from './TranslateText';

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
						className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
						onClick={handleClose}
					/>

					{/* Banner de Cookies */}
					<motion.div
						initial={{ y: 100, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 100, opacity: 0 }}
						transition={{ duration: 0.4, ease: 'easeOut' }}
						className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6 lg:p-8 bg-gradient-to-t from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 shadow-[0_-4px_30px_rgba(0,0,0,0.15)] border-t-[3px] border-blue-700 dark:border-blue-500"
					>
						<div className="max-w-[1400px] mx-auto flex flex-col gap-6">
							{/* Contenido del mensaje */}
							<div className="flex items-start gap-6 flex-wrap">
								{/* Icono */}
								<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-700 to-blue-600 dark:from-blue-600 dark:to-blue-500 flex items-center justify-center shrink-0 shadow-lg shadow-blue-700/30 dark:shadow-blue-500/30">
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
										<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
									</svg>
								</div>

								{/* Texto */}
								<div className="flex-1 min-w-[300px]">
									<h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-3">
										<TranslateText text="Este sitio web utiliza cookies" />
									</h3>
									<p className="text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-300 mb-2">
										<TranslateText text="Este sitio web utiliza cookies y otras tecnologías de seguimiento para mejorar su experiencia de navegación. Bechapra está comprometido con su privacidad y seguridad." />{' '}
										<Link 
											href="/politica-de-privacidad" 
											className="text-blue-700 dark:text-blue-400 underline font-semibold hover:text-blue-600 dark:hover:text-blue-300"
										>
											<TranslateText text="Conozca más sobre nuestra Política de Privacidad" />
										</Link>
										{' '}<TranslateText text="y" />{' '}
										<Link 
											href="/politica-de-cookies" 
											className="text-blue-700 dark:text-blue-400 underline font-semibold hover:text-blue-600 dark:hover:text-blue-300"
										>
											<TranslateText text="Política de Cookies" />
										</Link>
										. <TranslateText text="Puede aceptar o rechazar todas las cookies que venden y/o comparten su información personal." />
									</p>
								</div>
							</div>

							{/* Botones */}
							<div className="flex gap-4 flex-wrap justify-end items-center">
								<button
									onClick={handleReject}
									className="px-6 py-3 text-sm md:text-base font-semibold text-slate-600 dark:text-slate-300 bg-transparent border-2 border-slate-300 dark:border-slate-600 rounded-lg cursor-pointer transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-slate-400 dark:hover:border-slate-500"
								>
									<TranslateText text="Rechazar" />
								</button>

								<button
									onClick={handleAccept}
									className="px-8 py-3 text-sm md:text-base font-semibold text-white bg-gradient-to-br from-blue-700 to-blue-600 dark:from-blue-600 dark:to-blue-500 border-none rounded-lg cursor-pointer transition-all duration-300 shadow-lg shadow-blue-700/30 dark:shadow-blue-500/30 hover:-translate-y-0.5 hover:shadow-xl"
								>
									<TranslateText text="Aceptar" />
								</button>

								{/* Botón cerrar */}
								<button
									onClick={handleClose}
									className="w-10 h-10 rounded-lg bg-transparent border-2 border-slate-300 dark:border-slate-600 cursor-pointer flex items-center justify-center transition-all duration-300 hover:bg-red-100 dark:hover:bg-red-900/30 hover:border-red-300 dark:hover:border-red-600"
									aria-label="Cerrar"
								>
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-600 dark:text-slate-400">
										<path d="M18 6L6 18M6 6l12 12"/>
									</svg>
								</button>
							</div>

							{/* Links adicionales */}
							<div className="flex gap-6 flex-wrap text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 pt-4">
								<Link 
									href="/terminos-de-servicio" 
									className="text-slate-500 dark:text-slate-400 no-underline transition-colors duration-300 hover:text-blue-700 dark:hover:text-blue-400"
								>
									<TranslateText text="Términos de Servicio" />
								</Link>
								<span className="text-slate-300 dark:text-slate-600">|</span>
								<Link 
									href="/politica-de-privacidad" 
									className="text-slate-500 dark:text-slate-400 no-underline transition-colors duration-300 hover:text-blue-700 dark:hover:text-blue-400"
								>
									<TranslateText text="Política de Privacidad" />
								</Link>
								<span className="text-slate-300 dark:text-slate-600">|</span>
								<Link 
									href="/politica-de-cookies" 
									className="text-slate-500 dark:text-slate-400 no-underline transition-colors duration-300 hover:text-blue-700 dark:hover:text-blue-400"
								>
									<TranslateText text="Política de Cookies" />
								</Link>
							</div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
