import { KoHo } from "next/font/google";

// Iconos de banderas para los idiomas soportados
export const flags: Record<string, string> = {
  en: '/flags/gb.svg', // Inglés (Reino Unido)
  fr: '/flags/fr.svg', // Francés
  de: '/flags/de.svg', // Alemán
  it: '/flags/it.svg', // Italiano
  pt: '/flags/pt.svg', // Portugués
};

export const idiomas = [
  { code: 'en', nombre: 'Inglés' },
  { code: 'fr', nombre: 'Francés' },
  { code: 'de', nombre: 'Alemán' },
  { code: 'it', nombre: 'Italiano' },
  { code: 'pt', nombre: 'Portugués' },
];
