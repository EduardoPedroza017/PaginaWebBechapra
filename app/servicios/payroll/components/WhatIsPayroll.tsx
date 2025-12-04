"use client";

import { motion } from "framer-motion";

interface WhatIsPayrollProps {
  title?: string;
  description?: string;
}

export default function WhatIsPayroll({
  title = "Que es el servicio de payroll?",
  description = "Ideal para empresas que buscan eficiencia, seguridad y cumplimiento normativo en su gestion de recursos humanos y nomina.",
}: WhatIsPayrollProps) {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-black text-blue-900 mb-8 tracking-tight"
        >
          {title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative"
        >
          {/* Decorative Line */}
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mb-8" />
          
          <p className="text-xl text-gray-600 leading-relaxed">
            <span className="font-bold text-blue-900">Ideal para empresas</span> que buscan eficiencia, seguridad y{" "}
            <span className="font-bold text-blue-900">cumplimiento normativo</span> en su gestion de recursos humanos y nomina.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
