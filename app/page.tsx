"use client";

import ContactForm from "./components/ContactForm";
import ServiceCard from "./components/ServiceCard";
import AnimatedSection from "./components/AnimatedSection";
import CtaRedes from "./components/CtaRedes";
import ServicesSection from "./components/ServicesSection";
import AwardsSection from "./components/AwardsSection";
import DivisionsSection from "./components/DivisionsSection";
import HeroSection from "./components/HeroSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100 text-slate-900 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* HERO */}
        <HeroSection />

        {/* SERVICIOS */}
        <ServicesSection />

        {/* DIVISIONES */}
        <DivisionsSection />

        {/* CTA + REDES */}
        <AnimatedSection delay={0.2}>
            <CtaRedes />
        </AnimatedSection>

        {/* PREMIOS */}
        <AwardsSection />

        {/* FORMULARIO */}
        <section id="contacto" className="mb-16">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Contáctanos</h2>
              <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mb-6" />
              <p className="text-lg text-slate-600">
                ¿Tienes alguna pregunta o proyecto en mente? Déjanos tu mensaje.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <ContactForm />
          </AnimatedSection>
        </section>
      </div>
    </main>
  );
}