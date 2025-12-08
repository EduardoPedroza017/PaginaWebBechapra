"use client";

import { Users, DollarSign, UserCheck } from "lucide-react";
import Footer from "@/components/Footer";
import {
  ServiceHero,
  ServiceCards,
  BenefitsSection,
  CTASection,
  ContactSection,
} from "./components";

// Services data
const services = [
  {
    icon: Users,
    title: "Servicios Especializados",
    desc: "Avalados por la STPS y registrados en el REPSE, garantizando transparencia y cumplimiento legal.",
    link: "/servicios/servicios-especializados",
  },
  {
    icon: DollarSign,
    title: "Payrolling",
    desc: "Desde el alta hasta la desvinculación, incluyendo pagos de cuotas patronales, IMSS, Infonavit, e impuestos.",
    link: "/servicios/payroll",
  },
  {
    icon: UserCheck,
    title: "Atracción de Talento",
    desc: "Utilizamos estrategias selectivas y entrevistas exhaustivas para presentarte a los candidatos correctos.",
    link: "/servicios/atraccion-de-talento",
  },
];

// Benefits data
const benefits = [
  {
    title: "Acceso Exclusivo BTC",
    desc: "Accede a nuestra agenda de cursos gratuitos, avalados por el Colegio de Contadores Públicos de la Ciudad de México.",
  },
  {
    title: "Reducción de Costos",
    desc: "Optimiza los procesos de reclutamiento, selección y gestión de nómina con nuestras soluciones integrales.",
  },
  {
    title: "Asesoramiento Personalizado",
    desc: "Sesiones de asesoramiento personalizado con expertos en Capital Humano para tu empresa.",
  },
];

export default function CapitalHumanoPage() {
  return (
    <main className="bg-white dark:bg-slate-900 min-h-screen">
      {/* Hero Section */}
      <ServiceHero
        title="Capital Humano"
        highlight="Capital"
        description="Potencia el crecimiento y éxito de tu empresa con nuestros servicios de capital humano. ¡Transforma tu empresa con nuestro enfoque estratégico!"
        imageSrc="/image/servicios/capital-humano.webp"
        imageAlt="Persona trabajando con laptop y documentos"
      />

      {/* Services Cards */}
      <ServiceCards
        title="Servicios Capital Humano"
        services={services}
      />

      {/* Benefits Section */}
      <BenefitsSection
        title="Beneficios de Capital Humano"
        benefits={benefits}
        imageSrc="/image/servicios/capital-humano.webp"
        imageAlt="Equipo colaborando en oficina"
      />

      {/* CTA Section */}
      <CTASection
        title="Todos los servicios en un solo lugar"
        subtitle="Solicita una reunión para más información sobre cómo podemos ayudarte a optimizar tu gestión de capital humano."
        imageSrc="/image/contacto/contacto-men.avif"
        imageAlt="Reunión de negocios Bechapra"
      />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
