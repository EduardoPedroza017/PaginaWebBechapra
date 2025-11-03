"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ManagementServicesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <Link href="/servicios" className="text-blue-600 hover:underline mb-6 inline-block">
          ← Volver a Servicios
        </Link>
        
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
          Management Services
        </h1>
        
        <p className="text-xl text-slate-600 mb-12">
          Servicios especializados para la gestión efectiva y profesional de tu negocio
        </p>

        <div className="space-y-8">
          <ServiceDetail
            title="Servicios Contables"
            description="Gestión contable integral, auditorías y asesoría financiera para tu empresa."
          />
          
          <ServiceDetail
            title="Servicios Legales"
            description="Asesoría legal corporativa y cumplimiento normativo para proteger tus intereses."
          />
          
          <ServiceDetail
            title="Servicios PYME"
            description="Soluciones adaptadas a las necesidades específicas de pequeñas y medianas empresas."
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-indigo-600 text-white rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold mb-4">Optimiza la gestión de tu negocio</h3>
          <p className="mb-6">Descubre cómo nuestros servicios pueden ayudarte</p>
          <a href="/#contacto" className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all">
            Más información
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