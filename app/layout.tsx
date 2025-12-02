import type { Metadata } from "next";
import "./globals.css";
import NavbarConditional from "@/components/NavbarConditional";
import CookieConsent from "@/components/CookieConsent";
import Analytics from "@/components/Analytics";
import { Montserrat } from 'next/font/google';
import { Geist, Geist_Mono } from "next/font/google";
import { LanguageProvider } from "@/lib/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Bechapra — Soluciones Empresariales",
  description: "Capital Humano, Desarrollo Organizacional y Management Services",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};




export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable}`}>
      <head>
        {/* Adobe Fonts - Mundial */}
        <link rel="stylesheet" href="https://use.typekit.net/abc1def.css" />
      </head>
      <body className="antialiased">
        <LanguageProvider>
          <NavbarConditional />
          <main className="min-h-screen w-full overflow-x-hidden">
            {children}
          </main>
          <Analytics />
          <CookieConsent />
        </LanguageProvider>
      </body>
    </html>
  );
}
