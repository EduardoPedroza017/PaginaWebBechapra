"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Scale, Shield, CheckCircle } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';

export default function LegalCTA() {
  const ctaFeatures = [
    "Diagnóstico legal gratuito",
    "Respuesta en 24 horas",
    "Confidencialidad garantizada",
  ];

  return (
    <section className="relative w-screen -ml-[calc(50vw-50%)] py-24 px-6 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 overflow-hidden">
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
          className="absolute -bottom-1/2 -left-1/4 w-3/4 h-full bg-gradient-to-tr from-blue-400/20 dark:from-blue-600/15 to-transparent rounded-full"
        />
        
        {/* Floating icons */}
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
            {i % 2 === 0 ? (
              <Scale className={`${i === 0 ? 'w-8 h-8' : 'w-6 h-6'} text-white/10`} />
            ) : (
              <Shield className={`${i === 1 ? 'w-8 h-8' : 'w-6 h-6'} text-white/10`} />
            )}
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
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-20 h-20 mx-auto mb-8 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/20"
          >
            <Scale className="w-10 h-10 text-white" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            ¿Listo para reducir{" "}
            <span className="bg-gradient-to-r from-sky-300 to-blue-300 bg-clip-text text-transparent">
              riesgos legales?
            </span>
          </h2>

          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Hablemos: proponemos un plan legal inicial personalizado para tu empresa.
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
                Contactar ahora
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="#contacto"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-bold text-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
              >
                Solicitar evaluación
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
