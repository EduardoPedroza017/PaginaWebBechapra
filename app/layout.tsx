import type { Metadata, Viewport } from "next";
import { Montserrat } from 'next/font/google';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Context Providers
import { LanguageProvider } from "@/lib/contexts/LanguageContext";
import { ThemeProvider } from "@/lib/contexts/ThemeContext";

// Components
import NavbarConditional from "@/components/NavbarConditional";
import CookieConsent from "@/components/CookieConsent";
import Analytics from "@/components/Analytics";
import ScrollRestorer from "@/components/ScrollRestorer";

// ============================================================================
// FONT CONFIGURATION
// ============================================================================

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
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

const fontVariables = `${geistSans.variable} ${geistMono.variable} ${montserrat.variable}`;

// ============================================================================
// METADATA & VIEWPORT CONFIGURATION
// ============================================================================

export const metadata: Metadata = {
  title: {
    default: "Bausen — Soluciones Empresariales Integrales",
    template: "%s | Bausen"
  },
  description: "Capital Humano, Desarrollo Organizacional y Management Services para empresas modernas",
  keywords: [
    "capital humano",
    "desarrollo organizacional", 
    "consultoría empresarial",
    "management services",
    "recursos humanos",
    "transformación digital"
  ],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0057D9' },
    { media: '(prefers-color-scheme: dark)', color: '#0a1627' },
  ],
  colorScheme: 'light dark',
};

// ============================================================================
// ROOT LAYOUT COMPONENT
// ============================================================================

export default function RootLayout({ 
  children,
}: { 
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="es" 
      suppressHydrationWarning 
      className={`${fontVariables}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Prevent FOUC: set initial theme class before React hydrates */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var theme = localStorage.getItem('theme');
              if (theme === 'dark') {
                document.documentElement.classList.add('dark');
              } else if (theme === 'light') {
                document.documentElement.classList.remove('dark');
              } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark');
              }
            } catch (e) {}
          })();
        ` }} />
      </head>
      
      <body className="antialiased bg-background text-foreground min-h-screen">
        <ThemeProvider>
          <LanguageProvider>            
            {/* Navigation - Wrapped to ensure proper positioning */}
            <div className="fixed top-0 left-0 right-0 z-50">
              <NavbarConditional />
            </div>
            
            {/* Main content with proper spacing */}
            <main 
              id="main-content"
              className="min-h-screen pt-0"  /* Reduced top padding to remove excessive space above admin header */
            >
              {children}
            </main>

            {/* Persist & restore scroll per-path */}
            <ScrollRestorer />
            
            {/* Analytics */}
            <Analytics />
            
            {/* Cookie Consent */}
            <CookieConsent />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
