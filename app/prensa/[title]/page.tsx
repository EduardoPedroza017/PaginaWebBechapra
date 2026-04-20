"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import DOMPurify from "dompurify";
import Footer from "@/components/Footer";
import Section from "@/app/components/Section";
import {
  ArrowLeft,
  Share2,
  Bookmark,
  Clock,
  Calendar,
  User,
  Twitter,
  Facebook,
  Linkedin,
  FileText,
  Download,
  Share
} from "lucide-react";

interface PressItem {
  id?: string;
  title: string;
  description?: string;
  excerpt?: string;
  content?: string;
  date?: string;
  file_url?: string;
  author?: string;
  readTime?: number;
  tags?: string[];
}

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);
  const updateProgress = useCallback(() => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const currentProgress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    setProgress(Math.min(100, Math.max(0, currentProgress)));
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, [updateProgress]);

  return (
    <div className="fixed top-0 left-0 right-0 h-1.5 bg-slate-100 dark:bg-slate-900 z-100">
      <div className="h-full bg-blue-600 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(37,99,235,0.5)]" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default function PrensaDetalle() {
  const [article, setArticle] = useState<PressItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const parts = pathname?.split("/").filter(Boolean) || [];
    const slug = parts[parts.length - 1];

    const fetchArticle = async () => {
      try {
        const base = process.env.NEXT_PUBLIC_API_URL || "";
        const res = await fetch(`${base}/api/press/${slug}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        const contentHtml = data.content || data.body || data.html || data.description || "";
        setArticle({
          id: data.id || slug,
          title: data.title || slug,
          description: data.excerpt || "",
          content: contentHtml,
          date: data.published_date || data.date || new Date().toISOString(),
          file_url: data.file_url || data.image_url,
          author: data.author || "Bausen Comunicación",
          readTime: data.readTime || 4,
          tags: data.tags || ["Comunicado Oficial"]
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [pathname]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  if (!article) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <ReadingProgress />

      {/* Press Hero */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden bg-slate-950">
        {article.file_url ? (
          <Image
            src={article.file_url.startsWith("http") ? article.file_url : `${process.env.NEXT_PUBLIC_API_URL}${article.file_url}`}
            alt={article.title}
            fill
            className="object-cover opacity-50"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-slate-900 to-slate-950" />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col justify-end pb-20">
          <Link href="/prensa" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors group">
            <div className="p-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 group-hover:bg-blue-600 transition-all">
              <ArrowLeft size={16} />
            </div>
            <span className="text-xs font-black uppercase tracking-widest">Volver a Prensa</span>
          </Link>

          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-2 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest">
                Comunicado Oficial
              </span>
            </div>
            <h1 className="text-4xl lg:text-7xl font-black text-white leading-[1.05] tracking-tighter mb-8 italic">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-8 text-white/60">
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-blue-400" />
                <div className="text-xs font-black uppercase tracking-widest">{article.author}</div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar size={18} className="text-blue-400" />
                <div className="text-xs font-black uppercase tracking-widest">{new Date(article.date!).toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <Section variant="white" size="lg">
        <div className="max-w-4xl mx-auto">
          {article.description && (
            <p className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-16 leading-tight border-l-4 border-blue-600 pl-8 italic">
              {article.description}
            </p>
          )}

          <div 
            className="prose prose-xl dark:prose-invert max-w-none 
              prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-slate-900 dark:prose-headings:text-white
              prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:leading-relaxed prose-p:mb-8 text-justify
              prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:font-black prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-[2.5rem] prose-img:shadow-2xl
              prose-blockquote:border-l-0 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-slate-900 prose-blockquote:p-10 prose-blockquote:rounded-[2rem]"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content || "") }}
          />

          {/* Press Resources Sidebar-like CTA */}
          <div className="mt-20 p-10 rounded-[3rem] bg-slate-950 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h4 className="text-2xl font-black mb-2 tracking-tight">Recursos para Medios</h4>
                <p className="text-slate-400 font-medium">Descargue el comunicado en PDF y materiales gráficos adjuntos.</p>
              </div>
              <div className="flex gap-4">
                <button className="flex items-center gap-3 px-8 py-4 bg-blue-600 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-500 transition-all">
                  <Download size={18} />
                  Descargar PDF
                </button>
                <button className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all">
                  <Share size={18} />
                  Compartir
                </button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
