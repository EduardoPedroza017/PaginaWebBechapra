import 'server-only';

const dictionaries = {
    'es-MX': () => import('@/dictionaries/es.json').then((module) => module.default),
    'en-US': () => import('@/dictionaries/en.json').then((module) => module.default),
    // Mapeos de fallback para otros locales
    'en-GB': () => import('@/dictionaries/en.json').then((module) => module.default),
    'ru': () => import('@/dictionaries/en.json').then((module) => module.default), // Fallback a inglés por ahora
    'zh': () => import('@/dictionaries/en.json').then((module) => module.default),
    'fr': () => import('@/dictionaries/en.json').then((module) => module.default),
    'de': () => import('@/dictionaries/en.json').then((module) => module.default),
    'it': () => import('@/dictionaries/en.json').then((module) => module.default),
    'pt': () => import('@/dictionaries/en.json').then((module) => module.default),
    'nl': () => import('@/dictionaries/en.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
    // @ts-ignore
    if (dictionaries[locale]) {
        // @ts-ignore
        return dictionaries[locale]();
    }

    // Fallback seguro a español si el locale no existe
    return dictionaries['es-MX']();
};
