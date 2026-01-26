"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { TranslateText } from "@/components/TranslateText";
import Footer from "@/components/Footer";
import { Phone, Mail, ArrowRight, Calendar, Users, Award, Building2, Search, Filter, X, ChevronDown, MapPin, Briefcase, GraduationCap } from "lucide-react";
import axios from "axios";

interface BoardMember {
	id: string;
	nombre: string;
	apellido_paterno: string;
	apellido_materno?: string;
	puesto: string;
	descripcion?: string;
	biografia?: string;
	foto?: string;
	foto_url?: string;
	email?: string;
	telefono?: string;
	edad?: number;
	linkedin?: string;
	activo: boolean;
}

export default function BoardPage() {
	const [boardMembers, setBoardMembers] = useState<BoardMember[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchBoardMembers = async () => {
			try {
				const response = await axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/api/board-members`
				);
				setBoardMembers(response.data);
			} catch (err) {
				console.error("Error fetching board members:", err);
				setError("Failed to load board members.");
			} finally {
				setLoading(false);
			}
		};

		fetchBoardMembers();
	}, []);

	// Helper para construir la URL de la imagen
	const getImageUrl = (member: BoardMember): string | null => {
		if (member.foto_url) {
			return `${process.env.NEXT_PUBLIC_API_URL}${member.foto_url}`;
		}
		if (member.foto) {
			return `${process.env.NEXT_PUBLIC_API_URL}/uploads/${member.foto}`;
		}
		return null;
	};

	// Helper para obtener el nombre completo
	const getFullName = (member: BoardMember): string => {
		return `${member.nombre} ${member.apellido_paterno} ${member.apellido_materno || ''}`.trim();
	};

	// Helper para generar el slug del nombre (ej: "juan-ogona-rami")
	const getSlug = (member: BoardMember): string => {
		const fullName = getFullName(member);
		return fullName
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
			.replace(/[^a-z0-9\s-]/g, '') // Eliminar caracteres especiales
			.replace(/\s+/g, '-') // Reemplazar espacios con guiones
			.replace(/-+/g, '-') // Eliminar guiones duplicados
			.trim();
	};

	// Helper para obtener la descripción
	const getDescription = (member: BoardMember): string => {
		return member.descripcion || member.biografia || '';
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
				<div className="text-red-500">{error}</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
			{/* Hero Section */}
			<section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-24 lg:py-32 overflow-hidden">
				{/* Background Pattern */}
				<div className="absolute inset-0 opacity-5">
					<div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')]"></div>
				</div>

				{/* Decorative elements */}
				<div className="absolute inset-0 overflow-hidden">
					<div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
					<div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
				</div>

				<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							className="mb-8"
						>
							<div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 backdrop-blur-sm rounded-full border border-blue-400/30 mb-6">
								<Users className="w-4 h-4 text-blue-300" />
								<span className="text-sm font-medium text-blue-200">Consejo Directivo</span>
							</div>
							<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
								Nuestro Equipo <span className="text-blue-300">Líder</span>
							</h1>
							<p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
								Profesionales visionarios comprometidos con la excelencia, la innovación y el desarrollo sostenible de nuestra organización.
							</p>
						</motion.div>

						{/* Stats */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto"
						>
							<div className="text-center">
								<div className="text-3xl font-bold text-blue-300 mb-1">{boardMembers.length}</div>
								<div className="text-sm text-blue-200">Miembros Activos</div>
							</div>
							<div className="text-center">
								<div className="text-3xl font-bold text-blue-300 mb-1">15+</div>
								<div className="text-sm text-blue-200">Años de Experiencia</div>
							</div>
							<div className="text-center">
								<div className="text-3xl font-bold text-blue-300 mb-1">100%</div>
								<div className="text-sm text-blue-200">Compromiso</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Board Members Section */}
			<section className="py-20 bg-white dark:bg-gray-800">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Section Header */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="text-center mb-16"
					>
						<div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-200 dark:border-blue-800/50 mb-6">
							<Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
							<span className="text-sm font-semibold text-blue-700 dark:text-blue-300">Equipo Ejecutivo</span>
						</div>
						<h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
							Profesionales de <span className="text-blue-600 dark:text-blue-400">Excelencia</span>
						</h2>
						<p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
							Nuestro equipo directivo está compuesto por líderes visionarios con amplia experiencia en el sector,
							comprometidos con la innovación, la sostenibilidad y el desarrollo de soluciones de vanguardia.
						</p>
					</motion.div>

					{/* Members Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{boardMembers.map((member, index) => {
							const imageUrl = getImageUrl(member);
							const fullName = getFullName(member);
							const slug = getSlug(member);
							const profileUrl = `/sobre-nosotros/consejo/${slug}`;

							return (
							<motion.div
								key={member.id || index}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								className="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-800 cursor-pointer"
								onClick={() => window.location.href = profileUrl}
							>
								{/* Gradient border on hover */}
								<div
									className="absolute inset-0 bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
									style={{ padding: "2px" }}
								/>

								<div className="relative bg-white dark:bg-gray-900 rounded-2xl p-8 m-0.5">
									{/* Image Container */}
									<div className="relative mb-6">
										<div className="w-32 h-32 mx-auto rounded-full overflow-hidden ring-4 ring-blue-100 dark:ring-blue-900/50 group-hover:ring-blue-500 transition-all duration-300 shadow-xl">
											{imageUrl ? (
												<Image
													src={imageUrl}
													alt={fullName}
													width={128}
													height={128}
													className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
												/>
											) : (
												<div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
													{member.nombre?.charAt(0)}{member.apellido_paterno?.charAt(0)}
												</div>
											)}
										</div>
										{/* Status indicator */}
										<div className="absolute bottom-2 right-1/2 translate-x-16 w-4 h-4 bg-green-500 rounded-full ring-4 ring-white dark:ring-gray-900 shadow-lg" />
									</div>

									{/* Info */}
									<div className="text-center mb-6">
										<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
											{fullName}
										</h3>
										<p className="text-blue-600 dark:text-blue-400 font-semibold text-sm mb-4">
											{member.puesto}
										</p>

										{/* Información de contacto */}
										<div className="space-y-2 text-left">
											{member.edad && (
												<div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm">
													<Calendar className="w-4 h-4 text-blue-500" />
													<span>{member.edad} años</span>
												</div>
											)}
											{member.telefono && (
												<div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm">
													<Phone className="w-4 h-4 text-blue-500" />
													<a href={`tel:${member.telefono}`} className="hover:text-blue-500 transition-colors">
														{member.telefono}
													</a>
												</div>
											)}
											{member.email && (
												<div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm">
													<Mail className="w-4 h-4 text-blue-500" />
													<a href={`mailto:${member.email}`} className="hover:text-blue-500 transition-colors truncate">
														{member.email}
													</a>
												</div>
											)}
										</div>
									</div>

									{/* Profile Link */}
									<a
										href={profileUrl}
										onClick={(e) => e.stopPropagation()}
										className="flex items-center justify-center gap-2 w-full py-3 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 group/btn"
									>
										<TranslateText text="View Full Profile" />
										<ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
									</a>
								</div>
							</motion.div>
						)})}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-linear-to-r from-blue-800 via-blue-800 to-blue-900 dark:from-blue-900 dark:via-blue-950 dark:to-slate-950 relative overflow-hidden">
				{/* Decorative elements */}
				<div className="absolute inset-0 opacity-10">
					<div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
					<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-300 rounded-full blur-3xl" />
				</div>

				<div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
					>
						<h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
							¿Quieres saber más sobre nosotros?
						</h2>
						<p className="text-blue-50 mb-8 text-lg">
							Conoce nuestra historia, valores y visión de futuro
						</p>
						<a
							href="/acerca-de"
							className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
						>
							Conocer más
							<ArrowRight className="w-5 h-5" />
						</a>
					</motion.div>
				</div>
			</section>

			{/* Footer */}
			<Footer />
		</div>
	);
}
