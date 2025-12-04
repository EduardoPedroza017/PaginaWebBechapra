"use client";

import { FileText, PieChart, ClipboardCheck, TrendingUp, Shield, Banknote } from "lucide-react";
import {
  AccountingHero,
  ServicesGrid,
  ProcessTimeline,
  FAQBenefits,
  AccountingCTA,
  ContactSection,
} from "./components";

const services = [
  { 
    icon: FileText, 
    title: "Contabilidad general", 
    desc: "Registros, conciliaciones y cierre mensual con reportes claros para la dirección." 
  },
  { 
    icon: PieChart, 
    title: "Reportes y KPI", 
    desc: "Estados financieros, análisis de rentabilidad y dashboards a medida." 
  },
  { 
    icon: ClipboardCheck, 
    title: "Impuestos y cumplimiento", 
    desc: "Declaraciones, cumplimiento fiscal y asesoría tributaria constante." 
  },
];

const processSteps = [
  { 
    step: "01", 
    title: "Diagnóstico inicial", 
    desc: "Revisión de libros, procedimientos y puntos críticos." 
  },
  { 
    step: "02", 
    title: "Plan operativo", 
    desc: "Propuesta de trabajo, controles y calendarización." 
  },
  { 
    step: "03", 
    title: "Ejecución y entrega", 
    desc: "Cierres, reportes y entrega de evidencia." 
  },
];

const faqs = [
  { 
    q: "¿Ofrecen facturación electrónica?", 
    a: "Sí, gestionamos y enlazamos la contabilidad con tus CFDI para conciliaciones automáticas." 
  },
  { 
    q: "¿Cómo manejan la confidencialidad?", 
    a: "Firmamos acuerdos de confidencialidad y usamos accesos controlados para proteger tu información." 
  },
  { 
    q: "¿Qué incluyen los reportes mensuales?", 
    a: "Balance general, estado de resultados, análisis de flujos y recomendaciones para optimización." 
  },
];

const benefits = [
  { 
    icon: TrendingUp, 
    title: "Claridad financiera", 
    desc: "Reportes precisos y actualizados para decisiones basadas en datos." 
  },
  { 
    icon: Shield, 
    title: "Optimización fiscal", 
    desc: "Estrategias tributarias que reducen tu carga fiscal legalmente." 
  },
  { 
    icon: Banknote, 
    title: "Cumplimiento total", 
    desc: "Declaraciones a tiempo y acceso seguro a documentación de auditoría." 
  },
];

export default function ServiciosContablesPage() {
  return (
    <main className="min-h-screen bg-white overflow-hidden">
      <AccountingHero />
      <ServicesGrid services={services} />
      <ProcessTimeline steps={processSteps} />
      <FAQBenefits faqs={faqs} benefits={benefits} />
      <AccountingCTA />
      <ContactSection />
    </main>
  );
}
