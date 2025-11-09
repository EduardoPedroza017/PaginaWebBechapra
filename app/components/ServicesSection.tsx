"use client";

import AnimatedSection from "./AnimatedSection";
import Image from "next/image";
import styles from "../css/components/ServicesSection.module.css";
import carouselStyles from "../css/components/ServicesCarousel.module.css";

export default function ServicesSection() {
  return (
    <section id="servicios" className="mb-16 sm:mb-24 md:mb-32">
      <AnimatedSection>
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Nuestros Servicios</h2>
          <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mb-6" />
          <p className="text-base sm:text-lg text-slate-600">
            Soluciones integrales diseñadas para optimizar cada aspecto de tu organización
          </p>
        </div>
      </AnimatedSection>

      {/* Overlapping showcase (visual) */}
      <div className={`${styles.servicesShowcase} max-w-7xl mx-auto px-6 lg:px-8`}>
        <div className={`${styles.stackRow} mt-6 md:mt-8 relative`}>

          {/* Left card */}
          <a href="/servicios/capital-humano" className="block">
            <div className={`${styles.cardBase} ${carouselStyles.card} -translate-y-6`}>
              <div className={carouselStyles.cardImage}>
                <Image src="/imagen/servicos/capital-humano.webp" alt="Capital humano" width={600} height={200} className="object-cover w-full h-full" />
              </div>
              <div className={carouselStyles.cardContent}>
                <div>
                  {/* icon badge removed per design: cleaner card header */}
                  <h3 className="mt-4 font-semibold text-lg">Capital humano</h3>
                  <p className="mt-2 text-sm text-slate-600">Aumenta la eficiencia de tus procesos y talento mediante selección, retención y optimización del equipo humano.</p>

                  {/* Items list */}
                  <div className={carouselStyles.itemsBox}>
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-2 flex flex-col gap-2">
                      {["Servicios especializados", "Payrolling", "Atracción de Talento"].map((it, i) => (
                        <div key={i} className="bg-white border border-slate-200/80 rounded-md px-3 py-2 shadow-sm flex items-center gap-3">
                          <span aria-hidden="true" className="inline-block w-2 h-2 rounded-full bg-blue-600" />
                          <span className="text-sm text-slate-800 font-medium">{it}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-center">
                  <span className={carouselStyles.btnPrimary}>Ver servicios</span>
                </div>
              </div>
            </div>
          </a>

          {/* Middle card */}
          <a href="/servicios/desarrollo-organizacional" className="block">
            <div className={`${styles.cardBase} ${carouselStyles.card} -translate-y-3`}>
              <div className={carouselStyles.cardImage}>
                <Image src="/imagen/servicos/servicios-especializados.jpg" alt="Servicios especializados" width={600} height={200} className="object-cover w-full h-full" />
              </div>
              <div className={carouselStyles.cardContent}>
                <div>
                  {/* icon badge removed per design: cleaner card header */}
                  <h3 className="mt-4 font-semibold text-lg">Servicios especializados</h3>
                  <p className="mt-2 text-sm text-slate-600">Mejoramos procesos y capacidades organizacionales a través de diagnóstico, intervención y capacitación.</p>

                  <div className={carouselStyles.itemsBox}>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 flex flex-col gap-2">
                      {["Desarrollo organizacional", "Capacitación Empresarial", "NOM 035"].map((it, i) => (
                        <div key={i} className="bg-white border border-slate-200/80 rounded-md px-3 py-2 shadow-sm flex items-center gap-3">
                          <span aria-hidden="true" className="inline-block w-2 h-2 rounded-full bg-slate-600" />
                          <span className="text-sm text-slate-800 font-medium">{it}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-center">
                  <span className={carouselStyles.btnPrimary}>Ver servicios</span>
                </div>
              </div>
            </div>
          </a>

          {/* Right highlighted card */}
          <a href="/servicios/management-services" className="block">
            <div className={`${styles.cardBase} ${carouselStyles.card} ${carouselStyles.highlight} rounded-3xl text-white bg-blue-600`}> 
              <div className={`${carouselStyles.cardImage} rounded-t-3xl overflow-hidden`}>
                <Image src="/imagen/servicos/servicios-impuestos.jpg" alt="Servicios de Impuestos" width={800} height={260} className="object-cover w-full h-full" />
              </div>
              <div className={`${carouselStyles.cardContent} rounded-b-3xl bg-blue-600 text-white`}> 
                <div>
                  {/* icon badge removed per design: cleaner card header */}
                  <h3 className="mt-4 font-semibold text-lg text-black">Servicios de Impuestos</h3>
                  <p className="mt-2 text-sm text-white/90">Soluciones integrales para el cumplimiento fiscal de tu empresa, desde declaración hasta cumplimiento y consultoría.</p>

                  <div className={carouselStyles.itemsBox}>
                    <div className="bg-indigo-50/10 border border-white/10 rounded-lg p-2 flex flex-col gap-2">
                      {["Servicios Contables", "Servicios Legales", "Servicios PYME"].map((it, i) => (
                        <div key={i} className="bg-white border border-white/10 rounded-md px-3 py-2 shadow-sm flex items-center gap-3">
                          <span aria-hidden="true" className="inline-block w-2 h-2 rounded-full bg-white" />
                          <span className="text-sm font-medium" style={{ color: '#1E40AF' }}>{it}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex justify-center">
                    <span className="bg-white px-4 py-2 rounded-lg text-sm font-semibold shadow" style={{ color: '#1E40AF' }}>Ver servicios</span>
                  </div>
                </div>
              </div>
            </div>
          </a>

        </div>
      </div>
      
    </section>
  );
}
