import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
// Lista de locales soportados
const locales = [
  'es-MX',
  'en-US',
  'en-GB',
  'ru',
  'zh',
  'fr',
  'de',
  'it',
  'pt',
  'nl'
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Si la ruta ya tiene un locale, no redirigir
  const hasLocale = locales.some((locale: string) => pathname.startsWith(`/${locale}`));

  // Ignorar archivos públicos y rutas de Next.js
  if (
    hasLocale ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  // Redirigir a /es-MX por defecto
  const url = request.nextUrl.clone();
  url.pathname = `/es-MX${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const configMatcher = {
  matcher: ['/((?!_next|api|favicon.ico|robots.txt|sitemap.xml).*)'],
};
