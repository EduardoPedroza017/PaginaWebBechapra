"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, ExternalLink } from 'lucide-react';

export default function PressCards() {
	return (
		<section>
			<motion.div
				initial={{opacity: 0, y: 20}}
				whileInView={{opacity: 1, y: 0}}
				viewport={{once: true}}
				transition={{duration: 0.6}}
				style={{
					textAlign: 'center',
					marginBottom: '1.5rem'
				}}
			>
				<h2 style={{
					fontSize: 'clamp(2rem, 4vw, 2.5rem)',
					fontWeight: 900,
					color: '#003d8f',
					marginBottom: '1rem',
					letterSpacing: '-0.02em'
				}}>
					Comunicados de Prensa
				</h2>
				<p style={{
					fontSize: '1.1rem',
					color: '#666',
					maxWidth: '600px',
					margin: '0 auto'
				}}>
					Nuestros anuncios oficiales, reconocimientos y apariciones en medios
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
						date: '15 Octubre 2024',
						title: 'Bechapra expande sus servicios de Capital Humano',
						excerpt: 'La empresa anuncia nuevas soluciones integrales para el desarrollo organizacional y gestión del talento.',
					},
					{
						date: '3 Septiembre 2024',
						title: 'Reconocimiento como empresa líder en consultoría',
						excerpt: 'Bechapra recibe distinción por su excelencia en servicios empresariales y compromiso con clientes.',
					},
					{
						date: '20 Julio 2024',
						title: 'Nueva alianza estratégica con sector tecnológico',
						excerpt: 'Acuerdo permitirá integrar innovación digital en todos nuestros servicios de Management.',
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
							padding: '2rem 1.75rem',
							borderRadius: '16px',
							background: 'linear-gradient(135deg, #E8F4FF 0%, #D0E8FF 100%)',
							border: '2px solid rgba(0,61,143,0.12)',
							transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
							boxShadow: '0 12px 35px rgba(0,61,143,0.08)',
							position: 'relative',
							overflow: 'hidden',
							cursor: 'pointer'
						}}
					>
						{/* Borde superior decorativo */}
						<motion.div
							animate={{opacity: [0.6, 1, 0.6]}}
							transition={{duration: 3, repeat: Infinity, delay: i * 0.3}}
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								right: 0,
								height: '4px',
								background: 'linear-gradient(90deg, #003d8f 0%, #004AB7 50%, #0056d4 100%)'
							}}
						/>

						<div style={{
							display: 'flex',
							alignItems: 'center',
							gap: '0.75rem',
							marginBottom: '1.25rem',
							color: '#003d8f'
						}}>
							<Calendar size={18} />
							<span style={{fontSize: '0.9rem', fontWeight: 600}}>{item.date}</span>
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
							href="/prensa"
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
							Leer más <ExternalLink size={16} />
						</Link>
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
					marginTop: '1.5rem'
				}}
			>
				<Link
					href="/prensa"
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
					Ver todos los comunicados →
				</Link>
			</motion.div>
		</section>
	);
}
