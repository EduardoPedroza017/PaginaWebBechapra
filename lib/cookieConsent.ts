/**
 * Utilidades para gestionar el consentimiento de cookies
 */

export type CookieConsentStatus = 'accepted' | 'rejected' | 'pending';

export interface CookiePreferences {
	analytics: boolean;
	marketing: boolean;
	functionality: boolean;
}

/**
 * Obtiene el estado del consentimiento de cookies
 */
export const getCookieConsent = (): CookieConsentStatus => {
	if (typeof window === 'undefined') return 'pending';
	
	const consent = localStorage.getItem('cookieConsent');
	
	if (consent === 'accepted') return 'accepted';
	if (consent === 'rejected') return 'rejected';
	return 'pending';
};

/**
 * Verifica si el usuario ha aceptado las cookies
 */
export const hasAcceptedCookies = (): boolean => {
	return getCookieConsent() === 'accepted';
};

/**
 * Verifica si el usuario ha rechazado las cookies
 */
export const hasRejectedCookies = (): boolean => {
	return getCookieConsent() === 'rejected';
};

/**
 * Verifica si aún no ha respondido sobre cookies
 */
export const isPendingCookieConsent = (): boolean => {
	return getCookieConsent() === 'pending';
};

/**
 * Obtiene las preferencias específicas de cookies
 */
export const getCookiePreferences = (): CookiePreferences => {
	if (typeof window === 'undefined') {
		return {
			analytics: false,
			marketing: false,
			functionality: false
		};
	}

	return {
		analytics: localStorage.getItem('analytics_enabled') === 'true',
		marketing: localStorage.getItem('marketing_enabled') === 'true',
		functionality: localStorage.getItem('functionality_enabled') === 'true'
	};
};

/**
 * Verifica si se pueden usar cookies de Analytics
 */
export const canUseAnalytics = (): boolean => {
	return getCookiePreferences().analytics;
};

/**
 * Verifica si se pueden usar cookies de Marketing
 */
export const canUseMarketing = (): boolean => {
	return getCookiePreferences().marketing;
};

/**
 * Verifica si se pueden usar cookies de Funcionalidad
 */
export const canUseFunctionality = (): boolean => {
	return getCookiePreferences().functionality;
};

/**
 * Obtiene la fecha en que se dio el consentimiento
 */
export const getConsentDate = (): Date | null => {
	if (typeof window === 'undefined') return null;
	
	const dateStr = localStorage.getItem('cookieConsentDate');
	return dateStr ? new Date(dateStr) : null;
};

/**
 * Resetea el consentimiento de cookies (útil para testing)
 */
export const resetCookieConsent = (): void => {
	if (typeof window === 'undefined') return;
	
	localStorage.removeItem('cookieConsent');
	localStorage.removeItem('cookieConsentDate');
	localStorage.removeItem('analytics_enabled');
	localStorage.removeItem('marketing_enabled');
	localStorage.removeItem('functionality_enabled');
};

/**
 * Verifica si el consentimiento necesita renovación (más de 12 meses)
 */
export const needsConsentRenewal = (): boolean => {
	const consentDate = getConsentDate();
	if (!consentDate) return true;
	
	const monthsSinceConsent = (Date.now() - consentDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
	return monthsSinceConsent > 12;
};
