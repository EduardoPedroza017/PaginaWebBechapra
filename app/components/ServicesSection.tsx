"use client";

import AnimatedSection from "./AnimatedSection";
import ServiceCard from "./ServiceCard";

export default function ServicesSection() {
  return (
    <section id="servicios" className="mb-32">
      <AnimatedSection>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestros Servicios</h2>
          <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mb-6" />
          <p className="text-lg text-slate-600">
            Soluciones integrales diseñadas para optimizar cada aspecto de tu organización
          </p>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 justify-items-center items-start">
        <AnimatedSection delay={0.1}>
          <ServiceCard
            title="Capital Humano"
            href="/servicios/capital-humano"
            items={["Servicios especializados", "Payrolling", "Atracción de Talento"]}
            description="Gestionamos y optimizamos el talento humano de tu organización para maximizar su potencial."
            gradient="from-blue-50 to-blue-100/50"
            color="blue"
          />
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <ServiceCard
            title="Desarrollo Organizacional"
            href="/servicios/desarrollo-organizacional"
            items={["Desarrollo organizacional", "Capacitación Empresarial", "NOM 035"]}
            description="Transformamos tu organización mediante estrategias que fomentan el crecimiento y la adaptabilidad."
            gradient="from-slate-50 to-slate-100/50"
            color="slate"
          />
        </AnimatedSection>
        <AnimatedSection delay={0.3}>
          <ServiceCard
            title="Management Services"
            href="/servicios/management-services"
            items={["Servicios Contables", "Servicios Legales", "Servicios PYME"]}
            description="Ofrecemos servicios administrativos y de gestión para que te enfoques en lo que realmente importa."
            gradient="from-blue-50 to-slate-100/50"
            color="indigo"
          />
        </AnimatedSection>
      </div>
    </section>
  );
}
