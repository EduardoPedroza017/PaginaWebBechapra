"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Quote, Star, ArrowUpRight } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";

const testimonials = [
  {
    nombre: "María López",
    empresa: "Grupo Alfa",
    texto:
      "Bechapra nos ayudó a transformar nuestra cultura organizacional y optimizar procesos clave. ¡Resultados tangibles en meses!",
    resultado: "Reducción del 40% en rotación anual.",
    foto: "/imagen/icon/CapitalHumano_IconLight_Azul@2x.png",
    rating: 5,
  },
  {
    nombre: "Carlos Méndez",
    empresa: "Finanzas XYZ",
    texto:
      "El equipo de Bechapra es profesional, cercano y siempre proactivo. Los recomendamos ampliamente.",
    resultado: "Ahorro de 120 horas/mes.",
    foto: "/imagen/icon/Servicios Administrativos_IconLight_Azul@2x.png",
    rating: 5,
  },
  {
    nombre: "Ana Torres",
    empresa: "TechNova",
    texto:
      "Gracias a su consultoría, logramos una integración exitosa tras una fusión compleja.",
    resultado: "Transición sin conflictos y aumento de satisfacción.",
    foto: "/imagen/icon/ServiciosdeImpuestos_IconLight_Azul@2x.png",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 px-6 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold mb-4">
            <Star size={16} />
            <TranslateText text="Casos de Éxito" />
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            <TranslateText text="Historias de" />{" "}
            <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
              <TranslateText text="Clientes" />
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
            <TranslateText text="Descubre cómo hemos ayudado a empresas como la tuya a alcanzar sus objetivos." />
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.nombre}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group"
            >
              <div className="relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
                {/* Quote Icon */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Quote size={20} className="text-white" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-6 pt-2">
                  {[...Array(item.rating)].map((_, j) => (
                    <Star
                      key={j}
                      size={18}
                      className="text-blue-400 fill-blue-400"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-6 flex-grow italic">
                  &ldquo;<TranslateText text={item.texto} />&rdquo;
                </p>

                {/* Result Badge */}
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-100 dark:border-green-800 mb-6">
                  <ArrowUpRight size={16} className="text-green-600 dark:text-green-400" />
                  <span className="text-green-700 dark:text-green-400 font-semibold text-sm">
                    <TranslateText text={item.resultado} />
                  </span>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-slate-700">
                  <div className="relative w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 rounded-2xl flex items-center justify-center p-2">
                    <Image
                      src={item.foto}
                      alt={item.nombre}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">{item.nombre}</div>
                    <div className="text-gray-500 dark:text-slate-400 text-sm">{item.empresa}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
