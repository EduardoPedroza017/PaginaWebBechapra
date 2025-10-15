import Link from "next/link";


const groups = [
{
title: "Capital Humano",
href: "/servicios/capital-humano",
items: [
{ title: "Servicios especializados", href: "/servicios/servicios-especializados" },
{ title: "Payrolling", href: "/servicios/payroll" },
{ title: "Atracción de Talento", href: "/servicios/atraccion-de-talento" },
],
},
{
title: "Desarrollo Organizacional",
href: "/servicios/desarrollo-organizacional",
items: [
{ title: "Desarrollo organizacional", href: "/servicios/desarrollo-organizacional" },
{ title: "Capacitación Empresarial", href: "/servicios/capacitacion-empresarial" },
{ title: "NOM 035", href: "/servicios/nom-035" },
],
},
{
title: "Management Services",
href: "/servicios/management-services",
items: [
{ title: "Servicios Contables", href: "/servicios/servicios-contables" },
{ title: "Servicios Legales", href: "/servicios/servicios-legales" },
{ title: "Servicios PYME", href: "/servicios/servicios-pyme" },
],
},
] as const;


export default function ServiciosIndex() {
return (
<>
{/* Encabezado con 3D simple a un lado */}
<section className="grid items-center gap-8 md:grid-cols-2">
<div>
<h1 className="text-balance text-4xl font-semibold leading-tight md:text-5xl">Servicios</h1>
<p className="mt-3 max-w-xl text-white/75">Explora nuestras tres líneas principales y entra a cada subservicio.</p>
<a href="#fin-servicios" className="glass-btn-secondary mt-4 inline-flex">Más info</a>
</div>
<div className="relative aspect-[4/3] w-full">
<div className="absolute inset-0 rounded-3xl border p-1 backdrop-blur-xl" style={{ borderColor:'rgba(255,255,255,0.15)', background:'var(--brand-secondary-15)' }}>
<div className="glass-inset h-full w-full rounded-[22px] grid place-items-center">
<div className="size-36 rounded-full" style={{ background:'radial-gradient(circle at 30% 30%, var(--brand-primary-15), transparent 60%)' }} />
</div>
</div>
</div>
</section>


{/* 3 columnas con subservicios */}
<section className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
{groups.map((g) => (
<div key={g.title} className="glass-card">
<Link href={g.href} className="text-lg font-semibold hover:underline">{g.title}</Link>
<ul className="mt-3 space-y-2 text-sm text-white/80">
{g.items.map((it) => (
<li key={it.title}>
<Link className="hover:underline" href={it.href}>{it.title}</Link>
</li>
))}
</ul>
</div>
))}
</section>


{/* Más info → final de página */}
<div id="fin-servicios" className="mt-16" />
</>
);
}