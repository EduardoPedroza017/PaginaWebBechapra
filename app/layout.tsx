"use client";

import React from "react";
import { Montserrat } from 'next/font/google';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Context Providers
import { LanguageProvider } from "@/lib/contexts/LanguageContext";
import { ThemeProvider } from "@/lib/contexts/ThemeContext";

// Hooks
import useLenis from "@/hooks/useLenis";

// Components
import NavbarConditional from "@/components/NavbarConditional";
import CookieConsent from "@/components/CookieConsent";
import Analytics from "@/components/Analytics";
import ScrollRestorer from "@/components/ScrollRestorer";

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

const fontVariables = `${geistSans.variable} ${geistMono.variable} ${montserrat.variable}`;

export default function RootLayout({ 
  children,
}: { 
  children: React.ReactNode;
}) {
  // Activate global smooth scroll
  useLenis();

  return (
    <html 
      lang="es" 
      suppressHydrationWarning 
      className={`${fontVariables} scroll-smooth`}
    >
      <head>
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
            <div className="fixed top-0 left-0 right-0 z-50">
              <NavbarConditional />
            </div>
            
            <main id="main-content" className="min-h-screen pt-0">
              {children}
            </main>

            <ScrollRestorer />
            <Analytics />
            <CookieConsent />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
