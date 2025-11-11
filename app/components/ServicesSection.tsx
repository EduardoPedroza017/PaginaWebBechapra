"use client";

import AnimatedSection from "./AnimatedSection";
import Image from "next/image";
import { FiUsers, FiSettings, FiFileText } from "react-icons/fi";
import styles from "../css/components/ServicesSection.module.css";

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

      <div className={styles.servicesShowcase + " max-w-7xl mx-auto px-6 lg:px-8"}>
        <div className={styles.overlapRow}>
          {/* Card 1: Capital humano */}
          <a href="/servicios/capital-humano" className={styles.cardLink}>
            <div className={styles.cardOverlap}>
              <div className={styles.cardImageCrop}>
                <Image 
                  src="/imagen/servicos/capital-humano.webp" 
                  alt="Capital humano" 
                  width={600} 
                  height={200} 
                  className={styles.cardImg} 
                />
              </div>
              <div className={styles.infoBox}>
                <div className={styles.iconBox}>
                  <FiUsers size={48} color="#2563eb" />
                </div>
                <div>
                  <h3 className={styles.infoTitle}>Capital humano</h3>
                  <p className={styles.infoDesc}>Aumenta la eficiencia y resultados de tu negocio.</p>
                  <a href="/servicios/capital-humano" className={styles.detailBtn} tabIndex={-1} onClick={e => e.stopPropagation()}>
                    Conoce más
                  </a>
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
                  alt="Servicios especializados" 
                  width={600} 
                  height={200} 
                  className={styles.cardImg} 
                />
              </div>
              <div className={styles.infoBox}>
                <div className={styles.iconBox}>
                  <FiSettings size={48} color="#2563eb" />
                </div>
                <div>
                  <h3 className={styles.infoTitle}>Servicios especializados</h3>
                  <p className={styles.infoDesc}>Aumenta la eficiencia y resultados de tu negocio.</p>
                  <a href="/servicios/desarrollo-organizacional" className={styles.detailBtn} tabIndex={-1} onClick={e => e.stopPropagation()}>
                    Conoce más
                  </a>
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
                  alt="Servicios de Impuestos" 
                  width={600} 
                  height={200} 
                  className={styles.cardImg} 
                />
              </div>
              <div className={styles.infoBox}>
                <div className={styles.iconBox}>
                  <FiFileText size={48} color="#2563eb" />
                </div>
                <div>
                  <h3 className={styles.infoTitle}>Servicios de Impuestos</h3>
                  <p className={styles.infoDesc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam</p>
                  <a href="/servicios/management-services" className={styles.detailBtn} tabIndex={-1} onClick={e => e.stopPropagation()}>
                    Conoce más
                  </a>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
      
    </section>
  );
}