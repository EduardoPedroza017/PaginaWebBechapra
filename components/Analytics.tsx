"use client";

import { useEffect } from 'react';
import { initMicrosoftClarity } from '@/lib/analytics';
import { hasAcceptedCookies } from '@/lib/cookieConsent';

/**
 * Componente que inicializa Microsoft Clarity cuando el usuario acepta cookies
 */
export default function Analytics() {
	useEffect(() => {
		// Verificar si el usuario aceptó cookies
		if (hasAcceptedCookies()) {
			initMicrosoftClarity();
		}

		// Escuchar cambios en el consentimiento de cookies
		const handleStorageChange = (e: StorageEvent) => {
			if (e.key === 'cookieConsent' && e.newValue === 'accepted') {
				initMicrosoftClarity();
			}
		};

		window.addEventListener('storage', handleStorageChange);

		return () => {
			window.removeEventListener('storage', handleStorageChange);
		};
	}, []);

	return null; // Este componente no renderiza nada
}
