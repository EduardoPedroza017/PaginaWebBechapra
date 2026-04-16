"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
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
  { iconPath: '/web/image/icon/Iconos_Redes/Facebook_NegativoStroke@2x.png', href: 'https://facebook.com/bausen', label: 'Facebook' },
  { iconPath: '/web/image/icon/Iconos_Redes/Linkedin_NegativoStroke@2x.png', href: 'https://linkedin.com/company/bausen', label: 'LinkedIn' },
  { iconPath: '/web/image/icon/Iconos_Redes/Youtube_NegativoStroke@2x.png', href: 'https://youtube.com/@bausen', label: 'YouTube' },
  { iconPath: '/web/image/icon/Iconos_Redes/Instagram_NegativoStroke@2x.png', href: 'https://instagram.com/bausen', label: 'Instagram' },
];

interface FooterLinkSectionProps {
  title: string;
  links: Array<{ label: string; href: string }>;
  delay: number;
}

function FooterLogo() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    const resolved = stored === 'dark' ? true : stored === 'light' ? false : (typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : false);
    Promise.resolve().then(() => setIsDark(resolved));
  }, []);

  const src = isDark ? '/web/image/logo/bausen-logo.png' : '/web/image/logo/Bausen.png';
  const alt = isDark ? 'Bausen Logo' : 'Bausen Logo';

  return (
    <Image
      src={src}
      alt={alt}
      width={140}
      height={48}
      className="h-14 w-auto brightness-0 invert"
      priority
    />
  );
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
        className="flex md:hidden items-center justify-between w-full py-4 text-left group border-b border-white/10 dark:border-white/5"
        aria-expanded={isOpen}
        aria-controls={`footer-section-${title.toLowerCase()}`}
      >
        <h3 className="uppercase text-white dark:text-gray-100 font-semibold text-sm tracking-wider group-hover:text-blue-300 dark:group-hover:text-blue-400 transition-colors">
          <TranslateText text={title} />
        </h3>
        <ChevronDown 
          className={`w-5 h-5 text-white/70 dark:text-gray-400 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-blue-300 dark:text-blue-400' : ''
          }`} 
        />
      </button>

      {/* Desktop Header */}
      <h3 className="hidden md:block uppercase text-white dark:text-gray-100 font-semibold text-sm mb-5 tracking-wider">
        <TranslateText text={title} />
      </h3>

      {/* Links List (Accordion on Mobile, Static on Desktop) */}
      <div className="hidden md:block">
        <ul className="flex flex-col gap-3 list-none p-0 m-0">
          {links.map((link, index) => (
            <li key={index}>
              <Link 
                href={link.href} 
                className="text-white/90 dark:text-gray-300 hover:text-white dark:hover:text-white text-sm transition-all hover:translate-x-1 inline-block"
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
            <ul className="flex flex-col gap-3 list-none p-0 m-0 py-4">
              {links.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-white/90 dark:text-gray-300 hover:text-white dark:hover:text-white text-sm transition-colors"
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
    <footer className="w-full bg-gradient-to-br from-[#27439a] to-[#1e3278] dark:from-slate-900 dark:to-slate-950 text-white relative overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 dark:bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300/60 dark:bg-blue-800/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <div className="container-wide px-6 sm:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 mb-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-4 flex flex-col">
              <Link href="/" className="inline-block mb-6 hover:opacity-80 transition-opacity">
                <FooterLogo />
              </Link>
              
              <p className="text-white/90 dark:text-gray-300 text-sm leading-relaxed mb-6 max-w-md">
                <TranslateText text="Tu aliado estratégico en soluciones empresariales integrales. Transformamos organizaciones desde adentro." />
              </p>
              
              {/* Horario con ícono */}
              <div className="mb-6 flex items-start gap-2">
                <div className="w-9 h-9 rounded-lg bg-white/10 dark:bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/90 dark:text-gray-300 text-sm font-medium mb-1">Horario de atención</p>
                  <p className="text-white/80 dark:text-gray-400 text-sm">Lunes - Viernes: 9:00 - 18:00</p>
                </div>
              </div>
              
              {/* Social Links Mejorado */}
              <div>
                <p className="text-white/90 dark:text-gray-300 text-sm font-medium mb-3">Síguenos en redes</p>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-10 h-10 rounded-lg bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 flex items-center justify-center transition-all hover:scale-110 hover:-translate-y-0.5"
                    >
                      <Image
                        src={social.iconPath}
                        alt={social.label}
                        width={18}
                        height={18}
                        className="w-[18px] h-[18px] object-contain brightness-0 invert"
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

            {/* Contact Section */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="uppercase text-white dark:text-gray-100 font-semibold text-sm mb-5 tracking-wider">
                  <TranslateText text="CONTACTO" />
                </h3>
                <div className="space-y-4">
                  {/* Ubicación (CompanyLocation renderiza su propio contenido) */}
                  <div className="text-white/90 dark:text-gray-300 text-sm">
                    <CompanyLocation variant="footer" />
                  </div>
                  
                  {/* Teléfono */}
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/10 dark:bg-white/5 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4 text-white" />
                    </div>
                      <div>
                        <p className="text-white font-medium text-sm mb-1">Teléfono</p>
                        <a href="tel:+65655245678" className="text-white/80 hover:text-white transition-colors">
                          +65 65 524 5678
                        </a>
                    </div>
                  </div>
                  
                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/10 dark:bg-white/5 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-white" />
                    </div>
                      <div>
                        <p className="text-white font-medium text-sm mb-1">Email</p>
                        <a href="mailto:contact@bausen.com" className="text-white/80 hover:text-white transition-colors break-all">
                          contact@bausen.com
                        </a>
                    </div>
                  </div>
                  
                  {/* Mapa */}
                  <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-300 dark:text-blue-400 hover:text-white dark:hover:text-white transition-all text-sm font-medium group mt-2"
                  >
                    <span>Ver en Google Maps</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent my-8" />

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-white/70 dark:text-gray-400 text-sm">
                © {currentYear} Bausen. <TranslateText text="Todos los derechos reservados" />
              </span>
            </div>
            
            <div className="flex items-center gap-6">
              {footerLinks.legal.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-white/70 dark:text-gray-400 hover:text-white dark:hover:text-white text-sm transition-colors"
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