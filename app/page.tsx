"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Award, Users, TrendingUp, Briefcase } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100 text-slate-900 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* HERO */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-32 pt-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-6"
          > 
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Impulsamos
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                tu talento y operación
              </span>
            </h1>
            
            <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
              Capital Humano, Desarrollo Organizacional y Management Services integrados bajo una misma marca para acompañarte en cada etapa de crecimiento.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="#servicios"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
                aria-label="Explorar servicios"
              >
                <span>Explorar servicios</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 10h10M10 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 border-2 border-slate-300 px-8 py-4 rounded-full text-slate-700 hover:bg-white hover:border-slate-400 hover:shadow-md transition-all duration-300 font-medium"
              >
                Solicitar información
              </a>
            </div>
          </motion.div>
        </section>

        {/* SERVICIOS */}
        <section id="servicios" className="mb-32">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestros Servicios</h2>
              <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mb-6" />
              <p className="text-lg text-slate-600">
                Soluciones integrales diseñadas para optimizar cada aspecto de tu organización
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 justify-items-center items-start">
            <AnimatedSection delay={0.1}>
              <ServiceCard
                title="Capital Humano"
                href="/servicios/capital-humano"
                items={["Servicios especializados", "Payrolling", "Atracción de Talento"]}
                description="Gestionamos y optimizamos el talento humano de tu organización para maximizar su potencial."
                gradient="from-blue-50 to-blue-100/50"
                color="blue"
              />
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <ServiceCard
                title="Desarrollo Organizacional"
                href="/servicios/desarrollo-organizacional"
                items={["Desarrollo organizacional", "Capacitación Empresarial", "NOM 035"]}
                description="Transformamos tu organización mediante estrategias que fomentan el crecimiento y la adaptabilidad."
                gradient="from-slate-50 to-slate-100/50"
                color="slate"
              />
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <ServiceCard
                title="Management Services"
                href="/servicios/management-services"
                items={["Servicios Contables", "Servicios Legales", "Servicios PYME"]}
                description="Ofrecemos servicios administrativos y de gestión para que te enfoques en lo que realmente importa."
                gradient="from-blue-50 to-slate-100/50"
                color="indigo"
              />
            </AnimatedSection>
          </div>
        </section>

        {/* DIVISIONES */}
        <section id="divisiones" className="mb-32">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Divisiones de Bechapra</h2>
              <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mb-6" />
              <p className="text-lg text-slate-600">
                Especializadas en diferentes áreas para ofrecerte soluciones a medida
              </p>
            </div>
          </AnimatedSection>
          
          <div className="space-y-4 max-w-4xl mx-auto">
            {[
              { label: "BTC", description: "Soluciones tecnológicas y transformación digital" },
              { label: "Bechapra Studio", description: "Diseño y desarrollo de experiencias digitales" },
              { label: "Bechapra Consultores", description: "Asesoría estratégica y consultoría empresarial" }
            ].map((division, idx) => (
              <AnimatedSection key={division.label} delay={idx * 0.1}>
                <DivisionButton label={division.label} description={division.description} />
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* CTA + REDES */}
        <section className="mb-32 px-4 md:px-0">
          <AnimatedSection>
            <div className="relative rounded-3xl overflow-hidden max-w-7xl mx-auto shadow-2xl">
              {/* Fondo claro con gradiente suave */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-slate-50" />
              
              {/* Patrón de puntos decorativo */}
              <div className="absolute inset-0 opacity-[0.3]" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(59, 130, 246) 1px, transparent 0)',
                backgroundSize: '40px 40px'
              }} />
              
              {/* Animación decorativa múltiple */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.08, 0.12, 0.08],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-20 -right-20 w-96 h-96 bg-blue-200 rounded-full blur-3xl"
              />
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.06, 0.1, 0.06],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-16 -left-16 w-80 h-80 bg-slate-200 rounded-full blur-3xl"
              />

              {/* Contenido principal */}
              <div className="relative z-10 p-8 md:p-16">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-12">
                    {/* Badge superior */}
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="inline-flex items-center gap-2 bg-green-50 backdrop-blur-sm px-5 py-2.5 rounded-full mb-6 border-2 border-green-200 shadow-md"
                    >
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" />
                      <span className="text-green-700 font-semibold">Disponibles para nuevos proyectos</span>
                    </motion.div>

                    {/* Título principal */}
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight"
                    >
                      ¿Listo para transformar <br className="hidden md:block" />
                      <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                        tu negocio?
                      </span>
                    </motion.h3>

                    {/* Subtítulo */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="text-slate-700 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 font-medium"
                    >
                      Agenda una llamada estratégica con nuestro equipo y descubre cómo podemos impulsar tu organización con soluciones personalizadas y resultados medibles.
                    </motion.p>

                    {/* Botones de acción */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-12"
                    >
                      <motion.a
                        href="#contacto"
                        whileHover={{ scale: 1.08, y: -4 }}
                        whileTap={{ scale: 0.96 }}
                        className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white px-12 py-5 rounded-full font-bold text-lg shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 w-full sm:w-auto justify-center overflow-hidden border-2 border-blue-400/20"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl" />
                        <svg 
                          width="24" 
                          height="24" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2.5" 
                          className="relative z-10 group-hover:scale-110 transition-transform duration-300"
                        >
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round" strokeLinejoin="round"/>
                          <line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round" strokeLinejoin="round"/>
                          <line x1="3" y1="10" x2="21" y2="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="relative z-10 tracking-wide">Agendar consultoría</span>
                        <svg 
                          width="22" 
                          height="22" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="3" 
                          className="group-hover:translate-x-2 transition-transform duration-300 relative z-10"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.a>
                      
                      <motion.a
                        href="tel:+525512345678"
                        whileHover={{ scale: 1.08, y: -4 }}
                        whileTap={{ scale: 0.96 }}
                        className="group relative inline-flex items-center gap-3 bg-white text-blue-700 px-12 py-5 rounded-full font-bold text-lg border-3 border-blue-600 hover:border-blue-700 transition-all duration-300 w-full sm:w-auto justify-center shadow-xl hover:shadow-2xl overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 relative z-10 group-hover:stroke-white">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="relative z-10 tracking-wide group-hover:text-white transition-colors duration-300">Llamar ahora</span>
                      </motion.a>
                    </motion.div>

                    {/* Separador */}
                    <div className="flex items-center gap-4 max-w-md mx-auto mb-16">
                      <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                      <span className="text-slate-600 font-semibold text-sm tracking-wider uppercase">Síguenos en</span>
                      <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                    </div>

                    {/* Redes sociales - Diseño limpio y profesional */}
                    <div className="bg-gradient-to-br from-white to-slate-50/50 backdrop-blur-md rounded-3xl py-20 px-16 shadow-2xl border-2 border-white/60">
                      <motion.h4
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-12"
                      >
                        Encuéntranos en
                      </motion.h4>
                      <div className="flex flex-row items-center justify-center gap-12 flex-wrap">
                        {/* LinkedIn */}
                        <motion.a
                          href="https://www.linkedin.com/company/"
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.7, duration: 0.4 }}
                          whileHover={{ scale: 1.1, y: -4 }}
                          whileTap={{ scale: 0.95 }}
                          className="transition-all duration-300"
                          aria-label="Visitar LinkedIn de Bechapra"
                        >
                          <svg style={{ width: '4rem', height: '4rem' }} viewBox="0 0 24 24" fill="#0A66C2">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </motion.a>

                        {/* Facebook */}
                        <motion.a
                          href="https://www.facebook.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.8, duration: 0.4 }}
                          whileHover={{ scale: 1.1, y: -4 }}
                          whileTap={{ scale: 0.95 }}
                          className="transition-all duration-300"
                          aria-label="Visitar Facebook de Bechapra"
                        >
                          <svg style={{ width: '4rem', height: '4rem' }} viewBox="0 0 24 24" fill="#1877F2">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        </motion.a>

                        {/* Instagram */}
                        <motion.a
                          href="https://www.instagram.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.9, duration: 0.4 }}
                          whileHover={{ scale: 1.1, y: -4 }}
                          whileTap={{ scale: 0.95 }}
                          className="transition-all duration-300"
                          aria-label="Visitar Instagram de Bechapra"
                        >
                          <svg style={{ width: '4rem', height: '4rem' }} viewBox="0 0 24 24">
                            <defs>
                              <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#833AB4" />
                                <stop offset="50%" stopColor="#FD1D1D" />
                                <stop offset="100%" stopColor="#FCAF45" />
                              </linearGradient>
                            </defs>
                            <path fill="url(#instagram-gradient)" d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                          </svg>
                        </motion.a>

                        {/* YouTube */}
                        <motion.a
                          href="https://www.youtube.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.0, duration: 0.4 }}
                          whileHover={{ scale: 1.1, y: -4 }}
                          whileTap={{ scale: 0.95 }}
                          className="transition-all duration-300"
                          aria-label="Visitar YouTube de Bechapra"
                        >
                          <svg style={{ width: '4rem', height: '4rem' }} viewBox="0 0 24 24" fill="#FF0000">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* PREMIOS */}
        <section id="premios" className="mb-32">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Reconocimientos</h2>
              <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mb-6" />
              <p className="text-lg text-slate-600">
                Nuestro trabajo ha sido reconocido por diversas instituciones y clientes
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Mejor Consultora HR 2023", org: "Premios Empresariales MX" },
              { title: "Excelencia en Servicios", org: "Cámara de Comercio" },
              { title: "Innovación Organizacional", org: "Foro de Recursos Humanos" },
              { title: "Empresa Socialmente Responsable", org: "Centro Mexicano para la Filantropía" },
              { title: "Líderes del Cambio", org: "Revista Negocios Pro" }
            ].map((award, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200 shadow-md p-8 hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                  <div className="h-32 bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl mb-4 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Award className="w-16 h-16 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2 text-center">{award.title}</h3>
                  <p className="text-center text-slate-500 font-medium">{award.org}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* FORMULARIO */}
        <section id="contacto" className="mb-16">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Contáctanos</h2>
              <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mb-6" />
              <p className="text-lg text-slate-600">
                ¿Tienes alguna pregunta o proyecto en mente? Déjanos tu mensaje.
              </p>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2}>
            <ContactForm />
          </AnimatedSection>
        </section>
      </div>
    </main>
  );
}

// COMPONENTES

function ServiceCard({
  title,
  items,
  description,
  href,
  gradient,
  color = "blue",
}: {
  title: string;
  items: string[];
  description?: string;
  href: string;
  gradient: string;
  color?: "blue" | "slate" | "indigo";
}) {
  const renderIcon = () => {
    if (title.toLowerCase().includes("capital") || title.toLowerCase().includes("human")) {
      return <Users className="w-7 h-7" />;
    }
    if (title.toLowerCase().includes("desarrollo")) {
      return <TrendingUp className="w-7 h-7" />;
    }
    return <Briefcase className="w-7 h-7" />;
  };

  const colorClasses: Record<"blue" | "slate" | "indigo", string> = {
    blue: "bg-blue-600 hover:bg-blue-700 text-blue-600",
    slate: "bg-slate-700 hover:bg-slate-800 text-slate-600",
    indigo: "bg-indigo-600 hover:bg-indigo-700 text-indigo-600",
  };

  const itemColorClasses: Record<"blue" | "slate" | "indigo", { bg: string; border: string; dot: string }> = {
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-100",
      dot: "bg-blue-600",
    },
    slate: {
      bg: "bg-slate-50",
      border: "border-slate-200",
      dot: "bg-slate-600",
    },
    indigo: {
      bg: "bg-indigo-50",
      border: "border-indigo-100",
      dot: "bg-indigo-600",
    },
  };

  return (
    <a href={href} className="block">
      <motion.div
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="w-full md:w-72 h-80 bg-white rounded-xl shadow-lg p-4 border border-slate-200 ring-1 ring-slate-50 relative overflow-hidden transition-transform duration-300 hover:shadow-2xl"
      >
        {/* Window controls */}
        <div className="flex items-center gap-2 p-2">
          <span className="w-3 h-3 rounded-full bg-red-500 inline-block" aria-hidden="true"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" aria-hidden="true"></span>
          <span className="w-3 h-3 rounded-full bg-green-500 inline-block" aria-hidden="true"></span>
        </div>

        <div className="p-4 h-[calc(100%-3rem)] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className={`flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-${color}-50 ${colorClasses[color].split(' ')[2]}`}> 
                {renderIcon()}
              </div>
              <h3 className="text-xl font-bold text-slate-900">{title}</h3>
            </div>

            {description && (
              <p className="text-sm text-slate-600 mb-3">{description}</p>
            )}

            {/* Items as mini-cards */}
            <div className="mt-3">
              <div className={`${itemColorClasses[color].bg} border ${itemColorClasses[color].border} rounded-lg p-2 flex flex-col gap-2`}>
                {items.map((item, index) => (
                  <div 
                    key={index} 
                    className="bg-white border border-slate-200/80 rounded-md px-3 py-2 shadow-sm flex items-center gap-3 transition-all duration-200 hover:shadow-md hover:scale-[1.03] hover:border-slate-300"
                  >
                    <span aria-hidden="true" className={`inline-block w-2 h-2 rounded-full ${itemColorClasses[color].dot}`} />
                    <span className="text-sm text-slate-800 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-center">
              <span className={`${colorClasses[color].split(' ')[0]} ${colorClasses[color].split(' ')[1]} text-white px-4 py-2 rounded-lg text-sm font-semibold shadow`}>
                Ver servicios
              </span>
            </div>
          </div>
        </div>

        {/* Gradient effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 hover:opacity-40 transition-opacity duration-300 -z-10`}></div>
      </motion.div>
    </a>
  );
}

function DivisionButton({ label, description }: { label: string; description?: string }) {
  return (
    <div className="group relative w-full text-left p-6 rounded-xl border border-slate-200 bg-white shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer">
      <div className="min-w-0">
        <div className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300">{label}</div>
        {description && (
          <div className="text-slate-500 text-sm mt-1 transition-colors duration-300">{description}</div>
        )}
      </div>
      {/* Animated progress bar */}
      <motion.div 
        className="absolute bottom-0 left-0 h-1 bg-blue-600"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ transformOrigin: 'left' }}
      />
    </div>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log("Formulario enviado:", formData);
      setIsSubmitting(false);
      setShowSuccessModal(true); // Show modal instead of alert
      setFormData({
        nombre: "",
        email: "",
        mensaje: "",
      });
    }, 1500);
  };

  return (
    <>
      <div className="max-w-md mx-auto px-8 py-6 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contáctanos</h2>
        <form onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-4"
          >
            <label htmlFor="nombre" className="block text-gray-800 mb-1">Tu Nombre</label>
            <input
              id="nombre"
              type="text"
              placeholder="Ingresa tu nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              required
              className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <label htmlFor="email" className="block text-gray-800 mb-1">Tu Email</label>
            <input
              id="email"
              type="email"
              placeholder="Ingresa tu email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mb-4"
          >
            <label htmlFor="mensaje" className="block text-gray-800 mb-1">Tu Mensaje</label>
            <textarea
              id="mensaje"
              placeholder="Ingresa tu mensaje"
              rows={4}
              value={formData.mensaje}
              onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
              required
              className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 resize-none"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 px-4 rounded-lg font-semibold transition duration-300 ${
                isSubmitting 
                  ? "bg-gray-400 cursor-not-allowed text-gray-700" 
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </span>
              ) : "Enviar Mensaje"}
            </button>
          </motion.div>
        </form>
      </div>

      {showSuccessModal && (
        <SuccessModal onClose={() => setShowSuccessModal(false)} />
      )}
    </>
  );
}

function SuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
          className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center"
        >
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </motion.div>
        <h3 className="text-2xl font-bold text-slate-800 mt-6 mb-2">¡Mensaje Enviado!</h3>
        <p className="text-slate-600 mb-6">
          Gracias por ponerte en contacto. Nos comunicaremos contigo a la brevedad.
        </p>
        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Aceptar
        </button>
      </motion.div>
    </div>
  );
}

function AnimatedSection({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}