"use client";

import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../lib/LanguageContext';
import { translateText } from '../../lib/translate';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, ExternalLink } from 'lucide-react';

export default function PressCards() {

	const { lang } = useLanguage();

	const defaultTexts = {
		sectionTitle: 'Comunicados de Prensa',
		sectionSubtitle: 'Nuestros anuncios oficiales, reconocimientos y apariciones en medios',
		cards: [
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
		],
		readMore: 'Leer más',
		allPress: 'Ver todos los comunicados →',
	};

	const [texts, setTexts] = useState(defaultTexts);

	// Traducción optimizada
	useEffect(() => {
		async function fetchTranslations() {
			if (lang === 'es') {
				setTexts(defaultTexts);
				return;
			}

			const stringsToTranslate = [
				defaultTexts.sectionTitle,
				defaultTexts.sectionSubtitle,

				defaultTexts.cards[0].date,
				defaultTexts.cards[0].title,
				defaultTexts.cards[0].excerpt,

				defaultTexts.cards[1].date,
				defaultTexts.cards[1].title,
				defaultTexts.cards[1].excerpt,

				defaultTexts.cards[2].date,
				defaultTexts.cards[2].title,
				defaultTexts.cards[2].excerpt,

				defaultTexts.readMore,
				defaultTexts.allPress
			];

			const translated = await Promise.all(
				stringsToTranslate.map(str => translateText(str, lang))
			);

			let i = 0;

			setTexts({
				sectionTitle: translated[i++],
				sectionSubtitle: translated[i++],
				cards: [
					{
						date: translated[i++],
						title: translated[i++],
						excerpt: translated[i++],
					},
					{
						date: translated[i++],
						title: translated[i++],
						excerpt: translated[i++],
					},
					{
						date: translated[i++],
						title: translated[i++],
						excerpt: translated[i++],
					}
				],
				readMore: translated[i++],
				allPress: translated[i++],
			});
		}

		fetchTranslations();
	}, [lang]);

	// Previene errores si aún está cargando
	if (!texts.cards || texts.cards.length < 3) return null;

	const cardData = [
		{ ...(texts.cards[0] || {}) },
		{ ...(texts.cards[1] || {}) },
		{ ...(texts.cards[2] || {}) },
	];

	return (
		<section>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
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
					{texts.sectionTitle}
				</h2>
				<p style={{
					fontSize: '1.1rem',
					color: '#666',
					maxWidth: '600px',
					margin: '0 auto'
				}}>
					{texts.sectionSubtitle}
				</p>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
					gap: '2rem'
				}}
			>
				{cardData.map((item, i) => (
					<motion.article
						key={i}
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: i * 0.1 }}
						whileHover={{ scale: 1.03, y: -8 }}
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
						{/* Línea superior decorativa */}
						<motion.div
							animate={{ opacity: [0.6, 1, 0.6] }}
							transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
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
							<span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{item.date}</span>
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
							{texts.readMore} <ExternalLink size={16} />
						</Link>
					</motion.article>
				))}
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
					{texts.allPress}
				</Link>
			</motion.div>
		</section>
	);
}
