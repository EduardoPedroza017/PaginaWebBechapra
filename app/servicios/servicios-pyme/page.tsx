"use client";

import { Briefcase, Layers, Users, DollarSign } from "lucide-react";
import Footer from "@/components/Footer";
import {
  PymeHero,
  ServicesGrid,
  UseCasesSection,
  PricingSection,
  FAQSection,
  PymeCTA,
  ContactSection,
} from "./components";

// Data
const services = [
  {
    icon: Briefcase,
    title: "Constitución y contratos",
    desc: "Acompañamiento para constituir tu empresa y contratos comerciales básicos.",
  },
  {
    icon: Layers,
    title: "Contabilidad simplificada",
    desc: "Procesos simples y reportes claros pensados para PYMEs.",
  },
  {
    icon: Users,
    title: "Recursos humanos",
    desc: "Contratos, políticas y gestión de personal en formatos accesibles.",
  },
  {
    icon: DollarSign,
    title: "Optimización de costos",
    desc: "Revisión de gastos y recomendaciones para mejorar flujo de efectivo.",
  },
];

const useCases = [
  {
    title: "E-commerce en crecimiento",
    desc: "Optimización de procesos contables y facturación para tiendas online que crecen.",
  },
  {
    title: "Servicios profesionales",
    desc: "Paquetes con contratos, políticas y gestión de clientes recurrentes.",
  },
  {
    title: "Restaurantes y retail",
    desc: "Control de inventarios, costos y recomendaciones para mejorar margen.",
  },
  {
    title: "Preparando escalamiento",
    desc: "Procesos para preparar la empresa para inversión o crecimiento estructurado.",
  },
];

const packages = [
  {
    name: "Starter",
    price: "MXN 2,500 / mes",
    items: ["Registro básico", "Reporte mensual", "Consultas por email"],
  },
  {
    name: "Growth",
    price: "MXN 6,000 / mes",
    items: ["Todo Starter", "Reportes KPI", "Soporte telefónico"],
    popular: true,
  },
  {
    name: "Scale",
    price: "MXN 12,000 / mes",
    items: ["Todo Growth", "Cierre anual", "Consultoría estratégica"],
  },
];

const faqs = [
  {
    q: "¿Puedo cambiar de paquete después?",
    a: "Sí, puedes escalar o bajar de paquete con 30 días de aviso y ajustamos la facturación.",
  },
  {
    q: "¿Ofrecen facturación y nómina?",
    a: "Sí, ofrecemos soluciones de facturación y coordinación con proveedores de nómina según la necesidad.",
  },
  {
    q: "¿Cuál es el tiempo de implementación?",
    a: "Generalmente entre 1-2 semanas para tener el sistema operando con documentación básica y capacitación inicial.",
  },
  {
    q: "¿Qué pasa si mi negocio crece rápidamente?",
    a: "Nuestros servicios escalan contigo. Podemos ajustar el paquete según las necesidades de tu empresa.",
  },
];

export default function ServiciosPymePage() {
  return (
    <main className="overflow-hidden bg-white dark:bg-slate-900">
      <PymeHero />
      <ServicesGrid services={services} />
      <UseCasesSection useCases={useCases} />
      <PricingSection packages={packages} />
      <FAQSection faqs={faqs} />
      <PymeCTA />
      <ContactSection />
      <Footer />
    </main>
  );
}
