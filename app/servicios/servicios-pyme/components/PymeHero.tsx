import { AnimatedHeroBackground } from '@/components/ui/AnimatedHeroBackground';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { TranslateText } from '@/components/TranslateText';
import { Rocket, TrendingUp, Building2, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
export default function PymeHero() {
  return (
    <AnimatedHeroBackground>
      {/* Floating Icons personalizados para PymeHero */}
      {[Rocket, TrendingUp, Building2].map((Icon, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 5 + i * 2, repeat: Infinity, delay: i }}
          className={`absolute ${
            i === 0 ? 'top-1/4 right-1/4' :
            i === 1 ? 'bottom-1/3 left-1/5' :
            'top-1/3 left-1/3'
          } z-20`}
        >
          <Icon className="w-16 h-16 text-white/15" />
        </motion.div>
      ))}

      <div className="relative max-w-7xl mx-auto px-6 z-10">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/web/servicios/"
            className="group inline-flex items-center gap-2 px-5 py-2 bg-white/10 rounded-full text-white mb-8 hover:bg-white/20 transition"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition" />
            <span className="font-medium"><TranslateText text="Volver a Servicios" /></span>
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white mb-6"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-semibold text-white"><TranslateText text="PYME" /></span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              <TranslateText text="Servicios" />{" "}
              <span className="bg-linear-to-r from-white via-blue-100 to-blue-400 bg-clip-text text-transparent">
                <TranslateText text="PYME" />
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8">
              <TranslateText text="Paquetes pensados para empresas pequeñas y medianas que buscan crecer con soluciones a su medida." />
            </p>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="#contacto"
                className="inline-flex items-center gap-3 px-8 py-4 bg-blue-500 text-white rounded-2xl font-bold text-lg shadow-xl hover:bg-blue-600 transition"
              >
                <TranslateText text="Quiero una propuesta" />
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
            <div className="absolute inset-0 bg-linear-to-r from-white/10 to-blue-400/10 rounded-3xl blur-2xl" />
            <div className="relative h-100 bg-white/10 rounded-3xl border border-white/10 flex flex-col items-center justify-center p-8">
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-blue-200 via-blue-400 to-blue-600 rounded-t-3xl" />

              {/* Central Icon */}
              <motion.div
                animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-28 h-28 mx-auto mb-6 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-lg"
              >
                <Rocket className="w-14 h-14 text-blue-500 dark:text-blue-400" />
              </motion.div>

              <h3 className="text-2xl font-bold text-white text-center mb-2">Impulsa tu PYME</h3>
              <p className="text-white/80 text-center text-lg mb-6"><TranslateText text="Soluciones integrales para crecer sin límites." /></p>

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
                    className="text-center p-3 bg-white/10 rounded-xl"
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
    </AnimatedHeroBackground>
  );
}
