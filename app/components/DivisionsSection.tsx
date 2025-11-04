"use client";

import AnimatedSection from "./AnimatedSection";
import DivisionButton from "./DivisionButton";

export default function DivisionsSection() {
  const divisions = [
    { label: "BTC", description: "Soluciones tecnológicas y transformación digital" },
    { label: "Bechapra Studio", description: "Diseño y desarrollo de experiencias digitales" },
    { label: "Bechapra Consultores", description: "Asesoría estratégica y consultoría empresarial" }
  ];

  return (
    <section id="divisiones" className="mb-32">
      <AnimatedSection>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Divisiones de Bechapra</h2>
          <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mb-6" />
          <p className="text-lg text-slate-600">
            Especializadas en diferentes áreas para ofrecerte soluciones a medida
          </p>
        </div>
      </AnimatedSection>

      <div className="space-y-4 max-w-4xl mx-auto">
        {divisions.map((division, idx) => (
          <AnimatedSection key={division.label} delay={idx * 0.1}>
            <DivisionButton label={division.label} description={division.description} />
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
