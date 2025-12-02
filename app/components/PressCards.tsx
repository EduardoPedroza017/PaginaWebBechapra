"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, ExternalLink } from 'lucide-react';

interface PressItem {
	id: string;
	title: string;
	date: string;
	excerpt: string;
	link?: string;
}

export default function PressCards() {
	const [press, setPress] = React.useState<PressItem[]>([]);
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		fetch("http://localhost:5000/api/press")
			.then(res => res.json())
			.then(data => {
				// Ordenar por fecha descendente y mostrar solo los 3 más recientes
				const sorted = data.sort((a: PressItem, b: PressItem) => new Date(b.date).getTime() - new Date(a.date).getTime());
				setPress(sorted.slice(0, 3));
			})
			.finally(() => setLoading(false));
	}, []);

	return (
		<section>
			<motion.div
				initial={{opacity: 0, y: 20}}
				whileInView={{opacity: 1, y: 0}}
				viewport={{once: true}}
				transition={{duration: 0.6}}
				className="text-center mb-6"
			>
				<h2 className="text-[clamp(2rem,4vw,2.5rem)] font-black text-[#003d8f] mb-4 tracking-tight">
					Comunicados de Prensa
				</h2>
				<p className="text-[1.1rem] text-[#666] max-w-[600px] mx-auto">
					Nuestros anuncios oficiales, reconocimientos y apariciones en medios
				</p>
			</motion.div>

			<motion.div
				initial={{opacity: 0, y: 40}}
				whileInView={{opacity: 1, y: 0}}
				viewport={{once: true}}
				transition={{duration: 0.6}}
				className="grid gap-8 px-2"
				style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}
			>
				{loading ? (
					<div className="col-span-full text-center py-12 text-[#003d8f] text-xl">Cargando comunicados...</div>
				) : press.length === 0 ? (
					<div className="col-span-full text-center py-12 text-[#666] text-xl">No hay comunicados disponibles</div>
				) : press.map((item, i) => (
					<Link
						key={item.id}
						href={`/prensa/${item.id}`}
						className="block"
					>
						<motion.article
							initial={{opacity: 0, y: 30}}
							whileInView={{opacity: 1, y: 0}}
							viewport={{once: true}}
							transition={{duration: 0.5, delay: i * 0.1}}
							whileHover={{scale: 1.03, y: -8}}
							className="relative p-8 rounded-2xl bg-gradient-to-br from-[#E8F4FF] to-[#D0E8FF] border-2 border-[#003d8f1f] transition-all duration-300 shadow-[0_12px_35px_rgba(0,61,143,0.08)] overflow-hidden cursor-pointer hover:shadow-[0_16px_40px_rgba(0,61,143,0.13)] focus:outline-none focus:ring-2 focus:ring-[#003d8f]"
							tabIndex={0}
						>
							{/* Borde superior decorativo */}
							<motion.div
								animate={{opacity: [0.6, 1, 0.6]}}
								transition={{duration: 3, repeat: Infinity, delay: i * 0.3}}
								className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#003d8f] via-[#004AB7] to-[#0056d4]"
							/>

							<div className="flex items-center gap-3 mb-5 text-[#003d8f]">
								<Calendar size={18} />
								<span className="text-[0.9rem] font-semibold">{new Date(item.date).toLocaleDateString('es-MX', {day: 'numeric', month: 'long', year: 'numeric'})}</span>
							</div>

							<h3 className="text-[1.25rem] font-extrabold text-[#003d8f] mb-3 leading-snug">
								{item.title}
							</h3>

							<p className="text-[0.95rem] text-[#666] leading-relaxed mb-5">
								{item.excerpt}
							</p>

							{item.link ? (
								<span className="inline-flex items-center gap-2 text-[#003d8f] font-bold text-[0.95rem] no-underline transition-colors duration-200 hover:underline">
									Leer más <ExternalLink size={16} />
								</span>
							) : null}
						</motion.article>
					</Link>
				))}
			</motion.div>

			<motion.div
				initial={{opacity: 0, y: 20}}
				whileInView={{opacity: 1, y: 0}}
				viewport={{once: true}}
				transition={{duration: 0.6, delay: 0.3}}
				className="text-center mt-6"
			>
				<Link
					href="/prensa"
					className="inline-flex items-center gap-2 px-8 py-4 bg-[#003d8f] text-white rounded-xl font-bold text-base no-underline transition-all duration-200 shadow-[0_12px_30px_rgba(0,61,143,0.2)] hover:bg-[#2563eb]"
				>
					Ver todos los comunicados →
				</Link>
			</motion.div>
		</section>
	);
}

