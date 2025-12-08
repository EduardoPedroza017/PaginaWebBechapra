"use client";

import { BookOpen, BarChart3, ShieldCheck, Award, Users } from "lucide-react";
import Footer from "@/components/Footer";
import {
  ServiceHero,
  ServiceGrid,
  BenefitsStagger,
  DarkCTA,
  ContactSection,
} from "./components";

const servicios = [
  {
    icon: BookOpen,
    title: "Capacitacion Empresarial",
    desc: "Desde habilidades tecnicas hasta desarrollo de liderazgo, formamos parte de las capacitadoras del CCPM.",
    href: "/servicios/capacitacion-empresarial",
  },
  {
    icon: BarChart3,
    title: "Consultoria Organizacional",
    desc: "Soluciones para resolver problemas, identificar oportunidades, fomentar el aprendizaje y facilitar la implementacion de cambios.",
    href: "/servicios/consultoria-organizacional",
  },
  {
    icon: ShieldCheck,
    title: "NOM-035",
    desc: "Detectamos problemas y oportunidades internas para fomentar un ambiente laboral saludable y colaborativo.",
    href: "/servicios/nom-035",
  },
];

const beneficios = [
  {
    icon: Award,
    title: "Acceso Exclusivo BTC",
    desc: "Accede a nuestra agenda de cursos gratuitos, avalados por el Colegio de Contadores Publicos CDMX.",
  },
  {
    icon: Users,
    title: "Asesoramiento Personalizado",
    desc: "Sesiones de asesoramiento personalizado con expertos en NOM-035.",
  },
  {
    icon: BarChart3,
    title: "Planificacion Estrategica",
    desc: "Desarrollamos estrategias a largo plazo que impulsen el crecimiento y el exito de tu empresa en el mercado actual.",
  },
];

export default function DesarrolloOrganizacionalPage() {
  return (
    <main className="overflow-x-hidden bg-white dark:bg-slate-900">
      <ServiceHero
        title="Creando una cultura de exito empresarial"
        subtitle="Desarrollo Organizacional"
        description="Potencia el crecimiento y la eficacia de tu empresa a traves de nuestros servicios de Desarrollo Organizacional!"
        imageSrc="/image/servicios/desarrollorganizacional.jpg"
        imageAlt="Desarrollo Organizacional Bechapra"
        iconComponent={Users}
        backLink="/servicios"
        backLabel="Volver"
        ctaLabel="Solicitar consultoria"
        ctaLink="#contacto"
      />

      <ServiceGrid
        title="Soluciones para tu organizacion"
        services={servicios}
      />

      <BenefitsStagger
        title="Beneficios Centro de Capacitacion"
        benefits={beneficios}
        imageSrc="/image/servicios/tranning.webp"
        imageAlt="Centro de Capacitacion"
      />

      <DarkCTA
        title="Transforma tu organizacion hoy"
        subtitle="Agenda una consulta y conoce nuestras soluciones personalizadas para cultura, clima y talento."
        imageSrc="/image/servicios/desarrollorganizacional.jpg"
        imageAlt="Transformacion Organizacional"
        primaryLink="#contacto"
        primaryLabel="Agenda una cita"
        secondaryLink="#casos-exito"
        secondaryLabel="Ver casos de exito"
      />

      <ContactSection
        title="Listo para transformar tu organizacion?"
        subtitle="Contactanos y recibe una consultoria gratuita para disenar la solucion que tu empresa necesita."
      />

      <Footer />
    </main>
  );
}
