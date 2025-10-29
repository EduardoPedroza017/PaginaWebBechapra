import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Bechapra — Soluciones Empresariales",
  description: "Capital Humano, Desarrollo Organizacional y Management Services",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <Navbar />
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  );
}