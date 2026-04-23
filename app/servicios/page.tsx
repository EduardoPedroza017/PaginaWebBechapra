"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle, Users, Building2, Briefcase, Sparkles } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";
import Footer from "@/components/Footer";
import Section from "@/app/components/Section";
import SpotlightCTA from "@/app/components/SpotlightCTA";
import { MouseEvent } from "react";

const iconMap: Record<string, React.ComponentType<any>> = {
  "Capital Humano": Users,
  "Desarrollo Organizacional": Building2,
  "Management Services": Briefcase,
};

type Service = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  image?: string;
  features: { name: string; slug: string }[];
};

const defaultServices: Service[] = [
  {
    id: "1",
    name: "Capital Humano",
    slug: "capital-humano",
    description: "Soluciones estrategicas para la gestion, atraccion y optimizacion del talento humano en su organizacion.",
    features: [
      { name: "Reclutamiento y Seleccion", slug: "atraccion-de-talento" },
      { name: "Administracion de Nomina", slug: "payroll" },
      { name: "Servicios Especializados", slug: "servicios-especializados" },
    ],
  },
  {
    id: "2",
    name: "Desarrollo Organizacional",
    slug: "desarrollo-organizacional",
    description: "Impulsamos la cultura, estructura y eficiencia de su empresa a traves de diagnosticos y planes de mejora.",
    features: [
      { name: "Capacitacion Empresarial", slug: "capacitacion-empresarial" },
      { name: "NOM-035", slug: "nom-035" },
      { name: "Consultoria Organizacional", slug: "consultoria-organizacional" },
    ],
  },
  {
    id: "3",
    name: "Management Services",
    slug: "management-services",
    description: "Servicios integrales de consultoria y gestion empresarial para la toma de decisiones estrategicas.",
    features: [
      { name: "Servicios Legales", slug: "servicios-legales" },
      { name: "Servicios Contables", slug: "servicios-contables" },
      { name: "Servicios PYME", slug: "servicios-pyme" },
    ],
  },
];

export default function ServiciosIndex() {
  const servicesBlueGradient = "linear-gradient(90deg, var(--hero-services-from), var(--hero-services-via), var(--hero-services-to))";
  const servicesBlueGlow =
    "radial-gradient(circle at 30% 40%, var(--hero-services-glow-primary) 0%, transparent 40%), radial-gradient(circle at 70% 60%, var(--hero-services-glow-secondary) 0%, transparent 40%)";
  const servicesBlueStyle = {
    backgroundColor: "var(--hero-services-from)",
    background: servicesBlueGradient,
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <section className="relative overflow-hidden pb-20 pt-32 lg:pb-32 lg:pt-48" style={servicesBlueStyle}>
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: "transparent",
              backgroundImage: servicesBlueGlow,
            }}
          />
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        </div>

        <div className="pointer-events-none absolute inset-0 z-10 bg-black/10 dark:hidden" />

        <div className="gradient-dark relative z-30 mx-auto max-w-7xl px-6 lg:px-8 2xl:max-w-360">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-white"
            >
              <Sparkles className="h-4 w-4" />
              <TranslateText text="Excelencia Corporativa" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8 text-5xl font-black leading-[0.9] tracking-tighter text-white lg:text-8xl"
            >
              <TranslateText text="Nuestros" />
              <br />
              <span className="bg-linear-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                <TranslateText text="Servicios" />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-10 text-xl font-medium leading-relaxed text-white/85"
            >
              <TranslateText text="Soluciones estrategicas disenadas para cada etapa del ciclo de vida de su organizacion." />
            </motion.p>
          </div>
        </div>
      </section>

      <Section variant="blue" className="relative z-20 -mt-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-12 items-stretch">
          {defaultServices.map((service, index) => (
            <GroupCard key={service.id} group={service} index={index} />
          ))}
        </div>
      </Section>

      <Section variant="white" size="lg">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="space-y-8">
            <h2 className="text-4xl font-black leading-tight tracking-tight text-slate-900 dark:text-white lg:text-5xl">
              <TranslateText text="Enfoque en Resultados y Calidad Certificada" />
            </h2>
            <p className="text-lg font-medium leading-relaxed text-slate-600 dark:text-slate-400">
              <TranslateText text="Nuestro modelo de servicio se basa en la integracion de tecnologia avanzada con un profundo conocimiento del mercado local e internacional. Garantizamos cumplimiento normativo y eficiencia operativa en cada proceso." />
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              {["Atencion personalizada 24/7", "Cumplimiento legal total", "Tecnologia de vanguardia", "Expertos certificados"].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 shadow-lg shadow-blue-600/30">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    <TranslateText text={item} />
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-[3rem] bg-blue-600/10 blur-2xl" />
            <div className="relative aspect-video overflow-hidden rounded-[3rem] border border-slate-200 shadow-2xl dark:border-slate-800 lg:aspect-square">
              <Image src="/web/image/servicios/service.png" alt="Estrategia Corporativa" fill className="object-cover" />
            </div>
          </div>
        </div>
      </Section>

      <SpotlightCTA
        eyebrow="Ruta de crecimiento"
        title="Impulsamos su empresa con una estrategia integral"
        subtitle="Conecte capital humano, operacion y consultoria en una sola experiencia mas clara, ejecutiva y orientada a resultados."
        imageSrc="/web/image/servicios/service.png"
        imageAlt="Soluciones empresariales Bausen"
        primaryLink="/#contacto"
        primaryLabel="Solicitar consultoria"
        secondaryLink="/acerca-de"
        secondaryLabel="Nuestra trayectoria"
        theme="blue"
      />

      <Footer />
    </div>
  );
}

function GroupCard({ group, index }: { group: Service; index: number }) {
  const router = useRouter();
  const Icon = iconMap[group.name] || Briefcase;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const glowX = useSpring(mouseX, { damping: 20, stiffness: 150 });
  const glowY = useSpring(mouseY, { damping: 20, stiffness: 150 });

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      className="group relative"
    >
      <div
      onClick={() => router.push(`/servicios/${group.slug}`)}
      className="relative flex h-full min-h-[600px] cursor-pointer flex-col rounded-[2.5rem] border border-slate-200/60 bg-white p-8 shadow-xl transition-all duration-500 hover:shadow-2xl dark:border-slate-800/50 dark:bg-slate-900/80"
      >
        <motion.div
          className="pointer-events-none absolute -inset-px z-10 overflow-hidden rounded-[2.5rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: useTransform([glowX, glowY], ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(37, 99, 235, 0.08), transparent 40%)`),
          }}
        />

        <div className="relative z-20 flex h-full min-w-0 flex-col overflow-hidden">
          <div className="mb-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-600/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
            <Icon className="h-7 w-7" />
          </div>

          <h2 className="mb-6 text-2xl font-black leading-snug text-slate-900 dark:text-white">
            <TranslateText text={group.name} />
          </h2>

          <p className="mb-10 flex-1 font-medium leading-relaxed text-slate-600 dark:text-slate-400 text-sm">
            <TranslateText text={group.description || ""} />
          </p>

          <div className="space-y-6">
            {group.features.map((feature) => (
              <Link
                key={feature.name}
                href={`/servicios/${feature.slug}`}
                onClick={(e) => e.stopPropagation()}
                className="group/link flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4 transition-all hover:border-blue-200 hover:bg-blue-50 dark:border-slate-700/50 dark:bg-slate-800/50 dark:hover:border-blue-800/50 dark:hover:bg-blue-900/20"
              >
                <span className="text-sm font-black uppercase tracking-wider text-slate-700 group-hover/link:text-blue-700 dark:text-slate-300 dark:group-hover/link:text-blue-400">
                  <TranslateText text={feature.name} />
                </span>
                <ArrowRight className="h-4 w-4 text-slate-400 transition-all group-hover/link:translate-x-1 group-hover/link:text-blue-600" />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-blue-600/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
    </motion.div>
  );
}
