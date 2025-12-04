"use client";

import {
  TalentHero,
  WhyChooseUs,
  Modalities,
  KPISection,
  ProcessTimeline,
  PositionsCloud,
  TalentCTA,
  ContactSection,
} from "./components";
import {
  CheckCircle,
  Shield,
  Users,
  Target,
  Briefcase,
  Search,
  FileCheck,
  UserCheck,
  ClipboardCheck,
  Award,
  Clock,
  TrendingUp,
  Zap,
  Star,
} from "lucide-react";

// Data
const steps = [
  { n: "1", title: "Brief con el cliente", desc: "Definimos el perfil ideal, competencias clave y cultura organizacional para encontrar al candidato perfecto.", icon: Briefcase },
  { n: "2", title: "Sourcing estrategico", desc: "Buscamos activamente en multiples fuentes: bolsas de empleo, redes profesionales, base de datos propia y hunting directo.", icon: Search },
  { n: "3", title: "Entrevistas y evaluacion", desc: "Aplicamos entrevistas por competencias, evaluaciones psicometricas y verificacion de referencias laborales.", icon: FileCheck },
  { n: "4", title: "Shortlist de candidatos", desc: "Presentamos una terna de candidatos calificados con reporte detallado de cada perfil evaluado.", icon: UserCheck },
  { n: "5", title: "Validaciones finales", desc: "Coordinamos entrevistas con tu equipo, negociacion de oferta y acompanamiento hasta la contratacion.", icon: ClipboardCheck },
  { n: "6", title: "Garantia de reemplazo", desc: "Ofrecemos garantia de reemplazo sin costo adicional durante los primeros 90 dias de contratacion.", icon: Award },
];

const kpis = [
  { icon: Clock, label: "Tiempo de respuesta", value: "<48h", note: "Primeros CVs" },
  { icon: Target, label: "Time To Fill", value: "7-21", note: "Dias promedio" },
  { icon: TrendingUp, label: "Tasa de aceptacion", value: "85%+", note: "De ofertas" },
  { icon: Star, label: "NPS Clientes", value: "9.0", note: "Satisfaccion" },
];

const positions = [
  "Contabilidad y Finanzas", "Tecnologias de la Informacion", "Comercial y Ventas",
  "Marketing Digital", "Recursos Humanos", "Operaciones y Logistica",
  "Ingenieria Industrial", "Legal y Compliance", "Compras y Abastecimiento",
  "Atencion a Clientes", "Administracion", "Calidad y Mejora Continua",
  "Manufactura", "Mantenimiento", "Seguridad e Higiene", "Direccion General",
];

const benefits = [
  { icon: CheckCircle, title: "Seleccion Personalizada", subtitle: "Reclutamiento a la medida", desc: "Cada busqueda es unica. Entendemos tu cultura, valores y necesidades especificas para encontrar candidatos que realmente se integren a tu equipo." },
  { icon: Shield, title: "Garantia de Calidad", subtitle: "Compromiso total", desc: "Respaldamos nuestro trabajo con garantia de reemplazo. Si el candidato no funciona en los primeros 90 dias, encontramos un reemplazo sin costo adicional." },
];

const modalities = [
  { icon: Users, title: "Masivo / Operativo", desc: "Reclutamiento de alto volumen para posiciones operativas, produccion, almacen y servicios generales con tiempos de respuesta agiles." },
  { icon: Briefcase, title: "Administrativo / Especializado", desc: "Busqueda de perfiles administrativos, tecnicos y especializados con competencias especificas y experiencia comprobable." },
  { icon: Zap, title: "Headhunter / Ejecutivo", desc: "Busqueda directa y confidencial de talento ejecutivo, gerencial y directivo a traves de metodologia especializada de hunting." },
];

export default function AtraccionDeTalentoPage() {
  return (
    <main className="overflow-hidden">
      <TalentHero
        title="Atraccion de"
        highlightWord="Talento"
        description="Conectamos a tu empresa con el talento ideal. Nuestro proceso de reclutamiento y seleccion garantiza candidatos calificados, evaluados y alineados con tu cultura organizacional."
        imageSrc="/image/atraccion-de-talento.webp"
        imageAlt="Atraccion de Talento"
      />

      <WhyChooseUs title="Por que elegirnos?" benefits={benefits} />

      <Modalities title="Modalidades de Reclutamiento" modalities={modalities} />

      <ProcessTimeline title="Nuestro Proceso" steps={steps} />

      <KPISection title="Nuestros Indicadores" kpis={kpis} />

      <PositionsCloud title="Perfiles que Reclutamos" positions={positions} />

      <TalentCTA
        title="¿Listo para encontrar al candidato ideal?"
        subtitle="Agenda una sesion de consultoria gratuita y disenamos juntos la estrategia de reclutamiento perfecta para tu empresa."
      />

      <ContactSection />
    </main>
  );
}
