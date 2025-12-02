"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Calendar, ExternalLink } from "lucide-react";
import Footer from "@/components/Footer";


export default function PressDetailPage() {
  interface PressItem {
    id: string;
    title: string;
    date: string;
    excerpt: string;
    link?: string;
    file_url?: string;
  }
  const params = useParams();
  const router = useRouter();
  const [press, setPress] = useState<PressItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params?.id) return;
    fetch(`http://localhost:5000/api/press`)
      .then(res => res.json())
      .then((data: PressItem[]) => {
        // Buscar por id
        const found = data.find((item: PressItem) => item.id === params.id);
        setPress(found || null);
      })
      .finally(() => setLoading(false));
  }, [params]);

  if (loading) {
    return <div className="text-center py-16 text-[#003d8f] text-xl">Cargando comunicado...</div>;
  }
  if (!press) {
    return <div className="text-center py-16 text-[#666] text-xl">Comunicado no encontrado</div>;
  }

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-8">
        <section className="w-full max-w-2xl mx-auto">
          <button
            onClick={() => router.back()}
            className="mb-8 px-6 py-2 bg-[#003d8f] text-white rounded-lg font-bold hover:bg-[#2563eb] transition text-base shadow-md"
          >
            ← Volver a Comunicados
          </button>
          <article className="bg-white rounded-3xl shadow-xl p-10 border border-[#e3eaf6]">
            <div className="flex items-center gap-3 mb-6 text-[#003d8f]">
              <Calendar size={22} />
              <span className="text-lg font-semibold">
                {new Date(press.date).toLocaleDateString('es-MX', {day: 'numeric', month: 'long', year: 'numeric'})}
              </span>
            </div>
            <h1 className="text-4xl font-black text-[#003d8f] mb-3 leading-tight tracking-tight">
              {press.title}
            </h1>
            <hr className="my-5 border-[#e3eaf6]" />
            <p className="text-lg text-[#222] mb-7 leading-relaxed whitespace-pre-line">
              {press.excerpt}
            </p>
            {press.link && (
              <a
                href={press.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#003d8f] font-bold text-[1.08rem] no-underline transition-colors duration-200 hover:underline mb-7"
              >
                Ver enlace externo <ExternalLink size={17} />
              </a>
            )}
            {press.file_url && (
              <div className="mt-8 flex flex-col gap-2">
                <span className="text-[#003d8f] font-semibold text-[1rem]">Archivo adjunto:</span>
                <a
                  href={`http://localhost:5000${press.file_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3 bg-[#003d8f] text-white rounded-xl font-bold text-base shadow hover:bg-[#2563eb] transition w-fit"
                  download
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0 0l-6-6m6 6l6-6" />
                  </svg>
                  Descargar archivo
                  {press.file_url.split('/').pop() && (
                    <span className="ml-2 text-xs font-normal text-[#e3eaf6] bg-[#003d8f]/30 px-2 py-0.5 rounded">{press.file_url.split('/').pop()}</span>
                  )}
                </a>
              </div>
            )}
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}
