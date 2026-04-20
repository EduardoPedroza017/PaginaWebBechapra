"use client";

import React, { useState, useRef, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { BookOpen, Users, Award, ArrowRight, Star, CheckCircle, Clock, Globe, Target, TrendingUp, Video, FileText, Briefcase, ChevronRight, Calendar, Medal, Zap, Shield, Lightbulb, Gift, Send, Sparkles, MessageCircle } from 'lucide-react';
import Footer from '@/components/Footer';
import Section from "@/app/components/Section";
import SubpageHero from "@/components/SubpageHero";
import { TranslateText } from "@/components/TranslateText";

const courses = [
  {
    title: "Gestión Empresarial",
    description: "Aprende las bases de la gestión empresarial moderna con estrategias probadas",
    duration: "8 semanas",
    level: "Principiante",
    icon: BookOpen,
    students: 245,
    rating: 4.8,
    category: "gestion",
    price: "$299",
    modules: 12,
    certificate: true,
    features: ["Videos HD", "Ejercicios prácticos", "Mentoría 1:1"]
  },
  {
    title: "Liderazgo y Equipos",
    description: "Desarrolla habilidades de liderazgo efectivo y gestión de equipos de alto rendimiento",
    duration: "6 semanas",
    level: "Intermedio",
    icon: Users,
    students: 189,
    rating: 4.9,
    category: "liderazgo",
    price: "$349",
    modules: 10,
    certificate: true,
    features: ["Casos reales", "Networking", "Certificado"]
  },
  {
    title: "Estrategia Empresarial",
    description: "Domina la planificación estratégica y toma de decisiones ejecutivas",
    duration: "10 semanas",
    level: "Avanzado",
    icon: Award,
    students: 156,
    rating: 4.7,
    category: "estrategia",
    price: "$449",
    modules: 15,
    certificate: true,
    features: ["Proyecto final", "Simulaciones", "Acceso de por vida"]
  },
  {
    title: "Finanzas Corporativas",
    description: "Comprende los principios financieros y gestión económica de empresas",
    duration: "12 semanas",
    level: "Intermedio",
    icon: Globe,
    students: 203,
    rating: 4.6,
    category: "finanzas",
    price: "$399",
    modules: 14,
    certificate: true,
    features: ["Excel avanzado", "Análisis real", "Toolkit financiero"]
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
    price: "$279",
    modules: 11,
    certificate: true,
    features: ["Campañas reales", "SEO/SEM", "Analytics"]
  },
  {
    title: "Innovación y Transformación",
    description: "Aprende a liderar procesos de cambio e innovación en organizaciones",
    duration: "7 semanas",
    level: "Avanzado",
    icon: Lightbulb,
    students: 134,
    rating: 4.8,
    category: "innovacion",
    price: "$429",
    modules: 9,
    certificate: true,
    features: ["Design Thinking", "Metodologías ágiles", "Workshop"]
  }
];

const stats = [
  { number: "2,500+", label: "Estudiantes Activos", icon: Users },
  { number: "45+", label: "Cursos Disponibles", icon: BookOpen },
  { number: "98%", label: "Satisfacción", icon: Star },
  { number: "150+", label: "Empresas Asociadas", icon: Briefcase }
];

const categories = [
  { id: 'todos', label: 'Todos los Cursos', count: courses.length },
  { id: 'gestion', label: 'Gestión', count: courses.filter(c => c.category === 'gestion').length },
  { id: 'liderazgo', label: 'Liderazgo', count: courses.filter(c => c.category === 'liderazgo').length },
  { id: 'finanzas', label: 'Finanzas', count: courses.filter(c => c.category === 'finanzas').length },
  { id: 'marketing', label: 'Marketing', count: courses.filter(c => c.category === 'marketing').length }
];

export default function TrainingCenterPage() {
  const [activeTab, setActiveTab] = useState('todos');
  const [form, setForm] = useState({ nombre: '', correo: '', areaInteres: '' });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const filteredCourses = activeTab === 'todos' 
    ? courses 
    : courses.filter(course => course.category === activeTab);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <SubpageHero 
        badge="Centro de Capacitación"
        title="Bausen Training Center"
        subtitle="Formamos y conectamos el talento del futuro con las mejores oportunidades estratégicas."
      />

      {/* Quick Stats Over Header */}
      <Section variant="blue" className="-mt-20 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] p-10 border border-slate-200/60 dark:border-slate-800/50 shadow-2xl">
          {stats.map((stat, i) => (
            <div key={i} className="text-center space-y-2 group">
              <div className="text-4xl lg:text-5xl font-black text-blue-700 dark:text-blue-500 transition-transform group-hover:-translate-y-1">{stat.number}</div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Info Blocks */}
      <Section variant="white" size="lg">
        <div className="text-center mb-20">
           <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full text-xs font-black uppercase tracking-widest mb-4 border border-blue-100 dark:border-blue-800/50">
            <Shield size={14} />
            Avalados por el CCPM
          </span>
          <h2 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">
            Educación de Clase Mundial
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-3xl mx-auto font-medium">
            Nuestra plataforma de educación en línea está diseñada para profesionales que buscan excelencia y crecimiento real.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {[
            { title: "Acceso Exclusivo BTC", desc: "Cursos gratuitos avalados por el Colegio de Contadores Públicos CDMX.", icon: Award, color: "blue" },
            { title: "Mentoría de Expertos", desc: "Sesiones personalizadas con líderes en NOM-035 y Capital Humano.", icon: Users, color: "indigo" },
            { title: "Plan Estratégico", desc: "Desarrollamos rutas de aprendizaje alineadas a los objetivos de su empresa.", icon: Target, color: "purple" }
          ].map((item, i) => (
            <InfoCard key={i} item={item} index={i} />
          ))}
        </div>
      </Section>

      {/* Courses Catalog */}
      <Section variant="blue" size="lg" id="courses">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter">
            Catálogo de Programas
          </h2>
          
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                  activeTab === cat.id
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20 scale-105'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-950/50'
                }`}
              >
                {cat.label} <span className="opacity-50 ml-2">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course, index) => (
              <CourseCard key={course.title} course={course} index={index} />
            ))}
          </AnimatePresence>
        </div>
      </Section>

      {/* Internships / CV Section */}
      <Section variant="white" size="lg">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
             <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-blue-100 dark:border-blue-800/50">
              <Zap size={14} />
              Career Boost
            </span>
            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter leading-tight">
              Prácticas Profesionales y Talento
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-10">
              Desarrolle su carrera en proyectos reales con impacto en el mundo empresarial líder. Únase a nuestra red de talentos certificados.
            </p>
            
            <div className="space-y-6">
              {[
                { title: "Experiencia Real", desc: "Trabaje en proyectos estratégicos con empresas líderes." },
                { title: "Mentoría de Lujo", desc: "Reciba guía de directivos con 15+ años de trayectoria." },
                { title: "Posible Contratación", desc: "90% de nuestros practicantes reciben ofertas laborales." }
              ].map((benefit, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 dark:text-white text-lg">{benefit.title}</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-950 rounded-[3rem] p-10 lg:p-12 shadow-2xl shadow-blue-900/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]" />
            <div className="relative z-10">
              <h3 className="text-3xl font-black text-white mb-8">Postule su Talento</h3>
              <form className="space-y-5">
                <input 
                  type="text" 
                  placeholder="Nombre Completo" 
                  className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                />
                <input 
                  type="email" 
                  placeholder="Correo Electrónico" 
                  className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                />
                <select className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none appearance-none">
                  <option value="">Área de Interés</option>
                  <option>Estrategia</option>
                  <option>Nómina y Finanzas</option>
                  <option>Recursos Humanos</option>
                </select>
                <div className="relative border-2 border-dashed border-white/10 rounded-2xl p-8 text-center hover:border-blue-500/50 transition-all cursor-pointer group">
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                  <FileText className="w-8 h-8 text-slate-500 mx-auto mb-2 group-hover:text-blue-400 transition-colors" />
                  <p className="text-sm text-slate-500 font-bold">Subir CV (PDF, DOCX)</p>
                </div>
                <button className="w-full py-5 bg-blue-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl shadow-blue-600/20 hover:bg-blue-500 hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
                  <Send size={16} />
                  Enviar Aplicación
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
  const cardRef = useRef<HTMLDivElement>(null);
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
      <div className="relative h-full bg-white dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] p-10 border border-slate-200/60 dark:border-slate-800/50 shadow-xl hover:shadow-2xl transition-all duration-500 text-center flex flex-col overflow-hidden">
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(37, 99, 235, 0.08), transparent 40%)`
            ),
          }}
        />
        <div className="relative z-20">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-600/20 group-hover:scale-110 transition-transform">
            <item.icon size={32} />
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight leading-tight">{item.title}</h3>
          <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.desc}</p>
        </div>
      </div>
      <div className="absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 blur-2xl bg-blue-600/5 -z-10 transition-opacity duration-500" />
    </motion.div>
  );
}

function CourseCard({ course, index }: { course: any; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="group"
    >
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800 hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
        <div className="relative p-10 bg-slate-950 overflow-hidden">
          <div className="absolute top-6 right-6">
             <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-blue-400 text-[10px] font-black uppercase tracking-widest border border-white/5">
              {course.level}
            </span>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-8 shadow-xl">
            <course.icon size={32} className="text-blue-500" />
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 fill-blue-500 text-blue-500" />
            <span className="text-white font-black">{course.rating}</span>
            <span className="text-slate-500 text-xs font-bold uppercase tracking-widest ml-2">({course.students} Alumnos)</span>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all" />
        </div>

        <div className="p-10 flex flex-col flex-1">
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
            {course.title}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-relaxed mb-8 flex-1">
            {course.description}
          </p>

          <div className="flex items-center justify-between py-6 border-t border-slate-100 dark:border-slate-800 mb-8">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">{course.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">{course.modules} Módulos</span>
            </div>
          </div>

          <button className="w-full py-4 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group/btn">
            Inscribirme Ahora
            <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
