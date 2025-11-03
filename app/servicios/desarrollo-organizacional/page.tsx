"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function DesarrolloOrganizacionalPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <Link href="/servicios" className="text-blue-600 hover:underline mb-6 inline-block">
          ← Volver a Servicios
        </Link>
        
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-slate-600 to-slate-800 bg-clip-text text-transparent">
          Desarrollo Organizacional
        </h1>
        
        <p className="text-xl text-slate-600 mb-12">
          Fortalece tu cultura organizacional y desarrolla el potencial de tu equipo
        </p>

        <div className="space-y-8">
          <ServiceDetail
            title="Desarrollo Organizacional"
            description="Implementación de estrategias para mejorar la efectividad organizacional y el clima laboral."
          />
          
          <ServiceDetail
            title="Capacitación Empresarial"
            description="Programas de capacitación diseñados para desarrollar las competencias de tu equipo."
          />
          
          <ServiceDetail
            title="NOM 035"
            description="Cumplimiento normativo en factores de riesgo psicosocial y promoción de un entorno organizacional favorable."
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-slate-700 text-white rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold mb-4">Transforma tu organización</h3>
          <p className="mb-6">Agenda una consulta y conoce nuestras soluciones</p>
          <a href="/#contacto" className="inline-block bg-white text-slate-700 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all">
            Contactar ahora
          </a>
        </motion.div>
      </div>
    </main>
  );
}

function ServiceDetail({ title, description }: { title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl p-6 shadow-md border border-slate-200"
    >
      <h3 className="text-2xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}