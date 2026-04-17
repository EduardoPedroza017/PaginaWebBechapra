"use client";


import { motion } from "framer-motion";
import Link from "next/link";
import { Building2, ArrowRight, Sparkles } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";
import { AnimatedHeroBackground } from '@/components/ui/AnimatedHeroBackground';

export default function AboutHero() {
  return (
    <AnimatedHeroBackground gradientClass="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 dark:from-blue-950 dark:via-blue-900 dark:to-indigo-950" orbClass="bg-blue-700/30 dark:bg-blue-900/40" gridOpacity="opacity-10">
      {/* Orbes y Floating Icons personalizados para AboutHero */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -right-32 w-96 h-96 bg-linear-to-br from-blue-700 to-indigo-800 rounded-full blur-3xl opacity-60"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-24 -left-24 w-80 h-80 bg-linear-to-br from-indigo-700 to-blue-800 rounded-full blur-3xl opacity-50"
      />
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-br from-blue-300 via-indigo-300 to-blue-500 dark:from-blue-400 dark:via-indigo-400 dark:to-blue-600 bg-clip-text text-transparent">
          Acerca de <span className="text-blue-400 dark:text-blue-500">Bausen</span>
        </h1>
        <p className="text-lg md:text-xl text-blue-100/90 leading-relaxed mb-10 max-w-2xl">
          Somos un equipo multidisciplinario apasionado por transformar organizaciones y potenciar el talento humano. Nuestra misión es brindar soluciones integrales que impulsen el crecimiento y la innovación en nuestros clientes.
        </p>
      </div>
    </AnimatedHeroBackground>
  );
}
