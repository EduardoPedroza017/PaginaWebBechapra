"use client";

import { Shield, FileCheck, Users, TrendingUp, HeartPulse, Scale, Award, ClipboardCheck, BarChart3, FileText, CheckSquare } from "lucide-react";
import {
  NomHero,
  StatsSection,
  ApproachSection,
  FAQBenefits,
  NomCTA,
  ContactSection,
} from "./components";
import Footer from "@/components/Footer";

const stats = [
  { icon: Shield, value: "100%", label: "Cumplimiento Garantizado" },
  { icon: FileCheck, value: "500+", label: "Empresas Certificadas" },
  { icon: Users, value: "50K+", label: "Colaboradores Evaluados" },
  { icon: TrendingUp, value: "95%", label: "Satisfacción del Cliente" },
];

const steps = [
  {
    num: "01",
    title: "Diagnóstico Inicial",
    desc: "Evaluación completa del estado actual de tu empresa respecto a la NOM-035.",
    icon: ClipboardCheck,
  },
  {
    num: "02",
    title: "Aplicación de Cuestionarios",
    desc: "Implementación de los instrumentos oficiales para evaluar factores de riesgo psicosocial.",
    icon: FileText,
  },
  {
    num: "03",
    title: "Análisis de Resultados",
    desc: "Interpretación detallada de datos y generación de reportes ejecutivos.",
    icon: BarChart3,
  },
  {
    num: "04",
    title: "Plan de Acción",
    desc: "Diseño e implementación de estrategias de mejora y prevención.",
    icon: CheckSquare,
  },
];

const faqs = [
  {
    q: "¿Qué es la NOM-035?",
    a: "Es una norma oficial mexicana que establece los elementos para identificar, analizar y prevenir los factores de riesgo psicosocial en el trabajo.",
  },
  {
    q: "¿Quiénes están obligados a cumplir?",
    a: "Todos los centros de trabajo en México deben cumplir con esta norma, aunque las obligaciones varían según el número de trabajadores.",
  },
  {
    q: "¿Cuáles son las multas por incumplimiento?",
    a: "Las multas pueden ir desde 250 hasta 5,000 UMA por cada trabajador afectado, lo que puede representar cantidades significativas.",
  },
  {
    q: "¿Cuánto tiempo toma el proceso?",
    a: "El proceso completo puede tomar de 4 a 12 semanas dependiendo del tamaño de la empresa y la complejidad de la implementación.",
  },
];

const benefits = [
  { icon: HeartPulse, title: "Bienestar Laboral", desc: "Mejora el ambiente de trabajo" },
  { icon: Scale, title: "Cumplimiento Legal", desc: "Evita sanciones y multas" },
  { icon: Users, title: "Productividad", desc: "Equipos más comprometidos" },
  { icon: Award, title: "Reputación", desc: "Empresa socialmente responsable" },
];

export default function NOM035Page() {
  return (
    <main className="min-h-screen bg-linear-to-b from-blue-950 via-blue-900 to-blue-950 dark:bg-slate-900 overflow-hidden">
      <NomHero
        title="Cumplimiento"
        highlightWord="NOM-035"
        description="Te ayudamos a cumplir con la norma oficial mexicana para la identificación, análisis y prevención de factores de riesgo psicosocial en el trabajo."
      />
      <StatsSection stats={stats} />
      <ApproachSection title="Nuestro Enfoque" steps={steps} />
      <FAQBenefits faqs={faqs} benefits={benefits} />
      <NomCTA
        title="¿Listo para cumplir con la NOM-035?"
        subtitle="Protege a tu equipo y evita sanciones. Nuestros expertos te guiarán en cada paso del proceso."
      />
      <ContactSection />
      <Footer />
    </main>
  );
}
