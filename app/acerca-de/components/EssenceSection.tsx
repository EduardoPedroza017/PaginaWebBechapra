"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Target, Eye, Heart, Sparkles } from "lucide-react";

interface EssenceData {
  mision: string;
  vision: string;
  valores: string;
}

const defaultEssence: EssenceData = {
  mision:
    "Impulsar el crecimiento y éxito de las organizaciones a través de soluciones integrales en Capital Humano, Desarrollo Organizacional y Management Services.",
  vision:
    "Ser la empresa líder en soluciones empresariales, reconocida por nuestra excelencia, innovación y compromiso con el éxito de nuestros clientes.",
  valores:
    "Integridad, transparencia, compromiso, innovación y pasión por el éxito de nuestros clientes son nuestros pilares fundamentales.",
};

const essenceItems = [
  {
    key: "mision" as const,
    title: "Misión",
    icon: Target,
    gradient: "from-blue-600 to-indigo-600",
  },
  {
    key: "vision" as const,
    title: "Visión",
    icon: Eye,
    gradient: "from-indigo-600 to-purple-600",
    featured: true,
  },
  {
    key: "valores" as const,
    title: "Valores",
    icon: Heart,
    gradient: "from-purple-600 to-pink-600",
  },
];

export default function EssenceSection() {
  const [essence, setEssence] = useState<EssenceData | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/essence")
      .then((res) => res.json())
      .then((data) => setEssence(data))
      .catch(() => setEssence(null));
  }, []);

  const data = essence || defaultEssence;

  return (
    <section id="esencia" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            <Sparkles size={16} />
            Lo que nos define
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Nuestra{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Esencia
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Los pilares fundamentales que guían cada decisión y acción en
            Bechapra.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {essenceItems.map((item, i) => {
            const Icon = item.icon;
            const content = data[item.key];

            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`group relative rounded-3xl p-8 transition-all duration-500 hover:-translate-y-3 ${
                  item.featured
                    ? "bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white shadow-2xl shadow-blue-900/30"
                    : "bg-gradient-to-br from-gray-50 to-white border border-gray-100 shadow-lg hover:shadow-xl"
                }`}
              >
                {/* Top Accent */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 rounded-t-3xl bg-gradient-to-r ${item.gradient}`}
                />

                {/* Decorative Background */}
                {item.featured && (
                  <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                    <motion.div
                      animate={{ opacity: [0.1, 0.2, 0.1] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute -top-20 -right-20 w-40 h-40 bg-amber-400/20 rounded-full blur-3xl"
                    />
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                    item.featured
                      ? "bg-white/15 border border-white/20"
                      : "bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100"
                  }`}
                >
                  <Icon
                    size={28}
                    className={item.featured ? "text-white" : "text-blue-600"}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3
                    className={`text-2xl font-bold mb-4 ${
                      item.featured ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`leading-relaxed ${
                      item.featured ? "text-blue-100/90" : "text-gray-600"
                    }`}
                  >
                    {content}
                  </p>
                </div>

                {/* Hover Glow */}
                {!item.featured && (
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/5 group-hover:to-indigo-500/5 transition-all duration-500 pointer-events-none" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
