"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calculator, CheckCircle } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';

export default function AccountingCTA() {
  const ctaFeatures = [
    "Análisis financiero personalizado",
    "Reportes mensuales claros",
    "Asesoría fiscal incluida",
  ];

  return (
    <section className="relative w-screen -ml-[calc(50vw-50%)] py-24 px-6 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -right-1/4 w-full h-full bg-gradient-to-br from-white/10 dark:from-white/5 to-transparent rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/2 -left-1/4 w-3/4 h-full bg-gradient-to-tr from-indigo-400/20 dark:from-indigo-600/15 to-transparent rounded-full"
        />
        
        {/* Floating calculators */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
            }}
            className={`absolute ${
              i === 0 ? 'top-10 left-[10%]' :
              i === 1 ? 'top-20 right-[15%]' :
              i === 2 ? 'bottom-20 left-[20%]' :
              'bottom-10 right-[10%]'
            }`}
          >
            <Calculator className={`${i % 2 === 0 ? 'w-8 h-8' : 'w-6 h-6'} text-white/10`} />
          </motion.div>
        ))}
      </div>

      <div className="relative max-w-4xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Icon */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-20 h-20 mx-auto mb-8 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/20"
          >
            <Calculator className="w-10 h-10 text-white" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            <TranslateText text="¿Listo para ordenar" />{" "}
            <span className="bg-gradient-to-r from-blue-300 to-indigo-300 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              <TranslateText text="tus finanzas?" />
            </span>
          </h2>

          <p className="text-xl text-blue-100 dark:text-blue-200/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            <TranslateText text="Agenda una reunión y recibe una propuesta de contabilidad personalizada para tu empresa." />
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {ctaFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
              >
                <CheckCircle className="w-4 h-4 text-green-300" />
                <span className="text-sm text-white font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="#contacto"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-white/20 transition-all duration-300"
              >
                Solicitar asesoría
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="#contacto"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-bold text-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
              >
                Agendar reunión
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
