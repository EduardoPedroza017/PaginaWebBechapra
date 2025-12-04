"use client";

import { motion } from "framer-motion";
import { Calendar, Trophy, TrendingUp, Users, Clock, Award } from "lucide-react";

const timelineData = [
  { year: "2009", event: "Fundación de Bechapra", icon: Calendar },
  { year: "2012", event: "Expansión nacional y nuevos servicios", icon: TrendingUp },
  { year: "2016", event: "Primeros 100 clientes y certificación ISO", icon: Award },
  { year: "2019", event: 'Reconocimiento "Empresa Innovadora"', icon: Trophy },
  { year: "2022", event: "Alianza internacional y 500+ empresas", icon: Users },
];

const statsData = [
  { value: "500+", label: "Empresas atendidas", icon: Users },
  { value: "15+", label: "Años de experiencia", icon: Clock },
  { value: "95%", label: "Satisfacción de clientes", icon: Trophy },
  { value: "8", label: "Servicios especializados", icon: Award },
];

export default function HistorySection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-gray-50 to-blue-50/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-4">
            <Calendar size={16} />
            Nuestra Trayectoria
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Historia y{" "}
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              Logros
            </span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative mb-20">
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-indigo-400 rounded-full transform -translate-y-1/2 hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {timelineData.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative"
                >
                  {/* Connector Dot */}
                  <div className="hidden md:flex absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10" />

                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center h-full"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon size={24} className="text-blue-600" />
                    </div>
                    <div className="text-3xl font-black text-blue-600 mb-2">
                      {item.year}
                    </div>
                    <p className="text-gray-600 text-sm font-medium leading-relaxed">
                      {item.event}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {statsData.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center group hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={22} className="text-white" />
                </div>
                <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
