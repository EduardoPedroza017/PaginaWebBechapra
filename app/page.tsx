"use client";

import Section from "./components/Section";
import AnimatedSection from "./components/AnimatedSection";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import PressCards from "./components/PressCards";
import TrainingCenterSection from "./components/TrainingCenterSection";
import NewsCards from "./components/NewsCards";
import CtaRedes from "./components/CtaRedes";
import AwardsSection from "./components/AwardsSection";
import ContactSection from "./components/ContactSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      <HeroSection />

      <Section>
        <ServicesSection />
      </Section>

      <Section variant="blue">
        <AnimatedSection delay={0.1}>
          <PressCards />
        </AnimatedSection>
      </Section>

      <Section>
        <TrainingCenterSection />
      </Section>

      <Section variant="blue">
        <AnimatedSection>
          <NewsCards />
        </AnimatedSection>
      </Section>

      <Section>
        <AnimatedSection delay={0.2}>
          <CtaRedes />
        </AnimatedSection>
      </Section>

      <Section variant="blue">
        <AwardsSection />
      </Section>

      <Section id="contacto">
        <ContactSection />
      </Section>

      <Footer />
    </main>
  );
}