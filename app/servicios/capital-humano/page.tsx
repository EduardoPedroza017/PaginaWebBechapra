"use client";

import { Users, DollarSign, UserCheck } from "lucide-react";
import Footer from "@/components/Footer";
import SpotlightCTA from "@/app/components/SpotlightCTA";
import { ServiceHero, ServiceCards, BenefitsSection, ContactSection } from "./components";

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
    desc: "Desde el alta hasta la desvinculacion, incluyendo pagos de cuotas patronales, IMSS, Infonavit e impuestos.",
    link: "/servicios/payroll",
  },
  {
    icon: UserCheck,
    title: "Atraccion de Talento",
    desc: "Utilizamos estrategias selectivas y entrevistas exhaustivas para presentarte a los candidatos correctos.",
    link: "/servicios/atraccion-de-talento",
  },
];

const benefits = [
  {
    title: "Acceso Exclusivo BTC",
    desc: "Accede a nuestra agenda de cursos gratuitos, avalados por el Colegio de Contadores Publicos de la Ciudad de Mexico.",
  },
  {
    title: "Reduccion de Costos",
    desc: "Optimiza los procesos de reclutamiento, seleccion y gestion de nomina con nuestras soluciones integrales.",
  },
  {
    title: "Asesoramiento Personalizado",
    desc: "Sesiones de asesoramiento personalizado con expertos en Capital Humano para tu empresa.",
  },
];

export default function CapitalHumanoPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-900">
      <ServiceHero
        title="Capital Humano"
        highlight="Capital"
        description="Potencia el crecimiento y exito de tu empresa con nuestros servicios de capital humano. Transforma tu empresa con nuestro enfoque estrategico."
        imageSrc="/web/image/servicios/capital-humano.webp"
        imageAlt="Persona trabajando con laptop y documentos"
      />

      <ServiceCards title="Servicios Capital Humano" services={services} />

      <BenefitsSection
        title="Beneficios de Capital Humano"
        benefits={benefits}
        imageSrc="/web/image/servicios/capital-humano.webp"
        imageAlt="Equipo colaborando en oficina"
      />

      <SpotlightCTA
        eyebrow="Talento en accion"
        title="Integre talento, nomina y atraccion en una sola estrategia"
        subtitle="Unificamos las soluciones de capital humano en una experiencia mas clara, mas ejecutiva y lista para conversion."
        imageSrc="/web/image/servicios/capital-humano.webp"
        imageAlt="Capital Humano Bausen"
        primaryLink="#contacto"
        primaryLabel="Solicitar reunion"
        secondaryLink="/servicios"
        secondaryLabel="Ver servicios"
      />

      <ContactSection
        title="Consulte con nuestros expertos"
        subtitle="Disenamos la estrategia de talento que su organizacion necesita para escalar al siguiente nivel."
      />

      <Footer />
    </main>
  );
}
