"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Rocket, Sparkles, TrendingUp, Building2 } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';

export default function PymeHero() {
  return (
    <section className="relative w-screen -ml-[calc(50vw-50%)] min-h-[600px] bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 dark:from-slate-950 dark:via-blue-950 dark:to-blue-900 pt-20 pb-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/3 -right-1/4 w-[700px] h-[700px] bg-gradient-to-br from-white/20 via-blue-300/15 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-blue-300/20 via-blue-400/10 to-transparent rounded-full blur-3xl"
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Floating Icons */}
        {[Rocket, TrendingUp, Building2].map((Icon, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 5 + i * 2, repeat: Infinity, delay: i * 1.2 }}
            className={`absolute ${
              i === 0 ? 'top-1/4 right-1/4' : 
              i === 1 ? 'bottom-1/3 left-1/5' : 
              'top-1/3 left-1/3'
            }`}
          >
            <Icon className="w-16 h-16 text-white/15" />
          </motion.div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 z-10">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/servicios"
            className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm text-white rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 mb-10"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Volver a servicios</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-6"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-semibold text-white">Impulso Empresarial</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-[1.1]">
              Servicios{" "}
              <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-lg">
                PYME
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-xl">
              Paquetes pensados para empresas pequeñas: menos complejidad, más foco en crecimiento y escalabilidad.
            </p>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="#contacto"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 rounded-2xl font-bold text-lg shadow-xl shadow-blue-900/20 hover:shadow-blue-900/30 transition-all duration-300"
              >
                Quiero una propuesta
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Visual Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-yellow-300/20 rounded-3xl blur-3xl" />
            
            <div className="relative h-[400px] bg-white/10 backdrop-blur-sm rounded-3xl border border-white/30 p-8 flex flex-col justify-center">
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-white via-yellow-200 to-orange-300 rounded-t-3xl" />
              
              {/* Central Icon */}
              <motion.div
                animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-28 h-28 mx-auto mb-6 bg-white rounded-3xl flex items-center justify-center shadow-2xl"
              >
                <Rocket className="w-14 h-14 text-orange-500" />
              </motion.div>

              <h3 className="text-2xl font-bold text-white text-center mb-3">Crece sin complicaciones</h3>
              <p className="text-white/80 text-center text-lg mb-6">Soluciones a tu medida</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "50%", label: "Ahorro" },
                  { value: "2x", label: "Velocidad" },
                  { value: "24/7", label: "Soporte" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="text-center p-3 bg-white/10 rounded-xl border border-white/20"
                  >
                    <div className="text-2xl font-black text-white">{stat.value}</div>
                    <div className="text-xs text-white/70">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
