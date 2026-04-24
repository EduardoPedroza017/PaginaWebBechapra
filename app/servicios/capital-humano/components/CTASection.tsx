"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';
import Section from "@/app/components/Section";

interface CTASectionProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
}

export default function CTASection({
  title,
  subtitle,
  imageSrc,
  imageAlt,
}: CTASectionProps) {
  return (
    <Section variant="blue" size="md">
      <div className="bg-slate-950 rounded-[3rem] p-10 lg:p-20 relative overflow-hidden shadow-2xl shadow-blue-900/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
        
        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center text-left">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-full">
              <Sparkles size={14} />
              <TranslateText text="Próximo Paso" />
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tighter leading-tight">
              <TranslateText text={title} />
            </h2>
            
            <p className="text-xl text-slate-400 font-medium leading-relaxed">
              <TranslateText text={subtitle} />
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 pt-6">
              <Link
                href="#contacto"
                className="px-10 py-5 bg-blue-700 text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl hover:bg-blue-600 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 min-h-[44px] min-w-[44px]"
                aria-label="Comenzar Ahora"
              >
                <TranslateText text="Comenzar Ahora" />
                <ArrowRight size={22} aria-label="Flecha decorativa" />
              </Link>
              <Link
                href="/acerca-de"
                className="px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center"
              >
                <TranslateText text="Nuestra Filosofía" />
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover opacity-60"
                  unoptimized={String(imageSrc).startsWith('http')}
                />
              ) : (
                <div className="w-full h-full bg-slate-900" />
              )}
              <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
