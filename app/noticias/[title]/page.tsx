"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Clock, ArrowLeft } from 'lucide-react';
import Footer from '@/components/Footer';
import { TranslateText } from '@/components/TranslateText';

interface NewsItem {
	title: string;
	subtitle: string;
	description: string;
	date: string;
	image_url?: string;
}

export default function NewsDetailPage() {
	const params = useParams();
	const router = useRouter();
	const [news, setNews] = useState<NewsItem | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const title = decodeURIComponent(params.title as string);
		fetch("/api/news")
			.then(res => res.json())
			.then(data => {
				const found = data.find((item: NewsItem) => item.title === title);
				setNews(found || null);
			})
			.finally(() => setLoading(false));
	}, [params.title]);

	if (loading) {
		return (
			<main className="bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 min-h-screen flex items-center justify-center">
				<div className="text-2xl text-blue-900 dark:text-blue-400"><TranslateText text="Cargando noticia..." /></div>
			</main>
		);
	}

	if (!news) {
		return (
			<main className="bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 min-h-screen flex items-center justify-center flex-col gap-8">
				<div className="text-2xl text-slate-600 dark:text-slate-400"><TranslateText text="Noticia no encontrada" /></div>
				<button onClick={() => router.push('/noticias')} className="px-8 py-4 rounded-xl bg-blue-900 dark:bg-blue-600 text-white font-bold border-none cursor-pointer hover:bg-blue-800 dark:hover:bg-blue-700 transition-colors">
					<TranslateText text="Volver a Noticias" />
				</button>
			</main>
		);
	}

	return (
		<main className="bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
			{/* Hero Section */}
			<section className="w-screen -ml-[calc(50vw-50%)] px-6 py-16 lg:py-24 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 dark:from-slate-900 dark:via-blue-950 dark:to-slate-900 relative overflow-hidden">
				<div className="max-w-[1280px] mx-auto relative z-10">
					<motion.div
						initial={{opacity: 0, y: 30}}
						animate={{opacity: 1, y: 0}}
						transition={{duration: 0.6}}
					>
						<button 
							onClick={() => router.push('/noticias')}
							className="inline-flex items-center gap-2 bg-white/20 text-white border-none px-6 py-3 rounded-lg font-semibold cursor-pointer mb-8 hover:bg-white/30 transition-all"
						>
							<ArrowLeft size={20} />
							<TranslateText text="Volver a Noticias" />
						</button>

						<div className="inline-block bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-semibold mb-6">
							<TranslateText text={news.subtitle || 'Noticia'} />
						</div>

						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
							<TranslateText text={news.title} />
						</h1>

						<div className="flex items-center gap-2 text-white/90 text-base">
							<Clock size={20} />
							<span>{new Date(news.date).toLocaleDateString('es-MX', {day: 'numeric', month: 'long', year: 'numeric'})}</span>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Contenido */}
			<section className="max-w-[1100px] mx-auto -mt-16 px-6 pb-24 relative z-10">
				<motion.div
					initial={{opacity: 0, y: 40}}
					animate={{opacity: 1, y: 0}}
					transition={{duration: 0.6}}
					className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/15 dark:shadow-blue-500/10"
				>
				{news.image_url && (
					<div className="w-full h-[500px] relative overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800">
						<Image 
							src={`/api/proxy-image?url=${encodeURIComponent(`http://localhost:5000${news.image_url}`)}`}
							alt={news.title}
							fill
							className="object-cover"
							unoptimized
						/>
						<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />
					</div>
				)}					<div className="p-14">
						{/* Metadata */}
						<div className="flex items-center gap-6 mb-10 pb-8 border-b-2 border-slate-100 dark:border-slate-700">
							<div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-base">
								<Clock size={20} />
								<span>{new Date(news.date).toLocaleDateString('es-MX', {day: 'numeric', month: 'long', year: 'numeric'})}</span>
							</div>
							<div className="bg-gradient-to-r from-blue-900 to-blue-700 dark:from-blue-600 dark:to-blue-500 text-white px-5 py-2 rounded-lg text-sm font-bold">
								<TranslateText text={news.subtitle || 'Noticia'} />
							</div>
						</div>

						{/* Contenido principal */}
						<div className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap tracking-wide">
							{news.description.split('\n\n').map((paragraph, i) => (
								<p key={i} className="mb-6 text-justify">
									<TranslateText text={paragraph} />
								</p>
							))}
						</div>

						{/* Botón de compartir */}
						<div className="mt-12 pt-8 border-t-2 border-slate-100 dark:border-slate-700 flex gap-4 flex-wrap">
							<button
								onClick={() => router.push('/noticias')}
								className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-900 to-blue-700 dark:from-blue-600 dark:to-blue-500 text-white font-bold border-none cursor-pointer text-base shadow-lg shadow-blue-900/20 dark:shadow-blue-500/20 hover:shadow-xl hover:-translate-y-1 transition-all"
							>
								← <TranslateText text="Ver más noticias" />
							</button>
						</div>
					</div>
				</motion.div>
			</section>

			<Footer />
		</main>
	);
}
