import Link from "next/link";
import { User, Clock, Target, CheckCircle, TrendingUp, Award } from "lucide-react";

export const metadata = {
  title: "Atracción de Talento | Bechapra",
  description:
    "Reclutamiento ágil y efectivo: perfiles operativos, administrativos y especializados con indicadores claros y un proceso transparente.",
};

export default function Page() {
  const steps = [
    {
      n: "01",
      title: "Brief & perfil",
      desc:
        "Definimos objetivos, perfil ideal, tiempos y KPI. Acordamos el canal de comunicación y responsables.",
      icon: "📋",
    },
    {
      n: "02",
      title: "Sourcing & hunting",
      desc:
        "Research activo, base de candidatos, job boards y hunting directo. Priorizamos velocidad y calidad.",
      icon: "🔍",
    },
    {
      n: "03",
      title: "Entrevistas & filtros",
      desc:
        "Entrevista por competencias, validación de motivadores, salary match y cultura. Reporte corto por candidato.",
      icon: "💬",
    },
    {
      n: "04",
      title: "Shortlist & agenda",
      desc:
        "Envío de terna con comparativo. Coordinamos entrevistas con líderes y damos seguimiento.",
      icon: "📊",
    },
    {
      n: "05",
      title: "Validaciones",
      desc:
        "Socioeconómico / referencias (si aplica). Cierre de oferta y fecha de ingreso con candidato.",
      icon: "✓",
    },
    {
      n: "06",
      title: "Garantía",
      desc:
        "Periodo de sustitución sin costo según acuerdo. Retro continua y cierre del proceso.",
      icon: "🛡️",
    },
  ];

  const kpis = [
    { 
      label: "Tiempo de respuesta", 
      value: "< 48h", 
      note: "presentación de primeros CVs",
      icon: <Clock className="w-8 h-8" />,
    },
    { 
      label: "Time To Fill", 
      value: "7–21 días", 
      note: "según seniority y ciudad",
      icon: <TrendingUp className="w-8 h-8" />,
    },
    { 
      label: "Tasa de aceptación", 
      value: "85%+", 
      note: "de ternas presentadas",
      icon: <CheckCircle className="w-8 h-8" />,
    },
    { 
      label: "Satisfacción", 
      value: "NPS 9.0", 
      note: "post–colocación",
      icon: <Award className="w-8 h-8" />,
    },
  ];

  const positions = [
    "Administrativo", 
    "Backoffice", 
    "Ventas", 
    "Operativo",
    "TI / Soporte", 
    "Finanzas", 
    "Bilingüe", 
    "Atención a clientes",
  ];

  const modalities = [
    {
      title: "Headhunting puntual",
      desc:
        "Búsqueda especializada por vacante. Pago por éxito con garantía de sustitución.",
      icon: "🎯",
      features: [
        "Búsqueda especializada",
        "Pago por éxito",
        "Garantía de sustitución"
      ]
    },
    {
      title: "Reclutamiento masivo",
      desc:
        "Perfiles operativos/volumen. Procesos paralelos y filtros rápidos para cubrir picos.",
      icon: "👥",
      features: [
        "Alto volumen",
        "Procesos paralelos",
        "Filtros rápidos"
      ]
    },
    {
      title: "RPO / célula dedicada",
      desc:
        "Equipo Bechapra integrado a tu operación para cubrir múltiples vacantes mes a mes.",
      icon: "🤝",
      features: [
        "Equipo dedicado",
        "Integración completa",
        "Múltiples vacantes"
      ]
    },
  ];

  const benefits = [
    {
      title: "Enfoque en el negocio",
      desc: "Te liberamos de la operación de reclutamiento para que tus líderes se concentren en resultados.",
      icon: <Target className="w-10 h-10" />
    },
    {
      title: "Comunicación y visibilidad",
      desc: "Seguimiento semanal, tablero simple de estatus y retro por candidato.",
      icon: <User className="w-10 h-10" />
    },
    {
      title: "Calidad + velocidad",
      desc: "Primeros CVs en 24–48h y shortlist accionable. Evaluación por competencias y cultura.",
      icon: <TrendingUp className="w-10 h-10" />
    },
  ];

  return (
    <>
      {/* ===== HERO SECCIÓN ===== */}
      <section className="relative overflow-hidden">
        <div className="relative grid items-center gap-10 py-16 md:grid-cols-[1.2fr_0.8fr]">
          <div className="relative z-10">
            <span className="nav-pill mb-4 inline-flex items-center gap-2">
              <span className="text-2xl">👔</span>
              <span>Capital Humano</span>
            </span>
            <h1 className="text-balance text-5xl font-bold leading-tight md:text-6xl">
              Atracción de Talento
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/80 leading-relaxed">
              Reclutamos perfiles operativos, administrativos y especializados con un
              proceso claro, reportes útiles y tiempos comprometidos.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#proceso" className="cta-primary px-8 py-3">
                Ver proceso completo
              </a>
              <a href="#kpis" className="nav-pill">
                📊 Indicadores
              </a>
              <Link href="/servicios/servicios-especializados" className="nav-pill">
                ⚡ Servicios especializados
              </Link>
            </div>
          </div>
          
          {/* Espacio para imagen destacada */}
          <div className="relative">
            <div 
              className="rounded-2xl aspect-[4/5] w-full relative overflow-hidden border border-white/10"
              style={{
                background: 'linear-gradient(135deg, rgba(0,87,218,0.15), rgba(0,74,183,0.1))'
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="text-6xl mb-4">🎯</div>
                  <p className="text-white/60 text-sm">Espacio para imagen destacada</p>
                  <p className="text-white/40 text-xs mt-2">Recomendado: 800x1000px</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BENEFICIOS CLAVE ===== */}
      <section className="mt-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold md:text-4xl">¿Por qué elegirnos?</h2>
          <p className="mt-3 text-white/70 text-lg">Nuestros diferenciales que impulsan tu éxito</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          {benefits.map((benefit, i) => (
            <div 
              key={benefit.title}
              className={`relative rounded-2xl p-8 transition-all duration-200 hover:-translate-y-1 ${
                i === 0 
                  ? "surface-blue" 
                  : i === 1 
                  ? "surface-light" 
                  : "card-service"
              }`}
            >
              <div className="mb-6 inline-flex">
                <div className={i === 1 ? "text-[#0057da]" : "text-white"}>
                  {benefit.icon}
                </div>
              </div>
              
              <h3 className={`text-xl font-semibold mb-3 ${
                i === 1 ? "text-[#0f172a]" : "text-white"
              }`}>
                {benefit.title}
              </h3>
              <p className={`leading-relaxed ${
                i === 1 
                  ? "text-[color:rgba(15,23,42,.75)]" 
                  : "text-white/85"
              }`}>
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PERFILES ===== */}
      <section className="mt-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold md:text-4xl">Perfiles que cubrimos</h2>
          <p className="mt-3 text-white/70">Especialistas en múltiples áreas y niveles</p>
        </div>
        
        <div className="flex flex-wrap gap-3 justify-center">
          {positions.map((p) => (
            <span 
              key={p} 
              className="nav-pill px-6 py-3"
            >
              {p}
            </span>
          ))}
        </div>
      </section>

      {/* ===== PROCESO ===== */}
      <section id="proceso" className="mt-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold md:text-4xl">Nuestro proceso</h2>
          <p className="mt-3 text-white/70 text-lg">6 pasos para encontrar el talento perfecto</p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div 
              key={s.n} 
              className="card-service p-8 transition-all duration-200 hover:-translate-y-1 relative"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#0057da] flex items-center justify-center text-white font-bold text-sm">
                  {s.n}
                </div>
                <div className="text-4xl">{s.icon}</div>
              </div>
              
              <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
              <p className="text-white/75 leading-relaxed">{s.desc}</p>
              
              <div className="mt-6 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#0057da]" 
                  style={{ width: `${((i + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== KPIs ===== */}
      <section id="kpis" className="mt-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold md:text-4xl">Indicadores de servicio</h2>
          <p className="mt-3 text-white/70 text-lg">Resultados medibles y comprobados</p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {kpis.map((k) => (
            <div 
              key={k.label} 
              className="surface-light p-8 text-center hover:-translate-y-1 transition-all duration-200 relative"
            >
              <div className="mb-4 flex justify-center text-[#0057da]">
                {k.icon}
              </div>
              
              <div className="text-4xl font-bold text-[#0f172a] mb-2">
                {k.value}
              </div>
              
              <div className="text-base font-semibold text-[#0f172a] mb-1">
                {k.label}
              </div>
              
              <div className="text-sm text-[color:rgba(15,23,42,.55)]">
                {k.note}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== MODALIDADES ===== */}
      <section className="mt-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold md:text-4xl">Modalidades de servicio</h2>
          <p className="mt-3 text-white/70 text-lg">Elige la opción que mejor se adapte a tus necesidades</p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {modalities.map((m, i) => (
            <div
              key={m.title}
              className={`relative rounded-2xl p-8 transition-all duration-200 hover:-translate-y-1 ${
                i === 0 
                  ? "surface-blue" 
                  : i === 1 
                  ? "surface-light" 
                  : "card-service"
              }`}
            >
              <div className="text-5xl mb-6">{m.icon}</div>
              
              <h3 className={`text-2xl font-bold mb-4 ${
                i === 1 ? "text-[#0f172a]" : "text-white"
              }`}>
                {m.title}
              </h3>
              
              <p className={`mb-6 leading-relaxed ${
                i === 1 
                  ? "text-[color:rgba(15,23,42,.75)]" 
                  : "text-white/85"
              }`}>
                {m.desc}
              </p>
              
              <ul className="space-y-3">
                {m.features.map((feature) => (
                  <li 
                    key={feature}
                    className={`flex items-start gap-3 ${
                      i === 1 ? "text-[#0f172a]" : "text-white/90"
                    }`}
                  >
                    <span className={`text-xl ${
                      i === 1 ? "text-[#0057da]" : "text-white"
                    }`}>✓</span>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="mt-24">
        <div className="relative overflow-hidden rounded-3xl card-service p-10 md:p-16">
          <div className="relative z-10 grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <div className="text-5xl mb-6">🚀</div>
              <h3 className="text-3xl font-bold mb-4">¿Listos para iniciar una búsqueda?</h3>
              <p className="text-white/75 text-lg max-w-2xl">
                Agenda una llamada y armamos juntos el perfil ideal y los tiempos de
                cobertura. Nuestro equipo de expertos está listo para ayudarte.
              </p>
            </div>
            
            <div className="flex flex-col gap-4">
              <a 
                href="#final" 
                className="cta-primary text-center px-8 py-3"
              >
                📞 Agendar llamada
              </a>
              <Link 
                href="/servicios/payroll" 
                className="nav-pill text-center"
              >
                Ver Payrolling →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Espacio para formulario global */}
      <div id="final" className="mt-16" />
    </>
  );
}