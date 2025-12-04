"use client";

import { Briefcase, Settings, Users } from "lucide-react";
import Footer from "@/components/Footer";
import {
  ServiceHero,
  ServiceCards,
  BenefitsSection,
  DarkCTA,
  ContactSection,
} from "./components";

const servicios = [
  {
    icon: Briefcase,
    title: "Servicios Contables",
    desc: "Ten una vision clara del presente y futuro contable-fiscal de tu empresa.",
    href: "/servicios/servicios-contables",
  },
  {
    icon: Settings,
    title: "Servicios Legales",
    desc: "Desde la redaccion de contratos solidos hasta la proteccion ante cualquier desafio legal.",
    href: "/servicios/servicios-legales",
  },
  {
    icon: Users,
    title: "Servicios PyME",
    desc: "Confia en nosotros para brindarte el apoyo y la orientacion que necesitas para hacer crecer tu pyme de manera segura y exitosa.",
    href: "/servicios/servicios-pyme",
  },
];

const beneficios = [
  {
    icon: Briefcase,
    title: "Acceso Exclusivo BTC",
    desc: "Accede a nuestra agenda de cursos gratuitos, avalados por el Colegio de Contadores Publicos CDMX.",
  },
  {
    icon: Users,
    title: "Asesoramiento Personalizado",
    desc: "Sesiones de asesoramiento personalizado con expertos en contabilidad, legal y/o PyME.",
  },
];

export default function ManagementServicesPage() {
  return (
    <main className="overflow-x-hidden">
      <ServiceHero
        title="Soluciones integrales para gestionar y hacer crecer tu"
        highlightWord="negocio"
        description="Desde el manejo de tus finanzas hasta la proteccion legal de tu empresa!"
        imageSrc="/image/servicios/management-services.jpg"
        imageAlt="Management Services Bechapra"
        backLink="/servicios"
        backLabel="Volver"
        ctaLabel="Solicitar asesoria"
        ctaLink="#contacto"
      />

      <ServiceCards
        title="Servicios Management Services"
        services={servicios}
      />

      <BenefitsSection
        title="Beneficios Management Services"
        benefits={beneficios}
        imageSrc="/image/servicios/management-services.jpg"
        imageAlt="Beneficios Management Services"
      />

      <DarkCTA
        title="Todos los servicios en un solo lugar"
        subtitle="Solicita una reunion para mas informacion."
        imageSrc="/image/contacto/contacto-men.avif"
        imageAlt="Management Services"
        primaryLink="#contacto"
        primaryLabel="Solicitar reunion"
        secondaryLink="/servicios"
        secondaryLabel="Ver servicios"
      />

      <ContactSection title="Contactanos" />

      <Footer />
    </main>
  );
}
