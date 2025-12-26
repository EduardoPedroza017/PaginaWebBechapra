import React from 'react';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
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

  // Try to fetch a dedicated service page by handle first (try encoded and raw)c
  try {
    const attempts = [slug, decodeURIComponent(slug)];
    for (const h of attempts) {
      try {
        const pageRes = await fetch(`${API}/api/service_pages/${encodeURIComponent(h)}`);
        if (pageRes.ok) {
          const page = await pageRes.json();
          const heroImage = page.heroImage ? (String(page.heroImage).startsWith('http') ? page.heroImage : `${API}${page.heroImage}`) : '';
          const benefits = (page.benefits || []).map((b: any) => ({ title: b.title || b.name || '', desc: b.description || b.desc || '' }));
          return (
            <>
              <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
              <ServiceHero
                title={page.heroTitle || ''}
                description={page.heroSubtitle || ''}
                imageSrc={heroImage || ''}
                imageAlt={page.heroTitle || ''}
              />

              <BenefitsSection title={`Beneficios de ${page.heroTitle || ''}`} benefits={benefits} imageSrc={heroImage || ''} imageAlt={page.heroTitle || ''} />

              <CTASection title={page.heroTitle || 'Conoce más'} subtitle={page.heroSubtitle || ''} imageSrc={heroImage || ''} imageAlt={page.heroTitle || ''} />

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
          const normalize = (url: string | undefined) => url && String(url).startsWith('/uploads/') ? `${API}${url}` : url;
          const imageSrc = normalize(data.image);
          const iconSrc = normalize(data.icon);
        return (
          <>
            <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
            <div className="max-w-5xl mx-auto py-20 px-4">
              <div className="rounded-3xl overflow-hidden shadow-lg">
                {imageSrc ? (
                  <div className="h-72 w-full relative">
                    <Image src={imageSrc} alt={data.name} fill className="object-cover" unoptimized={String(imageSrc).startsWith('http')} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                ) : (
                  <div className="h-72 w-full rounded-2xl bg-gradient-to-br from-slate-800/40 to-slate-900 flex items-center justify-center">
                    <svg className="w-12 h-12 text-white/40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="5" width="18" height="14" rx="2" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
                      <path d="M3 19l4-4 3 3 5-5 6 6" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )} 
                <div className="p-8 bg-white dark:bg-slate-900">
                  <div className="flex items-start gap-6">
                    {iconSrc ? (
                      <Image src={iconSrc} alt="icon" width={64} height={64} className="object-contain" unoptimized={String(iconSrc).startsWith('http')} />
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-md flex items-center justify-center text-white">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 12a4 4 0 100-8 4 4 0 000 8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M4 20a8 8 0 0116 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
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
