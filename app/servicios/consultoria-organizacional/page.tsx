"use client";

import {
  ConsultingHero,
  ServicesGrid,
  HowWeWork,
  GrowthSection,
  BenefitsSection,
  ConsultingCTA,
  ContactSection,
} from "./components";
import {
  Target,
  BarChart3,
  Shield,
  TrendingUp,
  CheckCircle,
  Lightbulb,
} from "lucide-react";

// Data
const services = [
  { title: "Estrategia de Organización", icon: Target, color: "#7c3aed" },
  { title: "Administrativa", icon: BarChart3, color: "#8b5cf6" },
  { title: "Prevención de Riesgos Laborales", icon: Shield, color: "#a855f7" },
  { title: "Financiera", icon: TrendingUp, color: "#7c3aed" },
  { title: "Recursos Humanos", icon: CheckCircle, color: "#8b5cf6" },
  { title: "Especializada", icon: Lightbulb, color: "#a855f7" },
];

const howWeWorkSteps = [
  "Diagnóstico y Análisis",
  "Diseño de Soluciones Personalizadas",
  "Implementación y Seguimiento",
];

const benefits = [
  { title: "Plan estratégico personalizado", icon: Target },
  { title: "Herramientas y procesos mejorados", icon: BarChart3 },
  { title: "Protocolos de Seguridad y Prevención de Riesgos Laborales", icon: Shield },
];

export default function ConsultoriaOrganizacionalPage() {
  return (
    <main className="overflow-hidden">
      <ConsultingHero
        title="Consultoría"
        highlightWord="Organizacional"
        description="Consultoría experta para optimizar estructura y procesos. Desbloquea el potencial de tu organización con estrategias personalizadas."
      />

      <ServicesGrid
        title="Nuestros Servicios de Consultoría"
        services={services}
      />

      <HowWeWork
        title="Cómo Trabajamos"
        description="En Bechapra creemos en la colaboración estrecha y el enfoque personalizado para cada cliente. Nuestro proceso de trabajo se divide en tres pasos clave:"
        steps={howWeWorkSteps}
      />

      <GrowthSection
        title="Potencia el crecimiento y el éxito de tu empresa"
        description="Desarrollamos estrategias estructurales y funcionales que impulsan el crecimiento y la eficiencia, permitiéndote superar el estancamiento y alcanzar nuevos horizontes de éxito."
        highlight="Estamos aquí para entender tus desafíos y diseñar una solución personalizada para tu empresa."
        ctaLabel="COMIENZA AHORA"
        ctaLink="#contacto"
      />

      <BenefitsSection benefits={benefits} />

      <ConsultingCTA
        title="No dejes que los problemas detengan tu progreso"
        subtitle="¡Descubre cómo podemos ayudarte a superarlos!"
      />

      <ContactSection />
    </main>
  );
}
