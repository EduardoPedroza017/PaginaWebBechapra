import { notFound } from "next/navigation";
import { ArrowUpRight, CheckCircle2, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ServiceHero from "../capital-humano/components/ServiceHero";
import BenefitsSection from "../capital-humano/components/BenefitsSection";
import ContactSection from "../capital-humano/components/ContactSection";
import CTASection from "../capital-humano/components/CTASection";
import SpotlightCTA from "@/app/components/SpotlightCTA";
import Footer from "@/components/Footer";
import Section from "@/app/components/Section";
import { TranslateText } from "@/components/TranslateText";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const API = process.env.NEXT_PUBLIC_API_URL;

  try {
    const attempts = [slug, decodeURIComponent(slug)];
    for (const h of attempts) {
      try {
        const pageRes = await fetch(`${API}/api/service_pages/${encodeURIComponent(h)}`);
        if (pageRes.ok) {
          const page = await pageRes.json();
          const heroImage = page.heroImage ? (String(page.heroImage).startsWith("http") ? page.heroImage : `${API}${page.heroImage}`) : "";
          const benefits = (page.benefits || []).map((b: any) => ({ title: b.title || b.name || "", desc: b.description || b.desc || "" }));

          return (
            <>
              <main className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
                <ServiceHero title={page.heroTitle || ""} description={page.heroSubtitle || ""} imageSrc={heroImage || ""} imageAlt={page.heroTitle || ""} />
                <BenefitsSection title={`Beneficios de ${page.heroTitle || ""}`} benefits={benefits} imageSrc={heroImage || ""} imageAlt={page.heroTitle || ""} />
                <CTASection title={page.heroTitle || "Conoce mas"} subtitle={page.heroSubtitle || ""} imageSrc={heroImage || ""} imageAlt={page.heroTitle || ""} />
                <SpotlightCTA
                  eyebrow="Servicio dinamico"
                  title={`Impulsemos ${page.heroTitle || "tu estrategia"}`}
                  subtitle={page.heroSubtitle || "Una experiencia mas clara, elegante y orientada a resultados para presentar este servicio."}
                  imageSrc={heroImage || "/web/image/hero/Flayers_Home_01100.jpg"}
                  imageAlt={page.heroTitle || "Servicio"}
                  primaryLink="/#contacto"
                  primaryLabel="Solicitar informacion"
                  secondaryLink="/servicios"
                  secondaryLabel="Ver mas servicios"
                />
                <ContactSection title={`Contactanos sobre ${page.heroTitle || ""}`} subtitle="Estamos listos para ayudarte" />
              </main>
              <Footer />
            </>
          );
        }
      } catch (e) {
        console.error("service_pages fetch failed for", h, e);
      }
    }
  } catch (err) {
    console.error("Error fetching service_page", err);
  }

  try {
    const listRes = await fetch(`${API}/api/services/cards`);
    if (listRes.ok) {
      const list = await listRes.json();
      const decoded = decodeURIComponent(slug).toLowerCase();
      const match = list.find((s: any) => {
        const candidates = [s.slug, s.handle, s.name].filter(Boolean).map((v: string) => String(v).toLowerCase());
        return candidates.includes(decoded);
      });

      if (match) {
        const normalize = (url: string | undefined) => (url && String(url).startsWith("/uploads/") ? `${API}${url}` : url);
        const imageSrc = normalize(match.image);
        const iconSrc = normalize(match.icon);

        return (
          <>
            <main className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
              <section className="relative overflow-hidden bg-linear-to-br from-slate-950 via-blue-950 to-blue-700 px-4 py-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_28%)]" />
                <div className="relative mx-auto max-w-6xl">
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-blue-200">
                    <Sparkles size={14} />
                    <TranslateText text="Servicio personalizado" />
                  </div>
                  <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                    <div>
                      <h1 className="text-4xl font-black tracking-tight text-white lg:text-6xl">
                        <TranslateText text={match.name} />
                      </h1>
                      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
                        <TranslateText text={match.description} />
                      </p>
                      <div className="mt-10 flex flex-wrap gap-4">
                        <Link href="/#contacto" className="rounded-2xl bg-blue-600 px-8 py-4 font-black text-white shadow-xl transition-all hover:-translate-y-0.5 hover:bg-blue-500">
                          <TranslateText text="Solicitar informacion" />
                        </Link>
                        <Link href="/servicios" className="rounded-2xl border border-white/15 bg-white/5 px-8 py-4 font-black text-white transition-all hover:bg-white/10">
                          <TranslateText text="Volver a servicios" />
                        </Link>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute -inset-6 rounded-[2.5rem] bg-blue-600/10 blur-3xl" />
                      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-md">
                        <div className="relative aspect-[16/11]">
                          {imageSrc ? (
                            <Image src={imageSrc} alt={match.name} fill className="object-cover" unoptimized={String(imageSrc).startsWith("http")} />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                              <div className="text-white/50">
                                <TranslateText text="Sin imagen" />
                              </div>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <Section variant="white" size="lg">
                <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
                  <div className="rounded-[2.5rem] border border-slate-200/70 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900/80">
                    <div className="mb-5 inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-blue-700 dark:border-blue-800/50 dark:bg-blue-950/30 dark:text-blue-300">
                      <TranslateText text="Identidad del servicio" />
                    </div>
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-600/20">
                      {iconSrc ? <Image src={iconSrc} alt="icon" width={36} height={36} className="object-contain" unoptimized={String(iconSrc).startsWith("http")} /> : <Sparkles size={28} />}
                    </div>
                    <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                      <TranslateText text={match.name} />
                    </h2>
                    <p className="mt-4 font-medium leading-relaxed text-slate-500 dark:text-slate-400">
                      <TranslateText text={match.description} />
                    </p>
                  </div>

                  <div className="rounded-[2.5rem] border border-slate-200/70 bg-gradient-to-br from-white via-blue-50/40 to-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900/80">
                    <div className="mb-5 inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-blue-700 dark:border-blue-800/50 dark:bg-blue-950/30 dark:text-blue-300">
                      <TranslateText text="Que aporta este servicio" />
                    </div>
                    <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                      <TranslateText text="Una presentacion mas clara, mas robusta y mejor jerarquizada" />
                    </h3>
                    <p className="mt-5 max-w-2xl font-medium leading-relaxed text-slate-500 dark:text-slate-400">
                      <TranslateText text="Esta ruta dinamica ahora tambien conserva una narrativa visual mas consistente para que los servicios creados desde backend no se sientan aislados respecto al resto del sitio." />
                    </p>
                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                      {["Jerarquia visual mas fuerte", "Bloque de valor mas claro", "Cierre premium con CTA", "Mejor continuidad con la marca"].map((item) => (
                        <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-4 dark:border-slate-800 dark:bg-slate-900/60">
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
                            <CheckCircle2 size={18} />
                          </div>
                          <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                            <TranslateText text={item} />
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 border-t border-slate-200/70 pt-6 dark:border-slate-800">
                      <Link href="/#contacto" className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                        <TranslateText text="Conocer mas" />
                        <ArrowUpRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </Section>

              <SpotlightCTA
                eyebrow="Siguiente paso"
                title={`Activa una conversacion sobre ${match.name}`}
                subtitle="Lleva este servicio a una conversacion concreta con una experiencia mas coherente con el resto del frontend."
                imageSrc={imageSrc || "/web/image/hero/Flayers_Home_01100.jpg"}
                imageAlt={match.name}
                primaryLink="/#contacto"
                primaryLabel="Hablar con un asesor"
                secondaryLink="/servicios"
                secondaryLabel="Explorar servicios"
                theme="blue"
              />
            </main>
            <Footer />
          </>
        );
      }
    }
  } catch (err) {
    console.error("Error fetching services list", err);
  }

  return notFound();
}
