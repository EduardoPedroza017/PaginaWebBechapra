"use client";

import Footer from "@/components/Footer";
import {
  AboutHero,
  EssenceSection,
  HistorySection,
  TestimonialsSection,
  WhyUsSection,
  ProcessSection,
  FAQSection,
  TeamSection,
} from "./components";

export default function AcercaDePage() {
  return (
    <main className="bg-white dark:bg-slate-900 min-h-screen">
      {/* Hero Section */}
      <AboutHero />

      {/* Misión, Visión y Valores */}
      <EssenceSection />

      {/* Historia y Logros */}
      <HistorySection />

      {/* Historias de Clientes / Testimonios */}
      <TestimonialsSection />

      {/* ¿Por qué Bechapra? */}
      <WhyUsSection />

      {/* Equipo Directivo */}
      <TeamSection />

      {/* Nuestro Proceso */}
      <ProcessSection />

      {/* Preguntas Frecuentes */}
      <FAQSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
