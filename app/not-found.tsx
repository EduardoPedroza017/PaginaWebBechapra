"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950 px-6">
      <div className="text-center">
        <h1 className="text-[120px] font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-6">
          404
        </h1>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6 tracking-tight italic">
          <TranslateText text="Página no encontrada" />
        </h2>
        <p className="text-lg text-slate-500 dark:text-slate-400 mb-12 font-medium max-w-md mx-auto text-justify">
          <TranslateText text="Lo sentimos, la página que buscas no existe o ha sido movida a otra ubicación." />
        </p>
        
        <Link
          href="/"
          className="inline-flex items-center gap-3 px-10 py-5 bg-blue-700 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-xl hover:bg-blue-800 transition-all group"
        >
          <ArrowLeft size={16} />
          <TranslateText text="Volver al inicio" />
        </Link>
      </div>
    </main>
  );
}
