"use client";

import Footer from "@/components/Footer";
import Section from "@/app/components/Section";
import SubpageHero from "@/components/SubpageHero";
import {
  EssenceSection,
  HistorySection,
  TestimonialsSection,
  WhyUsSection,
  ProcessSection,
  FAQSection,
} from "./components";
import { TranslateText } from "@/components/TranslateText";
import { ArrowRight, Users } from "lucide-react";
import Link from "next/link";

export default function AcercaDePage() {
  return (
    <main className="bg-white dark:bg-slate-950 min-h-screen">
      {/* Hero Section Unificado */}
      <SubpageHero 
        badge="Nuestra Esencia"
        title="Transformamos Organizaciones"
        subtitle="Más de 15 años impulsando el crecimiento estratégico a través de soluciones integrales en capital humano y gestión empresarial."
      />

      {/* Misión, Visión y Valores */}
      <EssenceSection />

      {/* Redirect Button to Board Page - Refinado */}
      <Section variant="blue" size="sm">
        <div className="max-w-5xl mx-auto">
          <div className="bg-slate-950 rounded-[2.5rem] p-10 lg:p-16 text-center relative overflow-hidden shadow-2xl shadow-blue-900/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]" />
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs font-black uppercase tracking-widest">
                <Users className="w-4 h-4" />
                <TranslateText text="Liderazgo" />
              </div>
              <h2 className="text-3xl lg:text-5xl font-black text-white tracking-tight">
                <TranslateText text="Conoce a Nuestro Consejo" />
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium">
                <TranslateText text="Descubra a los líderes visionarios que guían nuestra organización hacia la excelencia y el éxito sostenible." />
              </p>
              <div className="pt-4">
                <Link
                  href="/sobre-nosotros/consejo"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-blue-700 text-white font-black uppercase tracking-widest text-sm rounded-2xl shadow-xl hover:bg-blue-600 hover:-translate-y-1 transition-all group"
                >
                  <TranslateText text="Ver Equipo Directivo" />
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Historia y Logros */}
      <HistorySection />

      {/* Historias de Clientes / Testimonios */}
      <TestimonialsSection />

      {/* ¿Por qué BAUSEN? */}
      <WhyUsSection />

      {/* Nuestro Proceso */}
      <ProcessSection />

      {/* Preguntas Frecuentes */}
      <FAQSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
