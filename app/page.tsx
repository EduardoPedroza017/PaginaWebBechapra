"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Section from "./components/Section";
import AnimatedSection from "./components/AnimatedSection";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import Footer from "@/components/Footer";

// Lazy load componentes debajo del fold
const PressCards = dynamic(() => import('./components/PressCards'), {
  loading: () => <div className="w-full h-96 bg-slate-100 animate-pulse rounded-lg" />,
});

const TrainingCenterSection = dynamic(() => import('./components/TrainingCenterSection'), {
  loading: () => <div className="w-full h-64 bg-slate-100 animate-pulse rounded-lg" />,
});

const NewsCards = dynamic(() => import('./components/NewsCards'), {
  loading: () => <div className="w-full h-96 bg-slate-100 animate-pulse rounded-lg" />,
});

const CtaRedes = dynamic(() => import('./components/CtaRedes'));

const AwardsSection = dynamic(() => import('./components/AwardsSection'));

const ContactSection = dynamic(() => import('./components/ContactSection'), {
  loading: () => <div className="w-full h-[600px] bg-slate-100 animate-pulse rounded-lg" />,
});

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

      {/* Awards - Blue Background (comentado temporalmente) */}
      {/*
      <Section variant="blue">
        <AwardsSection />
      </Section>
      */}

      {/* Contact Section */}
      <Section id="contacto">
        <ContactSection />
      </Section>

      {/* Footer */}
      <Footer />
    </>
  );
}
