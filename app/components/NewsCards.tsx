"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Clock, BookOpen, FileText, Users } from 'lucide-react';

const iconMap: Record<string, any> = {
	blog: BookOpen,
	legal: FileText,
	event: Users,
};

export default function NewsCards({ dict }: { dict: any }) {
	const articles = dict.noticias?.articles || [];
	return (
		<section>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
				style={{
					textAlign: 'center',
					marginBottom: 'clamp(1.25rem, 2.5vw, 2rem)'
				}}
			>
				<h2 style={{
					fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
					fontWeight: 900,
					color: '#003d8f',
					marginBottom: '1rem',
					letterSpacing: '-0.02em'
				}}>
					{dict.noticias?.recent?.title ?? 'Últimas Noticias'}
				</h2>
				<p style={{
					fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
					color: '#666',
					maxWidth: '600px',
					margin: '0 auto',
					padding: '0 1rem'
				}}>
					{dict.noticias?.hero?.description ?? 'Mantente informado sobre tendencias, eventos y cambios legislativos importantes'}
				</p>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
					gap: 'clamp(1.5rem, 3vw, 2.5rem)',
					padding: '0 1rem'
				}}
			>
				{articles.slice(0, 3).map((item: any, i: number) => {
					const Icon = iconMap[item.type] || BookOpen;
					// Color and bgGradient based on type
					const color = item.type === 'blog' ? '#003d8f' : item.type === 'legal' ? '#D97706' : '#7C3AED';
					const bgGradient = item.type === 'blog'
						? 'linear-gradient(135deg, #E8F4FF 0%, #D0E8FF 100%)'
						: item.type === 'legal'
						? 'linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)'
						: 'linear-gradient(135deg, #F0E6FF 0%, #E8D4FF 100%)';
					return (
						<motion.article
							key={i}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: i * 0.1 }}
							whileHover={{ scale: 1.03, y: -8 }}
							style={{
								borderRadius: '16px',
								background: 'rgba(255, 255, 255, 0.9)',
								backdropFilter: 'blur(12px)',
								border: 'none',
								transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
								boxShadow: '0 8px 32px rgba(0, 74, 183, 0.12)',
								overflow: 'hidden',
								cursor: 'pointer'
							}}
						>
							{/* Imagen con icono */}
							<div style={{
								width: '100%',
								height: 'clamp(180px, 25vw, 220px)',
								background: bgGradient,
								position: 'relative',
								overflow: 'hidden',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center'
							}}>
								{/* Badge de categoría */}
								<div style={{
									position: 'absolute',
									top: '1rem',
									left: '1rem',
									background: color,
									color: 'white',
									padding: 'clamp(0.4rem, 0.8vw, 0.5rem) clamp(0.8rem, 1.2vw, 1rem)',
									borderRadius: '8px',
									fontSize: 'clamp(0.8rem, 1vw, 0.9rem)',
									fontWeight: 700,
									zIndex: 2
								}}>
									{item.category}
								</div>

								{/* Icono central */}
								<div style={{
									width: 'clamp(80px, 12vw, 110px)',
									height: 'clamp(80px, 12vw, 110px)',
									background: 'rgba(255,255,255,0.9)',
									borderRadius: '20px',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
									border: `3px solid ${color}20`
								}}>
									<Icon size={50} strokeWidth={2} style={{ color, width: 'clamp(40px, 6vw, 60px)', height: 'clamp(40px, 6vw, 60px)' }} />
								</div>
							</div>

							<div style={{ padding: 'clamp(1.25rem, 2vw, 1.75rem)' }}>
								<div style={{
									display: 'flex',
									alignItems: 'center',
									gap: '1rem',
									marginBottom: '1rem',
									fontSize: 'clamp(0.8rem, 1vw, 0.9rem)',
									color: '#666',
									flexWrap: 'wrap'
								}}>
									<div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
										<Clock size={16} />
										<span>{item.date}</span>
									</div>
									<span>•</span>
									<span>{item.readTime}</span>
								</div>

								<h3 style={{
									fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
									fontWeight: 800,
									color: '#003d8f',
									marginBottom: '0.75rem',
									lineHeight: 1.3
								}}>
									{item.title}
								</h3>

								<p style={{
									fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
									color: '#666',
									lineHeight: 1.6,
									marginBottom: '1.25rem'
								}}>
									{item.excerpt}
								</p>

								<Link
									href="/noticias"
									style={{
										display: 'inline-flex',
										alignItems: 'center',
										gap: '0.5rem',
										color: '#003d8f',
										fontWeight: 700,
										fontSize: '0.95rem',
										textDecoration: 'none',
										transition: 'all 0.3s ease'
									}}
								>
									{dict.noticias?.labels?.readArticle ?? 'Leer más'} →
								</Link>
							</div>
						</motion.article>
					);
				})}
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6, delay: 0.3 }}
				style={{
					textAlign: 'center',
					marginTop: '1.5rem'
				}}
			>
				<Link
					href="/noticias"
					style={{
						display: 'inline-flex',
						alignItems: 'center',
						gap: '0.5rem',
						padding: '1rem 2rem',
						background: '#003d8f',
						color: 'white',
						borderRadius: '12px',
						fontWeight: 700,
						fontSize: '1rem',
						textDecoration: 'none',
						transition: 'all 0.3s ease',
						boxShadow: '0 12px 30px rgba(0,61,143,0.2)'
					}}
				>
					{dict.noticias?.loadMore ?? 'Ver todas las noticias'} →
				</Link>
			</motion.div>
		</section>
	);
}
