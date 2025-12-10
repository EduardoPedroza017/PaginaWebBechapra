"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Clock, ArrowLeft, Tag, Share2, BookOpen, Calendar, User, Star } from 'lucide-react';
import Footer from '@/components/Footer';
import { TranslateText } from '@/components/TranslateText';

interface NewsItem {
	title: string;
	subtitle: string;
	description: string;
	date: string;
	image_url?: string;
	category?: string;
	tags?: string[];
	featured?: boolean;
	altText?: string;
	author?: string;
}

export default function NewsDetailPage() {
	const params = useParams();
	const router = useRouter();
	const [news, setNews] = useState<NewsItem | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const title = decodeURIComponent(params.title as string);
		const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
		
		fetch(`${apiUrl}/api/news`)
			.then(res => {
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				return res.json();
			})
			.then(data => {
				if (Array.isArray(data)) {
					const found = data.find((item: NewsItem) => item.title === title);
					setNews(found || null);
				} else {
					setNews(null);
				}
			})
			.catch(err => {
				console.error("Error fetching news:", err);
				setNews(null);
			})
			.finally(() => setLoading(false));
	}, [params.title]);

	const handleShare = async () => {
		if (navigator.share && news) {
			try {
				await navigator.share({
					title: news.title,
					text: news.subtitle,
					url: window.location.href,
				});
			} catch {
				// Usuario canceló o error
			}
		} else {
			navigator.clipboard.writeText(window.location.href);
		}
	};

	if (loading) {
		return (
			<main className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 min-h-screen">
				{/* Skeleton Hero */}
				<div className="w-full bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 dark:from-slate-900 dark:via-blue-950 dark:to-slate-900">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
						<div className="animate-pulse">
							<div className="h-10 bg-white/20 rounded-lg w-40 mb-8"></div>
							<div className="h-6 bg-white/20 rounded-full w-32 mb-6"></div>
							<div className="h-12 bg-white/20 rounded-lg w-3/4 mb-4"></div>
							<div className="h-12 bg-white/20 rounded-lg w-1/2 mb-6"></div>
							<div className="h-5 bg-white/20 rounded-lg w-48"></div>
						</div>
					</div>
				</div>
				{/* Skeleton Content */}
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-20">
					<div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 animate-pulse">
						<div className="h-80 bg-slate-200 dark:bg-slate-700 rounded-2xl mb-8"></div>
						<div className="space-y-4">
							<div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
							<div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
							<div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-4/6"></div>
						</div>
					</div>
				</div>
			</main>
		);
	}

	if (!news) {
		return (
			<main className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 min-h-screen flex items-center justify-center flex-col gap-8 px-4">
				<div className="text-center">
					<div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
						<BookOpen className="w-10 h-10 text-slate-400 dark:text-slate-500" />
					</div>
					<h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
						<TranslateText text="Noticia no encontrada" />
					</h2>
					<p className="text-slate-500 dark:text-slate-400 mb-8">
						<TranslateText text="La noticia que buscas no existe o fue eliminada" />
					</p>
					<button 
						onClick={() => router.push('/noticias')} 
						className="px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all hover:-translate-y-0.5 shadow-lg shadow-blue-600/25"
					>
						<TranslateText text="Volver a Noticias" />
					</button>
				</div>
			</main>
		);
	}

	return (
		<main className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 min-h-screen">
			{/* Hero Section - Mejorado */}
			<section className="relative w-full bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 dark:from-slate-900 dark:via-blue-950 dark:to-slate-900 overflow-hidden">
				{/* Background decorations */}
				<div className="absolute inset-0 pointer-events-none">
					<div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
					<div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl" />
				</div>

				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						{/* Back button */}
						<button 
							onClick={() => router.push('/noticias')}
							className="group inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white border border-white/20 px-5 py-2.5 rounded-xl font-semibold text-sm mb-6 hover:bg-white/20 transition-all"
						>
							<ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
							<TranslateText text="Volver a Noticias" />
						</button>

						{/* Meta badges */}
						<div className="flex flex-wrap items-center gap-3 mb-6">
							{news.featured && (
								<span className="inline-flex items-center gap-1.5 bg-amber-500/90 text-white px-3 py-1.5 rounded-full text-xs font-bold">
									<Star size={14} fill="currentColor" />
									<TranslateText text="Destacado" />
								</span>
							)}
							{news.category && (
								<span className="bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-semibold">
									{news.category}
								</span>
							)}
							<span className="bg-white/10 backdrop-blur-sm text-white/90 px-4 py-1.5 rounded-full text-sm font-medium">
								{news.subtitle || 'Noticia'}
							</span>
						</div>

						{/* Title */}
						<h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-6 leading-tight max-w-4xl">
							{news.title}
						</h1>

						{/* Date and reading time */}
						<div className="flex flex-wrap items-center gap-4 sm:gap-6 text-white/80">
							<div className="flex items-center gap-2">
								<Calendar size={18} />
								<span className="text-sm sm:text-base">
									{new Date(news.date).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}
								</span>
							</div>
							<div className="flex items-center gap-2">
								<Clock size={18} />
								<span className="text-sm sm:text-base">
									{Math.ceil(news.description.length / 1000)} min <TranslateText text="de lectura" />
								</span>
							</div>
							{news.author && (
								<div className="flex items-center gap-2">
									<User size={18} />
									<span className="text-sm sm:text-base">{news.author}</span>
								</div>
							)}
						</div>
					</motion.div>
				</div>

				{/* Wave decoration */}
				<div className="absolute bottom-0 left-0 right-0">
					<svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
						<path d="M0 60L60 52.5C120 45 240 30 360 22.5C480 15 600 15 720 18.75C840 22.5 960 30 1080 33.75C1200 37.5 1320 37.5 1380 37.5L1440 37.5V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" className="fill-slate-50 dark:fill-slate-900" />
					</svg>
				</div>
			</section>

			{/* Content Section */}
			<section className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 pb-20">
				<motion.article
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-700"
				>
					{/* Featured Image */}
					{news.image_url && (
						<div className="relative w-full aspect-video sm:aspect-[16/9] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800">
							<Image 
								src={`http://localhost:5000${news.image_url}`}
								alt={news.altText || news.title}
								fill
								className="object-cover"
								priority
								unoptimized
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
						</div>
					)}

					{/* Article Content */}
					<div className="p-6 sm:p-8 lg:p-12">
						{/* Tags */}
						{news.tags && news.tags.length > 0 && (
							<div className="flex flex-wrap items-center gap-2 mb-8">
								<Tag size={16} className="text-slate-400 dark:text-slate-500" />
								{news.tags.map((tag, i) => (
									<span 
										key={i}
										className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
									>
										{tag}
									</span>
								))}
							</div>
						)}

						{/* Description/Content */}
						<div className="prose prose-lg dark:prose-invert max-w-none">
							{news.description.split('\n\n').map((paragraph, i) => (
								<p 
									key={i} 
									className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6 text-base sm:text-lg"
								>
									{paragraph}
								</p>
							))}
						</div>

						{/* Footer */}
						<div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-700">
							<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
								{/* Share button */}
								<button
									onClick={handleShare}
									className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 transition-all"
								>
									<Share2 size={18} />
									<TranslateText text="Compartir noticia" />
								</button>

								{/* Back to news */}
								<button
									onClick={() => router.push('/noticias')}
									className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/25 hover:-translate-y-0.5 transition-all"
								>
									<ArrowLeft size={18} />
									<TranslateText text="Ver más noticias" />
								</button>
							</div>
						</div>
					</div>
				</motion.article>
			</section>

			<Footer />
		</main>
	);
}
