"use client";

import React, { useState } from 'react';
import { GraduationCap, BookOpen, Users, Award, ArrowRight, Star, CheckCircle, Clock, Globe, Target, TrendingUp, Video, FileText, Briefcase, ChevronRight, Calendar, Medal, Trophy, Zap, Shield, Lightbulb, BarChart, Gift, Send } from 'lucide-react';

export default function TrainingCenterPage() {
  const [activeTab, setActiveTab] = useState('todos');
  const [selectedCourse, setSelectedCourse] = useState(null);

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

  const testimonials = [
    {
      name: "María González",
      role: "Gerente de Operaciones",
      company: "TechCorp",
      content: "Los cursos me han ayudado a ascender profesionalmente. La calidad de enseñanza es excepcional y el contenido muy aplicable.",
      rating: 5,
      image: "MG"
    },
    {
      name: "Carlos Rodríguez",
      role: "Director Ejecutivo",
      company: "Innovate Solutions",
      content: "Excelente plataforma de formación. Los instructores son profesionales de primer nivel con experiencia real.",
      rating: 5,
      image: "CR"
    },
    {
      name: "Ana López",
      role: "Consultora Empresarial",
      company: "Business Advisors",
      content: "He tomado varios cursos y todos han superado mis expectativas. La metodología es práctica y efectiva.",
      rating: 5,
      image: "AL"
    }
  ];

  const benefits = [
    {
      icon: Award,
      title: "Certificación Reconocida",
      description: "Obtén certificados avalados por instituciones reconocidas a nivel internacional",
      color: "green"
    },
    {
      icon: Users,
      title: "Instructores Expertos",
      description: "Aprende con profesionales con amplia experiencia en el sector empresarial",
      color: "blue"
    },
    {
      icon: BookOpen,
      title: "Contenido Actualizado",
      description: "Materiales y metodologías alineadas con las tendencias actuales del mercado",
      color: "orange"
    },
    {
      icon: Video,
      title: "Clases en Vivo",
      description: "Participa en sesiones interactivas con instructores y compañeros de clase",
      color: "blue"
    },
    {
      icon: Shield,
      title: "Garantía de Calidad",
      description: "30 días de garantía o te devolvemos tu dinero sin preguntas",
      color: "red"
    },
    {
      icon: Zap,
      title: "Acceso Inmediato",
      description: "Comienza a aprender desde el momento en que te inscribes",
      color: "yellow"
    }
  ];

  const learningPath = [
    {
      step: 1,
      title: "Evaluación Inicial",
      description: "Identificamos tu nivel actual y objetivos profesionales",
      icon: Target
    },
    {
      step: 2,
      title: "Plan Personalizado",
      description: "Creamos una ruta de aprendizaje adaptada a tus necesidades",
      icon: FileText
    },
    {
      step: 3,
      title: "Formación Práctica",
      description: "Aprende con casos reales y proyectos aplicables",
      icon: Lightbulb
    },
    {
      step: 4,
      title: "Certificación",
      description: "Obtén tu certificado y avanza en tu carrera profesional",
      icon: Medal
    }
  ];

  const categories = [
    { id: 'todos', label: 'Todos los Cursos', count: courses.length },
    { id: 'gestion', label: 'Gestión', count: courses.filter(c => c.category === 'gestion').length },
    { id: 'liderazgo', label: 'Liderazgo', count: courses.filter(c => c.category === 'liderazgo').length },
    { id: 'finanzas', label: 'Finanzas', count: courses.filter(c => c.category === 'finanzas').length },
    { id: 'marketing', label: 'Marketing', count: courses.filter(c => c.category === 'marketing').length }
  ];

  const filteredCourses = activeTab === 'todos' 
    ? courses 
    : courses.filter(course => course.category === activeTab);

  const colorClasses: Record<string, string> = {
    green: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    orange: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    red: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
    yellow: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400"
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section con animación de gradiente */}
      <section className="relative overflow-hidden bg-linear-to-br from-blue-600 via-blue-700 to-blue-800 dark:from-blue-800 dark:via-blue-900 dark:to-blue-900 text-white py-24 lg:py-36">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Trophy className="w-4 h-4" />
                <span className="text-sm font-medium">Formación Profesional Certificada</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Transforma tu<br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-300 to-blue-100">
                  Carrera Profesional
                </span>
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-blue-100 leading-relaxed">
                Desarrolla las habilidades que demanda el mercado con nuestros cursos especializados y certificaciones reconocidas internacionalmente
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#courses" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:scale-105 inline-flex items-center justify-center gap-2">
                  Explorar Cursos
                  <ArrowRight className="w-5 h-5" />
                </a>
                <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all backdrop-blur-sm inline-flex items-center justify-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Agendar Demo
                </button>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-blue-400 to-blue-500 rounded-3xl blur-2xl opacity-50"></div>
                <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 bg-white/20 rounded-xl p-4">
                      <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold">Aprende a tu ritmo</div>
                        <div className="text-sm text-blue-100">Acceso 24/7 a todo el contenido</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 bg-white/20 rounded-xl p-4">
                      <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                        <Star className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold">Certificación incluida</div>
                        <div className="text-sm text-blue-100">Reconocimiento profesional</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 bg-white/20 rounded-xl p-4">
                      <div className="w-12 h-12 bg-pink-400 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold">Comunidad activa</div>
                        <div className="text-sm text-blue-100">Red de profesionales</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bechapra Training Center Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Cónoce Bechapra Training Center
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Nuestra plataforma de educación en línea avalada por el Colegio de Contadores Públicos de México
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Acceso Exclusivo BTC
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Accede a nuestra agenda de cursos gratuitos, avalados por el Colegio de Contadores Públicos CDMX.
              </p>
            </div>

            <div className="bg-linear-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Asesoramiento Personalizado
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Sesiones de asesoramiento personalizado con expertos en NOM035.
              </p>
            </div>

            <div className="bg-linear-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Planificación Estratégica
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Desarrollamos estrategias a largo plazo que impulsen el crecimiento y el éxito de tu empresa en el mercado actual.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section con diseño mejorado */}
      <section className="py-12 bg-white dark:bg-gray-800 shadow-lg -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center group cursor-pointer">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl lg:text-5xl font-bold bg-linear-to-r from-blue-600 to-blue-500 text-transparent bg-clip-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full mb-4">
              <Target className="w-4 h-4" />
              <span className="text-sm font-semibold">Tu Camino al Éxito</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Así funciona nuestro proceso
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Metodología probada para garantizar tu éxito profesional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {learningPath.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="relative">
                  {index < learningPath.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-linear-to-r from-blue-400 to-blue-500 -z-10"></div>
                  )}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                    <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-2">
                      PASO {item.step}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Courses Section con filtros */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900" id="courses">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Catálogo de Cursos
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Encuentra el programa perfecto para ti
            </p>
          </div>

          {/* Filtros de categorías */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === cat.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
                }`}
              >
                {cat.label} <span className="text-sm opacity-70">({cat.count})</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => {
              const IconComponent = course.icon;
              return (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100 dark:border-gray-700 group">
                  <div className="relative bg-linear-to-br from-blue-500 to-blue-600 p-8">
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-semibold">
                        {course.level}
                      </div>
                    </div>
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-4 h-4 fill-current text-yellow-300" />
                        <span className="font-semibold">{course.rating}</span>
                        <span className="text-sm opacity-80">({course.students} estudiantes)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {course.features.map((feature, i) => (
                        <span key={i} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {course.modules} módulos
                      </span>
                    </div>

                    <div className="flex items-center justify-center">
                      <button className="bg-linear-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl hover:shadow-lg transition-all hover:scale-105 flex items-center gap-2 font-semibold w-full justify-center">
                        Ver Curso
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Prácticas Profesionales Section */}
      <section className="py-20 bg-linear-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full mb-4">
              <Briefcase className="w-4 h-4" />
              <span className="text-sm font-semibold">Oportunidades Laborales</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Prácticas Profesionales
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Envía tu CV y únete a nuestro programa de prácticas profesionales. 
              Desarrolla experiencia real en empresas líderes del sector.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                ¿Qué ofrecemos?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Experiencia Real</h4>
                    <p className="text-gray-600 dark:text-gray-300">Trabaja en proyectos reales con impacto en el mundo empresarial</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Mentoría Personalizada</h4>
                    <p className="text-gray-600 dark:text-gray-300">Recibe guía de profesionales experimentos en tu área de interés</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Certificación</h4>
                    <p className="text-gray-600 dark:text-gray-300">Obtén certificados que validen tu experiencia laboral</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Posible Contratación</h4>
                    <p className="text-gray-600 dark:text-gray-300">Oportunidad de ser contratado por empresas asociadas</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Envía tu CV
              </h4>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Área de Interés
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                    <option>Selecciona un área</option>
                    <option>Contabilidad y Finanzas</option>
                    <option>Recursos Humanos</option>
                    <option>Marketing Digital</option>
                    <option>Gestión Empresarial</option>
                    <option>Tecnología</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Adjuntar CV
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Enviar CV
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              ¿Por qué elegirnos?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Beneficios que marcan la diferencia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="bg-linear-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-200 dark:border-gray-600">
                  <div className={`w-16 h-16 ${colorClasses[benefit.color]} rounded-2xl flex items-center justify-center mb-6`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials mejorados */}
      <section className="py-20 bg-linear-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full mb-4">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-semibold">Historias de Éxito</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Lo que dicen nuestros estudiantes
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Más de 2,500 profesionales han transformado sus carreras
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="w-14 h-14 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white text-lg">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prácticas Profesionales Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full mb-4">
              <Briefcase className="w-4 h-4" />
              <span className="text-sm font-semibold">Oportunidades Laborales</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Prácticas Profesionales
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Conecta con empresas líderes y gana experiencia real en el mundo laboral
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                ¿Cómo funciona?
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Envía tu CV
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Completa tu perfil profesional y sube tu currículum actualizado con tus habilidades y experiencia.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center shrink-0">
                    <Target className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Evaluación y Matching
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Nuestro equipo evalúa tu perfil y te conecta con oportunidades que se ajusten a tus intereses y habilidades.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center shrink-0">
                    <Briefcase className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Inicio de Prácticas
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Comienza tu experiencia laboral en empresas reconocidas con seguimiento y mentoría continua.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Beneficios de las Prácticas
              </h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Experiencia laboral real</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Mentoría profesional</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Posible contratación</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Certificado de prácticas</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Red de contactos profesionales</span>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors mt-8 flex items-center justify-center gap-2">
                <FileText className="w-5 h-5" />
                Enviar mi CV
              </button>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-blue-600 text-white rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">
                Empresas Participantes
              </h3>
              <p className="text-blue-100 mb-6">
                Trabaja con las mejores empresas del sector
              </p>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-80">
                <div className="text-xl font-bold">TechCorp</div>
                <div className="text-xl font-bold">Innovate Solutions</div>
                <div className="text-xl font-bold">Business Advisors</div>
                <div className="text-xl font-bold">Global Ventures</div>
                <div className="text-xl font-bold">Future Labs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final potente */}
      <section className="py-24 bg-linear-to-br from-blue-600 via-blue-700 to-blue-800 dark:from-blue-800 dark:via-blue-900 dark:to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-4 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-semibold">Oferta por Tiempo Limitado</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            ¡Comienza tu transformación<br />profesional hoy!
          </h2>
          <p className="text-xl lg:text-2xl mb-4 text-blue-100">
            Únete a más de 2,500 profesionales que ya están avanzando en sus carreras
          </p>
          <p className="text-lg mb-10 text-blue-200">
            <Gift className="w-5 h-5 inline mr-2" />
            Inscríbete ahora y obtén <span className="font-bold text-yellow-300">30% de descuento</span> + acceso a 3 masterclasses exclusivas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-10 py-5 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl hover:scale-105 inline-flex items-center justify-center gap-2">
              Inscribirme Ahora
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-white text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all backdrop-blur-sm inline-flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5" />
              Agendar Consultoría Gratis
            </button>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span>Sin compromiso</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span>Garantía 30 días</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span>Certificado incluido</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Companies Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-gray-600 dark:text-gray-400 font-semibold mb-6">
              Empresas que confían en nuestra formación
            </p>
            <div className="flex flex-wrap items-center justify-center gap-12 opacity-60">
              <div className="text-2xl font-bold text-gray-400">TechCorp</div>
              <div className="text-2xl font-bold text-gray-400">Innovate Solutions</div>
              <div className="text-2xl font-bold text-gray-400">Business Advisors</div>
              <div className="text-2xl font-bold text-gray-400">Global Ventures</div>
              <div className="text-2xl font-bold text-gray-400">Future Labs</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Todo lo que necesitas saber
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "¿Necesito experiencia previa para tomar los cursos?",
                a: "No necesariamente. Ofrecemos cursos para todos los niveles: principiante, intermedio y avanzado. Cada curso especifica claramente los requisitos previos."
              },
              {
                q: "¿Los certificados son reconocidos internacionalmente?",
                a: "Sí, nuestros certificados están avalados por instituciones reconocidas y son aceptados por empresas en todo el mundo. Incluyen un código de verificación único."
              },
              {
                q: "¿Cuánto tiempo tengo acceso al contenido del curso?",
                a: "Tienes acceso de por vida a todos los materiales del curso, incluyendo actualizaciones futuras. Aprende a tu propio ritmo sin presiones."
              },
              {
                q: "¿Ofrecen planes de pago o financiamiento?",
                a: "Sí, ofrecemos planes de pago flexibles en hasta 12 meses sin intereses. También tenemos descuentos por pago único y planes corporativos."
              },
              {
                q: "¿Qué pasa si no estoy satisfecho con el curso?",
                a: "Ofrecemos una garantía de satisfacción de 30 días. Si no estás satisfecho, te devolvemos el 100% de tu inversión sin preguntas."
              },
              {
                q: "¿Puedo tomar varios cursos al mismo tiempo?",
                a: "¡Por supuesto! Muchos estudiantes toman múltiples cursos. Te recomendamos nuestros paquetes con descuento para optimizar tu aprendizaje."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {faq.q}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              ¿Tienes más preguntas?
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all inline-flex items-center gap-2">
              Contactar Soporte
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}