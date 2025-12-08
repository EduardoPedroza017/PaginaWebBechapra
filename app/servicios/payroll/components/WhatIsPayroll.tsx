"use client";

import { motion } from "framer-motion";
import { TranslateText } from '@/components/TranslateText';

interface WhatIsPayrollProps {
  title?: string;
  description?: string;
}

export default function WhatIsPayroll({
  title = "Que es el servicio de payroll?",
  description = "Ideal para empresas que buscan eficiencia, seguridad y cumplimiento normativo en su gestion de recursos humanos y nomina.",
}: WhatIsPayrollProps) {
  return (
    <section className="py-20 px-6 bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-black text-blue-900 dark:text-white mb-8 tracking-tight"
        >
          <TranslateText text={title} />
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative"
        >
          {/* Decorative Line */}
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 rounded-full mx-auto mb-8" />
          
          <p className="text-xl text-gray-600 dark:text-slate-400 leading-relaxed">
            <TranslateText text={description} />
          </p>
        </motion.div>
      </div>
    </section>
  );
}
