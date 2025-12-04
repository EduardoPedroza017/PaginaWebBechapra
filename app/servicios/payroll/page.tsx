"use client";

import { Shield, Calendar, Banknote, Users, FileText, Briefcase, CheckCircle, Calculator, Building2, FileCheck, Headphones } from "lucide-react";
import Footer from "@/components/Footer";
import { PayrollHero, WhatIsPayroll, BenefitsGrid, ProcessSteps, ServicesIncluded, PayrollScope, BlueCTA, ContactSection } from "./components";

const benefits = [
  { icon: Shield, title: "Precision y Fiabilidad", desc: "Contamos con un equipo de expertos en nomina que garantizan la exactitud en cada pago de empleado." },
  { icon: Calendar, title: "Cumplimiento Normativo", desc: "Nuestra gestion de nomina esta disenada para cumplir con todas las regulaciones fiscales y laborales vigentes." },
  { icon: Banknote, title: "Seguridad de los Datos", desc: "Implementamos medidas robustas de seguridad para proteger la informacion confidencial de tu empresa." },
  { icon: Users, title: "Costo-Efectividad", desc: "Ofrecemos soluciones de nomina de alta calidad a precios competitivos." },
];

const processSteps = [
  { icon: FileText, title: "Recepcion de informacion", desc: "Recibimos y validamos los datos de empleados, incidencias y percepciones." },
  { icon: Briefcase, title: "Calculo y timbrado", desc: "Realizamos el calculo de nomina, deducciones, impuestos y timbrado de recibos." },
  { icon: CheckCircle, title: "Pago y reportes", desc: "Gestionamos la dispersion de pagos y generamos reportes para la empresa y empleados." },
];

const servicesIncluded = [
  { icon: <Calculator size={20} className="text-blue-600" />, title: "Calculo de nomina y timbrado", desc: "Calculo preciso de percepciones, deducciones, impuestos y timbrado de recibos." },
  { icon: <Building2 size={20} className="text-blue-600" />, title: "IMSS, RCV e INFONAVIT", desc: "Gestion de obligaciones ante IMSS, RCV, INFONAVIT y cumplimiento de impuestos estatales." },
  { icon: <Users size={20} className="text-blue-600" />, title: "Altas, bajas y modificaciones", desc: "Administracion de movimientos de personal y actualizaciones salariales." },
  { icon: <FileCheck size={20} className="text-blue-600" />, title: "Reportes y recibos digitales", desc: "Generacion y envio de reportes detallados y recibos de nomina digitales a colaboradores." },
  { icon: <Headphones size={20} className="text-blue-600" />, title: "Atencion y soporte experto", desc: "Acompanamiento personalizado y asesoria en todo momento para resolver tus dudas." },
];

const scopeItems = [
  { text: "Captura de incidencias de cada proceso de nomina." },
  { text: "Altas, bajas y modificaciones salariales de empleados." },
  { text: "Envio de recibos de pago a colaboradores por frecuencia de pago." },
  { text: "Calculo y envio de pre-nomina y nomina definitiva via electronica." },
  { text: "Mantenimiento a tablas de ISR y cualquier informacion que afecta el calculo de la nomina." },
  { text: "Calculo de fondo de ahorro y envio del layout correspondiente." },
  { text: "Emision bimestral de liquidacion de retiro, Infonavit via WEB." },
  { text: "Calculo y presentacion de variables bimestrales de salario diario integrado." },
  { text: "Ingreso de incapacidades y ausentismos en SUA." },
];

export default function PayrollPage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <PayrollHero title="Payroll & Nomina Empresarial" description="Gestiona tu nomina de forma profesional, segura y sin errores. Cumplimos con todas las obligaciones fiscales y laborales, para que tu te enfoques en hacer crecer tu empresa." imageSrc="/image/servicios/payroll.jpg" imageAlt="Payroll Bechapra" backLink="/servicios" backLabel="Volver" ctaLabel="Contactar a Bechapra" ctaLink="#contacto" />
      <WhatIsPayroll />
      <BenefitsGrid title="Beneficios de externalizar tu nomina" benefits={benefits} />
      <ProcessSteps title="Como funciona nuestro proceso?" steps={processSteps} tip="Todo el proceso es transparente y te mantenemos informado en cada etapa. Nuestro equipo esta disponible para aclarar dudas en cualquier momento." />
      <ServicesIncluded title="Que incluye nuestro servicio de nomina?" subtitle="Nuestro servicio de nomina es integral y cubre todos los aspectos clave para la tranquilidad de tu empresa y colaboradores." items={servicesIncluded} />
      <PayrollScope title="Nuestro alcance en nomina, IMSS, RCV, INFONAVIT e Impuestos Estatales" items={scopeItems} />
      <BlueCTA title="Listo para transformar tu operacion?" subtitle="Contactanos y recibe una consultoria gratuita para disenar la solucion especializada que tu empresa necesita." ctaLabel="Solicitar consultoria gratuita" ctaLink="#contacto" />
      <ContactSection />
      <Footer />
    </main>
  );
}
