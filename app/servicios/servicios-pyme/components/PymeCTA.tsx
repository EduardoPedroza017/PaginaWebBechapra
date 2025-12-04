"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Rocket, CheckCircle } from "lucide-react";

export default function PymeCTA() {
  const ctaFeatures = [
    "Sin costos ocultos",
    "Escalable según crezcas",
    "Soporte personalizado",
  ];

  return (
    <section className="relative w-screen -ml-[calc(50vw-50%)] py-24 px-6 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -right-1/4 w-full h-full bg-gradient-to-br from-white/20 to-transparent rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/2 -left-1/4 w-3/4 h-full bg-gradient-to-tr from-orange-300/30 to-transparent rounded-full"
        />
        
        {/* Floating rockets */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              duration: 5 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
            }}
            className={`absolute ${
              i === 0 ? 'top-10 left-[15%]' :
              i === 1 ? 'top-20 right-[20%]' :
              'bottom-20 left-[25%]'
            }`}
          >
            <Rocket className={`${i === 0 ? 'w-10 h-10' : 'w-8 h-8'} text-white/15`} />
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
            transition={{ duration: 2, repeat: Infinity }}
            className="w-20 h-20 mx-auto mb-8 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/30"
          >
            <Rocket className="w-10 h-10 text-white" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            ¿Listo para{" "}
            <span className="underline decoration-white/50 decoration-4 underline-offset-4">
              arrancar?
            </span>
          </h2>

          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Solicita una propuesta adaptada a tu operación y tamaño de empresa.
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
                className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30"
              >
                <CheckCircle className="w-4 h-4 text-white" />
                <span className="text-sm text-white font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="#contacto"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-orange-600 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-white/20 transition-all duration-300"
              >
                Contactar
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="#paquetes"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-2xl font-bold text-lg border-2 border-white/40 hover:bg-white/30 transition-all duration-300"
              >
                Ver paquetes
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
