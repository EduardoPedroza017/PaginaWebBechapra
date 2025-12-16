import React from 'react';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { TranslateText } from '@/components/TranslateText';
import ServiceHero from '../capital-humano/components/ServiceHero';
import BenefitsSection from '../capital-humano/components/BenefitsSection';
import ContactSection from '../capital-humano/components/ContactSection';
import CTASection from '../capital-humano/components/CTASection';
import Footer from '@/components/Footer';

type Props = {
  params: { slug: string }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  // Try to fetch a dedicated service page by handle first (try encoded and raw)
  try {
    const attempts = [slug, decodeURIComponent(slug)];
    for (const h of attempts) {
      try {
        const pageRes = await fetch(`${API}/api/service_pages/${encodeURIComponent(h)}`);
        if (pageRes.ok) {
          const page = await pageRes.json();
          const heroImage = page.heroImage && String(page.heroImage).startsWith('http') ? page.heroImage : '';
          const benefits = (page.benefits || []).map((b: any) => ({ title: b.title || b.name || '', desc: b.description || b.desc || '' }));
          return (
            <>
              <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
              <ServiceHero
                title={page.heroTitle || ''}
                description={page.heroSubtitle || ''}
                imageSrc={heroImage || '/images/placeholder-hero.jpg'}
                imageAlt={page.heroTitle || ''}
              />

              <BenefitsSection title={`Beneficios de ${page.heroTitle || ''}`} benefits={benefits} imageSrc={heroImage || '/images/placeholder-hero.jpg'} imageAlt={page.heroTitle || ''} />

              <CTASection title={page.heroTitle || 'Conoce más'} subtitle={page.heroSubtitle || ''} imageSrc={heroImage || '/images/placeholder-hero.jpg'} imageAlt={page.heroTitle || ''} />

              <ContactSection title={`Contáctanos sobre ${page.heroTitle || ''}`} subtitle={"Estamos listos para ayudarte"} />
              </main>
              <Footer />
            </>
          );
        }
      } catch (e) {
        console.error('service_pages fetch failed for', h, e);
      }
    }
  } catch (err) {
    console.error('Error fetching service_page', err);
  }

  // Fallback: try legacy services/cards endpoint
  try {
    // As a last resort, fetch all cards and try to match by slug/name
    const listRes = await fetch(`${API}/api/services/cards`);
    if (listRes.ok) {
      const list = await listRes.json();
      const decoded = decodeURIComponent(slug).toLowerCase();
      const match = list.find((s: any) => {
        const candidates = [s.slug, s.handle, s.name].filter(Boolean).map((v: string) => String(v).toLowerCase());
        return candidates.includes(decoded);
      });
      if (match) {
        // render same fallback layout
        const data = match;
        return (
          <>
            <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
            <div className="max-w-5xl mx-auto py-20 px-4">
              <div className="rounded-3xl overflow-hidden shadow-lg">
                {data.image && (
                  <div className="h-72 w-full relative">
                    <img src={data.image} alt={data.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                )}
                <div className="p-8 bg-white dark:bg-slate-900">
                  <div className="flex items-start gap-6">
                    {data.icon && <img src={data.icon} alt="icon" className="w-16 h-16 object-contain" />}
                    <div>
                      <h1 className="text-3xl font-extrabold mb-2">{data.name}</h1>
                      <p className="text-slate-500 dark:text-slate-400">{data.description}</p>
                    </div>
                  </div>

                  <div className="mt-6 prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
                    <p>{data.description}</p>
                  </div>

                  <div className="mt-6">
                    <a className="inline-flex items-center gap-2 text-blue-600 font-semibold">
                      <TranslateText text="Conocer más" /> <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            </main>
            <Footer />
          </>
        );
      }
    }
  } catch (err) {
    console.error('Error fetching services list', err);
  }

  return notFound();
}
