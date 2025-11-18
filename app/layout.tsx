import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CookieConsent from "@/components/CookieConsent";
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Bechapra — Soluciones Empresariales",
  description: "Capital Humano, Desarrollo Organizacional y Management Services",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning className={montserrat.variable}>
      <head>
        {/* Adobe Fonts - Mundial */}
        <link rel="stylesheet" href="https://use.typekit.net/abc1def.css"></link>
      </head>
      <body>
        <Navbar />
        <main className="container">
          {children}
        </main>
        <CookieConsent />
      </body>
    </html>
  );
}