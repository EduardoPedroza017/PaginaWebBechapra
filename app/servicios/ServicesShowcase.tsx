"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import styles from "../css/components/ServicesShowcase.module.css";

export default function ServicesShowcase() {
  return (
    <section className="mt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700">NUESTROS SERVICIOS</h2>
      </div>

      <div className="relative mt-8 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto overflow-visible">
          <div className="relative -ml-6 md:-ml-0">
            <div className="flex items-end gap-6 md:gap-8 overflow-visible py-8">

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="w-64 md:w-72 bg-white rounded-2xl shadow-lg overflow-visible transform -translate-y-6"
              >
                <div className="h-28 rounded-t-2xl overflow-hidden">
                  <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=60&auto=format&fit=crop" alt="Servicio 1" width={600} height={200} className="object-cover w-full h-full" />
                </div>
                <div className="p-6 bg-white rounded-b-2xl">
                  <div className="w-16 h-16 rounded-xl bg-white/80 grid place-items-center shadow-sm">
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2v20" stroke="#1E40AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 7h14" stroke="#1E40AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <h3 className="mt-4 font-semibold text-lg">Capital humano</h3>
                  <p className="mt-2 text-sm text-slate-600">Aumenta la eficiencia de tus procesos y talento.</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="w-64 md:w-72 bg-white rounded-2xl shadow-md overflow-visible -translate-y-3"
              >
                <div className="h-28 rounded-t-2xl overflow-hidden">
                  <Image src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=60&auto=format&fit=crop" alt="Servicio 2" width={600} height={200} className="object-cover w-full h-full" />
                </div>
                <div className="p-6 bg-white rounded-b-2xl">
                  <div className="w-16 h-16 rounded-xl bg-white/80 grid place-items-center shadow-sm">
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12h18" stroke="#1E40AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 3v18" stroke="#1E40AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <h3 className="mt-4 font-semibold text-lg">Servicios especializados</h3>
                  <p className="mt-2 text-sm text-slate-600">Aumenta la eficiencia y resultados de tu negocio.</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.18 }}
                whileHover={{ scale: 1.03, y: -6 }}
                className="w-72 md:w-80 bg-[#0b63d6] rounded-3xl shadow-2xl overflow-visible text-white -translate-y-0"
              >
                <div className="h-32 rounded-t-3xl overflow-hidden">
                  <Image src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=60&auto=format&fit=crop" alt="Servicio destacado" width={800} height={260} className="object-cover w-full h-full" />
                </div>
                <div className="p-6 rounded-b-3xl bg-[#0b63d6]">
                  <div className="w-16 h-16 rounded-xl bg-white/12 grid place-items-center shadow-sm">
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2v20" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 7h14" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <h3 className="mt-4 font-semibold text-lg">Servicios de Impuestos</h3>
                  <p className="mt-2 text-sm text-white/90">Soluciones integrales para el cumplimiento fiscal de tu empresa.</p>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
