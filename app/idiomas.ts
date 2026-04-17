import { KoHo } from "next/font/google";

// Iconos de banderas para los idiomas soportados
export const flags: Record<string, string> = {
  en: '/web/flags/gb.svg', // Inglés (Reino Unido)
  fr: '/web/flags/fr.svg', // Francés
  de: '/web/flags/de.svg', // Alemán
  it: '/web/flags/it.svg', // Italiano
  pt: '/web/flags/pt.svg', // Portugués
  es: '/web/flags/mx.svg', // Español (México)
  mx: '/web/flags/mx.svg', // México
};

export const idiomas = [
  { code: 'en', nombre: 'Inglés' },
  { code: 'fr', nombre: 'Francés' },
  { code: 'de', nombre: 'Alemán' },
  { code: 'it', nombre: 'Italiano' },
  { code: 'pt', nombre: 'Portugués' },
];
