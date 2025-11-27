"use client";

import AnimatedSection from "./AnimatedSection";
import Image from "next/image";
import styles from "../css/components/ServicesSection.module.css";

export default function ServicesSection({ dict }: { dict: any }) {
  return (
    <section id="servicios">
      <AnimatedSection>
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-5 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3">{dict.home?.services?.title ?? "Nuestros Servicios"}</h2>
          <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mb-4" />
          <p className="text-base sm:text-lg md:text-xl text-slate-600">
            {dict.home?.services?.subtitle ?? "Soluciones integrales diseñadas para optimizar cada aspecto de tu organización"}
          </p>
        </div>
      </AnimatedSection>

      <div className={styles.servicesShowcase + " max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"}>
        <div className={styles.overlapRow}>
          {/* Card 1: Capital humano */}
          <a href="/servicios/capital-humano" className={styles.cardLink}>
            <div className={styles.cardOverlap}>
              <div className={styles.cardImageCrop}>
                <Image 
                  src="/imagen/servicos/Capital_Humano_FInal.jpg" 
                  alt={dict.home?.services?.cards?.[0]?.title ?? "Capital humano"} 
                  width={600} 
                  height={200} 
                  className={styles.cardImg} 
                />
              </div>
              <div className={styles.infoBox}>
                <div className={styles.iconBox}>
                  <Image 
                    src="/imagen/icon/Capital Humano_Icon_Color@2x.png" 
                    alt={dict.home?.services?.cards?.[0]?.title ?? "Capital humano icon"} 
                    width={64} 
                    height={64}
                    style={{ objectFit: 'contain', width: 'auto', height: 'auto' }}
                  />
                </div>
                <div>
                  <h3 className={styles.infoTitle}>{dict.home?.services?.cards?.[0]?.title ?? "Capital humano"}</h3>
                  <p className={styles.infoDesc}>{dict.home?.services?.cards?.[0]?.desc ?? "Aumenta la eficiencia y resultados de tu negocio."}</p>
                  <button className={styles.detailBtn} onClick={e => e.stopPropagation()}>
                    {dict.home?.services?.cards?.[0]?.cta ?? "Conoce más"}
                  </button>
                </div>
              </div>
            </div>
          </a>
          {/* Card 2: Servicios especializados */}
          <a href="/servicios/desarrollo-organizacional" className={styles.cardLink}>
            <div className={styles.cardOverlap}>
              <div className={styles.cardImageCrop}>
                <Image 
                  src="/imagen/servicos/servicios-especializados.jpg" 
                  alt={dict.home?.services?.cards?.[1]?.title ?? "Servicios especializados"} 
                  width={600} 
                  height={200} 
                  className={styles.cardImg} 
                />
              </div>
              <div className={styles.infoBox}>
                <div className={styles.iconBox}>
                  <Image 
                    src="/imagen/icon/ServicosEspecializados_Icon_Color@2x.png" 
                    alt={dict.home?.services?.cards?.[1]?.title ?? "Servicios especializados icon"} 
                    width={75} 
                    height={75}
                    style={{ objectFit: 'contain', width: 'auto', height: 'auto' }}
                  />
                </div>
                <div>
                  <h3 className={styles.infoTitle}>{dict.home?.services?.cards?.[1]?.title ?? "Servicios especializados"}</h3>
                  <p className={styles.infoDesc}>{dict.home?.services?.cards?.[1]?.desc ?? "Aumenta la eficiencia y resultados de tu negocio."}</p>
                  <button className={styles.detailBtn} onClick={e => e.stopPropagation()}>
                    {dict.home?.services?.cards?.[1]?.cta ?? "Conoce más"}
                  </button>
                </div>
              </div>
            </div>
          </a>
          {/* Card 3: Servicios de Impuestos (destacada) */}
          <a href="/servicios/management-services" className={styles.cardLink}>
            <div className={styles.cardOverlap}>
              <div className={styles.cardImageCrop}>
                <Image 
                  src="/imagen/servicos/servicios-impuestos.jpg" 
                  alt={dict.home?.services?.cards?.[2]?.title ?? "Servicios de Impuestos"} 
                  width={600} 
                  height={200} 
                  className={styles.cardImg} 
                />
              </div>
              <div className={styles.infoBox}>
                <div className={styles.iconBox}>
                  <Image 
                    src="/imagen/icon/ServiciosdeImpuestos_Icon_Color@2x.png" 
                    alt={dict.home?.services?.cards?.[2]?.title ?? "Servicios de Impuestos icon"} 
                    width={64} 
                    height={64}
                    style={{ objectFit: 'contain', width: 'auto', height: 'auto' }}
                  />
                </div>
                <div>
                  <h3 className={styles.infoTitle}>{dict.home?.services?.cards?.[2]?.title ?? "Servicios de Impuestos"}</h3>
                  <p className={styles.infoDesc}>{dict.home?.services?.cards?.[2]?.desc ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam"}</p>
                  <button className={styles.detailBtn} onClick={e => e.stopPropagation()}>
                    {dict.home?.services?.cards?.[2]?.cta ?? "Conoce más"}
                  </button>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}