"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import SpotlightCTA from "@/app/components/SpotlightCTA";
import { Phone, Mail, ArrowLeft, Calendar, Briefcase, GraduationCap, User, Globe, Award, Building } from "lucide-react";
import axios from "axios";

interface BoardMember {
  id: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno?: string;
  puesto: string;
  descripcion?: string;
  biografia?: string;
  foto?: string;
  foto_url?: string;
  email?: string;
  telefono?: string;
  edad?: number;
  carrera_estudiada?: string;
  linkedin?: string;
  activo: boolean;
}

export default function ProfilePage() {
  const params = useParams();
  const slug = params.slug as string;

  const [member, setMember] = useState<BoardMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const generateSlug = (m: BoardMember) =>
    `${m.nombre} ${m.apellido_paterno} ${m.apellido_materno || ""}`
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/board-members`);
        const foundMember = response.data.find((m: BoardMember) => generateSlug(m) === slug);
        if (foundMember) setMember(foundMember);
        else setError("Perfil no encontrado");
      } catch (err) {
        console.error("Error fetching member:", err);
        setError("Error al cargar el perfil");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchMember();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-white to-blue-50 dark:from-gray-900 dark:to-slate-900/10">
        <div className="relative">
          <div className="mb-6 h-20 w-20 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600 dark:border-blue-800/50 dark:border-t-blue-500" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Building className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <p className="mt-4 text-lg font-medium text-blue-700 dark:text-blue-300">Cargando perfil...</p>
      </div>
    );
  }

  if (error || !member) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-white to-blue-50 px-4 dark:from-gray-900 dark:to-slate-900/10">
        <div className="w-full max-w-md rounded-2xl border border-blue-100 bg-white p-8 shadow-xl dark:border-blue-800/30 dark:bg-gray-800">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
            <User className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="mb-3 text-center text-xl font-bold text-gray-900 dark:text-white">{error || "Perfil no encontrado"}</h3>
          <p className="mb-6 text-center text-sm text-gray-600 dark:text-gray-400">El perfil solicitado no esta disponible en este momento.</p>
          <Link href="/sobre-nosotros/consejo" className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-white shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg">
            <ArrowLeft className="h-5 w-5" />
            <span>Volver al Consejo</span>
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = member.foto_url
    ? `${process.env.NEXT_PUBLIC_API_URL}${member.foto_url}`
    : member.foto
      ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${member.foto}`
      : null;
  const fullName = `${member.nombre} ${member.apellido_paterno} ${member.apellido_materno || ""}`.trim();

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-blue-50 dark:from-gray-900 dark:to-slate-900/10">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-blue-50 via-white to-blue-100 dark:from-slate-900/20 dark:via-gray-900 dark:to-slate-900/10" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-blue-200/20 blur-3xl dark:bg-blue-700/10" />
          <div className="absolute top-1/2 -left-24 h-96 w-96 rounded-full bg-blue-300/10 blur-3xl dark:bg-blue-600/10" />
          <div className="absolute -bottom-24 right-1/3 h-96 w-96 rounded-full bg-blue-100/30 blur-3xl dark:bg-blue-800/10" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-col items-center gap-12 lg:flex-row">
            <div className="relative">
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="absolute -inset-6 rounded-full border-4 border-blue-200/50 dark:border-blue-700/30" />

              <div className="relative h-64 w-64 overflow-hidden rounded-full border-8 border-white shadow-2xl dark:border-gray-800 lg:h-80 lg:w-80">
                {imageUrl ? (
                  <Image src={imageUrl} alt={fullName} width={320} height={320} className="h-full w-full object-cover" priority />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-linear-to-br from-blue-600 to-blue-800 text-white">
                    <User className="mb-2 h-20 w-20" />
                    <p className="text-2xl font-bold">
                      {member.nombre?.charAt(0)}
                      {member.apellido_paterno?.charAt(0)}
                    </p>
                  </div>
                )}
              </div>

              {member.activo && (
                <div className="absolute bottom-6 right-6">
                  <div className="relative">
                    <div className="h-8 w-8 rounded-full border-4 border-white bg-green-500 shadow-lg dark:border-gray-800" />
                    <div className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-75" />
                  </div>
                </div>
              )}

              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 transform">
                <div className="whitespace-nowrap rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-lg">{member.puesto.split(",")[0]}</div>
              </div>
            </div>

            <div className="flex-1 text-center lg:text-left">
              <div className="mb-4 flex items-center justify-center gap-2 text-sm text-blue-600 dark:text-blue-400 lg:justify-start">
                <Link href="/" className="transition-colors hover:text-blue-700 dark:hover:text-blue-300">Inicio</Link>
                <span>›</span>
                <Link href="/sobre-nosotros/consejo" className="transition-colors hover:text-blue-700 dark:hover:text-blue-300">Consejo</Link>
                <span>›</span>
                <span className="font-medium text-blue-800 dark:text-blue-300">{fullName}</span>
              </div>

              <h1 className="mb-4 text-4xl font-bold leading-tight text-gray-900 dark:text-white lg:text-5xl">{fullName}</h1>
              <p className="mb-8 text-xl font-semibold text-blue-700 dark:text-blue-300 lg:text-2xl">{member.puesto}</p>

              <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
                {member.edad && (
                  <div className="flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-2.5 dark:border-blue-800/50 dark:bg-blue-900/30">
                    <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <span className="font-medium text-blue-800 dark:text-blue-300">{member.edad} anos</span>
                  </div>
                )}
                {member.carrera_estudiada && (
                  <div className="flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-2.5 dark:border-blue-800/50 dark:bg-blue-900/30">
                    <GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <span className="font-medium text-blue-800 dark:text-blue-300">{member.carrera_estudiada}</span>
                  </div>
                )}
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-white transition-colors hover:bg-blue-700">
                    <Globe className="h-5 w-5" />
                    <span className="font-medium">LinkedIn</span>
                  </a>
                )}
              </div>

              {member.descripcion && (
                <div className="mt-8 max-w-2xl">
                  <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">{member.descripcion}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-16">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-blue-50/50 to-blue-100/30 dark:from-transparent dark:via-slate-900/5 dark:to-slate-900/10" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5 }} className="lg:col-span-1">
              <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-xl dark:border-blue-800/30 dark:bg-gray-800">
                <h3 className="mb-6 flex items-center gap-3 border-b border-blue-100 pb-4 text-xl font-bold text-gray-900 dark:border-blue-800/30 dark:text-white">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span>Informacion de Contacto</span>
                </h3>

                <div className="space-y-6">
                  {member.email && (
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/20">
                        <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Email</p>
                        <a href={`mailto:${member.email}`} className="block truncate text-base font-medium text-blue-700 transition-colors hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200" title={member.email}>
                          {member.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {member.telefono && (
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/20">
                        <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Telefono</p>
                        <a href={`tel:${member.telefono}`} className="text-base font-medium text-blue-700 transition-colors hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200">
                          {member.telefono}
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/20">
                      <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Cargo actual</p>
                      <p className="text-base font-medium text-gray-900 dark:text-white">{member.puesto}</p>
                    </div>
                  </div>

                  {member.carrera_estudiada && (
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/20">
                        <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Formacion</p>
                        <p className="text-base font-medium text-gray-900 dark:text-white">{member.carrera_estudiada}</p>
                      </div>
                    </div>
                  )}
                </div>

                {member.email && (
                  <div className="mt-8 border-t border-blue-100 pt-6 dark:border-blue-800/30">
                    <a href={`mailto:${member.email}?subject=Consulta%20Profesional`} className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-white shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg">
                      <Mail className="h-5 w-5" />
                      Contactar
                    </a>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: 0.1 }} className="lg:col-span-2">
              <div className="h-full rounded-2xl border border-blue-100 bg-white p-8 shadow-xl dark:border-blue-800/30 dark:bg-gray-800">
                <h3 className="mb-8 flex items-center gap-3 border-b border-blue-100 pb-4 text-xl font-bold text-gray-900 dark:border-blue-800/30 dark:text-white">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span>Perfil Profesional</span>
                </h3>

                {member.biografia || member.descripcion ? (
                  <div className="prose max-w-none prose-lg dark:prose-invert">
                    <p className="whitespace-pre-wrap text-justify leading-relaxed text-gray-700 dark:text-gray-300">{member.biografia || member.descripcion}</p>
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/30">
                      <User className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                    </div>
                    <p className="italic text-gray-500 dark:text-gray-400">No hay informacion biografica disponible en este momento.</p>
                  </div>
                )}

                {member.descripcion && member.descripcion.length > 200 && (
                  <div className="mt-10 border-t border-blue-100 pt-8 dark:border-blue-800/30">
                    <h4 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">Resumen de Experiencia</h4>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-800/30 dark:bg-blue-900/20">
                        <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">Anos de experiencia</p>
                        <p className="mt-2 text-2xl font-bold text-blue-800 dark:text-blue-200">{member.edad ? Math.max(member.edad - 25, 10) : "15"}+</p>
                      </div>
                      <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-800/30 dark:bg-blue-900/20">
                        <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">Especialidad</p>
                        <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">{member.puesto.split(",")[0]}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 text-center">
            <Link href="/sobre-nosotros/consejo" className="inline-flex items-center gap-3 rounded-xl border-2 border-blue-200 bg-white px-8 py-4 font-semibold text-blue-600 shadow-lg transition-all duration-300 hover:border-blue-300 hover:text-blue-700 hover:shadow-xl dark:border-blue-700/30 dark:bg-gray-800 dark:text-blue-400 dark:hover:border-blue-600/50 dark:hover:text-blue-300">
              <ArrowLeft className="h-5 w-5" />
              <span>Volver al Consejo Directivo</span>
            </Link>
          </motion.div>
        </div>
      </section>

      <SpotlightCTA
        eyebrow="Vision institucional"
        title="Conozca a las personas que impulsan la estrategia de Bausen"
        subtitle="Explore el liderazgo, la experiencia y la vision que sostienen el crecimiento y la identidad corporativa de la marca."
        imageSrc={imageUrl || "/web/image/hero/Flayers_Home_01100.jpg"}
        imageAlt={fullName}
        primaryLink="/sobre-nosotros/consejo"
        primaryLabel="Volver al consejo"
        secondaryLink="/acerca-de"
        secondaryLabel="Conocer la empresa"
      />

      <Footer />
    </div>
  );
}
