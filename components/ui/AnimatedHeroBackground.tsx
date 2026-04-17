import { motion } from "framer-motion";
import React from "react";

interface AnimatedHeroBackgroundProps {
  gradientClass?: string;
  orbClass?: string;
  orbAnimation?: any;
  gridOpacity?: string;
  children?: React.ReactNode;
}

/**
 * Fondo animado reutilizable para secciones Hero.
 * Permite personalizar gradiente, orbes y grid pattern.
 */
export const AnimatedHeroBackground: React.FC<AnimatedHeroBackgroundProps> = ({
  gradientClass = "bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900",
  orbClass = "absolute -top-1/3 -right-1/4 w-[700px] h-[700px] bg-gradient-to-br from-blue-400/20 via-indigo-500/15 to-transparent dark:from-blue-600/10 dark:via-indigo-700/8 dark:to-transparent rounded-full blur-3xl",
  orbAnimation = { scale: [1, 1.2, 1], rotate: [0, 90, 0] },
  gridOpacity = "opacity-5",
  children,
}) => (
  <section className={`relative w-screen -ml-[calc(50vw-50%)] min-h-[600px] ${gradientClass} pt-20 pb-32 overflow-hidden`}>
    {/* Fondo animado */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        animate={orbAnimation}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className={orbClass}
      />
      {/* Grid Pattern */}
      <div className={`absolute inset-0 ${gridOpacity}`}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>
    </div>
    {/* Contenido Hero */}
    <div className="relative z-10">
      {children}
    </div>
  </section>
);
