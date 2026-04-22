"use client";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { TranslateText } from "./TranslateText";

interface SubpageHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  variant?: "default" | "servicesBlue";
}

export default function SubpageHero({
  title,
  subtitle,
  badge,
  variant = "default",
}: SubpageHeroProps) {
  const isServicesBlue = variant === "servicesBlue";
  const servicesBlueGradient = "linear-gradient(90deg, var(--hero-services-from), var(--hero-services-via), var(--hero-services-to))";
  const servicesBlueGlow =
    "radial-gradient(circle at 30% 40%, var(--hero-services-glow-primary) 0%, transparent 40%), radial-gradient(circle at 70% 60%, var(--hero-services-glow-secondary) 0%, transparent 40%)";
  const servicesBlueStyle = isServicesBlue
    ? {
        backgroundColor: "var(--hero-services-from)",
        background: servicesBlueGradient,
      }
    : undefined;

  return (
    <section
      className={`relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden ${
        isServicesBlue
          ? ""
          : "bg-linear-to-br from-blue-950 via-blue-900 to-indigo-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900"
      }`}
      style={servicesBlueStyle}
    >
      {/* Background Parallax Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {isServicesBlue ? (
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: "transparent",
              backgroundImage: servicesBlueGlow,
            }}
          />
        ) : (
          <>
            <div className="absolute top-0 right-0 w-150 h-150 bg-blue-600/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-100 h-100 bg-blue-900/20 rounded-full blur-[100px]" />
          </>
        )}
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      </div>

      {/* Overlay to ensure legibility */}
      <div className="absolute inset-0 bg-black/10 dark:hidden pointer-events-none z-10" />

      <div className="relative z-30 max-w-7xl 2xl:max-w-360 mx-auto px-6 lg:px-8">
        <div className="max-w-3xl">
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-8 ${
                isServicesBlue
                  ? "bg-white/10 border border-white/20 text-white"
                  : "bg-blue-500/10 border border-blue-500/20 text-blue-400"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <TranslateText text={badge} />
            </motion.div>
          )}

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8"
          >
            <TranslateText text={title} />
          </motion.h1>

          {subtitle && (
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-xl leading-relaxed font-medium ${
                isServicesBlue ? "text-white/85" : "text-slate-400"
              }`}
            >
              <TranslateText text={subtitle} />
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
