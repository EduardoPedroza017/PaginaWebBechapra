/**
 * Ejemplo de cómo integrar Google Analytics con consentimiento de cookies
 * 
 * Para usar este archivo:
 * 1. Instala: npm install react-ga4
 * 2. Importa en tu layout.tsx o donde necesites analytics
 * 3. Reemplaza 'G-XXXXXXXXXX' con tu ID de Google Analytics
 */

import { canUseAnalytics } from './cookieConsent';

// Tu ID de Google Analytics
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Reemplaza con tu ID real

/**
 * Inicializa Google Analytics solo si el usuario aceptó cookies
 */
export const initGoogleAnalytics = () => {
	if (typeof window === 'undefined') return;

	// Solo inicializar si el usuario aceptó cookies de analytics
	if (!canUseAnalytics()) {
		console.log('📊 Google Analytics deshabilitado - Usuario rechazó cookies');
		return;
	}

	// Método 1: Google Analytics 4 con gtag.js
	const script = document.createElement('script');
	script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
	script.async = true;
	document.head.appendChild(script);

	(window as any).dataLayer = (window as any).dataLayer || [];
	function gtag(...args: any[]) {
		(window as any).dataLayer.push(args);
	}
	(window as any).gtag = gtag;

	gtag('js', new Date());
	gtag('config', GA_MEASUREMENT_ID, {
		anonymize_ip: true, // Anonimizar IP por privacidad
		cookie_flags: 'SameSite=None;Secure'
	});

	console.log('✅ Google Analytics inicializado');
};

/**
 * Registra un evento en Google Analytics
 */
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
	if (!canUseAnalytics()) return;

	if (typeof window !== 'undefined' && (window as any).gtag) {
		(window as any).gtag('event', eventName, eventParams);
		console.log(`📊 Evento rastreado: ${eventName}`, eventParams);
	}
};

/**
 * Registra una vista de página
 */
export const trackPageView = (url: string) => {
	if (!canUseAnalytics()) return;

	if (typeof window !== 'undefined' && (window as any).gtag) {
		(window as any).gtag('config', GA_MEASUREMENT_ID, {
			page_path: url
		});
		console.log(`📊 Página vista: ${url}`);
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
	(window as any)[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
	
	console.log('❌ Google Analytics deshabilitado');
};
