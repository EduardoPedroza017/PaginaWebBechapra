"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import DOMPurify from "dompurify";
import Footer from "@/components/Footer";
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
  Eye,
  Check,
  Copy,
  Tag
} from "lucide-react";

interface PressItem {
  id?: string;
  title: string;
  description?: string;
  excerpt?: string;
  content?: string;
  date?: string;
  file_url?: string;
  altText?: string;
  author?: string;
  readTime?: number;
  tags?: string[];
}

interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
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
    <div
      className="fixed top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800 z-50"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progreso de lectura"
    >
      <div className="h-full bg-blue-600 transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
    </div>
  );
};

const ShareBar = ({ title, url }: { title: string; url: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error al copiar:", err);
    }
  };

  const shareLinks = [
    {
      platform: "x (Twitter)",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      color: "hover:text-blue-400"
    },
    {
      platform: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: "hover:text-blue-600"
    },
    {
      platform: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      color: "hover:text-blue-700"
    }
  ];

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleCopyLink}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm"
      >
        {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
        <span className="hidden sm:inline font-medium">{copied ? "¡Copiado!" : "Copiar enlace"}</span>
      </button>

      {shareLinks.map(({ platform, icon: Icon, url, color }) => (
        <a
          key={platform}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${color}`}
          aria-label={`Compartir en ${platform}`}
        >
          <Icon size={18} />
        </a>
      ))}

      <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label="Guardar en marcadores">
        <Bookmark size={18} />
      </button>
    </div>
  );
};

const TableOfContents = ({ items }: { items: TableOfContentsItem[] }) => {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -80% 0px" }
    );

    items.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="sticky top-24 bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm" aria-label="Tabla de contenidos">
      <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Contenido</h3>

      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} style={{ marginLeft: `${(item.level - 2) * 1}rem` }}>
            <a
              href={`#${item.id}`}
              className={`block py-1.5 text-sm transition-colors ${
                activeId === item.id
                  ? "text-blue-600 dark:text-blue-400 font-medium"
                  : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const ContentRenderer = ({ content }: { content: string }) => {
  const clean = DOMPurify.sanitize(content || "", {
    ALLOWED_TAGS: [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "br",
      "strong",
      "em",
      "u",
      "s",
      "blockquote",
      "ul",
      "ol",
      "li",
      "hr",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "img",
      "video",
      "audio",
      "source",
      "iframe",
      "a",
      "code",
      "pre",
      "span",
      "div",
      "sup",
      "sub"
    ],
    ALLOWED_ATTR: [
      "href",
      "target",
      "rel",
      "src",
      "alt",
      "title",
      "width",
      "height",
      "class",
      "id",
      "loading",
      "decoding",
      "srcset",
      "sizes",
      "frameborder",
      "allow",
      "allowfullscreen"
    ]
  });

  const parser = new DOMParser();
  const doc = parser.parseFromString(clean, "text/html");

  const headings = doc.querySelectorAll("h2, h3, h4");
  const toc: TableOfContentsItem[] = [];
  headings.forEach((heading, index) => {
    const id = (heading.textContent || `heading-${index}`)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    heading.id = id;
    toc.push({ id, title: heading.textContent || "", level: parseInt(heading.tagName.charAt(1)) });
  });

  doc.querySelectorAll("img").forEach((el) => {
    el.setAttribute("loading", "lazy");
    el.setAttribute("decoding", "async");
  });

  return { sanitizedContent: doc.body.innerHTML, tocItems: toc };
};

export default function PrensaDetalle() {
  const [article, setArticle] = useState<PressItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pathname = usePathname();

  useEffect(() => {
    const parts = pathname?.split("/").filter(Boolean) || [];
    const slug = parts[parts.length - 1];

    if (!slug) {
      setError("Slug no encontrado en la URL");
      setLoading(false);
      return;
    }

    const fetchArticle = async () => {
      try {
        const base = process.env.NEXT_PUBLIC_API_URL ? String(process.env.NEXT_PUBLIC_API_URL).replace(/\/$/, "") : "";
        const url = base ? `${base}/api/press/${slug}` : `/api/backend/press/${slug}`;

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`Error fetching detail: HTTP ${res.status}`);
        }

        const text = await res.text();
        let data: unknown = null;

        try {
          data = JSON.parse(text);
        } catch {
          data = { _raw: text };
        }

        const asRecord = (val: unknown): Record<string, unknown> => (typeof val === 'object' && val !== null) ? val as Record<string, unknown> : {};
        const record = asRecord(data);

        if ('_raw' in record && typeof record._raw === 'string') {
          setArticle({
            title: slug,
            description: "",
            content: String(record._raw),
            date: new Date().toISOString(),
          });
          return;
        }

        const contentHtml = String((record.content as string) || (record.body as string) || (record.html as string) || (record.description as string) || (record.excerpt as string) || '');

        const estimateReadTimeFromHtml = (html: string, wordsPerMinute = 200): number => {
          if (!html) return 0;
          const imgCount = (html.match(/<img\b/gi) || []).length;
          const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
          if (!text) return imgCount > 0 ? 1 : 0;
          const words = text.split(' ').length;
          const baseMinutes = Math.ceil(words / wordsPerMinute);
          const extraSeconds = imgCount * 12;
          const extraMinutes = Math.ceil(extraSeconds / 60);
          return Math.max(1, baseMinutes + extraMinutes);
        };

        const computedReadTime = (typeof record.readTime === 'number' && !isNaN(record.readTime as number))
          ? (record.readTime as number)
          : estimateReadTimeFromHtml(contentHtml, 200);

        const item: PressItem = {
          id: (record.id as string) || (record._id as string) || slug,
          title: (record.title as string) || slug,
          description: (record.description as string) || (record.excerpt as string) || "",
          content: contentHtml,
          date: (record.published_date as string) || (record.date as string) || (record.createdAt as string) || new Date().toISOString(),
          file_url: (record.file_url as string) || (record.image as string) || undefined,
          altText: (record.altText as string) || (record.alt as string) || (record.title as string) || undefined,
          author: (record.author as string) || (record.byline as string) || "",
          readTime: computedReadTime,
          tags: (record.tags as string[]) || (record.keywords as string[]) || []
        };

        setArticle(item);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err) || "Error al cargar la nota de prensa");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Cargando nota de prensa...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center max-w-md p-8">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Eye className="text-red-600" size={24} />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {error ? "Error" : "Nota de prensa no encontrada"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error || "La nota de prensa que buscas no existe o ha sido eliminada."}
          </p>
          <Link href="/prensa" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            <ArrowLeft size={18} />
            Volver a prensa
          </Link>
        </div>
      </div>
    );
  }

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const hasContent = article.content && String(article.content).trim().length > 0;
  const { sanitizedContent, tocItems } = ContentRenderer({ content: String(article.content || '') });

  return (
    <>
      <ReadingProgress />

      <main className="min-h-screen bg-white dark:bg-gray-950">
        {!article?.file_url && (
          <div className="fixed top-20 left-6 md:top-4 md:left-4 z-60">
            <Link href="/prensa" className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-full shadow-md">
              <ArrowLeft size={16} />
              <span className="text-sm font-medium">Volver</span>
            </Link>
          </div>
        )}
        {article.file_url && (
          <div className="relative w-full h-100 md:h-125 lg:h-150 bg-gray-900">
            <div className="absolute top-20 left-6 md:top-4 md:left-4 z-60">
              <Link href="/prensa" className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-full shadow-md backdrop-blur-sm">
                <ArrowLeft size={16} />
                <span className="text-sm font-medium">Volver</span>
              </Link>
            </div>

            <div className="absolute right-6 top-20 z-40 hidden md:flex">
              <ShareBar title={article.title} url={currentUrl} />
            </div>

            <Image
              src={article.file_url.startsWith("http") ? article.file_url : `${process.env.NEXT_PUBLIC_API_URL || ""}${article.file_url}`}
              alt={article.altText || article.title}
              fill
              className="object-cover opacity-80"
              sizes="100vw"
              priority
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-8 pb-20">
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  {article.tags && article.tags.length > 0 && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600 text-white text-sm font-medium">
                      <Tag size={14} />
                      {article.tags[0]}
                    </span>
                  )}
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 text-left">{article.title}</h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                  {article.date && (
                    <span className="flex items-center gap-1.5">
                      <Calendar size={16} />
                      {new Date(article.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  )}

                  {article.readTime && (
                    <span className="flex items-center gap-1.5">
                      <Clock size={16} />
                      {article.readTime} min
                    </span>
                  )}

                  {article.author && (
                    <span className="flex items-center gap-1.5">
                      <User size={16} />
                      {article.author}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-12 gap-8">
            <article className="lg:col-span-9">
              {article.description && (
                <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
                  <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed text-justify">{article.description}</p>
                </div>
              )}

              {hasContent ? (
                <div
                  className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-lg text-justify"
                  dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                />
              ) : (
                <div className="py-12 text-center bg-gray-50 dark:bg-gray-900 rounded-xl">
                  <Calendar className="mx-auto mb-4 text-gray-400" size={48} />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Contenido no disponible</h3>
                  <p className="text-gray-600 dark:text-gray-400">Esta nota de prensa aún no tiene contenido disponible.</p>
                </div>
              )}

              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 md:hidden">
                <ShareBar title={article.title} url={currentUrl} />
              </div>
            </article>

            <aside className="lg:col-span-3 space-y-6">
              {tocItems.length > 0 && <TableOfContents items={tocItems} />}

              <div className="sticky top-24 bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Información</h3>
                <div className="space-y-4 text-sm">
                  {article.date && (
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 mb-1">Publicado</p>
                      <p className="text-gray-900 dark:text-white font-medium">{new Date(article.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                  )}

                  {article.author && (
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 mb-1">Autor</p>
                      <p className="text-gray-900 dark:text-white font-medium">{article.author}</p>
                    </div>
                  )}

                  {article.readTime && (
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 mb-1">Tiempo de lectura</p>
                      <p className="text-gray-900 dark:text-white font-medium">{article.readTime} minutos</p>
                    </div>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
