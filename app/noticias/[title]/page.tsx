"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Clock, ArrowLeft } from 'lucide-react';
import Footer from '@/components/Footer';

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
		fetch("http://localhost:5000/api/news")
			.then(res => res.json())
			.then(data => {
				const found = data.find((item: NewsItem) => item.title === title);
				setNews(found || null);
			})
			.finally(() => setLoading(false));
	}, [params.title]);

	if (loading) {
		return (
			<main style={{background: 'linear-gradient(180deg, #E8F4FF 0%, #D0E8FF 100%)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
				<div style={{fontSize: '1.5rem', color: '#003d8f'}}>Cargando noticia...</div>
			</main>
		);
	}

	if (!news) {
		return (
			<main style={{background: 'linear-gradient(180deg, #E8F4FF 0%, #D0E8FF 100%)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '2rem'}}>
				<div style={{fontSize: '1.5rem', color: '#666'}}>Noticia no encontrada</div>
				<button onClick={() => router.push('/noticias')} style={{padding: '1rem 2rem', borderRadius: '12px', background: '#003d8f', color: 'white', fontWeight: 700, border: 'none', cursor: 'pointer'}}>Volver a Noticias</button>
			</main>
		);
	}

	return (
		<main style={{background: 'linear-gradient(180deg, #E8F4FF 0%, #D0E8FF 100%)'}}>
			{/* Hero Section */}
			<section style={{
				width: '100vw',
				marginLeft: 'calc(-50vw + 50%)',
				padding: '4rem 1.5rem 6rem',
				background: 'linear-gradient(90deg, #003d8f 0%, #004AB7 35%, #004AB7 65%, #0056d4 100%)',
				position: 'relative',
				overflow: 'hidden'
			}}>
				<div style={{maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 2}}>
					<motion.div
						initial={{opacity: 0, y: 30}}
						animate={{opacity: 1, y: 0}}
						transition={{duration: 0.6}}
					>
						<button 
							onClick={() => router.push('/noticias')}
							style={{
								display: 'inline-flex',
								alignItems: 'center',
								gap: '0.5rem',
								background: 'rgba(255,255,255,0.2)',
								color: 'white',
								border: 'none',
								padding: '0.75rem 1.5rem',
								borderRadius: '8px',
								fontWeight: 600,
								cursor: 'pointer',
								marginBottom: '2rem',
								transition: 'all 0.3s ease'
							}}
						>
							<ArrowLeft size={20} />
							Volver a Noticias
						</button>

						<div style={{
							display: 'inline-block',
							background: 'rgba(255,255,255,0.2)',
							color: 'white',
							padding: '0.5rem 1rem',
							borderRadius: '8px',
							fontSize: '0.9rem',
							fontWeight: 600,
							marginBottom: '1.5rem'
						}}>
							{news.subtitle || 'Noticia'}
						</div>

						<h1 style={{
							fontSize: 'clamp(2rem, 5vw, 3.5rem)',
							fontWeight: 900,
							color: 'white',
							marginBottom: '1.5rem',
							letterSpacing: '-0.02em',
							lineHeight: 1.2
						}}>
							{news.title}
						</h1>

						<div style={{
							display: 'flex',
							alignItems: 'center',
							gap: '0.5rem',
							color: 'rgba(255,255,255,0.9)',
							fontSize: '1rem'
						}}>
							<Clock size={20} />
							<span>{new Date(news.date).toLocaleDateString('es-MX', {day: 'numeric', month: 'long', year: 'numeric'})}</span>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Contenido */}
			<section style={{
				maxWidth: '1100px',
				margin: '-4rem auto 0',
				padding: '0 1.5rem 6rem',
				position: 'relative',
				zIndex: 10
			}}>
				<motion.div
					initial={{opacity: 0, y: 40}}
					animate={{opacity: 1, y: 0}}
					transition={{duration: 0.6}}
					style={{
						background: 'white',
						borderRadius: '24px',
						overflow: 'hidden',
						boxShadow: '0 20px 60px rgba(0,61,143,0.15)'
					}}
				>
					{news.image_url && (
						<div style={{
							width: '100%',
							height: '500px',
							position: 'relative',
							overflow: 'hidden',
							background: 'linear-gradient(135deg, #E8F4FF 0%, #D0E8FF 100%)'
						}}>
							<img 
								src={`http://localhost:5000${news.image_url}`}
								alt={news.title}
								style={{
									width: '100%',
									height: '100%',
									objectFit: 'cover'
								}}
							/>
							<div style={{
								position: 'absolute',
								bottom: 0,
								left: 0,
								right: 0,
								height: '120px',
								background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)'
							}} />
						</div>
					)}

					<div style={{padding: '3.5rem'}}>
						{/* Metadata */}
						<div style={{
							display: 'flex',
							alignItems: 'center',
							gap: '1.5rem',
							marginBottom: '2.5rem',
							paddingBottom: '2rem',
							borderBottom: '2px solid #E8F4FF'
						}}>
							<div style={{
								display: 'flex',
								alignItems: 'center',
								gap: '0.5rem',
								color: '#666',
								fontSize: '1rem'
							}}>
								<Clock size={20} />
								<span>{new Date(news.date).toLocaleDateString('es-MX', {day: 'numeric', month: 'long', year: 'numeric'})}</span>
							</div>
							<div style={{
								background: 'linear-gradient(135deg, #003d8f 0%, #0056d4 100%)',
								color: 'white',
								padding: '0.5rem 1.2rem',
								borderRadius: '8px',
								fontSize: '0.9rem',
								fontWeight: 700
							}}>
								{news.subtitle || 'Noticia'}
							</div>
						</div>

						{/* Contenido principal */}
						<div style={{
							fontSize: '1.15rem',
							color: '#2d3748',
							lineHeight: 1.9,
							whiteSpace: 'pre-wrap',
							letterSpacing: '0.01em'
						}}>
							{news.description.split('\n\n').map((paragraph, i) => (
								<p key={i} style={{
									marginBottom: '1.5rem',
									textAlign: 'justify'
								}}>
									{paragraph}
								</p>
							))}
						</div>

						{/* Botón de compartir */}
						<div style={{
							marginTop: '3rem',
							paddingTop: '2rem',
							borderTop: '2px solid #E8F4FF',
							display: 'flex',
							gap: '1rem',
							flexWrap: 'wrap'
						}}>
							<button
								onClick={() => router.push('/noticias')}
								style={{
									padding: '1rem 2rem',
									borderRadius: '12px',
									background: 'linear-gradient(90deg, #003d8f 0%, #0056d4 100%)',
									color: 'white',
									fontWeight: 700,
									border: 'none',
									cursor: 'pointer',
									fontSize: '1rem',
									boxShadow: '0 4px 12px rgba(0,61,143,0.2)',
									transition: 'all 0.3s ease'
								}}
							>
								← Ver más noticias
							</button>
						</div>
					</div>
				</motion.div>
			</section>

			<Footer />
		</main>
	);
}
