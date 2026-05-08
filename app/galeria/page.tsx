"use client";

import { useEffect, useState, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, X, ZoomIn, Sparkles } from "lucide-react";
import Section from "@/app/components/Section";
import SubpageHero from "@/components/SubpageHero";
import Footer from "@/components/Footer";
import SpotlightCTA from "@/app/components/SpotlightCTA";
import { TranslateText } from "@/components/TranslateText";

interface GalleryImage {
  filename: string;
  path: string;
}

export default function GaleriaPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selected, setSelected] = useState<GalleryImage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImages() {
      try {
        const API = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${API}/api/gallery`);
        const data = await res.json();
        const list = Array.isArray(data.images) ? data.images : Array.isArray(data) ? data : [];

        setImages(
          list.map((it: any) => {
            const name = typeof it === "string" ? it : it.filename;
            return { filename: name, path: `${API}/gallery/image/${name}` };
          })
        );
      } catch {
        setImages([]);
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <SubpageHero
        badge="Recursos Visuales"
        title="Galeria Bausen"
        variant="servicesBlue"
        subtitle="Explore una seleccion visual de nuestra cultura, eventos y presencia corporativa con una experiencia mas limpia y mejor jerarquizada."
      />

      <Section variant="white" size="lg">
        <div className="mb-14 space-y-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.28em] text-blue-700 dark:border-blue-800/40 dark:bg-blue-950/30 dark:text-blue-300 min-h-[44px] min-w-[44px]">
            <Sparkles size={24} aria-label="Decorativo" />
            <TranslateText text="Selección visual" />
          </span>
          <div>
            <h2 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white lg:text-5xl">
              <TranslateText text="Momentos y presencia de marca" />
            </h2>
            <p className="mt-2 max-w-3xl font-medium text-slate-500">
              <TranslateText text="Una galeria con mejor lectura visual para revisar escenas clave, materiales y ambientes que representan a Bausen." />
            </p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="aspect-square rounded-[2rem] bg-slate-50 animate-pulse dark:bg-slate-900" />
            ))}
          </div>
        ) : images.length === 0 ? (
          <div className="rounded-[3rem] bg-slate-50 py-20 text-center dark:bg-slate-900">
            <ImageIcon className="mx-auto mb-6 h-16 w-16 text-slate-300" />
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              <TranslateText text="No hay imagenes disponibles" />
            </h3>
            <p className="mt-2 text-slate-500">
              <TranslateText text="La galeria se esta actualizando con nuevo contenido." />
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
            {images.map((img, i) => (
              <ImageCard key={i} img={img} index={i} onSelect={() => setSelected(img)} />
            ))}
          </div>
        )}
      </Section>

      <SpotlightCTA
        eyebrow="Explora mas"
        title="Descubra la experiencia visual de Bausen"
        subtitle="Conecte los momentos de marca, los espacios y las experiencias del equipo en una galeria mas clara, elegante y facil de recorrer."
        imageSrc="/web/image/hero/Flayers_Home_01100.jpg"
        imageAlt="Galeria institucional Bausen"
        primaryLink="/#contacto"
        primaryLabel="Solicitar informacion"
        secondaryLink="/acerca-de"
        secondaryLabel="Conocer la marca"
        theme="blue"
      />

      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)} className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative z-10 flex max-h-[85vh] w-full max-w-5xl flex-col items-center"
            >
              <button onClick={() => setSelected(null)} className="absolute -top-16 right-0 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-rose-500">
                <X size={24} />
              </button>
              <div className="relative h-full w-full overflow-hidden rounded-[3rem] border border-white/10 shadow-2xl">
                <img src={selected.path} alt={selected.filename} className="h-full w-full bg-slate-900 object-contain" />
              </div>
              <div className="mt-8 text-center">
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-400">
                  {selected.filename}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

function ImageCard({ img, index, onSelect }: { img: GalleryImage; index: number; onSelect: () => void }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { damping: 20, stiffness: 150 });
  const glowY = useSpring(mouseY, { damping: 20, stiffness: 150 });
  const featured = index === 0;

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      onClick={onSelect}
      className={`group relative cursor-pointer ${featured ? "col-span-2 row-span-2" : "aspect-square"}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-slate-200/60 bg-white shadow-xl transition-all duration-500 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        <motion.div
          className="pointer-events-none absolute -inset-px z-10 rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: useTransform([glowX, glowY], ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(37, 99, 235, 0.15), transparent 40%)`),
          }}
        />
        <img src={img.path} alt={img.filename} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
        {featured && (
          <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-slate-950/45 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-white backdrop-blur-md">
            <TranslateText text="Imagen destacada" />
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/0 transition-colors duration-500 group-hover:bg-slate-950/40">
          <div className="flex h-12 w-12 scale-50 items-center justify-center rounded-full bg-blue-600 text-white opacity-0 shadow-xl transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
            <ZoomIn size={24} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
