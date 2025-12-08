"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calculator, Sparkles, TrendingUp } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';

export default function AccountingHero() {
  return (
    <section className="relative w-screen -ml-[calc(50vw-50%)] min-h-[600px] bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 pt-20 pb-32 overflow-hidden">
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
          className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-blue-400/15 via-blue-500/10 to-transparent dark:from-blue-600/8 dark:via-blue-700/5 dark:to-transparent rounded-full blur-3xl"
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Floating Icons */}
        {[Calculator, TrendingUp].map((Icon, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 5 + i * 2, repeat: Infinity, delay: i * 1.5 }}
            className={`absolute ${i === 0 ? 'top-1/4 right-1/4' : 'bottom-1/3 left-1/5'}`}
          >
            <Icon className="w-16 h-16 text-white/10" />
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
            <span className="font-medium"><TranslateText text="Volver a servicios" /></span>
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 dark:from-blue-600/20 dark:to-indigo-600/20 backdrop-blur-sm rounded-full border border-blue-400/30 dark:border-blue-500/30 mb-6"
            >
              <Sparkles className="w-4 h-4 text-blue-300 dark:text-blue-400" />
              <span className="text-sm font-semibold text-blue-200 dark:text-blue-300"><TranslateText text="Precisión Financiera" /></span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-[1.1]">
              <TranslateText text="Servicios" />{" "}
              <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-400 dark:from-blue-400 dark:via-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">
                <TranslateText text="Contables" />
              </span>
            </h1>

            <p className="text-lg md:text-xl text-blue-100/90 dark:text-blue-200/80 leading-relaxed mb-8 max-w-xl">
              <TranslateText text="Gestión contable confiable que te permite tomar decisiones financieras basadas en datos precisos y reportes oportunos." />
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="#contacto"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-400 to-indigo-500 dark:from-blue-500 dark:to-indigo-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-500/25 dark:shadow-blue-600/25 hover:shadow-blue-500/40 dark:hover:shadow-blue-600/40 transition-all duration-300"
                >
                  <TranslateText text="Solicitar consulta" />
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Visual Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-indigo-500/30 rounded-3xl blur-3xl" />
            
            <div className="relative h-[400px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl border border-white/20 p-8 flex flex-col justify-center">
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-cyan-400 rounded-t-3xl" />
              
              {/* Central Icon */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-28 h-28 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-3xl flex items-center justify-center shadow-2xl"
              >
                <Calculator className="w-14 h-14 text-white" />
              </motion.div>

              <h3 className="text-2xl font-bold text-white text-center mb-3"><TranslateText text="Control Total" /></h3>
              <p className="text-blue-200/80 dark:text-blue-300/70 text-center text-lg"><TranslateText text="Finanzas claras, decisiones seguras" /></p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                {[
                  { value: "100%", label: "Precisión" },
                  { value: "24/7", label: "Acceso" },
                  { value: "99%", label: "Satisfacción" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl font-black text-white">{stat.value}</div>
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
