"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';

interface ServiceHeroProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  backLink?: string;
  backLabel?: string;
  ctaLabel?: string;
  ctaLink?: string;
}

export default function ServiceHero({
  title,
  description,
  imageSrc,
  imageAlt,
  backLink = "/servicios",
  backLabel = "Volver",
  ctaLabel = "Contactar a BAUSEN",
  ctaLink = "#contacto",
}: ServiceHeroProps) {
  return (
    <section
      className="relative w-screen -ml-[calc(50vw-50%)] overflow-hidden pt-16 pb-20"
      style={{
        backgroundColor: "var(--hero-services-from)",
        backgroundImage:
          "radial-gradient(circle at 22% 28%, var(--hero-services-glow-primary) 0%, transparent 36%), radial-gradient(circle at 78% 28%, var(--hero-services-glow-secondary) 0%, transparent 30%), linear-gradient(90deg, var(--hero-services-from) 0%, var(--hero-services-via) 52%, var(--hero-services-to) 100%)",
      }}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1)_0%,transparent_40%),radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.08)_0%,transparent_40%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-[600px]"
          >
            {/* Back Link */}
            <Link
              href={backLink}
              className="group mb-6 inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/16 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/24"
            >
              <ArrowLeft
                size={18}
                className="group-hover:-translate-x-1 transition-transform duration-300"
              />
              <TranslateText text={backLabel} />
            </Link>

            {/* Title */}
            <h1 className="mb-4 text-4xl font-extrabold leading-[1.1] tracking-tight text-white md:text-5xl">
              <TranslateText text={title} />
            </h1>

            {/* Description */}
            <p className="text-lg text-white/85 leading-relaxed mb-8 max-w-[540px]">
              <TranslateText text={description} />
            </p>

            {/* CTA */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={ctaLink}
                className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white px-7 py-3.5 font-bold text-blue-700 shadow-xl shadow-blue-950/20 transition-all duration-300 hover:shadow-2xl"
              >
                <TranslateText text={ctaLabel} />
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:flex justify-end items-center"
          >
            <div className="relative h-[340px] w-full max-w-[580px] overflow-hidden rounded-2xl border border-white/18 shadow-2xl shadow-blue-950/30">
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                    priority
                    // If image is hosted on backend (e.g. `${process.env.NEXT_PUBLIC_API_URL}/uploads/...`), allow unoptimized
                    unoptimized={String(imageSrc).startsWith('http')}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-800/40 to-slate-900 flex items-center justify-center">
                    <svg className="w-20 h-20 text-white/60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="5" width="18" height="14" rx="2" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
                      <path d="M8 10h.01" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M3 19l4-4 3 3 5-5 6 6" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-transparent" />
              </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
