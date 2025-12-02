"use client";

import AnimatedSection from "./AnimatedSection";
import Image from "next/image";


export default function ServicesSection() {
  return (
    <section id="servicios">
      <AnimatedSection>
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-5 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3">Nuestros Servicios</h2>
          <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mb-4" />
          <p className="text-base sm:text-lg md:text-xl text-slate-600">
            Soluciones integrales diseñadas para optimizar cada aspecto de tu organización
          </p>
        </div>
      </AnimatedSection>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 justify-center items-stretch relative z-10">
          {/* Card 1: Capital humano */}
          <a href="/servicios/capital-humano" className="group flex-1 min-w-[280px] max-w-md rounded-2xl shadow-lg bg-white/90 border border-slate-200 overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl relative">
            <div className="relative h-40 w-full overflow-hidden">
              <Image 
                src="/image/servicios/Capital_Humano_FInal.jpg" 
                alt="Capital humano" 
                fill
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>
            <div className="flex gap-4 items-center p-6">
              <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-white flex items-center justify-center shadow-md">
                <Image 
                  src="/image/icon/Capital Humano_Icon_Color@2x.png" 
                  alt="Capital humano icon" 
                  width={64} 
                  height={64}
                  className="object-contain w-12 h-12"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-blue-900 mb-1">Capital humano</h3>
                <p className="text-sm text-slate-600 mb-2">Aumenta la eficiencia y resultados de tu negocio.</p>
                <button className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold text-xs shadow hover:bg-blue-200 transition" onClick={e => e.stopPropagation()}>
                  Conoce más
                </button>
              </div>
            </div>
          </a>
          {/* Card 2: Servicios especializados */}
          <a href="/servicios/desarrollo-organizacional" className="group flex-1 min-w-[280px] max-w-md rounded-2xl shadow-lg bg-white/90 border border-slate-200 overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl relative">
            <div className="relative h-40 w-full overflow-hidden">
              <Image 
                src="/image/servicios/servicios-especializados.jpg" 
                alt="Servicios especializados" 
                fill
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>
            <div className="flex gap-4 items-center p-6">
              <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-white flex items-center justify-center shadow-md">
                <Image 
                  src="/image/icon/ServiciosEspecializados_Icon_Color@2x.png" 
                  alt="Servicios especializados icon" 
                  width={64} 
                  height={64}
                  className="object-contain w-12 h-12"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-blue-900 mb-1">Servicios especializados</h3>
                <p className="text-sm text-slate-600 mb-2">Aumenta la eficiencia y resultados de tu negocio.</p>
                <button className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold text-xs shadow hover:bg-blue-200 transition" onClick={e => e.stopPropagation()}>
                  Conoce más
                </button>
              </div>
            </div>
          </a>
          {/* Card 3: Servicios de Impuestos (destacada) */}
          <a href="/servicios/management-services" className="group flex-1 min-w-[280px] max-w-md rounded-2xl shadow-lg bg-white/90 border border-slate-200 overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl relative">
            <div className="relative h-40 w-full overflow-hidden">
              <Image 
                src="/image/servicios/servicios-impuestos.jpg" 
                alt="Servicios de Impuestos" 
                fill
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>
            <div className="flex gap-4 items-center p-6">
              <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-white flex items-center justify-center shadow-md">
                <Image 
                  src="/image/icon/ServiciosdeImpuestos_Icon_Color@2x.png" 
                  alt="Servicios de Impuestos icon" 
                  width={64} 
                  height={64}
                  className="object-contain w-12 h-12"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-blue-900 mb-1">Servicios de Impuestos</h3>
                <p className="text-sm text-slate-600 mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam</p>
                <button className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold text-xs shadow hover:bg-blue-200 transition" onClick={e => e.stopPropagation()}>
                  Conoce más
                </button>
              </div>
            </div>
          </a>
        </div>
      </div>
      
    </section>
  );
}