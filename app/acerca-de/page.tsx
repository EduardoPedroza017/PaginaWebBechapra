"use client";

import { motion } from "framer-motion";

export default function AcercaDePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Acerca de Bechapra
          </h1>
          
          <p className="text-xl text-slate-600 mb-12">
            Tu aliado estratégico en soluciones empresariales integrales
          </p>

          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Nuestra Misión</h2>
              <p className="text-slate-600 leading-relaxed">
                Impulsar el crecimiento y éxito de las organizaciones a través de soluciones integrales en Capital Humano, Desarrollo Organizacional y Management Services.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Nuestra Visión</h2>
              <p className="text-slate-600 leading-relaxed">
                Ser la empresa líder en soluciones empresariales, reconocida por nuestra excelencia, innovación y compromiso con el éxito de nuestros clientes.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}