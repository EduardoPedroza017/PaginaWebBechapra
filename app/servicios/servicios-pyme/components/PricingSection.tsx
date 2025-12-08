"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';

interface Package {
  name: string;
  price: string;
  items: string[];
  popular?: boolean;
}

interface PricingSectionProps {
  packages: Package[];
}

export default function PricingSection({ packages }: PricingSectionProps) {
  return (
    <section className="py-24 px-6 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold mb-4"
          >
            <TranslateText text="Precios Transparentes" />
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            <TranslateText text="Elige tu" />{" "}
            <span className="bg-gradient-to-r from-blue-500 to-blue-400 dark:from-blue-400 dark:to-blue-500 bg-clip-text text-transparent">
              <TranslateText text="paquete" />
            </span>
          </h2>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className={`relative rounded-3xl p-8 transition-all duration-500 ${
                pkg.popular 
                  ? 'bg-gradient-to-br from-blue-500 via-blue-400 to-blue-500 dark:from-blue-600 dark:via-blue-500 dark:to-blue-600 text-white shadow-2xl shadow-blue-500/30 dark:shadow-blue-900/30 scale-105' 
                  : 'bg-gradient-to-br from-blue-50 via-blue-50/50 to-white dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 border-2 border-blue-100 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 shadow-xl'
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 px-4 py-1.5 bg-white dark:bg-slate-800 rounded-full shadow-lg">
                    <Sparkles className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400"><TranslateText text="Más popular" /></span>
                  </div>
                </div>
              )}

              {/* Package Name */}
              <h3 className={`text-xl font-bold mb-2 ${pkg.popular ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                <TranslateText text={pkg.name} />
              </h3>

              {/* Price */}
              <div className={`text-3xl font-black mb-6 ${pkg.popular ? 'text-white' : 'bg-gradient-to-r from-blue-500 to-blue-400 dark:from-blue-400 dark:to-blue-500 bg-clip-text text-transparent'}`}>
                <TranslateText text={pkg.price} />
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {pkg.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      pkg.popular ? 'bg-white/20' : 'bg-blue-100'
                    }`}>
                      <Check className={`w-3 h-3 ${pkg.popular ? 'text-white' : 'text-blue-600'}`} />
                    </div>
                    <span className={`text-sm ${pkg.popular ? 'text-white/90' : 'text-gray-600'}`}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="#contacto"
                  className={`w-full py-3.5 rounded-xl font-bold text-center flex items-center justify-center gap-2 transition-all ${
                    pkg.popular 
                      ? 'bg-white text-blue-600 hover:bg-blue-50' 
                      : 'bg-gradient-to-r from-blue-500 to-blue-400 text-white hover:shadow-lg hover:shadow-blue-500/30'
                  }`}
                >
                  Elegir paquete
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
