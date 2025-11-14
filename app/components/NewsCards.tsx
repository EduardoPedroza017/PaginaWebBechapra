"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Clock } from 'lucide-react';

export default function NewsCards() {
	return (
		<section style={{
			padding: '4rem 0'
		}}>
			<motion.div
				initial={{opacity: 0, y: 20}}
				whileInView={{opacity: 1, y: 0}}
				viewport={{once: true}}
				transition={{duration: 0.6}}
				style={{
					textAlign: 'center',
					marginBottom: '3rem'
				}}
			>
				<h2 style={{
					fontSize: 'clamp(2rem, 4vw, 2.5rem)',
					fontWeight: 900,
					color: '#003d8f',
					marginBottom: '1rem',
					letterSpacing: '-0.02em'
				}}>
					Últimas Noticias
				</h2>
				<p style={{
					fontSize: '1.1rem',
					color: '#666',
					maxWidth: '600px',
					margin: '0 auto'
				}}>
					Mantente informado sobre tendencias, eventos y cambios legislativos importantes
				</p>
			</motion.div>

			<motion.div
				initial={{opacity: 0, y: 40}}
				whileInView={{opacity: 1, y: 0}}
				viewport={{once: true}}
				transition={{duration: 0.6}}
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
					gap: '2rem'
				}}
			>
				{[
					{
						category: 'Blog',
						date: '14 Noviembre 2024',
						title: 'Nuevas tendencias en atracción de talento 2025',
						excerpt: 'Descubre cómo las empresas están transformando sus estrategias de reclutamiento con inteligencia artificial.',
						readTime: '5 min',
						type: 'blog'
					},
					{
						category: 'Cambios Legislativos',
						date: '12 Noviembre 2024',
						title: 'Reforma fiscal 2025: Lo que tu empresa debe saber',
						excerpt: 'Análisis completo de las nuevas disposiciones fiscales y su impacto en los servicios contables.',
						readTime: '7 min',
						type: 'legal'
					},
					{
						category: 'Evento',
						date: '10 Noviembre 2024',
						title: 'Bechapra presente en HR Summit México 2024',
						excerpt: 'Nuestra participación en el evento más importante de Recursos Humanos del año.',
						readTime: '4 min',
						type: 'event'
					}
				].map((item, i) => (
					<motion.article
						key={i}
						initial={{opacity: 0, y: 30}}
						whileInView={{opacity: 1, y: 0}}
						viewport={{once: true}}
						transition={{duration: 0.5, delay: i * 0.1}}
						whileHover={{scale: 1.03, y: -8}}
						style={{
							borderRadius: '16px',
							background: 'white',
							border: '2px solid rgba(0,61,143,0.12)',
							transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
							boxShadow: '0 12px 35px rgba(0,61,143,0.08)',
							overflow: 'hidden',
							cursor: 'pointer'
						}}
					>
						{/* Imagen */}
						<div style={{
							width: '100%',
							height: '200px',
							background: item.type === 'legal' 
								? 'linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)'
								: item.type === 'event'
								? 'linear-gradient(135deg, #F0E6FF 0%, #E8D4FF 100%)'
								: 'linear-gradient(135deg, #E8F4FF 0%, #D0E8FF 100%)',
							position: 'relative',
							overflow: 'hidden'
						}}>
							<div style={{
								position: 'absolute',
								top: '1rem',
								left: '1rem',
								background: item.type === 'legal' 
									? '#D97706'
									: item.type === 'event'
									? '#7C3AED'
									: '#003d8f',
								color: 'white',
								padding: '0.5rem 1rem',
								borderRadius: '8px',
								fontSize: '0.85rem',
								fontWeight: 700,
								zIndex: 2
							}}>
								{item.category}
							</div>
						</div>

						<div style={{padding: '1.5rem'}}>
							<div style={{
								display: 'flex',
								alignItems: 'center',
								gap: '1rem',
								marginBottom: '1rem',
								fontSize: '0.85rem',
								color: '#666'
							}}>
								<div style={{display: 'flex', alignItems: 'center', gap: '0.4rem'}}>
									<Clock size={16} />
									<span>{item.date}</span>
								</div>
								<span>•</span>
								<span>{item.readTime}</span>
							</div>

							<h3 style={{
								fontSize: '1.25rem',
								fontWeight: 800,
								color: '#003d8f',
								marginBottom: '0.75rem',
								lineHeight: 1.3
							}}>
								{item.title}
							</h3>

							<p style={{
								fontSize: '0.95rem',
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
								Leer más →
							</Link>
						</div>
					</motion.article>
				))}
			</motion.div>

			<motion.div
				initial={{opacity: 0, y: 20}}
				whileInView={{opacity: 1, y: 0}}
				viewport={{once: true}}
				transition={{duration: 0.6, delay: 0.3}}
				style={{
					textAlign: 'center',
					marginTop: '3rem'
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
					Ver todas las noticias →
				</Link>
			</motion.div>
		</section>
	);
}
