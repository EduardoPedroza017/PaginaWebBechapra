"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, MessageSquare } from "lucide-react";
import ContactForm from "./ContactForm";
import { TranslateText } from "@/components/TranslateText";
import { config } from "@/lib/config/config"; // Configuración centralizada

const contactInfo = [
  { icon: Phone, label: "Teléfono", value: "+52 (442) 123 4567" },
  { icon: Mail, label: "Email", value: "contacto@bausen.com" },
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

interface SocialNetwork {
  name: string;
  url: string;
  icon: string;
}

export default function ContactSection() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string>("");
  const [socialNetworks] = useState<SocialNetwork[]>([
    { name: "Facebook", url: "https://facebook.com/bausen", icon: "F" },
    { name: "Instagram", url: "https://instagram.com/bausen", icon: "I" },
    { name: "LinkedIn", url: "https://linkedin.com/company/bausen", icon: "L" },
    { name: "Twitter", url: "https://twitter.com/bausen", icon: "X" },
  ]);

  // Fetch branches con configuración centralizada
  const fetchBranches = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/branches?active=true', {
        headers: {
          'Cache-Control': 'max-age=3600', // Cache de 1 hora
        }
      });

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        const activeBranches = data.filter((branch: Branch) => branch.isActive);
        setBranches(activeBranches);

        if (activeBranches.length > 0) {
          const firstState = activeBranches[0].state;
          setSelectedState(firstState);
          const firstBranchInState = activeBranches.find((b: Branch) => b.state === firstState) || activeBranches[0];
          setSelectedBranch(firstBranchInState);
        }
      } else {
        setError("No se encontraron sucursales activas");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al cargar sucursales";
      setError(errorMessage);
      console.error("Error fetching branches via API proxy:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBranches();
  }, [fetchBranches]);

  // Estados únicos
  const uniqueStates = Array.from(new Set(branches.map((b) => b.state))).sort();

  // Cambia sucursal al cambiar estado
  const handleStateClick = useCallback((state: string) => {
    setSelectedState(state);
    const branch = branches.find((b) => b.state === state);
    if (branch) {
      setSelectedBranch(branch);
    }
  }, [branches]);

  // Generar mapa URL
  // Example fallback branch when there are no active branches
  const exampleBranch: Branch = {
    id: 'example',
    name: 'BAUSEN (Ejemplo)',
    description: 'Sucursal de ejemplo',
    address: 'Av. Paseo de la Reforma 505',
    city: 'Ciudad de México',
    state: 'CDMX',
    locationUrl: 'https://www.google.com/maps?q=19.4326,-99.1332&z=15&output=embed',
    coordinates: { lat: 19.4326, lng: -99.1332 },
    contact: { phone: '+52 55 1234 5678', email: 'contacto@bausen.com' },
    isActive: false,
  };

  const effectiveBranch = selectedBranch || (branches.length === 0 ? exampleBranch : null);

  const mapSrc = effectiveBranch?.coordinates
    ? `https://www.google.com/maps?q=${effectiveBranch.coordinates.lat},${effectiveBranch.coordinates.lng}&z=15&output=embed`
    : effectiveBranch?.address
      ? `https://www.google.com/maps?q=${encodeURIComponent(effectiveBranch.address)}&output=embed`
      : "";

  // Formatear dirección
  const formatAddress = useCallback((branch: Branch | null) => {
    if (!branch) return "";
    return `${branch.address}, ${branch.city}, ${branch.state}`;
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-50 bg-blue-50 dark:bg-blue-950/30" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-50 bg-blue-100 dark:bg-blue-900/20" />

      <div className="relative py-16 md:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-3xl mx-auto mb-12 px-4"
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

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-slate-900 dark:text-white">
            <TranslateText text="Hablemos sobre" />{" "}
            <span className="bg-linear-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent dark:from-blue-500 dark:to-blue-600">
              <TranslateText text="tu proyecto" />
            </span>
          </h1>

          <p className="text-lg max-w-2xl mx-auto text-slate-600 dark:text-slate-300">
            <TranslateText text="Cuéntanos tus ideas, necesidades o dudas y nuestro equipo te contactará a la brevedad. ¡Estamos aquí para ayudarte a transformar tu operación!" />
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-12 px-4 sm:px-6">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="rounded-3xl shadow-xl p-6 md:p-8 lg:p-10 border bg-white border-slate-100 dark:bg-slate-900 dark:border-slate-800"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">
                <TranslateText text="Envíanos un mensaje" />
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                <TranslateText text="Completa el formulario y te contactaremos pronto." />
              </p>
            </div>
            <ContactForm />
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="grid gap-8 lg:grid-cols-5"
          >
            {/* Contact Information */}
            <div className="lg:col-span-2">
              <div className="bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white dark:from-slate-800 dark:via-blue-950 dark:to-slate-900 h-full">
                <h2 className="text-xl font-bold mb-6">
                  <TranslateText text="Información de Contacto" />
                </h2>

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
                      <div 
                        className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0"
                        aria-hidden="true"
                      >
                        <item.icon className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-blue-500 dark:text-blue-400">
                          <TranslateText text={item.label} />
                        </p>
                        <p className="text-white font-semibold">
                          {item.label === "Ubicación" && selectedBranch
                            ? `${selectedBranch.name} · ${formatAddress(selectedBranch)}`
                            : item.value}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Social Networks */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-sm mb-4 text-blue-500 dark:text-blue-400">
                    <TranslateText text="Síguenos en redes" />
                  </p>
                  <div className="flex gap-3">
                    {socialNetworks.map((social) => (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                        aria-label={`${social.name} de BAUSEN`}
                      >
                        <span className="text-xs text-white uppercase font-bold">{social.icon}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="lg:col-span-3">
              <div className="rounded-3xl bg-linear-to-r from-blue-700/90 to-blue-800/90 p-1 shadow-2xl h-full">
                <div className="rounded-[2rem] bg-slate-50 dark:bg-slate-900 p-6 md:p-8 h-full">
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-blue-500 mb-4">
                        <TranslateText text="Nuestras ubicaciones" />
                      </p>
                      
                      {loading ? (
                        <div className="flex items-center gap-3">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600" />
                          <p className="text-slate-500">
                            <TranslateText text="Cargando sucursales..." />
                          </p>
                        </div>
                      ) : error ? (
                        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                          <p className="text-red-700 dark:text-red-400">
                            <TranslateText text={error} />
                          </p>
                          <button
                            onClick={fetchBranches}
                            className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            <TranslateText text="Reintentar" />
                          </button>
                        </div>
                      ) : branches.length === 0 ? (
                        // Show an example branch instead of empty/error message
                        <div className="mb-6 p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                          <h3 className="font-bold text-slate-900 dark:text-white mb-2">{exampleBranch.name}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-300">{`${exampleBranch.address}, ${exampleBranch.city}, ${exampleBranch.state}`}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{exampleBranch.description}</p>
                        </div>
                      ) : (
                        <>
                          {/* State Filters */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {uniqueStates.map((state) => (
                              <button
                                key={state}
                                type="button"
                                onClick={() => handleStateClick(state)}
                                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                                  selectedState === state
                                    ? "border-white bg-white text-blue-700 shadow-lg"
                                    : "border-blue-300 bg-blue-50/50 text-blue-600 hover:bg-blue-100 dark:border-blue-700 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/50"
                                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                aria-pressed={selectedState === state}
                              >
                                {state}
                              </button>
                            ))}
                          </div>

                          {/* Selected Branch Info */}
                          {selectedBranch && (
                            <div className="mb-6 p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                              <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                                {selectedBranch.name}
                              </h3>
                              <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                                {formatAddress(selectedBranch)}
                              </p>
                              {selectedBranch.description && (
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                  {selectedBranch.description}
                                </p>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    {/* Map */}
                    <div className="relative rounded-2xl overflow-hidden border border-white/30 shadow-xl bg-white">
                      {mapSrc ? (
                        <iframe
                          title={`Ubicación de ${selectedBranch?.name || 'BAUSEN'}`}
                          src={mapSrc}
                          width="100%"
                          height="320"
                          loading="lazy"
                          className="border-0"
                          allowFullScreen
                          referrerPolicy="no-referrer-when-downgrade"
                          aria-label="Mapa interactivo de ubicación"
                        />
                      ) : (
                        <div className="h-80 flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                          <p className="text-slate-500 dark:text-slate-400">
                            <TranslateText text="Mapa no disponible" />
                          </p>
                        </div>
                      )}
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