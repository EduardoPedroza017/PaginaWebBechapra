"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight, Trophy } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";

interface SpotlightCTAProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  primaryLink?: string;
  primaryLabel?: string;
  secondaryLink?: string;
  secondaryLabel?: string;
  theme?: "dark" | "blue";
}

export default function SpotlightCTA({
  eyebrow = "Impulso Estrategico",
  title,
  subtitle,
  imageSrc,
  imageAlt,
  primaryLink = "#contacto",
  primaryLabel = "Agendar ahora",
  secondaryLink = "/acerca-de",
  secondaryLabel = "Conocer mas",
  theme = "dark",
}: SpotlightCTAProps) {
  const isBlue = theme === "blue";
  
  // Usamos variables globales para unificar el comportamiento con el tema activo
  const sectionBackground = isBlue
    ? "var(--color-accent)" // Azul corporativo
    : "var(--color-bg-secondary)"; // Fondo secundario
  
  const accentStripe = "rgba(255,255,255,0.1)"; 
  const secondaryStripe = "rgba(255,255,255,0.06)";

  return (
    <section
      className="relative w-screen -ml-[calc(50vw-50%)] overflow-hidden py-20 md:py-24"
      style={{
        background: sectionBackground,
      }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 18, 0], y: [0, -14, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-20 top-0 h-[120%] w-72 rotate-12"
          style={{ background: `linear-gradient(180deg, transparent 0%, ${accentStripe} 50%, transparent 100%)` }}
        />
        <motion.div
          animate={{ x: [0, -24, 0], y: [0, 12, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-10 top-0 h-[120%] w-80 -rotate-12"
          style={{ background: `linear-gradient(180deg, transparent 0%, ${secondaryStripe} 50%, transparent 100%)` }}
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.16, 0.24, 0.16] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-24 -right-10 h-64 w-64 rounded-full blur-[110px] bg-[var(--color-accent)]/20"
        />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, var(--color-text) 1px, transparent 0)",
            backgroundSize: "36px 36px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl 2xl:max-w-[1440px] mx-auto px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] backdrop-blur-md ${isBlue ? "border-white/20 bg-white/10 text-white" : "border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)]"}`}>
              <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
              <TranslateText text={eyebrow} />
            </div>

            <h2 className={`mt-6 max-w-xl text-4xl font-black leading-[0.95] tracking-tight md:text-6xl ${isBlue ? "text-white" : "text-[var(--color-text)]"}`}>
              <TranslateText text={title} />
            </h2>

            <p className={`mt-6 max-w-2xl text-lg leading-relaxed md:text-[1.35rem] ${isBlue ? "text-slate-200" : "text-[var(--color-text-muted)]"}`}>
              <TranslateText text={subtitle} />
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href={primaryLink}
                className={`inline-flex items-center justify-center gap-3 rounded-2xl px-8 py-4 font-black transition-all duration-300 hover:-translate-y-0.5 ${isBlue ? "bg-white text-[var(--color-accent)] hover:bg-slate-100" : "bg-[var(--color-accent)] text-white hover:opacity-90"}`}
              >
                <Calendar size={18} />
                <TranslateText text={primaryLabel} />
              </Link>
              <Link
                href={secondaryLink}
                className={`inline-flex items-center justify-center gap-3 rounded-2xl border px-8 py-4 font-black transition-all duration-300 hover:-translate-y-0.5 ${isBlue ? "border-white/30 text-white hover:bg-white/10" : "border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white"}`}
              >
                {secondaryLabel.toLowerCase().includes("caso") ? <Trophy size={18} /> : <ArrowRight size={18} />}
                <TranslateText text={secondaryLabel} />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 0.6, 0] }}
              transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
              className={`absolute -inset-6 rounded-[2.5rem] blur-3xl ${isBlue ? "bg-white/10" : "bg-blue-600/10"}`}
            />
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-black/30 backdrop-blur-md"
            >
              <div className="relative aspect-[16/10]">
                <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/50 via-transparent to-blue-600/10" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
