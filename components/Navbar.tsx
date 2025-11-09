"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [showLogoImg, setShowLogoImg] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Only swap to the image on the client to avoid SSR/CSR hydration mismatch
  useEffect(() => {
    setShowLogoImg(true);
  }, []);

  // Prevenir scroll del body cuando el menú está abierto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);
  
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

        {/* Desktop Menu */}
        <nav className={styles.menu}>
          <Link href="/" className={styles.navLink}>
            Pag. Principal
          </Link>
          <Link href="/servicios" className={styles.navLink}>
            Servicios
          </Link>
          <Link href="/acerca-de" className={styles.navLink}>
            Acerca de
          </Link>
          <a 
            href="https://bechapra.com.mx" 
            target="_blank" 
            rel="noreferrer" 
            className={styles.ctaButton}
          >
            ¿Eres colaborador?
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className={styles.mobileMenuButton}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          {/* Logo en el menú móvil */}
          <div className={styles.mobileMenuHeader}>
            <Link href="/" className={styles.mobileMenuLogo} onClick={() => setMobileMenuOpen(false)}>
              {showLogoImg ? (
                <Image
                  src="/imagen/bechapra-logo.png"
                  alt="Bechapra"
                  width={120}
                  height={32}
                  className={styles.logoImage}
                />
              ) : (
                <span className={styles.logoText}>Bechapra</span>
              )}
            </Link>
            
            {/* Close button */}
            <button
              className={styles.mobileCloseInMenu}
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Cerrar menú"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <nav className={styles.mobileMenuNav}>
            <Link 
              href="/" 
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Pag. Principal
            </Link>
            <Link 
              href="/servicios" 
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Servicios
            </Link>
            <Link 
              href="/acerca-de" 
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Acerca de
            </Link>
            <a 
              href="https://bechapra.com.mx" 
              target="_blank" 
              rel="noreferrer" 
              className={styles.mobileCtaButton}
            >
              ¿Eres colaborador?
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}