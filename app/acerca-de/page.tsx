"use client";

import Footer from "@/components/Footer";
import SpotlightCTA from "@/app/components/SpotlightCTA";
import SubpageHero from "@/components/SubpageHero";
import {
  EssenceSection,
  HistorySection,
  TestimonialsSection,
  WhyUsSection,
  ProcessSection,
  FAQSection,
} from "./components";

export default function AcercaDePage() {
  return (
    <main className="bg-white dark:bg-slate-950 min-h-screen">
      <SubpageHero
        badge="Nuestra Esencia"
        title="Transformamos Organizaciones"
        variant="servicesBlue"
        subtitle="Mas de 15 anos impulsando el crecimiento estrategico a traves de soluciones integrales en capital humano y gestion empresarial."
      />

      <EssenceSection />

      <HistorySection />
      <TestimonialsSection />
      <WhyUsSection />
      <ProcessSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
