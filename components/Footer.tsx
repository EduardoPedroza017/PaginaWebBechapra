"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {  MapPin, Phone, Mail, ExternalLink, ArrowUpRight } from 'lucide-react';
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
    { label: 'Privacidad', href: '/politica-de-privacidad' },
    { label: 'Términos', href: '/terminos-de-servicio' },
    { label: 'Cookies', href: '/politica-de-cookies' },
  ]
};

const socialLinks = [
  { iconPath: '/web/image/icon/Iconos_Redes/Facebook_NegativoStroke@2x.png', href: 'https://facebook.com/bausen', label: 'Facebook' },
  { iconPath: '/web/image/icon/Iconos_Redes/Linkedin_NegativoStroke@2x.png', href: 'https://linkedin.com/company/bausen', label: 'LinkedIn' },
  { iconPath: '/web/image/icon/Iconos_Redes/Youtube_NegativoStroke@2x.png', href: 'https://youtube.com/@bausen', label: 'YouTube' },
  { iconPath: '/web/image/icon/Iconos_Redes/Instagram_NegativoStroke@2x.png', href: 'https://instagram.com/bausen', label: 'Instagram' },
];

function FooterLinkSection({ title, links, delay }: { title: string; links: any[]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className="flex flex-col gap-8"
    >
      <h3 className="text-xs font-black uppercase tracking-[0.2em] !text-white leading-relaxed">
        <TranslateText text={title} />
      </h3>
      <ul className="flex flex-col gap-4">
        {links.map((link, index) => (
          <li key={index}>
            <Link 
              href={link.href} 
              className="group flex items-center gap-2 text-slate-300 hover:text-white transition-colors duration-300 text-sm font-bold"
            >
              <TranslateText text={link.label} />
              <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="w-full text-white relative overflow-hidden border-t border-slate-900 bg-linear-to-br from-blue-950 via-blue-900 to-indigo-900 dark:bg-linear-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-900"
      style={{}}
      data-footer
    >
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-125 h-125 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none dark:hidden" />
      <div className="absolute bottom-0 right-0 w-100 h-100 bg-blue-900/10 rounded-full blur-[100px] pointer-events-none dark:hidden" />

      <div className="relative z-10 max-w-7xl 2xl:max-w-360 3xl:max-w-400 mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-x-24 lg:gap-y-16">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-4 space-y-10">
            <Link href="/" className="inline-block transition-transform hover:scale-105">
              <Image
                src="/web/image/logo/bausen-logo.png"
                alt="BAUSEN"
                width={160}
                height={40}
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            
            <p className="text-xl lg:text-2xl font-bold leading-tight text-white max-w-md">
              <TranslateText text="Transformamos organizaciones con soluciones estrategicas en talento, payrolling, reclutamiento, servicios especializados y contabilidad." />
            </p>

            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visita nuestro perfil de ${social.label}`}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/70 bg-transparent hover:border-white hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
                >
                  <Image
                    src={social.iconPath}
                    alt={social.label}
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Sections */}
          <div className="lg:col-span-2">
            <FooterLinkSection title="Compañía" links={footerLinks.empresa} delay={0.1} />
          </div>
          
          <div className="lg:col-span-2">
            <FooterLinkSection title="Servicios" links={footerLinks.servicios} delay={0.2} />
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-8">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] !text-white leading-relaxed">
              <TranslateText text="Conecta" />
            </h3>
            <div className="space-y-6">
              <div className="group cursor-default">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] !text-white mb-2 group-hover:text-blue-500 transition-colors"><TranslateText text="Oficina Central" /></div>
                <div className="text-slate-300 font-bold leading-relaxed">
                  <CompanyLocation variant="footer" />
                </div>
              </div>

              <div className="group cursor-default">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2 group-hover:text-blue-500 transition-colors"><TranslateText text="Teléfono" /></div>
                <a href="tel:+5265655245678" className="text-slate-300 font-bold hover:text-white transition-colors">
                  +52 (656) 524 5678
                </a>
              </div>

              <div className="group cursor-default">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2 group-hover:text-blue-500 transition-colors"><TranslateText text="Email" /></div>
                <a href="mailto:contacto@bausen.com.mx" className="text-slate-300 font-bold hover:text-white transition-colors break-all">
                  contacto@bausen.com.mx
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 lg:mt-32 pt-10 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-white/60 text-sm font-bold tracking-wide">
            © {currentYear} BAUSEN · <TranslateText text="Líderes en Capital Humano" />
          </div>
          
          <div className="flex items-center gap-8">
            {footerLinks.legal.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-white/60 hover:text-white text-xs font-black uppercase tracking-widest transition-colors"
              >
                <TranslateText text={link.label} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
