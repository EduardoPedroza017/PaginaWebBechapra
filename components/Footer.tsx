
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { CompanyLocation } from './CompanyLocation';
import { TranslateText } from './TranslateText';

const footerLinks = {
  empresa: [
    { label: 'Acerca de', href: '/acerca-de' },
    { label: 'Servicios', href: '/servicios' },
    { label: 'Noticias', href: '/noticias' },
    { label: 'Prensa', href: '/prensa' },
    { label: 'Contacto', href: '/#contacto' },
  ],
  servicios: [
    { label: 'Capital Humano', href: '/servicios/capital-humano' },
    { label: 'Servicios Legales', href: '/servicios/servicios-legales' },
    { label: 'Servicios Contables', href: '/servicios/servicios-contables' },
    { label: 'Desarrollo Organizacional', href: '/servicios/desarrollo-organizacional' },
  ],
  legal: [
    { label: 'Política de privacidad', href: '/politica-de-privacidad' },
    { label: 'Términos de servicio', href: '/terminos-de-servicio' },
    { label: 'Política de cookies', href: '/politica-de-cookies' },
  ]
};

const socialLinks = [
  { iconPath: '/image/icon/Iconos_Redes/Facebook_NegativoStroke@2x.png', href: 'https://facebook.com/bechapra', label: 'Facebook' },
  { iconPath: '/image/icon/Iconos_Redes/Linkedin_NegativoStroke@2x.png', href: 'https://linkedin.com/company/bechapra', label: 'LinkedIn' },
  { iconPath: '/image/icon/Iconos_Redes/Youtube_NegativoStroke@2x.png', href: 'https://youtube.com/@bechapra', label: 'YouTube' },
  { iconPath: '/image/icon/Iconos_Redes/Instagram_NegativoStroke@2x.png', href: 'https://instagram.com/bechapra', label: 'Instagram' },
];

function useLogoUrl() {
  const [logoUrl, setLogoUrl] = useState<string>('/image/bechapra-logo.png');

  useEffect(() => {
    async function fetchLogo() {
      try {
        const res = await fetch('http://localhost:5000/api/logo');
        const data = await res.json();
        if (data.url) {
          setLogoUrl(data.url);
        }
      } catch (e) {
        console.warn('No se pudo cargar el logo dinámico, usando el predeterminado');
      }
    }
    fetchLogo();
  }, []);

  return logoUrl;
}

function LogoImage() {
  const logoUrl = useLogoUrl();
  
  return (
    <Image
      src={logoUrl}
      alt="Bechapra"
      width={120}
      height={32}
      className="h-8 w-auto block"
      priority
    />
  );
}

interface FooterLinkSectionProps {
  title: string;
  links: Array<{ label: string; href: string }>;
  delay: number;
}

function FooterLinkSection({ title, links, delay }: FooterLinkSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      className="w-full"
    >
      {/* Mobile Accordion Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex md:hidden items-center justify-between w-full py-3 text-left group"
        aria-expanded={isOpen}
        aria-controls={`footer-section-${title.toLowerCase()}`}
      >
        <h3 className="uppercase text-white font-semibold text-sm tracking-wider group-hover:text-blue-200 transition-colors">
          <TranslateText text={title} />
        </h3>
        <ChevronDown 
          className={`w-5 h-5 text-white/70 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-blue-200' : ''
          }`} 
        />
      </button>

      {/* Desktop Header */}
      <h3 className="hidden md:block uppercase text-white font-semibold text-sm mb-4 tracking-wider">
        <TranslateText text={title} />
      </h3>

      {/* Links List (Accordion on Mobile, Static on Desktop) */}
      <div className="hidden md:block">
        <ul className="flex flex-col gap-2 list-none p-0 m-0">
          {links.map((link, index) => (
            <li key={index}>
              <Link 
                href={link.href} 
                className="text-white/80 hover:text-white text-sm transition-colors"
              >
                <TranslateText text={link.label} />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Collapsible Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
            id={`footer-section-${title.toLowerCase()}`}
          >
            <ul className="flex flex-col gap-2 list-none p-0 m-0 pb-4">
              {links.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-white/80 hover:text-white text-sm transition-colors"
                  >
                    <TranslateText text={link.label} />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-blue-900 text-white">
      {/* Fondo oscuro sólido como en la imagen */}
      <div className="bg-blue-900">
        <div className="container-wide px-6 sm:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-10">
            
            {/* Brand Section - Izquierda */}
            <div className="lg:col-span-4 flex flex-col">
              <Link href="/" className="inline-block mb-6">
                <Image
                  src="/image/logo/Logo_1x1_BlancoSinFondo@2x.png"
                  alt="Bechapra Logo"
                  width={80}
                  height={80}
                  className="h-16 w-auto"
                  priority
                />
              </Link>
              
              {/* Texto descriptivo */}
              <p className="text-white/80 text-sm leading-relaxed mb-6 max-w-md">
                <TranslateText text="Tu aliado estratégico en soluciones empresariales integrales. Transformamos organizaciones desde adentro." />
              </p>
              
              {/* Horario */}
              <div className="mb-6">
                <p className="text-white/80 text-sm">
                  <span className="font-medium">Lun - Vie:</span> 9:00 - 18:00
                </p>
              </div>
              
              {/* Social Links */}
              <div>
                <p className="text-white/80 text-sm mb-3">Sigamos en redes</p>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    >
                      <Image
                        src={social.iconPath}
                        alt={social.label}
                        width={16}
                        height={16}
                        className="w-4 h-4 object-contain"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-2">
              <FooterLinkSection title="EMPRESA" links={footerLinks.empresa} delay={0.1} />
            </div>
            
            <div className="lg:col-span-3">
              <FooterLinkSection title="SERVICIOS" links={footerLinks.servicios} delay={0.2} />
            </div>

            {/* Contact Section - Derecha */}
            <div className="lg:col-span-3">
              <div>
                <h3 className="uppercase text-white font-semibold text-sm mb-4 tracking-wider">
                  <TranslateText text="CONTACTO" />
                </h3>
                <div className="text-white/80 text-sm space-y-3">
                  <CompanyLocation />
                  
                  {/* Teléfono */}
                  <div>
                    <p className="font-medium">Teléfono</p>
                    <a href="tel:+65655245678" className="hover:text-white transition-colors">
                      +65 65 524 5678
                    </a>
                  </div>
                  
                  {/* Email */}
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:contact@bechapra.com" className="hover:text-white transition-colors">
                      contact@bechapra.com
                    </a>
                  </div>
                  
                  {/* Mapa */}
                  <div>
                    <a 
                      href="https://maps.google.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-200 hover:text-white transition-colors"
                    >
                      <span>Ver en Google Maps</span>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-white/10 my-8" />

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <LogoImage />
              </div>
              <span className="text-white/60 text-sm">
                © {currentYear} Bechapra. <TranslateText text="Todos los derechos reservados" />
              </span>
            </div>
            
            <div className="flex items-center gap-6">
              {footerLinks.legal.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  <TranslateText text={link.label} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}