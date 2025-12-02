"use client";
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, MeshDistortMaterial, Html } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Suspense, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import useLenis from "@/hooks/useLenis";


function Knot() {
const materialProps = useMemo(() => ({
speed: 1.2,
distort: 0.35,
radius: 1,
color: "#a78bfa", // Tailwind violet-400 aprox.
}), []);


return (
<Float speed={1.4} rotationIntensity={1.2} floatIntensity={1.2}>
<mesh castShadow position={[0, 0, 0]}>
<torusKnotGeometry args={[1.1, 0.35, 220, 32]} />
<MeshDistortMaterial transparent opacity={0.95} {...materialProps} />
</mesh>
</Float>
);
}

export default function Hero3D() {
useLenis(); // Smooth scroll global
const prefersReduced = useReducedMotion();


return (
<section className="relative grid items-center gap-10 md:grid-cols-2">
{/* Copy */}
<div>
<motion.h1
initial={{ opacity: 0, y: 10 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
viewport={{ once: true }}
className="text-balance text-4xl font-semibold leading-tight md:text-6xl"
>
Glass, 3D & Animaciones
</motion.h1>
<motion.p
initial={{ opacity: 0, y: 10 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, delay: 0.1 }}
viewport={{ once: true }}
className="mt-4 max-w-xl text-pretty text-white/75"
>
Un starter productivo con carga diferida del canvas, efectos sutiles y accesibilidad.
</motion.p>
<div className="mt-6 flex gap-3">
<a href="#features" className="glass-btn">Explorar features</a>
<a href="#" className="glass-btn-secondary">Ver demo</a>
</div>
</div>


{/* Canvas 3D */}
<div className="relative aspect-[4/3] w-full md:aspect-[5/4]">
<div className="absolute inset-0 rounded-3xl border border-white/15 bg-white/5 p-1 backdrop-blur-xl">
<div className="glass-inset h-full w-full rounded-[22px]">
<Canvas shadows camera={{ position: [3, 2, 4], fov: 42 }} dpr={[1, 2]}>
<Suspense fallback={<Html center className="text-sm text-white/70">Cargando 3D…</Html>}>
<ambientLight intensity={prefersReduced ? 0.6 : 0.9} />
<directionalLight position={[2.5, 4, 2]} intensity={1.2} castShadow />
{!prefersReduced && (
<EffectComposer>
<Bloom mipmapBlur intensity={0.6} luminanceThreshold={0.25} />
</EffectComposer>
)}
<Knot />
</Suspense>
<OrbitControls enablePan={false} enableZoom={false} enableRotate={!prefersReduced} />
</Canvas>
</div>
</div>
</div>
</section>
);
}