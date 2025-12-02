"use client";
import { motion } from "framer-motion";


export default function SubpageHero({ title, subtitle }: { title: string; subtitle?: string }) {
return (
<section className="mx-auto mb-8 max-w-6xl">
<div className="glass-card p-6 md:p-8">
<motion.h1
initial={{ opacity: 0, y: 8 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.5 }}
className="text-balance text-3xl font-semibold md:text-4xl"
>
{title}
</motion.h1>
{subtitle && (
<motion.p
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
viewport={{ once: true }}
transition={{ delay: 0.1 }}
className="mt-2 max-w-3xl text-white/75"
>
{subtitle}
</motion.p>
)}
</div>
</section>
);
}