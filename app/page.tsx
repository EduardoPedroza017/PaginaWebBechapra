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
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Hero Section - Full width, no container */}
      <HeroSection />
      
      {/* Services Section */}
      <Section>
        <ServicesSection />
      </Section>

      {/* Press Cards - Blue Background */}
      <Section variant="blue">
        <AnimatedSection delay={0.1}>
          <PressCards />
        </AnimatedSection>
      </Section>

      {/* Training Center */}
      <Section>
        <TrainingCenterSection />
      </Section>

      {/* News Cards - Blue Background */}
      <Section variant="blue">
        <AnimatedSection>
          <NewsCards />
        </AnimatedSection>
      </Section>

      {/* CTA Social Media */}
      <Section>
        <AnimatedSection delay={0.2}>
          <CtaRedes />
        </AnimatedSection>
      </Section>

      {/* Awards - Blue Background */}
      <Section variant="blue">
        <AwardsSection />
      </Section>

      {/* Contact Section */}
      <Section id="contacto">
        <ContactSection />
      </Section>

      {/* Footer */}
      <Footer />
    </>
  );
}
