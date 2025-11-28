"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";


import { serviceGroups } from "../lib/servicesData";
import styles from "./Navbar.module.css";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "../lib/LanguageContext";
import { translateText } from "../lib/translate";

export default function Navbar() {
  const [showLogoImg, setShowLogoImg] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang } = useLanguage();
  const [navTexts, setNavTexts] = useState({
    inicio: "Inicio",
    servicios: "Servicios",
    noticias: "Noticias",
    prensa: "Prensa",
    acerca: "Acerca de",
    colaborador: "¿Eres colaborador?",
    verTodos: "Ver todos"
  });

  // Load logo on client
  useEffect(() => {
    setShowLogoImg(true);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Traducción dinámica de los textos de navegación
  useEffect(() => {
    async function fetchTranslations() {
      if (lang === "es") {
        setNavTexts({
          inicio: "Inicio",
          servicios: "Servicios",
          noticias: "Noticias",
          prensa: "Prensa",
          acerca: "Acerca de",
          colaborador: "¿Eres colaborador?",
          verTodos: "Ver todos"
        });
      } else {
        setNavTexts({
          inicio: await translateText("Inicio", lang),
          servicios: await translateText("Servicios", lang),
          noticias: await translateText("Noticias", lang),
          prensa: await translateText("Prensa", lang),
          acerca: await translateText("Acerca de", lang),
          colaborador: await translateText("¿Eres colaborador?", lang),
          verTodos: await translateText("Ver todos", lang)
        });
      }
    }
    fetchTranslations();
  }, [lang]);

  return (
    <header className={`${styles.header} ${mobileMenuOpen ? styles.menuOpen : ""}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          {showLogoImg ? (
            <Image
              src="/imagen/bechapra-logo.png"
              alt="Bechapra"
              width={140}
              height={37}
              priority
              className={styles.logoImage}
            />
          ) : (
            <span className={styles.logoText}>Bechapra</span>
          )}
        </Link>

        {/* Desktop navigation */}
        <nav className={styles.menu}>
          <Link href="/" className={styles.navLink}>{navTexts.inicio}</Link>
          <div className={styles.navItem}>
            <Link href="/servicios" className={styles.navLink}>{navTexts.servicios}</Link>
            <div className={styles.dropdown}>
              {serviceGroups.map(group => (
                <div key={group.slug} className={styles.dropdownColumn}>
                  <div className={styles.columnHeaderGroup}>
                    <div className={styles.iconWrapper}>
                      <Image
                        src={group.icon}
                        alt=""
                        width={32}
                        height={32}
                        className={styles.groupIcon}
                      />
                    </div>
                    <div>
                      <Link href={group.slug} className={styles.dropdownHeader}>{group.name}</Link>
                    </div>
                  </div>
                  <div className={styles.columnLinks}>
                    {group.subServices.slice(0,2).map(sub => (
                      <Link key={sub.slug} href={sub.slug} className={styles.dropdownItem}>{sub.name}</Link>
                    ))}
                    <Link href={group.slug} className={styles.dropdownItem} style={{fontWeight:'600',color:'#2563eb'}}>{navTexts.verTodos}</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Link href="/noticias" className={styles.navLink}>{navTexts.noticias}</Link>
          <Link href="/prensa" className={styles.navLink}>{navTexts.prensa}</Link>
          <Link href="/acerca-de" className={styles.navLink}>{navTexts.acerca}</Link>
          <a href="https://bechapra.com.mx" target="_blank" rel="noreferrer" className={styles.ctaButton}>{navTexts.colaborador}</a>
          <div style={{ marginLeft: 24 }}>
            <LanguageSwitcher />
          </div>
        </nav>

        {/* Mobile menu button */}
        <button
          className={styles.mobileMenuButton}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuHeader}>
            <Link href="/" className={styles.mobileMenuLogo} onClick={() => setMobileMenuOpen(false)}>
              {showLogoImg ? (
                <Image src="/imagen/bechapra-logo.png" alt="Bechapra" width={120} height={32} className={styles.logoImage} />
              ) : (
                <span className={styles.logoText}>Bechapra</span>
              )}
            </Link>
            <button className={styles.mobileCloseInMenu} onClick={() => setMobileMenuOpen(false)} aria-label="Cerrar menú">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <nav className={styles.mobileMenuNav}>
            <Link href="/" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>{navTexts.inicio}</Link>
            <Link href="/servicios" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>{navTexts.servicios}</Link>
            <Link href="/acerca-de" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>{navTexts.acerca}</Link>
            <Link href="/noticias" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>{navTexts.noticias}</Link>
            <Link href="/prensa" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>{navTexts.prensa}</Link>
            <a href="https://bechapra.com.mx" target="_blank" rel="noreferrer" className={styles.mobileCtaButton}>{navTexts.colaborador}</a>
            <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}