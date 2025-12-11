"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, MessageSquare } from "lucide-react";
import ContactForm from "./ContactForm";
import { TranslateText } from "@/components/TranslateText";

const contactInfo = [
  { icon: Phone, label: "Teléfono", value: "+52 (442) 123 4567" },
  { icon: Mail, label: "Email", value: "contacto@bechapra.com" },
  { icon: MapPin, label: "Ubicación", value: "Querétaro, México" },
  { icon: Clock, label: "Horario", value: "Lun - Vie: 9:00 - 18:00" },
];

interface Branch {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  locationUrl: string;
  coordinates?: { lat: number; lng: number };
  contact?: { phone?: string; email?: string };
  isActive: boolean;
}


export default function ContactSection() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedState, setSelectedState] = useState<string>("");

  useEffect(() => {
    async function fetchBranches() {
      try {
        const res = await fetch("http://localhost:5000/api/branches?active=true");
        const data = await res.json();
        //console.log("Sucursales desde API:", data);
        if (Array.isArray(data) && data.length > 0) {
          setBranches(data);
          // Selecciona el primer estado único y la primera sucursal de ese estado
          const firstState = data[0].state;
          setSelectedState(firstState);
          setSelectedBranch(data.find((b: Branch) => b.state === firstState) || data[0]);
        }
      } catch (error) {
        //console.error("Error fetching branches:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBranches();
  }, []);

  // Estados únicos
  const uniqueStates = Array.from(new Set(branches.map((b) => b.state)));
  console.log("Estados únicos:", uniqueStates);

  // Cambia sucursal al cambiar estado
  const handleStateClick = (state: string) => {
    setSelectedState(state);
    const branch = branches.find((b) => b.state === state);
    if (branch) setSelectedBranch(branch);
  };

  const mapSrc = selectedBranch?.coordinates 
    ? `https://www.google.com/maps?q=${selectedBranch.coordinates.lat},${selectedBranch.coordinates.lng}&z=15&output=embed`
    : selectedBranch?.address 
      ? `https://www.google.com/maps?q=${encodeURIComponent(selectedBranch.address)}&output=embed`
      : "";

  return (
    <div className="relative">
      {/* Background decorations */}
      <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-50 bg-blue-50 dark:bg-blue-950/30" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-50 bg-blue-100 dark:bg-blue-900/20" />

      <div className="relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-500"
          >
            <MessageSquare className="w-4 h-4" />
            <TranslateText text="¿Listo para conectar?" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-slate-900 dark:text-white">
            <TranslateText text="Hablemos sobre" />{" "}
            <span className="bg-linear-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent dark:from-blue-500 dark:to-blue-600">
              <TranslateText text="tu proyecto" />
            </span>
          </h2>

          <p className="text-lg max-w-2xl mx-auto text-slate-600 dark:text-slate-300">
            <TranslateText text="Cuéntanos tus ideas, necesidades o dudas y nuestro equipo te contactará a la brevedad. ¡Estamos aquí para ayudarte a transformar tu operación!" />
          </p>
        </motion.div>


        <div className="max-w-5xl mx-auto space-y-10 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="rounded-3xl shadow-xl p-8 md:p-10 border bg-white border-slate-100 dark:bg-slate-900 dark:border-slate-800"
          >
            <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white"><TranslateText text="Envíanos un mensaje" /></h3>
            <p className="mb-8 text-slate-600 dark:text-slate-300"><TranslateText text="Completa el formulario y te contactaremos pronto." /></p>
            <ContactForm />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="grid gap-8 lg:grid-cols-5 lg:gap-12"
          >
            <div className="lg:col-span-2">
              <div className="bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white dark:from-slate-800 dark:via-blue-950 dark:to-slate-900">
                <h3 className="text-xl font-bold mb-6"><TranslateText text="Información de Contacto" /></h3>

                <div className="space-y-6">
                  {contactInfo.map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-blue-500 dark:text-blue-400"><TranslateText text={item.label} /></p>
                        <p className="text-white font-semibold">
                          {item.label === "Ubicación" && selectedBranch
                            ? `${selectedBranch.name} · ${selectedBranch.address}`
                            : item.value}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-sm mb-4 text-blue-500 dark:text-blue-400"><TranslateText text="Síguenos en redes" /></p>
                  <div className="flex gap-3">
                    {["facebook", "instagram", "linkedin", "twitter"].map((social) => (
                      <motion.a
                        key={social}
                        href="#"
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                      >
                        <span className="text-xs text-white uppercase font-bold">{social[0]}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="rounded-[45px] bg-linear-to-r from-blue-700/90 to-blue-800/90 p-1 shadow-2xl">
                <div className="flex flex-col rounded-[43px] bg-slate-50 p-8 md:p-10 gap-8 lg:flex-row lg:items-center lg:gap-14">
                  <div className="lg:grid lg:grid-cols-[1fr_minmax(300px,1fr)] lg:items-start gap-8">
                      <div className="flex flex-col gap-4 text-sm">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-500">Contáctanos</p>
                        {loading ? (
                          <p className="text-slate-500">Cargando sucursales...</p>
                        ) : branches.length === 0 ? (
                          <p className="text-slate-500">No hay sucursales disponibles</p>
                        ) : (
                          <>
                            <div className="flex flex-wrap gap-3">
                              {uniqueStates.map((state) => (
                                <button
                                  key={state}
                                  type="button"
                                  onClick={() => handleStateClick(state)}
                                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                                    selectedState === state
                                      ? "border-white bg-white text-blue-700 shadow-lg"
                                      : "border-blue-300 bg-blue-50/50 text-blue-600 hover:bg-blue-100"
                                  }`}
                                >
                                  {state}
                                </button>
                              ))}
                            </div>
                            {selectedBranch && (
                              <div className="text-sm text-slate-500">
                                <p className="font-semibold text-slate-900">{selectedBranch.name}</p>
                                <p>{selectedBranch.address}, {selectedBranch.city}, {selectedBranch.state}</p>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    <div className="relative">
                      <div className="overflow-hidden rounded-3xl border border-white/60 bg-white shadow-xl">
                        {mapSrc ? (
                          <iframe
                            title="Ubicación Bechapra"
                            src={mapSrc}
                            width="100%"
                            height="320"
                            loading="lazy"
                            className="border-0"
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
