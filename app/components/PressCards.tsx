"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, ArrowRight, Loader2, Newspaper } from "lucide-react";

interface PressItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  link?: string;
}

export default function PressCards() {
  const [press, setPress] = useState<PressItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/press")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort(
          (a: PressItem, b: PressItem) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setPress(sorted.slice(0, 3));
      })
      .catch(() => setPress([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <span className="inline-flex items-center gap-2 text-blue-700 bg-blue-100 font-semibold text-sm px-4 py-2 rounded-full mb-4">
          <Newspaper className="w-4 h-4" />
          Sala de prensa
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Comunicados de Prensa
        </h2>
        <p className="text-lg text-slate-600 max-w-xl mx-auto">
          Nuestros anuncios oficiales, reconocimientos y apariciones en medios
        </p>
      </motion.div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        </div>
      ) : press.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl shadow-sm">
          <Newspaper className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 text-lg">No hay comunicados disponibles</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {press.map((item, i) => (
            <Link key={item.id} href={`/prensa/${item.id}`}>
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative h-full p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 cursor-pointer"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-b-full" />

                <div className="flex items-center gap-2 mb-5 text-blue-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {new Date(item.date).toLocaleDateString("es-MX", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-slate-500 leading-relaxed mb-6 line-clamp-3">
                  {item.excerpt}
                </p>

                <span className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 group-hover:gap-3 transition-all">
                  Leer comunicado
                  <ArrowRight className="w-4 h-4" />
                </span>
              </motion.article>
            </Link>
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center mt-12"
      >
        <Link
          href="/prensa"
          className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20"
        >
          Ver todos los comunicados
          <ArrowRight className="w-5 h-5" />
        </Link>
      </motion.div>
    </section>
  );
}

