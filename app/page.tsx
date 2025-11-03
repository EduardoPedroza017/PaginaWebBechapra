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
        <section className="mb-32">
          <AnimatedSection>
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-10 md:p-14 shadow-2xl relative overflow-hidden">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
              />
              
              <div className="relative z-10 text-center md:text-left">
                <div className="md:flex justify-between items-center">
                  <div className="md:max-w-xl mb-8 md:mb-0">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      ¿Listo para comenzar?
                    </h3>
                    <p className="text-blue-100 text-lg">
                      Agenda una llamada o contáctanos por redes sociales. Estamos aquí para impulsar tu negocio.
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-4 items-center md:items-end">
                    <a
                      href="#contacto"
                      className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full shadow-lg font-semibold hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
                    >
                      ¡Agenda ahora!
                    </a>
                    
                    <div className="flex gap-3">
                      {[
                        { name: "LinkedIn", icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" },
                        { name: "Facebook", icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.738-.9 10.125-5.864 10.125-11.854z" },
                        { name: "Instagram", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
                        { name: "YouTube", icon: "M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.897-.266 11.626-.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" }
                      ].map((network) => (
                        <motion.a
                          key={network.name}
                          href="#"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 transition-colors"
                          aria-label={network.name}
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="currentColor" d={network.icon} />
                          </svg>
                        </motion.a>
                      ))}
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
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-10 border border-slate-200 max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <label htmlFor="nombre" className="block text-slate-700 font-medium mb-2">Nombre completo *</label>
            <input
              id="nombre"
              type="text"
              placeholder="Tu nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              required
              className="w-full px-6 py-4 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 bg-white"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <label htmlFor="email" className="block text-slate-700 font-medium mb-2">Email *</label>
            <input
              id="email"
              type="email"
              placeholder="tu@empresa.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-6 py-4 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 bg-white"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <label htmlFor="mensaje" className="block text-slate-700 font-medium mb-2">Mensaje *</label>
            <textarea
              id="mensaje"
              placeholder="Cuéntanos sobre tus necesidades..."
              rows={5}
              value={formData.mensaje}
              onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
              required
              className="w-full px-6 py-4 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 resize-none bg-white"
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
              className={`w-full py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ${
                isSubmitting 
                  ? "bg-slate-400 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95"
              } text-white`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </span>
              ) : "Enviar mensaje"}
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