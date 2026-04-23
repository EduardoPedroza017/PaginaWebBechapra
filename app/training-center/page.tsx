"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Users, Award, ArrowRight, Star, CheckCircle, Clock, Globe, Target, TrendingUp, FileText, Zap, Shield, Lightbulb, Send } from "lucide-react";
import Footer from "@/components/Footer";
import SpotlightCTA from "@/app/components/SpotlightCTA";
import Section from "@/app/components/Section";
import SubpageHero from "@/components/SubpageHero";

const courses = [
  {
    title: "Gestion Empresarial",
    description: "Aprende las bases de la gestion empresarial moderna con estrategias probadas",
    duration: "8 semanas",
    level: "Principiante",
    icon: BookOpen,
    students: 245,
    rating: 4.8,
    category: "gestion",
    modules: 12,
  },
  {
    title: "Liderazgo y Equipos",
    description: "Desarrolla habilidades de liderazgo efectivo y gestion de equipos de alto rendimiento",
    duration: "6 semanas",
    level: "Intermedio",
    icon: Users,
    students: 189,
    rating: 4.9,
    category: "liderazgo",
    modules: 10,
  },
  {
    title: "Estrategia Empresarial",
    description: "Domina la planificacion estrategica y toma de decisiones ejecutivas",
    duration: "10 semanas",
    level: "Avanzado",
    icon: Award,
    students: 156,
    rating: 4.7,
    category: "estrategia",
    modules: 15,
  },
  {
    title: "Finanzas Corporativas",
    description: "Comprende los principios financieros y gestion economica de empresas",
    duration: "12 semanas",
    level: "Intermedio",
    icon: Globe,
    students: 203,
    rating: 4.6,
    category: "finanzas",
    modules: 14,
  },
  {
    title: "Marketing Digital",
    description: "Domina las estrategias de marketing en la era digital y redes sociales",
    duration: "8 semanas",
    level: "Principiante",
    icon: TrendingUp,
    students: 312,
    rating: 4.9,
    category: "marketing",
    modules: 11,
  },
  {
    title: "Innovacion y Transformacion",
    description: "Aprende a liderar procesos de cambio e innovacion en organizaciones",
    duration: "7 semanas",
    level: "Avanzado",
    icon: Lightbulb,
    students: 134,
    rating: 4.8,
    category: "innovacion",
    modules: 9,
  },
];

const stats = [
  { number: "2,500+", label: "Estudiantes Activos" },
  { number: "45+", label: "Cursos Disponibles" },
  { number: "98%", label: "Satisfaccion" },
  { number: "150+", label: "Empresas Asociadas" },
];

const categories = [
  { id: "todos", label: "Todos los Cursos", count: courses.length },
  { id: "gestion", label: "Gestion", count: courses.filter((c) => c.category === "gestion").length },
  { id: "liderazgo", label: "Liderazgo", count: courses.filter((c) => c.category === "liderazgo").length },
  { id: "finanzas", label: "Finanzas", count: courses.filter((c) => c.category === "finanzas").length },
  { id: "marketing", label: "Marketing", count: courses.filter((c) => c.category === "marketing").length },
];

const categoryAccent: Record<string, string> = {
  gestion: "linear-gradient(135deg, #0f4fff 0%, #2563eb 100%)",
  liderazgo: "linear-gradient(135deg, #3342d6 0%, #5b21b6 100%)",
  estrategia: "linear-gradient(135deg, #0f172a 0%, #1d4ed8 100%)",
  finanzas: "linear-gradient(135deg, #0284c7 0%, #2563eb 100%)",
  marketing: "linear-gradient(135deg, #1d4ed8 0%, #7c3aed 100%)",
  innovacion: "linear-gradient(135deg, #4f46e5 0%, #2563eb 100%)",
};

export default function TrainingCenterPage() {
  const [activeTab, setActiveTab] = useState("todos");
  const filteredCourses = activeTab === "todos" ? courses : courses.filter((course) => course.category === activeTab);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <SubpageHero
        badge="Centro de Capacitacion"
        title="Bausen Training Center"
        variant="servicesBlue"
        subtitle="Formamos y conectamos el talento del futuro con las mejores oportunidades estrategicas."
      />

      <Section variant="white" className="-mt-20 relative z-20">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 rounded-[2.5rem] border border-slate-200 bg-slate-50 p-10 shadow-lg lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={i} className="space-y-2 text-center group">
              <div className="text-4xl font-black text-blue-600 lg:text-5xl">{stat.number}</div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">{stat.label}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section variant="white" size="lg">
        <div className="mb-20 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[--surface-border] bg-white px-4 py-2 text-xs font-black uppercase tracking-widest text-[--brand-primary]">
            <Shield size={14} />
            Avalados por el CCPM
          </span>
          <h2 className="mb-6 text-4xl font-black tracking-tighter text-slate-900 lg:text-6xl">Educacion de Clase Mundial</h2>
          <p className="mx-auto max-w-3xl text-lg font-medium text-slate-600">
            Nuestra plataforma de educacion en linea esta disenada para profesionales que buscan excelencia y crecimiento real.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {[
            { title: "Acceso Exclusivo BTC", desc: "Cursos gratuitos avalados por el Colegio de Contadores Publicos CDMX.", icon: Award },
            { title: "Mentoria de Expertos", desc: "Sesiones personalizadas con lideres en NOM-035 y Capital Humano.", icon: Users },
            { title: "Plan Estrategico", desc: "Desarrollamos rutas de aprendizaje alineadas a los objetivos de su empresa.", icon: Target },
          ].map((item, i) => (
            <InfoCard key={i} item={item} index={i} />
          ))}
        </div>
      </Section>

      <Section variant="blue" size="lg" id="courses">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.28em] text-blue-700 dark:border-blue-800/40 dark:bg-blue-950/30 dark:text-blue-300">
            <Zap size={14} />
            Programas en foco
          </span>
          <h2 className="mb-8 text-4xl font-black tracking-tighter text-slate-900 dark:text-white lg:text-5xl">Catalogo de Programas</h2>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`rounded-2xl border px-6 py-3 text-xs font-black uppercase tracking-widest transition-all ${
                  activeTab === cat.id
                    ? "scale-105 border-blue-200 text-white shadow-xl shadow-blue-500/20 dark:border-blue-700/50"
                    : "border-[--surface-border] bg-white text-[--foreground] hover:border-blue-200 hover:bg-[--background] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-blue-950/50"
                }`}
                style={activeTab === cat.id ? { backgroundImage: "linear-gradient(135deg, var(--hero-services-from), var(--hero-services-to))" } : undefined}
              >
                {cat.label} <span className="ml-2 opacity-50">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course, index) => (
              <CourseCard key={course.title} course={course} index={index} />
            ))}
          </AnimatePresence>
        </div>
      </Section>

      <SpotlightCTA
        eyebrow="Impulsa tu crecimiento"
        title="Transforma tu talento en ventaja competitiva"
        subtitle="Integra aprendizaje, practica profesional y acompanamiento experto en una experiencia de formacion mas atractiva y memorable."
        imageSrc="/web/image/traniing/escuela.jfif"
        imageAlt="Bausen Training Center"
        primaryLink="#contacto"
        primaryLabel="Solicitar informacion"
        secondaryLink="#courses"
        secondaryLabel="Ver programas"
      />

      <Section variant="white" size="lg">
        <div className="grid items-center gap-20 lg:grid-cols-2">
          <div>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[--surface-border] bg-[--background] px-4 py-2 text-xs font-black uppercase tracking-widest text-[--brand-primary] dark:border-blue-800/50 dark:bg-blue-900/20 dark:text-blue-400">
              <Zap size={14} />
              Career Boost
            </span>
            <h2 className="mb-8 text-4xl font-black leading-tight tracking-tighter text-[--brand-accent] dark:text-white lg:text-6xl">Practicas Profesionales y Talento</h2>
            <p className="mb-10 text-lg font-medium leading-relaxed text-[--foreground] dark:text-slate-400">
              Desarrolle su carrera en proyectos reales con impacto en el mundo empresarial lider. Unase a nuestra red de talentos certificados.
            </p>

            <div className="space-y-6">
              {[
                { title: "Experiencia Real", desc: "Trabaje en proyectos estrategicos con empresas lideres." },
                { title: "Mentoria de Lujo", desc: "Reciba guia de directivos con 15+ anos de trayectoria." },
                { title: "Posible Contratacion", desc: "90% de nuestros practicantes reciben ofertas laborales." },
              ].map((benefit, i) => (
                <div key={i} className="group flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[--background] transition-all group-hover:bg-[--brand-primary] group-hover:text-white dark:bg-blue-900/30">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-[--brand-accent] dark:text-white">{benefit.title}</h4>
                    <p className="text-sm font-medium text-[--foreground] dark:text-slate-400">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[3rem] bg-slate-950 p-10 shadow-2xl shadow-[--brand-primary]/40 lg:p-12">
            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[--brand-primary]/10 blur-[80px]" />
            <div className="relative z-10">
              <h3 className="mb-8 text-3xl font-black text-white">Postule su Talento</h3>
              <form className="space-y-5">
                <input type="text" placeholder="Nombre Completo" className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none transition-all placeholder:text-slate-400 focus:border-[--brand-primary] focus:ring-4 focus:ring-[--brand-primary]/10" />
                <input type="email" placeholder="Correo Electronico" className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none transition-all placeholder:text-slate-400 focus:border-[--brand-primary] focus:ring-4 focus:ring-[--brand-primary]/10" />
                <select className="w-full appearance-none rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-slate-300 outline-none transition-all focus:border-[--brand-primary] focus:ring-4 focus:ring-[--brand-primary]/10">
                  <option value="">Area de Interes</option>
                  <option>Estrategia</option>
                  <option>Nomina y Finanzas</option>
                  <option>Recursos Humanos</option>
                </select>
                <div className="group relative cursor-pointer rounded-2xl border-2 border-dashed border-white/10 p-8 text-center transition-all hover:border-[--brand-primary]/50">
                  <input type="file" className="absolute inset-0 cursor-pointer opacity-0" />
                  <FileText className="mx-auto mb-2 h-8 w-8 text-slate-400 transition-colors group-hover:text-[--brand-accent]" />
                  <p className="text-sm font-bold text-slate-300">Subir CV (PDF, DOCX)</p>
                </div>
                <button className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[--brand-primary] py-5 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-[--brand-primary]/20 transition-all hover:-translate-y-1 hover:bg-[--brand-accent]">
                  <Send size={16} />
                  Enviar Aplicacion
                </button>
              </form>
            </div>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}

function InfoCard({ item, index }: { item: any; index: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="group relative">
      <div className="relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white p-10 text-center shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
        <div className="relative z-20">
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-600/20 transition-transform group-hover:scale-110">
            <item.icon size={32} />
          </div>
          <h3 className="mb-4 text-2xl font-black leading-tight tracking-tight text-slate-900">{item.title}</h3>
          <p className="font-medium leading-relaxed text-slate-600">{item.desc}</p>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-blue-600/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
    </motion.div>
  );
}

function CourseCard({ course, index }: { course: any; index: number }) {
  const featured = index === 0;
  const accent = categoryAccent[course.category] || "linear-gradient(135deg, #0f4fff 0%, #2563eb 100%)";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className={featured ? "group md:col-span-2 lg:col-span-2" : "group"}
    >
      <div
        className={`flex h-full flex-col overflow-hidden rounded-[2.5rem] border transition-all duration-500 hover:shadow-2xl ${
          featured
            ? "border-blue-200/80 bg-linear-to-br from-white via-blue-50/50 to-white shadow-2xl shadow-blue-100/70 dark:border-blue-800/40 dark:bg-slate-900 dark:shadow-blue-950/30"
            : "border-[--surface-border] bg-[--surface-card] shadow-xl dark:border-slate-800 dark:bg-slate-900"
        }`}
      >
        <div className={`relative overflow-hidden p-10 ${featured ? "" : "bg-slate-950"}`} style={featured ? { backgroundImage: accent } : undefined}>
          <div className="absolute right-6 top-6">
            <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${featured ? "border border-white/20 bg-slate-950/30 text-white backdrop-blur-md" : "border border-white/5 bg-white/10 text-[--brand-accent] backdrop-blur-md"}`}>
              {course.level}
            </span>
          </div>
          {featured && (
            <div className="mb-6 inline-flex w-fit items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-white">
              Programa destacado
            </div>
          )}
          <div className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl shadow-xl ${featured ? "bg-white/15" : "bg-white/10"}`}>
            <course.icon size={32} className={featured ? "text-white" : "text-[--brand-primary]"} />
          </div>
          <div className="mb-2 flex items-center gap-2">
            <Star className={`h-4 w-4 ${featured ? "fill-white text-white" : "fill-[--brand-primary] text-[--brand-primary]"}`} />
            <span className="font-black text-white">{course.rating}</span>
            <span className={`ml-2 text-xs font-bold uppercase tracking-widest ${featured ? "text-white/75" : "text-slate-400"}`}>({course.students} Alumnos)</span>
          </div>
          <div className={`absolute -bottom-10 -right-10 h-40 w-40 rounded-full blur-3xl transition-all ${featured ? "bg-white/20 group-hover:bg-white/30" : "bg-[--brand-primary]/10 group-hover:bg-[--brand-primary]/20"}`} />
        </div>

        <div className="flex flex-1 flex-col p-10">
          <h3 className={`mb-4 font-black transition-colors group-hover:text-[--brand-primary] dark:text-white dark:group-hover:text-blue-400 ${featured ? "text-3xl text-[--brand-accent] lg:text-4xl" : "text-2xl text-[--brand-accent]"}`}>
            {course.title}
          </h3>
          <p className={`mb-8 flex-1 font-medium leading-relaxed text-[--foreground] dark:text-slate-400 ${featured ? "max-w-2xl text-base" : "text-sm"}`}>{course.description}</p>

          <div className="mb-8 flex items-center justify-between border-t border-[--surface-border] py-6 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[--brand-primary]" />
              <span className="text-xs font-black uppercase tracking-widest text-[--brand-accent] dark:text-white">{course.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-[--brand-primary]" />
              <span className="text-xs font-black uppercase tracking-widest text-[--brand-accent] dark:text-white">{course.modules} Modulos</span>
            </div>
          </div>

          <button className={`flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-[10px] font-black uppercase tracking-widest transition-all duration-300 group/btn ${featured ? "bg-[--brand-primary] text-white hover:bg-[--brand-accent]" : "bg-[--background] text-[--brand-primary] hover:bg-[--brand-primary] hover:text-white dark:bg-slate-800 dark:text-white"}`}>
            Inscribirme Ahora
            <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
