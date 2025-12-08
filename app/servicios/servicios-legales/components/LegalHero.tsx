"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Scale, Sparkles, Shield } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';

export default function LegalHero() {
  return (
    <section className="relative w-screen -ml-[calc(50vw-50%)] min-h-[620px] bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 pt-20 pb-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/3 -right-1/4 w-[700px] h-[700px] bg-gradient-to-br from-blue-400/20 via-indigo-500/15 to-transparent dark:from-blue-600/10 dark:via-indigo-700/8 dark:to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-blue-400/10 via-blue-500/10 to-transparent dark:from-blue-600/5 dark:via-blue-700/5 dark:to-transparent rounded-full blur-3xl"
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        {/* Floating Icons */}
        {[Scale, Shield].map((Icon, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 6 + i * 2, repeat: Infinity, delay: i * 1.5 }}
            className={`absolute ${i === 0 ? 'top-1/4 right-1/4' : 'bottom-1/3 left-1/5'}`}
          >
            <Icon className="w-20 h-20 text-white/10" />
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
            className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm text-white rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 mb-10"
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-sm rounded-full border border-blue-400/30 mb-6"
            >
              <Sparkles className="w-4 h-4 text-blue-300" />
              <span className="text-sm font-semibold text-blue-200">Protección Legal</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-[1.1]">
              Servicios{" "}
              <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Legales
              </span>
            </h1>

            <p className="text-lg md:text-xl text-blue-100/90 leading-relaxed mb-8 max-w-xl">
              Protege tu negocio con asesoría legal práctica enfocada en prevención y cumplimiento normativo.
            </p>

            {/* Stats */}
            <div className="flex gap-8 mb-10">
              {[
                { value: "+300", label: "Casos atendidos" },
                { value: "8+", label: "Años experiencia" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-black bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-blue-200/70">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="#contacto"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
              >
                Solicitar asesoría
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
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-indigo-500/30 rounded-3xl blur-3xl" />
            
            <div className="relative h-[420px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl border border-white/20 p-8 flex flex-col justify-center">
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-sky-400 rounded-t-3xl" />
              
              {/* Central Icon */}
              <motion.div
                animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/30"
              >
                <Scale className="w-16 h-16 text-white" />
              </motion.div>

              <h3 className="text-2xl font-bold text-white text-center mb-3">Protección Total</h3>
              <p className="text-blue-200/80 text-center text-lg mb-6">Tu empresa segura y en cumplimiento</p>

              {/* Mini stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "100%", label: "Cumplimiento" },
                  { value: "24h", label: "Respuesta" },
                  { value: "98%", label: "Satisfacción" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="text-center p-3 bg-white/5 rounded-xl border border-white/10"
                  >
                    <div className="text-xl font-black text-white">{stat.value}</div>
                    <div className="text-xs text-blue-300/70">{stat.label}</div>
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
