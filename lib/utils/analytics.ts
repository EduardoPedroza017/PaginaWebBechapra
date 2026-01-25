/**
 * Integración de Microsoft Clarity con consentimiento de cookies
 * 
 * Para usar este archivo:
 * 1. Obtén tu Project ID de Microsoft Clarity (https://clarity.microsoft.com)
 * 2. Reemplaza 'XXXXXXXXXX' con tu Project ID real
 * 3. Importa en tu layout.tsx
 */

import { canUseAnalytics } from './cookieConsent';

// Tu Project ID de Microsoft Clarity
// const CLARITY_PROJECT_ID = 'XXXXXXXXXX'; // Reemplaza con tu ID real de Clarity

/**
 * Inicializa Microsoft Clarity solo si el usuario aceptó cookies
 */
export const initMicrosoftClarity = () => {
  // Integración de Microsoft Clarity desactivada temporalmente
  // Para reactivar, descomenta la constante CLARITY_PROJECT_ID y el código de inicialización
	console.log('Microsoft Clarity está desactivado');
};

/**
 * OPCIONAL: Inicializa Google Analytics solo si el usuario aceptó cookies
 */
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Opcional: Si también quieres GA

export const initGoogleAnalytics = () => {
	if (typeof window === 'undefined') return;

	if (!canUseAnalytics()) {
		console.log('Google Analytics deshabilitado - Usuario rechazó cookies');
		return;
	}

	const script = document.createElement('script');
	script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
	script.async = true;
	document.head.appendChild(script);

	const win = window as unknown as { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
	win.dataLayer = win.dataLayer || [];
	function gtag(...args: unknown[]) {
		(win.dataLayer as unknown[]).push(args);
	}
	win.gtag = gtag;

	gtag('js', new Date());
	gtag('config', GA_MEASUREMENT_ID, {
		anonymize_ip: true,
		cookie_flags: 'SameSite=None;Secure'
	});

	console.log('Google Analytics inicializado');
};

/**
 * Registra un evento personalizado en Microsoft Clarity
 */
export const trackClarityEvent = (eventName: string, eventData?: Record<string, unknown>) => {
	if (!canUseAnalytics()) return;

	const win = window as unknown as { clarity?: (...args: unknown[]) => void };
	if (typeof window !== 'undefined' && win.clarity) {
		win.clarity('event', eventName);
		console.log(`Evento Clarity: ${eventName}`, eventData);
	}
};

/**
 * Identifica un usuario en Microsoft Clarity
 */
export const identifyClarityUser = (userId: string, sessionData?: Record<string, unknown>) => {
	if (!canUseAnalytics()) return;

	const win = window as unknown as { clarity?: (...args: unknown[]) => void };
	if (typeof window !== 'undefined' && win.clarity) {
		win.clarity('identify', userId, sessionData);
		console.log(`Usuario identificado en Clarity: ${userId}`);
	}
};

/**
 * Registra un evento en Google Analytics (si está habilitado)
 */
export const trackEvent = (eventName: string, eventParams?: Record<string, unknown>) => {
	if (!canUseAnalytics()) return;

	const win = window as unknown as { gtag?: (...args: unknown[]) => void };
	if (typeof window !== 'undefined' && win.gtag) {
		win.gtag('event', eventName, eventParams);
		console.log(`Evento GA: ${eventName}`, eventParams);
	}
};

/**
 * Registra una vista de página
 */
export const trackPageView = (url: string) => {
	if (!canUseAnalytics()) return;

	const win = window as unknown as { gtag?: (...args: unknown[]) => void };
	if (typeof window !== 'undefined' && win.gtag) {
		win.gtag('config', GA_MEASUREMENT_ID, {
			page_path: url
		});
		console.log(`Página vista: ${url}`);
	}
};

/**
 * Ejemplo de eventos personalizados
 */
export const trackCustomEvents = {
	// Rastrear cuando un usuario ve un servicio
	viewService: (serviceName: string) => {
		trackEvent('view_service', {
			service_name: serviceName
		});
	},

	// Rastrear cuando envían el formulario de contacto
	submitContactForm: (formType: string) => {
		trackEvent('submit_form', {
			form_type: formType
		});
	},

	// Rastrear clics en redes sociales
	clickSocialMedia: (platform: string) => {
		trackEvent('social_click', {
			platform: platform
		});
	},

	// Rastrear descarga de documentos
	downloadDocument: (documentName: string) => {
		trackEvent('download', {
			document_name: documentName
		});
	}
};

/**
 * Deshabilita Google Analytics
 */
export const disableGoogleAnalytics = () => {
	if (typeof window === 'undefined') return;

	// Deshabilitar Google Analytics
	const win = window as unknown as Record<string, boolean>;
	win[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
	
	console.log('Google Analytics deshabilitado');
};
