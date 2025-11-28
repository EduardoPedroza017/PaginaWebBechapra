
"use client";

import React, { useEffect, useState } from 'react';
import AnimatedSection from "./AnimatedSection";
import Image from "next/image";
import styles from "../css/components/ServicesSection.module.css";
import { useLanguage } from '../../lib/LanguageContext';
import { translateText } from '../../lib/translate';

export default function ServicesSection() {
  const { lang } = useLanguage();
  const [sectionTitle, setSectionTitle] = useState('Nuestros Servicios');
  const [sectionSubtitle, setSectionSubtitle] = useState('Soluciones integrales diseñadas para optimizar cada aspecto de tu organización');
  const [card1Title, setCard1Title] = useState('Capital humano');
  const [card1Desc, setCard1Desc] = useState('Aumenta la eficiencia y resultados de tu negocio.');
  const [card2Title, setCard2Title] = useState('Servicios especializados');
  const [card2Desc, setCard2Desc] = useState('Aumenta la eficiencia y resultados de tu negocio.');
  const [card3Title, setCard3Title] = useState('Servicios de Impuestos');
  const [card3Desc, setCard3Desc] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam');
  const [buttonText, setButtonText] = useState('Conoce más');

  useEffect(() => {
    async function fetchTranslations() {
      if (lang === 'es') {
        setSectionTitle('Nuestros Servicios');
        setSectionSubtitle('Soluciones integrales diseñadas para optimizar cada aspecto de tu organización');
        setCard1Title('Capital humano');
        setCard1Desc('Aumenta la eficiencia y resultados de tu negocio.');
        setCard2Title('Servicios especializados');
        setCard2Desc('Aumenta la eficiencia y resultados de tu negocio.');
        setCard3Title('Servicios de Impuestos');
        setCard3Desc('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam');
        setButtonText('Conoce más');
      } else {
        setSectionTitle(await translateText('Nuestros Servicios', lang));
        setSectionSubtitle(await translateText('Soluciones integrales diseñadas para optimizar cada aspecto de tu organización', lang));
        setCard1Title(await translateText('Capital humano', lang));
        setCard1Desc(await translateText('Aumenta la eficiencia y resultados de tu negocio.', lang));
        setCard2Title(await translateText('Servicios especializados', lang));
        setCard2Desc(await translateText('Aumenta la eficiencia y resultados de tu negocio.', lang));
        setCard3Title(await translateText('Servicios de Impuestos', lang));
        setCard3Desc(await translateText('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam', lang));
        setButtonText(await translateText('Conoce más', lang));
      }
    }
    fetchTranslations();
  }, [lang]);

  return (
    <section id="servicios">
      <AnimatedSection>
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-5 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3">{sectionTitle}</h2>
          <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mb-4" />
          <p className="text-base sm:text-lg md:text-xl text-slate-600">
            {sectionSubtitle}
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
                  alt={card1Title} 
                  width={600} 
                  height={200} 
                  className={styles.cardImg} 
                />
              </div>
              <div className={styles.infoBox}>
                <div className={styles.iconBox}>
                  <Image 
                    src="/imagen/icon/Capital Humano_Icon_Color@2x.png" 
                    alt="Capital humano icon" 
                    width={64} 
                    height={64}
                    style={{ objectFit: 'contain', width: 'auto', height: 'auto' }}
                  />
                </div>
                <div>
                  <h3 className={styles.infoTitle}>{card1Title}</h3>
                  <p className={styles.infoDesc}>{card1Desc}</p>
                  <button className={styles.detailBtn} onClick={e => e.stopPropagation()}>
                    {buttonText}
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
                  alt={card2Title} 
                  width={600} 
                  height={200} 
                  className={styles.cardImg} 
                />
              </div>
              <div className={styles.infoBox}>
                <div className={styles.iconBox}>
                  <Image 
                    src="/imagen/icon/ServicosEspecializados_Icon_Color@2x.png" 
                    alt="Servicios especializados icon" 
                    width={75} 
                    height={75}
                    style={{ objectFit: 'contain', width: 'auto', height: 'auto' }}
                  />
                </div>
                <div>
                  <h3 className={styles.infoTitle}>{card2Title}</h3>
                  <p className={styles.infoDesc}>{card2Desc}</p>
                  <button className={styles.detailBtn} onClick={e => e.stopPropagation()}>
                    {buttonText}
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
                  alt={card3Title} 
                  width={600} 
                  height={200} 
                  className={styles.cardImg} 
                />
              </div>
              <div className={styles.infoBox}>
                <div className={styles.iconBox}>
                  <Image 
                    src="/imagen/icon/ServiciosdeImpuestos_Icon_Color@2x.png" 
                    alt="Servicios de Impuestos icon" 
                    width={64} 
                    height={64}
                    style={{ objectFit: 'contain', width: 'auto', height: 'auto' }}
                  />
                </div>
                <div>
                  <h3 className={styles.infoTitle}>{card3Title}</h3>
                  <p className={styles.infoDesc}>{card3Desc}</p>
                  <button className={styles.detailBtn} onClick={e => e.stopPropagation()}>
                    {buttonText}
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