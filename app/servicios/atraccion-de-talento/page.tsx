import Link from "next/link";

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
    },
    {
      n: "02",
      title: "Sourcing & hunting",
      desc:
        "Research activo, base de candidatos, job boards y hunting directo. Priorizamos velocidad y calidad.",
    },
    {
      n: "03",
      title: "Entrevistas & filtros",
      desc:
        "Entrevista por competencias, validación de motivadores, salary match y cultura. Reporte corto por candidato.",
    },
    {
      n: "04",
      title: "Shortlist & agenda",
      desc:
        "Envío de terna con comparativo. Coordinamos entrevistas con líderes y damos seguimiento.",
    },
    {
      n: "05",
      title: "Validaciones",
      desc:
        "Socioeconómico / referencias (si aplica). Cierre de oferta y fecha de ingreso con candidato.",
    },
    {
      n: "06",
      title: "Garantía",
      desc:
        "Periodo de sustitución sin costo según acuerdo. Retro continua y cierre del proceso.",
    },
  ];

  const kpis = [
    { label: "Tiempo de respuesta", value: "< 48h", note: "presentación de primeros CVs" },
    { label: "Time To Fill", value: "7–21 días", note: "según seniority y ciudad" },
    { label: "Tasa de aceptación", value: "85%+", note: "de ternas presentadas" },
    { label: "Satisfacción", value: "NPS 9.0", note: "post–colocación" },
  ];

  const positions = [
    "Administrativo", "Backoffice", "Ventas", "Operativo",
    "TI / Soporte", "Finanzas", "Bilingüe", "Atención a clientes",
  ];

  const modalities = [
    {
      title: "Headhunting puntual",
      desc:
        "Búsqueda especializada por vacante. Pago por éxito con garantía de sustitución.",
    },
    {
      title: "Reclutamiento masivo",
      desc:
        "Perfiles operativos/volumen. Procesos paralelos y filtros rápidos para cubrir picos.",
    },
    {
      title: "RPO / célula dedicada",
      desc:
        "Equipo Bechapra integrado a tu operación para cubrir múltiples vacantes mes a mes.",
    },
  ];

  return (
    <>
      {/* HERO */}
      <section className="brand-bubbles grid items-center gap-10 md:grid-cols-[1.1fr_.9fr]">
        <div>
          <span className="nav-pill mb-4 inline-flex">Capital Humano</span>
          <h1 className="text-balance text-4xl font-semibold leading-tight md:text-5xl">
            Atracción de Talento
          </h1>
          <p className="mt-4 max-w-xl text-white/75">
            Reclutamos perfiles operativos, administrativos y especializados con un
            proceso claro, reportes útiles y tiempos comprometidos.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#proceso" className="nav-pill">Ver proceso</a>
            <a href="#kpis" className="nav-pill">Indicadores</a>
            <Link href="/servicios/servicios-especializados" className="nav-pill">
              Servicios especializados
            </Link>
          </div>
        </div>
        {/* Placeholder de arte/imagen */}
        <div
          aria-hidden
          className="hero-frame aspect-[5/4] w-full"
          title="Espacio para imagen/arte"
        />
      </section>

      {/* QUÉ RESOLVEMOS / DIFERENCIALES */}
      <section className="mt-16 grid gap-6 md:grid-cols-3">
        <div className="surface-blue p-6">
          <h3 className="text-lg font-semibold">Enfoque en el negocio</h3>
          <p className="mt-2 text-white/90">
            Te liberamos de la operación de reclutamiento para que tus líderes se
            concentren en resultados.
          </p>
        </div>
        <div className="surface-light p-6">
          <h3 className="text-lg font-semibold text-[color:#0f172a]">
            Comunicación y visibilidad
          </h3>
          <p className="mt-2 text-[color:rgba(15,23,42,.75)]">
            Seguimiento semanal, tablero simple de estatus y retro por candidato.
          </p>
        </div>
        <div className="card-service p-6">
          <h3 className="text-lg font-semibold">Calidad + velocidad</h3>
          <p className="mt-2 text-white/80">
            Primeros CVs en 24–48h y shortlist accionable. Evaluación por
            competencias y cultura.
          </p>
        </div>
      </section>

      {/* PERFILES / COBERTURA */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold md:text-3xl">Perfiles que cubrimos</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {positions.map((p) => (
            <span key={p} className="nav-pill">{p}</span>
          ))}
        </div>
      </section>

      {/* PROCESO */}
      <section id="proceso" className="mt-20">
        <h2 className="text-2xl font-semibold md:text-3xl">Nuestro proceso</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="card-service p-5">
              <div className="text-sm text-white/70">{s.n}</div>
              <h3 className="mt-1 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-white/75">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* KPIs */}
      <section id="kpis" className="mt-20">
        <h2 className="text-2xl font-semibold md:text-3xl">Indicadores de servicio</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {kpis.map((k) => (
            <div key={k.label} className="surface-light p-5 text-center">
              <div className="text-2xl font-semibold text-[color:#0f172a]">{k.value}</div>
              <div className="mt-1 text-sm text-[color:rgba(15,23,42,.75)]">{k.label}</div>
              <div className="text-xs text-[color:rgba(15,23,42,.55)]">{k.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MODALIDADES */}
      <section className="mt-20">
        <h2 className="text-2xl font-semibold md:text-3xl">Modalidades</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {modalities.map((m, i) => (
            <div
              key={m.title}
              className={`${i === 0 ? "surface-blue" : i === 1 ? "surface-light" : "card-service"} p-6`}
            >
              <h3 className="text-lg font-semibold">
                {m.title}
              </h3>
              <p className={`mt-2 ${i === 1 ? "text-[color:rgba(15,23,42,.75)]" : "text-white/85"}`}>
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mt-20 grid items-center gap-6 rounded-2xl p-6 md:grid-cols-[1fr_auto] card-service">
        <div>
          <h3 className="text-xl font-semibold">¿Listos para iniciar una búsqueda?</h3>
          <p className="mt-1 text-white/75">
            Agenda una llamada y armamos juntos el perfil ideal y los tiempos de
            cobertura.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href="#final" className="cta-primary">Agendar llamada</a>
          <Link href="/servicios/payroll" className="nav-pill">Ver Payrolling</Link>
        </div>
      </section>

      {/* Espacio para formulario global de la página (lo ignoro por tu instrucción) */}
      <div id="final" className="mt-12" />
    </>
  );
}
