"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Sparkles, ArrowRight } from "lucide-react";

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
    <section className="py-24 px-6 bg-white">
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
            className="inline-block px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-4"
          >
            Precios Transparentes
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Elige tu{" "}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              paquete
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
                  ? 'bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 text-white shadow-2xl shadow-orange-500/30 scale-105' 
                  : 'bg-gradient-to-br from-orange-50 via-amber-50/50 to-white border-2 border-orange-100 hover:border-orange-300 shadow-xl'
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 px-4 py-1.5 bg-white rounded-full shadow-lg">
                    <Sparkles className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-bold text-orange-600">Más popular</span>
                  </div>
                </div>
              )}

              {/* Package Name */}
              <h3 className={`text-xl font-bold mb-2 ${pkg.popular ? 'text-white' : 'text-gray-900'}`}>
                {pkg.name}
              </h3>

              {/* Price */}
              <div className={`text-3xl font-black mb-6 ${pkg.popular ? 'text-white' : 'bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent'}`}>
                {pkg.price}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {pkg.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      pkg.popular ? 'bg-white/20' : 'bg-orange-100'
                    }`}>
                      <Check className={`w-3 h-3 ${pkg.popular ? 'text-white' : 'text-orange-600'}`} />
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
                      ? 'bg-white text-orange-600 hover:bg-orange-50' 
                      : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:shadow-lg hover:shadow-orange-500/30'
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
