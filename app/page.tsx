import Link from "next/link";
import NeonButton from "../components/NeonButton";
import HeroParticles from "../components/HeroParticles";

export default function Home() {
  return (
    <>
      {/* HERO con texto + partículas ligero */}
      <section className="relative grid items-center gap-10 md:grid-cols-2 brand-bubbles futuristic-bg">
        <div>
          <h1 className="text-balance text-4xl font-semibold leading-tight md:text-6xl glow-heading">
            Soluciones que impulsan tu talento y operación
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-white/75">
            Capital Humano, Desarrollo Organizacional y Management Services
            integrados bajo una misma marca.
          </p>
          <div className="mt-6 flex gap-3">
            <NeonButton href="/servicios">Ver servicios</NeonButton>
            <NeonButton href="#final" className="">Más info</NeonButton>
          </div>
        </div>

        {/* Marco con canvas de partículas y glass-card */}
        <div className="hero-frame aspect-[4/3] w-full md:aspect-[5/4]">
          <div className="glass-card h-full w-full relative" style={{ borderRadius: '24px', overflow: 'hidden' }}>
            <HeroParticles />
            {/* Decorative SVG: subtle animated lines (CSS animation) */}
            <svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style={{ position: 'relative', zIndex: 1 }}>
              <defs>
                <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.04)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.01)" />
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#g1)" />
            </svg>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="mt-20">
        <h2 className="text-2xl font-semibold md:text-3xl">Servicios</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Link href="/servicios/capital-humano" className="card-service block p-5">
            <h3 className="text-lg font-semibold">Capital Humano</h3>
            <ul className="mt-2 space-y-1 text-sm">
              <li>Servicios especializados</li>
              <li>Payrolling</li>
              <li>Atracción de Talento</li>
            </ul>
          </Link>

          <Link href="/servicios/desarrollo-organizacional" className="card-service block p-5">
            <h3 className="text-lg font-semibold">Desarrollo Organizacional</h3>
            <ul className="mt-2 space-y-1 text-sm">
              <li>Desarrollo organizacional</li>
              <li>Capacitación Empresarial</li>
              <li>NOM 035</li>
            </ul>
          </Link>

          <Link href="/servicios/management-services" className="card-service block p-5">
            <h3 className="text-lg font-semibold">Management Services</h3>
            <ul className="mt-2 space-y-1 text-sm">
              <li>Servicios Contables</li>
              <li>Servicios Legales</li>
              <li>Servicios PYME</li>
            </ul>
          </Link>
        </div>
      </section>

      {/* DIVISIONES */}
      <section className="mt-20">
        <h2 className="text-2xl font-semibold md:text-3xl">Divisiones de Bechapra</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { t: "BTC" },
            { t: "Bechapra Studio" },
            { t: "Otro" },
          ].map((d) => (
            <button key={d.t} className="surface-light px-4 py-3 text-left hover:brightness-105 transition">
              {d.t}
            </button>
          ))}
        </div>
      </section>

      {/* CTA + REDES */}
      <section className="mt-20 grid items-center gap-6 md:grid-cols-[1fr_auto]">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">¿Listo para comenzar?</h3>
          <p className="text-white/70">Agenda una llamada o escríbenos en redes.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href="#final" className="cta-primary">¡Agende ahora!</a>
          {["LinkedIn", "Facebook", "Instagram", "YouTube"].map((n) => (
            <button key={n} className="nav-pill">{n}</button>
          ))}
        </div>
      </section>

      {/* CARRUSEL PREMIOS (horizontal placeholder) */}
      <section className="mt-20">
        <h2 className="text-2xl font-semibold md:text-3xl">Premios</h2>
        <div className="mt-6 overflow-x-auto [scroll-snap-type:x_mandatory]">
          <div className="flex min-w-max gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="surface-light grid h-28 w-64 shrink-0 place-items-center text-[color:rgba(15,23,42,0.6)] [scroll-snap-align:start]"
              >
                Próximamente
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM + FOOTER */}
      <section id="final" className="mt-20">
        <h2 className="text-2xl font-semibold md:text-3xl">Solicitar información</h2>
        <form className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <input className="input-light" placeholder="Nombre" />
          <input className="input-light" placeholder="Email" type="email" />
          <textarea className="input-light md:col-span-2" placeholder="Mensaje" rows={4} />
          <button className="cta-primary md:col-span-2 w-fit">Enviar</button>
        </form>
      </section>
    </>
  );
}
