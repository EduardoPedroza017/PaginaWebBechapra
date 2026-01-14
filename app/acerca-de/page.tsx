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
import { TranslateText } from "@/components/TranslateText"; // Added missing import for TranslateText

export default function AcercaDePage() {
  return (
    <main className="bg-white dark:bg-slate-900 min-h-screen">
      {/* Hero Section */}
      <AboutHero />

      {/* Misión, Visión y Valores */}
      <EssenceSection />

      {/* Redirect Button to Board Page */}
      <section className="py-10 bg-gray-100 dark:bg-gray-800 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            <TranslateText text="Conoce a Nuestro Consejo" />
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            <TranslateText text="Descubre a los líderes que guían nuestra organización hacia el éxito." />
          </p>
          <a
            href="/sobre-nosotros/consejo"
            className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200"
          >
            <TranslateText text="Ir al Consejo" />
          </a>
        </div>
      </section>

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
