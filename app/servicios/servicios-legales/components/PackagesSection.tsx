"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

interface Package {
  name: string;
  price: string;
  desc: string;
  features?: string[];
  popular?: boolean;
}

interface PackagesSectionProps {
  packages: Package[];
}

export default function PackagesSection({ packages }: PackagesSectionProps) {
  return (
    <section className="relative w-screen -ml-[calc(50vw-50%)] py-24 px-6 bg-gradient-to-br from-violet-50 via-purple-50/50 to-slate-50 overflow-hidden">
      {/* Decorative */}
      <div className="absolute -top-20 -right-20 w-56 h-56 bg-gradient-to-br from-violet-200 to-purple-200 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-gradient-to-tl from-amber-200 to-violet-200 rounded-full blur-3xl opacity-40" />

      <div className="relative max-w-7xl mx-auto">
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
            className="inline-block px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-semibold mb-4"
          >
            Planes y Precios
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Paquetes y{" "}
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              modalidades
            </span>
          </h2>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`relative bg-white rounded-3xl p-8 shadow-xl border-2 transition-all duration-500 cursor-pointer overflow-hidden ${
                pkg.popular 
                  ? 'border-violet-400 shadow-violet-500/20' 
                  : 'border-violet-100 hover:border-violet-300'
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full">
                    <Sparkles className="w-3 h-3 text-white" />
                    <span className="text-xs font-bold text-white">Popular</span>
                  </div>
                </div>
              )}

              {/* Top Accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-3xl ${
                pkg.popular 
                  ? 'bg-gradient-to-r from-violet-500 via-purple-500 to-amber-500' 
                  : 'bg-gradient-to-r from-violet-400 to-purple-400'
              }`} />

              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{pkg.name}</h3>
                <div className="text-3xl font-black bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  {pkg.price}
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">{pkg.desc}</p>

              {/* Features */}
              {pkg.features && (
                <ul className="space-y-3">
                  {pkg.features.map((feature, fi) => (
                    <li key={fi} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-gradient-to-br from-violet-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-400/0 to-purple-400/0 group-hover:from-violet-400/5 group-hover:to-purple-400/5 rounded-3xl transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
