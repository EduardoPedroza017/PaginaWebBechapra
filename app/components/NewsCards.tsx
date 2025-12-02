"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Clock } from 'lucide-react';

interface NewsItem {
	title: string;
	subtitle: string;
	description: string;
	date: string;
	image_url?: string;
}

export default function NewsCards() {
	const [news, setNews] = useState<NewsItem[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("http://localhost:5000/api/news")
			.then(res => res.json())
			.then(data => {
				const sorted = data.sort((a: NewsItem, b: NewsItem) => 
					new Date(b.date).getTime() - new Date(a.date).getTime()
				);
				setNews(sorted.slice(0, 3)); // Solo las 3 más recientes
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
				className="text-center mb-[clamp(1.25rem,2.5vw,2rem)]"
			>
				<h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-black text-[#003d8f] mb-4 tracking-tight">
					Últimas Noticias
				</h2>
				<p className="text-[clamp(1rem,1.5vw,1.25rem)] text-[#666] max-w-[600px] mx-auto px-4">
					Mantente informado sobre tendencias, eventos y cambios legislativos importantes
				</p>
			</motion.div>

			{loading ? (
				<div className="text-center py-12 text-[#003d8f] text-xl">Cargando noticias...</div>
			) : news.length === 0 ? (
				<div className="text-center py-12 text-[#666] text-xl">No hay noticias disponibles</div>
			) : (
				<motion.div
					initial={{opacity: 0, y: 40}}
					whileInView={{opacity: 1, y: 0}}
					viewport={{once: true}}
					transition={{duration: 0.6}}
					className="grid gap-[clamp(1.5rem,3vw,2.5rem)] px-4"
					style={{
						gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))'
					}}
				>
					{news.map((item, i) => (
						<Link href={`/noticias/${encodeURIComponent(item.title)}`} key={i} style={{textDecoration: 'none', color: 'inherit'}}>
							<motion.article
								initial={{opacity: 0, y: 30}}
								whileInView={{opacity: 1, y: 0}}
								viewport={{once: true}}
								transition={{duration: 0.5, delay: i * 0.1}}
								whileHover={{scale: 1.03, y: -8}}
								className="rounded-2xl bg-white/90 backdrop-blur-lg border-0 transition-all duration-300 shadow-[0_8px_32px_rgba(0,74,183,0.12)] overflow-hidden cursor-pointer"
							>
								{/* Imagen */}
								<div
									className="w-full h-[clamp(180px,25vw,220px)] relative overflow-hidden"
									style={{ background: 'linear-gradient(135deg, #E8F4FF 0%, #D0E8FF 100%)' }}
								>
									{item.image_url && (
										<img 
											src={`http://localhost:5000${item.image_url}`}
											alt={item.title}
											style={{
												width: '100%',
												height: '100%',
												objectFit: 'cover'
											}}
										/>
									)}
									{/* Badge de categoría */}
									<div
										className="absolute top-4 left-4 text-white font-bold rounded-lg z-20"
										style={{ background: '#003d8f', padding: 'clamp(0.4rem,0.8vw,0.5rem) clamp(0.8rem,1.2vw,1rem)', fontSize: 'clamp(0.8rem,1vw,0.9rem)' }}
									>
										{item.subtitle || 'Noticia'}
									</div>
								</div>

								<div className="p-[clamp(1.25rem,2vw,1.75rem)]">
									<div className="flex items-center gap-4 mb-4 text-[clamp(0.8rem,1vw,0.9rem)] text-[#666] flex-wrap">
										<div className="flex items-center gap-1">
											<Clock size={16} />
											<span>{new Date(item.date).toLocaleDateString('es-MX', {day: 'numeric', month: 'long', year: 'numeric'})}</span>
										</div>
									</div>
									<h3 className="text-[clamp(1.125rem,2vw,1.375rem)] font-extrabold text-[#003d8f] mb-3 leading-snug">
										{item.title}
									</h3>
									<p className="text-[clamp(0.9rem,1.2vw,1rem)] text-[#666] leading-relaxed mb-5">
										{item.description.slice(0, 120)}...
									</p>
									<div className="inline-flex items-center gap-2 text-[#003d8f] font-bold text-[0.95rem] no-underline transition-colors duration-200 hover:underline">
										Leer más →
									</div>
								</div>
							</motion.article>
						</Link>
					))}
				</motion.div>
			)}

			<motion.div
				initial={{opacity: 0, y: 20}}
				whileInView={{opacity: 1, y: 0}}
				viewport={{once: true}}
				transition={{duration: 0.6, delay: 0.3}}
				className="text-center mt-6"
			>
				<Link
					href="/noticias"
					className="inline-flex items-center gap-2 px-8 py-4 bg-[#003d8f] text-white rounded-xl font-bold text-base no-underline transition-all duration-200 shadow-[0_12px_30px_rgba(0,61,143,0.2)] hover:bg-[#2563eb]"
				>
					Ver todas las noticias →
				</Link>
			</motion.div>
		</section>
	);
}
