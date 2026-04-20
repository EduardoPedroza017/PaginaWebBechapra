"use client";

import React, { useEffect, useState, useRef, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, X, ZoomIn, Search, Sparkles } from "lucide-react";
import Section from "@/app/components/Section";
import SubpageHero from "@/components/SubpageHero";
import Footer from "@/components/Footer";
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
        
        setImages(list.map((it: any) => {
          const name = typeof it === 'string' ? it : it.filename;
          return { filename: name, path: `${API}/gallery/image/${name}` };
        }));
      } catch (e) {
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
        title="Galería Bausen"
        subtitle="Explore nuestra colección de imágenes que capturan la esencia de nuestra cultura, eventos y compromiso corporativo."
      />

      {/* Gallery Grid */}
      <Section variant="white" size="lg">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="aspect-square rounded-[2rem] bg-slate-50 dark:bg-slate-900 animate-pulse" />
            ))}
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-900 rounded-[3rem]">
            <ImageIcon className="w-16 h-16 text-slate-300 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">No hay imágenes disponibles</h3>
            <p className="text-slate-500 mt-2">Nuestra galería se está actualizando con nuevo contenido.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {images.map((img, i) => (
              <ImageCard key={i} img={img} index={i} onSelect={() => setSelected(img)} />
            ))}
          </div>
        )}
      </Section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative z-10 w-full max-w-5xl max-h-[85vh] flex flex-col items-center"
            >
              <button 
                onClick={() => setSelected(null)}
                className="absolute -top-16 right-0 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-rose-500 transition-all"
              >
                <X size={24} />
              </button>
              <div className="relative w-full h-full rounded-[3rem] overflow-hidden shadow-2xl border border-white/10">
                <img src={selected.path} alt={selected.filename} className="w-full h-full object-contain bg-slate-900" />
              </div>
              <div className="mt-8 text-center">
                 <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-black uppercase tracking-widest">
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
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { damping: 20, stiffness: 150 });
  const glowY = useSpring(mouseY, { damping: 20, stiffness: 150 });

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
      className="group relative aspect-square cursor-pointer"
    >
      <div className="relative h-full w-full bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-200/60 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-500">
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(37, 99, 235, 0.15), transparent 40%)`
            ),
          }}
        />
        <img src={img.path} alt={img.filename} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/40 transition-colors duration-500 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 shadow-xl">
            <ZoomIn size={24} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
