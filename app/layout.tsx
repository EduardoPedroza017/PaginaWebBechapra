import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";


export const metadata: Metadata = {
title: "Bechapra — Glass, 3D & Motion",
description: "Landing moderna con glassmorphism, 3D y animaciones fluidas",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="es" suppressHydrationWarning>
<body className="min-h-dvh bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white antialiased">
{/* Fondo decorativo */}
<div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
<div className="absolute -top-40 left-1/2 h-[60rem] w-[60rem] -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-3xl" />
<div className="absolute -bottom-40 left-1/3 h-[50rem] w-[50rem] rounded-full bg-cyan-400/10 blur-3xl" />
</div>
<Navbar />
<main className="container mx-auto max-w-7xl px-4 pb-24 pt-28">
{children}
</main>
</body>
</html>
);
}