"use client";

import { useEffect, useState, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Section from "@/app/components/Section";
import SubpageHero from "@/components/SubpageHero";
import SpotlightCTA from "@/app/components/SpotlightCTA";
import { Phone, Mail, ArrowRight, Users, Award, CheckCircle2, Linkedin } from "lucide-react";
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
  linkedin?: string;
  activo: boolean;
}

const buildSlug = (member: BoardMember) =>
  `${member.nombre} ${member.apellido_paterno} ${member.apellido_materno || ""}`
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export default function BoardPage() {
  const [boardMembers, setBoardMembers] = useState<BoardMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoardMembers = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/board-members`);
        setBoardMembers(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Error fetching board members:", err);
        setBoardMembers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBoardMembers();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-slate-950">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <SubpageHero
        badge="Liderazgo Estrategico"
        title="Consejo Directivo"
        variant="servicesBlue"
        subtitle="Lideres visionarios comprometidos con la excelencia, la innovacion y el exito sostenible de nuestros clientes."
      />

      <Section variant="blue" className="-mt-20 relative z-20">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 rounded-[2.5rem] border border-slate-200/60 bg-white/80 p-10 shadow-2xl backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-900/80 sm:grid-cols-3">
          {[
            { value: boardMembers.length, label: "Lideres activos", icon: Users },
            { value: "15+", label: "Anos de trayectoria", icon: Award },
            { value: "100%", label: "Compromiso etico", icon: CheckCircle2 },
          ].map((stat, i) => (
            <div key={i} className="space-y-2 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <stat.icon size={24} />
              </div>
              <div className="text-4xl font-black text-blue-700 dark:text-blue-500">{stat.value}</div>
              <div className="text-xs font-black uppercase tracking-widest text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section variant="white" size="lg">
        <div className="mb-14 space-y-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.28em] text-blue-700 dark:border-blue-800/40 dark:bg-blue-950/30 dark:text-blue-300">
            <Users size={14} />
            Equipo directivo
          </span>
          <h2 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white lg:text-5xl">Perfiles con liderazgo y experiencia</h2>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {boardMembers.map((member, index) => (
            <MemberCard key={member.id || index} member={member} index={index} />
          ))}
        </div>
      </Section>

      <SpotlightCTA
        eyebrow="Trayectoria institucional"
        title="Conozca la historia y el liderazgo detras de Bausen"
        subtitle="Explore la vision de nuestro consejo y la trayectoria que respalda cada decision estrategica de la marca."
        imageSrc="/web/image/hero/Flayers_Home_01100.jpg"
        imageAlt="Consejo directivo Bausen"
        primaryLink="/acerca-de"
        primaryLabel="Nuestra historia"
        secondaryLink="/#contacto"
        secondaryLabel="Solicitar informacion"
      />

      <Footer />
    </div>
  );
}

function MemberCard({ member, index }: { member: BoardMember; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { damping: 20, stiffness: 150 });
  const glowY = useSpring(mouseY, { damping: 20, stiffness: 150 });
  const featured = index === 0;

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const imageUrl = member.foto_url
    ? `${process.env.NEXT_PUBLIC_API_URL}${member.foto_url}`
    : member.foto
      ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${member.foto}`
      : null;
  const fullName = `${member.nombre} ${member.apellido_paterno} ${member.apellido_materno || ""}`.trim();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      className={`group relative ${featured ? "md:col-span-2 lg:col-span-2" : ""}`}
    >
      <div
        className={`relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border p-8 shadow-xl transition-all duration-500 hover:shadow-2xl card ${
          featured
            ? "border-[var(--color-accent)]/30 bg-linear-to-br from-[var(--color-bg-secondary)] via-[var(--color-accent)]/5 to-[var(--color-bg-secondary)] dark:border-[var(--color-border)] dark:bg-[var(--color-bg-secondary)]"
            : "border-[var(--color-border)] bg-[var(--color-bg-secondary)]"
        }`}
      >
        <motion.div
          className="pointer-events-none absolute -inset-px z-10 rounded-[2.5rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: useTransform([glowX, glowY], ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, var(--color-accent), transparent 40%)`),
          }}
        />

        <div className="relative z-20 flex h-full flex-col items-center text-center">
          <div className="relative mb-8">
            {featured && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full border border-[var(--color-accent)] bg-[var(--color-accent)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-white shadow-lg">
                Perfil destacado
              </div>
            )}
            <div className={`relative overflow-hidden shadow-2xl ${featured ? "h-48 w-48 rounded-[2rem]" : "h-40 w-40 rounded-3xl"} ring-8 ring-[var(--color-bg)] transition-all duration-500 group-hover:ring-[var(--color-accent)]/10`}>
              {imageUrl ? (
                <Image src={imageUrl} alt={fullName} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[var(--color-accent)] text-4xl font-black text-white">
                  {member.nombre?.charAt(0)}
                  {member.apellido_paterno?.charAt(0)}
                </div>
              )}
            </div>
          </div>

          <h3 className={`${featured ? "text-3xl" : "text-2xl"} mb-2 font-black tracking-tight text-[var(--color-text)]`}>{fullName}</h3>
          <p className="mb-6 rounded-xl bg-[var(--color-accent)]/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-accent)]">
            {member.puesto}
          </p>

          <p className={`mb-8 font-medium leading-relaxed text-[var(--color-text-muted)] ${featured ? "max-w-2xl text-base" : "text-sm"}`}>
            {member.descripcion || member.biografia || "Perfil estrategico comprometido con el crecimiento y la excelencia institucional."}
          </p>

          <div className="mb-8 w-full flex-1 space-y-4 border-t border-[var(--color-border)] pt-6 text-left">
            {member.email && (
              <div className="flex items-center gap-3 text-[var(--color-text-muted)]">
                <div className="rounded-lg bg-[var(--color-bg)] p-2">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="truncate text-sm font-bold">{member.email}</span>
              </div>
            )}
            {member.telefono && (
              <div className="flex items-center gap-3 text-[var(--color-text-muted)]">
                <div className="rounded-lg bg-[var(--color-bg)] p-2">
                  <Phone className="h-4 w-4" />
                </div>
                <span className="text-sm font-bold">{member.telefono}</span>
              </div>
            )}
            {member.linkedin && (
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]">
                <div className="rounded-lg bg-[var(--color-bg)] p-2">
                  <Linkedin className="h-4 w-4" />
                </div>
                <span className="text-sm font-bold">LinkedIn</span>
              </a>
            )}
          </div>

          <Link href={`/sobre-nosotros/consejo/${buildSlug(member)}`} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--color-bg)] py-4 text-[10px] font-black uppercase tracking-widest text-[var(--color-text)] transition-all duration-300 hover:bg-[var(--color-accent)] hover:text-white">
            Ver perfil completo
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-[var(--color-accent)]/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
    </motion.div>
  );
}
