"use client";

import { motion } from "framer-motion";
import { Award, Trophy } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

export default function AwardsSection() {
  const premios = [
    {
      img: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600&h=400&fit=crop",
      title: "Premio Innovación 2024",
      org: "Tech Awards MX",
      year: "2024",
      color: "from-blue-500 to-blue-600"
    },
    {
      img: "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?w=600&h=400&fit=crop",
      title: "Mejor Startup 2023",
      org: "Emprendedores Unidos",
      year: "2023",
      color: "from-purple-500 to-purple-600"
    },
    {
      img: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?w=600&h=400&fit=crop",
      title: "Excelencia en Servicio",
      org: "Cliente Satisfecho Award",
      year: "2024",
      color: "from-green-500 to-green-600"
    },
    {
      img: "https://images.unsplash.com/photo-1623039405147-547794f92e9e?w=600&h=400&fit=crop",
      title: "Top 10 Empresas",
      org: "Forbes México",
      year: "2023",
      color: "from-red-500 to-red-600"
    },
    {
      img: "https://images.unsplash.com/photo-1586281380614-bb3c44bf5b13?w=600&h=400&fit=crop",
      title: "Sostenibilidad 2024",
      org: "Green Business",
      year: "2024",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      img: "https://images.unsplash.com/photo-1569705460033-cfaa4bf9f822?w=600&h=400&fit=crop",
      title: "Líder en Tecnología",
      org: "Digital Summit",
      year: "2023",
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  return (
    <section id="premios" className="mb-32 relative">
      <AnimatedSection>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl mb-6 shadow-lg"
          >
            <Trophy className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent">
            Reconocimientos que nos Impulsan
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full mx-auto mb-6" />
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
            Nuestro compromiso con la excelencia ha sido reconocido por instituciones líderes en la industria
          </p>
        </div>
      </AnimatedSection>

      {/* Grid de premios con interactividad */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {premios.map((premio, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -12, scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl border border-slate-200"
              >
                {/* Imagen con overlay gradient */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    src={premio.img}
                    alt={premio.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${premio.color} opacity-0 group-hover:opacity-40 transition-opacity duration-300`} />

                  {/* Badge del año */}
                  <div className="absolute top-4 right-4">
                    <div className={`bg-gradient-to-r ${premio.color} text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg`}>
                      {premio.year}
                    </div>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${premio.color} rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300`}>
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {premio.title}
                      </h3>
                      <p className="text-sm text-slate-600 font-medium">{premio.org}</p>
                    </div>
                  </div>

                  {/* Barra de progreso animada */}
                  <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: i * 0.2 }}
                      className={`h-full bg-gradient-to-r ${premio.color}`}
                    />
                  </div>
                </div>

                {/* Hover effect border */}
                <div className={`absolute inset-0 border-2 border-transparent group-hover:border-current opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 pointer-events-none`} />
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
