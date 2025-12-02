"use client";
import { motion } from "framer-motion";


export default function GlassCard({ title, desc }: { title: string; desc: string }) {
return (
<motion.article
initial={{ opacity: 0, y: 8 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.5 }}
className="glass-card"
>
<h3 className="text-lg font-semibold tracking-tight">{title}</h3>
<p className="mt-1 text-sm text-white/75">{desc}</p>
</motion.article>
);
}