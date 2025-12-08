"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Award, Star } from "lucide-react";
import { awards } from "./data/homeData";
import { TranslateText } from "@/components/TranslateText";

export default function AwardsSection() {
  const duplicatedAwards = [...awards, ...awards];

  return (
    <div className="relative">
      {/* Decorative elements */}
      <div className="absolute -top-20 left-0 w-72 h-72 rounded-full blur-3xl opacity-30 bg-blue-100 dark:bg-blue-950/30" />
      <div className="absolute -bottom-20 right-0 w-72 h-72 rounded-full blur-3xl opacity-30 bg-blue-100 dark:bg-blue-900/20" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12 relative"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-500"
        >
          <Award className="w-4 h-4" />
          <TranslateText text="Excelencia reconocida" />
        </motion.div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-slate-900 dark:text-white">
          <TranslateText text="Nuestros" />{" "}
          <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent dark:from-blue-500 dark:to-blue-600">
            <TranslateText text="Reconocimientos" />
          </span>
        </h2>

        <p className="text-lg max-w-2xl mx-auto text-slate-600 dark:text-slate-300">
          <TranslateText text="Certificaciones y alianzas que respaldan nuestro compromiso con la excelencia" />
        </p>
      </motion.div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent dark:from-slate-950 dark:to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent dark:from-slate-950 dark:to-transparent" />

        {/* Carousel */}
        <div className="overflow-hidden py-8">
          <motion.div
            animate={{ x: [0, "-50%"] }}
            transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 25, ease: "linear" } }}
            className="flex gap-8 w-fit"
          >
            {duplicatedAwards.map((award, i) => (
              <motion.div
                key={`${award.id}-${i}`}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative rounded-2xl shadow-lg hover:shadow-xl flex flex-col items-center justify-center min-w-[220px] h-[140px] px-6 py-4 border transition-all bg-white border-slate-100 dark:bg-slate-900 dark:border-slate-800"
              >
                {/* Decorative star on hover */}
                <Star className="absolute top-3 right-3 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 dark:text-blue-400" />

                {award.image ? (
                  <Image
                    src={award.image}
                    alt={award.title}
                    width={160}
                    height={80}
                    className="max-w-[160px] h-[80px] object-contain grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-300"
                  />
                ) : (
                  <div className="w-[160px] h-[80px] border-2 border-dashed rounded-xl flex items-center justify-center text-xs font-bold uppercase bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200 text-slate-400 dark:from-slate-800 dark:to-slate-900 dark:border-slate-700 dark:text-slate-500">
                    {award.title || "LOGO"}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom decoration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex justify-center gap-2 mt-8"
      >
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="w-5 h-5 fill-blue-600 text-blue-600 dark:text-blue-500 dark:fill-blue-500"
          />
        ))}
      </motion.div>
    </div>
  );
}
