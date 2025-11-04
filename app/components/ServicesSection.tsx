"use client";

import AnimatedSection from "./AnimatedSection";
import ServiceCard from "./ServiceCard";
import Image from "next/image";
import styles from "../css/components/ServicesSection.module.css";

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

      {/* Overlapping showcase */}
      <div className={`${styles.servicesShowcase} max-w-7xl mx-auto px-6 lg:px-8`}> 
        <div className={`${styles.stackRow} mt-6 md:mt-8 relative`}>
          {/* Left card */}
          <div className={`${styles.cardBase} w-64 md:w-72 bg-white rounded-2xl -translate-y-6`}>
            <div className={`${styles.cardImageCrop}`}>
              <Image src="/imagen/service1.jpg" alt="Capital humano" width={600} height={200} className="object-cover w-full h-full" />
            </div>
            <div className="p-6 bg-white rounded-b-2xl">
              <div className={`${styles.cardIconWrap} bg-white/80`}> 
                {/* icon */}
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2v20" stroke="#1E40AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h3 className="mt-4 font-semibold text-lg">Capital humano</h3>
              <p className="mt-2 text-sm text-slate-600">Aumenta la eficiencia de tus procesos y talento.</p>
            </div>
          </div>

          {/* Middle card */}
          <div className={`${styles.cardBase} w-64 md:w-72 bg-white rounded-2xl -translate-y-3`}>
            <div className={`${styles.cardImageCrop}`}>
              <Image src="/imagen/service2.jpg" alt="Servicios especializados" width={600} height={200} className="object-cover w-full h-full" />
            </div>
            <div className="p-6 bg-white rounded-b-2xl">
              <div className={`${styles.cardIconWrap} bg-white/80`}> 
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12h18" stroke="#1E40AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h3 className="mt-4 font-semibold text-lg">Servicios especializados</h3>
              <p className="mt-2 text-sm text-slate-600">Aumenta la eficiencia y resultados de tu negocio.</p>
            </div>
          </div>

          {/* Right highlighted card */}
          <div className={`${styles.cardBase} ${styles.cardHighlight} w-72 md:w-80 bg-blue-600 rounded-3xl text-white`}> 
            <div className={`${styles.cardImageCrop} rounded-t-3xl overflow-hidden`}>
              <Image src="/imagen/service3.jpg" alt="Servicios de Impuestos" width={800} height={260} className="object-cover w-full h-full" />
            </div>
            <div className="p-6 rounded-b-3xl bg-blue-600">
              <div className={`${styles.cardIconWrap} bg-white/12 text-white`}> 
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2v20" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h3 className="mt-4 font-semibold text-lg text-white">Servicios de Impuestos</h3>
              <p className="mt-2 text-sm text-white/90">Soluciones integrales para el cumplimiento fiscal de tu empresa.</p>
            </div>
          </div>

        </div>
      </div>

      {/* Preserve existing grid of ServiceCard components for accessibility/nav */}
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 justify-items-center items-start">
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
