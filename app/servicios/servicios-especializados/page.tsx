"use client";

import {
  Briefcase,
  Building2,
  Users,
  ShieldCheck,
  Globe2,
  Wrench,
  BarChart3,
  TrendingUp,
  Award,
  Clock,
} from "lucide-react";
import Footer from "@/components/Footer";
import {
  ServiceHero,
  StatsSection,
  SolutionsGrid,
  WhyUsSection,
  ContactSection,
} from "./components";

const stats = [
  { value: "20+", label: "Anos de experiencia", icon: Award },
  { value: "500+", label: "Empresas satisfechas", icon: TrendingUp },
  { value: "24/7", label: "Soporte dedicado", icon: Clock },
  { value: "98%", label: "Tasa de retencion", icon: ShieldCheck },
];

const servicios = [
  {
    icon: Briefcase,
    title: "Administracion de personal externo",
    desc: "Gestion integral de talento para proyectos, outsourcing y servicios temporales.",
    color: "#0057D9",
  },
  {
    icon: Building2,
    title: "Servicios por industria",
    desc: "Soluciones especializadas para manufactura, retail, logistica, salud, TI y mas.",
    color: "#004AB7",
  },
  {
    icon: Users,
    title: "Reclutamiento especializado",
    desc: "Busqueda y seleccion de perfiles tecnicos, ejecutivos y operativos a la medida.",
    color: "#0057D9",
  },
  {
    icon: ShieldCheck,
    title: "Cumplimiento normativo",
    desc: "Aseguramos procesos alineados a la ley y regulaciones de cada sector.",
    color: "#004AB7",
  },
  {
    icon: Globe2,
    title: "Servicios internacionales",
    desc: "Gestion de personal y nomina para empresas globales o con operaciones en Mexico.",
    color: "#0057D9",
  },
  {
    icon: Wrench,
    title: "Soluciones a la medida",
    desc: "Diseno de esquemas y servicios segun el giro, tamano y retos de tu empresa.",
    color: "#004AB7",
  },
  {
    icon: BarChart3,
    title: "Consultoria y optimizacion",
    desc: "Diagnostico, mejora de procesos y asesoria en recursos humanos y nomina.",
    color: "#0057D9",
  },
];

const razones = [
  {
    icon: ShieldCheck,
    title: "Experiencia comprobada",
    desc: "Mas de 20 anos brindando soluciones especializadas a empresas lideres de Mexico y el extranjero.",
  },
  {
    icon: BarChart3,
    title: "Resultados medibles",
    desc: "Procesos optimizados, reduccion de costos y cumplimiento total en cada proyecto.",
  },
  {
    icon: Users,
    title: "Atencion personalizada",
    desc: "Equipo dedicado y soporte 24/7 para cada cliente y cada industria.",
  },
];

export default function ServiciosEspecializadosPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-slate-950 dark:to-slate-900 overflow-x-hidden">
      <ServiceHero
        title="Servicios Especializados"
        description="Soluciones modernas y seguras para el sector financiero: optimizamos procesos de talento, nomina y cumplimiento para que tu organizacion mantenga foco en el crecimiento."
        imageSrc="/image/servicios/servicios-especializados.jpg"
        imageAlt="Servicios Especializados Bechapra"
        backLink="/servicios"
        backLabel="Volver"
        ctaLabel="Contactar a Bechapra"
        ctaLink="#contacto"
      />

      <StatsSection stats={stats} />

      <SolutionsGrid
        title="Nuestras soluciones"
        subtitle="Adaptamos nuestros servicios a las necesidades de tu sector y operacion. Descubre como podemos ayudarte:"
        services={servicios}
      />

      <WhyUsSection
        title="Por que elegir Bechapra?"
        reasons={razones}
      />

      <ContactSection
        title="Listo para transformar tu operacion?"
        subtitle="Contactanos y recibe una consultoria gratuita para disenar la solucion especializada que tu empresa necesita."
      />

      <Footer />
    </main>
  );
}
