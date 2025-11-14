"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Award, Calendar, Newspaper } from 'lucide-react';

export default function PressSection() {
	const [currentSlide, setCurrentSlide] = useState(0);

	const pressItems = [
		{
			type: 'award',
			title: 'Premio a la Excelencia Empresarial 2024',
			date: 'Octubre 2024',
			description: 'Reconocimiento por nuestra innovación en servicios de Capital Humano',
			image: '/imagen/prensa/premio-excelencia.jpg',
			category: 'Premio'
		},
		{
			type: 'event',
			title: 'Participación en HR Summit México 2024',
			date: 'Septiembre 2024',
			description: 'Ponencia sobre tendencias en transformación digital de RH',
			image: '/imagen/prensa/hr-summit.jpg',
			category: 'Evento'
		},
		{
			type: 'award',
			title: 'Certificación Great Place to Work',
			date: 'Agosto 2024',
			description: 'Orgullosamente certificados como un excelente lugar para trabajar',
			image: '/imagen/prensa/great-place.jpg',
			category: 'Certificación'
		},
		{
			type: 'news',
			title: 'Expansión de Servicios a Latinoamérica',
			date: 'Julio 2024',
			description: 'Anuncio oficial de nuestra expansión regional',
			image: '/imagen/prensa/expansion.jpg',
			category: 'Noticia'
		}
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % pressItems.length);
		}, 5000);

		return () => clearInterval(interval);
	}, [pressItems.length]);

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % pressItems.length);
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + pressItems.length) % pressItems.length);
	};

	const getIcon = (type: string) => {
		switch (type) {
			case 'award':
				return <Award size={20} />;
			case 'event':
				return <Calendar size={20} />;
			case 'news':
				return <Newspaper size={20} />;
			default:
				return <Newspaper size={20} />;
		}
	};

	return (
		<section className="mb-16 sm:mb-24 md:mb-32">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
				className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16 px-4"
			>
				<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
					Prensa y Reconocimientos
				</h2>
				<div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mb-6" />
				<p className="text-base sm:text-lg text-slate-600">
					Conoce nuestros logros, participación en eventos y reconocimientos más recientes
				</p>
			</motion.div>

			<div className="relative max-w-6xl mx-auto">
				{/* Carrusel principal */}
				<div className="relative h-[500px] sm:h-[550px] md:h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
					<AnimatePresence mode="wait">
						<motion.div
							key={currentSlide}
							initial={{ opacity: 0, x: 100 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -100 }}
							transition={{ duration: 0.5 }}
							className="absolute inset-0"
						>
							{/* Imagen de fondo con overlay */}
							<div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-blue-950/90">
								<div className="absolute inset-0 opacity-30">
									<div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300" />
								</div>
							</div>

							{/* Contenido */}
							<div className="relative h-full flex flex-col md:flex-row items-center justify-between p-8 sm:p-12 md:p-16 gap-8">
								{/* Texto */}
								<div className="flex-1 text-white z-10">
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.2 }}
										className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4"
									>
										{getIcon(pressItems[currentSlide].type)}
										<span className="text-sm font-semibold">
											{pressItems[currentSlide].category}
										</span>
									</motion.div>

									<motion.h3
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.3 }}
										className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 leading-tight"
									>
										{pressItems[currentSlide].title}
									</motion.h3>

									<motion.p
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.4 }}
										className="text-base sm:text-lg text-blue-100 mb-4"
									>
										{pressItems[currentSlide].date}
									</motion.p>

									<motion.p
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.5 }}
										className="text-base sm:text-lg text-white/90 mb-6 max-w-lg"
									>
										{pressItems[currentSlide].description}
									</motion.p>

									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.6 }}
									>
										<Link
											href="/prensa"
											className="inline-flex items-center gap-2 bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 hover:scale-105"
										>
											Ver más en prensa →
										</Link>
									</motion.div>
								</div>

								{/* Imagen decorativa */}
								<motion.div
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: 0.4 }}
									className="flex-1 max-w-md"
								>
									<div className="relative aspect-square w-full max-w-[300px] md:max-w-[400px] mx-auto">
										<div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl transform rotate-6 opacity-20" />
										<div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-blue-700 rounded-2xl transform -rotate-3 opacity-30" />
										<div className="relative bg-white rounded-2xl shadow-2xl p-8 flex items-center justify-center">
											{pressItems[currentSlide].type === 'award' && (
												<Award size={120} className="text-blue-600" strokeWidth={1.5} />
											)}
											{pressItems[currentSlide].type === 'event' && (
												<Calendar size={120} className="text-blue-600" strokeWidth={1.5} />
											)}
											{pressItems[currentSlide].type === 'news' && (
												<Newspaper size={120} className="text-blue-600" strokeWidth={1.5} />
											)}
										</div>
									</div>
								</motion.div>
							</div>
						</motion.div>
					</AnimatePresence>

					{/* Controles de navegación */}
					<button
						onClick={prevSlide}
						className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-20"
						aria-label="Anterior"
					>
						<ChevronLeft size={24} />
					</button>

					<button
						onClick={nextSlide}
						className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-20"
						aria-label="Siguiente"
					>
						<ChevronRight size={24} />
					</button>

					{/* Indicadores */}
					<div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
						{pressItems.map((_, index) => (
							<button
								key={index}
								onClick={() => setCurrentSlide(index)}
								className={`transition-all duration-300 rounded-full ${
									index === currentSlide
										? 'bg-white w-8 h-2'
										: 'bg-white/40 w-2 h-2 hover:bg-white/60'
								}`}
								aria-label={`Ir a slide ${index + 1}`}
							/>
						))}
					</div>
				</div>

				{/* Miniaturas */}
				<div className="hidden lg:flex gap-4 mt-6 justify-center">
					{pressItems.map((item, index) => (
						<button
							key={index}
							onClick={() => setCurrentSlide(index)}
							className={`relative group transition-all duration-300 ${
								index === currentSlide ? 'scale-105' : 'opacity-60 hover:opacity-100'
							}`}
						>
							<div
								className={`w-32 h-24 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
									index === currentSlide
										? 'border-blue-600 shadow-lg'
										: 'border-transparent'
								}`}
							>
								<div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
									{getIcon(item.type)}
								</div>
							</div>
							<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-end p-2">
								<span className="text-white text-xs font-semibold truncate">
									{item.category}
								</span>
							</div>
						</button>
					))}
				</div>
			</div>
		</section>
	);
}
