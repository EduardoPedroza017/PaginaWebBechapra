"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, MouseEvent } from "react";
import { CheckCircle, Sparkles } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';
import Section from "@/app/components/Section";

interface Benefit {
  title: string;
  desc: string;
}

interface BenefitsSectionProps {
  title: string;
  benefits: Benefit[];
  imageSrc: string;
  imageAlt: string;
}

export default function BenefitsSection({
  title,
  benefits,
  imageSrc,
  imageAlt,
}: BenefitsSectionProps) {
  return (
    <Section variant="blue" size="lg">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] lg:aspect-square rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-900/20 border border-slate-200 dark:border-slate-800">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  unoptimized={String(imageSrc).startsWith('http')}
                />
              ) : (
                <div className="w-full h-full bg-slate-100 dark:bg-slate-900" />
              )}
              <div className="absolute inset-0 bg-linear-to-tr from-blue-900/20 to-transparent" />
            </div>
            
            {/* Decorative Elements */}
            <motion.div
              animate={{ rotate: [0, 5, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/10 rounded-full blur-[80px]"
            />
          </motion.div>

          {/* Content Side */}
          <div className="space-y-12">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-blue-100 dark:border-blue-800/50">
                <Sparkles size={14} />
                <TranslateText text="Ventajas competitivas" />
              </span>

              <h2 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.95]">
                <TranslateText text={title} />
              </h2>
            </div>

            <div className="grid gap-6">
              {benefits.map((benefit, i) => (
                <BenefitCard key={benefit.title} benefit={benefit} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function BenefitCard({ benefit, index }: { benefit: Benefit; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { damping: 20, stiffness: 150 });
  const glowY = useSpring(mouseY, { damping: 20, stiffness: 150 });

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      className="group relative"
    >
      <div className="relative bg-white dark:bg-slate-900/80 backdrop-blur-xl rounded-[2rem] p-8 border border-slate-200/60 dark:border-slate-800/50 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden flex items-start gap-6">
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(37, 99, 235, 0.08), transparent 40%)`
            ),
          }}
        />
        
        <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-800 group-hover:scale-110 transition-transform duration-500">
          <CheckCircle size={24} className="text-blue-600 dark:text-blue-400" />
        </div>
        
        <div className="relative z-20">
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
            <TranslateText text={benefit.title} />
          </h3>
          <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            <TranslateText text={benefit.desc} />
          </p>
        </div>
      </div>
    </motion.div>
  );
}
