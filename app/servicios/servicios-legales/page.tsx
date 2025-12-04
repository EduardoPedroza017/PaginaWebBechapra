"use client";

import { Gavel, ShieldCheck, FileText, Users } from "lucide-react";
import {
  LegalHero,
  ServicesGrid,
  PackagesSection,
  ProcessTimeline,
  FAQBenefits,
  LegalCTA,
  ContactSection,
} from "./components";

const services = [
  { 
    icon: Gavel, 
    title: "Asesoría mercantil", 
    desc: "Constitución, contratos y gobierno corporativo para empresas en crecimiento." 
  },
  { 
    icon: ShieldCheck, 
    title: "Cumplimiento y regulatorio", 
    desc: "Políticas internas, cumplimiento normativo y defensa administrativa." 
  },
  { 
    icon: FileText, 
    title: "Contratación laboral y seguridad", 
    desc: "Asesoría en contratos laborales, políticas y desvinculaciones con enfoque preventivo." 
  },
  { 
    icon: Users, 
    title: "Protección de datos y privacidad", 
    desc: "Avisos de privacidad, contratos con proveedores y buenas prácticas para datos personales." 
  },
];

const packages = [
  { 
    name: "Retainer básico", 
    price: "MXN 6,500 / mes", 
    desc: "Soporte legal continuado: revisiones contractuales y consultas mensuales.",
    features: ["Revisión de contratos", "Consultas ilimitadas", "Respuesta en 24h"],
  },
  { 
    name: "Proyecto puntual", 
    price: "Desde MXN 12,000", 
    desc: "Contratos, políticas o auditoría legal por proyecto con entregables claros.",
    features: ["Entregables definidos", "Timeline claro", "Capacitación incluida"],
    popular: true,
  },
  { 
    name: "Soporte completo", 
    price: "A cotizar", 
    desc: "Paquete a medida con representación, gestión de riesgos y capacitación a equipo.",
    features: ["Representación legal", "Gestión de riesgos", "Capacitación continua"],
  },
];

const processSteps = [
  { 
    step: "01", 
    title: "Diagnóstico", 
    desc: "Revisión rápida para identificar prioridades y riesgos." 
  },
  { 
    step: "02", 
    title: "Plan de trabajo", 
    desc: "Propuesta con fases, entregables y cronograma." 
  },
  { 
    step: "03", 
    title: "Ejecución", 
    desc: "Implementación, capacitación y soporte continuo." 
  },
];

const faqs = [
  { 
    q: "¿Pueden acompañar procesos judiciales?", 
    a: "Sí, trabajamos con despachos asociados y coordinamos la defensa o representación según el alcance que requiera tu empresa." 
  },
  { 
    q: "¿Qué tan rápido implementan políticas internas?", 
    a: "Dependiendo del tamaño, en 2 a 6 semanas podemos tener políticas y procedimientos implementados con capacitación al personal clave." 
  },
  { 
    q: "¿Ofrecen servicios por proyecto o retainer?", 
    a: "Ambos: paquetes por proyecto y retainer mensual para soporte continuo y asesoría preventiva." 
  },
];

const benefits = [
  { 
    icon: ShieldCheck, 
    title: "Prevención de riesgos", 
    desc: "Identificación proactiva de contingencias legales antes de que escalen." 
  },
  { 
    icon: Gavel, 
    title: "Respuesta ágil", 
    desc: "Atención rápida y estratégica ante requerimientos o notificaciones." 
  },
  { 
    icon: FileText, 
    title: "Documentación clara", 
    desc: "Contratos, políticas y procedimientos formalizados y aplicables." 
  },
];

export default function ServiciosLegalesPage() {
  return (
    <main className="min-h-screen bg-white overflow-hidden">
      <LegalHero />
      <ServicesGrid services={services} />
      <PackagesSection packages={packages} />
      <ProcessTimeline steps={processSteps} />
      <FAQBenefits faqs={faqs} benefits={benefits} />
      <LegalCTA />
      <ContactSection />
    </main>
  );
}
