"use client";

import ContactForm from "./components/ContactForm";
import AnimatedSection from "./components/AnimatedSection";
import CtaRedes from "./components/CtaRedes";
import ServicesSection from "./components/ServicesSection";
import AwardsSection from "./components/AwardsSection";
import TrainingCenterSection from "./components/TrainingCenterSection";
import HeroSection from "./components/HeroSection";
//import PressSection from "./components/PressSection";
import NewsCards from "./components/NewsCards";
import PressCards from "./components/PressCards";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100 text-slate-900 overflow-x-hidden">
      {/* HERO (full-bleed) */}
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        {/* SERVICIOS */}
        <ServicesSection />

        {/*Cards de Prensa*/}
        <AnimatedSection delay={0.1}>
          <PressCards />
        </AnimatedSection>

        {/* BECHAPRA TRAINING CENTER */}
        <TrainingCenterSection />

        {/*Cards de Noticias*/}
        <AnimatedSection>
          <NewsCards />
        </AnimatedSection>
        
        
        {/* CTA + REDES */}
        <AnimatedSection delay={0.2}>
            <CtaRedes />
        </AnimatedSection>

        {/* PREMIOS */}
        <AwardsSection />

        {/* FORMULARIO */}
        <section id="contacto" className="mb-8 sm:mb-12 md:mb-16">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16 px-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Contáctanos</h2>
              <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mb-6" />
              <p className="text-base sm:text-lg text-slate-600">
                ¿Tienes alguna pregunta o proyecto en mente? Déjanos tu mensaje.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <ContactForm />
          </AnimatedSection>
        </section>
      </div>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}