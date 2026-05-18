import React from "react";
import { Montserrat } from 'next/font/google';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./editorial.css";

// Context Providers
import { LanguageProvider } from "@/lib/contexts/LanguageContext";
import { ThemeProvider } from "@/lib/contexts/ThemeContext";

// Components
import NavbarConditional from "@/components/NavbarConditional";
import CookieConsent from "@/components/CookieConsent";
import Analytics from "@/components/Analytics";
import ScrollRestorer from "@/components/ScrollRestorer";
import LenisProvider from "@/app/components/LenisProvider";
import { EditorialLayer } from "@/components/editorial";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-montserrat',
  display: 'swap',
});

import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://bausen.mx'),
  title: {
    default: 'Bausen | Capital Humano y Management Services en México',
    template: '%s | Bausen'
  },
  description: 'Impulsamos tu talento. Capital Humano, Desarrollo Organizacional y Management Services. Líderes certificados REPSE, ISO, NOM.',
  keywords: ['capital humano', 'REPSE', 'servicios especializados', 'management services', 'desarrollo organizacional', 'México'],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://bausen.mx/web/' },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://bausen.mx/web/',
    siteName: 'Bausen',
    title: 'Bausen | Impulsamos tu talento',
    description: 'Soluciones empresariales integrales de Capital Humano, Desarrollo Organizacional y Management Services.',
    images: [{ url: '/web/og-image.jpg', width: 1200, height: 630, alt: 'Bausen - Soluciones empresariales integrales' }]
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/web/favicon.ico' }
};

const fontVariables = `${geistSans.variable} ${geistMono.variable} ${montserrat.variable}`;

export default function RootLayout({ 
  children,
}: { 
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="es" 
      suppressHydrationWarning 
      className={`${fontVariables} scroll-smooth`}
    >
      <head>
        <title>Bausen | Soluciones Estratégicas de Talento y Management</title>
        <meta name="description" content="Transformamos organizaciones a través de soluciones estratégicas de talento, gestión operativa y desarrollo empresarial." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var theme = localStorage.getItem('theme');
              if (theme === 'dark') {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            } catch (e) {}
          })();
        ` }} />
      </head>
      
      <body className="antialiased bg-background text-foreground min-h-screen selection:bg-blue-600/20 selection:text-blue-700 dark:selection:bg-blue-500/30 dark:selection:text-blue-400">
        <ThemeProvider>
          <LanguageProvider>
            <LenisProvider />
            <EditorialLayer />
            <div className="fixed top-0 left-0 right-0 z-50" data-editorial-nav>
              <NavbarConditional />
            </div>
            
            <main id="main-content" className="min-h-screen pt-0">
              {children}
            </main>

            {/* <ScrollRestorer /> */}
            <Analytics />
            <CookieConsent />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
